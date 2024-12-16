const questionEl = document.getElementById("question");
const questionFormEl = document.getElementById("questionForm");
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");
let storedAnswer;
let score = +localStorage.getItem("score")||0;
const randomNumber=(min,max)=>{
    return Math.floor(Math.random()*(max-min+1) + min);
};
const generateQustion=()=>{
    const number1 = randomNumber(1,10);
    const number2 = randomNumber(1,10);
    const questionType = randomNumber(1,4);
    let firstNumber;
    let secondNumber;
    // const question = `Q.What is ${number1} multiply ${number2}`;
    // const answer = number1*number2;
    if(number1>number2 && questionType>2){
        firstNumber = number1;
        secondNumber = number2;
    }
    else{
        firstNumber = number2;
        secondNumber = number1;
    }
    let question;
    let answer;
    switch(questionType){
        case 1:
        question = `Q.What is ${firstNumber} multiply ${secondNumber}`;
        answer = firstNumber*secondNumber;
        break;
        case 2:
        question = `Q.What is ${firstNumber} addition ${secondNumber}`;
        answer = firstNumber+secondNumber;
        break;
        case 3:
        question = `Q.What is ${firstNumber} Divide by ${secondNumber}`;
        answer = Math.floor(firstNumber/secondNumber);
        break;
        case 4:
        question = `Q.What is ${firstNumber} subtract ${secondNumber}`;
        answer = firstNumber-secondNumber;
        break;
    }
    return {question,answer};
};
console.log(generateQustion());
const showQuestion=()=>{
    const {question,answer} = generateQustion();
    questionEl.innerText = question;
    scoreEl.innerText = score;
    storedAnswer = answer;
}
 showQuestion();
const checkAnswer=(event)=>{
    event.preventDefault();
    const buttonPressed = event.submitter;
    
    const formData = new FormData(questionFormEl);
    const userAnswer = +formData.get("answer");
    console.log("answer",userAnswer);
    if(userAnswer==storedAnswer){
        score += 1;
    } 
    else{
        score -= 1;
    }
    scoreEl.innerText = score;
    localStorage.setItem("score",score);
    event.target.reset();
    showQuestion();
    console.log("answer",userAnswer);   
};
resetBtn.addEventListener("click", () => {
    score = 0; 
    scoreEl.innerText = `Score: ${score}`;
    localStorage.setItem("score", score); // Update localStorage
    showQuestion(); // Show a new question
});