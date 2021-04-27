import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid
} from '@material-ui/core';
import {
  getLocationsLoading,
  getLocationsErrorMsg,
  getLocationsData
} from '../../features/locations/selectors';
import { fetchLocations } from '../../features/locations/actions';
import LocationTable from './LocationTable';

const LocationPage = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getLocationsLoading);
  const errorMsg = useSelector(getLocationsErrorMsg);
  const locations = useSelector(getLocationsData);

  useEffect(() => {
    dispatch(fetchLocations())
  }, [])

  return (
    <Container>
      <Box my={6}>
        <Typography component="h1" variant="h4">Manage Locations</Typography>
        <Box my={6}>
          <Grid container spacing={4}>
            <Grid item xs={8}>
              {
                loading
                  ? <Box align="center"><CircularProgress size={120} /></Box>
                  : !!errorMsg
                    ? <Box align="center"><Typography component="p" variant="h5" color="error">{errorMsg}</Typography></Box>
                    : locations.length > 0
                      ? <LocationTable locations={locations} />
                      : <Typography component="p" variant="h5" align="center">There are no locations at this moment</Typography>
              }
            </Grid>
            <Grid item xs={4}>
              <Typography component="h2" variant="h5">I am form</Typography>
            </Grid>
          </Grid>

        </Box>

      </Box>
    </Container>
  )
}

export default LocationPage
