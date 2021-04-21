import { Box, Typography, Button } from "@material-ui/core";
const InfoPanel = () => {
  return (
    <>
      <Typography variant="h5" component="h3">Article name</Typography>
      <Typography variant="subtitle1" component="div">Subtitle</Typography>
      <Box mt={2}>
        <Typography variant="body1" paragraph>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit placeat maiores accusantium magni architecto asperiores? Similique facilis, possimus maiores obcaecati ullam accusantium nostrum impedit corporis quasi recusandae ducimus voluptas aliquid debitis quaerat praesentium, repudiandae labore fuga ratione sunt repellendus! Eveniet maiores, nemo accusantium voluptate magni voluptatem vel consequuntur doloribus eligendi, eos dolore, hic explicabo distinctio a quibusdam itaque consequatur autem commodi quidem suscipit tempora sapiente. Aperiam numquam beatae ipsum iste? Eius exercitationem officiis est quisquam natus assumenda dolores quo quidem pariatur repellat, expedita sapiente quae similique ad possimus sequi alias, odio placeat ipsa, sed incidunt perspiciatis dolorum quos! Modi, dicta.
        </Typography>
      </Box>
      <Button variant="contained" color="primary" href="#">Read more</Button>
    </>
  );
};

export default InfoPanel;
