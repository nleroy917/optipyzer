// Import core React
import React, {useState, useEffect} from 'react';

// Import Material UI Components
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Import Custom Components
import SequenceResults from '../Components/SequenceResults'

// Import Color Palette
import ColorPalette from '../Resources/ColorPalette'

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
  }
  }));


const Results = (props) => {

	const styles = useStyles();

	const [data,setData] = useState(props.location.state.data);

	useEffect(() => {
		console.log(props.location.state.data)
	},[])

	return (
		<div>
		  <Container>
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
				  spacing={10}
				  style={{minWidth: '100%'}}
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
			      <Grid item xs={12} lg={12}>
			        <SequenceResults
			          label="Sequence (Squared Difference)"
			          seq={data.optimmized_sd}
			        />
			      </Grid>
			    </Grid>
	  	      </Paper>
	  	    </Grid>
	  	    </Grid>
		  </Container>
		</div>
		);
}

export default Results