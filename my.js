$(window).on("load", function() {
    window.onscroll = function() {
        scrollnav();
    }
    imagechange("imagebg");
    imagechange("iphone");
    carouseltab();
    var red=[222,81,69];
    var blue=[44,191,230];
    cyclebig("red", 408, 102,red);
    cyclebig("blue-1", -22, 76,blue);
    cyclebig("blue-2", 231, -11,blue);
    cyclebig("blue-3", 421, 86,blue);
})

function scrollnav() {
    var $nav = $(".mynav");
    var $brand = $(".brand-content");
    var $navright = $(".navright-a");
    var $scrollTop = $(window).scrollTop();
    if ($scrollTop > 1) {
        $nav.stop(true);
        $brand.css("color", "black");
        $navright.css("color", "black");
        $nav.css({ "background-color": "white","border-bottom":"1px solid #DCDCDC" }).animate({
            height: 70,
            paddingTop: 10,
            paddingLeft: 40,
            paddingRight: 40,

        }, 400)
    } else {
        $nav.stop(true);
        $brand.css("color", "white");
        $navright.css("color", "white");
        $nav.css({ "background-color": "transparent","border-bottom":"none" }).animate({
            height: 120,
            paddingTop: 60,
            paddingLeft: 80,
            paddingRight: 80
        }, 400)
    }
}

function imagechange(cl) {
	cl="."+cl;
    var $img = $(cl).find("img");
    var counts = 0;
    $img.eq(0).css("opacity", "1");
    var timer = window.setInterval(change, 8000);

    function change() {
        $img.eq(counts).animate({ opacity: 0 }, 1000);
        counts++;
        if (counts == 4) { counts = 0; }
        $img.eq(counts).animate({ opacity: 1 }, 1000);
    }
}

function carouseltab() {
    var li = $(".carousel-head").find("li");
    var liwidth = parseFloat(li.eq(0).css("width"));
    var page = $(".showpage");
    var list = $(".lists-a");
    for (i = 0; i < li.length; i++) {
        li.eq(i).css("left", i * liwidth);
    }
    var carouseltimer = window.setInterval(move, 5000);

    function move() {
        li.each(function(index, val) {
            var old = parseFloat($(this).css("left"));
            var newleft = old - liwidth;
            $(this).animate({ left: newleft }, 1000, function() {
                if (parseInt(newleft) == -parseInt(liwidth)) {
                    $(this).css("left", 5 * liwidth)
                }
                if (parseInt(newleft) == parseInt(2 * liwidth)) {
                    $(this).addClass("active");
                } else {
                    $(this).removeClass("active");
                }
                //console.log(parseInt(2*liwidth));

            });
            if (parseInt(newleft) == parseInt(2 * liwidth)) {
                page.children().animate({ opacity: 0.3 }, 500, function() {
                    page.html(list.eq(index));
                    page.children().animate({ opacity: 1 }, 500);
                })

            }

            //console.log(5*liwidth);
        })
    }

}

function cyclebig(cl, x, y,color) {
    cl = "." + cl;
    var canvas = $(cl).eq(0);
    console.log(color[0]);
    canvas.css({
        "left": x,
        "top": y,
    })
    var ctx = canvas.get(0).getContext("2d");
    var i = 1;
    function pant() {
        ctx.clearRect(0, 0, 400, 400);
        var speed = 5 - 0.03125 * i;
        for (j = 0; j < 5; j++) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba("+color[0]+","+color[1]+","+color[2]+"," + (0.7 - 0.02 * i) + ")";
            ctx.arc(200, 200, 15 + 5 * j + speed * i, 0, Math.PI * 2, true);
            ctx.lineWidth = 1 + 0.05 * i;
            ctx.closePath();
            ctx.stroke();
        }
        i++;
        if ((15 + 2.5 * j + speed * i) > 200) {
            i = 1;
        }

    }
    var timer = setInterval(pant, 50);

}
