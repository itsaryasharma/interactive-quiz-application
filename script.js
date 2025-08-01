// ===============================
// Global Variables for Quiz State Management
// Purpose:  Track current question, selected answer, and score throughout the quiz
// Impact:   These variables maintain the quiz state and allow us to track progress
// ===============================
let currentQuestionIndex = 0;  // Tracks which question we're currently on
let selectedAnswer = null;     // Stores the user's selected answer
let score = 0;                // Keeps track of correct answers
let questions = [];           // Will store fetched questions from API
let isLoading = true;         // Track if we're loading questions
let hasError = false;         // Track if API fetch failed

// ===============================
// Function: fetchQuestionsFromAPI
// Purpose:  Fetches questions from Open Trivia Database API and transforms them
// Impact:   Populates the questions array with live data from the API
// ===============================
async function fetchQuestionsFromAPI() {
  try {
    // Show loading state
    showLoadingState();
    
    // Fetch questions from Open Trivia Database API
    const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
    
    // Check if the fetch was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Parse the JSON response
    const data = await response.json();
    
    // Check if the API returned results
    if (data.response_code !== 0) {
      throw new Error('API returned no results');
    }
    
    // Transform the API data to match our quiz format
    questions = transformAPIQuestions(data.results);
    
    // Hide loading and show quiz
    hideLoadingState();
    
    // Initialize the quiz with the fetched questions
    initializeQuiz();
    
  } catch (error) {
    console.error('Error fetching questions:', error);
    showErrorState(error.message);
  }
}

// ===============================
// Function: transformAPIQuestions
// Purpose:  Transforms API question format to our quiz app format
// Params:   apiQuestions (array) - raw questions from API
// Returns:  array of transformed questions
// Impact:   Converts API format to our expected format with shuffled options
// ===============================
function transformAPIQuestions(apiQuestions) {
  return apiQuestions.map((apiQuestion, index) => {
    // Decode HTML entities in question and answers
    const question = decodeHTMLEntities(apiQuestion.question);
    const correctAnswer = decodeHTMLEntities(apiQuestion.correct_answer);
    const incorrectAnswers = apiQuestion.incorrect_answers.map(answer => 
      decodeHTMLEntities(answer)
    );
    
    // Combine correct and incorrect answers
    const allAnswers = [correctAnswer, ...incorrectAnswers];
    
    // Shuffle the answers to randomize correct answer position
    const shuffledAnswers = shuffleArray(allAnswers);
    
    // Find the index of the correct answer in shuffled array
    const correctAnswerIndex = shuffledAnswers.indexOf(correctAnswer);
    
    // Convert index to letter (A=0, B=1, C=2, D=3)
    const correctAnswerLetter = String.fromCharCode(65 + correctAnswerIndex);
    
    // Create options object with A/B/C/D keys
    const options = {};
    shuffledAnswers.forEach((answer, idx) => {
      const letter = String.fromCharCode(65 + idx);
      options[letter] = answer;
    });
    
    return {
      question: question,
      options: options,
      correctAnswer: correctAnswerLetter
    };
  });
}

// ===============================
// Function: decodeHTMLEntities
// Purpose:  Decodes HTML entities like &amp;, &quot;, etc. to readable text
// Params:   text (string) - text with HTML entities
// Returns:  string with decoded HTML entities
// Impact:   Makes API text readable by converting HTML entities to normal characters
// ===============================
function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

// ===============================
// Function: shuffleArray
// Purpose:  Randomly shuffles the elements of an array
// Params:   array (array) - array to shuffle
// Returns:  new shuffled array
// Impact:   Ensures correct answer appears at random position
// ===============================
function shuffleArray(array) {
  const shuffled = [...array]; // Create a copy to avoid mutating original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

// ===============================
// Function: showLoadingState
// Purpose:  Shows loading message while fetching questions
// Impact:   Provides user feedback during API call
// ===============================
function showLoadingState() {
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
    <div class="loading-container">
      <h2>Loading Quiz Questions...</h2>
      <p>Please wait while we fetch fresh questions for you!</p>
      <div class="loading-spinner"></div>
    </div>
  `;
}

// ===============================
// Function: hideLoadingState
// Purpose:  Restores the original quiz HTML after loading
// Impact:   Shows the quiz interface once questions are loaded
// ===============================
function hideLoadingState() {
  // Restore the original quiz HTML structure
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
    <!-- Quiz Header -->
    <div class="quiz-header">
      <h1 class="quiz-title">Interactive Quiz</h1>
      <p class="quiz-subtitle">
        Test your knowledge with our interactive quiz!
      </p>
    </div>

    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress-fill" id="progressFill"></div>
    </div>

    <!-- Question Container -->
    <div class="question-container">
      <p class="question-text" id="questionText">
        Loading question...
      </p>
    </div>

    <!-- Answer Options Container -->
    <div class="answer-options" id="answerOptions">
      <!-- Options will be loaded dynamically -->
    </div>

    <!-- Submit Button -->
    <button class="submit-button" id="submitButton">Submit Answer</button>

    <!-- Next Question Button (initially hidden) -->
    <button class="next-button" id="nextButton" style="display: none">
      Next Question
    </button>

    <!-- Feedback Container -->
    <div class="feedback-container" id="feedbackContainer">
      <div id="feedbackText"></div>
    </div>

    <!-- Score Display -->
    <div class="score-display" id="scoreDisplay">
      Score: <span id="currentScore">0</span> /
      <span id="totalQuestions">0</span>
    </div>
  `;
  
  // Re-attach event listeners after restoring HTML
  attachEventListeners();
}

// ===============================
// Function: showErrorState
// Purpose:  Shows error message when API fails
// Params:   errorMessage (string) - error message to display
// Impact:   Informs user about the error and disables quiz functionality
// ===============================
function showErrorState(errorMessage) {
  hasError = true;
  const quizContainer = document.querySelector('.quiz-container');
  quizContainer.innerHTML = `
    <div class="error-container">
      <h2>❌ Error Loading Quiz</h2>
      <p>Sorry, we couldn't load the quiz questions.</p>
      <p class="error-details">Error: ${errorMessage}</p>
      <button class="retry-button" onclick="location.reload()">Try Again</button>
    </div>
  `;
}

// ===============================
// Function: initializeQuiz
// Purpose:  Sets up the quiz with fetched questions
// Impact:   Initializes all quiz functionality with the API data
// ===============================
function initializeQuiz() {
  // Update the total questions display
  document.getElementById('totalQuestions').textContent = questions.length;
  
  // Initialize progress bar to 0% when page loads
  const progressFill = document.getElementById('progressFill');
  progressFill.style.width = '0%';
  
  // Load the first question
  loadQuestion(0);
}

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
  // We need to compare the selected answer text with the correct answer text
  const correctAnswerText = currentQuestion.options[currentQuestion.correctAnswer];
  const isCorrect = selectedAnswer === correctAnswerText;
  
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
    feedbackText.textContent = `Incorrect! The correct answer was: ${correctAnswerText}`;
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

  // Create and append a button for each option using the options object
  Object.entries(currentQuestion.options).forEach(([letter, optionText]) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    button.textContent = `${letter}) ${optionText}`;
    button.setAttribute('data-option', optionText);
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

// ===============================
// Function: attachEventListeners
// Purpose:  Attaches all necessary event listeners to quiz elements
// Impact:   Makes the quiz interactive by responding to user actions
// ===============================
function attachEventListeners() {
  // Get the submit button and add click event listener
  const submitButton = document.getElementById('submitButton');
  submitButton.addEventListener('click', handleSubmitAnswer);
  
  // Initially disable the submit button until an answer is selected
  submitButton.disabled = true;
  
  // Add click event listeners to answer options
  const answerOptions = document.getElementById('answerOptions');
  answerOptions.addEventListener('click', function(event) {
    // Check if the clicked element is an answer option button
    if (event.target.classList.contains('answer-option')) {
      // Get the selected answer from the button's data-option attribute
      const selectedOption = event.target.getAttribute('data-option');
      handleAnswerSelection(selectedOption, event);
    }
  });
}

// ===============================
// Event Listeners Setup
// Purpose:  Connect user interactions (clicks) to our functions
// Impact:   Makes the quiz interactive by responding to user actions
// ===============================
document.addEventListener('DOMContentLoaded', function() {
  // Start by fetching questions from the API
  fetchQuestionsFromAPI();
});

