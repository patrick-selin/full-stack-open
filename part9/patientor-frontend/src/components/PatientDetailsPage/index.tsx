// PatientDetailsPage/index.ts

import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const PatientDetailsPage = () => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const match = useMatch("/patients/:id");

  useEffect(() => {
    // console.log(match);
    const fetchPatientDetails = async () => {
      try {
        const response = await patientService.getOne(
          match?.params.id as string
        );
        console.log(response);
        setPatientDetails(response);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [match]);

  return (
    <Box>
      {patientDetails && (
        <>
          <Typography variant="h3">{patientDetails.name}</Typography>
          <Typography>Date of Birth: {patientDetails.dateOfBirth}</Typography>
          <Typography>SSN: {patientDetails.ssn}</Typography>
          <Typography>Gender: {patientDetails.gender}</Typography>
          <Typography>Occupation: {patientDetails.occupation}</Typography>
        </>
      )}
      {!patientDetails && <Typography>Loading...</Typography>}
    </Box>
  );
};

export default PatientDetailsPage;
