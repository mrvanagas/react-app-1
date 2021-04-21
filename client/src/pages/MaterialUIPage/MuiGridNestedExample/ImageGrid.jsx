import React from 'react';
import Grid from "@material-ui/core/Grid";
import Image from '../../../components/Image';

const ImageGrid = () => {
  return (
    <React.Fragment>
      <Grid item xs={4} md={2} lg={4}><Image src="https://unsplash.it/600/401" alt="img desc" /></Grid>
      <Grid item xs={4} md={2} lg={4}><Image src="https://unsplash.it/400/402" alt="img desc" /></Grid>
      <Grid item xs={4} md={2} lg={4}><Image src="https://unsplash.it/400/403" alt="img desc" /></Grid>
      <Grid item xs={4} md={2} lg={4}><Image src="https://unsplash.it/400/404" alt="img desc" /></Grid>
      <Grid item xs={4} md={2} lg={4}><Image src="https://unsplash.it/400/405" alt="img desc" /></Grid>
      <Grid item xs={4} md={2} lg={4}><Image src="https://unsplash.it/400/406" alt="img desc" /></Grid>
    </React.Fragment>
  );
};

export default ImageGrid;
