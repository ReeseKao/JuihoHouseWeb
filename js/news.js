// 獲取所有具有 view-btn 類別的按鈕元素
const viewBtns = document.querySelectorAll('.news-box .view-btn');

// 迭代每個按鈕元素
viewBtns.forEach(btn => {
  // 為按鈕元素添加點擊事件監聽器
  btn.addEventListener('click', function(event) {
    event.preventDefault(); // 防止按鈕的默認行為

    // 獲取父級容器元素
    const container = this.closest('.news-box');

    // 獲取圖片 URL、標題和內文
    const imageURL = container.querySelector('img').src;
    const title = container.querySelector('h2').textContent;
    const text = container.querySelector('p').innerHTML;

    // 創建燈箱容器元素
    const lightboxContainer = document.createElement('div');
    lightboxContainer.classList.add('lightbox-container');

    // 創建燈箱內容元素
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox-content');

    // 創建圖片元素
    const image = document.createElement('img');
    image.src = imageURL;

    // 創建標題元素
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;

    // 創建內文元素
    const textElement = document.createElement('p');
    textElement.innerHTML = text;

    // 將圖片、標題和內文元素添加到燈箱內容元素中
    lightboxContent.appendChild(image);
    lightboxContent.appendChild(titleElement);
    lightboxContent.appendChild(textElement);

    // 將燈箱內容元素添加到燈箱容器元素中
    lightboxContainer.appendChild(lightboxContent);

    // 將燈箱容器元素添加到 body 元素中
    document.body.appendChild(lightboxContainer);

    // 監聽燈箱容器元素的點擊事件，點擊任意位置即可關閉燈箱
    lightboxContainer.addEventListener('click', function() {
      this.remove(); // 從 DOM 中刪除燈箱容器元素
    });
  });
});
