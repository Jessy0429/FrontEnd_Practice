function fn(){
	var a = 3;
	return function(){
		return  ++a;
	}
}
var b = fn();
console.log(fn()()) //4
console.log(fn()()) //4
console.log(b()) //4
console.log(b()) //5

var i = 0;
function outerFn1(){
  function innnerFn(){
       i++;
       console.log(i);
  }
  return innnerFn;
}
var inner1 = outerFn1();
var inner2 = outerFn1();
inner1();
inner2();
inner1();
inner2();     //1 2 3 4


function outerFn2(){
var i = 0;
  function innnerFn(){
      i++;
      console.log(i);
  }
  return innnerFn;
}
var inner1 = outerFn2();
var inner2 = outerFn2();
inner1();
inner2();
inner1();
inner2();//1 1 2 2