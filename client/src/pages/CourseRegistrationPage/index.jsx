import { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Grid
} from '@material-ui/core';
import InfoPanel from './InfoPanel';
import LocationFilter from './LocationFilter';
import CourseFilters from './CourseFilters';

const courses = [
  {
    id: 1,
    title: 'FE lvl 1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [1, 2, 4],
  },
  {
    id: 2,
    title: 'PHP lvl 1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [1, 3, 4],
  },
  {
    id: 3,
    title: '.NET lvl 1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [2, 4],
  },
  {
    id: 4,
    title: 'React.js lvl 1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [1, 2, 4],
    requiredCoursesIds: [1]
  },
  {
    id: 5,
    title: 'React.js lvl 2',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [1, 2],
    requiredCoursesIds: [1, 4]
  },
  {
    id: 6,
    title: 'Vue.js lvl 1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [1, 4],
    requiredCoursesIds: [1]
  },
  {
    id: 7,
    title: 'Vue.js lvl 2',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [1],
    requiredCoursesIds: [1, 6]
  },
  {
    id: 8,
    title: 'Laravel lvl 1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [3, 4],
    requiredCoursesIds: [2]
  },
  {
    id: 9,
    title: 'Laravel lvl 2',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [3],
    requiredCoursesIds: [2, 8]
  },
  {
    id: 10,
    title: 'Symfony lvl 1',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [1, 4],
    requiredCoursesIds: [2]
  },
  {
    id: 11,
    title: 'Symfony lvl 2',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [1],
    requiredCoursesIds: [2, 10]
  },
  {
    id: 12,
    title: '.NET lvl 2',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [2, 4],
    requiredCoursesIds: [3]
  },
  {
    id: 13,
    title: '.NET lvl 3',
    desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit praesentium est alias dolorum! Aut ratione dicta officiis ducimus tempore minima.',
    locationsIds: [2],
    requiredCoursesIds: [3, 12]
  }
];

const allLocations = [
  {
    id: 1,
    title: 'Vilnius'
  },
  {
    id: 2,
    title: 'Kaunas'
  },
  {
    id: 3,
    title: 'Klaipėda'
  },
  {
    id: 4,
    title: 'Remote'
  }
];

const CourseRegistrationPage = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [locations, setLocations] = useState(allLocations.map(location => ({ ...location, selected: true })));
  const [takenCourses, setTakenCourses] = useState([]);

  allLocations.map(location => ({ ...location, selected: true }))

  return (
    <Container>
      <Box my={6}>
        <Paper elevation={4}>
          <Box p={4}>
            <Box mb={4}>
              <Typography variant="h3" component="h1" align="center">Register to course</Typography>
            </Box>
            <form>
              <InfoPanel
                name={name} setName={setName}
                surname={surname} setSurname={setSurname}
                email={email} setEmail={setEmail}
                mobile={mobile} setMobile={setMobile}
              />
              <Box my={3}><Divider /></Box>
              <Grid item xs={12}><Typography variant="h5" component="h2" color="primary">Filters</Typography></Grid>
              <LocationFilter 
                locations={locations}
                setLocations={setLocations}
              />
              <CourseFilters
                courses={courses}
                allLocations={allLocations}
                takenCourses={takenCourses}
                locations={locations}
                setTakenCourses={setTakenCourses}
              />
            </form>
          </Box>
        </Paper>
      </Box>
    </Container >
  )
}

export default CourseRegistrationPage;
