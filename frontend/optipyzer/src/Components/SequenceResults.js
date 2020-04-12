// Import Core React
import React from 'react'

// Import Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

// Import Custom Components
import CopyToClipboard from './CopyToClipboard';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	
	formTextField: {
	  	width: '100%'
	  },
	  paperContainer: {
	  	padding: '10px'
	  },
	  paper: {
	  	background: 'rgba(143,161,251,0.37)'
	  }

  }));

  const SequenceResults = (props) => {

  	const styles = useStyles()

  	return(
  		<div>
  			<Paper
  			  elevation={3}
  			  className={styles.paper}
  			>
  			<div className={styles.paperContainer}>
  		<Grid 
  		    container 
  	        direction="row">
		  <Grid item ls={11} xs={11}>
	   		  <TextField
	   		  defaultValue={props.seq}
	            variant="standard" 
	            id="seq" 
	            label={props.label}
	            multiline={true}
	            fullWidth
	            className={styles.formTextField}
	            InputProps={{
	            	readOnly: true
	            }}
	           />
	           </Grid>
	           <Grid item ls={1} xs={1}>
	           <CopyToClipboard
	             seq={props.seq}
	           />
	           </Grid>
	           </Grid>
	           </div>
  			</Paper>
  		</div>
  		);

  }

export default SequenceResults
