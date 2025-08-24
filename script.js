//COLOR OBJECT WITH ELEMENT AND SOUND PROPERTIES

const colorOfTiles = {
  red: {
    element: document.getElementById("red"),
    sound: "sounds/red.mp3",
  },
  blue: {
    element: document.getElementById("blue"),
    sound: "sounds/blue.mp3",
  },
  green: {
    element: document.getElementById("green"),
    sound: "sounds/green.mp3",
  },
  yellow: {
    element: document.getElementById("yellow"),
    sound: "sounds/yellow.mp3",
  },
};



//Game state default values

let isPlaying = false;
let gameLevel = 0;
let randomSequence = [];
let userSequence = [];

//keypress to start game "Jquery"

$(document).keypress(function () {
  startGame();
  console.log("Game Started");
});

//game starts

const startGame = () => {
  isPlaying = true;
  gameLevel = 0
  $(document).off("keypress");
  randomSequence = [];
  userSequence = [];
 
  nextSequence();
  $("#level-title").text(`Level ${gameLevel}`); //Jquery
};

//LOOP THROUGH OBJECT AND LISTEN FOR CLICK THEN PLAY SOUND OF ELEMENT AND PUSH SOUND TO USER SEQUENCE

//ALLOW CLOCK 
document.addEventListener("click", function(event) {
  if (!isPlaying) return;
 
  for (const color of Object.keys(colorOfTiles)) {
    if (event.target === colorOfTiles[color].element) {
      handleTileClick(color);
      break;
    }
  }
});

function handleTileClick(color) {
  new Audio(colorOfTiles[color].sound).play();
  $(colorOfTiles[color].element).fadeOut(100).fadeIn(100);
  userSequence.push(colorOfTiles[color]);
  checkSequence();
}


//Randomly selects a new color to keep the game going
const nextSequence = () => {
  const colorKeys = Object.keys(colorOfTiles); //accessing the colors in the object

  const randomChosenColor = colorKeys[Math.floor(Math.random() * colorKeys.length)]; 
  //random chosen tile and sound

  let selectedColor = colorOfTiles[randomChosenColor]; //tile and sound chosen

  new Audio(selectedColor.sound).play(); // sound played

  $(selectedColor.element).fadeOut(100).fadeIn(100); //animate tile

  randomSequence.push(selectedColor); // sound pushed to the array

  console.log("Current Sequence:", randomSequence);

  return;
};

const checkSequence = () => {
  // Check all positions up to current length
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i].sound !== randomSequence[i].sound) {
      gameOver();
      return false;
    }
  }

  // Only advance if full sequence matched
  if (userSequence.length === randomSequence.length) {
    setTimeout(() => {
      userSequence = []; // Reset for next level
      advanceLevel();
    }, 1000); // Give player a brief pause
    return true;
  }

  return null; // Correct so far but not complete
};

const advanceLevel = () => {
  // Update level display
  gameLevel++; //level is incremented
  $("#level-title").text(`Level ${gameLevel}`);
  //level display updated

  //generate next sequence
  nextSequence();
};

const gameOver = () => {
  isPlaying = false;
  $("#level-title").text("Game over, press any key to start");
  $("body").addClass("game-over"); // Add red flash CSS
  setTimeout(() => $("body").removeClass("game-over"), 200);
  const wrongSound = {
    sound: "sounds/wrong.mp3",
    audio: new Audio("sounds/wrong.mp3"), // Preload
  };
  wrongSound.audio.load();

  wrongSound.audio.play();
 
  $(document).off("keypress").keypress(function () {
      console.log("key pressed");
      if (!isPlaying) startGame();
    });
};




// const randomChosenColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];

//random chosen tile and sound

//RANDOM KEYPRESS EVENT TO START/RESTART GAME