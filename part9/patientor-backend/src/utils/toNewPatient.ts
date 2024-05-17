import { NewPatientEntry, Gender, Entry } from "../types";

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
    throw new Error("Incorrect or missing date of birth");
  }

  return dateOfBirth;
};

//
// isPropper Ssn
//

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing ssn");
  }

  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): string => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }

  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }

  return occupation;
};

const isEntry = (entry: unknown): entry is Entry => {
  return (
    typeof entry === "object" &&
    entry !== null &&
    "type" in entry &&
    (entry.type === "Hospital" ||
      entry.type === "OccupationalHealthcare" ||
      entry.type === "HealthCheck")
  );
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries)) {
    throw new Error("Incorrect or missing entries");
  }

  entries.forEach((entry) => {
    // console.log(entry);
    if (!isEntry(entry)) {
      throw new Error("Invalid entry");
    }
  });

  return entries as Entry[];
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
    "occupation" in object &&
    "entries" in object
  ) {
    const newPatient: NewPatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: parseEntries(object.entries),
    };

    return newPatient;
  }

  throw new Error("Incorrect data: a field missing");
};

export default toNewPatientEntry;
