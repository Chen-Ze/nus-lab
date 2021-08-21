import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    select: {
        width: "25ch",
        margin: theme.spacing(1)
    }
}));

export default function Topbar(props) {
    const classes = useStyles();

    return (
        <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
                <FormControl className={classes.select} variant="outlined">
                    <InputLabel>Address</InputLabel>
                    <Select
                        value={props.keithley2636Address}
                        onChange={e => props.setKeithley2636Address(e.target.value)}
                        label="Address"
                    >
                        {
                            props.availableAddresses.map(address => (
                                <MenuItem key={address} value={address}>
                                    {address}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Toolbar>
        </AppBar>
    );
}
