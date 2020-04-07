// import core React
import React, { useState, useEffect } from 'react';

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// import custom components
import Loader from '../Components/Loader'
import SequenceInput from '../Components/SequenceInput'
import SpeciesSelect from '../Components/SpeciesSelect'
import TypeSelect from '../Components/TypeSelect'
import WeightSelector from '../Components/WeightSelector'

// import css
import './css/Optimize.css';

// Import Color Palette
import ColorPalette from '../Resources/ColorPalette'

// import axios
const axios = require('axios').default;

const API_URL = 'http://127.0.0.1:5000/'

// Or Create your Own theme:
const theme = createMuiTheme({
  palette: {
    secondary: {
        main: ColorPalette.textInput
      }
    }
  },
)

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
    maxWidth: '40vw',
  	alignItems: 'left'
  },

  form: {
  	align: 'left'
  },
  formTitle: {
  	color: `${ColorPalette.textInput}`
  }
}));

const Optimize = (props) => {

  const styles = useStyles();

  const [speciesList, setSpeciesList] = useState(null);
  const [seq, setSeq] = useState(null);
  const [species,setSpecies] = useState(null);
  const [type, setType] = useState(null);
  const [weights, setWeights] = useState({});

  useEffect(() => {
  	fetchSpecies()
  },[])

  const fetchSpecies = async () => {

  	const response = await axios.get(`${API_URL}/fetch/species`)

    if(response.status === 200) {
          //console.log(response)
          const data = await response.data
          setSpeciesList(data)
    }

  }

  const handleSubmit = async () => {
    //const response = await axios.post(`${API_URL}/fetch/species`)
    console.log(seq)
    console.log(species)
    console.log(type)
    console.log(weights)
  }

  if(speciesList){
  return(
  	<div>
  	  <Container>
  	    <Grid
		  container
		  direction="column"
		  justify="center"
		  alignItems="center"
		  style={{ minHeight: '100vh', maxWidth: '100%' }}
		  spacing={10}
	    >
	    <Grid item xs={12} lg={12}>
  	      <Paper className={styles.formPaper} elevation={24}>
  	        <Container>
	  	        <MuiThemeProvider theme={theme}>
		  	      	<form className="form">
		  	          <Grid
    						  container
    						  direction="column"
    						  justify="center"
    						  alignItems="stretch"
    						  alignContent="center"
    						  spacing={2}
    					    >
      				    <Grid item lg={10} xl={10}>
      				      <Typography variant="h3" className={styles.formTitle}>
      				        Optimize Sequence
      				      </Typography>
      				    </Grid>
                  <Grid item lg={10} xl={10}>
                    <TypeSelect setType={setType}/>
                  </Grid>
      				    <Grid item lg={10} xl={10}>
                    <SequenceInput seqType={type} setSeq={setSeq}/>
      	  	       </Grid>
      		  	     <Grid item lg={10} xl={10}>
                     <SpeciesSelect speciesList={speciesList} setSpecies={setSpecies}/>
      					   </Grid>
                   <Grid item lg={10} xl={10}>
                     {(species && Object.entries(species).length !== 0) ? 
                      <Typography>
                         Species Weights
                      </Typography>
                      :
                      ' '
                     }
                     {species ? 
                      species.map((species,index) => {
                      return(
                        <div>
                          <WeightSelector
                            key={index}
                            weights={weights} 
                            setWeights={setWeights} 
                            name={species.name} 
                            id={species.id}
                          />
                        </div>
                        );
                      }) : ' '}
                   </Grid>
                   <Grid item lg={10} xl={10}>
                    <Button variant="outlined" color="secondary" onClick={handleSubmit}>
                      Optimize Sequence
                    </Button>
                   </Grid>
					       </Grid>
		  	        </form>
	  	        </MuiThemeProvider>
  	        </Container>
  	      </Paper>
  	      </Grid>
  	    </Grid>
  	  </Container>
  	</div>
  	);} else {
  	return(<Loader/>);

  }
}


export default Optimize;