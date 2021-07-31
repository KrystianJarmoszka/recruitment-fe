import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <div>
      <Link to='/jobs'>Jobs</Link>
      <br/><br/>
      <Link to='/job'>Job</Link>
      <br/><br/>
      <Link to='/properties'>Properties</Link>
      <br/><br/>
      <Link to='/property'>Property</Link>
    </div>
  );
}
