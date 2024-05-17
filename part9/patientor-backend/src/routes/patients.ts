import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewPatient";
import { Patient, EntryWithoutId } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNoSsnPatient());
});

// api/patients/:id
router.get("/:id", (req, res) => {
  const patientId = req.params.id;
  // console.log(patientId);
  res.send(patientService.getPatientForOne(patientId) as Patient);
});

router.post("/:id/entries", (req, res) => {
  console.log(req.body);
  console.log("kii");
  try {
    const patient = patientService.getPatientForOne(req.params.id);
    if (!patient) {
      res.status(404).send(`patient not found`);
      return;
    }

    const newEntry = toNewEntry(req.body)  as EntryWithoutId;;
    const addedEntry = patientService.addEntry(patient, newEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);

    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    res.status(400).send(errorMessage);
  }
});

export default router;
