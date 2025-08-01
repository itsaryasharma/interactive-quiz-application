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

<img width="1918" height="1023" alt="Image" src="https://github.com/user-attachments/assets/03e6cce0-6829-43e9-948c-a19ddd567d41" />

<img width="1918" height="1012" alt="Image" src="https://github.com/user-attachments/assets/576ea3b6-2166-4e3d-972c-b9f941572d8e" />

<img width="1916" height="1022" alt="Image" src="https://github.com/user-attachments/assets/fd7a4120-90ce-4037-a886-b2fef1d296aa" />

<img width="1918" height="1021" alt="Image" src="https://github.com/user-attachments/assets/ba78e3b9-21ee-461e-bb2d-870d1936073b" />

<img width="1914" height="1020" alt="Image" src="https://github.com/user-attachments/assets/5b0e5ceb-1fe9-410d-bde8-2c7a1f07f6f1" />

<img width="1918" height="1021" alt="Image" src="https://github.com/user-attachments/assets/1132b79c-01c8-446c-b6b8-fc30a09e7620" />

<img width="1918" height="1001" alt="Image" src="https://github.com/user-attachments/assets/d0d5d7d5-2227-443e-a178-685fb13cba98" />

**Thank you for reviewing my project!**
