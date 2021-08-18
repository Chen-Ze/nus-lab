import React from 'react';
import { useState } from 'react';
import { FilledInput, FormControl, Grid, Input, OutlinedInput, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { CircuitInput } from './CircuitInput';
import ModeSelect from './ModeSelect';


const useStyles = makeStyles((theme) => ({
    item: {
        display: "flex",
        justifyContent: "center",
    },
    title: {
        display: "flex",
        [theme.breakpoints.down('xs')]: {
            justifyContent: "center",
        },
    },
    mode: {
        display: "flex",
        [theme.breakpoints.down('xs')]: {
            justifyContent: "center",
        },
        [theme.breakpoints.only('sm')]: {
            justifyContent: "flex-end",
        },
    },
}));

function OffChannel() {
    return (<></>);
}

function FixedCurrentChannel(props) {
    const classes = useStyles();

    const [values, setValues] = useState({
        value: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };   

    return (
        <Grid container spacing={1} justifyContent="center">
            <Grid item className={classes.item} xs={12}>
                <FormControl variant="filled">
                    <CircuitInput
                        value={values.start}
                        onChange={handleChange('start')}
                        label="Value"
                        unit="A"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

function SweepCurrentChannel(props) {
    const classes = useStyles();

    const [values, setValues] = useState({
        start: '',
        end: '',
        step: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };   

    return (
        <Grid container spacing={1} justifyContent="center">
            <Grid item className={classes.item} xs={12}>
                <FormControl variant="filled">
                    <CircuitInput
                        value={values.start}
                        onChange={handleChange('start')}
                        label="Start"
                        unit="A"
                    />
                </FormControl>
            </Grid>
            <Grid item className={classes.item} xs={12}>
                <FormControl variant="filled">
                    <CircuitInput
                        value={values.end}
                        onChange={handleChange('end')}
                        label="End"
                        unit="A"
                    />
                </FormControl>
            </Grid>
            <Grid item className={classes.item} xs={12}>
                <FormControl variant="filled">
                    <CircuitInput
                        value={values.step}
                        onChange={handleChange('step')}
                        label="Step"
                        unit="A"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

function FixedVoltageChannel(props) {
    const classes = useStyles();

    const [values, setValues] = useState({
        value: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };   

    return (
        <Grid container spacing={1} justifyContent="center">
            <Grid item className={classes.item} xs={12}>
                <FormControl variant="filled">
                    <CircuitInput
                        value={values.start}
                        onChange={handleChange('start')}
                        label="Value"
                        unit="V"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

function SweepVoltageChannel(props) {
    const classes = useStyles();

    const [values, setValues] = useState({
        start: '',
        end: '',
        step: ''
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };   

    return (
        <Grid container spacing={1} justifyContent="center">
            <Grid item className={classes.item} xs={12}>
                <FormControl variant="filled">
                    <CircuitInput
                        value={values.start}
                        onChange={handleChange('start')}
                        label="Start"
                        unit="V"
                    />
                </FormControl>
            </Grid>
            <Grid item className={classes.item} xs={12}>
                <FormControl variant="filled">
                    <CircuitInput
                        value={values.end}
                        onChange={handleChange('end')}
                        label="End"
                        unit="V"
                    />
                </FormControl>
            </Grid>
            <Grid item className={classes.item} xs={12}>
                <FormControl variant="filled">
                    <CircuitInput
                        value={values.step}
                        onChange={handleChange('step')}
                        label="Step"
                        unit="V"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default function Channel(props) {
    const classes = useStyles();

    const [mode, setMode] = useState("Off");

    function channel() {
        switch (mode) {
            case "Off":
                return <OffChannel />;
            case "FixedCurrent":
                return <FixedCurrentChannel />;
            case "SweepCurrent":
                return <SweepCurrentChannel />;
            case "FixedVoltage":
                return <FixedVoltageChannel />;
            case "SweepVoltage":
                return <SweepVoltageChannel />;
            default:
                return <></>;
        }
    }

    return (
        <Grid container spacing={1} alignItems="center" justifyContent="center" >
            <Grid item className={classes.title} xs={12} sm={3} md={4} lg={3}>
                <Typography variant="h5" >
                    {props.title}
                </Typography>
            </Grid>
            <Grid item className={classes.mode} xs={12} sm={9} md={8} lg={9}>
                <ModeSelect mode={mode} setMode={setMode} />
            </Grid>
            {channel()}
        </Grid>
    );
}