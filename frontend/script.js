var counter = document.getElementById("clickCounter"), count = 0;
var reset = document.getElementById("resetCounter");

counter.onclick = function() {
  counter.innerHTML = "Click Me: " + ++count;
};

reset.onclick = function() {
  count = 0;
  counter.innerHTML = "Click Me: " + count;
};
