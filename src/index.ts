import { downloadTo } from "basic-ftp/dist/transfer";
import express from "express";
import { convertStateIdsToAmoc, StateId } from "./main/convertStateIdsToAmoc";
import { FloodWarningParser } from "./parser/FloodWarningParser";
import {
  WarningColletor,
  WarningTextCollector,
} from "./floods/WarningCollector";
import { getAllWarns } from "./floods/amocWarnings";

// Note: Why require?
require("./main/log.ts");

const app = express();
const port = 3000; // Note: .env

//Note: Haven't seen a case for having a generic error message
const ERRORMESSAGE = "Something went wrong";

// Note: Breaks 4 layer - API is presentation, we should abstract the logic to a service
app.get("/", async (req, res) => {
  try {
    const data = await getAllWarns(); // Note: Probably have filter on method or wrapper

    const stateCode = (req.query.state?.toString() as StateId) || null;

    if (!stateCode) {
      throw new Error("State code is required");
    }

    const stateAmoc = convertStateIdsToAmoc(stateCode);

    let results = [];
    for (let key of data) {
      if (key.startsWith(stateAmoc)) {
        results.push(key.replace(/\.amoc\.xml/, ""));
      }
    }

    res.send(results);
  } catch (error) {
    // Wet - Tech Exam
    const errorMessage = (error as Error)?.message || ERRORMESSAGE;
    res.send(errorMessage);
    console.error(error);
  }
});

// Note: I would like to change paths to make sense, but its already in production 1 year
app.get("/warning/:id", async (req, res) => {
  // Not typed: but VSCODE does let me know id=string
  try {
    const downloader = new WarningColletor();
    const xmlid = req.params.id;

    // Note: Fix my just getting .xml
    const warning = await downloader.downloadWarning(xmlid);
    const warningParser = new FloodWarningParser(warning);

    const textDownloader = new WarningTextCollector();
    const text = await textDownloader.downloadWarning(xmlid);

    // Note: Should of been parallel and not sequential
    const [warning, text] = await Promise.all([
      downloader.downloadWarning(xmlid),
      textDownloader.downloadWarning(xmlid),
    ]);

    res.send({ ...(await warningParser.getWarning()), text: text || "" });
  } catch (error) {
    // Wet - Tech Exam
    const errorMessage = (error as Error)?.message || ERRORMESSAGE;
    res.send(errorMessage);
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
