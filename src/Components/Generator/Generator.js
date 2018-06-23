import React from 'react';
import { withStyles, Grid, Paper, Divider } from '@material-ui/core';

import InputToken from './InputToken/InputToken';
import Chips from './Chips/Chips';
import SwitchContent from './SwitchContent/SwitchContent';
import TableContent from './TableContent/TableContent';
import StepArrows from './StepArrows/StepArrows';

const Generator = (props) => {
	let replay;
	const tableDataLength = props.tableData.length;

	const { classes } = props;
	const padStart =
		props.tableData[props.currentToken] !== undefined
			? props.tableData[props.currentToken].queue[0].input.length
			: 0;

	if (props.tableData[props.currentToken] !== undefined) {
		replay = props.tableData[props.currentToken].queue.length - 1 === props.step;
	}

	return (
		<Grid item xs sm={10}>
			<Paper className={classes.paper}>
				<InputToken
					padStart={padStart}
					onInputToken={props.onInputToken}
					onHandleToken={props.onHandleToken}
					onResetAll={props.onResetAll}
                    inputToken={props.inputToken}
                    onGenerateToken={props.onGenerateToken}
                    onDialog={props.onDialog}
                    onOpenDialog={props.onOpenDialog}
                    onCloseDialog={props.onCloseDialog}
				/>

				<SwitchContent
					padStart={padStart}
					showTable={props.showTable}
					onShowTable={props.onShowTable}
					stepByStep={props.stepByStep}
					onHandleStepByStep={props.onHandleStepByStep}
				/>

				{tableDataLength !== 0 && <Divider />}
				<Chips tableData={props.tableData} onSelectToken={props.onSelectToken} />
				{tableDataLength !== 0 && <Divider />}
				{props.showTable && (
					<TableContent
						stepByStep={props.stepByStep}
						tableData={props.tableData[props.currentToken]}
						queue={props.tableData[props.currentToken].queue}
						padStart={padStart}
						step={props.step}
					/>
				)}

				{props.stepByStep && (
					<StepArrows
						replay={replay}
						stepByStep={props.stepByStep}
						onPreviousStep={props.onPreviousStep}
						onNextStep={props.onNextStep}
						onResetStep={props.onResetStep}
					/>
				)}
			</Paper>
		</Grid>
	);
};

const styles = (theme) => ({
	paper: {
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
		padding: 20
	}
});

export default withStyles(styles)(Generator);
