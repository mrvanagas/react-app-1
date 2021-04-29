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
import { useDispatch, useSelector } from 'react-redux';
import { deleteLocation, editLocation, cancelLocationEdit } from '../../features/locations/actions'
import { getEditedLocation } from '../../features/locations/selectors'

const LocationTable = ({ locations }) => {
  const dispatch = useDispatch();
  const editedLocation = useSelector(getEditedLocation);
  const dataRows = locations.map(({ _id: id, title, createdAt, updatedAt }) => {
    const isEdited = !!editedLocation && editedLocation.id === id;
    return (
      <TableRow key={id}>
        <TableCell>{title}</TableCell>
        <TableCell>{yyyymmdd(createdAt)}</TableCell>
        <TableCell>{yyyymmdd(updatedAt)}</TableCell>
        <TableCell>
          <Button
            variant={isEdited ? 'outlined' : 'contained'}
            color="primary"
            onClick={() => dispatch(isEdited ? cancelLocationEdit : editLocation({ id, title }))}
          >{isEdited ? 'Cancel' : 'Update'}</Button>
          <Box mx={1} display="inline-block"></Box>
          <Button
            variant="contained"
            color="secondary"
            onClick={isEdited ? undefined : () => dispatch(deleteLocation(id))}
            disabled={isEdited}
          >Delete</Button>
        </TableCell>
      </TableRow>
    );
  })

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
