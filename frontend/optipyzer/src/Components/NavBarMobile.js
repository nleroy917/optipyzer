// Load Core React Modules + Cookies + CSS
import React from 'react';

// import tools
import { useHistory } from "react-router-dom";

// Load Core Material UI Elements
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import GitHubIcon from '@material-ui/icons/GitHub';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';


// Import ColorPalette
import ColorPalette from '../Resources/ColorPalette'


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
       		//borderBottom: 'solid 2px #04ffdf'
       		overlay: 'none'
	},
	navIcon: {
		fill: '#FFF'
	}
}


}));

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
        main: ColorPalette.white
      }
    }
  },
)

const NavBarMobile = (props) => {

	const history = useHistory();
	const styles = useStyles();

	return(
	  <MuiThemeProvider theme={theme}>
		<AppBar position="static" className={styles.nav}>
		  <Toolbar>
		    <Box 
		      onClick={() => {history.push('/')}}
		    >
		      <IconButton>
		        <HomeIcon color="primary"/>
		      </IconButton>
		    </Box>
		    <Box 
		      onClick={() => {history.push('/optimize')}}
		    >
		      <IconButton>
		        <PlayCircleFilledIcon color="primary"/>
		      </IconButton>
		    </Box>
		    <Box 
		      onClick={() => {history.push('/about')}}
		    >
		      <IconButton>
		        <InfoIcon color="primary" />
		      </IconButton>
		    </Box>
			<Box 
		      onClick={() => {history.push('/dev')}} 
			>
		      <IconButton>
		        <BuildIcon color="primary"/>
		      </IconButton>
		    </Box>
		    <Box 
		      onClick={() => {window.location.assign('https://github.com/NLeRoy917/optipyzer.com')}} 
		    >
		    <IconButton>
		      <GitHubIcon
		        color="primary"
		      />
		    </IconButton>
		    </Box>
		  </Toolbar>
		</AppBar>
	  </MuiThemeProvider>
		);
}

export default NavBarMobile;