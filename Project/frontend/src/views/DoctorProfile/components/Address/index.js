import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const useStyles = makeStyles(() => ({
  root: {} ,
  textCenter:{
      textAlign:'center',
      margin:'0.5rem'
  },
  icon:{
      fontSize:'5rem',
      color:'#1963C6',
      margin:0
  },
  p:{
    // fontSize:'1.3rem',
    margin:0,
    textAlign:'center'
  }
}));


const Address = props => {
  // const { className } = props;
  const classes = useStyles();
  const marginTop = {
      padding:'3rem'
  }
  const header = {
    fontSize:props.isDesktop ? '1.8rem' : '1.2rem'
  }
  const p = {
    fontSize:props.isDesktop ?'1.3rem':'0.8rem',
  }

  return (
    <Grid container style={marginTop}>
        <Grid container direction='column' item md={12} xs={12} justify='center'alignItems='center' >
            <LocationOnIcon className={classes.icon}></LocationOnIcon>
            <h2 className={classes.textCenter} style={header}>МЕСТО ПРИЕМА</h2>
            <p className={classes.p} style={p} >{props.address.adr}</p>
        </Grid>
    </Grid>
  );
};

Address.propTypes = {
  className: PropTypes.string
};

export default Address;
