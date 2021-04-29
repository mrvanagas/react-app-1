import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Paper, Typography, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  createLocation,
  createLocationReset,
  updateLocation,
} from '../../features/locations/actions';
import {
  getLocationsCreated,
  getLocationsCreateErrorMsg,
  getEditedLocation,
} from '../../features/locations/selectors';

const validationSchema = yup.object().shape({
  title: yup
    .string('Must be string')
    .min(2)
    .max(32)
    .required('Is required'),
});

const LocationForm = () => {
  const dispatch = useDispatch();
  const created = useSelector(getLocationsCreated);
  const createdError = useSelector(getLocationsCreateErrorMsg);
  const editedLocation = useSelector(getEditedLocation);
  const isEdited = !!editedLocation;
  const formText = isEdited ? 'Update' : 'Create';
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { title: editedLocation?.title ?? '' },
    onSubmit: (values) => {
      if (isEdited) {
        dispatch(updateLocation(editedLocation.id, values.title));
      } else {
        dispatch(createLocation(values));
      }
    },
    validationSchema
  });

  if (created) {
    dispatch(createLocationReset);
    formik.resetForm();
    formik.setTouched({ title: false });
  }

  return (
    <Paper elevation={6}>
      <Box p={3}>
        <Typography component="h2" variant="h5">{formText} Location</Typography>
        <form onSubmit={formik.handleSubmit}>
          <Box my={3}>
            {!!createdError ? <Box my={3}><Alert severity="error">{createdError}</Alert></Box> : null}
            <TextField
              fullWidth
              name="title"
              label="Title"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Box>
          <Box align="center">
            <Button color={isEdited ? 'secondary' : 'primary'} variant="contained" type="submit">{formText}</Button>
          </Box>
        </form>
      </Box>
    </Paper >
  )
};

export default LocationForm;
