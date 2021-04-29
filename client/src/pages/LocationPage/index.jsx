import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {
  getLocationsLoading,
  getLocationsErrorMsg,
  getLocationsData
} from '../../features/locations/selectors';
import { fetchLocations } from '../../features/locations/actions';
import LocationTable from './LocationTable';
import LocationForm from './LocationForm';

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
        <Grid container spacing={4}>
          <Grid item xs={8}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography component="h1" variant="h4">Manage Locations</Typography>
              {!!errorMsg ? <Alert severity="error">{errorMsg}</Alert> : null}
            </Box>

          </Grid>
          <Grid item xs={4} />
          <Grid item xs={8}>
            {
              loading
                ? <Box align="center"><CircularProgress size={120} /></Box>
                : locations.length > 0
                  ? <LocationTable locations={locations} />
                  : <Typography component="p" variant="h5" align="center">There are no locations at this moment</Typography>
            }
          </Grid>
          <Grid item xs={4}>
            <LocationForm />
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default LocationPage
