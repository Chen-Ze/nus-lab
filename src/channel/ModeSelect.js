import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    select: {
        width: "20ch",
    }
}));

export default function ModeSelect(props) {
    const classes = useStyles();

    return (
        <FormControl className={classes.select} variant="outlined">
            <InputLabel>Mode</InputLabel>
            <Select
                value={props.mode}
                onChange={e => props.setMode(e.target.value)}
                label="Mode"
            >
                <MenuItem value="Off">
                    <em>Off</em>
                </MenuItem>
                <MenuItem value={"FixedCurrent"}>Fixed Current</MenuItem>
                {!props.fixedModeOnly && <MenuItem value={"SweepCurrent"}>Sweep Current</MenuItem>}
                <MenuItem value={"FixedVoltage"}>Fixed Voltage</MenuItem>
                {!props.fixedModeOnly && <MenuItem value={"SweepVoltage"}>Sweep Voltage</MenuItem>}
            </Select>
        </FormControl>
    );
}
