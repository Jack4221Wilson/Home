const url = new URL(document.location.href);
const art_id = parseInt(url.searchParams.get("piece-id"));

let img_ele = document.querySelector('img');
let header = document.querySelector('h1');
let info_ele = document.querySelector('.info');
let copy_ele = document.querySelector('.copy');

findPiece();

async function getArtList() {
    const response = await fetch('http://jackawilson.art/pages/art_objects.json', {
        method: 'GET',
        mode: "cors",
    });

    const art_list = await response.json();

    return art_list;
    /* let art_list = fetch('http://jackawilson.art/pages/art_objects.json', {
        method: 'GET',
        mode: "no-cors",
    })
    .then((response) => console.log(response));
    //.then((data) => {return data});

    return art_list;*/
};

function findPiece() {
    let art = {};
    getArtList()
        .then((art_list) => {
            console.log(art_list);
            art_list.forEach((art_obj) => {

                if (art_id != art_obj.pieceNum) { return };
                art = art_obj

                img_ele.setAttribute('src', `${art.image}`);
                header.innerHTML = art.header;
                info_ele.innerHTML = art.info;
                copy_ele.innerHTML = art.copy;
            });
        });
}