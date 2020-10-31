let board = document.getElementById("board");

let bomb = new Array(10);
let count = 0;
let gameOver = false;

//creating 2D array for storing bombs
for (let i = 0; i < bomb.length; i++) {
  bomb[i] = new Array(10);
}

//function to generate bomb at random places in game
const generateBomb = () => {
  for (let i = 0; i < 10; i++) {
    while (true) {
      let m = Math.floor(Math.random() * 9);
      let n = Math.floor(Math.random() * 9);
      if (bomb[m][n] !== 0) {
        bomb[m][n] = 0;
        break;
      }
    }
  }
};

//function for losing the game
const lost = () => {
  for (let k = 0; k < 10; k++) {
    for (let l = 0; l < 10; l++) {
      if (bomb[k][l] === 0) {
        let bombBox = document.getElementById(k + "" + l);
        bombBox.className = "red";
        bombBox.innerHTML = "0";
      }
    }
  }
  setTimeout(() => {
    alert("You lost! Click on Start Again.");
  }, 500);
  gameOver = true;
  //return;
};

//function for winning the game
const won = () => {
  setTimeout(() => {
    alert("Congratulations you won the game. Click on Start Again.");
  }, 500);
  gameOver = true;
};

//loop to print board on screen
for (let i = 0; i < 9; i++) {
  let row = document.createElement("div");
  row.className = "row";
  row.id = "row" + [i];
  board.appendChild(row);

  for (let j = 0; j < 9; j++) {
    let rownumber = document.getElementById("row" + [i]);
    let box = document.createElement("div");
    box.className = "grid";
    box.addEventListener("mousedown", (event) => handleClick(event, i, j));
    rownumber.appendChild(box);

    let hiddenBox = document.createElement("div");
    hiddenBox.className = "hiddenBox";
    hiddenBox.id = i + "" + j;
    box.appendChild(hiddenBox);
  }
}

generateBomb();

//function to handle flow of game
const handleClick = (event, i, j) => {
  console.log(bomb);
  if (gameOver === false) {
    let countBomb = 0;

    //if block to handle right click
    if (event.button === 2) {
      let el = document.getElementById(i + "" + j);
      if (bomb[i][j] === "clicked") return;
      el.innerHTML = "❗";
      return;
    }

    if (bomb[i][j] === 0) {
      lost();
      return;
    }

    //checking top-left box
    if (i - 1 >= 0 && j - 1 >= 0) {
      console.log("top-left");
      if (bomb[i - 1][j - 1] === 0) {
        countBomb++;
        console.log("top-left");
      }
    }

    //checking top-right box
    if (i - 1 >= 0 && j + 1 < 9) {
      // console.log("top-right");
      if (bomb[i - 1][j + 1] === 0) {
        countBomb++;
        ///console.log("top-right");
      }
    }

    //checking bottom-left box
    if (i + 1 < 9 && j - 1 >= 0) {
      //console.log("bottom-left");
      if (bomb[i + 1][j - 1] === 0) {
        countBomb++;
        //console.log("bottom-left");
      }
    }

    //checking bottom-right box
    if (i + 1 < 9 && j + 1 < 9) {
      //console.log("bottom-right");
      if (bomb[i + 1][j + 1] === 0) {
        countBomb++;
        //console.log("bottom-left");
      }
    }

    //checking top box
    if (i - 1 >= 0) {
      //console.log("top");
      if (bomb[i - 1][j] === 0) {
        countBomb++;
      }
    }

    //checking left box
    if (j - 1 >= 0) {
      //console.log("left");
      if (bomb[i][j - 1] === 0) {
        countBomb++;
      }
    }

    //checking bottom box
    if (i + 1 < 9) {
      //console.log("bottom");
      if (bomb[i + 1][j] === 0) {
        countBomb++;
      }
    }

    //checking right box
    if (j + 1 < 9) {
      //console.log("right");
      if (bomb[i][j + 1] === 0) {
        countBomb++;
      }
    }

    let Box = document.getElementById(i + "" + j);
    Box.className = "green";
    Box.innerHTML = `${countBomb}`;
    bomb[i][j] = "clicked";

    count++;
    if (count === 71) {
      won();
    }
  }
};
