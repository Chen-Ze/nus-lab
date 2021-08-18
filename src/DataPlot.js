import React from "react";
// import Plot from "react-plotly.js";
import Plotly from "plotly.js-basic-dist";

import createPlotlyComponent from "react-plotly.js/factory";
import { ResizableBox } from 'react-resizable';
import { useTheme, makeStyles } from "@material-ui/core";
const Plot = createPlotlyComponent(Plotly);


const useStyles = makeStyles((theme) => ({
    plot: {
        [theme.breakpoints.only("xs")]: {
            height: 250,
        },
        [theme.breakpoints.only("sm")]: {
            height: 350,
        },
        [theme.breakpoints.up("md")]: {
            height: 400,
        },
    },
}));

export default function DataPlot() {
    const theme = useTheme();

    const classes = useStyles(theme);

    return (
        <Plot
            className={classes.plot}
            data={[
                {
                    x: [1, 2, 3],
                    y: [2, 6, 3],
                    type: 'scatter',
                    mode: 'lines+markers',
                    marker: { color: 'blue' },
                },
            ]}
            layout={{
                dragmode: "pan",
                margin: {
                    t: 10,
                    b: 70,
                    l: 70,
                    r: 70,
                },
                xaxis: {
                    title: {
                        text: 'x Axis',
                        font: {
                            color: theme.palette.getContrastText(theme.palette.background.paper)
                        }
                    },
                    tickfont: {
                        color: theme.palette.getContrastText(theme.palette.background.paper)
                    },
                },
                yaxis: {
                    title: {
                        text: 'y Axis',
                        font: {
                            color: theme.palette.getContrastText(theme.palette.background.paper)
                        },
                    },
                    tickfont: {
                        color: theme.palette.getContrastText(theme.palette.background.paper)
                    },
                },
                plot_bgcolor: theme.palette.primary.contrastText,
                paper_bgcolor: theme.palette.background.paper
            }}
            config={{
                responsive: true,
                scrollZoom: true,
            }}
            style={{
                width: "100%",
            }}
        />
    );
}
