var speeds = [25, 4 ,4];
var pageNames = ["start", "home", "cenas"];
var pageChild = ["first", "mid", "second"];
var pages = {};

var populateObj = function() {
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
}

var test = {

  start: {
    first: {
      file:"content.txt",
      speed:5,
    },
    second: {
      file: "test.txt",
      speed: 20,
    },
  },

  home: {
    first: {
      file: "text.txt",
      speed: 5,
    },

  },
}


var newline = new RegExp("\n", "g");

var Typer=  {

  text: null,
  index: 0, // current cursor position
  speed: null, // speed of the Typer
  file: "", //file, must be setted


  start: function(obj) {

    console.log("start");

    for (child in test[obj]) {

      Typer.text = null;

      $.get(test[obj][child].file, function(data){
        return data;
      }).then(function(data) {
        Typer.text=data;
        Typer.speed = test[obj][child].speed;

        console.log(Typer.text)
        Typer.startTimer();
      });


      //  Typer.startTimer();

      }
      //  console.log(test[obj][child].file);
      //  Typer.addInput();
    },

    /*  Typer.text = null;
      Typer.text = Typer.parseFile(obj.child.file);
      Typer.speed = child.speed;
      //Typer.startTimer();
    } */
  //





  parseFile: function(file) {
    console.log("parseFile");


    $.get(file, function(data){
      return data;
    }).then(function(data) {
      Typer.text=data;
    //  Typer.startTimer();
    });

  },




  getCurrContent:function(){
    return $("#console").html();// get console content
  },







  addInput:function(){

    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    $
    $("console").append("<p class=\"user\">beta code cadet ~$</p>" + input);
    input.focus();
    console.log("> > > > > > > > > > > > > > > > > > > > > > > > > > > >created");
  },

  displayError: function(cmd) {
    Typer.text= null;
    Typer.text= "Unknown command: \"" + cmd +"\". Please type help for a list of commands";
    Typer.speed= 3;
    Typer.addText();
  },

  clearScreen: function() {
    $("console").html();
    Typer.addInput();
  },



  addText: function() {
    console.log("addText");
    console.log(" |||| text_prop len " + Typer.text.length + " |||| index thingy " + Typer.index + " |||| speed " + Typer.speed );

    Typer.text = Typer.text.replace(newline, "<br/>");
    $("console").append(Typer.text.substring(Typer.index, (Typer.index + Typer.speed )));
    Typer.index += Typer.speed;
  },



  startTimer: function() {
    console.log("startTimer");
    setInterval(function t() {
        Typer.addText();
        if (Typer.index > Typer.text.length) {
          clearInterval(timer);
        }
      }, 30);

  },

}


Typer.start("start");
