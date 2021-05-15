
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none',
    // height:'100vh',
    // display:'flex',
    // alignItems:'center'
  }
}));

const Minimal = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
        {/* <RouterLink to="/"> */}
          MEDBOT
          {/* <img
            alt="Logo"
            src="favicon.ico"
            style = {{height:'2rem'}}
          /> */}
        {/* </RouterLink> */}
      </Toolbar>
    </AppBar>
  );
};

Minimal.propTypes = {
  className: PropTypes.string
};

export default Minimal;
