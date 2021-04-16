import {
  Box,
  Typography,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Button,

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
  bgGrey: {
    backgroundColor: theme.palette.grey[50]
  },
  bgPrimary: {
    backgroundColor: theme.palette.primary.main
  }
}));

const CourseFilters = ({ courses, locations, takenCourses, selectedlocations, setTakenCourses, setSelectedLocations }) => {
  const classes = useStyles();

  const isCourseAvailable = (course) => {
    // Grąžins true, jei suranda nors vieną pasirinktą lokaciją
    const courseAvailableAtSelectedLocations = !!selectedlocations
      .filter(({ selected }) => selected)
      .map(({ id }) => id)
      .find(locationId => course.locationsIds.includes(locationId));
    // Grąžins true, tik tuomet jei pažymėti visi reikalaujami kursai
    const takenCoursesIds = takenCourses.map(({ id }) => id);
    const courseAvailableAfterTakenCourses = course.requiredCoursesIds === undefined
      ? true
      : course.requiredCoursesIds
        .every(requiredCourseId => takenCoursesIds.includes(requiredCourseId));

    return courseAvailableAtSelectedLocations && courseAvailableAfterTakenCourses;
  }

  const handleSelectLocation = ({ id }) => {
    setSelectedLocations(selectedlocations.map(loc => ({
      ...loc,
      selected: loc.id === id ? !loc.selected : loc.selected
    })));
  }

  const courseRow = courses.map((course, i) => (
    <Grid key={course.id} container className={i % 2 !== 0 ? classes.bgGrey : null}>
      <Grid item xs={4}>
        <FormControlLabel
          control={<Checkbox name="taken-courses" color="primary" />}
          label={course.title}
          checked={
            !!takenCourses.find(takenCourse => takenCourse.id === course.id) &&
            !!selectedlocations.filter(({ selected }) => selected).map(({ id }) => id).find(selectedLocId => course.locationsIds.includes(selectedLocId))
          }
          onChange={(e) => e.target.checked
            ? setTakenCourses([...takenCourses, course])
            : setTakenCourses(takenCourses.filter(takenCourse => takenCourse.id !== course.id && !takenCourse.requiredCoursesIds?.includes(course.id)))
          }
          disabled={!isCourseAvailable(course)}
        />
      </Grid>
      <Grid item xs={5}>
        <Typography>
          {
            course.requiredCoursesIds
              ? course.requiredCoursesIds.map(courseId => courses.find(({ id }) => id === courseId)).map(({ title }) => title).join(' && ')
              : 'No requirements'
          }
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{course.locationsIds.map(locationId => locations.find(({ id }) => id === locationId)).map(({ title }) => title).join(' || ')}</Typography>
      </Grid>
    </Grid>
  ));

  return (
    <>
      <Grid item xs={12}><Typography variant="h5" component="h2" color="primary">Filters</Typography></Grid>
      <Grid item xs={12}>
        <Box display="flex" my={2}>
          <Box mr={2}>
            <Typography variant="h6" component="h3" color="primary" >Select locations</Typography>
          </Box>
          <Box display="flex">
            {
              selectedlocations.map(location => (
                <Box key={location.id} mr={2}>
                  <Button
                    className={`${classes.locationBtn}${!location.selected ? ' disabled' : ''}`}
                    variant="contained"
                    color="primary"
                    onClick={() => handleSelectLocation(location)}
                  >
                    {location.title}
                  </Button>
                </Box>)
              )
            }
          </Box>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}><Typography variant="h6" color="primary">Select taken courses or knowledge</Typography></Grid>
          <Grid item xs={5}><Typography variant="h6" color="primary">Courses or knowledge required to take before</Typography></Grid>
          <Grid item xs={3}><Typography variant="h6" color="primary">Available at locations</Typography></Grid>
          <Grid item xs={12}><Box my={1}><Divider className={classes.bgPrimary} /></Box></Grid>
        </Grid>
        {courseRow}
      </Grid>
    </>
  )
}

export default CourseFilters;
