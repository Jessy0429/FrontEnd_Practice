//method 1
var logLight = function(){
    setTimeout(()=>{
        console.log("now is 红灯");
        setTimeout(()=>{
            console.log("now is 绿灯");
            setTimeout(()=>{
                console.log("now is 黄灯")
                logLight();
            },3000)
        },2000)
    },1000)

}
// logLight()

//method 2
function logRed(){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log("now is 红灯")
            resolve()
        },1000)
    })
}
function logGreen() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("now is 绿灯")
            resolve()
        }, 2000)
    })
}
function logYellow(){
    return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            console.log("now is 黄灯")
            resolve()
            },3000)
})
}
function start(){
    logRed()
    .then(logGreen)
    .then(logYellow)
    .then(start)
}
start();