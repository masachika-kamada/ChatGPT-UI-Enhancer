function toggleSidebarVisibility() {
  const tabXPath = '//*[@id="__next"]/div[2]/div[1]';
  const tabNode = document.evaluate(tabXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  if (tabNode) {
    tabNode.style.display = (tabNode.style.display === 'none') ? '' : 'none';

    // カスタムイベントを発火
    const event = new CustomEvent('sidebarToggled', {
      detail: {
        isVisible: tabNode.style.display !== 'none',
      }
    });
    document.dispatchEvent(event);
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

export function checkSidebarAndButtonVisibility() {
  const button1 = document.querySelector('.toggle-tab-button');
  const button2 = document.querySelector('.toggle-chat-history-button');
  const breakPoint = 768;

  if (button1 && button2) {
    const displayValue = (window.innerWidth <= breakPoint) ? 'none' : '';

    // When the window width is larger than the breakpoint, ensure the sidebar is visible
    if (window.innerWidth > breakPoint) {
      const tabXPath = '//*[@id="__next"]/div[2]/div[1]';
      const tabNode = document.evaluate(tabXPath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      if (tabNode) {
        tabNode.style.display = '';
        button1.style.left = '260px';
        const arrow = button1.querySelector('.toggle-tab-arrow');
        if (arrow) {
          arrow.style.transform = 'translate(-50%, -50%) scaleX(-1)';
        }
        const isVisible = true;

        // Fire a custom event
        const event = new CustomEvent('sidebarToggled', {
          detail: { isVisible }
        });
        document.dispatchEvent(event);
      }
    }

    button1.style.display = displayValue;
    button2.style.display = displayValue;
  }
}
