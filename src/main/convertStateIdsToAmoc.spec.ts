import { convertStateIdsToAmoc } from "./convertStateIdsToAmoc";

describe("getAmocToStateId", () => {
  test("that it returns all states", () => {
    expect(convertStateIdsToAmoc("NT")).toEqual("IDD");
    expect(convertStateIdsToAmoc("NSW")).toEqual("IDN");
    expect(convertStateIdsToAmoc("Qld")).toEqual("IDQ");
    expect(convertStateIdsToAmoc("SA")).toEqual("IDS");
    expect(convertStateIdsToAmoc("Tas")).toEqual("IDT");
    expect(convertStateIdsToAmoc("Vic")).toEqual("IDV");
    expect(convertStateIdsToAmoc("WA")).toEqual("IDW");
    expect(convertStateIdsToAmoc("ACT")).toEqual("IDN");
  });
});
