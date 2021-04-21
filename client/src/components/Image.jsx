import { Box, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: ({ width, height }) => ({
    width, height,
    '&>img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'center'
    }
  })
});

const Image = ({ src, alt, width = "100%", height = "100%" }) => {
  const classes = useStyles({ width, height });

  return (
    <Box className={classes.root}>
      <img src={src} alt={alt} />
    </Box>
  )
}

export default Image;
