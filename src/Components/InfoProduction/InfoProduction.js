import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableRow, Paper, Grid, Typography} from '@material-ui/core';

const InfoProduction = (props) => {
	const { classes } = props;
	return (
		<Grid item xs={12} sm={props.sm} style={props.width}>
			<Paper className={classes.root}>
				<div className={classes.paperContentTitle}>
					<Typography className={classes.paperTitle}>{props.title}</Typography>
				</div>
				<div className={classes.tableContent}>
					<Table className={classes.table}>
						<TableBody>
							{Object.keys(props.data).map((key) => {
								return (
									<TableRow key={key}>
										<TableCell className={classes.cell}>{key}</TableCell>
										{props.data[key].map((value, index) => {
											return (
												<TableCell key={index} className={classes.cell}>
													{value}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</Paper>
		</Grid>
	);
};

const styles = (theme) => ({
	root: {
		width: '100%',
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
	tableContent: {
		paddingLeft: 10,
		paddingRight: 10
	},
	cell: {
		width: 19,
		textAlign: 'center',
		padding: 0
	},
	title: {
		width: '100%',
		background: 'rebeccapurple'
	},
	gridClass: {
		maxWidth: 250
	}
});

export default withStyles(styles)(InfoProduction);
