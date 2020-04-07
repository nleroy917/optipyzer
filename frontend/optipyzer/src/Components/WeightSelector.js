import React, {useState} from 'react'

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  slider: {
    width: '100%',
  },
});

const defaultVal = 1

const WeightSelector = (props) => {


	const styles = useStyles()

	const valuetext = (value) => {
  			return `${value}`;
	}

	return (
		<div className={styles.slider}>
            {props.name}
		  <Slider
	        defaultValue={1}
	        getAriaValueText={valuetext}
	        aria-labelledby="discrete-slider"
	        valueLabelDisplay="auto"
	        step={1}
	        marks
	        min={1}
	        max={10}
	        onChange={(event,value) => {
	        	console.log(value)
	        	props.setWeights({...props.weights, [props.id]: value})
	        }}
      	  />
		</div>
		);
}

export default WeightSelector;