interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}
interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

//
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
// Define Entry without the 'id' property

export type EntryWithoutId = UnionOmit<Entry, "id">;
//

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export type PatientWithoutSsn = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = "other",
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export type NewBaseEntry = Omit<BaseEntry, "id">;
