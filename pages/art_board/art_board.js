

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
      console.log(card_height);
      card_height = card_height + ((growth[i] * direction) / 2);
      resizeArtCard(art_card, card_height, growth[i]);
  });
};

function resizeArtCard(art_card, value, delayCount) {
  setTimeout(() => {
      art_card.style = `height: ${value}rem;`
  }, fps * delayCount)
}

