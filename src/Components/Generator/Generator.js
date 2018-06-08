import React, { Component } from 'react';
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
	TableRow
} from '@material-ui/core';
import { Done, Eject, Close } from '@material-ui/icons';

class Generator extends Component {
	state = {
		inputValue: 'bcacaaa'
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid item xs={12} sm={9}>
				<Paper className={classes.paper}>
					<Grid container wrap="nowrap" spacing={16} className={classes.contentTextField}>
						<Grid item xs zeroMinWidth>
							<TextField
								fullWidth
								id="token"
								label="TOKEN"
								type="search"
								//className={classes.textField}
								margin="dense"
								onChange={(event) => this.setState({ inputValue: event.target.value })}
							/>
						</Grid>
						<Grid item xs sm={2} className={classes.contentButton}>
							<Grid container wrap="nowrap" spacing={8}>
								<Grid item>
									<Button
										size="small"
										variant="raised"
										color="primary"
										className={classes.button}
										onClick={() => this.props.onHandleToken(this.state.inputValue)}
									>
										Verificar
									</Button>
								</Grid>
								<Grid item>
									<Button
										size="small"
										variant="raised"
										color="primary"
										className={classes.button}
										onClick={() => this.props.onHandleToken(this.state.inputValue)}
									>
										Tabela
									</Button>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
					<Grid container wrap="nowrap" spacing={8}>
						<Grid item xs zeroMinWidth>
							<Chip
								label="bcacaaa"
								onClick={() => 1}
								onDelete={() => 1}
								className={classes.chip}
								deleteIcon={<Done style={{ color: 'green' }} />}
							/>
							<Chip
								label="bcacaaa"
								onClick={() => 1}
								onDelete={() => 1}
								style={{ marginLeft: 10 }}
								className={classes.chip}
								deleteIcon={<Close style={{ color: 'red' }} />}
							/>
						</Grid>
					</Grid>
					{this.props.tableData && (
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>a</TableCell>
									<TableCell>b</TableCell>
									<TableCell>c</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{this.props.tableData.map((data, i) => (
									<TableRow key={i}>
										<TableCell className={classes.cell}>
											<Typography>queue</Typography>
										</TableCell>
										<TableCell className={classes.cell}>
											<Typography>input</Typography>
										</TableCell>
										<TableCell className={classes.cell}>
											<Typography>Ação</Typography>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					)}

					{/*this.props.tableData &&
					 	this.props.tableData.map((data) => (
					 		<Grid container wrap="nowrap" spacing={16} className={classes.contentTable}>
					 			<Grid item xs zeroMinWidth>
					 				<Typography noWrap>Entrada</Typography>
					 			</Grid>

					 			<Grid item xs className={classes.queue}>
					 				<Typography noWrap>Pilha</Typography>
					 			</Grid>

					 			<Grid item xs zeroMinWidth className={classes.action}>
					 				<Typography noWrap>Ação</Typography>
					 			</Grid>
					 		</Grid>
                      	))*/}
				</Paper>
			</Grid>
		);
	}
}

const styles = (theme) => ({
	root: {
		overflow: 'hidden'
		//padding: `0 ${theme.spacing.unit * 3}px`
	},
	wrapper: {
		//maxWidth: 400
	},
	paper: {
		//margin: theme.spacing.unit,
		padding: 20
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: 200
	},
	contentButton: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-start'
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
		marginLeft: 10
	}
});

export default withStyles(styles)(Generator);
