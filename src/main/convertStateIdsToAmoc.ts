export type AmocId =
  | "IDD"
  | "IDN"
  | "IDQ"
  | "IDS"
  | "IDT"
  | "IDV"
  | "IDW"
  | "IDN"
  | "UNK";

export type StateId =
  | "NT"
  | "NSW"
  | "QLD"
  | "SA"
  | "TAS"
  | "VIC"
  | "WA"
  | "ACT";

const stateIdsToAmoc: Record<StateId, AmocId> = {
  NT: "IDD",
  NSW: "IDN",
  QLD: "IDQ",
  SA: "IDS",
  TAS: "IDT",
  VIC: "IDV",
  WA: "IDW",
  ACT: "IDN",
};

export function convertStateIdsToAmoc(stateId: StateId): AmocId | null {
  if (!stateId) {
    throw new Error("State Id was missing");
  }
  const stateUpper = stateId.toUpperCase() as StateId;

  return stateIdsToAmoc[stateUpper] || null;
}
