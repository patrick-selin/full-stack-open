// types.ts

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry["code"]>;
}

export interface DiagnoseEntry {
  code: string;
  name: string;
  latin?: string;
}

export enum HealthCheckRating {
  Healthy = 1,
  LowRisk = 2,
  HighRisk = 3,
  CriticalRisk = 4
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export interface SickLeave {
  startDate: string,
  endDate: string,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
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
//
//
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = Omit<Entry, "id">;

type UnionOmit<T, K extends string | number | symbol> 
  = T extends unknown ?
      Omit<T, K> 
      : never;
      
export type EntryWithoutId = UnionOmit<Entry, 'id'>;