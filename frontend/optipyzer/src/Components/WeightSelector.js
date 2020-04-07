import React, {useState, useEffect} from 'react'

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  slider: {
    width: '100%',
    textAlign:'left'
  },
  speciesName: {
  	fontWeight: '200'
  }
});

const defaultVal = 1

const WeightSelector = (props) => {
	
	useEffect(() => {
		//console.log(`Weight Selector props.weights:`)
		//console.log(props.weights)
		props.setWeights({...props.weights, [props.id]: 1})
	},[])

	const styles = useStyles()

	const valuetext = (value) => {
  			return `${value}`;
	}

	return (
		<div className={styles.slider}>
		 <Typography className={styles.speciesName}>
            {props.name}
         </Typography>
		  <Slider
	        defaultValue={defaultVal}
	        getAriaValueText={valuetext}
	        valueLabelDisplay="auto"
	        step={1}
	        min={1}
	        max={10}
	        onChange={(event,value) => {
	        	//console.log(value)
	        	props.setWeights({...props.weights, [props.id]: value})
	        }}
      	  />
		</div>
		);
}

export default WeightSelector;