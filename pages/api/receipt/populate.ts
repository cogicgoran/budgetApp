import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const whitelistedReceiptVerifierUrls = ["https://suf.purs.gov.rs/v/?vl="];

function matchWhitelistedReceiptVerifier(input: string) {
  return whitelistedReceiptVerifierUrls.some((verifiedUrl) =>
    input.startsWith(verifiedUrl)
  );
}

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      if (
        !req.query.query ||
        !matchWhitelistedReceiptVerifier(req.query.query as string)
      ) {
        return res.status(400).send("URL not supported.");
      }
      const response = await axios.get(req.query.query as string);
      const pageContent = response.data;
      const match = pageContent.match(/Артикли(.*)Укупан износ:/s);
      const list = match[0].split("\n").slice(3, -2);
      const data = [];
      for (let index = 0; index < list.length; index = index + 2) {
        const pricingData = list[index + 1].split(/\s+/);
        data.push({
          name: list[index],
          unitPrice: parseFloat(pricingData[1]),
          amount: parseFloat(pricingData[2]),
          total: parseFloat(pricingData[3]),
        });
      }

      return res.json({ data });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error.");
    }
  } else {
    res.statusCode = 405;
    return res.send("Method not allowed.");
  }
};

export default routeHandler;
