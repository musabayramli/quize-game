const quizData = [
  {
    question: "JavaScript hansı il icad olunub?",
    choices: ["1993", "1995", "1996", "2000"],
    correct: "1995",
  },
  {
    question: "HTML nə deməkdir?",
    choices: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "HyperLoop Machine Language",
      "HyperText Main Language",
    ],
    correct: "HyperText Markup Language",
  },
  {
    question: "CSS nə üçün istifadə olunur?",
    choices: [
      "Strukturlaşdırma",
      "Stil vermə",
      "Məntiq qurma",
      "Məlumat saxlama",
    ],
    correct: "Stil vermə",
  },
  {
    question: "JavaScript-də hansı məlumat növü mövcuddur?",
    choices: ["String", "Number", "Boolean", "Hamısı"],
    correct: "Hamısı",
  },
  {
    question: "HTML-də bir düymə necə yaradılır?",
    choices: ["<button>", "<btn>", "<input>", "<düymə>"],
    correct: "<button>",
  },
  {
    question: "CSS-də necə rəng təyin etmək olar?",
    choices: ["color", "background-color", "font-color", "Hamısı"],
    correct: "Hamısı",
  },
  {
    question: "JavaScript-də DOM nə üçün istifadə olunur?",
    choices: ["Strukturlaşdırma", "Dinamik məzmun", "Əlaqə", "Bilmədim"],
    correct: "Dinamik məzmun",
  },
  {
    question: "JavaScript-də necə funksiya elan edilir?",
    choices: [
      "function myFunc()",
      "def myFunc()",
      "function:myFunc()",
      "fun myFunc()",
    ],
    correct: "function myFunc()",
  },
  {
    question: "CSS-də 'flexbox' nə üçün istifadə olunur?",
    choices: [
      "Elementlərin düzülüşünü idarə etmək",
      "Fon şəkli əlavə etmək",
      "Şriftin ölçüsünü dəyişmək",
      "Elementin görünməsini idarə etmək",
    ],
    correct: "Elementlərin düzülüşünü idarə etmək",
  },
  {
    question: "JavaScript-də 'for' dövrü nə üçün istifadə olunur?",
    choices: [
      "Dəyişən elan etmək",
      "Funksiya çağırmaq",
      "Döngü yaratmaq",
      "Array yaratmaq",
    ],
    correct: "Döngü yaratmaq",
  },
  {
    question: "HTML-də hansı başlıq elementi ən böyükdür?",
    choices: ["<h1>", "<h2>", "<h3>", "<h4>"],
    correct: "<h1>",
  },
  {
    question: "JavaScript-də hansı işarə məntiqi 'və' əməliyyatını göstərir?",
    choices: ["&&", "||", "==", "!="],
    correct: "&&",
  },
  {
    question: "CSS-də 'margin' nə üçün istifadə olunur?",
    choices: [
      "Elementin daxilində boşluq yaratmaq",
      "Elementin xaricində boşluq yaratmaq",
      "Fon rəngini dəyişmək",
      "Mətnin rəngini dəyişmək",
    ],
    correct: "Elementin xaricində boşluq yaratmaq",
  },
  {
    question: "JavaScript-də 'NaN' nə deməkdir?",
    choices: ["Number and Null", "Not a Number", "Null and NaN", "Not a Null"],
    correct: "Not a Number",
  },
  {
    question:
      "HTML-də şəkil əlavə etmək üçün hansı elementdən istifadə olunur?",
    choices: ["<img>", "<src>", "<pic>", "<image>"],
    correct: "<img>",
  },
];

quizData.forEach((q) => (q.time = Math.floor(Math.random() * 9) + 10));

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;
let isPaused = false;

function startQuiz() {
  document.getElementById("start-btn").style.display = "none";
  document.getElementById("stop-btn").style.display = "inline-block";
  loadQuestion();
}

function startTimer() {
  if (timer) {
    clearInterval(timer); 
  }

  document.getElementById("time").textContent = timeLeft;

  timer = setInterval(function () {
    if (!isPaused) {
      timeLeft--;
      document.getElementById("time").textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }
  }, 1000);
}

function loadQuestion() {
  clearInterval(timer);

  const questionData = quizData[currentQuestionIndex];
  document.getElementById("question").textContent = questionData.question;

  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = "";

  questionData.choices.forEach(function (choice) {
    const button = document.createElement("button");
    button.textContent = choice;
    button.className = "choice";
    button.onclick = function () {
      selectAnswer(button, choice);
    };
    choicesContainer.appendChild(button);
  });

  timeLeft = quizData[currentQuestionIndex].time;
  startTimer();
}

function selectAnswer(button, choice) {
  clearInterval(timer);

  const questionData = quizData[currentQuestionIndex];

  if (choice === questionData.correct) {
    score += 100;
    button.style.backgroundColor = "green";
    button.style.color = "white";
  } else {
    button.style.backgroundColor = "red";
    button.style.color = "white";
  }

  disableAllButtons();

  // Start və Stop düymələrini deaktiv edirik və stillərini dəyişirik
  const startButton = document.getElementById("start-btn");
  const stopButton = document.getElementById("stop-btn");

  startButton.disabled = true;
  stopButton.disabled = true;

  startButton.style.backgroundColor = "#613c3c";
  stopButton.style.backgroundColor = "#613c3c"; 

  startButton.style.color = "#ccc"; 
  stopButton.style.color = "#ccc"; 

  document.getElementById("next-btn").style.display = "inline-block";
  document.getElementById("next-btn").disabled = false;
}

function disableAllButtons() {
  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(function (button) {
    button.disabled = true;
    button.classList.add("disabled");
  });
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
    document.getElementById("next-btn").style.display = "none";

    // Start və Stop düymələrini yenidən aktiv edirik və orijinal stillərə qaytarırıq
    const startButton = document.getElementById("start-btn");
    const stopButton = document.getElementById("stop-btn");

    startButton.disabled = false;
    stopButton.disabled = false;

    startButton.style.backgroundColor = "";
    stopButton.style.backgroundColor = "";

    startButton.style.color = ""; 
    stopButton.style.color = ""; 
  } else {
    showResult();
  }
}

function stopQuiz() {
  isPaused = true;
  clearInterval(timer);
  document.getElementById("stop-btn").style.display = "none";
  document.getElementById("continue-btn").style.display = "inline-block";
}

function continueQuiz() {
  isPaused = false;
  document.getElementById("continue-btn").style.display = "none";
  document.getElementById("stop-btn").style.display = "inline-block";
  startTimer(); 
}

function showResult() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("result").style.display = "block";
  document.getElementById("score").textContent = `Siz ${score}/${
    quizData.length * 100
  } bal topladınız!`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  isPaused = false;

  document.getElementById("quiz").style.display = "block";
  document.getElementById("result").style.display = "none";
  document.getElementById("start-btn").style.display = "inline-block";
  document.getElementById("stop-btn").style.display = "none";
  document.getElementById("continue-btn").style.display = "none";
  document.getElementById("next-btn").style.display = "none";

  document.getElementById("choices").innerHTML = "";
  document.getElementById("question").textContent = "";
  document.getElementById("time").textContent = "10";
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("stop-btn").style.display = "none";
  document.getElementById("continue-btn").style.display = "none";
});
