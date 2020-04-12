// Load Core React Modules + Cookies + CSS
import React, {useEffect} from 'react';

import { useHistory } from "react-router-dom";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";


//import css and external styling
import './css/Landing.css';
import FadeIn from 'react-fade-in';

// Load Core Material UI Elements
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

// Import Custom Components
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';

// Import Resources
import LoremIpsum from '../Resources/LoremIpsum'
import ColorPalette from '../Resources/ColorPalette'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	landingTitle: {
		textAlign: 'left',
    textShadow: '3px 3px #000000;',
		[breakpoints.only('xs')]: {
	  		fontSize: '5em'
  		},
		//paddingRight: '50px'
	},
	landingBody: {
		textAlign: 'justify;',
  		textJustify: 'inter-word;',
      //textShadow: '2px 2px #000000;'
  	 	//paddingRight: '50px'
	},
	button: {
	  [breakpoints.only('xs')]: {
	  	//marginLeft: '30vw'
  		},
	},

  footer: {
    textAlign: 'left',
    opacity: '0.4',
    fontSize: 'small',
    //borderTop: 'solid 1px white',
    //borderBottom: 'solid 1px white',
    // fontWeight: '200',
    // bottom:'0',
    // zIndex: '9999;',
    // backgroundColor: 'rgba(0, 0, 0, 0.3);',
    padding:'40px'
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
          <div>
  				   <Container>
  				    <BrowserView>
  				      <NavBar/>
  				    </BrowserView>
  				    <MobileView>
  				      <NavBarMobile />
  				    </MobileView>
                <FadeIn
                  delay={100}
                  transitionDuration={1000}
                >
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
        				        A fast, effective, and flexible codon optimization tool. Built with Python, the algorithm can codon-optimize your g blocks for multiple species at once, giving preference to one or more espression systems at a time. The algorithm utilizes the most recent codon usage data available to dynamically generate an optimal sequence for you in seconds.
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
      				    </Grid>
                <footer
                  className={styles.footer}
                >
                  <Box>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        Made with ❤ by Nathan LeRoy
                      </Grid>
                      <Grid item>
                        <a href="https://twitter.com/NathanJLeRoy" style={{color: 'white'}}>
                          <TwitterIcon color="primary" style={{padding:'4px'}}/>
                          Twitter
                        </a>
                      </Grid>
                      <Grid item>
                        <a href="https://github.com/NLeRoy917" style={{color: 'white'}}>
                          <GitHubIcon color="primary" style={{padding:'4px'}}/>
                          GitHub                       
                        </a>
                      </Grid>
                      <Grid item>
                        <a href="https://www.linkedin.com/in/nathan-leroy-04b35b105/" style={{color: 'white'}}>
                          <LinkedInIcon color="primary" style={{padding:'4px'}}/>
                          Linked In
                        </a>
                      </Grid>
                    </Grid>
                  </Box>
                </footer>
                </MuiThemeProvider>
                </FadeIn>
  				    </Container>
	  			  </div>
  				);
  }

  export default Landing
