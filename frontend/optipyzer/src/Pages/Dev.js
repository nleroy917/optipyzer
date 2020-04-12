import React, {useEffect, useState} from 'react';

import './css/Dev.css';

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

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';


import LoremIpsum from '../Resources/LoremIpsum';

const Dev = () => {

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
		    </Container>
		</div>
		);

}

export default Dev;