import axios from "axios";
const fetchSVG = async (url = "") => {
  return new Promise(async (resolve, reject) => {
    const finalUrl = new URL(url);
    const fileExtension = (finalUrl.pathname || "").split(".").pop();
    if (fileExtension === "svg") {
      const response = await axios.get(finalUrl.href);
      const data = response.data;
      resolve(data);
    }
    resolve(url);
  });
};

export const convertToSvg = async (html) => {
  let finalHtml = html;
  // regex to fetch all image tags
  const reg1 = /<img .+?\/?\>/g;

  // regex to fetch url with svg
  const reg2 = /(https?:\/\/.*\.(?:svg).*?\")/g;

  // fetch url with src attribute
  const reg3 = /src="(.*?)"/g;

  // Make sure to get only image tags
  const imageTags = html.match(reg1);
  for (let i = 0; i < imageTags.length; i++) {
    const tag = imageTags[i];
    // Assuming link will have https url in src attribute
    const imageUrlWithSrc = tag.match(reg3);

    // console.log(tag, imageUrlWithSrc)
    if (imageUrlWithSrc && imageUrlWithSrc.length > 0) {
      const imageUrl = imageUrlWithSrc[0].match(reg2);
      if (imageUrl && imageUrl.length > 0) {
        const url = new URL(imageUrl[0].replace('"', ""));
        if (url.searchParams.get("img2svg") != "false") {
          let replace = true;
          const svgBody = await fetchSVG(url.href).catch((error) => {
            console.log("Some error occurred while downloading", url.href);
            console.log(error);
            replace = false;
          });
          if (replace) {
            finalHtml = finalHtml.replace(tag, svgBody);
          }
        }
      }
    }
  }
  return finalHtml;
};
