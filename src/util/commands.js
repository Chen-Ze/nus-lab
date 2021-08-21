const smuA = "smua";
const smuB = "smub";

function connect(address) {
    return { 
        function:   "open",
        name:       "Keithley2636",
        address:    address
    };
}

function setCurrent(smu, current) {
    return { 
        function:   "write",
        name:       "Keithley2636",
        command:    `${smu}.source.leveli=${current}`
    };
}

function readCurrent(smu) {
    return {
        function:   "query",
        name:       "Keithley2636",
        command:    `print(${smu}.measure.i())`
    };
}

function setVoltage(smu, voltage) {
    return { 
        function:   "write",
        name:       "Keithley2636",
        command:    `${smu}.source.levelv=${voltage}`
    };
}

function readVoltage(smu) {
    return {
        function:   "query",
        name:       "Keithley2636",
        command:    `print(${smu}.measure.v())`
    };
}

function outputOn(smu) {
    return {
        function:   "write", 
        name:       "Keithley2636",
        command:    `${smu}.source.output = ${smu}.OUTPUT_ON`
    };
}

function outputOff(smu) {
    return {
        function:   "write", 
        name:       "Keithley2636",
        command:    `${smu}.source.output = ${smu}.OUTPUT_OFF`
    };
}


const keithley2636 = {
    smuA,
    smuB,
    connect,
    setCurrent,
    readCurrent,
    setVoltage,
    readVoltage,
    outputOn,
    outputOff
}

export default keithley2636;
