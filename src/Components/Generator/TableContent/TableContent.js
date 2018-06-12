import React from 'react';
import { Grid, Table, TableHead, TableBody, TableRow, TableCell, Typography, WithStyles } from '@material-ui/core';

const TableContent = (props) => {
	return (
		<Grid container wrap="nowrap" spacing={8} justify="center">
			<Grid item xs={12} sm={10}>
				{props.tableData !== undefined && (
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>PILHA</TableCell>
								<TableCell style={{ textAlign: 'center' }}>ENTRADA</TableCell>
								<TableCell>AÇÃO</TableCell>
							</TableRow>
						</TableHead>
						{!props.stepByStep && (
							<TableBody>
								{props.queue.map((data, i) => {
									return (
										<TableRow key={i}>
											<TableCell>
												<Typography>
													<strong>$</strong> {data.queue}
												</Typography>
											</TableCell>
											<TableCell style={{ paddingLeft: 0 }}>
												<Typography style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
													{data.input.padStart(props.padStart)} <strong>$</strong>
												</Typography>
											</TableCell>
											<TableCell>
												<Typography>{data.action}</Typography>
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						)}
						{props.stepByStep && (
							<TableBody>
								{props.queue.map((data, i) => {
									if (i <= props.step) {
										return (
											<TableRow key={i}>
												<TableCell>
													<Typography>
														<strong>$</strong> {data.queue}
													</Typography>
												</TableCell>
												<TableCell style={{ paddingLeft: 0 }}>
													<Typography style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}>
														{data.input.padStart(props.padStart)} <strong>$</strong>
													</Typography>
												</TableCell>
												<TableCell>
													<Typography>{data.action}</Typography>
												</TableCell>
											</TableRow>
										);
									} else {
										return null;
									}
								})}
							</TableBody>
						)}
					</Table>
				)}
			</Grid>
		</Grid>
	);
};

export default TableContent;
