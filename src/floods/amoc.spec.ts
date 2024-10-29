import { getAllWarns } from "./amocWarnings";

// Note: Should be using Mocks, if we are doing integration tests then seperate them so we can run indivually and control the source FTP

describe("getting data", () => {
  it("should download data", async () => {
    const warnings = await getAllWarns();

    expect(Object.keys(warnings).length).toBeGreaterThan(1);
  });

  // Note: Integration test, where you don't control the data source. Fail
  it("should download data", async () => {
    const warnings = await getAllWarns();

    expect(Object.keys(warnings)).toContain("IDQ11307.amoc.xml");
  });
});
