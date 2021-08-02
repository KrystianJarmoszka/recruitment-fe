import React, {useState} from 'react';
import { useParams } from "react-router";
import { NewJob} from "../../interfaces/Job";
import { ViewParams } from "../../interfaces/General";

export const AddEditJobView = () => {
  const { id } = useParams<ViewParams>();
  const newJob: NewJob = {
    summary: '',
    description: '',
    status: 'open',
    raised_by: '',
    property: null
  }

  const [job, setJob] = useState<NewJob>(id ? newJob : newJob);

  return (
    <div>
      add edit view
    </div>
  );
}
