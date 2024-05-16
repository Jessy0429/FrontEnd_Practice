function f1() {
  let n = 20;
  if (true) {
      let n = 10;
      console.log(n);
  }
  console.log(n); // 20
}

function f2() {
  let n = 20;
  if (true) {
      n = 10;
      console.log(n);
  }
  console.log(n); // 10
}

function f3() {
  var n = 20;
  if (true) {
      var n = 10;
      console.log(n);
  }
  console.log(n); // 10
}

// f1();
f3();