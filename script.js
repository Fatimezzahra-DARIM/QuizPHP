// getting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .time_sec");
const timeLine = quiz_box.querySelector("header .time_line");
// If start Quiz Button Clicked
start_btn.onclick = () => {
    info_box.classList.add("activeInfo"); //show the info box 
}
// If Exit Quiz Button Clicked
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //Hide the info box
};
// If Continue Button Clicked
continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); //Hide the info box
    quiz_box.classList.add("activeQuiz"); //Show the quiz box
  showQuestions(0);
  queCounter(1);
  startTimer(30);
  startTimerLine(0);
};
let que_count = 0;
let que_numb = 1;
let counter;
let timeValue = 30;
let widthValue=0;
const next_btn = quiz_box.querySelector(".next_btn");
next_btn.onclick = () => {
    if (que_count < questions.length - 1) {
      que_count++;
      que_numb++;
      showQuestions(que_count);  
      queCounter(que_numb);
      clearInterval(counter);
      startTimer(timeValue);
      clearInterval(counterLine);
      startTimerLine(widthValue);
    } else {
      console.log("Questions completed");  
    }
    
}
//If Next Button Clicked
//getting questions & options from array
function showQuestions(index) {
    const que_text = document.querySelector(".que_text");
    let que_tag =
      "<span>" + questions[index].numb +"."+ questions[index].question + "</span>";
    let option_tag =
      '<div class="option" data-number="1">' +
      questions[index].options[0] +
      "<span></span> </div>" +
      '<div class="option" data-number="2">' +
      questions[index].options[1] +
      "<span></span> </div>" +
      '<div class="option" data-number="3">' +
      questions[index].options[2] +
      "<span></span> </div>" +
      '<div class="option" data-number="4">' +
      questions[index].options[3] +
      "<span></span> </div>";
    que_text.innerHTML = que_tag;
  option_list.innerHTML = option_tag;
  const option = option_list.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}  
let tickIcon = '<div class="icon tick"><i class="fa fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';
function optionSelected(answer) {
  clearInterval(counter);
  startTimer(timeValue);
  let userAns = answer.dataset['number'];
  // let userAns = answer.textContent;
  // console.log(userAns);
  let correctAns = questions[que_count].answer;
  console.log(correctAns);
  // console.log(correctAns==userAns);
  let allOptions = option_list.children.length;
  if (userAns == correctAns) {
    answer.classList.add("correct");
    console.log("Answer is Correct");
    answer.insertAdjacentHTML("beforeend", tickIcon);
  }
  else {
     answer.classList.add("incorrect");
    console.log("Answer is wrong");
    answer.insertAdjacentHTML("beforeend", crossIcon);
    // if answers is incorrect then automatically selected the correct answers
    for (let i = 0; i < allOptions; i++){
      if (option_list.children[i].dataset["number"] == correctAns) {
        // console.log(option_list.children[i].dataset["number"] == correctAns);
        option_list.children[i].setAttribute("class", "option correct");
          option_list.children[i].insertAdjacentHTML("beforeend", tickIcon);
      }
    }
  }
  //Once user selected disabled all options
  for (let i = 0; i< allOptions; i++){
    option_list.children[i].classList.add("disabled");
  }
}
function queCounter(index) {
  const bottom_ques_counter = quiz_box.querySelector(".total_que");
  let totalQuesCountTag =
    ' <span style="display: flex;"><p>' +
    index +
    "</p>Of<p>" +
    questions.length +
    "</p>Questions</span>";
  bottom_ques_counter.innerHTML = totalQuesCountTag;
}
function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeCount.textContent = "00";
    }
  }
}
function startTimerLine(time) {
  counterLine = setInterval(timer, 60);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px" ;
    if (time > 549) {
      clearInterval(counterLine);
      timeCount.textContent = "00";
    }
  }
}
//getElementsByClassName =Style