// wrap code in IIFE to avoid poluting global namespace
(function() {

    var speed = 5;
    var index = 0;
    var text = '';

    // Array with screens to load

    // the first screen of the site, general info about the workshop
   var welcome = [{
        speed: 90,
        url: "pages/welcome_ascii.txt"
    }, {
        speed: 40,
        url: "pages/welcome.txt"
    }];

    // The description of the general game logic
    var initial = [{
        speed: 50,
        url: "pages/mr_robot_ascii.txt"
    },{
        speed: 20,
        url: "pages/mr_robot.txt"
    }];

    var initial2 = [{
        speed: 50,
        url: "pages/mr_reboot_ascii.txt"
    },{
        speed: 20,
        url: "pages/mr_reboot.txt"
    }];


    // Location Home
    var home = [{
        speed: 20,
        url: "pages/home_ascii.txt"
    }, {
        speed: 20,
        url: "pages/home.txt"
    }];

    // Location Allsafe
    var allsafe = [{
        speed: 20,
        url: "pages/allsafe_ascii.txt"
    }, {
        speed: 20,
        url: "pages/allsafe.txt"
    }];

    // Location psych
    var psychiatrist = [{
        speed: 20,
        url: "pages/psy_ascii.txt"
    }, {
        speed: 20,
        url: "pages/psy_ascii.txt"
    }];

    // Location Hardware store
    var hw_store = [{
        speed: 20,
        url: "pages/hw_ascii.txt"
    }, {
        speed: 20,
        url: "pages/hw_store.txt"
    }];

    // Location Tomaz_white
    var tomaz_white_den = [{
        speed: 20,
        url: "pages/tomaz_ascii.txt"
    }, {
        speed: 20,
        url: "pages/tomaz.txt"
    }];

    // Location Old_acarde
    var old_arcade = [{
        speed: 20,
        url: "pages/old_ascii.txt"
    }, {
        speed: 20,
        url: "pages/old_arcade.txt"
    }];


    var views = {
        // Command : array
        index: welcome,
        start: initial,
        start2: initial2,
        home: home,
        allsafe: allsafe,
        hw_store: hw_store,
        tomaz_den: tomaz_white_den,
        old_arcade: old_arcade
     };



     renderView(views.index).then(function() {
       //clearText();
       //renderView(views[a]);
       createInput();


     });


       function createInput() {
         $(document).ready(function() {


             var input = document.createElement("INPUT");
             input.setAttribute("type", "text");
             input.className = "commandline";
             input.setAttribute("id", "input");
             $("#line").append("<p class=\"user\">beta code cadet ~$</p>");
             $("#line").append(input);

             input.focus();

             $(input).keypress(function(event) {


                 if (event.keyCode === 13) {
                      console.log(event.keyCode)
                      var a = $('#input').val();

                      console.log(typeof a, + "Text: " + a)
                      if (views.hasOwnProperty(a)) {
                        clearText();
                        renderView(views[a]).then(function() {
                          createInput();
                        });
                      } else {
                        showError();
                      }

                    }


             });
         });
       }


    // view is an array with filenames/speeds
    function renderView(view) {

        var promises = [];

        // build the array of promises
        view.forEach(function(item) {
            promises.push(start);
        });

        // execute all the promises in sequence
        return promises.reduce(function(previous, current, index) {

            return previous.then(function() {

                if (index < promises.length - 1) {
                    return promises[index + 1](view[index + 1]);
                }

            });

        }, promises[0](view[0]));


    }


    function start(screen) {

        //index = 0;
        //text = null;
        speed = screen.speed;

        return $.get(screen.url).then(function(data) {
            text += data;
            return startTimer();
        });

    }

    function addText() {

        text = text.replace(/\n/g, "<br/>"); // replace newlines with <br/> with the RegEx created earlier

        $('#console').html(text.substring(0, index)); // replace the html contents of the given id, with the new content.
        index += speed; // increment the index

        window.scrollBy(0, 50);

    }

    function clearText() {

        text = '';
        index = 0;

        $('#console').html(text);
        $("#line").html(text);

    }

    function startTimer() {

        var deferred = new $.Deferred();
        var timer = setInterval(t, 30);
        return deferred.promise();

        function t() {

            addText();
            if (index > text.length) {
                clearInterval(timer);
                deferred.resolve();
            }

        }

    }

})();
