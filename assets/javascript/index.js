const apiKey = 'IRJyC5Ga1PNRTnPxurEfnE5C9HkEADbC';
const topics = ["candy", "chocolate", "root beer",
    "C#", "cats in boxes", "desert eagle"
]

window.onload = init;

//javascript, jQuery
var xhr = $.get(`http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=${apiKey}&limit=5`);
xhr.done(function (data) {
    console.log("success got data", data);
});



function getRandomGIF(searchTerm) {

    let queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10&rating=PG`;

    // var queryURL = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}}&tag=cats`;

    queryUrl.print();

    var div = $('#images');

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then((response) => {

        // console.log('RESPONSE: \n', response);
        var urls = response.data.map(i => i.url);
        var original_urls = response.data.map(i => i.image_original_url);

        console.log(' urls :', urls);
        console.log('originals ', original_urls);

        // let imageUrl = response.data.image_original_url;
        urls.forEach(imageUrl => {

            // let pausedUrl = imageUrl;
            var image = $('<img>');
            image.attr("src", imageUrl);
            image.attr("alt", `${searchTerm} image`);
            imageUrl.print();

            // console.log('image url: ', imageUrl);
            // image.attr('data-still', pausedUrl);
            // image.attr('data-animate', imageUrl);

            div.prepend(image);
        });

        // if (element)
        //     image.appendTo(element);
    })
}

function init() {
    renderTopicButtons();
    initEvents();
}

function initEvents() {

    //Any button:
    $('button').on('click', function () {
        let text = $(this).attr('data-name');
        text.print();
        getRandomGIF(text);
    })

    //Any gif:
    $(".gif").on('click', function () {

        let state = $(this).attr('data-state');

        if (state === 'still') {
            $(this).attr({
                'src': $(this).attr('data-animate'),
                'data-state': 'animate'
            });
        } else if (state === 'animate') {
            $(this).attr({
                'src': $(this).attr('data-still'),
                'data-state': 'still'
            });
        }
    })
}

function renderTopicButtons() {

    let view = $("#topics-view").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("topic");
        a.addClass("btn-secondary")
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        view.append(a);
    }
}

String.prototype.alert = function () {
    alert(this.toString());
}

String.prototype.print = function () {
    console.log(this.toString());
    return this;
}