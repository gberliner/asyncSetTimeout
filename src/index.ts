let maxIterations = 7;
import {asyncSetTimeout} from './asyncSetTimeout'
const pfunc = (iterations: number) => {
    return new Promise<number>((resolve,reject)=> {
        //let currentDate = Date.now();
        //console.log("timestamp: " + currentDate);

        console.log("number of iterations: " + iterations);
        console.log("run at: " + Date.now())

        if (iterations > maxIterations) {
            resolve(iterations);
        } else {
            reject(iterations);
        }
    })
}
async function main() {
    console.log("starting...")
    let arglist = [1,2,3,4,5]
    try {
        await asyncSetTimeout(pfunc,3000,5,...arglist);
    }
    catch (e) {
        console.log("caught asynctimeout exception: ", e)
    }

    maxIterations = 8
    arglist = Array.from(Array(9).keys())
    try {
        await asyncSetTimeout(pfunc,5000,7,...arglist);
    }
    catch (e) {
        console.log("caught asynctimeout exception: ", e)
    }
 

    console.log("done")
}
main();