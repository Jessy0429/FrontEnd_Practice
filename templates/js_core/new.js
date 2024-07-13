function Person(name,age){
 this.name=name
 this.age=age
}
Person.prototype.sayHi=function(){
 console.log('Hi！我是'+this.name)
}
let p1=new Person('张三',18)
p1.sayHi()

function create(){
    let obj = {}
    let arg = [...arguments]
    let fn = arg.shift()
    obj.__proto__ = fn.prototype
    let res = fn.apply(obj, arg)
    return typeof res==='object'?res:obj
}
let p2 = create(Person,'张三',24)
p2.sayHi()