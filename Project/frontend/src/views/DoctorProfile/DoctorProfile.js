import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom'
import { Header,Description,Price,Address,Timetable} from './components';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    padding: 5
  },
  content: {
    paddingTop: 50,
    textAlign: 'center'
  }
}));



const DoctorProfile = (props) => {
  // const [fioState, setFio] = useState();
  // const [ratingState, setRating] = useState();
  const [header,setHeader] = useState({});
  const [description,setDescription] = useState({});
  const [price,setPrice] = useState({});
  const [times,setTimes] = useState({});
  const [address,setAddress] = useState({});


  const classes = useStyles();
  const { id,user_id } = useParams()

  useEffect(() => {
      axios.get(`http://localhost:3001/getdoctors/?doctor=`+id+'&user='+user_id)
      .then(res => {
        console.log(res.data);
        const fio = res.data.doctor.surname +' '+res.data.doctor.name+' '+res.data.doctor.patronymic
        const rating = res.data.doctor.rating
        setHeader({
          fio:fio,
          rating:rating,
          photo:res.data.doctor.photo,
          specialization:res.data.spec})
        setDescription({
          experience:res.data.doctor.experience,
          education:res.data.doctor.education,
          description:res.data.doctor.description
        })
        setPrice({
          first_visit_cost:res.data.doctor.first_visit_cost,
          second_visit_cost:res.data.doctor.second_visit_cost,
        })
        setAddress({
          adr: res.data.doctor.address
        })
        let tt = []
        let cnt = 0
        // console.log(res.data.doctor.timetable_days[0].split(','));
        for (let i of res.data.timetable){
          cnt ++
          let ttt = {id: cnt, time: i.time, day: i.day}
          tt.push(ttt)
        }
        setTimes({
          dd: tt,
          uid: user_id,
          did: id
        })
      })
  }, [])

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={12} xs={12}>
            <Header {...props} header={header} ></Header>
            <Description {...props} description={description}></Description>
            <Timetable {...props} times={times}></Timetable>
            <Price {...props} price={price}></Price>
            <Address {...props} address={address}></Address>
        </Grid>
      </Grid>
    </div>
  );
};

export default DoctorProfile;
