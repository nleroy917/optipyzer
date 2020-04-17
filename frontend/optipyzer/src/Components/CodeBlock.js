import React from 'react';

// Import syntax highlighting
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

// import material ui
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({

	codeBlock: {
		textAlign: 'left',
		boxShadow: '2px 5px 9px black'
	}


}));

const CodeBlock = (props) => {

	const styles = useStyles();

	return(
		<div>
		  <SyntaxHighlighter
		    style={gruvboxDark}
		    showLineNumbers={true}
		    className={styles.codeBlock}
		    language="python"
		  >
		    {props.children}
		  </SyntaxHighlighter>
		</div>
	);
}

export default CodeBlock;