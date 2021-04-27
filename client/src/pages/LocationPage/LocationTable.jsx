import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  Box
} from '@material-ui/core';

const LocationTable = ({ locations }) => {
  // ~~~~~~~~
  const yyyymmdd = (dateString) => {
    const date = new Date(dateString);
    const monthValue = date.getMonth() + 1;
    const monthString = monthValue < 10 ? '0' + monthValue : monthValue;
    const dayValue = date.getDay();
    const dayString = dayValue < 10 ? '0' + dayValue : monthValue;
    return `${date.getFullYear()}-${monthString}-${dayString}`;
  }

  const dataRows = locations
    .map(({ _id: id, title, createdAt, updatedAt }) =>
      <TableRow key={id}>
        <TableCell component="th" scope="row">{title}</TableCell>
        <TableCell>{yyyymmdd(createdAt)}</TableCell>
        <TableCell>{yyyymmdd(updatedAt)}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary">Update</Button>
          <Box mx={1} display="inline-block"></Box>
          <Button variant="contained" color="secondary">Delete</Button>
        </TableCell>
      </TableRow>)

  return (
    <TableContainer component={({ children }) => <Paper elevation={4}>{children}</Paper>}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell component="th">Title</TableCell>
            <TableCell component="th">Created At</TableCell>
            <TableCell component="th">Updated At</TableCell>
            <TableCell component="th">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{dataRows}</TableBody>
      </Table>
    </TableContainer>
  )
}

export default LocationTable;
