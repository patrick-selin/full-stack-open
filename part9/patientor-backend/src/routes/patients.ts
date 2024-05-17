import express from "express";
import patientService from "../services/patientService";
import toNewPatient from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewEntry";
import { Patient } from "../types";

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
  try {
    const patient = patientService.getPatientForOne(req.params.id);
    if (!patient) {
      res.status(404).send(`patient not found`);
      return;
    }
    const newEntry = toNewEntry(req.body);
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
    const newPatientEntry = toNewPatient(req.body);
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
