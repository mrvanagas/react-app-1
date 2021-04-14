import { Typography, Box, Container } from "@material-ui/core";

const MuiGridArticle = ({ title, children, bgcolor = "background.default" }) => {
  return (
    <Box component="article" pt={4} pb={6} bgcolor={bgcolor}>
      <Container>
        <Typography variant="h4" component="h2" gutterBottom>{title}</Typography>
        {children}
      </Container>
    </Box>
  );
}

export default MuiGridArticle;

