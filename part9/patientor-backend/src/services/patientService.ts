import patients from "../../data/patients";
import { PatientWithoutSsn, Patient, NewPatientEntry } from "../types";
import { v1 as uuid } from 'uuid'

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const generatedId = uuid();

  const newPatientEntry = {
    id: generatedId,
    ...entry,
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatientsWithoutSsn,
  addPatient,
};
