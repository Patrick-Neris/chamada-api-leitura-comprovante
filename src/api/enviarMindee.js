const express = require("express");
const mindee = require("mindee");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const fs = require("fs");

router.post("/", async (req, res) => {
  console.log("req: ", req);
  console.log("req.body: ", req.body);
  console.log("req.body.image: ", req.body.image);

  var image = req.body.image;
  if (image == undefined) {
    res.send({
      error: "imagem não carregada",
    });
  }
  const outputFileName = "./src/temp/recibo.jpeg";
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");

  fs.writeFile(outputFileName, buffer, (err) => {
    if (err) {
      console.error(`Erro ao escrever o arquivo: ${err}`);
    }
  });

  let obj = {};

  const mindeeClient = new mindee.Client({
    apiKey: "90feff09f17391f2e68c6c5473a97636",
  });

  const inputSource = mindeeClient.docFromBase64(base64Data, "teste");
  //   Na chamada nessa API é necessário passar esse segundo parâmetro que
  // seria o nome do arquivo, provavelmente para controle de algum dashboard
  // no site da API, mas não utilizamos nesse projeto.

  const apiResponse = mindeeClient.parse(mindee.product.ReceiptV5, inputSource);

  await apiResponse.then((resp) => {
    obj = {
      establishmentName: resp.document.inference.prediction.supplierName.value,
      date: resp.document.inference.prediction.date.value,
      time: resp.document.inference.prediction.time.value,
      value: resp.document.inference.prediction.totalAmount.value,
      id: uuidv4(),
    };
    console.log(obj);
  });
  res.send(obj);
});

module.exports = router;
