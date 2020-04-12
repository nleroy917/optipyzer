// import core React
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// import custom components
import Loader from '../Components/Loader'
import SequenceInput from '../Components/SequenceInput'
import SpeciesSelect from '../Components/SpeciesSelect'
import TypeSelect from '../Components/TypeSelect'
import WeightSelector from '../Components/WeightSelector'

// import navbar
import NavBar from '../Components/NavBar';
import NavBarMobile from '../Components/NavBarMobile';


// import css
import './css/Optimize.css';

// Import Color Palette
import ColorPalette from '../Resources/ColorPalette'

// import axios
const axios = require('axios').default;

const API_URL = process.env.REACT_APP_API_URL
const BASE_URL = process.env.REACT_APP_BASE_URL

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
  }
},
  formPaper: {
  	background: '#FFF', //`${ColorPalette.formBackground}`,
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
  	alignItems: 'left'
  },
  formTitle: {
  	color: `${ColorPalette.textInput}`,
    textAlign: 'center',
    fontWeight: '300'
  },
  formSection : {
    fontWeight: '400',
    textAlign: 'left',
    padding: '5px'
  },
  hr: {
    borderTop: '1px',
    borderColor: '#dedede'
  }
}));

const Optimize = (props) => {

  const styles = useStyles();

  let history = useHistory();

  const [speciesList, setSpeciesList] = useState(null);
  const [seq, setSeq] = useState(null);
  const [species,setSpecies] = useState(null);
  const [type, setType] = useState(null);
  const [weights, setWeights] = useState(null);

  useEffect(() => {

    if(!speciesList){
  	   fetchSpecies()
     }
    if(weights) {
      fixWeights()
    }

  },[species])

  const fetchSpecies = async () => {
  	let response = await axios.get(`${API_URL}fetch/species`)

    if(response.status === 200) {
          //console.log(response)
          let data = await response.data
          setSpeciesList(data)
    }

  }

  const fixWeights = () => {

      //console.log('Fixing Weights')
      // Extract all id's from weights
      const weights_ids = []
      for(var wt_id in weights) {
        weights_ids.push(wt_id)
      }

      // Extract all id's from species
      const species_ids = []
      for(var i in species) {
        var spec = species[i]
        species_ids.push(spec.id.toString()) // spec.id is an int
        if(!(weights_ids.includes(spec.id.toString()))) {
          weights[spec.id.toString()] = 1
        }
      }

      // Iterate through weights - if an id in weights isnt in the array, delete it
      // Note that each id in weights is a string
      for(var id in weights) {

        if(!(species_ids.includes(id))){
          //console.log(`Found extraneous id in weights: ${id}... deleteing`)
          delete weights[id]
        }
      }

      setWeights(weights)
      }

  const handleSubmit = async () => {
    // console.log(seq)
    // console.log(species)
    // console.log(type)
    // console.log(weights)

    if(seq===null){
      alert('Sequence is required!')
    }else if(species===null){
      alert('At least 1 species is required!')
    }else if(type===null) {
      alert('Sequence type is required!')
    }

    let org_list = []

    for(var index in species) {
      var spec = species[index]
      org_list.push(spec.id.toString())
    }

    let response = await axios.post(`${API_URL}/optimize/${type}`,{
                                        seq: seq,
                                        org_list: org_list,
                                        weights: weights}
                                        );
    if(response.status === 200) {
      let data = await response.data

      history.push({
        pathname: '/results',
        state: { data: data }})
    }

  }

  if(speciesList){
  return(
  	<div className="optimize-body">
    <Container>
        <BrowserView>
          <NavBar/>
        </BrowserView>
        <MobileView>
          <NavBarMobile />
        </MobileView>
        <br></br>
  	 <Grid
		  container
		  direction="column"
		  justify="center"
		  alignItems="center"
		  style={{ minHeight: '90vh'  }}
		  spacing={10}
	    >
	    <Grid item xs={12} lg={12}>
  	      <Paper 
            className={styles.formPaper} 
            elevation={24}
            //square={true}
          >
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
      				      <Typography variant="h4" className={styles.formTitle}>
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
                     <SpeciesSelect 
                     speciesList={speciesList} 
                     setSpecies={setSpecies}
                     weights={weights}
                     setWeights={setWeights}
                     species={species}
                     />
      					   </Grid>
                   <Grid item lg={10} xl={10}>
                     {(species && Object.entries(species).length !== 0) ?
                      <div>
                        <br></br>
                          <div  className={styles.formSection}>
                            <Typography variant="h6">
                               Species Weights
                            </Typography>
                            <hr className={styles.hr}></hr>
                        </div>
                      </div>
                      :
                      ' '
                     }
                     {species ? 
                      species.map((species,index) => {
                      return(
                        <div key={index}>
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
                    <Button variant="outlined" onClick={handleSubmit}>
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

    // Get Loader
  	return(
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{minHieght:'100vh'}}
      >
       <Grid item>
        <Loader/>
       </Grid>
      </Grid>
      );

  }
}


export default Optimize;