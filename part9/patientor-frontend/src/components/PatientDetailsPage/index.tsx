// PatientDetailsPage/index.ts

import { Patient, Entry, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";

const PatientDetailsPage = () => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const match = useMatch("/patients/:id");

  useEffect(() => {
    // console.log(match);
    const fetchPatientDetails = async () => {
      try {
        const response = await patientService.getOne(
          match?.params.id as string
        );
        // console.log(response);
        setPatientDetails(response);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnoseService.getAll();
    //   console.log(`diagnoses :: ${JSON.stringify(diagnoses)}`);
      setDiagnoses(diagnoses);
    };
    void fetchPatientDetails();
    void fetchDiagnosesList();

  }, [match]);

  const getDiagnosisDescription = (code: string): string => {
    const diagnosis = diagnoses.find(diagnosis => diagnosis.code === code);
    return diagnosis ? `${diagnosis.code} ${diagnosis.name}` : "Unknown diagnosis";
  };

  return (
    <Box>
      {patientDetails && (
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
                <ListItem key={entry.id}>
                  <ListItemText
                    primary={`${entry.date}: ${entry.description}`}
                    secondary={
                      entry.diagnosisCodes && entry.diagnosisCodes.length > 0 ? (
                        <List>
                          {entry.diagnosisCodes.map(code => (
                            <ListItem key={code}>
                              <ListItemText
                                primary={getDiagnosisDescription(code)}
                              />
                            </ListItem>
                          ))}
                        </List>
                      ) : "No diagnosis codes"
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
      {!patientDetails && <Typography>Loading...</Typography>}
    </Box>
  );
};

export default PatientDetailsPage;
