type promisefunc<T> = (arg: any)=>Promise<T>;
type anyfunc = (arg: any) =>any
let timeOut = (ms: number, resolve: anyfunc) => {   
    return new Promise((resolve)=>{
        setTimeout(resolve, ms)
    })
}

export async function asyncSetTimeout<T>(p: promisefunc<T>, ms: number, n: number,...arglist:any){
    let done = false
    let result: T;
    let iter = 0;
    let [currentArg,...rest] = arglist;
    while(!done && iter < n) {
        console.log("sleeping for milliseconds: " + ms)
        try {
            await timeOut(ms,()=>{
                //console.log("after timeout: timestamp=" + Date.now());
            });
            p(currentArg).then((result: T)=>{
                done = true;
                result = result;
            }).catch((count)=>{
                console.log("count in reject: ",count)
                iter++;
                [currentArg,...rest] = rest;
            })
            if (done) {
                return result!;
            }
        } catch (e) {
            throw(e)
        }
    }
    throw("promise rejected, count exceeded: " + n);
}

const pfunc = (iterations: number) => {
    return new Promise<number>((resolve,reject)=> {
        //let currentDate = Date.now();
        //console.log("timestamp: " + currentDate);

        console.log("number of iterations: " + iterations);
        console.log("run at: " + Date.now())

        if (iterations > 3) {
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
    console.log("done")
}
main();