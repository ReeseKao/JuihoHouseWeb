class Scrolling {
    
    scrollList(arr, obj) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == obj) {
                return i;
            }
        }
    }
    //object, string
    // 獲取指定物件的CSS屬性值，接受一個物件和一個屬性名稱作為參數，並使用window.getComputedStyle方法獲取該物件的計算後的CSS屬性值，並將其轉換為整數後返回。
    styleCss(obj, attr) {
        return parseInt(
            window.getComputedStyle(obj, null).getPropertyValue(attr)
        )
    }
    // 使物件以圓形軌跡旋轉，接受一個物件和一個速度值作為參數。該方法使用requestAnimationFrame方法在每一幀中更新旋轉的角度，並根據速度值控制旋轉的速度。
    circleTrack(obj, speed) {
        let val = 0;
        moveTrack()
        function moveTrack() {
            if (obj.classList.contains('esin')) {
                let combineSpeed = speed * Math.abs(scrSpeed) <= speed ? speed : speed * Math.abs(scrSpeed);
                if (winW <= 768) {
                    val += speed;
                } else {
                    val += combineSpeed;
                }
                obj.style.transform = 'rotate(' + val + 'deg)';
            }
            requestAnimationFrame(moveTrack);
        }
    }

    // 物件隨著滑鼠在指定區域內移動而移動的效果
    // 一個簡單的滑鼠跟隨效果，讓物件在指定區域內隨著滑鼠移動
    // 函數接受兩個參數，obj 是要移動的物件，section 是滑鼠移動的區域
    follow(obj, section) {
        // let mouseIn = false;
        // 該函數根據滑鼠位置的變化來移動物件
        let secRect = section.getBoundingClientRect();
        let objcenterX = secRect.width / 2;
        let objcenterY = secRect.height / 2;

       
        obj.style.transform = 'translate3d(' + objcenterX + 'px,' + objcenterY + 'px,0)';


    }
    // 定義了一個名為 followCursorPara 的函數，該函數用於實現物件根據滑鼠在指定區域內的移動而產生視差效果   
    followCursorPara(obj, sec) {
        let mouseIn = false;
        let X = 0,
            valX = 0,
            speed = 0.1;

        paraMove()
        function paraMove() {
            let dis = X - valX;
            valX += dis * speed;
            obj.style.transform = 'translate3d(' + valX + 'px,0,0)';
            requestAnimationFrame(paraMove);
        }
  
    }

}
class ESvideoPopup {
    constructor(open) {
        // this.isOpen    = false
        this.newPop = document.createElement('div')
        this.popInner = document.createElement('div')
        this.popCloser = document.createElement('div')

    }
    openPop(videoId, callback) {
        this.isOpen = true;
        // this.newPop.className = 'espopup'
        this.popCloser.className = 'closer'
        this.popInner.className = 'inner'

        this.popInner.appendChild(this.popCloser)
        this.newPop.appendChild(this.popInner)
        document.body.appendChild(this.newPop)

        this.popCloser.addEventListener('click', () => {
            this.closePop()
        })

        let iframe = document.createElement('iframe');

         callback;
    }
     closePop(){
        this.newPop.classList.add('leave');
       setTimeout(()=>{
            this.newPop.remove()
            this.isOpen = false;
        }, 500)
    }
};



// 主要用於初始化網頁上的滾動效果，並根據不同的設備斷點調整相應的滾動行為
var textScroll, scrV, scrSpeed, scrDirection, curEle, Header, scrollContainer, pageBox;
var winH = window.innerHeight;
var winW = window.innerWidth;
const ES = new Scrolling;


function init() {
    Header = document.getElementById('header');
    scrollContainer = document.querySelector('[data-scroll-container]');
    pageBox = document.getElementById('pageBox');

    textScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        repeat: true,
        getDirection: true,
        getSpeed: true,
        class: 'esin',
        reloadOnContextChange: true,
        tablet: {
            breakpoint: 1024,
            smooth: true
        },
        smartphone: {
            breakpoint: 768,
            smooth: false
        }
    });

    // HeadFunc()
    initScroll()
    resize()

    barba.init({

        views: [
            {
                namespace: 'home',
                afterEnter() {

                    setTimeout(() => {
                        homeFunc()
                    }, 500)
                }
            }
        ]
    });


}
function resize() {
    window.addEventListener('resize', () => {
        winH = window.innerHeight;
        winW = window.innerWidth;
    })
}

function initScroll() {
    textScroll.on('scroll', (val) => {
        scrV = val.scroll.y;
        scrSpeed = val.speed;
        scrDirection = val.direction;
        if (scrV > 50) {
            Header.classList.add('scroll')
        } else {
            Header.classList.remove('scroll')
        }
    })
    imagesLoaded(scrollContainer, { background: true }, function () {
        textScroll.update();
    });
}

function drinkFunc() {
    let cupSlider = document.querySelector('.cup_slider');
    let cupMnImg = cupSlider.querySelector('.main_drink figure');
    let cupArr = cupSlider.querySelectorAll('.cup_smimg .cups');
    let cupWrap = cupSlider.querySelector('.cup_smimg > div');
    let cupBgArr = cupSlider.querySelectorAll('.bgimg figure');
    let cupPreIdx = 0;
    let isChange = false;

    let cupInterval = setInterval(() => {
        changeCup(1)
    }, 3000)

    sform = 'translate3d(-' + (cupWidth - 1) + 'px,0,0)';


}

function homeFunc() {
    let cirSec;
    let runStep = 0;
    let isSlowing = true;
    let oldScrVal = 0;
    let homeInterval = setInterval(() => {
        oldScrVal = textScroll.scroll.instance.scroll.y;
    }, 500);

    let playvideos = document.querySelectorAll('.es_video');

    document.querySelector('.skip_btn').addEventListener('click', () => {
        textScroll.scrollTo(
            document.querySelector('.content')
        )
    })


    textScroll.on('scroll', (val) => {

        let firstDrink = document.querySelector('#banner');
        let firstDrinkBg = document.querySelector('.banner-left');
        firstDrinkBg.style.transform = 'scale(' + (1 + scrV / 2000) + ')';
        firstDrink.style.transform = 'translate3d(0,' + scrV + 'px,0)';

     
        cirSec = val.currentElements['pd-info_box'];
        if (cirSec != undefined) {

            let curIdx, bgcolor;

          
            let secHei = ES.styleCss(cirSec.el, 'height') - cirSec.top;
            let imgarray = document.querySelectorAll('.pd_slider_box');

            imgarray.forEach((el) => {
                let angle = (72 * ES.scrollList(imgarray, el));
                let curAngle = (scrV - cirSec.top) * 288 / secHei;

                if (scrV > cirSec.top) {
                    let startAngle = curAngle - angle;

                    if (scrV > secHei + cirSec.top) {
                        imgarray[imgarray.length - 1].style.transform = 'rotate(0deg)';
                        return;
                    } else {
                        el.style.transform = 'rotate(' + startAngle + 'deg)';
                    }
                    if (startAngle >= -50 && startAngle <= 30) {
                        el.classList.add('in')
                        curIdx = ES.scrollList(imgarray, el);
                        bgcolor = el.children[0].dataset.bgcolor;
                    } else {
                        el.classList.remove('in')
                    }
                } else {
                    el.style.transform = 'rotate(-' + angle + 'deg)';
                }
            });
            cirSec.el.style.backgroundColor = bgcolor;
            titleZhAnimation(curIdx)
            listAnimation(curIdx)

            let compareScroll = Math.abs(scrV - oldScrVal);
            if (compareScroll >= 0 && compareScroll < 100) {
                runStep += 1;

                let limit = 40;
                if (winW < 500) {
                    limit = 20;
                }

                // console.log(runStep, compareScroll)
                if (runStep >= limit) {
                    if (isSlowing != false) {
                        isSlowing = false;
                        if (curIdx != undefined) {
                            scrollToSec(curIdx)
                        }
                        setTimeout(() => {
                            isSlowing = true;
                            runStep = 0;
                        }, 500);
                    }
                }
            }

        };

        if (winW > 500) {
            if (val.currentElements['ovalText'] != undefined) {
                let svgwrap = val.currentElements['ovalText'];
                let textPath = svgwrap.el.querySelector('textPath');
                textPath.setAttribute('startOffset', (- (scrV - svgwrap.top) * 0.02) + '%')
            };
        } else {
            document.querySelector('.ovaltext').setAttribute('startOffset', '0%')
        }

    });

    // 文字滾動
    function titleZhAnimation(idx) {
        let wrap = document.getElementById('text_scroll');
        let moveVal = ES.styleCss(
            wrap.children[0].children[0],
            'height'
        ) * idx;
        wrap.children[0].style.transform = 'translate3d(0,-' + moveVal + 'px,0)';
    };
    // 選單滾動
    let pd_list = document.getElementById('pd_list');
    let ribbonText = document.querySelector('.circle_ribbon');
    let oldIdx = 0;
    let listIsAni = false;
    function listAnimation(idx) {
        if (idx == undefined) return;
        let arr = pd_list.children[0].children;
        let moveVal = ES.styleCss(arr[0], 'height');
        let desList = document.getElementById('pd_detial');
        pd_list.querySelector('i').style.top = (moveVal * idx) + 'px';

        for (let i = 0; i < arr.length; i++) {
            if (i == idx) {
                arr[i].classList.add('active');
                setTimeout(() => {
                    desList.children[i].classList.add('active');
                }, 300)
            } else {
                arr[i].classList.remove('active');
                setTimeout(() => {
                    desList.children[i].classList.remove('active');
                }, 300)
            }
        }
        // 滾動後淡出淡入
        if (listIsAni != true) {
            if (oldIdx != idx) {
                listIsAni = true;
                oldIdx = idx;
                desList.classList.add('leave');
                ribbonText.classList.add('leave')
                ribbonText.querySelectorAll('.ciriboon').forEach((el) => {
                    el.style.display = 'none';
                })
                setTimeout(() => {
                    ribbonText.querySelectorAll('.ciriboon')[idx].style.display = 'block'
                    desList.classList.remove('leave');
                    ribbonText.classList.remove('leave')
                    listIsAni = false;
                }, 600)
            }
        }
    };
    // 點選切換
    pd_list.querySelectorAll('li').forEach((el) => {
        el.addEventListener('click', function () {
            let idx = ES.scrollList(pd_list.children[0].children, this)
            scrollToSec(idx)
        })
    });
    let isScrollToSec = false;
    function scrollToSec(idx) {

        if (isScrollToSec != true) {
            isScrollToSec = true;
            let arrLength = 4;
            let secH = ES.styleCss(cirSec.el, 'height');
            if (idx == arrLength) {
                textScroll.scrollTo(secH, {
                    duration: 200,
                    callback: isScrollToSec = false
                })
            } else if (idx == 0) {
                textScroll.scrollTo(cirSec.top, {
                    duration: 200,
                    callback: isScrollToSec = false
                })
            } else {
                let eachSecH = (secH - cirSec.top) / arrLength;
                textScroll.scrollTo(cirSec.top + eachSecH * idx, {
                    duration: 200,
                    callback: isScrollToSec = false
                })
            }
        };
    }

    // barba.hooks.leave(()=>{
    //     clearInterval(homeInterval);
    //     textScroll.scroll.listeners.scroll.splice(1, 1)
    // })

}




