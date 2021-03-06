import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core/';

const TableContent = (props) => {
	const { classes } = props;
	return (
		<div className={classes.tableContent}>
			<Table className={classes.table}>
				<TableHead>
					<TableRow>
						<TableCell> </TableCell>
						<TableCell className={classes.headCell} numeric>a</TableCell>
						<TableCell className={classes.headCell} numeric>b</TableCell>
						<TableCell className={classes.headCell} numeric>c</TableCell>
						<TableCell className={classes.headCell} numeric>d</TableCell>
						<TableCell className={classes.headCell} numeric>$</TableCell>
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
		paddingRight: 10
	},
	headCell: {
        textAlign: 'center',
        fontSize: 16,
        
	},
	cell: {
		width: 20,
		textAlign: 'center',
        padding: 0,
        fontSize: 16,
       // color: '#676767'
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
