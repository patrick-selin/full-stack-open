import React, { useState } from "react";
import { EntryFormValues, HealthCheckRating, SickLeave } from "../../types";

interface EntryFormProps {
  onSubmit: (values: EntryFormValues) => void;
}

const EntryForm: React.FC<EntryFormProps> = ({ onSubmit }) => {
  const [type, setType] = useState<"HealthCheck" | "OccupationalHealthcare" | "Hospital" | "">("");
  const [formValues, setFormValues] = useState<EntryFormValues>({
    description: "",
    date: "",
    specialist: "",
    type: "HealthCheck",
    healthCheckRating:1,
    employerName: "",
    sickLeave: {
      startDate: "",
      endDate: "",
    },
    discharge: {
      date: "",
      criteria: "",
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(formValues);
  };

  return (
    <div>
      <h3>Select Entry Type</h3>
      <div>
        <button onClick={() => setType("HealthCheck")}>HealthCheck</button>
        <button onClick={() => setType("OccupationalHealthcare")}>Occupational Healthcare</button>
        <button onClick={() => setType("Hospital")}>Hospital</button>
      </div>

      {type && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formValues.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Specialist</label>
            <input
              type="text"
              name="specialist"
              value={formValues.specialist}
              onChange={handleInputChange}
            />
          </div>

          {type === "HealthCheck" && (
            <div>
              <label>Health Check Rating</label>
              <input
                type="number"
                name="healthCheckRating"
                value={formValues.healthCheckRating}
                onChange={handleInputChange}
              />
            </div>
          )}

          {type === "OccupationalHealthcare" && (
            <>
              <div>
                <label>Employer Name</label>
                <input
                  type="text"
                  name="employerName"
                  value={formValues.employerName}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Sick Leave Start Date</label>
                <input
                  type="date"
                  name="sickLeave.startDate"
                  value={formValues.sickLeave?.startDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Sick Leave End Date</label>
                <input
                  type="date"
                  name="sickLeave.endDate"
                  value={formValues.sickLeave?.endDate}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          {type === "Hospital" && (
            <>
              <div>
                <label>Discharge Date</label>
                <input
                  type="date"
                  name="discharge.date"
                  value={formValues.discharge?.date}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Discharge Criteria</label>
                <input
                  type="text"
                  name="discharge.criteria"
                  value={formValues.discharge?.criteria}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <button type="submit">Add Entry</button>
        </form>
      )}
    </div>
  );
};

export default EntryForm;
