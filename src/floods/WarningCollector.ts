import { Client } from "basic-ftp";
import fs from "fs";
import { readWarningData } from "../parser/ReadWarningData";

// Note: So WET. I don't need to fix, because I propose we just get .xml file only

export class WarningColletor {
  async downloadWarning(amocRegion: string) {
    const client = new Client();
    client.ftp.verbose = true; // Seen - Not on listing method and not feature flagged

    await client.access({
      host: "ftp.bom.gov.au", // Note: I would put this in a config file
      secure: false,
    });

    await client.cd("/anon/gen/fwo/");

    // NOTE: I could probably just use downloadTo method and handle an error of NOT found,
    // I don't need to list all files since I know the format, making the rest of the code moot

    const files = await client.list();

    // Note: Messy. We could use native filter instead
    for (let file = 0; file < files.length; file++) {
      if (
        files[file].name.endsWith(".amoc.xml") &&
        `${amocRegion}.amoc.xml` == files[file].name
      ) {
        let fileData = files[file];
        if (
          fileData.isSymbolicLink === false &&
          fileData.isDirectory == false
        ) {
          // Note: Deprecated fn, not happy with relative path either, I want to clean up old files
          await client.download(`./${amocRegion}.xml`, files[file].name);
        }
      }
    }

    client.close();
    const data = readWarningData(amocRegion);

    return data;
  }
}

export class WarningTextCollector extends WarningColletor {
  async downloadWarning(key: string) {
    const client = new Client();
    client.ftp.verbose = true;
    let warningText = "";
    try {
      await client.access({
        host: "ftp.bom.gov.au", // Note: I would put this in a config file
        secure: false,
      });

      await client.cd("/anon/gen/fwo/");

      await client.download(`./${key}.txt`, key + ".txt");

      warningText = fs.readFileSync(`./${key}.txt`, {
        encoding: "utf-8",
      });
    } catch (err) {
      console.log(key + " file not found");
      return "";
    }

    client.close();

    return warningText;
  }
}
