import React, { useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useStyles } from './Styles';
import { Property, PropertiesState } from '../../interfaces/Property';
import { fetchProperties } from '../../redux/reducers/PropertiesSlice';
import Pagination from '@material-ui/lab/Pagination';

export const PropertyList = () => {
  const { items: properties, page, pages, status } = useSelector(
    (state: { properties: PropertiesState }) => state.properties
  );

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProperties(1));
    }
  }, [status, dispatch]);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, page: number) => {
    dispatch(fetchProperties(page));
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
      {properties.length === 0 && <span>No properties found</span>}

      {properties.length > 0 && (<div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {['ID', 'name', 'Actions'].map((ceilTitle: string) => (
                  <TableCell key={ceilTitle} align="center">{ceilTitle}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {properties.map((property: Property) => (
                <TableRow key={property.id}>
                  <TableCell align="center" component="th" scope="row">
                    {property.id}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {property.name}
                  </TableCell>
                  <TableCell align="center" component="th" scope="row">
                    <IconButton component={Link} to={`/property/${property.id}`}>
                      <InfoIcon color="primary" />
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
