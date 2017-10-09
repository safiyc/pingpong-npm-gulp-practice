// $(document).ready(function() {
//   $('#ping-pong-form').submit(function(event) {
//     event.preventDefault();
//     var goal = $('#goal').val();
//     var output = pingPong(goal);
//     output.forEach(function(element) {
//       $('#solution').append("<li>" + element + "</li>");
//     });
//   });
// });


// above code is barebone function without constructor to create instance of object; below code contains a constructor

// this line is needed to import 'calculatorModule' from 'pingpong.js' file to this receiving file
// this var 'Calculator' name doesn't have to be the same name as the constructor 'Calculator', but first letter needs to be capitalized to denote that it is a constructor
var Calculator = require('./../js/pingpong.js').calculatorModule;

$(document).ready(function() {
  $('#ping-pong-form').submit(function(event) {
    event.preventDefault();
    var goal = $('#goal').val();
    // this new 'Calculator' must be the same name as the above declared variable 'Calculator'
    var simpleCalculator = new Calculator("hot pink");
    var output = simpleCalculator.pingPong(goal);
    output.forEach(function(element) {
      $('#solution').append("<li>" + element + "</li>");
    });
  });
});

$(document).ready(function() {
  $('#signup').submit(function(event) {
    event.preventDefault();
    var email = $('#email').val();
    $('#signup').hide();
    $('#solution').prepend('<p>Thank you, ' + email + ' has been added to our list!</p>');
  });
});
