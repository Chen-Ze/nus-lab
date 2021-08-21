import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography, makeStyles, IconButton, CardActions, FormControlLabel, Switch, FormControl, TextField } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Channel from './channel/Channel';
import DataPlot from './DataPlot';
import environment from './util/environment'
import { Autocomplete } from '@material-ui/lab';
import { evaluate } from 'mathjs';


const useStyles = makeStyles((theme) => ({
    plotGridCell: {
        display: "flex",
        justifyContent: "center",
    },
    axisValueGridCell: {
        display: "flex",
        justifyContent: "center",
    },
    axisValueAutoComplete: {
        width: "25ch",
    },
    axisValueAutoCompleteList: {
        fontFamily: "Courier New, monospace",
    },
    axisValueField: {
        fontFamily: "Courier New, monospace",
    },
    actions: {
        [theme.breakpoints.up('sm')]: {
            justifyContent: "flex-end",
        },
        [theme.breakpoints.down('xs')]: {
            justifyContent: "center",
        },
    }
}));

export default function MeasurementTab(props) {
    const classes = useStyles();

    const handleCheckedChange = (event) => {
        props.handleChange(event.target.name, event.target.checked);
    };

    const handleValueChange = (event) => {
        props.handleChange(event.target.name, event.target.value);
    };

    const [xExpression, setXExpression] = useState();
    const [yExpression, setYExpression] = useState();

    function evaluateAxis(expression, result) {
        return result.map(point => evaluate(expression, point));
    }

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3} justifyContent="center" >
                    <Grid item xs={12} md={6} >
                        <Channel
                            handleCheckedChange={handleCheckedChange}
                            handleValueChange={handleValueChange}
                            title="SMU A"
                            mode={props.smuAMode}
                            setMode={(mode) => props.handleChange("smuAMode", mode)}
                            parameters={props.smuAParameters}
                            setParameters={(parameters) => props.handleChange("smuAParameters", parameters)}
                            fixedModeOnly={environment.isSweepMode(props.smuBMode)}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Channel
                            handleCheckedChange={handleCheckedChange}
                            handleValueChange={handleValueChange}
                            title="SMU B"
                            mode={props.smuBMode}
                            setMode={(mode) => props.handleChange("smuBMode", mode)}
                            parameters={props.smuBParameters}
                            setParameters={(parameters) => props.handleChange("smuBParameters", parameters)}
                            fixedModeOnly={environment.isSweepMode(props.smuAMode)}
                        />
                    </Grid>
                    <Grid item className={classes.axisValueGridCell} xs={12} md={6} >
                        <Autocomplete
                            freeSolo
                            options={['iA', 'vA', 'iB', 'vB']}
                            getOptionLabel={(option) => option}
                            className={classes.axisValueAutoComplete}
                            classes={
                                { input: classes.axisValueField, listbox: classes.axisValueAutoCompleteList }
                            }
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="X Axis"
                                    onChange={e => setXExpression(e.target.value)}
                                />
                            }
                        />
                    </Grid>
                    <Grid item className={classes.axisValueGridCell} xs={12} md={6} >
                        <Autocomplete
                            freeSolo
                            options={['iA', 'vA', 'iB', 'vB']}
                            getOptionLabel={(option) => option}
                            className={classes.axisValueAutoComplete}
                            classes={
                                { input: classes.axisValueField, listbox: classes.axisValueAutoCompleteList }
                            }
                            renderInput={(params) =>
                                <TextField
                                    {...params}
                                    label="Y Axis"
                                    onChange={e => setYExpression(e.target.value)}
                                />
                            }
                        />
                    </Grid>
                    {
                        props.result &&
                        <Grid item className={classes.plotGridCell} xs={12} lg={8} >
                            <DataPlot
                                xData={evaluateAxis(xExpression, props.result)}
                                yData={evaluateAxis(yExpression, props.result)}
                                xLabel={xExpression}
                                yLabel={yExpression}
                            />
                        </Grid>
                    }
                </Grid>
            </CardContent>
            <CardActions disableSpacing classes={{ root: classes.actions }}>
                <FormControlLabel
                    control={
                        <Switch
                            name="pauseHere"
                            checked={props.pauseHere}
                            onChange={handleCheckedChange}
                            color="primary"
                        />
                    }
                    label="Pause Before Start"
                />
                <IconButton onClick={props.remove} >
                    <DeleteIcon color="error" fontSize="small" />
                </IconButton>
            </CardActions>
        </Card>
    )
}
