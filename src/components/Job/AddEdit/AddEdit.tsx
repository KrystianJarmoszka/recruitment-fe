import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router';
import {JobForm, JobStatusForm } from '../../../interfaces/Job';
import { ViewParams } from '../../../interfaces/General';
import { JOB_STATUSES, STATUS_OPEN } from '../../../constants/JobStatuses';
import { ErrorMessage } from 'formik';
import {
  Formik,
  Form,
  Field,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { PropertiesState, Property } from '../../../interfaces/Property';
import { fetchProperties } from '../../../redux/reducers/PropertiesSlice';
import {addJob, getJob, updateJob} from '../../../api';
import { AxiosResponse } from 'axios';
import { CircularProgress } from '@material-ui/core';
import { JobSchema } from './Validator';

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
      console.log('Something went wrong');
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
    <div>
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
        {({ errors, touched }) => (
          <Form>
            <div>
              <label htmlFor="firstName">Summary</label>
              <Field id="summary" name="summary" placeholder="Summary" />
              <div>
                <ErrorMessage name="summary" />
              </div>

            </div>
            <div>
              <label htmlFor="description">Description</label>
              <Field id="description" name="description" placeholder="Description" />
              <ErrorMessage name="description" />
            </div>

            <div>
              <Field as="select" name="status">
                {JOB_STATUSES.map((status: JobStatusForm) => (
                  <option value={status.value} key={status.value}>{status.label}</option>
                ))}
              </Field>
              <ErrorMessage name="status" />
            </div>

            <div>
              <label htmlFor="raisedBy">Raised by</label>
              <Field id="raisedBy" name="raisedBy" placeholder="Raised by" />
              <ErrorMessage name="raisedBy" />
            </div>

            <div>
              <label htmlFor="property">Property</label>
              <Field id="property" as="select" name="property">
                <option>Chose property...</option>
                {properties.map((property: Property) => (
                  <option value={property.id} key={property.id}>{property.name}</option>
                ))}
              </Field>
              <ErrorMessage name="property" />
            </div>

            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
