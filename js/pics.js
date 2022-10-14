var rootDir = "img/";
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
        var picData = JSON.parse(JSON.stringify(response[i]))
        var picGenre = picData.genre
        var picAlbum = picData.album
        var picFilename = picData.filename
        $("#pics"+ (i + 1)).attr("href", rootDir + picAlbum + "/JPG/" + picFilename)
        $("#pics"+ (i + 1)).attr("data-setbg", rootDir + picAlbum + "/JPG/" + picFilename)
        $("#pics"+ (i + 1)).attr("style", "background-image:url("+'"'+(rootDir + picAlbum + "/JPG/" + picFilename)+'"'+"); height: 298.667px;")
        $("#genre" + (i + 1)).attr("class", "mix col-xl-2 col-md-3 col-sm-4 col-6 p-0 " + picGenre)

        /*for (;counter < lastCounter; counter++) {
            picArray[counter] = picGenre
            picArray[counter] = picURI
        }
        if (lastCounter < 46) {
            lastCounter += 2
        }*/
    }
}


// capture the "Next" on portfolio page
$(".next-btn").click(function(){
    var page = document.querySelector("#button")
    var currPage = window.location.href
    console.log(currPage)
    if (currPage.includes("digital.html") == true) {
        makeRestCall(processResults, "/pictures/get?type=digital&page="+page.dataset.id)
        page.dataset.id++
    } else {
        makeRestCall(processResults, "/pictures/get?type=film&page="+page.dataset.id)
        page.dataset.id++
    }
    /*for (let i = 0; i < 23; i++) {
        console.log((result[i]))
    }
    for (i = 1; i <= 23; i++) {
        // console.log(i)
        $("#pics"+i).attr("href", "digital-switch/"+i+".jpg")
        $("#pics"+i).attr("data-setbg", "digital-switch/"+i+".jpg")
        $("#pics"+i).attr("style", "background-image:url(digital-switch/"+i+".jpg); height: 298.667px;")
    }*/
});
