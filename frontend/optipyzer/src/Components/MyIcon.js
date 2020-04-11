// Load Core React Modules + Cookies + CSS
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	icon: {
		height:'25px',
		width:'auto',
		fill: 'white'
	}
}

));

const MyIcon = (props) => {

	const styles=useStyles();

	return(
		<div>
		  <img 
		    src={props.path}
		    className={styles.icon}
		  />
		</div>
		);
}

export default MyIcon;