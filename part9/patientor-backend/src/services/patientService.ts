import patientsData from "../../data/patients";
import { PatientWithoutSsn, Patient, NewPatientEntry } from "../types";
import { v1 as uuid } from "uuid";

const getPatientsWithoutSsn = (): PatientWithoutSsn[] => {
  return patientsData.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};

const getPatient = (id: string): Patient | undefined => {
  return patientsData.find(patient => patient.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const generatedId = uuid();

  const newPatient = {
    id: generatedId,
    ...entry,
  };

  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatientsWithoutSsn,
  addPatient,
  getPatient,
};
