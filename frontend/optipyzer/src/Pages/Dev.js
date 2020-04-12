import React from 'react';

import './css/Dev.css';
import FadeIn from 'react-fade-in';

import {
  BrowserView,
  MobileView,
} from "react-device-detect";



// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';


const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	ComingSoon: {
		fontWeight:'200'
	}


}));

const Dev = () => {

	const styles = useStyles();

	return(
		<div className="dev-body">
		  <Container>
		  <BrowserView>
		      <NavBar/>
		    </BrowserView>
		    <MobileView>
		      <NavBarMobile />
		    </MobileView>
		    <br></br>
		    <FadeIn
		      delay={100}
		      transitionDuration={1000}
		    >
		      <Grid
		        container
		        direction="column"
		        justify="center"
		        alignItems="center"
		        style={{minHeight:'80vh'}}
		      >
		        <Grid item>
		          <Typography
		            variant="h1"
		            className={styles.ComingSoon}
		          >
		      		Coming Soon...
		          </Typography>
		        </Grid>
		      </Grid>
		    </FadeIn>
		    </Container>
		</div>
		);

}

export default Dev;