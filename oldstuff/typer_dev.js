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

var test = {   // this is a mock object with the same structure that will be created when populateObj() is called.

  start: {    // this is the name of the page to be loaded. Each page corresponds to a location in the game.
    first: {  // each page will have 3 objects inside. Each object will correspond to a block of text.  This is needed because each
              // block of text is loaded from a different file and has it's own type speed.
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


var newline = new RegExp("\n", "g");  // a regex that finds all "newlines" on the txt ( to later replace with <br/> )

var Typer=  {

  text: null, // where the txt will be saved
  index: 0, // current cursor position
  speed: null, // speed of the Typer
  file: "", //file, must be setted


  start: function(obj) {  // initial function that will take the user input and load the corresponding txt files

    console.log("start");

      Typer.text = null;

      $.get("content.txt", function(data){    // callback thing to load the txt into Typer.text
        return data;
      }).then(function(data) {
        Typer.text=data;
        Typer.text = Typer.text.slice(0, Typer.text.length-1);
        Typer.speed = 5;

        Typer.startTimer();    // starts the "timer" function ( read more on the function itself )
      });

      Typer.addInput();   // when all 3 text blocks are loaded, create the "user command line" - It's a label and an input box
    },

  parseFile: function(file) {  // DEPRECATED  - you know why.


    console.log("parseFile");


    $.get(file, function(data){
      return data;
    }).then(function(data) {
      Typer.text=data;
      Typer.startTimer();
    });
  },


  getCurrContent:function(){  // a "helper" function that returns the current content of the given id - Just in case I need it later.
    return $("#console").html();
  },


  addInput:function(){      // Create the "user command line" thing. Creates a "text input object", a label, and automatically gives focus to
                            // the input so the user doesn't have to click the text box.
    var input = document.createElement("INPUT");
    input.setAttribute("type", "text");
    $("console").append("<p class=\"user\">beta code cadet ~$</p>" + input);
    input.focus();
  },



  displayError: function(cmd) {   // a function to be called when the user input doesn't match any of the locations. This could be the "default"
                                  // case of a switch
    Typer.text= null;
    Typer.text= "Unknown command: \"" + cmd +"\". Please type help for a list of commands";
    Typer.speed= 3;
    Typer.addText();
  },

  clearScreen: function() {  // a utility command to clear the screen and only leave the "user command line" there.
    $("console").html("");
    Typer.addInput();
  },



  addText: function() {   // The main function to add text to the screen.
    console.log("addText");
    Typer.text = Typer.text.replace(newline, "<br/>"); // replace newlines with <br/> with the RegEx created earlier

    var text = Typer.text.substring(0,Typer.index)  // Substring the text from the start to the current index
    $("#console").html(text); // replace the html contents of the given id, with the new content.
    Typer.index += Typer.speed; // increment the index

    /*  TODO - This was supposed to use the $().append command.
        However, the text wasn't being added properly.  The reason for the .append is that .html(" ") replaces all the given container's
        id conent with whatever is being passed here. .append() would allow to add different elements ( different blocks of text, error messages,
        user input, etc) without actually having to reload and rewrite everything that was there previously.
    */
  },



  startTimer: function() {    // the "timer" function that would allow us to call "addText" at specific intervals, to get the "typer" effect
    console.log("startTimer");
    var timer = setInterval(t, 30);
    function t() {
      Typer.addText();
      if (Typer.index > Typer.text.length) {
        clearInterval(timer);
      }
    }
  },


}


Typer.start("start");  // the main function that would receive the user input
