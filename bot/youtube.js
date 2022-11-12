const fetch = require("node-fetch");
const fs = require("fs");
let comments = [];

get("");

function get(continuation) {
  fetch(
    `https://vid.puffyan.us/api/v1/comments/5q0gJs2eYB4?continuation=${continuation}`
  )
    .then((res) => res.json())
    .then((data) => {
      data.comments = data.comments.filter((c) => {
        return c.likeCount <= 10;
      });
      comments = comments.concat(data.comments);
      get(data.continuation);
      if (comments.length >= 80) {
        console.log(`Downloaded ${comments.length} comments.`);
        fs.writeFileSync("comments.json", JSON.stringify(comments));
        process.exit();
      }
    });
}
