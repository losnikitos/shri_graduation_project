$(function () {
    var bg = $(".parallax");
    $(window).scroll(function (e) {
        parallaxScroll(bg);
    });
});

function parallaxScroll(el) {
    var yPos = -($(window).scrollTop() / 2) - 200;
    var coords = 'center ' + yPos + 'px';
    el.css({ backgroundPosition: coords });
}