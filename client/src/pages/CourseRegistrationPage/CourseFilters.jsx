import {
  Box,
  Typography,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  bgGrey: {
    backgroundColor: theme.palette.grey[50]
  },
  bgPrimary: {
    backgroundColor: theme.palette.primary.main
  }
}));

const CourseFilters = ({ courses, allLocations, takenCourses, locations, setTakenCourses }) => {
  const classes = useStyles();

  const isCourseAvailable = (course) => {
    // Grąžins true, jei suranda nors vieną pasirinktą lokaciją
    const courseAvailableAtSelectedLocations = locations
      .filter(({ selected }) => selected) // lokacijas kurių selected savybe yra true
      .map(({ id }) => id) // iš lokacijų masyvą su selected reikšmę 'true' perdaro tų lokacijų id masyvą
 
      .find(locationId => course.locationsIds.includes(locationId)) !== undefined;
    // Grąžins true, tik tuomet jei pažymėti visi reikalaujami kursai
   
    const takenCoursesIds = takenCourses.map(({ id }) => id);
    const courseAvailableAfterTakenCourses = course.requiredCoursesIds === undefined
      ? true
      : course.requiredCoursesIds
 
        .every(requiredCourseId => takenCoursesIds.includes(requiredCourseId));

    return courseAvailableAtSelectedLocations && courseAvailableAfterTakenCourses;
  }

  const courseRows = courses.map((course, i) => {
    const isCourseFoundInSelectedCourses = !!takenCourses.find(takenCourse => takenCourse.id === course.id);
    const selectedLocationIds = locations.filter(({ selected }) => selected).map(({ id }) => id);
    const isCourseAvailableAtSelectedLocations = !!selectedLocationIds.find(selectedLocId => course.locationsIds.includes(selectedLocId));
    
    return (
      <Grid key={course.id} container className={i % 2 === 0 ? classes.bgGrey : undefined}>
        <Grid item xs={4}>
          <FormControlLabel
            control={<Checkbox name="taken-courses" color="primary" />}
            label={course.title}
            checked={isCourseFoundInSelectedCourses && isCourseAvailableAtSelectedLocations}
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
          <Typography>{course.locationsIds.map(locationId => allLocations.find(({ id }) => id === locationId)).map(({ title }) => title).join(' || ')}</Typography>
        </Grid>
      </Grid>
    )
  });

  return (
    <Grid item xs={12}>
      <Grid container>
        <Grid item xs={4}><Typography variant="h6" color="primary">Select taken courses or knowledge</Typography></Grid>
        <Grid item xs={5}><Typography variant="h6" color="primary">Courses or knowledge required to take before</Typography></Grid>
        <Grid item xs={3}><Typography variant="h6" color="primary">Available at locations</Typography></Grid>
        <Grid item xs={12}><Box my={1}><Divider className={classes.bgPrimary} /></Box></Grid>
      </Grid>
      {courseRows}
    </Grid>
  )
}

export default CourseFilters;

// Iškelti logiką, susijusią su lokacijos pasirinkimu į atskirą komponentą 'LocationFilter.jsx';


