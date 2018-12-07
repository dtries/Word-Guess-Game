// JavaScript for Word Game

//------------- Variables------------------

var slang = ["apple", "bar_down", "beauty", "biscuit", "celly", "chiclets","dangle", "dirty", "face_wash", "five_hole", "flow", "gino", "hoser", "lip_lettuce", "lumber", "mitts", "point","pylon","sauce","sieve", "slot", "sin_bin","stoned","sweater", "top_shelf"];

var defn = ["an assist", "when the puck goes in the net off the bottom of the crossbar", "a pretty play","the puck", "a celebration after a goal", "teeth","a deke","an incredible deke or pass, aka filthy", "when a player shoves his/her glove into an opponents face", "area between the goalie's legs", "long hair, aka lettuce", "a goal", "another term for loser, derived from the when the losing team would hose down the ice before the invention of the Zamboni", "a mustache", "a hockey stick, dervied from when sticks were made of wood, aka twig","hockey gloves", "a defenseman inside the offensive zone", "a slow defenseman that often gets skated around", "a pass that leaves the ice to make it more difficult for opposing players to intercept", "a bad goalie, often refered to as full of holes", "the high-scoring area in front of the net","the penalty box", "when a goalie makes a great save", "a hockey jersey", "hard to hit top part of the goal net (aka top cookies because it's where grandma hides the goodies)"];


//Variables for values - empty to start
var SelectedSlang =  "";
var EmptySlots = 0;
var SlangLetters = [];
var WrongLetters = [];
var FilledAndEmpty = [];
var MatchingDefinition = "";

//Variables for scoring
var RemainingTrys = 9;
var NumWins = 0;
var NumLosses =0;


console.log(slang);

//---------------------------Functions----------------------------------


//......Initate Game Settings.........
function Initiate () {

    // MoodMusic ();

    SelectedSlang = slang[x=(Math.floor(Math.random() * slang.length))]; //randomly selects slang word

    MatchingDefnNumber = x;

    console.log (MatchingDefnNumber);

    MatchingDefinition = defn[MatchingDefnNumber];

    console.log(MatchingDefinition);

    console.log(slang.length)

    document.getElementById("Guesses-Remaining").innerHTML = " " + RemainingTrys;

    console.log(SelectedSlang);

    SlangLetters = SelectedSlang.split(""); //divides word out letter by letter in an array

    EmptySlots = SlangLetters.length; //Determines number of empty slots to use based on number of letters in array

    //enters empty slot spaces into an array based on how long the word is; this info comes from EmptySlots var above
    for (var w = 0; w < EmptySlots; w++) {
        FilledAndEmpty.push("_");
    }

    //Update empty slots in HTML
    document.getElementById("Word-Up").innerHTML = " " + FilledAndEmpty.join (" ");

}

//....Evaluate for correct/incorrect guesses......

//check if guess matches letter in word
function EvaluateGuess(guess) {
    var GuessCorrect = false;

    for (var w = 0; w < EmptySlots; w++) { //checks to see if guessed letter is in word, sets to true if so
        if (SelectedSlang[w] == guess) {
            GuessCorrect = true;
        }
    }

    console.log(GuessCorrect);

    if (GuessCorrect) { 
        for (var w =0; w < EmptySlots; w++) {
            if (SelectedSlang[w] == guess) { //checks to see which slots hold correct letter
                FilledAndEmpty[w] = guess;
            }
        }
        console.log(FilledAndEmpty);
    }

    else {
        WrongLetters.push(guess); //enters wrongly guessed letter into an array
        RemainingTrys--;

        console.log(RemainingTrys);
        
    }
}



//.......ReInitiate settings for next try........//
function ReInitiate() {
    RemainingTrys = 9;
    WrongLetters = [];
    FilledAndEmpty = [];
    Initiate()
}

//...........Evaluate to see if Slang Term is complete & update scoring ..........

//Slang Term Guessed
function done () {

    //winner -- informs player, plays video, shows definition, and initiates for next try
    if (SlangLetters.toString() == FilledAndEmpty.toString()) {
        NumWins++;


        document.getElementById("Word_And_Defn").innerHTML = SelectedSlang + ": " + MatchingDefinition;
        
        document.getElementById("Current-Image").innerHTML = ".Shoots-Scores";
        
        ReInitiate()

        document.getElementById("Words-Correct").innerHTML = " " + NumWins;
    }

    //hoser (aka loser) inform player and initiates for next try
    else if (RemainingTrys === 0) {
        NumLosses++;

        document.getElementById("Word_And_Defn").innerHTML = "Word and Definition Appear Here After Correct Guess"
        ReInitiate()
        document.getElementById("Words-Missed").innerHTML = " " + NumLosses;
    }

    document.getElementById("Word-Up").innerHTML = " " + FilledAndEmpty.join(" ");//Updates display of letters and blanks for the slang term being guessed currently

    document.getElementById("Guesses-Remaining").innerHTML = " " + RemainingTrys;//Updates display of guesses left for current word
}



//........Begins Game Play.............//

Initiate()

//Look for keypress, changes all to lower case
document.onkeyup = function (key_pressed) {
    
    var guess = String.fromCharCode(key_pressed.keyCode).toLowerCase();

    EvaluateGuess(guess); //Evaluate selected letter with letters in word

    done (); //evaluates whether player won or lost or continues with current slang word

    document.getElementById("Letters-Incorrect").innerHTML = " " + WrongLetters.join(" ");


}