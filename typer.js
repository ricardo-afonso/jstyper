// wrap code in IIFE to avoid poluting global namespace
(function() {

    var speed = 5;
    var index = 0;
    var text = '';

    // Array with screens to load

    // the first screen of the site, general info about the workshop
    var index = [{
        speed: 5,
        url: "pages/welcome.txt"
    }, {
        speed: 20,
        url: "pages/mr_robot.txt"
    }];

    // The description of the general game logic
    var start = [{
        speed: 1,
        url: "files/content.txt"
    }, {
        speed: 20,
        url: "files/test1.txt"
    }];

    // Location Home
    var home = [{
        speed: 1,
        url: "files/content.txt"
    }, {
        speed: 20,
        url: "files/test1.txt"
    }];

    // Location Allsafe
    var allsafe = [{
        speed: 1,
        url: "files/content.txt"
    }, {
        speed: 20,
        url: "files/test1.txt"
    }];

    // Location psych
    var psychiatrist = [{
        speed: 1,
        url: "files/content.txt"
    }, {
        speed: 20,
        url: "files/test1.txt"
    }];

    // Location Hardware store
    var hw_store = [{
        speed: 1,
        url: "files/content.txt"
    }, {
        speed: 20,
        url: "files/test1.txt"
    }];

    // Location Tomaz_white
    var tomaz_white_den = [{
        speed: 1,
        url: "files/content.txt"
    }, {
        speed: 20,
        url: "files/test1.txt"
    }];

    // Location Old_acarde
    var old_acarde = [{
        speed: 1,
        url: "files/content.txt"
    }, {
        speed: 20,
        url: "files/test1.txt"
    }];


    var views = {
        // Command : array
        index : index,
        join_fsociety: start,
        home: home,
        allsafe: allsafe,
        hw_store: hw_store,
        tomaz_den: tomaz_white_den,
        old_arcade: old_arcade
    };

    var a = 'index';

    renderView(views[a]);
    clearText();

    // view is an array with filenames/speeds
    function renderView(view) {

        var promises = [];

        // build the array of promises
        view.forEach(function(item) {
            promises.push(start);
        });


        // execute all the promises in sequence
        promises.reduce(function(previous, current, index) {

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
