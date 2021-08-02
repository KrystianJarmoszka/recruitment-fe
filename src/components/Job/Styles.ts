import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
    marginTop: '10px',
  },
  missingJobs: {
    height: '150px',
    display: 'flex',
    alignItems: 'center',
  },
  addEditContainer: {
    margin: '10px',
  },
  addEditFormField: {
    display: 'flex',
    flexDirection: 'column',
  },
  addEditFormButton: {
    marginTop: '15px',
  },
  viewContainer: {
    marginLeft: '25px',
  }
});
