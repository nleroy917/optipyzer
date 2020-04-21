import React from 'react';

import './css/Dev.css';
import FadeIn from 'react-fade-in';

import {
  BrowserView,
  MobileView,
} from "react-device-detect";



// import material ui
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';

// import custom components
import CodeBlock from '../Components/CodeBlock'
import PythonCode from '../Resources/PythonCode'

import animation from "../Resources/CodonOptimizationMatte_01.gif"

// import color palette
import ColorPalette from '../Resources/ColorPalette'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	ComingSoon: {
		fontWeight:'200'
	},

	heading: {
		textAlign: 'left',
		fontWeight: '300',
		fontSize: '2.8em'
	},
	body: {
		textAlign: 'left',
		paddingBottom: '5px',
		fontSzie: '1.5em'
	},
	gridItem: {
		margin: '10px'
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
    	  <MuiThemeProvider theme={theme}>
		    <Grid
		      container
		      direction="row"
		      justify="flex-start"
		      alignItems="center"
		      spacing={8}
		      style={{height:'100vh'}}
		     >
		       <Grid 
		         item 
		         xs={12} 
		         lg={5}
		         //className={styles.gridItem}
		       >
		        <Typography 
		          variant="h2"
		          className={styles.heading}
		        >
		          Optipyzer Dev Tools
		        </Typography>
		        <Typography
		          variant="body1"
		          className={styles.body}
		          gutterBottom
		        >
		        For some, a web-based user interface isn't enough. As someone who works as a biologist full time, I am well aware of how scientists are pushing the limits of bioinformatics everyday. If you need a more powerful tool to do large-scale multi-species codon optimization, then you are in luck. We provide a set of developer tools and a standard library that can seemlessly interface the exact same cloud API utilized by the site. Now you can write automated programs and functions perfectly tailored to your needs and throughput.
		        </Typography>
		        <Button
		         variant="outlined"
		         href="#install"
		         color="primary"
		        >
		          Learn More
		        </Button>
		       </Grid>
		       <Grid
		         item
		         xs={12}
		         lg={7}
		         //className={styles.gridItem}
		        >
		        <img src={animation} style={{width: 500}}/>
		      </Grid>
		    </Grid>
		    <Grid
		      container
		      direction="column"
		      justify="flex-start"
		      alignItems="flex-start"
		     >
		       <Grid 
		         item 
		         xs={12} lg={6}
		         className={styles.gridItem}
		       >
		        <Typography 
		          variant="h2"
		          className={styles.heading}
		          id="install"
		        >
		          Installation
		        </Typography>
		        <Typography
		          variant="body1"
		          className={styles.body}
		          gutterBottom
		        >
		          Optipyzer is freely available on the PyPi - the Python Package Index repository.
		          To install, simply use pythons built in package manaager and intall as such:
		        </Typography>
			    <CodeBlock>
			     {PythonCode.install}
			    </CodeBlock>
		       </Grid>
		       <Grid 
		         item 
		         xs={12} lg={6}
		         className={styles.gridItem}
		       >
		        <Typography 
		          variant="h2"
		          className={styles.heading}

		        >
		          Initializing the API
		        </Typography>
		        <Typography
		          variant="body1"
		          className={styles.body}
		          gutterBottom
		        >
		        To begin, we must initialize an API object. This is the main user-level object which provides an interface to the cloud API which conducts codon optimization, data-fetching, and organism indexing.
		        </Typography>
			    <CodeBlock>
			     {PythonCode.init}
			    </CodeBlock>
		       </Grid>
		       <Grid
		         item
		         xs={12}
		         lg={6}
		         className={styles.gridItem}
		       >
		        <Typography 
		          variant="h2"
		          className={styles.heading}

		        >
		          Using the API
		        </Typography>
		        <Typography
		          variant="body1"
		          className={styles.body}
		          gutterBottom
		        >
		        The user-level API has many methods that allows one to interface with the cloud API. In the below example, we are searching the database for E Coli. and Campylobacter strains. The database is very large, and huge result sets of organism objects can be returned, so we extract the first found strain of each and give them a unique name. Then, we initialie a sequence to be optimized, weight our organisms, and send them off to be optiomized by the optipyzer engine.
		        </Typography>
			    <CodeBlock>
			     {PythonCode.base}
			    </CodeBlock>
		       </Grid>

		    </Grid>
		  </MuiThemeProvider>
		    </FadeIn>
		    </Container>
		</div>
		);

}

export default Dev;