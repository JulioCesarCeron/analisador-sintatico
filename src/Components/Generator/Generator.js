import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, CardActions, Grid, Avatar, Paper, CardContent, Typography } from '@material-ui/core';

class Generator extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Grid item xs={12} sm={6}>
				<Paper className={classes.paper}>
					<Grid container wrap="nowrap" spacing={16}>
						<Grid item>
							<Avatar>W</Avatar>
						</Grid>
						<Grid item xs zeroMinWidth>
							<Typography noWrap>
								Truncation should be conditionally applicable on this long line of text as this is a
								much longer line than what the container can support.{' '}
							</Typography>
						</Grid>
                    </Grid>
				</Paper>
			</Grid>
		);
	}
}

const styles = (theme) => ({
	root: {
		overflow: 'hidden'
		//padding: `0 ${theme.spacing.unit * 3}px`
	},
	wrapper: {
		//maxWidth: 400
	},
	paper: {
		//margin: theme.spacing.unit,
		padding: 20
	}
});

export default withStyles(styles)(Generator);
