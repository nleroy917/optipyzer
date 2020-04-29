import React from 'react';

import './css/About.css';
import FadeIn from 'react-fade-in';

import {
  BrowserView,
  MobileView,
} from "react-device-detect";

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

// import custom components
import AboutSection from '../Components/AboutSection';
import caleigh from "../Resources/caleigh_profile.jpeg"
import nathan from "../Resources/headshot_new.png"
import translation_gif from '../Resources/CodonSwap_01.gif'

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';


import LoremIpsum from '../Resources/LoremIpsum';
import AboutContent from '../Resources/AboutContent'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	devImg: {
		height: '200px',
		padding: '10px',
		borderRadius: '50%',
		[breakpoints.only('xs')]: {
	  		height: '45vw'
	  	}
	},
	animation: {
		width: '400px',
		height: '100%',
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
			  justify="flex-start"
			  alignItems="flex-start"
			  spacing={8}
			  style={{minHeight: '100vh'}}

			>
			<Grid item>
			  <AboutSection 
			    body1={AboutContent.devBody}
			    title="Developers"
			    content={
			    	<div>
			    	<span style={{display: 'inline'}}>
			    	  <img alt="Caleigh Roleck" className={styles.devImg} src={caleigh} />
			    	  <img alt="Nathan LeRoy" className={styles.devImg} src={nathan} />
			    	  </span>
			    	</div>
			    }
			  />
			</Grid>
			<Grid item>
			  <AboutSection 
			    body1={LoremIpsum.medium}
			    body2={LoremIpsum.medium}
			    title="Codon Optimzation At A Glance"
			    content={
			    	<div>
			    	    <img alt="Translation of DNA" src={translation_gif} className={styles.animation}/>
			    	</div>
			    }
			  />
			</Grid>
			<Grid item>
			  <AboutSection 
			    body1={LoremIpsum.medium}
			    body2={LoremIpsum.medium}
			    title="The Engine"
			  />
			</Grid>
			</Grid>
			</FadeIn>
		  </Container>
		</div>
		);
}

export default About;