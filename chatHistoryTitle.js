const fruitsAndAnimals = [
  'apple', 'banana', 'cherry', 'dog', 'elephant', 'frog', 'grape',
  'hippo', 'iguana', 'jaguar', 'kiwi', 'lemon', 'mango', 'naranja',
  'orange', 'papaya', 'quail', 'rabbit', 'snake', 'tangerine',
  'uguisu', 'vulture', 'walrus', 'xoloitzcuintli', 'yak', 'zebra'
];

let originalTitles = [];
let isTitleHidden = false;

export function toggleChatHistoryTitle() {
  const titleBaseXPath = '//*[@id="__next"]/div[2]/div[1]/div/div/nav/div[2]/div/div/a';
  const titleNodesSnapshot = document.evaluate(titleBaseXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  if (!isTitleHidden) {
    originalTitles = [];
    for (let i = 0; i < titleNodesSnapshot.snapshotLength; i++) {
      const titleNode = titleNodesSnapshot.snapshotItem(i);
      const childDivNodes = titleNode.querySelectorAll('div');

      if (childDivNodes.length > 1) {
        const node = childDivNodes[0];
        originalTitles.push(node.textContent);
        const randomFruitOrAnimal = fruitsAndAnimals[Math.floor(Math.random() * fruitsAndAnimals.length)];
        node.textContent = randomFruitOrAnimal;
      } else {
        const node = childDivNodes[0];
        originalTitles.push(node.textContent);
        const randomFruitOrAnimal = fruitsAndAnimals[Math.floor(Math.random() * fruitsAndAnimals.length)];
        node.textContent = randomFruitOrAnimal;
      }
    }
    isTitleHidden = true;
  } else {
    let titleIndex = 0;
    for (let i = 0; i < titleNodesSnapshot.snapshotLength; i++) {
      const titleNode = titleNodesSnapshot.snapshotItem(i);
      const childDivNodes = titleNode.querySelectorAll('div');

      if (childDivNodes.length > 1) {
        const node = childDivNodes[0];
        node.textContent = originalTitles[titleIndex];
      } else {
        const node = childDivNodes[0];
        node.textContent = originalTitles[titleIndex];
      }
      titleIndex++;
    }
    isTitleHidden = false;
  }
  return isTitleHidden;
}

export function createToggleTitleButton() {
  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'toggle_button';

  const input = document.createElement('input');
  input.id = 'toggleTitle';
  input.className = 'toggle_input';
  input.type = 'checkbox';
  input.addEventListener('change', () => {
    const currentState = toggleChatHistoryTitle();
    input.checked = currentState;
  });

  const label = document.createElement('label');
  label.setAttribute('for', 'toggleTitle');
  label.className = 'toggle_label';

  buttonWrapper.appendChild(input);
  buttonWrapper.appendChild(label);

  document.body.appendChild(buttonWrapper);

  injectStyles('styles.css');
}

function injectStyles(file) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL(file);
  document.head.appendChild(link);
}
