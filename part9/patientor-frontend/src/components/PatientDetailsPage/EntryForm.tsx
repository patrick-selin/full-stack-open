import React, { useState, useContext } from "react";
import {
  OutlinedInput,
  SelectChangeEvent,
  Typography,
  TextField,
  Grid,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import { EntryWithoutId, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

interface HealthCheckRatingOption {
  value: number;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRating
)
  .filter((value) => typeof value === "number")
  .map((v) => ({
    value: v as number,
    label: HealthCheckRating[v as number],
  }));

const EntryForm: React.FC<Props> = ({ onCancel, onSubmit, diagnoses }) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);
  const [healthCheckRating, setHealthCheckRating] = useState(
    HealthCheckRating.Healthy
  );
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");
  const [entryOptions, setEntryOptions] = useState("");

  const onHealthCheckRatingChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    const value = Number(event.target.value);
    setHealthCheckRating(value);
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    event.preventDefault();
    const value = event.target.value;
    typeof value === "string"
      ? setDiagnosisCodes(value.split(", "))
      : setDiagnosisCodes(value);
  };

  const addEntry = (event: React.FormEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (entryOptions) {
      case "HealthCheck":
        onSubmit({
          type: "HealthCheck",
          ...baseEntry,
          healthCheckRating,
        });
        break;
      case "Hospital":
        onSubmit({
          type: "Hospital",
          ...baseEntry,
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          type: "OccupationalHealthcare",
          ...baseEntry,
          employerName,
          sickLeave:
            sickLeaveStart && sickLeaveEnd
              ? {
                  startDate: sickLeaveStart,
                  endDate: sickLeaveEnd,
                }
              : undefined,
        });
        break;
    }
  };

  return (
    <Box>
      <Typography component="h5" variant="h5">
        New Entry
      </Typography>
      <InputLabel style={{ marginTop: 20 }}>Entry Options</InputLabel>
      <Select
        label="Option"
        fullWidth
        value={entryOptions}
        onChange={({ target }) => setEntryOptions(target.value)}
      >
        <MenuItem key="HealthCheck" value="HealthCheck">
          Health Check
        </MenuItem>
        <MenuItem key="Hospital" value="Hospital">
          Hospital
        </MenuItem>
        <MenuItem key="OccupationalHealthcare" value="OccupationalHealthcare">
          Occupational Healthcare
        </MenuItem>
      </Select>

      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          required
        />

        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          fullWidth
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
          required
        />

        <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
        <TextField
          label="specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          required
        />

        <InputLabel style={{ marginTop: 20 }}>Diagnosis codes</InputLabel>
        <Select
          label="Diagnosis codes"
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          input={<OutlinedInput label="Multiple Select" />}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code}
            </MenuItem>
          ))}
        </Select>

        {entryOptions === "HealthCheck" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>
              Health Check Rating
            </InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating.toString()}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.label} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        )}

        {entryOptions === "Hospital" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Discharge Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
              required
            />
            <InputLabel style={{ marginTop: 20 }}>
              Discharge Criteria
            </InputLabel>
            <TextField
              label="discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
              required
            />
          </>
        )}

        {entryOptions === "OccupationalHealthcare" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
            <TextField
              label="employer name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              required
            />
            <InputLabel style={{ marginTop: 20 }}>Sick Leave</InputLabel>
            <InputLabel style={{ marginTop: 5 }}>Start Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={sickLeaveStart}
              onChange={({ target }) => setSickLeaveStart(target.value)}
            />
            <InputLabel style={{ marginTop: 5 }}>End Date</InputLabel>
            <TextField
              type="date"
              fullWidth
              value={sickLeaveEnd}
              onChange={({ target }) => setSickLeaveEnd(target.value)}
            />
          </>
        )}

        <Grid container spacing={2} style={{ marginTop: 20 }}>
          <Grid item>
            <Button color="secondary" variant="contained" onClick={onCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default EntryForm;
