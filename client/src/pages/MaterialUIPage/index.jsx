import { Typography, Box, Container } from "@material-ui/core";
import MuiGridArticle from './MuiGridArticle';
import MuiGridResponsiveExample from './MuiGridResponsiveExample';
import MuiGridNestedExample from './MuiGridNestedExample';

const MaterialUIPage = () => {
  return (
    <Box component="section" pt={3}>
      <Container>
        <Typography variant="h3" component="h1" gutterBottom>This is Material-UI page</Typography>
      </Container>
      <MuiGridArticle title="Responsive Grid" bgcolor="background.paper">
        <MuiGridResponsiveExample />
      </MuiGridArticle>
      <MuiGridArticle title="Nested Grid">
        <MuiGridNestedExample />
      </MuiGridArticle>
    </Box>
  )
}

export default MaterialUIPage;
