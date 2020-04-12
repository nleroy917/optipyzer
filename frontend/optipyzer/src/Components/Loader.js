// import core React
import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress'

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import ColorPalette from '../Resources/ColorPalette'

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    primary: {
        main: ColorPalette.white
      }
    }
  },
)

const Loader = (props) => {
	return (
		<div>
		  <MuiThemeProvider theme={theme}>
		  <CircularProgress
		  	size={props.size}
		  	thickness={2}
		  	color="primary"
		  />
		  </MuiThemeProvider>
		</div>
		);
}

export default Loader;