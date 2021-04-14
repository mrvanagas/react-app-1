import { Box, Grid, Paper } from "@material-ui/core";

const MuiGridResponsiveExample = ({ itemCount = 12 }) => {

  // const createItems = () => {
  //   const items = [];
  //   for (let i = 1; i <= itemCount; i++) {
  //     items.push(
  //       <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}><Paper><Box p={1}>{i}</Box></Paper></Grid>
  //     );
  //   }
  //   return items;
  // }

  const items = Array.from(new Array(itemCount).keys())
    .map((el, i) => <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={i}><Paper><Box p={1}>{i + 1}</Box></Paper></Grid>)

  return <Grid container spacing={2}>{items}</Grid>;
  // return <Grid container spacing={2}>{createItems()}</Grid>;
}

export default MuiGridResponsiveExample;