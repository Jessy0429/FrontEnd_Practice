Function.prototype.myCall = function(context){
    let obj = context||window
    obj.fn = this
    let arg = [...arguments].slice(1)
    let res = obj.fn(...arg)
    delete obj.fn
    return res
}
Function.prototype.myApply = function (context){
    let obj = context||window
    obj.fn = this
    let arg = arguments[1] || []
    let res = obj.fn(...arg)
    delete obj.fn
    return res
}

let fruit = {name: 'apple'}
function print(age){
    console.log(this.name)
    console.log(age)
}

// print.myCall(fruit)
print.myApply(fruit, [18])

Function.prototype.myBind = function (context, ...outerArgs) {
    let that = this;
    function res (...innerArgs) {
        if (this instanceof res) {
            // new操作符执行时
            // 这里的this在new操作符第三步操作时，会指向new自身创建的那个简单空对象{}
            that.call(this, ...outerArgs, ...innerArgs)
        } else {
            // 普通bind
            that.call(context, ...outerArgs, ...innerArgs)
        }
    }
    res.prototype = this.prototype //！！！
    return res
}