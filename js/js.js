// load
document.addEventListener("DOMContentLoaded", function() {
  imagesLoaded(document.body, function () {
      document.body.classList.remove('loading')
      document.body.classList.add('loaded')
      init()
      setTimeout(()=>{
          document.body.classList.remove('loaded')
      },1500)
  });
});

window.addEventListener('scroll', function() {
  var sidebar = document.querySelector('.sm-side-bar');
  var windowHeight = window.innerHeight;
  var sidebarOffsetTop = sidebar.offsetTop;

  if (window.pageYOffset > (sidebarOffsetTop - windowHeight)) {
    sidebar.classList.add('show');
  } else {
    sidebar.classList.remove('show');
  }
});






// search
document.addEventListener("touchstart", function(){}, true);



//---漢堡按鈕---

$(document).ready(function() {
  // 點擊 .hamburger 時的行為
  $('.hamburger').click(function(event) {
    event.stopPropagation(); // 防止點擊事件冒泡到 document 上
    $(this).toggleClass('is-active');
    $('.navigation').toggleClass('show');
  });

  // 點擊 document 任意位置時的行為
  $(document).click(function(event) {
    var target = $(event.target);
    if (!target.closest('.hamburger').length && !target.closest('.navigation').length) {
      $('.hamburger').removeClass('is-active');
      $('.navigation').removeClass('show');
    }
  });
});


// 輪播自动切换图片
const carousel = document.querySelector('.carousel');
const carouselInner = document.querySelector('.carousel-inner');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const totalItems = document.querySelectorAll('.carousel-item').length;
let currentIndex = 0;

function showSlide(index) {
  const translateXValue = -index * (100 / totalItems);
  carouselInner.style.transform = `translateX(${translateXValue}%)`;
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? totalItems - 1 : currentIndex - 1;
  showSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
  showSlide(currentIndex);
});

showSlide(currentIndex);
let intervalId;

function autoplayCarousel() {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex === totalItems - 1) ? 0 : currentIndex + 1;
    showSlide(currentIndex);
  }, 2000);
}

autoplayCarousel();
carousel.addEventListener('mouseenter', () => {
  clearInterval(intervalId);
});

carousel.addEventListener('mouseleave', () => {
  autoplayCarousel();
});





// 簡介
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
        op = Math.min(1, (top - off + 1100) / 800);
        $(this).find('.date').css({opacity: op});
      }
    });

    isScrolling = false;
  }

  $win.on('scroll', handleScroll);
  handleScroll(); // 初始化時執行一次
});

// 環境
/*--------------------
Vars
--------------------*/
let progress = 50
let startX = 0
let active = 0
let isDown = false

/*--------------------
Contants
--------------------*/
const speedWheel = 0.02
const speedDrag = -0.1

/*--------------------
Get Z
--------------------*/
const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))

/*--------------------
Items
--------------------*/
const $items = document.querySelectorAll('.album-item')
const $cursors = document.querySelectorAll('.cursor')

const displayItems = (item, index, active) => {
  const zIndex = getZindex([...$items], active)[index]
  item.style.setProperty('--zIndex', zIndex)
  item.style.setProperty('--active', (index-active)/$items.length)
}

/*--------------------
Animate
--------------------*/
const animate = () => {
  progress = Math.max(0, Math.min(progress, 100))
  active = Math.floor(progress/100*($items.length-1))
  
  $items.forEach((item, index) => displayItems(item, index, active))
}
animate()

/*--------------------
Click on Items
--------------------*/
$items.forEach((item, i) => {
  item.addEventListener('click', () => {
    progress = (i/$items.length) * 100 + 4
    animate()
  })
})

/*--------------------
Handlers
--------------------*/
const handleWheel = e => {
  const wheelProgress = e.deltaY * speedWheel
  progress = progress + wheelProgress
  animate()
}

const handleMouseMove = (e) => {
  if (e.type === 'mousemove') {
    $cursors.forEach(($cursor) => {
      $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
    })
  }
  if (!isDown) return
  const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
  const mouseProgress = (x - startX) * speedDrag
  progress = progress + mouseProgress
  startX = x
  animate()
}

const handleMouseDown = e => {
  isDown = true
  startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
}

const handleMouseUp = () => {
  isDown = false
}

/*--------------------
Listeners
--------------------*/
document.addEventListener('mousewheel', handleWheel)
document.addEventListener('mousedown', handleMouseDown)
document.addEventListener('mousemove', handleMouseMove)
document.addEventListener('mouseup', handleMouseUp)
document.addEventListener('touchstart', handleMouseDown)
document.addEventListener('touchmove', handleMouseMove)
document.addEventListener('touchend', handleMouseUp)




