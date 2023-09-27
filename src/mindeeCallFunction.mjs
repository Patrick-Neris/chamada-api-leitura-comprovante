import * as mindee from "mindee";
import { v4 } from "uuid";

export async function callMindeeApi(path) {
  let obj = {};
  const mindeeClient = new mindee.Client({
    apiKey: "90feff09f17391f2e68c6c5473a97636",
  });

  const inputSource = mindeeClient.docFromPath(path);

  const apiResponse = mindeeClient.parse(mindee.product.ReceiptV5, inputSource);

  await apiResponse.then((resp) => {
    console.log(resp.document.toString());
    obj = {
      establishmentName: resp.document.inference.prediction.supplierName.value,
      date: resp.document.inference.prediction.date.value,
      time: resp.document.inference.prediction.time.value,
      value: resp.document.inference.prediction.totalAmount.value,
      id: v4(),
    };
  });
  console.log(obj);
  return obj;
}
