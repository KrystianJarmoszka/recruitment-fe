import React, {useEffect, useState} from 'react';
import { useParams } from "react-router";
import { getProperty} from "../../api";
import { AxiosResponse } from "axios";
import { Helmet } from "react-helmet";
import { CircularProgress } from "@material-ui/core";
import { ViewParams } from "../../interfaces/General";
import { Property } from "../../interfaces/Property";

export const PropertyView = () => {
  const { id } = useParams<ViewParams>();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    getProperty(id).then((response: AxiosResponse) => {
      if (response?.data) {
        setProperty(response.data);
        setLoading(false)
      }
    }).catch(() => {
      setLoading(false)
    })
  }, []);

  if (!property && !loading) {
    return <span>Property not found</span>
  }

  if (!property) {
    return <CircularProgress />
  }

  return (
    <div>
      <Helmet>
        <title>{property.name}</title>
      </Helmet>

      <div>
        <h1>{property.name}</h1>
      </div>
    </div>
  );
}
