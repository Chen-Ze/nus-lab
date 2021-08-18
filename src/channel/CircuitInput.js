import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { InputAdornment, TextField } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    input: {
        fontFamily: "Courier New, monospace",
    },
}));

export function CircuitInput(props) {
    const classes = useStyles();

    return (
        <TextField
            value={props.value}
            onChange={props.onChange}
            label={props.label}
            InputProps={{
                endAdornment: <InputAdornment position="end">{props.unit}</InputAdornment>,
                className: classes.input
            }}
        />
    );
}
