// timeline控制
$(document).ready(function () {
  var mySwiper = new Swiper(".swiper-container", {
    autoHeight: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    speed: 500,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    },
    loop: false,
    effect: "slide",
    spaceBetween: 30,
    on: {
      init: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(0).addClass("active");
      },
      slideChangeTransitionStart: function () {
        $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
        $(".swiper-pagination-custom .swiper-pagination-switch").eq(mySwiper.realIndex).addClass("active");
      }
    }
  });
  $(".swiper-pagination-custom .swiper-pagination-switch").click(function () {
    mySwiper.slideTo($(this).index());
    $(".swiper-pagination-custom .swiper-pagination-switch").removeClass("active");
    $(this).addClass("active");
  });
});

// 門市資訊
$(document).ready(function (){
  var $win = $(window);
  var $rows = $('.row');
  var $line = $('.vline');
  var op = 0;

  var isScrolling = false;

  function handleScroll() {
    if (!isScrolling) {
      isScrolling = true;
      requestAnimationFrame(updateScroll);
    }
  }

  function updateScroll() {
    var top = $win.scrollTop();
    $line.height(top + 400);

    $rows.each(function () {
      if (top > $(this).offset().top - $win.height()) {
        var offset = Math.min(0, top - $(this).offset().top + $win.height() - 400);
        $(this).find('.left').css({transform: 'translate( ' + offset + 'px, 0px)'});
        $(this).find('.right').css({transform: 'translate( ' + Math.abs(offset) + 'px, 0px)'});

        var off = $(this).offset().top;
        var height = 350;
        off = off + height;
        op = Math.min(1, (top - off + 1000) / 800);
        $(this).find('.date').css({opacity: op});
      }
    });

    isScrolling = false;
  }

  $win.on('scroll', handleScroll);
  handleScroll(); // 初始化時執行一次
});