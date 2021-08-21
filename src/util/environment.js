export default {
    DEFAULT_KEITHLEY_2636_ADDRESS: "GPIB0::26::INSTR",
    SMU_MODE_OFF: "Off",
    SMU_MODE_FIXED_CURRENT: "FixedCurrent",
    SMU_MODE_SWEEP_CURRENT: "SweepCurrent",
    SMU_MODE_FIXED_VOLTAGE: "FixedVoltage",
    SMU_MODE_SWEEP_VOLTAGE: "SweepVoltage",
    isSweepMode:   (mode) => mode.indexOf('Sweep') >= 0,
    isCurrentMode: (mode) => mode.indexOf('Current') >= 0,
    isVoltageMode: (mode) => mode.indexOf('Voltage') >= 0
}