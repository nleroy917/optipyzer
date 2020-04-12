// Load Core React Modules + Cookies + CSS
import React from 'react';

import { useHistory } from "react-router-dom";

// Load Core Material UI Elements
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	nav: {
		background:'transparent',
		boxShadow:'none',
		alignItems:'space between'
	},
	navItem: {
		marginRight:'30px',
		marginLeft:'30px',
		'&:hover': {
			opacity: '0.7',
       		//borderBottom: 'solid 2px #04ffdf'
       		overlay: 'none'
	}
},
	navItemGitHubIcon: {
		marginRight:'5px',
		marginLeft:'30px',
		'&:hover': {
       		opacity: '0.7',
       		//borderBottom: 'solid 2px #04ffdf'
       		overlay: 'none'
	}
},
	navItemGitHubButton: {
		marginRight:'30px',
		marginLeft:'5px',
		'&:hover': {
       		opacity: '0.7',
       		//borderBottom: 'solid 2px #04ffdf'
       		overlay: 'none'
	}
},
	navUnderline: {
		'&:hover': {
       		//opacity: '0.7',
       		borderBottom: 'solid 2px #88d2db'
	}
	}


}));

const NavBar = (props) => {

	const history = useHistory();
	const styles = useStyles();

	return(
		<AppBar position="static" className={styles.nav}>
		  <Toolbar>
		    <Box 
		      className={styles.navUnderline}
		      onClick={() => {history.push('/')}}
		    >
		      <Button 
		        //variant="outlined" 
		        className={styles.navItem}  
		        color="inherit">
		        Home
		      </Button>
		    </Box>
		    <Box 
		      className={styles.navUnderline}
		      onClick={() => {history.push('/optimize')}}
		    >
		      <Button 
		        //variant="outlined" 
		        className={styles.navItem}  
		        color="inherit">
		        Optimize
		      </Button>
		    </Box>
		    <Box 
		      className={styles.navUnderline}
		      onClick={() => {history.push('/about')}}
		    >
		    <Button 
		      //variant="outlined" 
		      className={styles.navItem} 

		      color="inherit">
		      About
		    </Button>
		    </Box>
			<Box 
			  className={styles.navUnderline}
		      onClick={() => {history.push('/dev')}} 
			>
		    <Button 
		      //variant="outlined" 
		      className={styles.navItem} 
		      color="inherit">
		      API & Dev Tools
		    </Button>
		    </Box>
		    <Box 
		      className={styles.navUnderline}
		      onClick={() => {window.location.assign('https://github.com/NLeRoy917/optipyzer.com')}} 
		    >
		    <GitHubIcon
		      className={styles.navItemGitHubIcon} 
		    />
		    <Button 
		      //variant="outlined" 
		      className={styles.navItemGitHubButton} 
		      color="inherit">
		      GitHub
		    </Button>
		    </Box>
		  </Toolbar>
		</AppBar>
		);
}

export default NavBar;