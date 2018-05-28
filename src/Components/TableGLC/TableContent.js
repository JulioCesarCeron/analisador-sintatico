import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const TableContent = (props) => {
    const { classes } = props;
	return (
		<div className={classes.tableContent}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell> </TableCell>
						<TableCell numeric>a</TableCell>
						<TableCell numeric>b</TableCell>
						<TableCell numeric>c</TableCell>
						<TableCell numeric>d</TableCell>
						<TableCell numeric>$</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{Object.keys(props.data).map((key) => {
						return (
							<TableRow key={key}>
								<TableCell className={classes.cell}>{key}</TableCell>
								{Object.keys(props.data[key]).map((subKey, index) => {
									return (
										<TableCell key={index} className={classes.cell}>
											{props.data[key][subKey]}
										</TableCell>
									);
								})}
							</TableRow>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
};

const styles = (theme) => ({
	tableContent: {
		paddingLeft: 10,
        paddingRight: 10,
	},
	cell: {
		width: 20,
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

export default withStyles(styles)(TableContent);
