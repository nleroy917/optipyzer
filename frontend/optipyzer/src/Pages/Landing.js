// Load Core React Modules + Cookies + CSS
import React from 'react';

import { useHistory } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


//import Cookies from 'universal-cookie';
import './css/Landing.css';

// Load Core Material UI Elements
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Import Custom Components
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';

// Import Resources
import LoremIpsum from '../Resources/LoremIpsum'
import ColorPalette from '../Resources/ColorPalette'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	landingTitle: {
		textAlign: 'left',
		[breakpoints.only('xs')]: {
	  		fontSize: '5em'
  		},
		//paddingRight: '50px'
	},
	landingBody: {
		textAlign: 'justify;',
  		textJustify: 'inter-word;',
  	 	//paddingRight: '50px'
	},
	button: {
	  [breakpoints.only('xs')]: {
	  	//marginLeft: '30vw'
  		},
	}


}));

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
        main: ColorPalette.white
      }
    }
  },
)

const BASE_URL = process.env.REACT_APP_BASE_URL

const Landing = () => {

	const history = useHistory();
	const styles = useStyles()

  			return (
  				  <div className="container justify-content-center">
  				   <Container>
  				    <BrowserView>
  				      <NavBar/>
  				    </BrowserView>
  				    <MobileView>
  				      <NavBarMobile />
  				    </MobileView>
  				    <MuiThemeProvider theme={theme}>
  				    <Grid
  				      container
  				      direction="column"
  					  justify="center"
  					  alignItems="flex-start"
  					  style={{minHeight: '80vh', maxWidth: '30vw'}}

  				    >
  				    <Grid item>
  				      <Typography 
  				        variant="h1"
  				        className={styles.landingTitle}
  				        gutterBottom

  				      >
  				        Optipyzer
  				      </Typography>
  				      <Typography 
  				        variant="body1"
  				        className={styles.landingBody}
  				      >
  				        {LoremIpsum.medium}
  				      </Typography>
  				    </Grid>
  				    <br></br>
  				      <Button
  				        variant="outlined"
  				        color="primary"
  				        onClick={() => {
  				        	history.push('./optimize')
  				        }}
  				        className={styles.button}
  				      >
  				        Lets Optimize
  				      </Button>
  				    <Grid item>
  				    </Grid>
  				    </Grid>
  				    </MuiThemeProvider>
  				    </Container>
	  			  </div>
  				);
  }

  export default Landing
