const fruitsAndAnimals = [
  'apple', 'banana', 'cherry', 'dog', 'elephant', 'frog', 'grape',
  'hippo', 'iguana', 'jaguar', 'kiwi', 'lemon', 'mango', 'naranja',
  'orange', 'papaya', 'quail', 'rabbit', 'snake', 'tangerine',
  'uguisu', 'vulture', 'walrus', 'xoloitzcuintli', 'yak', 'zebra'
];

let originalTitles = [];
let isTitleHidden = false;

export function toggleChatHistoryTitle(isChecked) {
  const titleBaseXPath = '//*[@id="__next"]/div[2]/div[1]/div/div/nav/div[2]/div/div/a';
  const titleNodesSnapshot = document.evaluate(titleBaseXPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  if (isChecked) {
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
    }
  } else {
    if (isTitleHidden) {
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
  }
}
