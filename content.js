function customizePage() {
  // Change the text using the specified XPath
  const changeTextXPath = '//*[@id="headlessui-menu-button-:Rq5hd6:"]/div[2]';
  const changeTextNode = document.evaluate(changeTextXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (changeTextNode) {
    changeTextNode.textContent = 'USER';
  }

  // Remove content using the specified XPath
  const removeContentXPath = '//*[@id="__next"]/div[2]/div[2]/main/div[2]/div';
  const removeContentNode = document.evaluate(removeContentXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (removeContentNode) {
    removeContentNode.innerHTML = '';
  }

  // Change the width and center-align the target element
  const targetElement = document.querySelector('.absolute.bottom-0.left-0.w-full');
  if (targetElement) {
    targetElement.style.width = '98.5%';  // 1.5 rem のスクロールバー分を引いている
  }
}

function observeDOMChanges() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        customizePage();
      }
    }
  });

  observer.observe(targetNode, config);
}

// Ensure the content script is executed after the page is fully loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    customizePage();
    observeDOMChanges();
  });
} else {
  customizePage();
  observeDOMChanges();
}
