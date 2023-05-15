import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const whitelistedReceiptVerifierUrls = ["https://suf.purs.gov.rs"];

function matchWhitelistedReceiptVerifier(input: string) {
  return whitelistedReceiptVerifierUrls.some((verifiedUrl) =>
    input.startsWith(verifiedUrl)
  );
}

function extractMarketPlaceFromPage(html: string) {
  try {
    const match = html.match(/ФИСКАЛНИ РАЧУН(.*)ПРОМЕТ ПРОДАЈА/s)!;
    const lines = match[0].split("\n");
    const shopUniqueId = lines[1].replaceAll("\r", "").trim();
    const shopName = lines[2].replaceAll("\r", "").trim();
    const address = lines[4].replaceAll("\r", "").trim();
    const city = lines[5].replaceAll("\r", "").trim();
    const marketplaceData = {
      shopUniqueId,
      shopName,
      address,
      city,
    };
    return marketplaceData;
  } catch (error) {
    return {};
  }
}

function extractArticlesFromPage(html: string) {
  try {
    const match = html.match(/Артикли(.*)Укупан износ:/s)!;
    const list = match[0].split("\n").slice(3, -2);
    const articles = [];
    for (let index = 0; index < list.length; index = index + 2) {
      const pricingData = list[index + 1].split(/\s+/);
      console.log(pricingData);
      pricingData[1] = (pricingData[1] as string)
        .replaceAll(".", "")
        .replaceAll(",", ".");
      pricingData[2] = (pricingData[2] as string)
        .replaceAll(".", "")
        .replaceAll(",", ".");
      articles.push({
        name: list[index],
        unitPrice: parseFloat(pricingData[1]),
        amount: parseFloat(pricingData[2]),
      });
    }
    return articles;
  } catch (error) {
    return [];
  }
}

function extractDateFromPage(html: string) {
  try {
    const match = html.match(/Укупан износ пореза:(.*)ПФР број рачуна:/s)!;
    const lines = match[0].split("\n");
    lines.pop();
    lines.shift();
    lines.shift();
    const dateLines = lines[0].split(/\s+/);
    const date = dateLines[2];
    const time = dateLines[3];
    const year = parseInt(date.split(".")[2]);
    // months have 0 based indexing
    const monthIndex = parseInt(date.split(".")[1]) - 1;
    const day = parseInt(date.split(".")[0]);
    const hour = parseInt(time.split(":")[0]);
    const minute = parseInt(time.split(":")[1]);
    const newDate = new Date(Date.UTC(year, monthIndex, day, hour, minute));
    return newDate.toISOString();
  } catch (error) {
    return undefined;
  }
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
      const pageContent = response.data as string;
      const articles = extractArticlesFromPage(pageContent);
      const marketplaceData = extractMarketPlaceFromPage(pageContent);
      const date = extractDateFromPage(pageContent);
      return res.json({ articles, date, marketplaceData });
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
