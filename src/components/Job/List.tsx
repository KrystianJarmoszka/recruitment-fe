import React, { useEffect } from 'react';
import { deleteJob } from "../../api";
import { AxiosResponse } from "axios";
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress} from '@material-ui/core';
import { Job, JobsState } from "../../interfaces/Job";
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs, selectAllJobs} from "../../redux/reducers/jobsSlice";
import { useStyles } from "./Styles";

export const JobList = () => {
  const jobs = useSelector(selectAllJobs);
  const jobsStatus = useSelector((state: { jobs: JobsState }) => state.jobs.status);
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (jobsStatus === 'idle') {
      dispatch(fetchJobs());
    }
  }, [jobsStatus, dispatch]);

  const removeJob = (id: number, index: number) => {
    deleteJob(id).then((response: AxiosResponse) => {
      if (response.status === 204) {
        jobs.splice(index, 1);
      }
    });
  }

  if (jobsStatus === 'loading') {
    return (<div className={classes.container}>
      <CircularProgress />
    </div>)
  }

  if (jobsStatus === 'failed') {
    return <div className={classes.container}>Something went wrong.</div>
  }

  return (
    <div>
      {jobs.length === 0 && <span>No jobs found</span>}

      {jobs.length > 0 && (<div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Summary</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Property</TableCell>
                <TableCell align="center">Raised by</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job: Job, index: number) => (
                <TableRow key={job.id}>
                  <TableCell align="center" component="th" scope="row">
                    {job.id}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {job.summary}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {job.status}
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
