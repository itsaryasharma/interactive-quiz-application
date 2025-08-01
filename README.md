# INTERACTIVE QUIZ APPLICATION

**COMPANY:** CODETECH IT SOLUTIONS

**NAME:** ARYA KUMAR

**INTERN ID:** CT04DZ311

**DOMAIN:** FRONTEND WEB DEVELOPMENT

**DURATION:** 4 WEEKS

**MENTOR:** NEELA SANTOSH

---

## PROJECT DESCRIPTION

This Interactive Quiz Application was developed as part of my 4-week internship at CodeTech IT Solutions under the guidance of my mentor, Neela Santosh. The main goal of this project was to practically apply my understanding of frontend web development, including HTML, CSS, and JavaScript, by building a functional, dynamic, and user-friendly web application that tests the user’s knowledge through an interactive quiz.

The quiz allows users to answer multiple-choice questions one by one. Each question has four options, and the user selects an answer and submits it. After submission, instant feedback is given, and the user can then proceed to the next question. At the end of the quiz, the user sees a final score summary with a custom message depending on their performance and has the option to retake the quiz.

One key feature of this project is that the quiz questions are fetched in real-time from the **Open Trivia Database API**. This means that every time a user takes the quiz, they get a fresh set of questions. This dynamic feature helped me understand how to handle real API requests, work with JSON data, manage asynchronous operations using `async`/`await` and `.then()`, and handle possible errors during data fetching. I also implemented a proper loading state with a spinner animation that shows while the quiz is fetching new questions, as well as a friendly error state if the API call fails, giving the user an option to retry.

On the **HTML** side, I structured the quiz with clear sections: a quiz header, a progress bar that visually tracks how many questions the user has answered, the question container, dynamically generated answer buttons, feedback for each question, and score tracking. I learned how to use semantic HTML to make the structure clear and accessible.

The **CSS** provides a clean and modern look with responsive design so the quiz works well on both desktop and mobile devices. Special styles were added for states like when the quiz is loading, when there’s an error, and when the user is interacting with buttons. The keyframes for the loading spinner animation helped me understand how to add small interactive visuals that improve user experience.

The **JavaScript** is the core of this application. I created separate functions to handle each part of the quiz logic: fetching and transforming questions, decoding HTML entities from the API, shuffling the answer options so the correct answer appears randomly, loading the current question, handling the submit and next buttons, and showing the final results. I also learned how to manage state with variables like `currentQuestionIndex`, `score`, and `hasError`. Writing clear comments in the script helped me follow the logic and would help other developers too.

I also tested the app thoroughly to make sure it works as expected: the progress bar updates correctly, the user cannot submit without selecting an answer, and the final score calculation works accurately. I pushed all my code to **GitHub** with clear commits and removed any unnecessary `console.log` statements to keep the project clean and production-ready.

Through this project, I practiced how a real frontend developer thinks: planning the structure, designing the layout, handling real data, adding interactivity, and gracefully managing errors. I learned how even a simple app requires thinking through small details like event listeners, user feedback, and UI states. This has boosted my confidence to tackle more advanced frontend projects in the future.

---

## HOW TO RUN

1. Clone or download this repository.
2. Open the `index.html` file in any modern web browser.
3. Wait for the quiz to load questions from the Open Trivia Database API.
4. Select your answer for each question and submit it.
5. Move through all questions and see your final score and feedback at the end.
6. Click **Take Quiz Again** to restart the quiz anytime!

# OUTPUTS

 <img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/3b94a9a4-8906-4380-b772-ac70cfdf60ea" />

 <img width="1919" height="1070" alt="Image" src="https://github.com/user-attachments/assets/9a8d2f98-7228-4bfc-a8ac-5b3a90f1b377" />

 <img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/9bb8465f-eb42-423d-81be-b6037a34565a" />

 <img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/84661d63-d829-4db2-886d-af4b33982f16" />

 <img width="1916" height="1079" alt="Image" src="https://github.com/user-attachments/assets/b29dc1d7-198c-4d1c-bb62-2076185f241f" />

 <img width="1919" height="1079" alt="Image" src="https://github.com/user-attachments/assets/65b2ab75-6192-40fb-b8df-a606146f100e" />

 <img width="1919" height="1055" alt="Image" src="https://github.com/user-attachments/assets/1e72aa4e-3373-4e13-8833-ca6bdfb4b97c" />

**Thank you for reviewing my project!**
