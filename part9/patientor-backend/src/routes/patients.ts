import express from "express";
import patientService from "../services/patientService";
import addEntry from "../services/patientService";
import toNewPatientEntry from "../utils/toNewPatient";
import toNewEntry from "../utils/toNewPatient";
import { Patient } from "../types";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getPatientsWithoutSsn());
});

// api/patients/:id
router.get("/:id", (req, res) => {
  const patientId = req.params.id;
  // console.log(patientId);
  res.send(patientService.getPatient(patientId) as Patient);
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);

    return res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(400).json({ error: "Unknown error occurred" });
    }
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
