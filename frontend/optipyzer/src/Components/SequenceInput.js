// import core React
import React from 'react';

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';


const useStyles = makeStyles(() => ({

  formTextField: {
  	width: '100%'
  }

}));

const SequenceInput = (props) => {

    const styles = useStyles();

	return(
	  <ClickAwayListener
	    onClickAway={() => {
	    	 }}
	  >
  	   <TextField 
            variant="outlined" 
            id="seq" 
            label="Sequence" 
            multiline={true}
            required={true}
            fullWidth
            className={styles.formTextField}
            onChange={(event) => {props.setSeq(event.target.value)}}
          />
        </ClickAwayListener>
		);
}

export default SequenceInput