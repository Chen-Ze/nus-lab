import React, { useState } from 'react';
import { Card, CardContent, Container, Grid, IconButton, makeStyles, Paper } from '@material-ui/core';
import MeasurementTab from './MeasurementTab';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import { v4 as uuidv4 } from 'uuid';


const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: 60,
    },
    sequenceContainer: {
        margin: theme.spacing(2, 0),
    },
    sequenceGrid: {
        margin: "auto",
    },
    iconContainer: {
        position: "fixed",
        bottom: 20,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    iconPaper: {
        background: theme.palette.primary.contrastText
    },
}));

export default function Sequence() {
    const classes = useStyles();

    function initializeMeasurement() {
        return {
            id: uuidv4(),
            pauseHere: false,
        }
    }

    const [measurements, setMeasurements] = useState([initializeMeasurement()]);

    function addMeasurement() {
        setMeasurements([...measurements, initializeMeasurement()]);
    }

    function removeMeasurement(index) {
        setMeasurements(measurements.filter((x, i) => i != index));
    }

    function handleMeasurementChange(index, name, value) {
        setMeasurements(measurements.map((measurement, i) => (
            i === index ? { ...measurement, name: value } : measurement
        )));
    }

    return (
        <>
            <Container className={classes.wrapper}>
                <Grid container className={classes.sequenceContainer} spacing={3} justifyContent="center" alignItems="center" >
                    <Grid container className={classes.sequenceGrid} spacing={3} justifyContent="center" alignItems="center" >
                        {
                            measurements.map((measurement, i) => (
                                <Grid key={measurement.id} item xs={12} sm={10} md={9} lg={8} >
                                    <MeasurementTab
                                        {...measurements}
                                        remove={() => removeMeasurement(i)}
                                        handleChange={(name, value) => handleMeasurementChange(i, name, value)}
                                    />
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Container>
            <Container className={classes.iconContainer} >
                <Paper className={classes.iconPaper} >
                    <IconButton>
                        <UndoIcon color="primary" fontSize="large" />
                    </IconButton>
                    <IconButton>
                        <RedoIcon color="primary" fontSize="large" />
                    </IconButton>
                    <IconButton onClick={addMeasurement}>
                        <AddCircleOutlineIcon color="primary" fontSize="large" />
                    </IconButton>
                    <IconButton>
                        <PlayCircleOutlineIcon color="primary" fontSize="large" />
                    </IconButton>
                </Paper>
            </Container>
        </>
    );
}