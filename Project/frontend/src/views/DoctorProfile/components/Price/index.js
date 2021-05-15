import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {} ,
  textCenter:{
      textAlign:'center'
  },
  price:{
    borderRadius:' 0.8rem',
    background: '#E8EFFF',
    textAlign:'center',
    textTransform:'uppercase',
    margin:'1rem',
  },
  p:{
    color:'#1963C6',
    fontWeight:'bold',
    fontSize:'2rem',
    margin:'1rem'
  }
}));


const Price = props => {
  // const { className } = props;
  const classes = useStyles();
  const marginTop = {
    marginTop:props.isDesktop ? '4rem' : '2rem'
  }
  const header = {
    fontSize:props.isDesktop ? '1.8rem' : '1.2rem'
  }

  return (
     
    <Grid container style={marginTop}>
        <Grid item md={12} xs={12} >
            <h2 className={classes.textCenter} style={header}>СТОИМОСТЬ ПРИЕМА</h2>
        </Grid>

        <Grid container justify='space-around' >
            <Grid item md={5} xs={12} className={classes.price} >
                <p className={classes.p}>{props.price.first_visit_cost} тг</p>
                <p>Первичный прием</p>
            </Grid>

            <Grid item md={5} xs={12} className={classes.price}>
                <p className={classes.p}>{props.price.second_visit_cost} тг</p>
                <p>Вторичный прием</p>
            </Grid>

        </Grid>
    </Grid>
  );
};

Price.propTypes = {
  className: PropTypes.string
};

export default Price;
