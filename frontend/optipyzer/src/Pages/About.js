import React, {useEffect, useState} from 'react';

import './css/About.css';

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

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';


import LoremIpsum from '../Resources/LoremIpsum';

const About = () => {

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
			    body1={LoremIpsum.medium}
			    title="Section Title#1"
			  />
			</Grid>
			<Grid item>
			  <AboutSection 
			    body1={LoremIpsum.medium}
			    body2={LoremIpsum.medium}
			    title="Section Title#2"
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
		  </Container>
		</div>
		);
}

export default About;