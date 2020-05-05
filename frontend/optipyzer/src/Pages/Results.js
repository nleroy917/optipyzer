// Import core React
import React, {useState, useEffect} from 'react';
import {
  BrowserView,
  MobileView,
} from "react-device-detect";
import { useHistory } from "react-router-dom";

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';


// Import Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Import React95 Components
import Alert from '@react95/core/Alert'


// Import Custom Components
import SequenceResults from '../Components/SequenceResults'

// Import Color Palette
import ColorPalette from '../Resources/ColorPalette'

// import css
import './css/Results.css';

// import axios
const axios = require('axios').default;

const API_URL = process.env.REACT_APP_API_URL

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
        main: ColorPalette.white
      }
    }
  },
)

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  formPaper: {
  	background: '#FFF', //`${ColorPalette.formBackground}`,
  	padding: '30px',
  	[breakpoints.only('xs')]: {
  		minWidth: '80vw',
  		align: 'center'
  	},
  	minWidth: '50vw',
    maxWidth: '50vw',
  	alignItems: 'left'
  },
    formTitle: {
  	color: `${ColorPalette.textInput}`,
    textAlign: 'Left',
    fontWeight: '300',
    padding:'0'
  },
    formSubTitle: {
    	textAlign: 'left',
    	color: `${ColorPalette.primary}`,
    	fontWeight: '400',
    	padding:'0'
    },
    formSubSubTitle: {
    	textAlign: 'left',
    	color: 'rgba(0,0,0,0.54)',
    	fontWeight: '300',
    	padding:'0px'
    },
    paperContainer: {
	  	padding: '10px'
	  },
	expProf: {
	  	textAlign: 'left',
	  	paddingLeft: '30px'
	  },
	windows95: {
		fontFamily: 'MS Sans Serif',
		background: 'rgb(195, 199, 203)'
	}
  }));


const Results = (props) => {

	const history = useHistory();
	const styles = useStyles();

	const [data,setData] = useState(props.location.state.data);
	const [status, setStatus] = useState(props.location.state.status);
	//const [sdFixed,setSDFixed] = useState(props.location.state.data);
	//const [sdFixed,setSDFixed] = useState(props.location.state.data);
	const [expressionSD,setExpressionSD] = useState(props.location.state.data.best_expression_sd)
	const [expressionAD,setExpressionAD] = useState(props.location.state.data.best_expression_ad)

	useEffect(() => {
		fixExpression(expressionSD,setExpressionSD)
		fixExpression(expressionAD,setExpressionAD)
	},[])

	const fixExpression = async (expression,setExp) => {

		const exp_new = {}
		var sum = 0

		for(var id in expression) {
			sum += expression[id]
		}

		for(var id in expression) {

			let response = await axios.get(`${API_URL}fetch/species/${id}`)

	    	if(response.status === 200) {
	          //console.log(response)
	          let data =  await response.data
	          exp_new[data.name] = expression[id]/sum*100
			}
		}

		setExp(exp_new)
	}



	const renderExpressionProfile = (expression) => {

		const names = []

		for(var name in expression) {
			names.push(name)
		}

		return(
			<div>
			 {names.map((name) => {
			 	return(
			 		<div className={styles.expProf}>
			 		  {`${name}: ${Math.round(expression[name],4)}% `}
			 		</div>
			 		);
			 })}
			</div>
			);
	}

	if(status === 200) {
		return (
		<div className="results-body">
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
			  justify="center"
			  alignItems="center"
			  style={{ minHeight: '100vh', maxWidth: '100%', minWidth: '100%' }}
			  spacing={10}
		    >
		    <Grid item xs={12} lg={12}>
	  	      <Paper 
	  	        className={styles.formPaper} 
	  	        elevation={24}
	  	      >
		  	    <Grid
				  container
				  direction="column"
				  justify="center"
				  alignItems="stretch"
				  spacing={2}
				  style={{minWidth: '100%'}}
			    >
			      <Grid item>
				  	<Grid container
					  direction="row"
					  justify="space-between"
					  alignItems="center"
					  style={{width: '100%'}}
					  >
					  <Grid item>
			        <Typography 
			           variant="h4" 
			           className={styles.formTitle}
			           gutterBottom
			         >
			          Results
			        </Typography>
					</Grid>
					<Grid item>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => {history.push('./optimize')}}
						>
							Optimize Another?
						</Button>
					</Grid>
					</Grid>
			        <hr></hr>
			      </Grid>
			      <Grid item>
			        <Typography 
			           variant="h5" 
			           className={styles.formSubTitle}

			         >
			          Optimized Sequence
			        </Typography>
			      </Grid>
			      <Grid item>
			        <SequenceResults
			          label="Sequence (Squared Difference)"
			          seq={data.optimmized_sd}
			        />
			      </Grid>
			      <Grid item>
			        <SequenceResults
			          label="Sequence (Absolute Difference)"
			          seq={data.optimmized_ad}
			        />
			      </Grid>
			      <Grid item>
			        <Typography 
			           variant="h5" 
			           className={styles.formSubTitle}
			         >
			          Translated Sequence
			        </Typography>
			      </Grid>
			      <Grid item>
			        <SequenceResults
			          label="Peptide Sequence"
			          seq={data.peptide_seq}
			        />
			      </Grid>
			      <Grid item>
			        <Typography 
			           variant="h5" 
			           className={styles.formSubTitle}
			         >
			          Meta-Data
			        </Typography>
			      </Grid>
			      <Grid item>
			        <Paper
			          style={{background: 'rgba(143,161,251,0.37)'}}
			        >
			        <div className={styles.paperContainer}>
				    <Grid
					  container
					  direction="row"
					  justify="flex-start"
					  alignItems="center"
					  spacing={10}
					  style={{minWidth: '100%'}}
				    >
				    <Grid item>
						<Grid
						  container
						  direction="column"
						  justify="flex-start"
						  alignItems="start"
						  spacing={1}
						  style={{minWidth: '100%'}}
					    >
					      <Grid item>
					        <Typography 
					           variant="h6" 
					           className={styles.formSubSubTitle}
					         >
					          Expression Profile - SD
					        </Typography>
					      </Grid>
					      <Grid item>
					      <Typography 
					        variant="body1"
					      >
					       {renderExpressionProfile(expressionSD)}
					       </Typography>
					      </Grid>
					      <Grid item>
					        <Typography 
					           variant="h6" 
					           className={styles.formSubSubTitle}
					         >
					          Expression Profile - AD
					        </Typography>
					      </Grid>
					      <Grid item>
					      <Typography 
					        variant="body1"
					      >
					       {renderExpressionProfile(expressionAD)}
					       </Typography>
					      </Grid>
					    </Grid>
				    </Grid>
				    </Grid>
				    </div>
				    </Paper>
			      </Grid>
			    </Grid>
	  	      </Paper>
	  	    </Grid>
	  	    </Grid>
		  </Container>
		</div>
		)} else {
		return(
		<div className="results-body">
		  <MuiThemeProvider theme={theme}>
	  	  <Grid
	        container
	        direction="column"
	        justify="center"
	        alignItems="center"
	        style={{minHeight:'100vh'}}
	        spacing={5}
	      >
	        <Grid item>
	          <Typography
	            variant="h2"
	            style={{fontWeight: '200'}}
				gutterBottom
	          >
	      		Error Occured :( {status}
	          </Typography>
			  <Typography variant="h6">
					{data.error.message}
			  </Typography>
	        </Grid>
	        <Grid item>
	          <Button
	            variant="outlined"
	            color="primary"
	            onClick={() => {history.push('./optimize')}}
	          >
	          Try Again?
	          </Button>
	        </Grid>
	      </Grid>
	      </MuiThemeProvider>
		</div>
		)}
}

export default Results