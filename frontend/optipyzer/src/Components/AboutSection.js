import React from 'react';

// import material ui
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
	aboutBody: {
		textAlign: 'justify;',
  		textJustify: 'inter-word;',
	},
	aboutHeader: {
		textAlign: 'left',
		fontWeight: '400'
	}
  }))

const AboutSection = (props) => {

	const styles = useStyles();

	return (
		<div>
		    <Typography
		      variant="h2"
		      className={styles.aboutHeader}
		    >
		      {props.title}
		    </Typography>
		  <Grid
		    container
		    direction="row"
		    justify="flex-start"
		    alignItems="center"
		    spacing={3}
		    style={{height:'100%'}}
		  >
		    <Grid item xs={12} lg={7}>
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
			<br></br>
		    <Typography
		      variant="body1"
		      className={styles.aboutBody}
		    >
		      {props.body3}
		    </Typography>
		    </Grid>
		    <Grid item xs={12} lg={5}>
		    	{props.content}
		    </Grid>
		  </Grid>
		</div>
		);

}

export default AboutSection;