import { NewPatientEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

//
// isPropperDate
//

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!isString(dateOfBirth)) {
    throw new Error("Incorrect or missing name");
  }

  return dateOfBirth;
};

//
// isPropper Ssn
//

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing name");
  }

  return ssn;
};


const parseGender = (ssn: unknown): string => {
    if (!isString(ssn)) {
      throw new Error("Incorrect or missing name");
    }
  
    return ssn;
  };

//
const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: "Digital Man",
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;
