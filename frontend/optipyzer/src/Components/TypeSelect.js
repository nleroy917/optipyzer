// import core React
import React from 'react';

// import material ui
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const TypeSelect = (props) => {
	const handleChange = (event) => {
		const type = event.target.value
		props.setType(type)
		//console.log(event.target.value)
	}
	return(
		<div>
		  <FormControl component="fieldset">
			<FormLabel component="legend">Sequence Type</FormLabel>
				<RadioGroup row aria-label="Sequence Type" name="seqType" defualtvalue="dna" onChange={handleChange}>
		          <FormControlLabel value="dna" control={<Radio />} label="DNA" />
		          <FormControlLabel value="protein" control={<Radio />} label="Protein" />
		        </RadioGroup>
		  </FormControl>
        </div>
		);
}

export default TypeSelect;
