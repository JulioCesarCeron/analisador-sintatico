import React from 'react';
import { Grid, Chip, withStyles } from '@material-ui/core';
import { Done, Close } from '@material-ui/icons';

const Chips = (props) => {
	const { classes } = props;
	return (
		<Grid container wrap="nowrap" className={classes.contentChip} spacing={8}>
			<Grid item xs zeroMinWidth>
				{props.tableData
					.slice(0)
					.reverse()
					.map((token, i) => (
						<Chip
							key={i}
							label={token.queue[0].input}
							onClick={() => 1}
							onDelete={() => 1}
							className={classes.chip}
							deleteIcon={
								token.valid ? <Done style={{ color: 'green' }} /> : <Close style={{ color: 'red' }} />
							}
						/>
					))}
			</Grid>
		</Grid>
	);
};

const styles = (theme) => ({
	chip: {
		marginLeft: 10,
		marginBottom: 10
	},
	contentChip: {
		marginTop: 10
	}
});

export default withStyles(styles)(Chips);
