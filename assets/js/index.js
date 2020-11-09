let histories = null;

$.get("/history", function (data) {
    histories = data;

    data.forEach((history) => {
        $("#historyList").append(`
            <div class="card mb-3 ml-1 mr-1 bg-none" style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="` + history.image + `"
                            class="m-3 card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title history">` + history.name + `</h5>
                            <p class="card-text"><small class="text-muted">` + history.date + `</small></p>
                        </div>
                    </div>
                </div>
            </div>    
        `);
    })

    console.log(histories)

    $(".history").click(function (e) {
        let historyLabel = e.target.innerText.trimLeft();
        let history = Array.from(histories).find((e) => e.name === historyLabel);

        console.log("histories", histories);
        console.log("history", history);

        showHistory(history.layers);
        showInfo(history);
    });
});

function showInfo(history) {
    $("#sidebarMenu").empty()
    $("#sidebarMenu").append(`
        <div id="history-content" class="scrollable m-3">
            <p>You can use the mark tag to <mark>highlight</mark> text.</p>
            <p>You can use the mark tag to <mark>highlight</mark> text.</p>
            <p>You can use the mark tag to <mark>highlight</mark> text.</p>
            <p>You can use the mark tag to <mark>highlight</mark> text.</p>
            <p><s>This line of text is meant to be treated as no longer accurate.</s></p>
            <p><small>This line of text is meant to be treated as fine print.</small></p>
            <p><em>This line rendered as italicized text.</em></p>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/97/Together_Art.IWMPST3158.jpg" class="rounded mx-auto img-fluid d-block" alt="...">
            <p><strong>This line rendered as bold text.</strong></p>
            <blockquote class="blockquote text-center">
                <p class="mb-0">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
                <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
            </blockquote>
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/23/Yanks_advance_into_a_Belgian_town.jpg" class="rounded img-fluid mx-auto d-block" alt="...">
        </div>
    `);
}

// $(".history-list-obj").click(function(e){
//     let historyLabel = e.target.innerText.trimLeft();
//     showHistory(historyLabel);
// });