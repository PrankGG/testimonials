const fetch = require("node-fetch");
const fs = require("fs");
let comments = [];
let i = 0;

get("");

function get(continuation) {
  fetch(
    `https://vid.puffyan.us/api/v1/comments/5q0gJs2eYB4?continuation=${continuation}`
  )
    .then((res) => res.json())
    .then((data) => {
      i++;
      comments = comments.concat(data.comments);
      get(data.continuation);
      if (i === 3) {
        console.log(`Downloaded ${comments.length} comments.`);
        fs.writeFileSync("output/comments.json", JSON.stringify(comments));
        process.exit();
      }
    });
}
