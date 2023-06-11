export function customizePage() {
  // Change the text of the button
  // Assuming that the button has an ID starting with "headlessui-menu-button" and the text is in the second div
  const changeTextSelector = 'button[id^="headlessui-menu-button"] > div:nth-child(2)';
  const changeTextNode = document.querySelector(changeTextSelector);
  if (changeTextNode) {
    changeTextNode.textContent = 'USER';
  }

  // Remove content using the specified XPath
  const removeContentXPaths = [
    '//*[@id="__next"]/div[2]/div[2]/div/main/div[3]/div/span',
    '//*[@id="__next"]/div[2]/div[2]/div/main/div[3]/div[2]/span',
    '//*[@id="__next"]/div[2]/div[1]/div/div/div/nav/div[2]/div/div/span[1]/div[1]/div',
    '//*[@id="__next"]/div[2]/div[1]/div/div/div/nav/div[2]/div/div/span[1]/div[2]/div'
  ];

  for (const xpath of removeContentXPaths) {
    const removeContentNode = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (removeContentNode) {
      removeContentNode.innerHTML = '';
    }
  }

  // Change the width and center-align the target element
  // Assuming that the target element has the classes "absolute", "bottom-0", and "left-0"
  const targetElement = document.querySelector('.absolute.bottom-0.left-0');
  if (targetElement) {
    targetElement.style.width = 'calc(100% - 1rem)';  // Adjust the width considering the scrollbar width
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
