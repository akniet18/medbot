import React ,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
// import {useImage} from 'react-image'
import {Img} from 'react-image'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import axios from 'axios';



const useStyles = makeStyles(() => ({
  root: {} ,
  fio:{
    color:'#1963C6',
    fontWeight:600,
    textTransform:'uppercase',
    fontFamily:"Roboto"
  },
  specialization:{
    fontFamily:"Roboto",
    fontWeight:500,
    marginTop:'-1rem'
    
  }
}));


const Header = props => {
  const {rating} = props.header
  // const [ratingState, setRating] = useState(0);
  const [photoState, setPhoto] = useState(0);
  const { id,user_id } = useParams()

  // const { className } = props;
  const classes = useStyles();
  
  const header_container = {
    paddingTop:'1rem',
    width:'auto',
    textAlign:props.isDesktop ? 'left' : 'center'
  }
  const image = {
    height:props.isDesktop ?'13rem':'10rem',
    width:props.isDesktop ?'13rem':'10rem',
    borderRadius:'100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
  }

  const stars = {
    size: 45,
    value:4.5,
    edit: false,
    isHalf: true,
    color: '#1963C6',
    activeColor: '#1963C6',
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
  };
  const starsContainer = {
    display:'flex',
    justifyContent: props.isDesktop ? 'start' : 'center'
  }

  return (
    <div >
      <Grid container spacing={3} >
        <Grid item md={3} xs={12}>
          <div><img src= {props.header.photo}
                style = {image}
            /></div>
            
        </Grid>

        <div style={header_container}>
          <Grid container spacing={1}>
              <Grid item md={12} xs={12} style={starsContainer}>
                <ReactStars
                  value={rating}
                  size={55}
                  color2={'#1963C6'}
                  edit={false}
                 />
              </Grid>

              <Grid item md={12} xs={12}>
                <h2 className ={classes.fio}>{props.header.fio}</h2> 
              </Grid>

              <Grid item md={12} xs={12}>
                  <p className ={classes.specialization}>{props.header.spec}</p>
                  <p className ={classes.specialization}>{props.header.specialization}</p>
              </Grid>
          </Grid>
        </div>
    </Grid>
    </div>
    
  );
};

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
