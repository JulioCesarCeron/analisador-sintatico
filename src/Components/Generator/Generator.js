import React from 'react';
import {
	withStyles,
	Grid,
	Paper,
	TextField,
	Typography,
	Button,
	Chip,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	Switch,
	IconButton,
	FormControlLabel,
	Divider,
	Zoom
} from '@material-ui/core';
import { Done, Close, SkipPrevious, PlayArrow, SkipNext, Replay, Autorenew } from '@material-ui/icons';

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
				<Grid container wrap="nowrap" spacing={16} justify="center" className={classes.contentTextField}>
					<Grid item xs sm={6} zeroMinWidth>
						<TextField
							sm={7}
							fullWidth
							id="token"
							label="TOKEN"
							type="search"
							//className={classes.textField}
							onChange={props.onInputToken}
							margin="dense"
						/>
					</Grid>
					<Grid item xs sm={3} className={classes.contentButton}>
						<Grid container wrap="nowrap" spacing={8}>
							<Grid item>
								<Button
									title="verifica se o token é válido"
									size="small"
									variant="raised"
									color="primary"
									className={classes.button}
									onClick={props.onHandleToken}
								>
									Verificar
								</Button>
							</Grid>
							<Grid item>
								<Button
									title="Gera um token válido"
									size="small"
									variant="raised"
									style={{
										paddingBottom: 0,
										paddingTop: 0,
										minWidth: 40,
										backgroundColor: '#4caf50',
										color: 'white'
									}}
								>
									Gerar
								</Button>
							</Grid>
							<Grid item>
								<Button
									title="Atualizar aplicação (remove todos os tokens)"
									size="small"
									color="secondary"
									variant="raised"
                                    style={{ paddingBottom: 0, paddingTop: 0, minWidth: 40 }}
                                    onClick={props.onResetAll}
									disabled={padStart > 0 ? false : true}
								>
									<Autorenew />
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
				<Grid container wrap="nowrap" spacing={0} justify="center">
					<Grid item xs sm={9}>
						<FormControlLabel
							control={
								<Switch
									disabled={padStart > 0 ? false : true}
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
									disabled={padStart > 0 ? false : true}
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
				{tableDataLength !== 0 && <Divider />}
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
										token.valid ? (
											<Done style={{ color: 'green' }} />
										) : (
											<Close style={{ color: 'red' }} />
										)
									}
								/>
							))}
					</Grid>
				</Grid>
				{tableDataLength !== 0 && <Divider />}
				{props.showTable &&
				!props.stepByStep && (
					<Grid container wrap="nowrap" spacing={8} justify="center">
						<Grid item xs={12} sm={10}>
							{props.tableData[props.currentToken] !== undefined && (
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell>PILHA</TableCell>
											<TableCell style={{ textAlign: 'center' }}>ENTRADA</TableCell>
											<TableCell>AÇÃO</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{props.tableData[props.currentToken].queue.map((data, i) => {
											return (
												<TableRow key={i}>
													<TableCell className={classes.cell}>
														<Typography>
															<strong>$</strong> {data.queue}
														</Typography>
													</TableCell>
													<TableCell style={{ paddingLeft: 0 }} className={classes.cell}>
														<Typography
															style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}
														>
															{data.input.padStart(padStart)} <strong>$</strong>
														</Typography>
													</TableCell>
													<TableCell className={classes.cell}>
														<Typography>{data.action}</Typography>
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							)}
						</Grid>
					</Grid>
				)}

				{/* STEP BY STEP */}
				{props.showTable &&
				props.stepByStep && (
					<Grid container wrap="nowrap" spacing={8} justify="center">
						<Grid item xs={12} sm={10}>
							{props.tableData[props.currentToken] !== undefined && (
								<Table className={classes.table}>
									<TableHead>
										<TableRow>
											<TableCell>PILHA</TableCell>
											<TableCell style={{ textAlign: 'center' }}>ENTRADA</TableCell>
											<TableCell>AÇÃO</TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{props.tableData[props.currentToken].queue.map((data, i) => {
											if (i <= props.step) {
												return (
													<TableRow key={i}>
														<TableCell className={classes.cell}>
															<Typography>
																<strong>$</strong> {data.queue}
															</Typography>
														</TableCell>
														<TableCell style={{ paddingLeft: 0 }} className={classes.cell}>
															<Typography
																style={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}
															>
																{data.input.padStart(padStart)} <strong>$</strong>
															</Typography>
														</TableCell>
														<TableCell className={classes.cell}>
															<Typography>{data.action}</Typography>
														</TableCell>
													</TableRow>
												);
											} else {
												return null;
											}
										})}
									</TableBody>
								</Table>
							)}
						</Grid>
					</Grid>
				)}

				{/*ARROWS STEP BY STEP */}
				{props.stepByStep && (
					<Zoom in={props.stepByStep} className={classes.zoomContent}>
						<div className={classes.details}>
							<div className={classes.controls}>
								<IconButton aria-label="Previous" onClick={props.onPreviousStep}>
									<SkipPrevious />
								</IconButton>
								{/*
                                <IconButton aria-label="Play/pause">
                                    <PlayArrow className={classes.playIcon} />
                                </IconButton>
                            */}

								{!replay && (
									<IconButton aria-label="Next" onClick={props.onNextStep}>
										<SkipNext />
									</IconButton>
								)}

								{replay && (
									<IconButton aria-label="Next" onClick={props.onResetStep}>
										<Replay />
									</IconButton>
								)}
							</div>
						</div>
					</Zoom>
				)}
				{/*ARROWS STEP BY STEP */}
			</Paper>
		</Grid>
	);
};

const styles = (theme) => ({
	root: {
		overflow: 'hidden'
	},
	paper: {
		marginTop: theme.spacing.unit * 3,
		overflowX: 'auto',
		padding: 20
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	},
	contentButton: {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'flex-start'
	},
	button: {
		marginBottom: 4
	},
	contentTextField: {
		display: 'flex',
		justifyContent: 'center'
	},
	contentTable: {
		paddingTop: 40
	},
	input: {},
	queue: {
		borderLeft: '1px solid #959595'
	},
	action: {
		borderLeft: '1px solid #959595'
	},
	chip: {
		marginLeft: 10,
		marginBottom: 10
	},
	contentChip: {
		marginTop: 10
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		justifyContent: 'center'
	},
	playIcon: {
		height: 38,
		width: 38
	},
	zoomContent: {
		marginTop: 10
	}
});

export default withStyles(styles)(Generator);
