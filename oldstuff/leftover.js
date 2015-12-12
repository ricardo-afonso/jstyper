

init: function(obj){// inizialize Typer
  $.get(obj.file,function(data){  // get the text file
    Typer.text=data;  // save the textfile in Typer.text
    Typer.text = Typer.text.slice(0, Typer.text.length-1);
    Typer.speed= obj.speed ;
  });
},


addText:function(){ //Main function to add the code

    var cont = Typer.getCurrContent(); // get the console content

    Typer.index+=Typer.speed;	// add to the index the speed

    var text=Typer.text.substring(0,Typer.index);// parse the text for stripping html enities
    var rtn= new RegExp("\n", "g"); // newline regex

    $("#console").html(text.replace(rtn,"<br/>"));//
    window.scrollBy(0,50); // scroll to make sure bottom is always visible
    console.log("content len " + cont.length + " |||| text_prop len " + Typer.text.length + " |||| index thingy " + Typer.index + " |||| speed " + Typer.speed);

   if (Typer.index > Typer.text.length) {
      console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
      document.getElementById('inp2').focus();

    }

  },

// =============================// =============================// ============================= //
// =============================// =============================// ============================= //

  function asyncFunction(arg) {
    Promise p = new Promise();
    p.resolve(data);
    return p;
  }

  asyncFunction(arg).then(function(data) {

    // do something else
    return asyncFunction(arg);

  }).then(function(data) {

     return

  }).then
