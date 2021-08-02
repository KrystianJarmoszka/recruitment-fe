import React, { useEffect, useState } from 'react';
import { deleteJob } from '../../api';
import { AxiosResponse } from 'axios';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  TextField,
  MenuItem,
  Button
} from '@material-ui/core';
import {Job, JobFilterParams, JobsState} from '../../interfaces/Job';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchJobs, setKeyWord, setOrder} from '../../redux/reducers/JobsSlice';
import { useStyles } from './Styles';
import Pagination from '@material-ui/lab/Pagination';
import {ControlPoint} from "@material-ui/icons";

export const JobList = () => {
  const { items: jobs, page, pages, status, keyWord, order } = useSelector(
    (state: { jobs: JobsState }) => state.jobs
  );
  const [searchKeyWord, setSearchKeyWord] = useState<string>(keyWord);
  const [orderDirection, setOrderDirection] = useState<string>(order);
  const dispatch = useDispatch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keyWord !== searchKeyWord) {
        dispatch(fetchJobs(getQueryParams()));
        dispatch(setKeyWord(searchKeyWord));
      }
    }, 1200)

    return () => clearTimeout(delayDebounceFn)
  }, [searchKeyWord])

  const classes = useStyles();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs(getQueryParams()));
    }
  }, [status, dispatch]);

  useEffect(() => {
    dispatch(fetchJobs(getQueryParams()));
    dispatch(setOrder(orderDirection));
  }, [orderDirection, dispatch]);

  const removeJob = (id: number) => {
    deleteJob(id).then((response: AxiosResponse) => {
      if (response.status === 204) {
        dispatch(fetchJobs(getQueryParams()));
      }
    });
  }

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(fetchJobs(getQueryParams(page)));
  }

  const handleOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const order = e.target.value;
    setOrderDirection(order);
  }

  const getQueryParams = (newPage: number = page) => {
    const params: JobFilterParams = {
      page: newPage,
      order: orderDirection
    }

    if (searchKeyWord) {
      params.summary = searchKeyWord
    }

    return params;
  }

  if (status === 'loading') {
    return (<div className={classes.container}>
      <CircularProgress />
    </div>)
  }

  if (status === 'failed') {
    return <div className={classes.container}>Something went wrong.</div>
  }

  return (
    <div>
      <div className={classes.container}>
        <div>
          <form noValidate autoComplete="off">
            <TextField
              id="keyword"
              label="Type to search"
              value={searchKeyWord}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyWord(e.target.value)}
            />

            <TextField
              id="order-direction"
              select
              label="Order"
              value={orderDirection}
              onChange={handleOrderChange}
              helperText="Please select order direction"
            >
              <MenuItem key={'newest'} value={'1'}>newest</MenuItem>
              <MenuItem key={'oldest'} value={'-1'}>oldest</MenuItem>
            </TextField>
          </form>
        </div>

        {jobs.length === 0 && (<div className={classes.missingJobs}>
          <span>No jobs found</span>
        </div>)}

        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to={`/job/add`}
          startIcon={<ControlPoint />}
        >
          Log job
        </Button>
      </div>

      {jobs.length > 0 && (<div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {['ID', 'Summary', 'Description', 'Status', 'Property', 'Raised by', 'Action'].map((ceilTitle: string) => (
                  <TableCell key={ceilTitle} align="center">{ceilTitle}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {jobs.map((job: Job) => (
                <TableRow key={job.id}>
                  <TableCell align="center" component="th" scope="row">
                    {job.id}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {job.summary}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {job.description.length > 5 ? `${job.description.slice(0, 5)}...` : job.description}
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
                    <IconButton onClick={() => { removeJob(job.id) }}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className={classes.container}>
          <Pagination count={pages} page={page} onChange={handlePaginationChange} />
        </div>
      </div>)}
    </div>
  );
}
