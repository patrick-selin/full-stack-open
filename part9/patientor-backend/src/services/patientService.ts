import patientsData from "../../data/patients-full";
import { PatientWithoutSsn, Patient, NewPatientEntry, EntryWithoutId, Entry } from "../types";
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
 const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
    const newId: string = uuid();
    const newEntry = {
        id: newId,
        ...entry
    };
    const idx: number = patientsData.findIndex((patient) => patientId === patient.id);
    if (idx === -1) {
        throw Error("Patient not found");
    }
    else {
        patientsData[idx].entries.push(newEntry);
        return newEntry;
    }
};

//
const addEntry = (patientId: string, entry: EntryWithoutId): Entry => {
  const newId: string = uuid();
  const newEntry = {
      id: newId,
      ...entry
  };
  const idx: number = patientsData.findIndex((patient) => patientId === patient.id);
  if (idx === -1) {
      throw Error("Patient not found");
  }
  else {
      patientsData[idx].entries.push(newEntry);
      return newEntry;
  }
};


export default {
  getPatientsWithoutSsn,
  addPatient,
  getPatient,
  addEntry,
};
