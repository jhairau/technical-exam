import { downloadTo } from "basic-ftp/dist/transfer";
import express from "express";
import { convertStateIdsToAmoc } from "./main/convertStateIdsToAmoc";
import { FloodWarningParser } from "./parser/FloodWarningParser";
import { WarningColletor, WarningTextCollector } from "./floods/WarningCollector";
import { getAllWarns } from "./floods/amocWarnings";

require("./main/log.ts");

const app = express();
const port = 3000;

const ERRORMESSAGE = "Something went wrong";

app.get("/", async (req, res) => {
  try {
    const data = await getAllWarns();

    const state = convertStateIdsToAmoc(req.query.state?.toString() || "");

    let results = [];
    for (let key of data) {
      if (key.startsWith(state)) {
        results.push(key.replace(/\.amoc\.xml/, ""));
      }
    }

    res.send(results);
  } catch (error) {
    res.send(ERRORMESSAGE);
  }
});

app.get("/warning/:id", async (req, res) => {
  try {
    const downloader = new WarningColletor();
    const xmlid = req.params.id;

    const warning = await downloader.downloadWarning(xmlid);
    const warningParser = new FloodWarningParser(warning);

    const textDownloader = new WarningTextCollector()
    const text = await textDownloader.downloadWarning(xmlid);

    res.send({ ...(await warningParser.getWarning()), text: text || "" });
  } catch (error) {
    res.send(ERRORMESSAGE);
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
