const cards = document.querySelectorAll(".memorycard");
function shuffle() {
  cards.forEach(card => {
    let randompos = Math.floor(Math.random() * Math.floor(12));
    console.log(Math.floor(Math.random() * Math.floor(12)));
    card.style.order = randompos;
  });
}
let matchedScore = 0;
let startdate = new Date();
let enddate;
shuffle();
let counter = 0;
let hasFlippedCards = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!hasFlippedCards) {
    hasFlippedCards = true;
    firstCard = this;
  } else {
    hasFlippedCards = false;
    secondCard = this;
    checkForMatch();
  }
  console.log(firstCard.dataset.cartoon);
  console.log(secondCard.dataset.cartoon);
  //check the cards for equality
  function checkForMatch() {
    let isMatch = firstCard.dataset.cartoon === secondCard.dataset.cartoon;
    isMatch ? disableCards() : unFlipCards();
  }
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    counter += 2;
    secondCard.removeEventListener("click", flipCard);
    matchedScore++;
    document.getElementById("score").innerHTML = matchedScore;
  }

  function unFlipCards() {
    lockBoard = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      lockBoard = false;
    }, 1500);
  }
  function resetBoard() {
    [hasFlippedCards, lockBoard] = ["false", "false"];
    [firstCard, secondCard] = [null, null];
  }

  if (counter == 12) {
    enddate = new Date();
    document.getElementById("time").innerHTML =
      (enddate.getTime() - startdate.getTime()) / 1000;
    setTimeout(() => {
      alert("you Win!!!All boxes matched");
    }, 2000);
  }
}

cards.forEach(card => card.addEventListener("click", flipCard));
