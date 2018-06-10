import React from 'react';
import { TableRow, TableCell, Typography, TableBody } from '@material-ui/core';

const StepByStep = (props) => {
	let stepByStepContent;

	for (let index = 0; index < props.step; index++) {
		console.log(props.dataTable);
		stepByStepContent += (
			<TableRow key={index}>
				<TableCell>
					<Typography>
						<strong>$</strong>
						{props.dataTable[index].queue}
					</Typography>
				</TableCell>
				<TableCell style={{ paddingLeft: 0 }}>
					<Typography style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
						{props.dataTable[index].input.padStart(props.padStart)} <strong>$</strong>
					</Typography>
				</TableCell>
				<TableCell>
					<Typography>{props.dataTable[index].action}</Typography>
				</TableCell>
			</TableRow>
		);
	}

    stepByStepContent
    console.log('stepByStepContent', stepByStepContent);
	return <TableBody>stepByStepContent</TableBody>;
};

export default StepByStep;
