import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, mergeClasses } from '@material-ui/styles';
import {
  Grid
} from '@material-ui/core';
import Carousel from 'react-elastic-carousel'
import Item from "./Item";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';
import Collapse from '@material-ui/core/Collapse';
import "./styles.css";
import axios from 'axios';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';

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
  },
  time:{
    margin:'0',
    fontWeight:'bold',
  },
  day:{
    margin:'0.2rem'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: 'white',
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    borderRadius:'0.5rem',
    padding: '1.6rem',
    fontFamily:"Roboto",
    outline:'none'
  },
  buttons:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop:'1.5rem'
  }

}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 }
];

const Timetable = props => {
  // const { className } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [item, setItem] = React.useState(false);
  const [opena, setOpena] = React.useState(true);

  const {dd, did, uid} = props.times
  let it;
  if (dd){
    it =<Carousel breakPoints={breakPoints} pagination={false} focusOnSelect={true}>
        {dd.map((item) => (
          <Item key={item.id} onClick={() => handleOpen(item)}><p className={classes.time}>{item.time}</p><p className={classes.day}>{item.day}</p> </Item>
        ))}
      </Carousel>
  }
  else{
    it = <Carousel breakPoints={breakPoints} pagination={false} focusOnSelect={true}></Carousel>
  }

  const handleOpen = (item) => {
    setOpen(true);
    setItem(item)
  };

  const handleClose = () => {
    setOpen(false);
  };
  let alertt

  const handleCloseAndSaveTime = () => {
    setOpen(false);
    let data = {
      user_id: uid,
      doctor_id: did,
      date_visit: {time: item.time, day: item.day},
      symptoms: [],
      predicted_diseases: []
    }
    console.log(data);
    axios.post('http://localhost:3001/savevisit', data)
      .then(res => {
        console.log(res.data.message);
        if (res.data.message=="Вы успешно записаны!"){
          // alertt= <Alert severity="success">
          //           <AlertTitle>Success</AlertTitle>
          //           "Вы успешно записаны!"
          //         </Alert>
          alert("Вы успешно записаны!")
        }else{
          // alertt= <Alert severity="error">
          //           <AlertTitle>Error</AlertTitle>
          //           На это время уже есть запись, пожалуйста выберите другое время
          //         </Alert>
          alert("На это время уже есть запись, пожалуйста выберите другое время")
        }
        console.log(alertt);
      }, err => {
        console.log(err);
      })
      
  };

  const marginTop = {
    marginTop:props.isDesktop ? '4rem' : '2rem'
  }
  const header = {
    fontSize:props.isDesktop ? '1.8rem' : '1.2rem'
  }

  
  // const items= [
  //   {id: 1, time: '9:30 - 10:30',day:'ПОНЕДЕЛЬНИК'},
  //   {id: 2, time: '9:30 - 10:30',day:'ПОНЕДЕЛЬНИК'},
  //   {id: 3, time: '9:30 - 10:30',day:'ПОНЕДЕЛЬНИК'},
  //   {id: 4, time: '14:00 - 15:00',day:'Вторник'},
  //   {id: 5, time: '14:00 - 15:00',day:'Вторник'}
  // ]
  return (
     
    <Grid container style={marginTop}>
        <Grid item md={12} xs={12} >
            <h2 className={classes.textCenter} style={header}>СВОБОДНОЕ ВРЕМЯ ДЛЯ ЗАПИСИ</h2>
        </Grid>

        <Grid container >
          {it}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <h3 id="transition-modal-title">Хотите записаться на это время?</h3>
                {/* <p id="transition-modal-description">Хотите записаться на это время?</p> */}

                <div className={classes.buttons}>
                  <Button variant="outlined" color="primary" style={{padding: '0.5rem 3rem'}} onClick={handleCloseAndSaveTime}>Да</Button>
                  <Button variant="outlined" color="primary" style={{padding: '0.5rem 3rem'}} onClick={handleClose}>Нет</Button>
                </div>
                
              </div>
            </Fade>
          </Modal>
          
        </Grid>        
    </Grid>
  );
};

Timetable.propTypes = {
  className: PropTypes.string
};

export default Timetable;
