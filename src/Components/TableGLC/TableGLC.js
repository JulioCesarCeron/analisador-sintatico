import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const TableGLC = (props) => {
    const { classes } = props;
    return (
        <Grid item xs={12} sm={6} style={props.width}>
            <Paper className={classes.root}>
                <div className={classes.paperTitle}>
                    <h3>{props.title}</h3>
                </div>
                <div className={classes.tableContent}>
                    <Table className={classes.table}>
                        <TableBody>
                            {Object.keys(props.data).map(key => {
                                return (
                                    <TableRow key={key}>
                                        <TableCell className={classes.cell}>
                                            {key}
                                        </TableCell>
                                        {props.data[key].map((value, index) => {
                                            return (
                                                <TableCell
                                                    key={index}
                                                    className={classes.cell}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            </Paper>
        </Grid>
    );
};

const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit * 3,
        overflowX: "auto"
    },
    paperTitle: {
        background: "#717171",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        height: 40
    },
    tableContent: {
        paddingLeft: 10,
        paddingRight: 10
    },
    cell: {
        width: 20,
        textAlign: "center",
        padding: 0
    },
    title: {
        width: "100%",
        background: "rebeccapurple"
    },
    gridClass: {
        maxWidth: 250
    }
});

export default withStyles(styles)(TableGLC);
