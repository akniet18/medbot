import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useHistory } from "react-router-dom";
import {
    getFromStorage,
    setInStorage
} from '../../utils/storage'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cont:{
    display: 'flex',
    alignItems:'center',
    height:'100vh'
  }
}));

export default function SignIn() {
    const classes = useStyles();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    // useEffect(() => {
    //   const obj = getFromStorage('the_main_app')
    
    //   if(obj && obj.token){
    //       //verify token
    //       axios.get(config.url+'/users/account/verify?token='+obj.token)
    //       .then(res=>{
    //           if(res.data){
    //               history.push('/admin/dashboard');
    //           }
    //       })
    //   }
    // },[])


    const handleSubmit = (evt) => {
        evt.preventDefault();
        // alert(`Submitting Name ${name}`)
        const User = {
            name:name,
            password:password
        };
        if(name==='nasiba'&& password==='kek'){
            const id = 1
            setInStorage('token',{token:'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IktlayJ9'})
            history.push('/cabinet/'+id);
        }else{
            console.log('kek');
        }

        // axios.post(config.url+'/users/account/signin',User)
        // .then(res=>{
        //     if(res.data.success===false){
        //         switch(res.data.type){
        //             case 'email':
        //                 setEmailValid(res.data.message)
        //                 setWrongPassword('')
        //                 break
        //             case 'password':
        //                 setWrongPassword(res.data.message)
        //                 setEmailValid('')
        //                 break
        //         }
        //     }
        //     else{
        //         axios.get(config.url+'/users/account/verify?token='+res.data.token)
        //         .then(res=>{
        //             // dispatch({ type: SET_USERNAME,username: res.data.userName});
        //             setUserName(res.data.userName)
        //         })
        //         setInStorage('the_main_app',{token:res.data.token})
        //         history.push('/admin/dashboard');
        //     }        
        // })

    }

  return (
    <Container component="main" maxWidth="xs" className={classes.cont}>
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Вход в систему
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Имя Фамилия"
            name="email"
            autoComplete="email"
            autoFocus
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Войти
          </Button>
        </form>
      </div>
    </Container>
  );
}
