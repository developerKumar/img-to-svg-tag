import fs from "fs";
import { convertToSvg } from "./index.js";
const str = `<p><img src="https://d2mk45aasx86xg.cloudfront.net/world_d650185bdd.svg" alt="10 Benefits of outsourcing web development projects">
<img src="https://d2mk45aasx86xg.cloudfront.net/graph_be4a9cff45.svg?img2svg=false" alt="10 Benefits of outsourcing web development projects">
<img src="https://d2mk45aasx86xg.cloudfront.net/graph_be4a9cff45.svg?img2svg=true" alt="10 Benefits of outsourcing web development projects"/></p>`;

(async () => {
  const finalHtml = await convertToSvg(str);

  fs.writeFileSync("index.html", finalHtml);
})();
