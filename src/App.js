import React, { Component } from 'react';
import {
	withStyles,
	Grid,
	Tabs,
	Tab,
	Typography,
	AppBar,
	Snackbar,
	SnackbarContent,
	IconButton
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { amber, green } from '@material-ui/core/colors';
import { Info, Close } from '@material-ui/icons';

import Header from './Components/Header/Header';
import InfoProduction from './Components/InfoProduction/InfoProduction';
import Generator from './Components/Generator/Generator';
import TableProduction from './Components/TableGLC/TableProduction';
import TableGenerator from './Components/TableGLC/TableGenerator';
import GenerateToken from './Components/GenerateToken/GenerateToken';

class App extends Component {
	state = {
		value: 0,
		inputValue: '',
		tabela_analise: {
			S: {
				a: '',
				b: 'S → bBa',
				c: 'S → cC',
				d: '',
				sf: ''
			},
			A: {
				a: 'A → ε',
				b: 'A → bS',
				c: 'A → cCa',
				d: 'A → ε',
				sf: ''
			},
			B: {
				a: '',
				b: 'B → b',
				c: 'B → cCA',
				d: '',
				sf: ''
			},
			C: {
				a: 'C → a',
				b: 'C → Bd',
				c: 'C → Bd',
				d: '',
				sf: ''
			}
		},
		history: [],
		showTable: false,
		tokens: '',
		stepByStep: false,
		step: 0,
		currentToken: 10,
		snackbarOpen: false,
		dialog: false
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	reverse = (str) => {
		return str.split('').reverse().join('');
	};

	handleResetAll = () => {
		this.setState({
			value: 1,
			inputValue: '',
			history: [],
			showTable: false,
			tokens: '',
			stepByStep: false,
			step: 0,
			currentToken: 0
		});
		this.closeDialog();
	};

	openDialog = () => {
		this.setState({
			dialog: true
		});
	};

	closeDialog = () => {
		this.setState({
			dialog: false
		});
	};

	handleResetStep = () => {
		this.setState({
			step: 0
		});
	};

	handleNextStep = () => {
		this.setState((prevState) => {
			return {
				step:
					prevState.step < this.state.history[this.state.currentToken].queue.length - 1
						? prevState.step + 1
						: prevState.step
			};
		});
	};

	handlePrevioustStep = () => {
		this.setState((prevState) => {
			return { step: prevState.step !== 0 ? prevState.step - 1 : prevState.step };
		});
	};

	handleStepByStep = () => {
		this.setState((prevState) => {
			return {
				stepByStep: !prevState.stepByStep,
				showTable: true
			};
		});
	};

	saveQueue = (queue, valid) => {
		this.setState((prevState) => ({
			history: [
				...prevState.history,
				{
					queue: queue,
					valid: valid
				}
			]
		}));
	};

	onShowTable = () => {
		this.setState((prevState) => {
			return { showTable: !prevState.showTable };
		});
	};

	isUpperCase = (aCharacter) => {
		return aCharacter >= 'A' && aCharacter <= 'Z';
	};

	handleGenerateToken = () => {
		this.setState({
			inputValue: GenerateToken()
		});
	};

	openSnackbar = () => {
		this.setState({ snackbarOpen: true });
	};

	onCloseSnackbar = () => {
		this.setState({ snackbarOpen: false });
	};

	handleToken = () => {
		if (this.state.tokens.indexOf(this.state.inputValue) !== -1) {
			this.openSnackbar();
		} else {
			let input = this.state.inputValue;
			this.setState((prevState) => {
				return { tokens: [ ...prevState.tokens, this.state.inputValue ] };
			});

			let action = '';
			let queue = 'S';
			let next = true;

			let stateQueue = [];

			while (next) {
				let lengthIteration = stateQueue.length + 1;

				//identifica final da linguagem
				if (input.length === 0 && queue.length === 0) {
					stateQueue.push({
						queue: '',
						input: '',
						action: 'aceito em ' + lengthIteration + ' iterações'
					});
					this.saveQueue(stateQueue, true);
					break;
				}

				//identifica erro, pilha possui mais elementos do que a entrada
				if (input.length === 0 && queue.length > 0) {
					stateQueue.push({
						queue: queue,
						input: '',
						action: 'erro em ' + lengthIteration + ' iterações'
					});
					this.saveQueue(stateQueue, false);
					break;
				}

				//identifica erro, entrada possui mais elementos do que a pilha
				if (input.length > 0 && queue.length === 0) {
					stateQueue.push({
						queue: '',
						input: input,
						action: 'erro em ' + lengthIteration + ' iterações'
					});
					this.saveQueue(stateQueue, false);
					break;
				}

				let lastQueue = queue[queue.length - 1];

				//identifica erro, elmento não pertence a linguagem
				if ('abcd'.indexOf(input[0]) === -1) {
					stateQueue.push({
						queue: queue,
						input: input,
						action: 'erro em ' + lengthIteration + ' iterações'
					});
					this.saveQueue(stateQueue, false);
					break;
				}

				//verifica se o ultimo valor da pilha é um não terminal ou um terminal
				if (lastQueue === lastQueue.toUpperCase()) {
					//consulta tabela
					action = this.state.tabela_analise[lastQueue][input[0]];

					if (action === '') {
						stateQueue.push({
							queue: queue,
							input: input,
							action: 'erro em ' + lengthIteration + ' iterações'
						});
						this.saveQueue(stateQueue, false);
						break;
					}

					stateQueue.push({
						queue: queue,
						input: input,
						action: action
					});

					let pos = queue.lastIndexOf(lastQueue);
					queue =
						queue.substring(0, pos) +
						(this.reverse(action.slice(action.indexOf('→ ') + 2)) !== 'ε'
							? this.reverse(action.slice(action.indexOf('→ ') + 2))
							: '');
				} else {
					stateQueue.push({
						queue: queue,
						input: input,
						action: 'ler ' + lastQueue
					});

					if (lastQueue !== input[0]) {
						stateQueue.push({
							queue: queue,
							input: input,
							action: 'erro em ' + (lengthIteration + 1) + ' iterações'
						});
						this.saveQueue(stateQueue, false);
						break;
					}

					input = input.replace(lastQueue, '');
					let indexPos = queue.lastIndexOf(lastQueue);
					queue = queue.substr(0, indexPos);
				}
			}

			this.setState({
				currentToken: this.state.history.length,
				step: 0
			});
		}
	};

	selecteToken = (index) => {
		this.setState({
			currentToken: index
		});
	};

	render() {
		TabContainer.propTypes = {
			children: PropTypes.node.isRequired
		};

		const { classes } = this.props;
		const data = {
			S: [ '→', 'bBa', '|', 'cC', '', '' ],
			A: [ '→', 'cCa', '|', 'bS', '|', 'ε' ],
			B: [ '→', 'cCA', '|', 'b', '', '' ],
			C: [ '→', 'Bd', '|', 'a', '', '' ]
		};

		const first = {
			S: [ '=', '{b, c}' ],
			A: [ '=', '{c, b, ε}' ],
			B: [ '=', '{c, b}' ],
			C: [ '=', '{c, b, a}' ]
		};

		const follow = {
			S: [ '=', '{$, a, d}' ],
			A: [ '=', '{a, d, ε}' ],
			B: [ '=', '{a, d}' ],
			C: [ '=', '{a, c, b, d, $}' ]
		};

		const { value } = this.state;

		return (
			<div className={classes.content}>
				<AppBar position="static">
					<Header />
					<Tabs value={value} centered onChange={this.handleChange}>
						<Tab label="Produção" />
						<Tab label="Gerador" />
					</Tabs>
				</AppBar>

				{value === 0 && (
					<TabContainer>
						<Grid container className={classes.root} justify="center" spacing={16}>
							<InfoProduction title="Produção" sm={3} data={data} />
							<InfoProduction title="First" sm={3} data={first} />
							<InfoProduction title="Follow" sm={3} data={follow} />
						</Grid>
						<Grid container className={classes.root} justify="center" spacing={16} wrap="wrap">
							<TableProduction data={this.state.tabela_analise} title="Tabela de Análise" />
						</Grid>
					</TabContainer>
				)}
				{value === 1 && (
					<TabContainer>
						<Grid container className={classes.root} justify="center" spacing={16}>
							<Snackbar
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								open={this.state.snackbarOpen}
								onClose={this.onCloseSnackbar}
								ContentProps={{
									'aria-describedby': 'message-id'
								}}
								message={<span id="message-id">Esta sentença já foi inserida</span>}
							/>
							<Snackbar
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								open={this.state.snackbarOpen}
								autoHideDuration={5000}
								onClose={this.onCloseSnackbar}
							>
								<SnackbarContent
									className={classes.info}
									aria-describedby="client-snackbar"
									message={
										<span id="client-snackbar" className={classes.message}>
											<Info className={classes.icon} />
											<span style={{ marginLeft: 10 }}>Sentença já inserida</span>
										</span>
									}
									action={[
										<IconButton
											key="close"
											aria-label="Close"
											color="inherit"
											className={classes.close}
											onClick={this.onCloseSnackbar}
										>
											<Close className={classes.icon} />
										</IconButton>
									]}
								/>
							</Snackbar>
							<Generator
								tableData={this.state.history}
								onHandleToken={this.handleToken}
								onInputToken={(event) => this.setState({ inputValue: event.target.value })}
								inputToken={this.state.inputValue}
								data={this.state.tabela_analise}
								currentToken={this.state.currentToken}
								showTable={this.state.showTable}
								onShowTable={this.onShowTable}
								step={this.state.step}
								stepByStep={this.state.stepByStep}
								onHandleStepByStep={this.handleStepByStep}
								onNextStep={this.handleNextStep}
								onPreviousStep={this.handlePrevioustStep}
								onResetStep={this.handleResetStep}
								onResetAll={this.handleResetAll}
								onGenerateToken={this.handleGenerateToken}
								onSelectToken={this.selecteToken}
								onDialog={this.state.dialog}
								onOpenDialog={this.openDialog}
								onCloseDialog={this.closeDialog}
							/>
						</Grid>
						<Grid container className={classes.root} justify="center" spacing={16}>
							<TableGenerator data={this.state.tabela_analise} title="Tabela de Análise" />
						</Grid>
					</TabContainer>
				)}
			</div>
		);
	}
}

const styles = (theme) => ({
	content: {
		margin: 0,
		flexGrow: 1
		//backgroundColor: theme.palette.background.paper
	},
	root: {
		paddingTop: 0,
		padding: 20
	},
	success: {
		backgroundColor: green[600]
	},
	error: {
		backgroundColor: theme.palette.error.dark
	},
	info: {
		backgroundColor: theme.palette.primary.dark
	},
	warning: {
		backgroundColor: amber[700]
	},
	icon: {
		fontSize: 20
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing.unit
	},
	message: {
		display: 'flex',
		alignItems: 'center'
	},
	margin: {
		margin: theme.spacing.unit
	}
});

function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

export default withStyles(styles)(App);
