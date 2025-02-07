const art_board = document.querySelector("div");

/* const example_card = document.querySelector("div .art-card");
example_card.addEventListener("click", (e) => {
  growShrinkCard(example_card);
}); */


const fps = 1000/12;
let card_open = false;
function growShrinkCard(art_card) {

  let card_height = 11;
  let direction = -1;
  let speed_ot = [1,1,2,2,3,2,2,1,1];

  if (!card_open) {
      direction = 1;
      sendingSize(art_card, card_height, direction, speed_ot);
      card_open = true;
      return
    };
    card_height = 17;
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
    let thumbnail_div = document.createElement('div');
    art_card.appendChild(thumbnail_div);
    let thumbnail = document.createElement('img');
    thumbnail_div.appendChild(thumbnail);
    let header = document.createElement('h1');
    art_card.appendChild(header);
    let description = document.createElement('p');
    art_card.appendChild(description);

    art_card.className = 'art-card';
    art_card_border.className = 'art-card-border';
    thumbnail_div.className = 'thumbnail-div';
    thumbnail.className = 'art-thumbnail';

    thumbnail.setAttribute('src', `${data.image}`);
    header.innerHTML = data.header;
    description.innerHTML = data.description;

    art_card.addEventListener("click", (e) => {
        //growShrinkCard(art_card);
        document.location = `http://jackawilson.art/pages/art/art.html?piece-id=` + data.pieceNum
    });

    let ele_width = 4;
    let ele_height = 3;

    if (data.portrait === true) {
        ele_width = 3;
        ele_height = 4;
    };
    checkStart(ele_width);
    checkEnd(ele_width);
    art_card_border.setAttribute('style', `
            grid-column: ${grid_start[0]} / ${grid_start[0] + ele_width};
            grid-row: ${grid_start[1]} / ${grid_start[1] + ele_height};
    `);

    const oldGrid = grid;
    var newGrid = oldGrid;

    for (let i = grid_start[0]; i <= grid_start[0] + ele_width; i++) {
        for (let j = grid_start[1]; j <= grid_start[1] + ele_height; j++) {
            newGrid[i-1][j-1] = true;
        };
    };
    grid = newGrid;
    grid_start[0] = grid_start[0] + ele_width;

    console.log(art_card_border);
    return art_card_border;

};

async function getArtList() {
    const response = await fetch('http://jackawilson.art/pages/art_objects.json', {
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

var grid_start = [1, 1];
var grid_size = [13, 30];
var grid = [];

function initGrid() {
    for (let i = 0; i < grid_size[1]; i++) {
        let lineOfY = []
        for (let j = 0; j < grid_size[0]; j++) { lineOfY.push(false) }
        grid.push(lineOfY)
    };
    populateBoard();
    console.log(grid);
}

var art_data = getArtList();

function checkStart(card_width) {
    if (grid_start[0] + card_width > 12) { grid_start[1]++; grid_start[0] = 1 };

    if (grid[grid_start[0]][grid_start[1]]) { grid_start[0]++ }
    else { return };

    //grid[grid_start[0]][grid_start[1]] ? grid_start[1]++ : return;
    if (grid_start[0] <= grid_size[0] || grid_start[1] <= grid_size[1]) { checkStart(card_width) };
};

function checkEnd(card_width) {
    console.log(grid[grid_start[0] + card_width][grid_start[1]]);
    if (grid[grid_start[0] + card_width][grid_start[1]]) {
        grid_start[1]++;
        checkEnd(card_width);
    } else {
        return
    };
    if (card_width + grid_start[0] >= grid_size[0]) { checkEnd(card_width); };
};

initGrid();

