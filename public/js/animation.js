//home page selecter add color
$(() => {
    $(".home-prediction > .prediction-btn").click(function () {
        $(".home-prediction > .prediction-btn").removeClass("btn-warning");
        $(this).addClass("btn-warning");
    });
})