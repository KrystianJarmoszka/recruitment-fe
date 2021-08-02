import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {JobForm, JobStatusForm } from '../../../interfaces/Job';
import { ViewParams } from '../../../interfaces/General';
import { JOB_STATUSES, STATUS_OPEN } from '../../../constants/JobStatuses';
import { ErrorMessage } from 'formik';
import { Formik, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { PropertiesState, Property } from '../../../interfaces/Property';
import { fetchProperties } from '../../../redux/reducers/PropertiesSlice';
import {addJob, getJob, updateJob} from '../../../api';
import { AxiosResponse } from 'axios';
import {Button, CircularProgress, MenuItem, TextField} from '@material-ui/core';
import { JobSchema } from './Validator';
import { useStyles } from '../Styles';

export const AddEditJobView = () => {
  const { id } = useParams<ViewParams>();
  const dispatch = useDispatch();

  const newJob: JobForm = {
    summary: '',
    description: '',
    status: STATUS_OPEN,
    raisedBy: '',
    property: undefined
  }

  const [job, setJob] = useState<JobForm>(newJob);
  const [loading, setLoading] = useState<boolean>(true)

  const classes = useStyles();

  useEffect(() => {
    getJob(id).then((response: AxiosResponse) => {
      if (response?.data) {
        const { summary, description, status, raised_by: raisedBy, property } = response.data;

        setJob({
          summary,
          description,
          status,
          raisedBy,
          property: property.id
        })
        setLoading(false);
      }
    }).catch(() => {
      setLoading(false);
    })
  }, []);

  const { items: properties } = useSelector(
    (state: { properties: PropertiesState }) => state.properties
  );

  useEffect(() => {
    if (properties.length === 0) {
      dispatch(fetchProperties(1));
    }
  }, [properties]);

  if (loading) {
    return <CircularProgress />
  }

  return (
    <div className={classes.addEditContainer}>
      {id && <h1>Edit {job.summary}</h1>}
      {!id && <h1>Log job</h1>}

      <Formik
        initialValues={job}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);

          if (id) {
            updateJob(id, values).then(() => {
              window.location.replace(`/job/${id}`);
            }).catch(() => {
              console.log('Something went wrong')
            });
          } else {
            addJob(values).then(() => {
              window.location.replace('/jobs');
            }).catch(() => {
              console.log('Something went wrong')
            });
          }
        }}
        validationSchema={JobSchema}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className={classes.addEditFormField}>
              <TextField placeholder="Summary" value={values.summary} onChange={handleChange} id="summary" label="Summary" />
              <div>
                <ErrorMessage name="summary" />
              </div>

            </div>
            <div className={classes.addEditFormField}>
              <TextField placeholder="Description" value={values.description} onChange={handleChange} id="description" label="Description" />
              <ErrorMessage name="description" />
            </div>

            <div className={classes.addEditFormField}>
              <TextField
                id="status"
                name="status"
                select
                label="Status"
                value={values.status}
                onChange={handleChange}
              >
                {JOB_STATUSES.map((status: JobStatusForm) => (
                  <MenuItem key={status.value} value={status.value}>{status.label}</MenuItem>
                  ))}
              </TextField>
              <ErrorMessage name="status" />
            </div>

            <div className={classes.addEditFormField}>
              <TextField placeholder="Raised by" value={values.raisedBy} onChange={handleChange} id="raisedBy" label="Raised by" />
              <ErrorMessage name="raisedBy" />
            </div>

            <div className={classes.addEditFormField}>
              <TextField
                id="property"
                name="property"
                select
                label="Property"
                value={values.property}
                onChange={handleChange}
              >
                {properties.map((property: Property) => (
                  <MenuItem key={property.id} value={property.id}>{property.name}</MenuItem>
                ))}
              </TextField>
              <ErrorMessage name="property" />
            </div>

            <div className={classes.addEditFormButton}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
              >
                Save
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
