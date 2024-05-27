import diaries from "../../data/diagnoses";
import { DiagnoseEntry } from "../types";

const getDiagnoses = (): DiagnoseEntry[] => {
  return diaries;
};

export default {
  getDiagnoses,
};
