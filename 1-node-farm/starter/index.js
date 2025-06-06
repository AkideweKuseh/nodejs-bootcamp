const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

const encoding = "utf-8";

////////////////////////Files

// // Blocking/Syncronuous way
// const inputText = fs.readFileSync("./txt/input.txt", encoding);

// console.log(`The input text : %{inputText}`);

// const outputText = `Avocado Fun Fact: %{inputText}`;
// fs.writeFileSync("./txt/output.txt", outputText);

// // Non-Blocking / Asynchronous way
// fs.readFile("txt/start.txt", encoding, (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// console.log("About to read");

///////////////////////////////// Server /////////////////////////
const PORT = 5000;

const overviewTemplate = fs.readFileSync(
  `${__dirname}/templates/overview-template.html`,
  encoding
);
const cardTemplate = fs.readFileSync(
  `${__dirname}/templates/card-template.html`,
  encoding
);
const productTemplate = fs.readFileSync(
  `${__dirname}/templates/product-template.html`,
  encoding
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, encoding);
const objData = JSON.parse(data);

const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const { query, pathname } = url.parse(req.url, true);

  // OVERVIEW PAGE
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, {
      "content-type": "text/html",
    });

    const cardsHtml = objData
      .map((el) => replaceTemplate(cardTemplate, el))
      .join("");
    // console.log(cardsHtml);

    const overviewPage = overviewTemplate.replace(
      /{%PRODUCT_CARDS%}/,
      cardsHtml
    );
    res.end(overviewPage);
  }
  // PRODUCT PAGE
  else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    // console.log(query);
    let product = objData[query.id];
    const productPage = replaceTemplate(productTemplate, product);
    res.end(productPage);
  }
  // API PAGE
  else if (pathname === "/api") {
    res
      .writeHead(200, {
        "content-type": "application/json",
      })
      .end(data);
  }
  // NOT FOUND PAGE
  else {
    res
      .writeHead(404, {
        "content-type": "text/html",
      })
      .end("NOT FOUND 404 :(");
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server Running on Port ${PORT}`);
});
