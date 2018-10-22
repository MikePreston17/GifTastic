const apiKey = 'IRJyC5Ga1PNRTnPxurEfnE5C9HkEADbC';
const topics = ["candy", "chocolate", "root beer", "cats in boxes", "desert eagle"]

window.onload = init;

function init() {
    renderTopicButtons();
    initEvents();
}

function initEvents() {

    //Add a topic:
    $("#add-topic").on('click', function (event) {
        event.preventDefault();

        var topic = $("#topic").val().trim();
        // console.log('new topic: ', topic);
        topics.push(topic);
        renderTopicButtons();
    })

    //Any button:
    $('button').on('click', function () {
        let text = $(this).attr('data-name');
        if (text)
            renderGIF({
                text: text
            });
    })
}

function renderGIF(search) {
    let searchTerm = search.text;

    let queryUrl = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=10&rating=PG`;

    var div = $('#images');

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then((response) => {

        var urls = response.data.map(i => ({
            original: i.images.original.url,
            still: i.images.original_still.url
        }));

        urls.forEach(url => {

            var image = $('<img>')
                .addClass('gif')
                .attr("src", url.still)
                .attr("alt", `${searchTerm} image`)
                .attr('data-state', 'still')
                .attr('data-still', url.still)
                .attr('data-animate', url.original);

            //Animation toggle:
            image.on('click', function () {
                var state = $(this).attr('data-state');

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

            div.prepend(image);
        });
    })

}

function renderTopicButtons() {

    let view = $("#topics-view").empty();

    topics.forEach(topic => {
        $("<button>")
            .addClass("topic btn-secondary")
            .attr("data-name", topic)
            .text(topic).appendTo(view);
    })
}

String.prototype.alert = function () {
    alert(this.toString());
}

String.prototype.print = function () {
    console.log(this.toString());
    return this;
}