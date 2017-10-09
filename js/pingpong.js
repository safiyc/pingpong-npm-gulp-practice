// function pingPong(goal) {
//   var output = [];
//   for (i = 1; i <= goal; i++) {
//     if (i % 15 === 0) {
//       output.push("pingpong");
//     }else if (i % 3 === 0) {
//       output.push("ping");
//     }else if (i % 5 === 0) {
//       output.push("pong");
//     }else {
//       output.push(i);
//     }
//   }
//   return output;
// }

// above code is build without using a constructor; constructors allow us to create objects
// constructor 'Calculator' takes one attribute 'skinName'
function Calculator(skinName) {
  this.skin = skinName;
}

// 'pingPong' is a declared method for the 'Calculator' prototype
// 'goal' is a method parameter for method 'pingPong'; 'skinName' is a constructor parameter
Calculator.prototype.pingPong = function(goal) {
  var output = [];
  for (var i = 1; i <= goal; i++) {
    if (i % 15 === 0) {
      output.push("ping-pong");
    } else if (i % 3 === 0) {
      output.push("ping");
    } else if (i % 5 === 0) {
      output.push("pong");
    } else  {
      output.push(i);
    }
  }
  return output;
};

// 'exports', provided by node, let's export things from one file to another. The above 'constructor' and 'pingPong' method become part of a module exported to 'pingpong-interface.js'
// think of 'exports' as a global JS object. A new property is created on 'exports' that we can name whatever, but let's call it 'calculatorModule', which is set to equal the 'Calculator' constructor function
exports.calculatorModule = Calculator;
