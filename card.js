if (typeof window !== "undefined") {
  let deck = [];
  let p1Deck = [];
  let p2Deck = [];
  let container = {};
  // const values = {1:"2",2:"3",3:"4",4:"5",5:"6",6:"7",7:"8",8:"9",9:"10",10:"J",11:"Q",12:"K",13:"A"};
  const values = { 1: "2", 2: "3", 3: "4", 4: "5" };
  const inner = '<div class="card__inner ';
  const symbol = '<div class="card__symbol ';
  const symbolC = '<div class="card__symbol"></div>';
  const column = '<div class="card__column ';
  const huge = "card--huge ";
  const aCenter = "center-symbol-align ";
  const jCenter = "center-symbol-justify ";
  const jSpcAround = "justify-space-around ";
  const c = "</div>";
  let innercard;
  let p1card, p2card;
  let p1WarCards = [];
  let p2WarCards = [];

  function otherCards(value, naipe) {
    switch (value) {
      case "A":
        innercard = `${inner}${aCenter}${jCenter}">${column}">${symbol}${huge}">${c.repeat(
          3
        )}`;
        break;
      case "2":
        innercard = `${inner}${jCenter}">${column}">${symbolC}${column}">${symbolC}${c.repeat(
          3
        )}`;
        break;
      case "3":
        innercard = `${inner}${jCenter}">${column}">${symbolC.repeat(
          3
        )}${c.repeat(2)}`;
        break;
      case "4":
        innercard = `${inner}">${column}">${symbolC.repeat(
          2
        )}${c}${column}">${symbolC.repeat(2)}${c.repeat(2)}`;
        break;
      case "5":
        innercard = `${inner}">${column}">${symbolC.repeat(
          2
        )}${c}${column}${jCenter}">${symbolC}${c}${column}">${symbolC.repeat(
          2
        )}${c.repeat(2)}`;
        break;
      case "6":
        innercard = `${inner}">${column}">${symbolC.repeat(
          3
        )}${c}${column}">${symbolC.repeat(3)}${c.repeat(2)}`;
        break;
      case "7":
        innercard = `${inner}">${column}">${symbolC.repeat(
          3
        )}${c}${column}${jCenter}">${symbolC}${c}${column}">${symbolC.repeat(
          3
        )}${c.repeat(2)}`;
        break;
      case "8":
        innercard = `${inner}">${column}">${symbolC.repeat(
          3
        )}${c}${column}${aCenter}${jSpcAround}">${symbolC.repeat(
          2
        )}${c}${column}">${symbolC.repeat(3)}${c.repeat(2)}`;
        break;
      case "9":
        innercard = `${inner}">${column}">${symbolC.repeat(
          4
        )}${c}${column}${jCenter}">${symbolC}${c}${column}">${symbolC.repeat(
          4
        )}${c.repeat(2)}`;
        break;
      case "10":
        innercard = `${inner}">${column}">${symbolC.repeat(
          4
        )}${c}${column}${aCenter}${jSpcAround}">${symbolC.repeat(
          2
        )}${c}${column}">${symbolC.repeat(4)}${c.repeat(2)}`;
        break;
      case "J":
        innercard = `${inner}"><img src="img/cards/${naipe}-${value}.png">${c}`;
        break;
      case "Q":
        innercard = `${inner}"><img src="img/cards/${naipe}-${value}.png">${c}`;
        break;
      case "K":
        innercard = `${inner}"><img src="img/cards/${naipe}-${value}.png">${c}`;
        break;
      default:
        innercard = `<section class="card"><div class="backcard"></div></section>`;
    }
  }

  function createCard(naipeOf, valueOf, keyOf) {
    let card = { naipe: naipeOf, value: valueOf, key: keyOf };
    return card;
  }

  function drawDeck() {
    const naipes = ["club", "heart", "diamond", "spade"];
    for (i = 0; i < naipes.length; i++) {
      for (j = 0; j < Object.keys(values).length; j++) {
        let newCard = createCard(
          naipes[i],
          Object.values(values)[j],
          Object.keys(values)[j]
        );
        deck.push(newCard);
      }
    }
    dealCards(deck);
    makeContainers();
  }
  drawDeck();

  function dealCards(deck) {
    // Shuffle
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    // Distribute the cards
    p1Deck = deck.slice(0, deck.length / 2);
    p2Deck = deck.slice(deck.length / 2, deck.length);
  }

  function generateCard(naipe, value) {
    if (naipe == ".") {
      otherCards(".", ".");
      return innercard;
    } else {
      otherCards(value, naipe);
      let card = `<section class="card card--${naipe}" value="${value}">
                  ${innercard}</section>`;
      return card;
    }
  }

  function makeContainers() {
    container = {
      p1div: document.getElementById("p1card"),
      p2div: document.getElementById("p2card"),
      p1normal: document.getElementById("p1normal"),
      p2normal: document.getElementById("p2normal"),
      p1war: document.getElementById("p1war"),
      p2war: document.getElementById("p2war"),
      warf1: document.getElementById("warf1"),
      warf2: document.getElementById("warf2"),
      warContainer: document.getElementById("warContainer"),
      warText: document.getElementById("warText"),
      warbacks: document.getElementsByClassName("warback"),
      scoreOne: document.getElementById("scoreOne"),
      scoreTwo: document.getElementById("scoreTwo"),
      buttonContainer: document.getElementById("buttonContainer"),
      buttonWar: document.getElementById("buttonWar"),
      buttonResume: document.getElementById("buttonResume"),
      button: document.getElementById("button"),
      pattempt1: document.getElementById("pattempt1"),
      pattempt2: document.getElementById("pattempt2"),
      newGame: document.getElementById("newGame")
    };
  }


  

  function play() {
    checkWinner(0);
    display("normal");
    display("normalOn");
    p1card = p1Deck.shift();
    p2card = p2Deck.shift();
    container.p1div.innerHTML = generateCard(p1card.naipe, p1card.value);
    container.p2div.innerHTML = generateCard(p2card.naipe, p2card.value);
    compare(parseInt(p1card.key), parseInt(p2card.key));
  }

  function checkWinner(argument) {
    if (p1Deck.length <= argument) {
      if(argument > 0) {container.p1div.style.display = "f"
        container.warText.innerHTML = "Player 2 Winns because Player 1 has not enough cards for War";}
      else {container.warText.innerHTML = "Player 2 Winns";}
      container.buttonContainer.style.display = "none";
      container.newGame.style.display = "flex";

      return true;
    } else if (p2Deck.length <= argument) {
      if(argument > 0) {container.warText.innerHTML = "Player 1 Winns because Player 2 has not enough cards for War";}
      else {container.warText.innerHTML = "Player 1 Winns";}
      container.buttonContainer.style.display = "none";
      container.newGame.style.display = "flex";
      return true;
    } else {
      return false;
    }
  }

  function compare(p1, p2) {
    container.p1div.addEventListener("animationend", function () {
      container.p1div.removeAttribute("class");
    });
    container.p2div.addEventListener("animationend", function () {
      container.p2div.removeAttribute("class");
    });

    if (p1 > p2) {
      p1Deck.push(p1card, p2card);
      container.p1div.setAttribute("class", "move-left");
      container.p2div.setAttribute("class", "move-leftEx");

      container.p1div.addEventListener("animationstart", function () {
        container.button.disabled = true;
      });
      checkWinner(0);
    } else if (p1 < p2) {
      p2Deck.push(p1card, p2card);
      container.p1div.setAttribute("class", "move-rightEx");
      container.p2div.setAttribute("class", "move-right");

        container.p2div.addEventListener("animationstart", function () {
          container.button.disabled = true;
        });
      checkWinner(0);
    } else {
    
      war();
    }

    container.p2div.addEventListener("animationend", function () {
      display("normalOff");
      container.button.disabled = false;
    });
  }

  function changeCardCounter(p1cards) {
    container.scoreOne.innerHTML = `Cards Left: ${p1Deck.length}`;
    container.scoreTwo.innerHTML = `Cards Left: ${p2Deck.length}`;
  }
  document.getElementById("button")
    .addEventListener("click", changeCardCounter);
  document.getElementById("buttonResume")
    .addEventListener("click", changeCardCounter);

  function war() {
    if (!checkWinner(3)) {
      display("war");
      Array.from(container.warbacks).forEach((element) => {
        element.innerHTML = generateCard(".");
      });
    }
  }

  function display(state) {
    if (state == "war") {
      container.buttonContainer.style.display = "none";
      container.warContainer.style.display = "flex";
      container.p1normal.style.display = "none";
      container.p2normal.style.display = "none";
      container.p1war.style.display = "block";
      container.p2war.style.display = "block";
      container.warText.innerHTML = `<img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGIxMjZkZTk1Yjk4NWExN2UxMTEwYWM1NDA1MTllYWEzZDc2N2JiOSZjdD1n/3oEduYcStmVqMIbsxG/giphy.gif">`;
      container.buttonWar.style.display = "inline-block";
      container.warf1.innerHTML = "";
      container.warf2.innerHTML = "";
      container.pattempt1.style.display = "block";
      container.pattempt2.style.display = "block";    
    } else if (state == "normalOff") {
      container.p1div.style.display = "none";
      container.p2div.style.display = "none";
    } else if (state == "normalOn") {
      container.p1div.style.display = "flex";
      container.p2div.style.display = "flex";
    } else {
      container.buttonContainer.style.display = "flex";
      container.warContainer.style.display = "none";
      container.p1normal.style.display = "block";
      container.p2normal.style.display = "block";
      container.p1war.style.display = "none";
      container.p2war.style.display = "none";
      container.warText.innerHTML = "";
    }
  }

  function warButton() {
    container.warf1.innerHTML = "";
    container.warf2.innerHTML = "";
    p1WarCards = p1Deck.splice(0, 3);
    p2WarCards = p2Deck.splice(0, 3);
    
    let p1cardWar = p1Deck.shift();
    let p2cardWar = p2Deck.shift();
    container.warf1.innerHTML = generateCard(p1cardWar.naipe, p1cardWar.value);
    container.warf2.innerHTML = generateCard(p2cardWar.naipe, p2cardWar.value);

    if (parseInt(p1cardWar.key) > parseInt(p2cardWar.key)) {
      p1Deck.push(p1card, p2card, p1cardWar, p2cardWar,...p1WarCards,...p2WarCards);
      container.p1war.setAttribute("class", "move-left");
      container.p2war.setAttribute("class", "move-leftEx");
      
      container.buttonWar.style.display = "none";
      container.p1war.addEventListener("animationstart", function () {
        container.pattempt1.style.display = "none";
       container.pattempt2.style.display = "none";
      });  

      container.p1war.addEventListener("animationend", function () {
        container.p1war.removeAttribute("class");
      });
      container.p2war.addEventListener("animationend", function () {
        container.p2war.removeAttribute("class");
      });
    } else if (parseInt(p2cardWar.key) > parseInt(p1cardWar.key)) {
      p2Deck.push(p1card, p2card, p1cardWar, p2cardWar,...p1WarCards,...p2WarCards);
      container.p1war.setAttribute("class", "move-rightEx");
      container.p2war.setAttribute("class", "move-right");

      container.buttonWar.style.display = "none";
      container.p1war.addEventListener("animationstart", function () {  
       container.pattempt1.style.display = "none";
       container.pattempt2.style.display = "none"; 
      });

      container.p1war.addEventListener("animationend", function () {
        container.p1war.removeAttribute("class");
      });
      container.p2war.addEventListener("animationend", function () {
        container.p2war.removeAttribute("class");
      });
    } else {
      war();
    }
  }
}
