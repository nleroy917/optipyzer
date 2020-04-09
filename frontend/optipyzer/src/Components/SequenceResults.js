// Import Core React
import React from 'react'

// Import Material-UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

// Import Custom Components
import CopyToClipboard from './CopyToClipboard';

// Import ColorPalette
import ColorPalette from '../Resources/ColorPalette'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	
	formTextField: {
	  	width: '100%'
	  },

  }));

  const SequenceResults = (props) => {

  	const styles = useStyles()

  	return(
  		<div className={styles.padding}>
  			<Paper
  			  elevation={10}
  			>
  		<Grid 
  		    container 
  	        direction="row">
		  <Grid item ls={11} xs={11}>
	   		  <TextField
	   		  defaultValue={props.seq}
	            variant="outlined" 
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
  			</Paper>
  		</div>
  		);

  }

export default SequenceResults
