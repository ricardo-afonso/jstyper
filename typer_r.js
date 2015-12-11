// wrap code in IIFE to avoid poluting global namespace
(function() {

    var speed = 5;
    var index = 0;
    var text = '';

    // Array with screens to load
    var pages = [{
        speed: 1,
        url: "files/content.txt"
    }, {
        speed: 20,
        url: "files/test1.txt"
    }, {
        speed: 1,
        url: "files/test2.txt"
    }, {
        speed: 20,
        url: "files/test3.txt",
    }, {
        speed: 1,
        url: "files/test4.txt"
    }];

    var views = {
        pages : pages
    };

    var a = 'pages';

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
