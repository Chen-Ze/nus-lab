import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography, makeStyles, IconButton, CardActions, FormControlLabel, Switch } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Channel from './channel/Channel';
import DataPlot from './DataPlot';


const useStyles = makeStyles((theme) => ({
    plotGridCell: {
        display: "flex",
        justifyContent: "center",
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

    return (
        <Card>
            <CardContent>
                <Grid container spacing={3} justifyContent="center" >
                    <Grid item xs={12} md={6} >
                        <Channel title="SMU A" />
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Channel title="SMU B" />
                    </Grid>
                    <Grid item className={classes.plotGridCell} xs={12} lg={8} >
                        <DataPlot />
                    </Grid>
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