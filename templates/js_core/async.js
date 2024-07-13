async function timeout () {
    for (let index = 0; index < 3; index++) {
        console.log('async', +index)
    }
    return 1
}

let p = timeout().then((v)=>console.log(v))
console.log('outer')

async function a1(){
    console.log('a1 start')
    await a2()
    console.log('a1 end')
}
async function a2(){
    console.log('a2')
}
console.log('start')
a1()
setTimeout(()=>{console.log('time')}, 0)
new Promise((resolve)=>{
    console.log(1)
    resolve(2)
}).then((res)=>{
    console.log(res)
})
console.log('end')