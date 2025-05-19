// Run content script to extract data
chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const title = document.querySelector('.a-size-large.product-title-word-break')?.innerText.trim();
      const price = document.querySelector('span.a-price-whole')?.innerText.trim();
      const description = Array.from(document.querySelectorAll('.a-unordered-list.a-vertical.a-spacing-mini li span'))
        .map(el => el.innerText.trim()).join('\n');
      const images = Array.from(document.querySelectorAll('#imgTagWrapperId img'))
        .map(img => img.src);
      return { title, price, description, images };
    }
  }).then(([result]) => {
    const { title, price, description, images } = result.result;
    document.getElementById('title').value = title || '';
    document.getElementById('price').value = price || '';
    document.getElementById('description').value = description || '';
    const imgDiv = document.getElementById('images');
    images.forEach(src => {
      const img = document.createElement('img');
      img.src = src;
      imgDiv.appendChild(img);
    });
  });
});

// Alert on submit
document.getElementById('submit').addEventListener('click', () => {
  alert('Product data submitted!');
});
