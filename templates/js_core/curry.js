function myFunc(...inner){
    let sum = 0
    let arg = [...inner]
    for (let i of arg){
        sum += i;
    }
    console.log(sum)
    return (...outer) => {
        let args = [...inner, ...outer]
        myFunc(...args)
    }
}
let sum = new myFunc(1,2)
sum(3)
sum(8)

function curry(fun){
    return function curried(...args){
        if (args.length >= fun.length)  return fun.apply(this, args)
        else return function (...args2){
            curried.apply(this, args.concat(args2))
        }
    }
}

