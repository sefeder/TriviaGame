
// define global variables
var timer;
var t = 31;
var crct = 0;
var incrct = 0;
var number = t;
var wrongAns = ['Not quite!','Nope!','Wrong!','Sorry!'];
var rightAns = ["That's right!", "Correct!", "Look at you!", "Way to go!", "You got it!"];
var questions = ['In which state does Breaking Bad take place?', 'What type of cancer does Walt have?','What is the name of the episode in which Gus dies?','What drink does Gale try to perfect?','What store does Saul picture himself managing in his new life?', 'Where do Skyler and Walt say all their extra money is coming from?','How does Don Hector communicate?',"What kind of business is Gus's superlab underneath?"];
var answers = [['New Mexico', 'Arizona', 'California', 'Utah'], ['Brain Cancer', 'Skin Cancer', 'Lymphoma', 'Lung Cancer'], ['All Blown Up', 'Face Off', 'Death of a King', 'Coming of Age'],['Beer','Coffee','Fruit Juice','Iced Tea'],['Subway','Pizza Hut','Cinnabon',"Pete's Coffee"],['The death of a rich relative','A large promotion','Selling expensive furniture',"Walt's gambling addiction"],['Ringing a bell','Blinking','Writing','Sign Language'],['Fastfood chicken restaurant','Laundromat','Carwash','Bookstore']]; 
var crctAnswers = ['New Mexico','Lung Cancer','Face Off','Coffee','Cinnabon', "Walt's gambling addiction", 'Ringing a bell','Laundromat']
//allows game to iterate through through each array as a questionCount
var questionCount = 0
var startPage;
function rdm(arr) {
    var num = Math.floor(Math.random()*arr.length);
    return num;
}; 

// FOR FUTURE VERSION
// function buttons() {
//     for (var i=0; i<4; i++) {
//         if (answers[questionCount][i] === crctAnswers[questionCount]){
//             return i+1
            
//         }
//     }
// }
    
$(document).ready(function(){

// switches from reveal answer page to next question or finalscreen
function nextPage() {
    setTimeout(function(){
        if (questionCount < (questions.length-1)) {
            number = t;
            questionCount++;
            createQuestionArea();
            createAnswerArea();
            startTimer();
            $('#timer').show(); 
       
        } else {
            createFinalScreen();
        } 
    },1000*5);
}
// function at the start of the game to bring up start button
function startGame(){
    startPage = '<button class="btn startBtn btn-primary btn-lg"id="start">START</button>';
    $('.startDiv').html(startPage);
    $('.questionDiv').empty();

};

    startGame();

    // FOR FUTURE VERSIONS PLEASE IGNORE: the index of the string in answers[questionCount] that = crctAnswers[questionCount]

//This sets up the question display area for each question page
function createQuestionArea(){
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext">' + questions[questionCount] + '</h3></div></div></div>';
    $('.questionDiv').html(questionArea);
    $('#title').text('Question ' + (questionCount+1) +':');
};

//This sets up the answer display area for each question page
function createAnswerArea(){
    answerArea = '<div class="panel-default text-center" id="answerArea"> <div class="row text-center"><div class="col-xs-offset-4 col-xs-4"><button class="btn btn-primary ans btn-lg" id="ans1">' + answers[questionCount][0] + '</button><button class="btn btn-primary ans btn-lg" id="ans2">' + answers[questionCount][1] + '</button><button class="btn btn-primary ans btn-lg" id="ans3">' + answers[questionCount][2] + '</button><button class="btn btn-primary ans btn-lg" id="ans4">' + answers[questionCount][3] + '</button></div></div></div>';
    $('.answerDiv').html(answerArea);
}  ;  
 //This function starts the game  
 $('body').on('click', '.startBtn', function() {
    $('.startBtn').remove();
    startTimer();
    createQuestionArea();
    createAnswerArea();
    $('#timer').show();
 });
//This creates the screen for when a correct answer is chosen
 function createRightPick() {
    crct++;
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext">' + crctAnswers[questionCount] + ' was the correct answer</h3></div></div></div>';
    $('.questionDiv').html(questionArea);
    $('#title').text(rightAns[rdm(rightAns)]);
    $('.answerDiv').empty();
    $('#timer').hide();
    nextPage();
 };

 //This creates the screen for when an incorrect answer is chosen
 function createWrongPick(){
    incrct++;
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext">' + crctAnswers[questionCount] + ' was the correct answer</h3></div></div></div>';
    $('.questionDiv').html(questionArea);
    $('#title').text(wrongAns[rdm(wrongAns)]);
    $('.answerDiv').empty();
    $('#timer').hide();
    nextPage();
    
 };

 //This creates the screen for when time is up
 function createTimeUp(){
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title"></h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext">' + crctAnswers[questionCount] + ' was the correct answer</h3></div></div></div>';
    $('.questionDiv').html(questionArea);
    $('#title').text("Time's Up!");
    $('.answerDiv').empty();
    $('#timer').hide();
    nextPage();
  
 };
//this function happens when the user selects an answer and goes into the above functions based on which answer they chose
 $('body').on('click', '.ans', function() {
    answerPicked = $(this).text();
    if (answerPicked === crctAnswers[questionCount]){
        createRightPick();
        // var button = buttons(); FOR FUTURE VERSION
        clearInterval(timer);
        // $("#ans"+button).attr('class','btn btn-success btn-lg'); FOR FUTURE VERSION
    } else {
        createWrongPick();
        clearInterval(timer);

    }
 });


 //This function sets up the final screen to show the score
function createFinalScreen(){
    questionArea = '<div class="panel-default text-center" id="questionArea"><h2 id="title">How did you do?:</h2><div class="row text-center"><div class="col-xs-offset-1 col-xs-10"><h3 id="questiontext"><p id="crctTotal">Correct Answers: ' + crct + '</p><p id="incrctTotal">Incorrect Answers: ' + incrct + '</p><p id="unansTotal">Unanswered: ' + (questions.length - incrct - crct) + '</p></h3></div></div></div>';
    $('.questionDiv').html(questionArea);
    resetBtn = '<button class="btn resetBtn btn-primary btn-lg"id="reset">RESET GAME</button>';
    $('.startDiv').html(resetBtn);
}
// This resets the game and sets variables back to 0 or their starting positions
$('body').on('click','.resetBtn',function(){
    questionCount = 0;
    crct = 0;
    incrct = 0;
    number = t;
    startGame();

})

//These functions governs the countdown timer
function startTimer() {
    timer = setInterval(countdown, 1000);
}; 

function countdown() {
    number -=1;
    $('#timer').text('Time Remaining: ' + number);
    if (number === 0) {
        clearInterval(timer);
        createTimeUp();
    }
}

});