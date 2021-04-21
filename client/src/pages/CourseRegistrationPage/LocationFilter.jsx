import {
  Box,
  Button,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  locationBtn: {
    '&.disabled': {
      backgroundColor: '#0000',
      color: theme.palette.primary.main,
      boxShadow: `inset 0 0 0 1px ${theme.palette.primary.main}`
    }
  },
}));

const LocationFilter = ({ locations, setLocations }) => {
  const classes = useStyles();

  const handleSelectLocation = (id) => {
    setLocations(locations.map(loc => ({
      ...loc,
      selected: loc.id === id ? !loc.selected : loc.selected
    })));
  }

  const locationButtons = locations.map(({ id, title, selected }) => (
    <Box key={id} mr={2}>
      <Button
        className={`${classes.locationBtn}${!selected ? ' disabled' : ''}`}
        variant="contained"
        color="primary"
        onClick={() => handleSelectLocation(id)}
      >
        {title}
      </Button>
    </Box>)
  )

  return (
    <Grid item xs={12}>
      <Box display="flex" my={2}>
        <Box mr={2}>
          <Typography variant="h6" component="h3" color="primary" >Select locations</Typography>
        </Box>
        <Box display="flex">{locationButtons}</Box>
      </Box>
    </Grid>
  )
};

export default LocationFilter;
