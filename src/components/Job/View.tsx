import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import { getJob } from "../../api";
import { AxiosResponse } from "axios";
import { Job, JobParams } from "../../interfaces/Job";
import { Helmet } from "react-helmet";
import { CircularProgress } from "@material-ui/core";

export const JobView = () => {
  const { id } = useParams<JobParams>();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true)


  useEffect(() => {
    getJob(id).then((response: AxiosResponse) => {
      console.log('response', response);

      if (response?.data) {
        setJob(response.data);
        setLoading(false)
      }
    }).catch(() => {
      console.log('catch');
      setLoading(false)
    })
  }, []);

  if (!job && !loading) {
    return <span>Job not found</span>
  }

  if (!job) {
    return <CircularProgress />
  }

  return (
    <div>
      <Helmet>
        <title>{job.summary}</title>

      </Helmet>
      {job && job.summary}
    </div>
  );
}
