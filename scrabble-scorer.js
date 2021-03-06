// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85

const input = require("readline-sync");

const oldPointStructure = {
  1: ['a', 'e', 'i', 'o', 'u', 'l', 'n', 'r', 's', 't'],
  2: ['d', 'g'],
  3: ['b', 'c', 'm', 'p'],
  4: ['f', 'h', 'v', 'w', 'y'],
  5: ['k'],
  8: ['j', 'x'],
  10: ['q', 'z']
};

let enteredWord = " ";

function oldScrabbleScorer(word) {
	word = word.toLowerCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
   enteredWord = input.question();
}


function simpleScore(word){
  let letterPoints = 0;
  for (let i = 0; i < word.length; i++ ){
    if (word.charAt(i) != " "){
      letterPoints += 1;
    }
  }
  return letterPoints;
}


function vowelBonusScore(word){
  let letterPoints = 0;
  const vowels = ["A", "E", "I", "O", "U"];
  for (let i = 0; i<word.length; i++) {
    if (vowels.includes(word.charAt(i).toUpperCase())){
      letterPoints += 3;
    }else if (word.charAt(i) != " "){
      letterPoints += 1;
    }
  }
  return letterPoints;
}

function scrabbleScore(word){
	word = word.toLowerCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in newPointStructure) {
 		 if (pointValue === word.charAt(i)) {
			letterPoints += newPointStructure[pointValue];
     }
 	  }
	}
	return letterPoints;

}

const scoringAlgorithms = [
  {
    name: "Simple Score", 
    description: "Each letter is worth 1 point.", 
    scoringFunction: simpleScore
  }, 
  {
    name: "Bonus Vowels", 
    description: "Vowels are 3 pts, consonants are 1 pt.", 
    scoringFunction: vowelBonusScore
  }, 
  {
    name: "Scrabble", 
    description: "The traditional scoring algorithm.", 
    scoringFunction: scrabbleScore
  }
];

function scorerPrompt(word) {
  let selectedScorer = "";
  console.log("Which scoring method would you like to use? ");
  for (let i = 0; i < 3; i++) {
    console.log(`${i} - ${scoringAlgorithms[i]["name"]}: ${scoringAlgorithms[i]["description"]}`);
  }
  selectedScorer = input.question("Enter 0, 1, or 2: ");

  console.log(`Score for ${word}: ${scoringAlgorithms[selectedScorer].scoringFunction(word)}`);

  return selectedScorer;
}

function transform(object) {
  let newPointObject = {};
  for (item in object){
    for (i = 0; i<object[item].length; i++){
      newPointObject[object[item][i]] = Number(item);
    }
  }
return newPointObject
}

let newPointStructure = transform(oldPointStructure);

function runProgram() {
  initialPrompt();
  scorerPrompt(enteredWord);
  console.log(newPointStructure);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

