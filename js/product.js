// ad
// ---------輪播圖-------------
function slideshow() {
  var slideshow=document.getElementById("slideshow"),
  imgs=slideshow.getElementsByTagName("img"), // 得到圖片
  pages=slideshow.getElementsByTagName("span"), // 得到頁碼
  descrips=slideshow.getElementsByTagName("p"), // 得到描述
  current=0; //current當前圖片編號

  function slideOff() {
    imgs[current].className=""; // 圖片淡出
    pages[current].className="";
    descrips[current].className="";
  }
  function slideOn() {
    imgs[current].className="active"; // 圖片淡入
    pages[current].className="active";
    descrips[current].className="active";
  }

  function changeSlide() { //切换圖片
    slideOff();
    current++; //自增1
    if(current>=3) current=0;
    slideOn();
  }

  // 每3s用changeSlide進行輪播
  var slideon=setInterval(changeSlide,3000);

  slideshow.onmouseover=function () {
    clearInterval(slideon); // 滑鼠移入時清除輪播事件
  }
  slideshow.onmouseout=function () {
    slideon=setInterval(changeSlide,3000); // 滑鼠移出時重新開始輪播
  }

  for(var i=0; i<pages.length; i++) { // 定義滑鼠移入和移出頁碼事件
    pages[i].onmouseover=function(){
      slideOff(); // 圖片淡出
      current=this.innerHTML-1; // 得到鼠標停留頁碼時對應的current
      slideOn(); // 圖片淡出
    }
  }

}

slideshow();



// side-bar
$(document).ready(function() {
  $('.side-bar .menu-item').click(function() {
      $('.side-bar .menu-item').removeClass('active');
      $(this).addClass('active');
  });
});

// 預設active事件
function setActiveItem(clickedItem) {
    var menuItems = document.querySelectorAll('.side-bar .menu-item'); // 取得所有菜單項目
    
    // 移除所有菜單項目的 active 樣式
    for (var i = 0; i < menuItems.length; i++) {
      menuItems[i].classList.remove('active');
    }
    
    // 將點擊的菜單項目添加 active 樣式
    clickedItem.classList.add('active');
  }
  
  // 頁面載入時預設套用 active 樣式
  window.addEventListener('DOMContentLoaded', function() {
    var defaultItem = document.querySelector('.side-bar .menu-item.active');
    setActiveItem(defaultItem);
  });
  




// 頁碼
var productsPerPage = 8; // 每頁產品顯示數量
var products = document.querySelectorAll('.pd-box'); // 獲取所有產品
var totalPages = Math.ceil(products.length / productsPerPage); // 根據產品數量生成頁數

var currentPage = 1; // 預設頁碼

// 根據頁碼產生商品
function showProducts() {
  var startIndex = (currentPage - 1) * productsPerPage;
  var endIndex = startIndex + productsPerPage;

  for (var i = 0; i < products.length; i++) {
    if (i >= startIndex && i < endIndex) {
      products[i].style.display = 'block';
    } else {
      products[i].style.display = 'none';
    }
  }
}

// 分頁
function generatePagination() {
  var paginationElement = document.getElementById('pagination');
  paginationElement.innerHTML = '';

  // 上一頁按鈕
  if (currentPage > 1) {
    var prevButton = document.createElement('li');
    var prevLink = document.createElement('a');
    prevLink.href = '#';
    prevLink.textContent = '上一頁';
    prevLink.addEventListener('click', prevPage);
    prevButton.appendChild(prevLink);
    paginationElement.appendChild(prevButton);
  }

  // 限制顯示頁碼範圍，最多5
  var startPage = Math.max(1, currentPage - 2);
  var endPage = Math.min(startPage + 4, totalPages);

  for (var i = startPage; i <= endPage; i++) {
    var pageLink = document.createElement('li');
    var pageButton = document.createElement('a');
    pageButton.href = '#';
    pageButton.textContent = i;
    pageButton.addEventListener('click', changePage);
    pageLink.appendChild(pageButton);
    paginationElement.appendChild(pageLink);
  }

  // 下一頁
  if (currentPage < totalPages) {
    var nextButton = document.createElement('li');
    var nextLink = document.createElement('a');
    nextLink.href = '#';
    nextLink.textContent = '下一頁';
    nextLink.addEventListener('click', nextPage);
    nextButton.appendChild(nextLink);
    paginationElement.appendChild(nextButton);
  }
}

// 上一頁
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    showProducts();
    generatePagination();
  }
}

// 下一頁
function nextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    showProducts();
    generatePagination();
  }
}

// 更改當前頁碼
function changePage(e) {
  var newPage = parseInt(e.target.textContent);
  if (newPage !== currentPage) {
    currentPage = newPage;
    showProducts();
    generatePagination();
  }
}

// 獲取視窗寬度
function getWindowWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

// 根據視窗寬度設定每頁顯示數量
function setProductsPerPage() {
  var windowWidth = getWindowWidth();
  
  if (windowWidth <= 991 && windowWidth > 767) {
    productsPerPage = 9;
  } else if (windowWidth <= 767) {
    productsPerPage = 6;
  } else {
    productsPerPage = 8;
  }
}


// 當視窗大小變化時重新設定每頁顯示數量並重新生成商品和分頁
window.addEventListener('resize', function() {
  setProductsPerPage();
  showProducts();
  generatePagination();
});

// 初始化設定每頁顯示數量、顯示第一頁的產品和生成分頁碼
setProductsPerPage();
showProducts();
generatePagination();
