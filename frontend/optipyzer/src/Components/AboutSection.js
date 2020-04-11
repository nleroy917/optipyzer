import React from 'react';

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	aboutBody: {
		textAlign: 'justify;',
  		textJustify: 'inter-word;',
	},
	aboutHeader: {
		textAlign: 'left'
	}
  }))

const AboutSection = (props) => {

	const styles = useStyles();

	return (
		<div>
		    <Typography
		      variant="h1"
		      className={styles.aboutBody}
		    >
		      {props.title}
		    </Typography>
		  <Grid
		    container
		    direction="row"
		    justify="flex-start"
		    alignItems="stretch"
		    spacing={4}
		    style={{height:'100%'}}
		  >
		    <Grid item xs={12} lg={8}>
		    <Typography
		      variant="body1"
		      className={styles.aboutBody}
		    >
		      {props.body1}
		    </Typography>
		    <br></br>
		    <Typography
		      variant="body1"
		      className={styles.aboutBody}
		    >
		      {props.body2}
		    </Typography>
		    </Grid>
		    <Grid item xs={12} lg={4}>
		      <Paper elevation={20}>
		      	(Animation here)
		      </Paper>
		    </Grid>
		  </Grid>
		</div>
		);

}

export default AboutSection;