import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Avatar, Toolbar, Typography, IconButton, SvgIcon } from '@material-ui/core/';
import { GetApp } from '@material-ui/icons';

class Header extends React.Component {
	state = {
		auth: true,
		anchorEl: null
	};

	handleChange = (event, checked) => {
		this.setState({ auth: checked });
	};

	handleMenu = (event) => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render() {
		const { classes } = this.props;
		const { auth, anchorEl } = this.state;
		const open = Boolean(anchorEl);

		return (
			<div className={classes.root}>
				<Toolbar>
					<IconButton
						aria-owns={open ? 'menu-appbar' : null}
						aria-haspopup="true"
						href="https://github.com/JulioCesarCeron"
						color="inherit"
						style={{ marginRight: 20 }}
					>
						<Avatar
							alt="Julio Cesar Ceron"
							title="Github"
							src="https://avatars3.githubusercontent.com/u/7506632?s=40&v=4"
							className={classes.avatar}
						/>
					</IconButton>
					<Typography variant="title" color="inherit" className={classes.flex}>
						ANALISADOR SINTÁTICO
					</Typography>
					{auth && (
						<div>
							<IconButton
								aria-owns={open ? 'menu-appbar' : null}
								aria-haspopup="true"
								href="https://github.com/JulioCesarCeron/analisador-sintatico"
                                color="inherit"
                                title="Link do projeto no github"
							>
								<SvgIcon>
									<path d="M12.007 0C6.12 0 1.1 4.27.157 10.08c-.944 5.813 2.468 11.45 8.054 13.312.19.064.397.033.555-.084.16-.117.25-.304.244-.5v-2.042c-3.33.735-4.037-1.56-4.037-1.56-.22-.726-.694-1.35-1.334-1.756-1.096-.75.074-.735.074-.735.773.103 1.454.557 1.846 1.23.694 1.21 2.23 1.638 3.45.96.056-.61.327-1.178.766-1.605-2.67-.3-5.462-1.335-5.462-6.002-.02-1.193.42-2.35 1.23-3.226-.327-1.015-.27-2.116.166-3.09 0 0 1.006-.33 3.3 1.23 1.966-.538 4.04-.538 6.003 0 2.295-1.5 3.3-1.23 3.3-1.23.445 1.006.49 2.144.12 3.18.81.877 1.25 2.033 1.23 3.226 0 4.607-2.805 5.627-5.476 5.927.578.583.88 1.386.825 2.206v3.29c-.005.2.092.393.26.507.164.115.377.14.565.063 5.568-1.88 8.956-7.514 8.007-13.313C22.892 4.267 17.884.007 12.008 0z" />
								</SvgIcon>
							</IconButton>
							<IconButton
								aria-owns={open ? 'menu-appbar' : null}
								aria-haspopup="true"
								href="https://github.com/JulioCesarCeron/analisador-sintatico/archive/download.zip"
                                color="inherit"
                                title='Download'
							>
								<GetApp />
							</IconButton>
						</div>
					)}
				</Toolbar>
			</div>
		);
	}
}

const styles = {
	root: {
		flexGrow: 1
	},
	flex: {
		flex: 1
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	},
	avatar: {
		margin: 0
	},
	bigAvatar: {
		width: 60,
		height: 60
	}
};

Header.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
