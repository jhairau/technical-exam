import { getAllWarns } from "./amocWarnings";

describe("getting data", () => {
  it("should download data", async () => {
    const warnings = await getAllWarns();

    expect(Object.keys(warnings).length).toBeGreaterThan(1);
  });

  it("should download data", async () => {
    const warnings = await getAllWarns();

    expect(Object.keys(warnings)).toContain("IDQ11307.amoc.xml");
  });
});
