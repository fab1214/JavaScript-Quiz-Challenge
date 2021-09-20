var questions = [
    {
      title: "Inside which HTML element do we put the JavaScript?",
      choices: ["<js>", "<scripting>", "<script>", "<javascript>"],
      answer: "<script>",
    },
    {
      title: "Where is the correct place to insert a JavaScript?",
      choices: [
        "The <head> section",
        "The <body> section",
        "After the </html> section",
        "Both the <head> and <body> section are correct",
      ],
      answer: "The <body> section",
    },
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts",
    },
    {
      title: "How do you write 'Hello World!' in an alert box?",
      choices: [
        "alert('Hello World!')",
        "alertBox('Hello World!')",
        "msg('Hello World!')",
        "prompt('Hello World!')",
      ],
      answer: "alert('Hello World!')",
    },
    {
      title: "Arrays in Javascript can be used to store ____.",
      choices: [
        "numbers and strings",
        "other arrays",
        "booleans",
        "all of the above",
      ],
      answer: "all of the above",
    },
    {
      title: "How do you create a function in JavaScript?",
      choices: [
        "function = myFunction()",
        "function;myFunction()",
        "function myFunction()",
        "myFunction()",
      ],
      answer: "function = myFunction()",
    },
    {
      title:
        "A very useful tool for used during development and debugging for printing content to the debugger is:",
      choices: ["Javascript", "terminal", "for loops", "console.log"],
      answer: "console.log",
    },
    {
      title: "How do you call a function called 'thisFunction'?",
      choices: [
        "call thisFunction()",
        "function thisFunction()",
        "call function = thisFunction()",
        "thisFunction()",
      ],
      answer: "thisFunction()",
    },
    {
      title: "How does a FOR loop begin?",
      choices: [
        "for i = 0, i++",
        "for (i < 3; i = 0)",
        "for (i = 0; i < 3; i++)",
        "for i = 0 to i = 5",
      ],
      answer: "for (i = 0; i < 3; i++)",
    },
    {
      title: "|| is the ____ logical operator.",
      choices: ["AND", "NOT", "OR", "IF"],
      answer: "OR",
    },
  ];
  // Declared variables
  var score = 0;
  var questionIndex = 0;
  
  // Declared variables
  var currentTime = document.querySelector("#currentTime");
  var timer = document.querySelector("#startButton");
  var questionsText = document.querySelector("#questionsText");
  var container = document.querySelector("#container");
  
  //60 seconds for quiz +1
  var secondsLeft = 61;
  // Holds interval time
  var holdInterval = 0;
  // Holds penalty time
  var penalty = 10;
  // Creates new element
  var ulEl = document.createElement("ul");
  
  // Triggertimer on button click, display on the screen
  timer.addEventListener("click", function () {
    // We are checking zero because its originally set to zero
    if (holdInterval === 0) {
      holdInterval = setInterval(function () {
        secondsLeft--;
        currentTime.textContent = "Time: " + secondsLeft;
  
        if (secondsLeft <= 0) {
          clearInterval(holdInterval);
          complete();
          currentTime.textContent = "Time is up!";
        }
      }, 1000);
    }
    render(questionIndex);
  });
  
  // Renders questions and choices to page:
  function render(questionIndex) {
    // Clears existing data
    questionsText.innerHTML = "";
    ulEl.innerHTML = "";
    // For loops to loop through all info in array
    for (var i = 0; i < questions.length; i++) {
      // Appends question title only
      var userQuestion = questions[questionIndex].title;
      // Appends question choices only
      var userChoices = questions[questionIndex].choices;
      questionsText.textContent = userQuestion;
    }
    // New for each for question choices in array
    userChoices.forEach(function (newChoices) {
      var listItem = document.createElement("li");
      listItem.textContent = newChoices;
      questionsText.appendChild(ulEl);
      ulEl.appendChild(listItem);
      listItem.addEventListener("click", compare);
    });
  }
  //compare choices with answer
  function compare(event) {
    var element = event.target;
  
    if (element.matches("li")) {
      var createDiv = document.createElement("div");
      createDiv.setAttribute("id", "createDiv");
      // Correct condition
      if (element.textContent == questions[questionIndex].answer) {
        score++;
        createDiv.textContent = "Correct!";
        // Correct condition
      } else {
        // Will deduct -10 (penalty var) seconds off for wrong answers
        secondsLeft = secondsLeft - penalty;
        createDiv.textContent =
          "Wrong! The correct answer is:  " + questions[questionIndex].answer;
      }
    }
    // Question Index determines number question user is on
    questionIndex++;
  
    if (questionIndex >= questions.length) {
      // quiz completeted will append last page with user stats
      complete();
      createDiv.textContent =
        "You have reached the end of the quiz." +
        " " +
        "You answered  " +
        score +
        " out of " +
        questions.length +
        " correct!";
    } else {
      render(questionIndex);
    }
    questionsText.appendChild(createDiv);
  }
  // quiz complete  will append last page
  function complete() {
    questionsText.innerHTML = "";
    currentTime.innerHTML = "";
  
    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "Quiz completed!";
  
    questionsText.appendChild(createH1);
  
    // Paragraph
    var endContent = document.createElement("p");
    endContent.setAttribute("id", "endContent");
  
    questionsText.appendChild(endContent);
  
    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
      var timeRemaining = secondsLeft;
      var endContent2 = document.createElement("p");
      clearInterval(holdInterval);
      endContent.textContent = "Your final score is: " + timeRemaining;
  
      questionsText.appendChild(endContent2);
    }
  
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";
  
    questionsText.appendChild(createLabel);
  
    // input info
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
  
    questionsText.appendChild(createInput);
  
    // submit info
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
  
    questionsText.appendChild(createSubmit);
  
    // Event listener to capture initials and save score to localStorage
    createSubmit.addEventListener("click", function () {
      var initials = createInput.value;
  
      if (initials === null) {
        console.log("No value entered. Please enter your intitials.");
      } else {
        var finalScore = {
          initials: initials,
          score: timeRemaining,
        };
        console.log(finalScore);
        var allScores = localStorage.getItem("allScores");
        if (allScores === null) {
          allScores = [];
        } else {
          allScores = JSON.parse(allScores);
        }
        allScores.push(finalScore);
        var newScore = JSON.stringify(allScores);
        localStorage.setItem("allScores", newScore);
        // Travels to final page
        window.location.replace("./highscore_page.html");
      }
    });
  }
  