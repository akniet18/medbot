import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom'

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
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Select from "react-select";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import "./styles.css";
import axios from 'axios';

// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';
// import 'swiper/swiper-bundle.min.css';
// import 'swiper/swiper.min.css';

const useStyles = makeStyles(() => ({
  root: {} ,
  time:{
    margin:'0',
    fontWeight:'bold',
    fontSize:'1rem'
  },
  day:{
    marginTop:'0.5rem',
    fontSize:'0.9rem'
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
    outline:'none',
    // maxWidth: '30vw'
    width: '40%'
  },
  paperConfirmed: {
    backgroundColor: 'white',
    borderRadius:'0.5rem',
    padding: '3rem 2rem',
    fontFamily:"Roboto",
    outline:'none',
    width: '40vw',
    height:'50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  buttons:{
    display: 'flex',
    alignItems: 'center',
    marginTop:'1.5rem'
  },
  buttonsLR :{
    // padding: '0.3rem 3rem',
    fontSize:' 0.6rem',
    fontWeight: 600,
    margin: '0.5rem',
    backgroundColor: '#6E717D!important',
    borderRadius: '0.5rem'
  },
  textField:{
    width: '100%'
  },
  section: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '20px',
    marginTop:'1.5rem',
    width: '100%',
    flexWrap: 'wrap',
    paddingBottom: '50px'
  },
  sectionitem: {
    width: '100%'
  },
  stitle:{
    fontWeight: 'bold',
    fontSize: 18,
  },
  snumb: {
    color: '#1963C6',
    fontWeight: 'bold',
    fontSize: 24,
  },
  sbody: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '5px',
    paddingTop: '5px',
    borderBottom: '1px solid #1963C6'
  }

}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2, itemsToScroll: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 4 }
];

const Patients = props => {
  const classes = useStyles();
  const { id } = useParams()
  const [open, setOpen] = React.useState(false);
  const [openMore1, setOpenmore1] = React.useState(false);
  const [openMore2, setOpenmore2] = React.useState(false);
  const [item, setItem] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [vnc, setVnc] = React.useState([]);
  const [tvclist, setTvclist] = React.useState([]);
  const [tvdlist, setTvdlist] = React.useState([]);
  const getData = () => {
    axios.get(`http://localhost:3001/getcabinetvisit/?doctor=`+id)
      .then(res => {
        console.log(res.data);
        let vnc = res.data.visit_not_conf
        setVnc(vnc)
        setTvclist(res.data.today_visit_conf)
        setTvdlist(res.data.today_visit_done)
      })
  }
  useEffect(() => {
    axios.get(`http://localhost:3001/getcabinetvisit/?doctor=`+id)
      .then(res => {
        console.log(res.data);
        let vnc = res.data.visit_not_conf
        setVnc(vnc)
        setTvclist(res.data.today_visit_conf)
        setTvdlist(res.data.today_visit_done)
      })
  }, [])
  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleOpen = (item) => {
    setOpen(true);
    setItem(item)
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [openConfirm, setOpenConfirm] = React.useState(false);
  const handleOpenConfirm = () => {
    setOpen(false);
    setOpenConfirm(true);
    let data = {
      doctor_id: props.visits.id,
      user_id: item.patient_id,
      analysis: item.recom,
      comment: item.comment
    }
    axios.post('http://localhost:3001/confirmvisit', data)
      .then( res => {
        console.log(res);
        
      }, err => {
        console.log(err);
      })
  };
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    getData()
  };
  
  const [openComment, setOpenComment] = React.useState(false);
  const handleOpenComment = () => {
    setOpen(false);
    setOpenComment(true);

  };
  const handleCloseComment = () => {
    setOpenComment(false);
    let a = ''
    if (searchTerm){
      for (let i of searchTerm){
        a += i.label + ', '
      }
    }
    item['recom'] = a
    item['comment'] = value
  };

  let symptom = ''
  if (item){
    if (item.symptoms){
      for (let i of item.symptoms){
        symptom += `${i}, `
      }
    }
  }
  
  const [searchTerm, setSearchTerm] = React.useState("");
  let vis
  
  if (vnc){
    vis = <Carousel breakPoints={breakPoints} pagination={false} focusOnSelect={true}>
              {vnc.map((item) => (
                  <Item key={item.id} onClick={() => handleOpen(item)}>
                      <p className={classes.time}>Пациент {item.patient_surname} {item.patient_name} хочет записаться</p>
                      <p className={classes.day}>{item.visit_day} {item.visit_time}</p> 
                      <Button variant="contained" color="primary" style={{padding: '0.5rem 3rem'}}>Просмотреть</Button>
                  </Item>
              ))}
            </Carousel>
  }else{
      vis = <Carousel breakPoints={breakPoints} pagination={false} focusOnSelect={true}>
              
            </Carousel>
  }
  
  
  // const [searchResults, setSearchResults] = React.useState([]);
  // const handleChange = e => {
  //   setSearchTerm(e.target.value);
  // };
  // React.useEffect(() => {
  //   const results = people.filter(person =>
  //     person.toLowerCase().includes(searchTerm)
  //   );
  //   setSearchResults(results);
  // }, [searchTerm]);

  const handleInputChange = (value, e) => {
    // if (e.action === "input-change") {
      setSearchTerm( value );
    // }
  };

  const handleClosemore1 = () => {
    setOpenmore1(false)
  }
  const handleOpenmore1  = () => {
    setOpenmore1(true)
  } 
  const handleClosemore2 = () => {
    setOpenmore2(false)
  }
  const handleOpenmore2  = () => {
    setOpenmore2(true)
  } 

  let options = [];
  let op;
  function MakeOption(x) {
    return { value: x, label: x };
  };

  const acceptPatient = (item) => {
    let data = {
      doctor_id: props.visits.id,
      user_id: item.patient_id
    }
    console.log(data);
    axios.post('http://localhost:3001/changetodone', data)
      .then( res => {
        console.log(res.data);
        getData()
      }, err => {
        console.log(err);
      })
  };
  const deletePatient = (item) => {
    let data = {
      doctor_id: props.visits.id,
      user_id: item.patient_id
    }
    console.log(data);
    axios.post('http://localhost:3001/changetocancel', data)
      .then( res => {
        console.log(res.data);
        getData()
      }, err => {
        console.log(err);
      })
  };

  if (props.options.length>0){
    op = <Select
      isMulti
      name="colors"
      options={props.options}
      className="basic-multi-select"
      classNamePrefix=""
      closeMenuOnSelect={false}
      onChange={handleInputChange}
      value={searchTerm}
    />
  }else{
    op = <Select
      isMulti
      name="colors"
      options={options.map(x => MakeOption(x))}
      className="basic-multi-select"
      classNamePrefix=""
      closeMenuOnSelect={false}
      onInputChange={handleInputChange}
      inputValue={searchTerm}
    />
  }

  let tvc = <div></div>
  let tvc_count = 0
  if (tvclist){
    tvc_count = tvclist.length
    tvc = <div>
      {tvclist.map((item)=>(
        <div  className={classes.sbody}>
          <div>{item.patient_surname} {item.patient_name} - {item.visit_day} {item.visit_time} </div>
          <div>
            <Icon className="far fa-check-square" color="primary" onClick={() => acceptPatient(item)}></Icon>
            <span> </span>
            <Icon className="fa fa-times-circle" color="secondary" onClick={() => deletePatient(item)}></Icon>
          </div>
        </div>
      ))}
    </div>    
  }
  
  let tvd =<div></div>
  let tvd_count = 0
  if (tvdlist){
     tvd_count = tvdlist.length
      tvd = <div>
        {tvdlist.map((item)=>(
          <div  className={classes.sbody}>
            <div>{item.patient_surname} {item.patient_name} - {item.visit_day} {item.visit_time}</div>
            <div>
              <Icon className="far fa-check-square" color="primary"></Icon>
              <span> </span>
              <Icon className="fa fa-times-circle" color="secondary"></Icon>
            </div>
          </div>
        ))}
      </div>    
  }


  

  const marginTop = {
    backgroundColor:'#F6F6F6',
    height:'300px',
  }
  return (
    <div style={marginTop}>
          {vis}
          {/* Patient card opens */}
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
                {/* <h3 style={{color:'#1963C6'}} id="transition-modal-title">{item.patient_surname} {item.patient_name}</h3> */}
                <Grid container justify="center" spacing={1} lg={10} >
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Имя:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_name}</b></p> 
                    </Grid> 

                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Фамилия:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_surname}</b></p> 
                    </Grid> 

                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Возраст:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_age}</b></p> 
                    </Grid> 

                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Пол:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_sex}</b></p> 
                    </Grid> 

                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Симптоматика:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{symptom}</b></p> 
                    </Grid>
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Аллергия:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_comment}</b></p> 
                    </Grid>
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Аллергия:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.recom}</b></p> 
                    </Grid>
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Аллергия:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.comment}</b></p> 
                    </Grid>
                </Grid>

                <div className={classes.buttons}>
                  <Button variant="contained" color="primary" className = {classes.buttonsLR} onClick={handleOpenComment}>комментарий</Button>
                  <Button variant="contained" color="primary" className = {classes.centerBtn} onClick={handleOpenConfirm}>принять</Button>
                  <Button variant="contained" color="primary" className = {classes.buttonsLR} onClick={handleClose}>перенаправить</Button>
                </div>
                
              </div>
            </Fade>
          </Modal>

          {/* Patient confirmed */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openConfirm}
            onClose={handleOpenConfirm}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openConfirm}>
              <div className={classes.paperConfirmed}>
                <h2 style={{color:'#1963C6',textAlign: 'center'}} id="transition-modal-title">Султан Аиткали успешно записан!</h2>
                <img src ={process.env.PUBLIC_URL + '/images/confirmed.png'} style={{width: '13vw'}}></img>

                <div className={classes.buttons} style={{justifyContent: 'flex-end'}}>
                    <Button variant="contained" style={{backgroundColor:'#847e7e',color:'white',textWeight:'600!important'}} onClick={handleCloseConfirm}>готово</Button>
                </div>
                
              </div>
            </Fade>
          </Modal>

          {/* Comment */}
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openComment}
            onClose={handleCloseComment}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openComment}>
              <div className={classes.paper}>
                <Grid container justify="center" spacing={1} lg={10} >
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Имя:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_name}</b></p> 
                    </Grid> 

                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Фамилия:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_surname}</b></p> 
                    </Grid> 

                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Возраст:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_age}</b></p> 
                    </Grid> 

                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Пол:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_sex}</b></p> 
                    </Grid> 

                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Симптоматика:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{symptom}</b></p> 
                    </Grid>
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description">Аллергия:</p> 
                    </Grid> 
                    <Grid container item lg={6} xs={6} justify='right'>
                        <p id="transition-modal-description"><b>{item.patient_comment}</b></p> 
                    </Grid>
                </Grid>
                <p>Рекомендуемые анализы: </p>
                {op}
                <p>Комментарий врача: </p>
                <TextField
                  id="standard-multiline-flexible"
                  label=""
                  multiline
                  rowsMax={4}
                  placeholder="Комментарий врача..."
                  value={value}
                  className={classes.textField}
                  onChange={handleChange}
                />
                {/* <div className="App">
                  <TextField
                    // label="Поиск"
                    id="filled-start-adornment"
                    className={classes.textField}
                    InputProps={{
                      startAdornment: <InputAdornment position="start"><SearchIcon></SearchIcon></InputAdornment>,
                    }}
                    variant="filled"
                    value={searchTerm}
                    onChange={handleChange}
                  />
                  <ul>
                    {searchResults.map(item => (
                      <li>{item}</li>
                    ))}
                  </ul>
                </div> */}

                <div className={classes.buttons}>
                  <Button variant="contained" color="primary" className = 'centerBtn' onClick={handleCloseComment}>сохранить</Button>
                </div>
                
              </div>
            </Fade>
          </Modal>
                
          <div className={classes.section}>
            <div className={classes.sectionitem}>
            <Card >
              <CardContent>
                <Typography className={classes.stitle} color="textSecondary" gutterBottom>
                  ЗАПИСАННЫЕ НА СЕГОДНЯ
                </Typography>
                <Typography variant="h5" component="h2" className={classes.snumb}>
                  {tvc_count}
                </Typography>
                {tvc}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleOpenmore1}>ПОДРОБНЕЕ</Button>
              </CardActions>
            </Card>
            </div>
            <div className={classes.sectionitem}>
            <Card >
              <CardContent>
                <Typography className={classes.stitle} color="textSecondary" gutterBottom>
                ПРИНЯТЫЕ ЗА СЕГОДНЯ
                </Typography>
                <Typography variant="h5" component="h2" className={classes.snumb}>
                  {tvd_count}
                </Typography>
                {tvd}
              </CardContent>
              <CardActions>
                <Button size="small" onClick={handleOpenmore2}>ПОДРОБНЕЕ</Button>
              </CardActions>
            </Card>
            </div>
          </div>
    
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openMore1}
            onClose={handleClosemore1}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openMore1}>
              <div className={classes.paper}>
                <Typography className={classes.stitle} color="textSecondary" gutterBottom>
                  ЗАПИСАННЫЕ НА СЕГОДНЯ
                </Typography>
                {tvc}
                <div className={classes.buttons}>
                  <Button variant="contained" color="primary" className = 'centerBtn' onClick={handleClosemore1}>Закрыть</Button>
                </div>
              </div>
            </Fade>
          </Modal>

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openMore2}
            onClose={handleClosemore2}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openMore2}>
              <div className={classes.paper}>
                <Typography className={classes.stitle} color="textSecondary" gutterBottom>
                  ПРИНЯТЫЕ ЗА СЕГОДНЯ
                </Typography>
                {tvd}
                <div className={classes.buttons}>
                  <Button variant="contained" color="primary" className = 'centerBtn' onClick={handleClosemore2}>Закрыть</Button>
                </div>
              </div>
            </Fade>
          </Modal>
    </div>
  );
};

Patients.propTypes = {
  className: PropTypes.string
};

export default Patients;
