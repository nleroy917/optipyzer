// import core React
import React, { useState, useEffect } from 'react';

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

// import custom components


// import css
import './css/Optimize.css';

// Import Color Palette
import ColorPalette from '../Resources/ColorPalette'

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    secondary: {
        main: ColorPalette.textInput
      }
    }
  },
)

const speciesList = [{name:'E.Coli', id: 1 }, 
                     {name:'Campilobacter', id: 2 }, 
                     {name:'Helobacter', id: 3 }, 
                     {name:'Bacillus Subtilus', id: 4 }]

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
  },
  formPaper: {
  	background: `${ColorPalette.formBackground}`,
  	padding: '30px',
  	minWidth: '40vw',
  	alignItems: 'left'
  },
  form: {
  	align: 'left'
  }
});

const Optimize = (props) => {
  const styles = useStyles();
  const [speciesList, setSpeciesList] = useState([{name:'E.Coli', id: 1 }, 
                     {name:'Campilobacter', id: 2 }, 
                     {name:'Helobacter', id: 3 }, 
                     {name:'Bacillus Subtilus', id: 4 }]);

  return(
  	<div>
  	  <Container>
  	    <Grid
		  container
		  direction="column"
		  justify="center"
		  alignItems="center"
		  style={{ minHeight: '100vh', maxWidth: '100%' }}
		  spacing={10}
	    >
	    <Grid item xs={12} lg={12}>
  	      <Paper className={styles.formPaper}>
  	        <Container>
	  	        <MuiThemeProvider theme={theme}>
		  	      	<form className="form">
		  	          <Grid
						  container
						  direction="column"
						  justify="center"
						  alignItems="center"
						  spacing={2}
					    >
					    <Grid item>
		  	          <TextField 
		  	            variant="outlined" 
		  	            id="seq" 
		  	            label="Sequence" 
		  	            multiline="true"
		  	            required="true"
		  	            fullWidth="true"
		  	          />
		  	          </Grid>
		  	          <Grid item>
		  	          <Autocomplete
				        multiple
				        id="species"
				        options={speciesList}
				        getOptionLabel={(option) => option.name}
				        defaultValue={[speciesList[1]]}
				        filterSelectedOptions
				        renderInput={(params) => (
				          <TextField
				            {...params}
				            variant="outlined"
				            label="Species"
				            placeholder="Select Species"
				          />
				        )}
				      />
				      </Grid>
				      </Grid>
		  	        </form>
	  	        </MuiThemeProvider>
  	        </Container>
  	      </Paper>
  	      </Grid>
  	    </Grid>
  	  </Container>
  	</div>
  	);
}


export default Optimize;