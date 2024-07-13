var obj = {
  bar: function () {
    console.log(this)
  }
}
var fn1 = obj.bar
fn1() //window

var obj2 = {
  bar: function () {
    return function () {
      console.log(this)
    }
  }
}
obj2.bar()()