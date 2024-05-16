// const id = setInterval(loop, 1000);

// for (var i = 0; i < 5; i++) {
//   setTimeout(function() {
//       console.log(i);
//   }, 1000);
// }

//用setTimeout实现setInterval
function mysetInterval(func, wait){
    let timer = null;
    function interval(){
        timer = setTimeout(()=>{
            func();
            interval();
            }, wait)
    }
    interval();
    return {
        cancel() {
            clearTimeout(timer)
        }
    }
}

const timerid = mysetInterval(()=>{console.log(1)}, 1000)
setTimeout(timerid.cancel, 5000)

//setInterval实现setTimeout
function mysetTimeout(func, wait){
    const timer = setInterval(()=>{
        func();
        clearInterval(timer)
    }, wait)
}
mysetTimeout(()=>{console.log(1)}, 1000)

//手动控制setTimeinterval时间次数
let flag = false;
let start = Date.now()
const loop = function(){
    console.log(flag)
    if(Date.now() - start > 3000){
        flag = true;
        clearInterval(id);
        console.log(flag)
        return;
    }
}

const id = setInterval(()=>{loop()},1000)
