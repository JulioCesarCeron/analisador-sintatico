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
import { Done, Close, SkipPrevious, PlayArrow, SkipNext } from '@material-ui/icons';
const Generator = (props) => {
    const lastToken = props.tableData.length === 0 ? 0 : props.tableData.length - 1;

    const { classes } = props;
    const padStart =
        props.tableData[[lastToken]] !== undefined ? props.tableData[[lastToken]].queue[0].input.length : 0;

    // if (props.tableData[lastToken] !== undefined) {
    //     props.tableData[lastToken].queue[0].map(item => {console.log('item', item)})
        
    // }


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
                            onChange={props.onInputToken}
                            margin="dense"
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
                                    onClick={props.onHandleToken}
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
                                    onClick={props.onShowTable}
                                    disabled={padStart > 0 ? false : true}
                                >
                                    Tabela
								</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <FormControlLabel
                    control={
                        <Switch
                            checked={props.stepByStep}
                            onChange={props.onHandleStepByStep}
                            value="checkedB"
                            color='primary'
                        />
                    }
                    label="Step by Step"
                />
                {props.tableData.length !== 0 && <Divider />}
                <Grid container wrap="nowrap" className={classes.contentChip} spacing={8}>
                    <Grid item xs zeroMinWidth>
                        {props.tableData.slice(0).reverse().map((token, i) => (
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
                {props.tableData.length !== 0 && <Divider />}
                {(props.showTable && !props.stepByStep) && (
                    <Grid container wrap="nowrap" spacing={8} justify="center">
                        <Grid item xs={12} sm={10}>
                            {props.tableData[[lastToken]] !== undefined && (
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>PILHA</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>ENTRADA</TableCell>
                                            <TableCell>AÇÃO</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {props.tableData[[lastToken]].queue.map((data, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell className={classes.cell}>
                                                        <Typography>
                                                            <strong>$</strong>
                                                            {data.queue}
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
                {console.log('props.stepByStep', props.stepByStep)}
                {(props.showTable && props.stepByStep) && (
                    <Grid container wrap="nowrap" spacing={8} justify="center">
                        <Grid item xs={12} sm={10}>
                            {props.tableData[lastToken] !== undefined && (
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>PILHA</TableCell>
                                            <TableCell style={{ textAlign: 'center' }}>ENTRADA</TableCell>
                                            <TableCell>AÇÃO</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {   
                                            console.log('props.tableData[lastToken].queue', props.tableData[lastToken].queue[0])
                                           
                                        }

                                        {props.tableData[lastToken].queue.map((data, i) => {
                                            return (
                                                <TableRow key={i}>
                                                    <TableCell className={classes.cell}>
                                                        <Typography>
                                                            <strong>$</strong>
                                                            {data.queue}
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

                {props.stepByStep && <Zoom in={props.stepByStep} className={classes.zoomContent} >
                    <div className={classes.details}>
                        <div className={classes.controls}>
                            <IconButton aria-label="Previous">
                                <SkipPrevious />
                            </IconButton>
                            {/*
                                <IconButton aria-label="Play/pause">
                                    <PlayArrow className={classes.playIcon} />
                                </IconButton>
                            */}
                            <IconButton aria-label="Next" onClick={() => { console.log("next") }}>
                                <SkipNext />
                            </IconButton>
                        </div>
                    </div>
                </Zoom>}



            </Paper>
        </Grid>
    );
};

const styles = (theme) => ({
    root: {
        overflow: 'hidden'
        //padding: `0 ${theme.spacing.unit * 3}px`
    },
    paper: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        padding: 20
    },
    wrapper: {
        //maxWidth: 400
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
        marginLeft: 10,
        marginBottom: 10,
    },
    contentChip: {
        marginTop: 10
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
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
        width: 38,
    },
    zoomContent: {
        marginTop: 10,
    }
});

export default withStyles(styles)(Generator);
