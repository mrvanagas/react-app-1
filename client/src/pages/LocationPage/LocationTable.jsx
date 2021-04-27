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
import { yyyymmdd } from '../../utils/dateTime';

// Įgalinti trinimą, paspaudus Delete mygtuką
/*
  1. Sukurti actionTypes
  2. Sukurti action, įvertinti duomenų atnaujinimą ir serverio klaidas
  3. Importuoti react-redux bibliotekos įrankius komponente
  4. Importuoti action'us komponente
  5. Parašyti state'o kitimą reducer'yje pagal naujus actionTypes. 
  6. Įgalinti action'o siuntimą
*/

const LocationTable = ({ locations }) => {

  const dataRows = locations
    .map(({ _id: id, title, createdAt, updatedAt }) =>
      <TableRow key={id}>
        <TableCell>{title}</TableCell>
        <TableCell>{yyyymmdd(createdAt)}</TableCell>
        <TableCell>{yyyymmdd(updatedAt)}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary">Update</Button>
          <Box mx={1} display="inline-block"></Box>
          <Button variant="contained" color="secondary">Delete</Button>
        </TableCell>
      </TableRow>)

  return (
    <TableContainer component={({ children }) => <Paper elevation={6}>{children}</Paper>}>
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