var rootdef = "localhost:8090";
var host = "http://localhost:8090"

// shows a fail message
function showfail(msg) {
    var errorhtml = '<div class ="alert alert-danger">';
    errorhtml += '<strong>Failed!</strong> ' + msg + '</a>';
    errorhtml += '</div>';
    $('#printcard').append(errorhtml);
}

// makeRestCall
// make a REST call to fetch the data
function makeRestCall(callback, uri) {
    $.ajax({
        type: 'GET',
        url: host + uri,
        dataType: 'json',
        success: function (data) {
            callback(data)
        },
        error: function(jqXHR, exception) {
            var msg = jqXHR.responseText;
            if (jqXHR.status === 0) {
                showfail('Not connect.\n Verify Network. ' + msg);
            } else if (jqXHR.status == 404) {
                showfail('Requested page not found. [404] ' + msg);
            } else if (jqXHR.status == 500) {
                showfail('Internal Server Error [500]. ' + msg);
            } else if (exception === 'parsererror') {
                showfail('Requested JSON parse failed. ' + msg);
            } else if (exception === 'timeout') {
                showfail('Time out error. ' + msg);
            } else if (exception === 'abort') {
                showfail('Ajax request aborted. ' + msg);
            } else {
                showfail('Uncaught Error.\n' + jqXHR.responseText);
            }
        }

    });

}

// processes results taken from the REST Call
function processResults(response) {
    for (let i = 0; i < 23; i++) {
        console.log(response[i])
    }
}


// capture the "Next" on portfolio page
$(".next-btn").click(function(){
    makeRestCall("/pictures/get?type=digital&page=1",processResults)
    for (i = 1; i <= 23; i++) {
        // console.log(i)
        $("#pics"+i).attr("href", "digital-switch/"+i+".jpg")
        $("#pics"+i).attr("data-setbg", "digital-switch/"+i+".jpg")
        $("#pics"+i).attr("style", "background-image:url(digital-switch/"+i+".jpg); height: 298.667px;")
    }
});