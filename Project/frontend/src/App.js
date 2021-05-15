import React, { useState, useEffect }from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
// import { ThemeProvider } from '@material-ui/styles';

// import { Provider } from 'react-redux';
// import configureStore from './store';

// import theme from './theme';
// import 'react-perfect-scrollbar/dist/css/styles.css';
// import './assets/scss/index.scss';
import Routes from './Routes';

const browserHistory = createBrowserHistory();


export default function App()  {
  const [width, setWindowWidth] = useState(0);

  // componentDidMount...runs only once
  useEffect( () => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [])

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const responsive = {
    isDesktop: width > 1023
  }
  
  // render() {
    return (
      // <Provider
      // //  store={configureStore()}
      //  >
      //   <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes isDesktop ={responsive.isDesktop} />
          </Router>
      //   </ThemeProvider>
      // </Provider>
    );
  // }
}
