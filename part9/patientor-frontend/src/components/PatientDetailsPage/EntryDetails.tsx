// EntryDetails.tsx

import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckRating } from "../../types";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => (
  <Box>
    <Typography variant="body2">
      <FavoriteIcon /> {HealthCheckRating[entry.healthCheckRating]}
    </Typography>
  </Box>
);

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => (
  <Box>
    <Typography variant="body2">
      <LocalHospitalIcon /> Discharge: {entry.discharge.date} - {entry.discharge.criteria}
    </Typography>
  </Box>
);

const OccupationalHealthcareEntryDetails = ({ entry }: { entry: OccupationalHealthcareEntry }) => (
  <Box>
    <Typography variant="body2">
      <WorkIcon /> {entry.employerName}
    </Typography>
    {entry.sickLeave && (
      <Typography variant="body2">
        Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
      </Typography>
    )}
  </Box>
);

const EntryDetails = ({ entry }: { entry: Entry}) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;