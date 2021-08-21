import { create, all } from 'mathjs'

import environment from './environment';
import keithley2636 from './commands';
import AwaitLock from 'await-lock';
 

const config = { };
const math = create(all, config);
let lock = new AwaitLock();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Experimenter {
    url;
    address;
    recipe;

    constructor(url, address, recipe) {
        this.url = new URL(url);
        this.address = address;
        this.recipe = recipe;
    }

    async execute(command) {
        await lock.acquireAsync();
        try {
            this.url.search = new URLSearchParams(command);
            let response = await fetch(this.url, {
                method: 'GET'
            });
            return response.json();
        } finally {
            lock.release();
        }
    }

    async start() {
        this.execute(keithley2636.connect(this.address));

        const recipe = this.recipe;
        let smuAArray;
        let smuBArray;
        if (environment.isSweepMode(recipe.smuAMode)) {
            smuAArray = math.range(recipe.smuAParameters.start, recipe.smuAParameters.end, recipe.smuAParameters.step, true).toArray();
        } else {
            smuAArray = [recipe.smuAParameters.value];
        }
        if (environment.isSweepMode(recipe.smuBMode)) {
            smuBArray = math.range(recipe.smuBParameters.start, recipe.smuBParameters.end, recipe.smuBParameters.step, true).toArray();
        } else {
            smuBArray = [recipe.smuBParameters.value];
        }
        [smuAArray, smuBArray] = [
            Array(smuBArray.length).fill(smuAArray).reduce((x, y) => x.concat(y)),
            Array(smuAArray.length).fill(smuBArray).reduce((x, y) => x.concat(y))
        ];
        let smuPairs = math.transpose([smuAArray, smuBArray]);
        
        let results = [];
        for (let smuPair of smuPairs) {
            const [smuAValue, smuBValue] = smuPair;

            if (environment.isCurrentMode(recipe.smuAMode)) {
                await this.execute(keithley2636.setCurrent(keithley2636.smuA, smuAValue));
            } else if (environment.isVoltageMode(recipe.smuAMode)) {
                await this.execute(keithley2636.setVoltage(keithley2636.smuA, smuAValue));
            }
            if (environment.isCurrentMode(recipe.smuBMode)) {
                await this.execute(keithley2636.setCurrent(keithley2636.smuB, smuBValue));
            } else if (environment.isVoltageMode(recipe.smuBMode)) {
                await this.execute(keithley2636.setVoltage(keithley2636.smuB, smuBValue));
            }

            if (recipe.smuAMode !== environment.SMU_MODE_OFF) await this.execute(keithley2636.outputOn(keithley2636.smuA));
            if (recipe.smuBMode !== environment.SMU_MODE_OFF) await this.execute(keithley2636.outputOn(keithley2636.smuB));

            await sleep(this.recipe.wait);

            results.push({
                vA: (await this.execute(keithley2636.readVoltage(keithley2636.smuA))).read,
                iA: (await this.execute(keithley2636.readCurrent(keithley2636.smuA))).read,
                vB: (await this.execute(keithley2636.readVoltage(keithley2636.smuB))).read,
                iB: (await this.execute(keithley2636.readCurrent(keithley2636.smuB))).read
            });
        }

        if (recipe.smuAMode !== environment.SMU_MODE_OFF) await this.execute(keithley2636.outputOff(keithley2636.smuA));
        if (recipe.smuBMode !== environment.SMU_MODE_OFF) await this.execute(keithley2636.outputOff(keithley2636.smuB));

        return results;
    }
}

async function test() {
    console.log("test");
    const experimenter = new Experimenter('http://localhost:8888/controller', 'GPIB0::26::INSTR', {
        smuAMode: environment.SMU_MODE_SWEEP_VOLTAGE,
        smuBMode: environment.SMU_MODE_FIXED_VOLTAGE,
        smuAParameters: { start: -0.01, end: 0.01, step: 0.01 },
        smuBParameters: { value: 0.01 },
        wait: 100
    });
    const result = await experimenter.start();
    console.log(result);
}

export default Experimenter;
