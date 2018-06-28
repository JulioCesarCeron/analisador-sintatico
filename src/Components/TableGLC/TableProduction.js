import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Grid, Typography } from '@material-ui/core';

import TableContent from './TableContent';

const TableProduction = (props) => {
	const { classes } = props;
	return (
		<Grid item xs={12} sm={9}>
			<Paper className={classes.root}>
				<div className={classes.paperContentTitle}>
					<Typography className={classes.paperTitle}>{props.title}</Typography>
				</div>
				<TableContent data={props.data} />
			</Paper>
		</Grid>
	);
};

const styles = (theme) => ({
	root: {
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto'
	},
	paperContentTitle: {
		background: '#606060',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: 40
	},
	paperTitle: {
		fontWeight: 500,
		color: 'white'
	},

});

export default withStyles(styles)(TableProduction);
