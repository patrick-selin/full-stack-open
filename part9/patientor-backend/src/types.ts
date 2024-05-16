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
  entries: Entry[]
}

export type PatientWithoutSsn = Omit<Patient, "ssn">;

export type NewPatientEntry = Omit<Patient, "id">;

export enum Gender {
  Female = "female",
  Male = "male",
  Other = 'other'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;