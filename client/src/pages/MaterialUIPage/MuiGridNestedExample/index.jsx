import Grid from "@material-ui/core/Grid";
import InfoPanel from './InfoPanel';
import ImageGrid from './ImageGrid';

const MuiGridNestedExample = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={6}>
        <InfoPanel />
      </Grid>
      <Grid item container xs={12} lg={6} spacing={1}>
        <ImageGrid />
      </Grid>
    </Grid>
  );
};

export default MuiGridNestedExample;

