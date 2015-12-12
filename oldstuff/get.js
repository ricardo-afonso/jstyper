var speeds = [4,25,4];

var pageNames = ["start", "home", "cenas"];
var pageChild = ["first", "mid", "second"];

var pages = {

}



for ( var i = 0; i < pageNames.length; i++) {
  var name = pageNames[i];
  pages[name] = {}
  for ( var j = 0; j < pageChild.length; j++) {

      pages[name][pageChild[j]] = {
        file: name + j + ".txt",
        speed:speeds[j]
    };
  };
}

console.log(pages);
