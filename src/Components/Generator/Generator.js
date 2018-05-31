import React, { Component } from 'react';
import { withStyles, Grid, Paper, TextField, Typography, Button } from '@material-ui/core';

class Generator extends Component {
	state = {
		inputValue: 'bcacaca'
	};

	render() {
		const { classes } = this.props;
		return (
			<Grid item xs={12} sm={8}>
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
							<Button
								variant="raised"
								color="primary"
								className={classes.button}
								onClick={() => this.props.onHandleToken(this.state.inputValue)}
							>
								Primary
							</Button>
						</Grid>
					</Grid>

					<Grid container wrap="nowrap" spacing={16}>
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

					<Grid container wrap="nowrap" spacing={16}>
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
		justifyContent: 'center',
		marginBottom: 40
	},
	input: {},
	queue: {
		borderLeft: '1px solid #959595'
	},
	action: {
		borderLeft: '1px solid #959595'
	}
});

export default withStyles(styles)(Generator);
