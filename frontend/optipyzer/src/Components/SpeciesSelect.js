// import core React
import React from 'react';

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Import Color Palette
import ColorPalette from '../Resources/ColorPalette'

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
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
  	[breakpoints.only('xs')]: {
  		minWidth: '80vw',
  		align: 'center'
  	},
  	minWidth: '40vw',
  	alignItems: 'left'
  },

  form: {
  	align: 'left'
  },
  formTitle: {
  	color: `${ColorPalette.textInput}`
  }
}));

const SpeciesSelect = (props) => {

  	const styles = useStyles();


	return(
		<Autocomplete
        onChange={(event,value) => {
          	props.setSpecies(value)
            //fixWeights(event,value)
                    }}
	      multiple
	      id="species"
	      options={props.speciesList}
	      getOptionLabel={(option) => option.name}
	      filterSelectedOptions
	      renderInput={(params) => (
	        <TextField
	          className={styles.formTextField}
	          {...params}
	          variant="outlined"
	          label="Select Species"
	          placeholder="Select Species"
	          fullWidth
	        />
	      )}
	      />
		);
}

export default SpeciesSelect