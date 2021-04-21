import { useState } from 'react';
import { Typography, Button, Box, Container, Grid } from '@material-ui/core';

const CounterPage = () => {
  const [counter, setCounter] = useState(5);

  const incCounter = () => setCounter(counter + 1);
  const decCounter = () => setCounter(counter - 1);

  return (
    <Container>
      <Box mt={4}>
        <Typography variant="h3" component="h1" gutterBottom>Counter Page</Typography>
        <Grid container direction="column" alignItems="center">
          <Grid>
            <Typography variant="h4" component="h2" gutterBottom>Counter value: {counter}</Typography>
          </Grid>
          <Grid container item spacing={1} justify="center">
            <Grid item>
              <Button onClick={incCounter} variant="contained" color="primary">Increase</Button>
            </Grid>
            <Grid item>
              <Button onClick={decCounter} variant="contained" color="primary">Decrease</Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CounterPage;
