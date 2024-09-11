

import fs from "fs";
import path from "path";
import { parseXmlString } from "./parseXmlString";

describe("parsing xml", () => {
  it("should parse xml", (done) => {
    const xml = fs.readFileSync(path.resolve(__dirname, "./IDN11024.amoc.xml"));

    parseXmlString(xml.toString(), (json) => {
      console.log(JSON.stringify(json, null, 2));
      expect(json).toEqual({
        "amoc": {
          "$": {
            "version": "1.7",
            "xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "xsi:noNamespaceSchemaLocation": "http://www.bom.gov.au/schema/v1.7/amoc.xsd"
          },
          "source": [
            {
              "sender": [
                "Australian Government Bureau of Meteorology"
              ],
              "region": [
                "New South Wales"
              ],
              "office": [
                "NSWRO"
              ],
              "copyright": [
                "http://www.bom.gov.au/other/copyright.shtml"
              ],
              "disclaimer": [
                "http://www.bom.gov.au/other/disclaimer.shtml"
              ]
            }
          ],
          "identifier": [
            "IDN11024"
          ],
          "issue-time-utc": [
            "2024-09-10T19:15:00Z"
          ],
          "issue-time-local": [
            {
              "_": "2024-09-11T05:15:00+10:00",
              "$": {
                "tz": "EST"
              }
            }
          ],
          "sent-time": [
            "2024-09-10T19:15:26Z"
          ],
          "expiry-time": [
            "2024-09-11T19:15:00Z"
          ],
          "validity-bgn-time-local": [
            {
              "_": "2024-09-11T00:00:00+10:00",
              "$": {
                "tz": "EST"
              }
            }
          ],
          "validity-end-time-local": [
            {
              "_": "2024-09-14T23:59:59+10:00",
              "$": {
                "tz": "EST"
              }
            }
          ],
          "next-routine-issue-time-utc": [
            "2024-09-11T06:30:00Z"
          ],
          "next-routine-issue-time-local": [
            {
              "_": "2024-09-11T16:30:00+10:00",
              "$": {
                "tz": "EST"
              }
            }
          ],
          "status": [
            "O"
          ],
          "service": [
            "WSP"
          ],
          "sub-service": [
            "FDS"
          ],
          "product-type": [
            "F"
          ],
          "phase": [
            "NEW"
          ]
        }
      });

      done();
    });
  });
});
