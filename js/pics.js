// capture the "Next" on portfolio page
$(".next-btn").click(function(){
    for (i = 1; i <= 23; i++) {
        console.log(i)
        $("#pics"+i).attr("href", "digital-switch/"+i+".jpg")
        $("#pics"+i).attr("data-setbg", "digital-switch/"+i+".jpg")
        $("#pics"+i).attr("style", "background-image:url(digital-switch/"+i+".jpg)")
    }
    $("portfolio-section").refresh();
});