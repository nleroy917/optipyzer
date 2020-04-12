import React, {useEffect, useState} from 'react';

import './css/About.css';
import FadeIn from 'react-fade-in';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// import custom components
import AboutSection from '../Components/AboutSection';
import caleigh from "../Resources/caleigh_profile.jpeg"
import nathan from "../Resources/headshot_new.png"
import translation_gif from '../Resources/temp_engine.gif'

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';


import LoremIpsum from '../Resources/LoremIpsum';
import AboutContent from '../Resources/AboutContent'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	devImg: {
		height: '200px',
		padding: '10px',
		borderRadius: '50%'
	},
	animation: {
		width: '300px',
		height: '250px',
		padding: '10px',
	}


}));

const About = () => {

	const styles = useStyles();

	return(
		<div className="about-body">
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
			  justify="flexStart"
			  alignItems="flexStart"
			  spacing={10}
			  style={{minHeight: '100vh'}}

			>
			<Grid item>
			  <AboutSection 
			    body1={AboutContent.devBody}
			    title="Developers"
			    content={
			    	<div>
			    	<span style={{display: 'inline;'}}>
			    	  <img className={styles.devImg} src={caleigh} />
			    	  <img className={styles.devImg} src={nathan} />
			    	  </span>
			    	</div>
			    }
			  />
			</Grid>
			<Grid item>
			  <AboutSection 
			    body1={LoremIpsum.medium}
			    body2={LoremIpsum.medium}
			    title="The Engine"
			    content={
			    	<div>
			    	    <img src={translation_gif} className={styles.animation}/>
			    	</div>
			    }
			  />
			</Grid>
			<Grid item>
			  <AboutSection 
			    body1={LoremIpsum.medium}
			    body2={LoremIpsum.medium}
			    title="Section Title#3"
			  />
			</Grid>
			</Grid>
			</FadeIn>
		  </Container>
		</div>
		);
}

export default About;