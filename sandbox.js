"use strict"

const H1 = document.querySelector('h1');
console.log(H1);
H1.style.fontSize = `200%`;

const cards = document.querySelectorAll('.card-img-top' );
console.log(cards[0].src);
cards[0].src="../../public/images/cards/PNG/10D.png";
cards[1].src="../../public/images/cards/cardAD.png";
cards[2].src="../../public/images/cards/cardKS.png"
