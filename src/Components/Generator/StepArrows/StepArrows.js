import React from 'react';
import { Zoom, IconButton, withStyles } from '@material-ui/core';
import { SkipPrevious, PlayArrow, SkipNext, Replay } from '@material-ui/icons';

const StepArrows = (props) => {
	const { classes } = props;
	return (
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

					{!props.replay && (
						<IconButton aria-label="Next" onClick={props.onNextStep}>
							<SkipNext />
						</IconButton>
					)}

					{props.replay && (
						<IconButton aria-label="Next" onClick={props.onResetStep}>
							<Replay />
						</IconButton>
					)}
				</div>
			</div>
		</Zoom>
	);
};

const styles = (theme) => ({
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

export default withStyles(styles)(StepArrows);
