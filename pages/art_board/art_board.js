const art_board = document.querySelector("div");

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

function createArtCard(data) {
    let art_card_border = document.createElement('div');
    let art_card = document.createElement('div');
    art_card_border.appendChild(art_card);
    let thumbnail = document.createElement('img');
    art_card.appendChild(thumbnail);
    let header = document.createElement('h1');
    art_card.appendChild(header);
    let description = document.createElement('p');
    art_card.appendChild(description);

    art_card.className = 'art-card';
    art_card_border.className = 'art-card-border';
    thumbnail.classname = 'art-thumbnail';

    thumbnail.setAttribute('src', `${data.image}`);
    header.innerHTML = data.header;
    description.innerHTML = data.description;

    art_card.addEventListener("click", (e) => {
        growShrinkCard(art_card);
    });

    return art_card_border;

};

async function getArtList() {
    const response = await fetch('http://jackawilson.art/pages/art_board/art_objects.json', {
        method: 'GET',
        mode: "cors",
    });
    
    const art_list = await response.json();

    return art_list;
};

async function populateBoard() {
    const art_data = await getArtList();

    let art_cards = [];

    art_data.forEach((art_info) => {
        let new_card = createArtCard(art_info);
        art_cards.push(new_card);
    });

    art_cards.forEach((i) => {

        art_board.appendChild(i);
    });
};

populateBoard();

