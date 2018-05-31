import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';

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
				b: 'C → Bd ',
				c: 'C → Bd ',
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

	handleToken = (token) => {
		console.log('token primeiro', token[0]);
		console.log('token', token);

		let input = token;
		let action = '';
		let queue = 'S';
		let next = true;

		let counter = 0;

		console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||');

		let stateQueue = [];

		while (counter < 11) {
			let lastQueue = queue[queue.length - 1];

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
				let value = queue.replace(lastQueue);
			} else {
				
				stateQueue.push({
                    queue: queue,
					input: input,
					action: 'ler ' + lastQueue
                });


                input = input.replace(lastQueue, '');
                let indexPos = queue.lastIndexOf(lastQueue);
                queue = queue.substr(0, indexPos);
			}
            
			counter++;
            
			console.log('---------------------------------------');
		}
        
        console.log('FINAL stateQueue', stateQueue);
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
							<Generator onHandleToken={this.handleToken} data={this.state.tabela_analise} />
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
