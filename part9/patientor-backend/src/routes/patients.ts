import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";
import { Patient } from "../types"

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
