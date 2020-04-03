// Load Core React Modules + Cookies + CSS
import React from 'react';
//import Cookies from 'universal-cookie';
import './css/Landing.css';

// Load Core Material UI Elements
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// Import Custom Components
import LandingCard from '../Components/LandingCard';

export default class Landing  extends React.Component{

		  constructor(props) {
    		super(props);

    		this.state = {

    		};
  		}

  		componentDidMount() {

  		}

  		render() {
  			return (
  				  <Container>
	  				    <Grid   
	  				     container
						 direction="row"
						 justify="center"
						 alignItems="center"
						 style={{ minHeight: '100vh', maxWidth: '100%' }}
						 spacing={10}
						 >
	  				      <Grid item xs={12} s={12} md={6} lg={5}>
							<Typography align="left" variant="h1" gutterBottom>
							  Optipyzer
							</Typography>
							<Typography align="left" variant="body2" gutterBottom>
							  A multi-species codon optimization engine designed for the modern biologist. Bringing new advancements to today's molecular biology and gene expression capabilties.
							</Typography>
							<Typography align="left" variant="body2" gutterBottom>
							  Optipyze your gene today to get the most out of your gBlocks and Recombinant DNA platforms.
							</Typography>
	  				      </Grid>
	  				      <Grid item xs={12} s={12} md={6} lg={7}>
		  				      <Grid   
			  				     container
								 direction="column"
								 justify="center"
								 alignItems="center"
								 spacing={6}
								 >
								   <Grid item>
								   	<LandingCard buttonText="Optimize" image_link='https://image.flaticon.com/icons/png/512/17/17883.png' heading='Optimize' body='Use our multi-species codon optimization tool to perfect your DNA sequence.'/>
								   </Grid>
								   <Grid item>
								   	<LandingCard buttonText="About" image_link='https://cdn1.iconfinder.com/data/icons/ios-11-glyphs/30/about-512.png' heading='About the Engine' body='Learn about the math, biology, and algorithms behind our unique tool.'/>
								   </Grid>
								   <Grid item>
								   	<LandingCard buttonText="Dev Tools" image_link='https://anyline.com/wp-content/uploads/2019/07/web-api-icon.png' heading='API & Dev Tools' body='Developer? Try out our open and free API and learn how you can use it in custom apps.'/>
								   </Grid>
							  </Grid>
	  				      </Grid>
	  				    </Grid>
  				  </Container>
  				);
  		}
}
