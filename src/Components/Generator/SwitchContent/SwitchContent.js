import React from 'react';
import { Grid, FormControlLabel, Switch } from '@material-ui/core';

const SwitchContent = (props) => {
	return (
		<Grid container wrap="nowrap" spacing={0} justify="center">
			<Grid item xs sm={9}>
				<FormControlLabel
					control={
						<Switch
							disabled={props.padStart > 0 ? false : true}
							title="Exibe passo a passo a tabela de parsing"
							checked={props.showTable}
							onChange={props.onShowTable}
							value="checkedB"
							color="primary"
						/>
					}
					label={<span style={{ color: '#888888' }}>TABELA PARSING</span>}
				/>
				<FormControlLabel
					control={
						<Switch
							disabled={props.padStart > 0 ? false : true}
							title="Exibe passo a passo a tabela de parsing"
							checked={props.stepByStep}
							onChange={props.onHandleStepByStep}
							value="checkedB"
							color="primary"
						/>
					}
					label={<span style={{ color: '#888888' }}>PASSO A PASSO</span>}
				/>
			</Grid>
		</Grid>
	);
};

export default SwitchContent;
