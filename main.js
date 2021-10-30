// Select Element
let countspan = document.querySelector(".count");
let bulletsSpancontainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answerArea = document.querySelector(".answer-area");
let submitAnswer = document.querySelector(".btn");
let bullets = document.querySelector(".bullets")
let resultRate = document.querySelector(".result")

//Set option 
let currentIndex = 0;
let rightAnswers = 0;

function getQuestions(){
    let myRequest = new XMLHttpRequest() 

    myRequest.onreadystatechange = function() {

        if(this.readyState === 4 && this.status === 200) {
            let questionnObject = JSON.parse(this.responseText);
            let qCount = questionnObject.length;

            //Create Bullets + Set Question Count
            createbullets(qCount);
        
            //Add Question Data
            addQuestionData(questionnObject[currentIndex],qCount);

            //Click On Submit
            submitAnswer.onclick = () => {
                //Get Right Answers
                let theRightAnswer = questionnObject[currentIndex].right;
                
                //Increase Indix
                currentIndex++;
    
                //Check The Answer
                checkAnswer(theRightAnswer,qCount)

                //ٌRemove Old Question
                quizArea.innerHTML = '';
                answerArea.innerHTML = '';

                //Add Question Data
                addQuestionData(questionnObject[currentIndex],qCount);

                //Handele bullets Classes
                handelebullets();

                //Show Result 
                showResult(qCount)


            };

        }
    }

    myRequest.open("GET", "quiz_data.json", true);
    myRequest.send();
}

getQuestions();

function createbullets(num) {
    countspan.innerHTML = num;

    for(let i = 0; i < num; i++ ){

        let theBullets = document.createElement("span");

        if(i === 0){
            theBullets.className = "bir";
        }


        bulletsSpancontainer.appendChild(theBullets);


    }
}

function  addQuestionData(obj, count){
    if (currentIndex < count ) {

        // create H2
    let questionTitle = document.createElement("h2");
    // Create Question Text
    let questionText = document.createTextNode(obj.question);
    // Append Child Question Text
    questionTitle.appendChild(questionText);
    // Append The H2 To The Quiz Area
    quizArea.appendChild(questionTitle);

    for (i = 1; i <= 4; i++){
        
        //Create Main Answer Div 
        let mainDiv = document.createElement("div");
        //Add Class to Main Div
        mainDiv.className = 'answer';
        //Create Radio Input
        let radioInput = document.createElement("input");
        // Add Type + Name + Id + Data-Attribute
        radioInput.name = 'question';
        radioInput.type = 'radio';
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer${i}`];

        // Make First Option Selected
        if(i === 1){
            radioInput.checked = true;
        }

        // Create Label
        let theLabel = document.createElement("label");

        //Add For Attribute
        theLabel.htmlFor = `answer${i}`;

        //Create Text To The Label
        let theLabelText = document.createTextNode(obj[`answer${i}`]);

        //Add Text To Label
        theLabel.appendChild(theLabelText);
        
        //Add Input + Label To Main Div
        mainDiv.appendChild(radioInput);
        mainDiv.appendChild(theLabel);

        //Append All Divs To Answers Area
        answerArea.appendChild(mainDiv);
    }

    }
}

function checkAnswer(rAnswer,count){
    let answers = document.getElementsByName("question");
    let theCoosenAnswer;

    for (let i = 0; i < answers.length; i++){

        if(answers[i].checked){

            theCoosenAnswer = answers[i].dataset.answer
        
        }
    }
    console.log(rAnswer);
    console.log(theCoosenAnswer);

    if(rAnswer === theCoosenAnswer ){
        rightAnswers++;
        console.log("Good Answer")
    }

};

function handelebullets() {
  let  bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let  arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span , index) => {

    if (currentIndex === index) {
        span.className = "bir";
    }
  })
};

function showResult(count) {
    let theResults;
    if (currentIndex === count) {
        quizArea.remove();
        answerArea.remove();
        submitAnswer.remove();
        bullets.remove();

        if(rightAnswers >(count / 2) && rightAnswers < count) {
            theResults = `<span class="good">Good</span> , ${rightAnswers} From ${count} Is Good`;
        } else if (rightAnswers === count){
            theResults = `<span class="perfect">Perfect</span> , ${rightAnswers} From ${count} Is Perfect`;
        } else{
            theResults = `<span class="bad">Bad</span> , ${rightAnswers} From ${count}`;
        }

        resultRate.innerHTML = theResults;
        resultRate.style.padding = "10px";
        resultRate.style.backgroundColor = "white";
        resultRate.style.marginTop = "10px";
    }
}

