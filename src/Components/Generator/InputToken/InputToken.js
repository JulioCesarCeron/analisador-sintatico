import React from 'react';
import {
	Grid,
	Button,
	withStyles,
	TextField,
	Dialog,
	DialogContent,
	DialogActions,
	DialogContentText,
	DialogTitle
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';

const InputToken = (props) => {
	const { classes } = props;
	return (
		<Grid container wrap="nowrap" spacing={16} justify="center" className={classes.contentTextField}>
			<Grid item xs sm={9} className={classes.contentWrapper}>
				<Grid container wrap="nowrap" spacing={8} justify="flex-end">
					<Grid item xs zeroMinWidth>
						<TextField
							sm={7}
							fullWidth
							id="token"
							label="SENTENÇA"
							type="search"
							value={props.inputToken}
							onChange={props.onInputToken}
							margin="dense"
						/>
					</Grid>

					<Grid className={classes.contentButton}>
						<Grid container wrap="nowrap" spacing={8}>
							<Grid item>
								<Button
									title="Gera um token válido"
									size="small"
									variant="raised"
									onClick={props.onGenerateToken}
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
									title="verifica se o token é válido"
									size="small"
									variant="raised"
									color="primary"
									className={classes.button}
									onClick={props.onHandleToken}
									disabled={props.inputToken !== '' ? false : true}
								>
									Validar
								</Button>
							</Grid>
							<Grid item>
								<Button
									title="Remover todos os tokens inseridos)"
									size="small"
									color="secondary"
									variant="raised"
									style={{ paddingBottom: 0, paddingTop: 0, minWidth: 40 }}
									//onClick={props.onResetAll}
									onClick={props.onOpenDialog}
									disabled={props.padStart > 0 ? false : true}
								>
									<Delete />
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>

			<Dialog
				open={props.onDialog}
				onClose={() => 1}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Remover Sentenças?'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Esta ação irá remover todas as sentenças inseridas, deseja continuar?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={props.onCloseDialog} color="primary">
						Cancelar
					</Button>
					<Button onClick={props.onResetAll} color="primary" autoFocus>
						Sim
					</Button>
				</DialogActions>
			</Dialog>
		</Grid>
	);
};

const styles = (theme) => ({
	contentWrapper: {
		display: 'flex',
		alignItems: 'flex-end',
		justifyContent: 'flex-start'
	},
	contentButton: {
		display: 'flex',
		paddingBottom: 10,
		alignItems: 'flex-end',
		marginLeft: 10
	},
	button: {
		display: 'flex',
		alignItems: 'flex-end'
	},
	contentTextField: {
		display: 'flex',
		justifyContent: 'center'
	}
});

export default withStyles(styles)(InputToken);
