// capture the "Next" on portfolio page
$(".next-btn").click(function(){
    var divtag = pics1;
    var styletag = "background-image:url(digital-switch/1.jpg)";
    for (i = 1 ; i <= 23 ; i++) {
        console.log(i)
        $("#pics"+i).attr("href", "digital-switch/"+i+".jpg")
        $("#pics"+i).attr("data-setbg", "digital-switch/"+i+".jpg")
        $("#pics"+i).attr("style", "background-image:url(digital-switch/"+i+".jpg)")
    }
});