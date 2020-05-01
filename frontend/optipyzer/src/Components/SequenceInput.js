// import core React
import React, { useState } from 'react';

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
  const type = props.seqType
  const [error,setError] = useState(false);
  const [tempSeq,setTempSeq] = useState(props.seq)
  const styles = useStyles();

	return(
	  <ClickAwayListener
	    onClickAway={() => {
         // if the sequence is protein, no need to check length
         if(type === 'protein'){
           setError(false)
           return
         }
         //console.log(tempSeq)
         if(!(tempSeq)){
          setError(false)
          return 
         }
         if(tempSeq.length % 3 !== 0){
          setError(true)
         } else {
          setError(false)
         }
	    	 }}
	  >
  	   <TextField
            error={error}
            helperText={error ? 'Sequence must be divisible by 3':''}
            variant="outlined" 
            id="seq" 
            label="Sequence" 
            multiline={true}
            required={true}
            fullWidth
            className={styles.formTextField}
            onChange={(event) => {
              props.setSeq(event.target.value)
              setTempSeq(event.target.value)
            }}
          />
        </ClickAwayListener>
		);
}

export default SequenceInput