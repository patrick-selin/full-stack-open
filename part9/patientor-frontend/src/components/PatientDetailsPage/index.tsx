/// PatientDetailsPage/index.ts

import { Patient, Entry, Diagnosis, EntryFormValues } from "../../types";
import axios from "axios";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import EntryDetails from "./EntryDetails";
import EntryForm from "./EntryForm";

const PatientDetailsPage = () => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  const match = useMatch("/patients/:id");

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await patientService.getOne(
          match?.params.id as string
        );
        setPatientDetails(response);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchPatientDetails();
    fetchDiagnosesList();
  }, [match]);

  const getDiagnosisDescription = (code: string): string => {
    const diagnosis = diagnoses.find((diagnosis) => diagnosis.code === code);
    return diagnosis
      ? `${diagnosis.code} ${diagnosis.name}`
      : "Unknown diagnosis";
  };

  const handleEntrySubmit = async (values: EntryFormValues) => {
    try {
      if (patientDetails) {
        const newEntry = await patientService.addEntry(
          patientDetails.id,
          values
        );
        setPatientDetails({
          ...patientDetails,
          entries: patientDetails.entries.concat(newEntry),
        });
        setError(null); // Clear any previous errors
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data || "Error adding entry");
      } else {
        setError("Error adding entry");
      }
    }
  };

  return (
    <Box>
      {patientDetails ? (
        <>
          <Typography variant="h3" style={{ marginTop: "1.0em" }}>
            {patientDetails.name}
          </Typography>
          <Typography>Date of Birth: {patientDetails.dateOfBirth}</Typography>
          <Typography>SSN: {patientDetails.ssn}</Typography>
          <Typography>Gender: {patientDetails.gender}</Typography>
          <Typography>Occupation: {patientDetails.occupation}</Typography>
          <Typography variant="h5" style={{ marginTop: "1.0em" }}>
            Entries:
          </Typography>
          {patientDetails.entries.length === 0 ? (
            <Typography>No entries found.</Typography>
          ) : (
            <List>
              {patientDetails.entries.map((entry: Entry) => (
                <ListItem
                  key={entry.id}
                  alignItems="flex-start"
                  sx={{
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    marginBottom: "1em",
                    padding: "1em",
                  }}
                >
                  <ListItemText
                    primary={`${entry.date}: ${entry.description}`}
                    secondary={`Diagnosed by: ${entry.specialist}`}
                  />
                  <EntryDetails entry={entry} />
                  {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
                    <List component="div" disablePadding>
                      {entry.diagnosisCodes.map((code) => (
                        <ListItem key={code} component="div" disableGutters>
                          <ListItemText
                            primary={getDiagnosisDescription(code)}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </ListItem>
              ))}
            </List>
          )}

          <EntryForm onSubmit={handleEntrySubmit} />

          {error && <Typography color="error">{error}</Typography>}
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};

export default PatientDetailsPage;
