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
import optimization_gif from '../Resources/CodonSwap_01.gif'

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';


import LoremIpsum from '../Resources/LoremIpsum';
import AboutContent from '../Resources/AboutContent'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	devImg: {
		height: '200px',
		margin: '10px',
		borderRadius: '50%',
		border: 'solid white 1px',
		[breakpoints.only('xs')]: {
	  		height: '45vw'
		  },
		'&:hover':{
			opacity: '0.9',
			transform: 'translate(1px,1px)'
		},
		'&:active': {
			transform: 'translate(2px,2px)'
		}
	},
	animation: {
		width: '100%',
		height: '300px',
		padding: '10px',
		objectFit: 'cover'
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
			    	  <a href="https://www.linkedin.com/in/caleigh-roleck-2a50b6125/"><img alt="Caleigh Roleck" className={styles.devImg} src={caleigh} /></a>
			    	  <a href="https://www.linkedin.com/in/nathanjleroy/"><img alt="Nathan LeRoy" className={styles.devImg} src={nathan} /></a>
			    	  </span>
			    	</div>
			    }
			  />
			</Grid>
			<Grid item>
			  <AboutSection
			  	body1={AboutContent.codonUsage1}
			    body2={AboutContent.codonUsage2}
				body3={AboutContent.codonUsage3}
			    title="Codon Optimization"
			    content={
			    	<div>
			    	    <img alt="Translation of DNA" src={optimization_gif} className={styles.animation}/>
			    	</div>
			    }
			  />
			</Grid>
			<Grid item>
			  <AboutSection 
			    body1={AboutContent.engine1}
			    body2={AboutContent.engine2}
			    title="The Engine"
			  />
			</Grid>
			<Grid item>
				<AboutSection
					title="Data Sources and Citations"
					body1="This project utilizes a data-dump from George Washington University High-performance Integrated Virtual Environment (HIVE) collaborative. It houses codon preference data from more than 130,000 organisms. This data was organized into a local server database from which Optipyzer calculates it's custome usage statistics for multi-species codon optimization of sequences."
					body2={
					<ol style={{listStyleType: ''}}>
						<li style={{marginTop: 15 , textAlign: 'left'}}>Athey, J.; Alexaki, A.; Osipova, E.; Rostovtsev, A.; Santana-Quintero, L. V.; Katneni, U.; Simonyan, V.; Kimchi-Sarfaty, C. A New and Updated Resource for Codon Usage Tables. BMC Bioinformatics 2017, 18 (1), 391. <a href="https://doi.org/10.1186/s12859-017-1793-7">https://doi.org/10.1186/s12859-017-1793-7.</a></li>
						<li style={{marginTop: 15, textAlign: 'left'}}>Alexaki, A.; Kames, J.; Holcomb, D. D.; Athey, J.; Santana-Quintero, L. V.; Lam, P. V. N.; Hamasaki-Katagiri, N.; Osipova, E.; Simonyan, V.; Bar, H.; Komar, A. A.; Kimchi-Sarfaty, C. Codon and Codon-Pair Usage Tables (CoCoPUTs): Facilitating Genetic Variation Analyses and Recombinant Gene Design. J. Mol. Biol. 2019, 431 (13), 2434–2441. <a href="https://doi.org/10.1016/j.jmb.2019.04.021">https://doi.org/10.1016/j.jmb.2019.04.021.</a></li>
						<li style={{marginTop: 15, textAlign: 'left'}}>Hershberg, R.; Petrov, D. A. Selection on Codon Bias. Annu. Rev. Genet. 2008, 42, 287–299. <a href="https://doi.org/10.1146/annurev.genet.42.110807.091442">https://doi.org/10.1146/annurev.genet.42.110807.091442.</a></li>
					</ol>}
				/>
			</Grid>
			</Grid>
			</FadeIn>
		  </Container>
		</div>
		);
}

export default About;