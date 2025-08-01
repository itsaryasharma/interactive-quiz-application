// Sample questions array for the quiz app
const questions = [
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Saturn", "Mars"],
    answer: "Jupiter"
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "JavaScript", "Java", "C++"],
    answer: "JavaScript"
  },
  {
    question: "What year did World War II end?",
    options: ["1943", "1944", "1945", "1946"],
    answer: "1945"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Ag", "Au", "Fe", "Cu"],
    answer: "Au"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Kyoto", "Osaka", "Tokyo", "Yokohama"],
    answer: "Tokyo"
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Osmium", "Oxygen", "Oganesson", "Osmium"],
    answer: "Oxygen"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    answer: "Pacific Ocean"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    answer: "William Shakespeare"
  },
  {
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    answer: "12"
  }
];

// ===============================


// Global Variables for Quiz State Management
// Purpose:  Track current question, selected answer, and score throughout the quiz
// Impact:   These variables maintain the quiz state and allow us to track progress
// ===============================
let currentQuestionIndex = 0;  // Tracks which question we're currently on
let selectedAnswer = null;     // Stores the user's selected answer
let score = 0;                // Keeps track of correct answers

// ===============================
// Function: handleAnswerSelection
// Purpose:  Handles when a user clicks on an answer option
// Params:   option (string) - the selected answer text
// Impact:   Updates the UI to show which answer is selected and stores the selection
// ===============================
function handleAnswerSelection(option, event) {
  // Remove 'selected' class from all answer options to reset the UI
  const allOptions = document.querySelectorAll('.answer-option');
  allOptions.forEach(btn => btn.classList.remove('selected'));
  
  // Add 'selected' class to the clicked button for visual feedback
  event.target.classList.add('selected');
  
  // Store the selected answer for later comparison
  selectedAnswer = option;
  
  // Enable the submit button since an answer is now selected
  const submitButton = document.getElementById('submitButton');
  submitButton.disabled = false;
}

// ===============================
// Function: handleSubmitAnswer
// Purpose:  Processes the submitted answer, compares with correct answer, and updates score
// Impact:   Shows feedback to user, updates score, and prepares for next question or quiz completion
// ===============================
function handleSubmitAnswer() {
  // Get the current question object
  const currentQuestion = questions[currentQuestionIndex];
  
  // Get the feedback container elements
  const feedbackContainer = document.getElementById('feedbackContainer');
  const feedbackText = document.getElementById('feedbackText');
  
  // Check if the selected answer matches the correct answer
  const isCorrect = selectedAnswer === currentQuestion.answer;
  
  // Update the score if the answer is correct
  if (isCorrect) {
    score++;
    // Update the score display in the UI
    document.getElementById('currentScore').textContent = score;
  }
  
  // Display feedback message to the user
  feedbackContainer.style.display = 'block';
  if (isCorrect) {
    feedbackContainer.className = 'feedback-container feedback-correct';
    feedbackText.textContent = 'Correct! Well done!';
  } else {
    feedbackContainer.className = 'feedback-container feedback-incorrect';
    feedbackText.textContent = `Incorrect! The correct answer was: ${currentQuestion.answer}`;
  }
  
  // Disable the submit button to prevent multiple submissions
  const submitButton = document.getElementById('submitButton');
  submitButton.disabled = true;
  
  // Disable all answer options to prevent changing selection after submission
  const allOptions = document.querySelectorAll('.answer-option');
  allOptions.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'not-allowed';
  });
  
  // Update progress bar after answer submission
  // This moves the progress bar forward to show completion of current question
  const progressFill = document.getElementById('progressFill');
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressFill.style.width = progressPercentage + '%';
  
  // Check if this is the last question
  if (currentQuestionIndex === questions.length - 1) {
    // This is the last question - show quiz completion after a delay
    setTimeout(() => {
      showQuizCompletion();
    }, 1500); // 1.5 second delay before showing completion
  } else {
    // There are more questions - show next button after a short delay
    setTimeout(() => {
      showNextQuestionButton();
    }, 1000); // 1 second delay before showing next button
  }
}

// ===============================
// Function: showNextQuestionButton
// Purpose:  Shows the "Next Question" button and sets up event listener for it
// Impact:   Allows user to proceed to the next question when ready
// ===============================
function showNextQuestionButton() {
  const nextButton = document.getElementById('nextButton');
  const submitButton = document.getElementById('submitButton');
  
  // Hide submit button and show next button
  submitButton.style.display = 'none';
  nextButton.style.display = 'block';
  nextButton.disabled = false;
  
  // Add event listener for next button (only add once)
  if (!nextButton.hasEventListener) {
    nextButton.addEventListener('click', handleNextQuestion);
    nextButton.hasEventListener = true; // Flag to prevent multiple listeners
  }
}

// ===============================
// Function: handleNextQuestion
// Purpose:  Moves to the next question and resets the UI for the new question
// Impact:   Loads the next question and resets all interactive elements
// ===============================
function handleNextQuestion() {
  // Increment the question index to move to next question
  currentQuestionIndex++;
  
  // Load the next question
  loadQuestion(currentQuestionIndex);
  
  // Hide the next button and show submit button again
  const nextButton = document.getElementById('nextButton');
  const submitButton = document.getElementById('submitButton');
  
  nextButton.style.display = 'none';
  submitButton.style.display = 'block';
  submitButton.disabled = true; // Disable until user selects an answer
}

// ===============================
// Function: showQuizCompletion
// Purpose:  Hides quiz content and displays final score summary when quiz is complete
// Impact:   Shows completion message, final score, and disables all interactive elements
// ===============================
function showQuizCompletion() {
  // Get all the quiz content elements
  const quizContainer = document.querySelector('.quiz-container');
  const questionContainer = document.querySelector('.question-container');
  const answerOptions = document.getElementById('answerOptions');
  const submitButton = document.getElementById('submitButton');
  const nextButton = document.getElementById('nextButton');
  const feedbackContainer = document.getElementById('feedbackContainer');
  
  // Calculate final score percentage
  const scorePercentage = Math.round((score / questions.length) * 100);
  
  // Create completion message based on performance
  let completionMessage = '';
  if (scorePercentage >= 80) {
    completionMessage = 'Excellent! You\'re a quiz master! 🎉';
  } else if (scorePercentage >= 60) {
    completionMessage = 'Good job! You did well! 👍';
  } else if (scorePercentage >= 40) {
    completionMessage = 'Not bad! Keep practicing! 💪';
  } else {
    completionMessage = 'Keep studying! You\'ll get better! 📚';
  }
  
  // Hide all quiz content
  questionContainer.style.display = 'none';
  answerOptions.style.display = 'none';
  submitButton.style.display = 'none';
  nextButton.style.display = 'none';
  feedbackContainer.style.display = 'none';
  
  // Create and display completion content
  const completionHTML = `
    <div class="completion-container">
      <h2 class="completion-title">🎉 Quiz Complete! 🎉</h2>
      <div class="final-score">
        <h3>Your Final Score</h3>
        <div class="score-display-large">
          ${score} / ${questions.length} (${scorePercentage}%)
        </div>
      </div>
      <p class="completion-message">${completionMessage}</p>
      <button class="restart-button" onclick="restartQuiz()">Take Quiz Again</button>
    </div>
  `;
  
  // Replace quiz content with completion message
  quizContainer.innerHTML = completionHTML;
  
  // Ensure progress bar is at 100%
  const progressFill = document.getElementById('progressFill');
  if (progressFill) {
    progressFill.style.width = '100%';
  }
}

// ===============================
// Function: restartQuiz
// Purpose:  Resets the quiz to start over from the beginning
// Impact:   Reloads the page to restart the quiz with fresh state
// ===============================
function restartQuiz() {
  // Reload the page to restart the quiz
  window.location.reload();
}

// ===============================
// Event Listeners Setup
// Purpose:  Connect user interactions (clicks) to our functions
// Impact:   Makes the quiz interactive by responding to user actions
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  // Get the submit button and add click event listener
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', handleSubmitAnswer);
  
  // Initially disable the submit button until an answer is selected
  submitButton.disabled = true;
  
  // Update the total questions display
  document.getElementById('totalQuestions').textContent = questions.length;
  
  // Initialize progress bar to 0% when page loads
  const progressFill = document.getElementById('progressFill');
  progressFill.style.width = '0%';
  
  // Add click event listeners to answer options
  // We'll add these dynamically when questions are loaded
  const answerOptions = document.getElementById('answerOptions');
  answerOptions.addEventListener('click', function(event) {
    // Check if the clicked element is an answer option button
    if (event.target.classList.contains('answer-option')) {
      // Get the selected answer from the button's data-option attribute
      const selectedOption = event.target.getAttribute('data-option');
      handleAnswerSelection(selectedOption, event);
    }
  });

  // ===============================
// How to call loadQuestion for the first question:
// ===============================
loadQuestion(0); // This will load and display the first question and its options

});




// ===============================
// Function: loadQuestion
// Purpose:  Loads and displays a specific question with its options
// Params:   questionIndex (number) - the index of the question to load
// Impact:   Updates the UI with new question content and resets interactive elements
// ===============================
function loadQuestion(questionIndex) {
  // Get the question object from the questions array
  const currentQuestion = questions[questionIndex];

  // Display the question text
  const questionTextElem = document.getElementById('questionText');
  questionTextElem.textContent = currentQuestion.question;

  // Display the options
  const answerOptionsElem = document.getElementById('answerOptions');
  // Clear any existing options
  answerOptionsElem.innerHTML = '';

  // Create and append a button for each option
  currentQuestion.options.forEach((option, idx) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.textContent = String.fromCharCode(65 + idx) + ') ' + option; // A) Option
    button.setAttribute('data-option', option);
    // Re-enable the button and reset cursor
    button.disabled = false;
    button.style.cursor = 'pointer';
    answerOptionsElem.appendChild(button);
  });

  // Clear previous feedback and hide feedback container
  const feedbackContainer = document.getElementById('feedbackContainer');
  const feedbackText = document.getElementById('feedbackText');
  if (feedbackContainer) {
    feedbackContainer.style.display = 'none';
    feedbackText.textContent = '';
  }
  
  // Reset selected answer for new question
  selectedAnswer = null;
  
  // Show submit button and hide next button
  const submitButton = document.getElementById('submitButton');
  const nextButton = document.getElementById('nextButton');
  
  submitButton.style.display = 'block';
  submitButton.disabled = true; // Disable until user selects an answer
  nextButton.style.display = 'none';
  
  // Update progress bar to show current question progress
  // Start at 0% for first question, then update after each submission
  const progressFill = document.getElementById('progressFill');
  const progressPercentage = (questionIndex / questions.length) * 100;
  progressFill.style.width = progressPercentage + '%';
}

