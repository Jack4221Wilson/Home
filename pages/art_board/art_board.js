const art_board = document.querySelector("div .art-board");

const example_card = document.querySelector("div .art-card");
example_card.addEventListener("click", (e) => {
  growShrinkCard(example_card);
});


const fps = 1000/12;
let card_open = false;
function growShrinkCard(art_card) {

  let card_height = 9.5;
  let direction = -1;
  let speed_ot = [1,1,2,2,2,1,1];

  if (!card_open) {
      direction = 1;
      sendingSize(art_card, card_height, direction, speed_ot);
      card_open = true;
      return
    };
    card_height = 14;
    sendingSize(art_card, card_height, direction, speed_ot);
    card_open = false;
    direction = -1;
  };

  function sendingSize(art_card, card_height, direction, growth) {
    growth.forEach((i) => {
      card_height = card_height + ((growth[i] * direction) / 2);
      resizeArtCard(art_card, card_height, growth[i]);
  });
};

function resizeArtCard(art_card, value, delayCount) {
  setTimeout(() => {
      art_card.style = `height: ${value}rem;`
  }, fps * delayCount)
};

function createArtCard() {
  let art_card = document.createElement('div');
  let backdrop = art_card.appendChild('div');
  let thumbnail = art_card.appendChild('img');
  let header = art_card.appendChild('h1');
  let description = art_card.appendChild('p');

  art_card.className = 'art-card';
  backdrop.className = 'backdrop';
  thumbnail.classname = 'art-thumbnail';
};

async function getArtList() {
  const response = await fetch('art_objects.json');

  const art_list = await response.json();

  return art_list;
};

console.log(getArtList);
