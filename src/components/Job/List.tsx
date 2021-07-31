import React, { useEffect, useState } from 'react';
import { getJobs, deleteJob } from "../../api";
import { AxiosResponse } from "axios";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { Job } from "../../interfaces/Job";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";

export const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    getJobs().then((response: AxiosResponse) => {
      console.log('response', response);

      if (response?.data?.length > 0) {
        setJobs(response.data);
      }
    })
  }, []);

  const removeJob = (id: number, index: number) => {
    deleteJob(id).then((response: AxiosResponse) => {
      console.log('Delete response', response);
      console.log('index:', index);
      console.log('response.status:', response.status);

      if (response.status === 204) {
        jobs.splice(index, 1);
        setJobs([...jobs]);
      }
    });
  }

  return (
    <div>
      {jobs.length === 0 && <span>No jobs found</span>}

      {jobs.length > 0 && (<div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Summary</TableCell>
                <TableCell align="center">Property</TableCell>
                <TableCell align="center">Raised by</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job: Job, index: number) => (
                <TableRow key={job.id}>
                  <TableCell align="center" component="th" scope="row">
                    {job.summary}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {job.property.name}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {job.raised_by}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <IconButton component={Link} to={`/job/${job.id}`}>
                      <InfoIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => { removeJob(job.id, index) }}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>)}
    </div>
  );
}
