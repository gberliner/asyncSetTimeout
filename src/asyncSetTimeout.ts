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
