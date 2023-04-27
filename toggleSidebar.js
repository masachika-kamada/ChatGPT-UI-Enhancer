export function toggleSidebarVisibility() {
  const tabXPath = '//*[@id="__next"]/div[2]/div[1]';
  const tabNode = document.evaluate(tabXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (tabNode) {
    tabNode.style.display = (tabNode.style.display === 'none') ? '' : 'none';
  }
}

export function createSidebarToggleButton() {
  const button = document.createElement('button');
  button.classList.add('toggle-tab-button');
  button.style.left = '260px';

  const arrow = document.createElement('div');
  arrow.classList.add('toggle-tab-arrow');

  button.appendChild(arrow);

  button.addEventListener('click', () => {
    toggleSidebarVisibility();
    if (button.style.left === '260px') {
      button.style.left = '0px';
      arrow.style.transform = 'translate(-50%, -50%) scaleX(1)';
    } else {
      button.style.left = '260px';
      arrow.style.transform = 'translate(-50%, -50%) scaleX(-1)';
    }
  });

  document.body.appendChild(button);
}
