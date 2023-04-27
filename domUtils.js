export function customizePage() {
  // Change the text using a CSS selector
  const changeTextSelector = 'button[id^="headlessui-menu-button"] > div:nth-child(2)';
  const changeTextNode = document.querySelector(changeTextSelector);
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
    targetElement.style.width = 'calc(100% - 1rem)';  // 1rem のスクロールバー分を引いている
  }
}

export function observeDOMChanges() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const observer = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        customizePage();
      }
    }
  });

  observer.observe(targetNode, config);
}
