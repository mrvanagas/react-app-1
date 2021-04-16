import {
  Box,
  Typography,
  TextField,
  Grid,
} from '@material-ui/core';

const InfoPanel = ({
  name,
  setName,
  surname,
  setSurname,
  email,
  setEmail,
  mobile,
  setMobile }) => {
  return (
    <>
      <Box mb={3}>
        <Typography variant="h5" component="h2" color="primary">Please fill in you information</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Name"
            variant="outlined"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Surname"
            variant="outlined"
            value={surname}
            onChange={e => setSurname(e.target.value)}
            fullWidth
            required
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            fullWidth
            required
            size="small"
            type="email"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Mobile"
            variant="outlined"
            value={mobile}
            onChange={e => setMobile(e.target.value)}
            fullWidth
            size="small"
          />
        </Grid>
      </Grid>
    </>
  )
}

export default InfoPanel
