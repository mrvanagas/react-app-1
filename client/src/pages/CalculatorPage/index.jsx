import { Box, Typography, Container } from '@material-ui/core';
import Calculator from './Calculator';

const CalculatorPage = () => {
  return (
    <Box component="section" mt={4}>
      <Container>
        <Typography variant="h3" component="h1">Calculator Page</Typography>
        <Box mt={3}>
          <Calculator />
        </Box>
      </Container>
    </Box>
  )
}

export default CalculatorPage
