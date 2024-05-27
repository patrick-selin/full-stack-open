import patientsData from "../../data/patients-full";
import {
  NoSsnPatient,
  Patient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
  return patientsData;
};

const getPatientForOne = (id: string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
};

const getNoSsnPatient = (): NoSsnPatient[] => {
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


const addPatient = (entry: NewPatient): Patient => {
  const id = uuid();
  const newPatient = {
    id,
    ...entry,
  };

  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = ( patient: Patient, entry: EntryWithoutId ): Entry => {
  const id = uuid();
  const newEntry = {
      id,
      ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNoSsnPatient,
  addPatient,
  getPatientForOne,
  addEntry,
};
