import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import Header from './Components/Header/Header';

class App extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.content}>
				<Header />
			</div>
		);
	}
}

const styles = {
	content: {
		margin: 0
	}
};

export default withStyles(styles)(App);
