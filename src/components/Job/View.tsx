import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import { getJob } from '../../api';
import { AxiosResponse } from 'axios';
import { Job } from '../../interfaces/Job';
import { Helmet } from 'react-helmet';
import {Button, CircularProgress} from '@material-ui/core';
import { ViewParams } from '../../interfaces/General';
import { Link } from "react-router-dom";
import { Edit } from "@material-ui/icons";

export const JobView = () => {
  const { id } = useParams<ViewParams>();
  const [job, setJob] = useState<Job | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getJob(id).then((response: AxiosResponse) => {
      if (response?.data) {
        setJob(response.data);
        setLoading(false)
      }
    }).catch(() => {
      setLoading(false)
    })
  }, []);

  if (!job && !loading) {
    return <span>Job not found</span>
  }

  if (!job) {
    return <CircularProgress />
  }

  const { summary, description, status, raised_by, property } = job;

  return (
    <div>
      <Helmet>
        <title>{summary}</title>

      </Helmet>

      <div>
        <h1>{summary}</h1>

        {description && <p>{description}</p>}

        <div>
          <span>Status:</span> {status}
        </div>

        <div>
          <span>Raised by:</span> {raised_by}
        </div>
        <div>
          <span>Property:</span> {property.name}
        </div>

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to={`/job/${id}/edit`}
          startIcon={<Edit />}
        >
          Edit job
        </Button>
      </div>
    </div>
  );
}
