import React, { Component } from 'react';
import { withStyles, Grid, Tabs, Tab, Typography, AppBar } from '@material-ui/core';
import PropTypes from 'prop-types';

import Header from './Components/Header/Header';
import InfoProduction from './Components/InfoProduction/InfoProduction';
import Generator from './Components/Generator/Generator';
import TableProduction from './Components/TableGLC/TableProduction';
import TableGenerator from './Components/TableGLC/TableGenerator';

class App extends Component {
	state = {
		value: 1,
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
		history: []
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	reverse = (str) => {
		return str.split('').reverse().join('');
	};

	saveQueue = (queue) => {
		this.setState((prevState) => ({
			history: [ ...prevState.history, queue ]
		}));
	};

	handleToken = (token) => {
		let input = token;
		let action = '';
		let queue = 'S';
		let next = true;

		let counter = 0;

		let stateQueue = [];

		while (next) {
			let lengthIteration = stateQueue.length + 1;
			if (input.length === 0 && queue.length === 0) {
				stateQueue.push({
					queue: '',
					input: '',
					action: 'aceito em ' + lengthIteration + ' iterações'
				});
				this.saveQueue(stateQueue);
				break;
			}

			if (input.length === 0 && queue.length > 0) {
				stateQueue.push({
					queue: queue,
					input: '',
					action: 'erro em ' + lengthIteration + ' iterações'
				});
				this.saveQueue(stateQueue);
				break;
			}

			if (input.length > 0 && queue.length === 0) {
				stateQueue.push({
					queue: '',
					input: input,
					action: 'erro em ' + lengthIteration + ' iterações'
				});
				this.saveQueue(stateQueue);
				break;
			}

			let lastQueue = queue[queue.length - 1];

			//verifica se o ultimo valor da pilha é um não terminal ou um terminal
			if (lastQueue === lastQueue.toUpperCase()) {
				//consulta tabela
				action = this.state.tabela_analise[lastQueue][input[0]];

				stateQueue.push({
					queue: queue,
					input: input,
					action: action
				});

				let pos = queue.lastIndexOf(lastQueue);
				queue = queue.substring(0, pos) + this.reverse(action.slice(action.indexOf('→ ') + 2));
			} else {
				stateQueue.push({
					queue: queue,
					input: input,
					action: 'ler ' + lastQueue
				});

				if (lastQueue !== input[0]) {
					stateQueue.push({
						queue: '',
						input: '',
						action: 'erro em ' + (lengthIteration + 1) + ' iterações'
					});
					this.saveQueue(stateQueue);
					break;
				}

				input = input.replace(lastQueue, '');
				let indexPos = queue.lastIndexOf(lastQueue);
				queue = queue.substr(0, indexPos);
			}
			counter++;
		}
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
			A: [ '=', '{c, b}' ],
			B: [ '=', '{c, b}' ],
			C: [ '=', '{c, b, a}' ]
		};

		const follow = {
			S: [ '=', '{$, a, d}' ],
			A: [ '=', '{a, d}' ],
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
							<InfoProduction title="Produção" sm={2} data={data} />
							<InfoProduction title="First" sm={2} data={first} />
							<InfoProduction title="Follow" sm={2} data={follow} />
						</Grid>
						<Grid container className={classes.root} justify="center" spacing={16} wrap="wrap">
							<TableProduction data={this.state.tabela_analise} title="Tabela de Análise" />
						</Grid>
					</TabContainer>
				)}
				{value === 1 && (
					<TabContainer>
						<Grid container className={classes.root} justify="center" spacing={16}>
							<Generator tableData={this.state.history[0]} onHandleToken={this.handleToken} data={this.state.tabela_analise} />
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
