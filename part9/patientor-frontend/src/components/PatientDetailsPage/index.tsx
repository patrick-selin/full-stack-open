// PatientDetailsPage/index.ts

import { useParams } from "react-router-dom";
import { Patient } from "../../types";

// fetch data from :id endpoint

const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  //
  return <div>PatientDetailsPage</div>;
};

export default PatientDetailsPage;
