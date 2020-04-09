// Import Core React
import React, {useState} from 'react';

// Import Material UI
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ breakpoints, spacing, theme }) => ({
	
	typography: {
	  	padding: '5px'
	  }

  }));


const CopyToClipboard = (props) => {

	const styles = useStyles()

	const [anchor, setAnchor] = useState(null);

	const handleClose = () => {
		setAnchor(null)
	}

	const open = Boolean(anchor);
	const id = open ? 'simple-popover' : undefined;

	return(
		<div>

			<IconButton
			  aria-describedby={id}
			  onClick={(e) => {
			  	setAnchor(e.currentTarget)
			  	navigator.clipboard.writeText(props.seq);
			    // This is just personal preference.
			    // I prefer to not show the the whole text area selected.
			    e.target.focus();	
			  }}
			>
			  <FileCopyIcon/>
			</IconButton>
	       <Popover
	          id={id}
	          anchorEl={anchor}
		      open={open}
		      onClose={handleClose}
			  anchorOrigin={{
			    vertical: 'center',
			    horizontal: 'right',
			  }}
			  transformOrigin={{
			    vertical: 'center',
			    horizontal: 'left',
			  }}
			>
			  <Typography className={styles.typography}>Copied to Clipboard!</Typography>
			</Popover>
		</div>
		);
}

export default CopyToClipboard;