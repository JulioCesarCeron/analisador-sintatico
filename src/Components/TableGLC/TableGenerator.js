import React from 'react';
import {
	ExpansionPanel,
	ExpansionPanelDetails,
	ExpansionPanelSummary,
	ExpansionPanelActions,
	Chip,
	Button,
	Divider,
	withStyles,
	Typography,
	Grid
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TableContent from '../TableGLC/TableContent';

const TableGenerator = (props) => {
	const { classes } = props;
	return (
		<Grid item xs={12} sm={6}>
			<div className={classes.root}>
				<ExpansionPanel>
					<ExpansionPanelSummary
						className={classes.headerExpansion}
						expandIcon={<ExpandMoreIcon style={{ color: 'white' }} />}
					>
						<div className={classes.column}>
							<Typography className={classes.heading}>{props.title}</Typography>
						</div>
					</ExpansionPanelSummary>
					<ExpansionPanelDetails className={classes.details}>
						<Grid item xs={12} sm={12}>
							<TableContent data={props.data} />
						</Grid>
					</ExpansionPanelDetails>
				</ExpansionPanel>
			</div>
		</Grid>
	);
};

const styles = (theme) => ({
	root: {
		width: '100%'
	},
	headerExpansion: {
		background: '#606060'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		color: 'white'
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	},
	icon: {
		verticalAlign: 'bottom',
		height: 20,
		width: 20
	},
	details: {
		alignItems: 'center'
	},
	column: {
		flexBasis: '33.33%'
	},
	helper: {
		borderLeft: `2px solid ${theme.palette.divider}`,
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
	},
	link: {
		color: theme.palette.primary.main,
		textDecoration: 'none',
		'&:hover': {
			textDecoration: 'underline'
		}
	}
});

export default withStyles(styles)(TableGenerator);
