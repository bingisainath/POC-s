// client/pages/Home.js
import React from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import Notifications from '../components/Notifications';

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.gridContainer}>
      <Paper className={classes.paper}>
        <Typography variant="h5" gutterBottom>Home</Typography>
        <Sidebar>
          <Notifications />
        </Sidebar>
      </Paper>
    </Grid>
  );
};

export default Home;
