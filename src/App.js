import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Header from "./Components/Header/Header";
import InfoProduction from "./Components/InfoProduction/InfoProduction";
import TableGLC from "./Components/TableGLC/TableGLC";

class App extends Component {
    render() {
        const { classes } = this.props;
        const data = {
            S: ["→", "bBa", "|", "cC", "", ""],
            A: ["→", "cCa", "|", "bS", "|", "ε"],
            B: ["→", "cCA", "|", "b", "", ""],
            C: ["→", "Bd", "|", "a", "", ""]
        };

        const first = {
            S: ["=", "{b, c}"],
            A: ["=", "{c, b}"],
            B: ["=", "{c, b}"],
            C: ["=", "{c, b, a}"]
        };

        const follow = {
            S: ["=", "{$, a, d}"],
            A: ["=", "{a, d}"],
            B: ["=", "{a, d}"],
            C: ["=", "{a, c, b, d, $}"]
        };

        const tabela_analise = {
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
            },
        }

        return (
            <div className={classes.content}>
                <Header />
                <Grid container className={classes.root} spacing={16}>
                    <InfoProduction title="Produção" sm={2} data={data} />
                    <InfoProduction
                        title="First"
                        sm={2}
                        // width={{ maxWidth: 250 }}
                        data={first}
                    />
                    <InfoProduction
                        title="Follow"
                        sm={2}
                        //width={{ maxWidth: 250 }}
                        data={follow}
                    />
                </Grid>
                <Grid container className={classes.root} spacing={16}>
                    <TableGLC />
                </Grid>
            </div>
        );
    }
}

const styles = {
    content: {
        margin: 0
    },
    root: {
        paddingTop: 0,
        padding: 20
    },
    body: {},
    gridContent: {
        display: "flex"
    }
};

export default withStyles(styles)(App);
