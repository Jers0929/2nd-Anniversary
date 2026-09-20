/* =========================================================
   ANNIVERSARY WEBSITE
   Cinematic Opening Experience
========================================================= */

const errorScreen = document.getElementById("error-screen");
const scanScreen = document.getElementById("scan-screen");
const revealScreen = document.getElementById("reveal-screen");
const story = document.getElementById("story");

const tryAgainBtn = document.getElementById("try-again-btn");
const enterStoryBtn = document.getElementById("enter-story-btn");
document.body.style.overflow = "hidden";
const replayBtn = document.getElementById("replay-btn");

const terminalLines = document.querySelectorAll(".terminal-line");
const terminalResult = document.querySelector(".terminal-result");

/* =========================================================
   BACKGROUND MUSIC
========================================================= */

const backgroundMusic = document.getElementById("background-music");
const storyButton = document.getElementById("begin-story-btn");

const normalMusicVolume = 0.5; // Normal volume: 50%
const videoMusicVolume = normalMusicVolume * 0.3; // 30% of normal

if (backgroundMusic) {
    backgroundMusic.volume = normalMusicVolume;
}

// Start music when "Our Story" is clicked
if (storyButton && backgroundMusic) {
    storyButton.addEventListener("click", async () => {
        try {
            backgroundMusic.volume = normalMusicVolume;
            await backgroundMusic.play();
            console.log("Background music is playing.");
        } catch (error) {
            console.error("Background music failed to play:", error);
        }
    });
}

// Lower music while any Chapter 04 video is playing
const chapterFourVideos = document.querySelectorAll("#memories video");

function updateMusicVolume() {
    const isVideoPlaying = Array.from(chapterFourVideos).some((video) => {
        return !video.paused && !video.ended;
    });

    if (backgroundMusic) {
    backgroundMusic.volume = isVideoPlaying
        ? videoMusicVolume
        : normalMusicVolume;
}
}
// Adjust music volume when videos play or stop
chapterFourVideos.forEach((video) => {
    // Keep background music from being interrupted on mobile
    video.muted = true;

    video.addEventListener("play", updateMusicVolume);
    video.addEventListener("pause", updateMusicVolume);
    video.addEventListener("ended", updateMusicVolume);
});

// Pause video when it is scrolled out of view
const videoVisibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            entry.target.pause();
        }
    });
}, {
    threshold: 0.25
});

chapterFourVideos.forEach((video) => {
    videoVisibilityObserver.observe(video);
});


/* =========================================================
   HELPER FUNCTIONS
========================================================= */

function wait(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}


function showElement(element) {
    element.classList.remove("hidden");
    element.classList.remove("fade-out");

    void element.offsetWidth;

    element.classList.add("fade-in");
}


async function hideElement(element) {
    element.classList.remove("fade-in");
    element.classList.add("fade-out");

    await wait(700);

    element.classList.add("hidden");
    element.classList.remove("fade-out");
}


function resetTerminal() {
    terminalLines.forEach(line => {
        line.classList.remove("show");
    });

    if (terminalResult) {
        terminalResult.classList.remove("show");
    }
}


/* =========================================================
   INITIAL STATE
========================================================= */

scanScreen.classList.add("hidden");
revealScreen.classList.add("hidden");
story.classList.add("hidden");

resetTerminal();


/* =========================================================
   TRY AGAIN
========================================================= */

tryAgainBtn.addEventListener("click", async () => {

    tryAgainBtn.disabled = true;

    /* Subtle glitch before disappearing */
    errorScreen.classList.add("glitch");

    await wait(600);

    errorScreen.classList.remove("glitch");

    /* Hide 404 */
    await hideElement(errorScreen);

    /* Reset terminal */
    resetTerminal();

    /* Show terminal */
    showElement(scanScreen);

    /* Give screen a moment to appear */
    await wait(700);


    /* =====================================================
       TERMINAL SEQUENCE
    ===================================================== */

    for (let i = 0; i < terminalLines.length; i++) {

        await wait(550);

        terminalLines[i].classList.add("show");
    }


    /* Wait after final line */
    await wait(700);


    /* Show final terminal message */
    if (terminalResult) {
        terminalResult.classList.add("show");
    }


    /* Let the user read it */
    await wait(1800);


    /* =====================================================
       MOVE TO REVEAL
    ===================================================== */

    await hideElement(scanScreen);

    showElement(revealScreen);
});

/* =========================================================
   ENTER OUR STORY
========================================================= */

enterStoryBtn.addEventListener("click", async () => {

    await hideElement(revealScreen);

    showElement(story);

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    document.body.style.overflow = "hidden";

});

const beginStoryBtn = document.getElementById("begin-story-btn");

beginStoryBtn.addEventListener("click", async () => {

    beginStoryBtn.disabled = true;

    const introSection = document.getElementById("intro");
    const chapterOne = document.getElementById("chapter-one");

    /* Fade out the intro */
    introSection.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 700,
            easing: "ease-in-out",
            fill: "forwards"
        }
    );

    await wait(700);

    /* Hide intro completely */
    introSection.style.display = "none";

    /* Start Chapter 01 at the top */
    window.scrollTo({
        top: chapterOne.offsetTop,
        behavior: "instant"
    });

    /* Allow scrolling */
    document.body.style.overflow = "auto";

    /* Prepare Chapter 01 */
    chapterOne.style.opacity = "0";

    /* Fade Chapter 01 in */
    chapterOne.animate(
        [
            { opacity: 0 },
            { opacity: 1 }
        ],
        {
            duration: 1000,
            easing: "ease-in-out",
            fill: "forwards"
        }
    );

    beginStoryBtn.disabled = false;

});

/* =========================================================
   CHAPTER 05 — QUIZ
========================================================= */

const quizContainer = document.getElementById("quiz-container");

if (quizContainer) {

    const quizQuestions = [
        {
            question: "When was our first photo booth together?",
            answers: [
                "August 16, 2024",
                "August 24, 2024",
                "September 29, 2024",
                "December 2024"
            ],
            correct: 1,
            message: "Of course you remember, love. ❤️"
        },
        {
            question: "What did we do on our first date as a couple?",
            answers: [
                "Went to the beach",
                "Watched a movie together",
                "Went on a road trip",
                "Had a video call"
            ],
            correct: 1,
            message: "One of our first dates, and a memory I'll always keep. ❤️"
        },
        {
            question: "After everything we've shared, what do I want most?",
            answers: [
                "More gifts",
                "More expensive dates",
                "To keep making memories with you",
                "More pictures together"
            ],
            correct: 2,
            message: "Yes, love. I want to keep making memories with you. ❤️"
        }
    ];

    let currentQuestion = 0;

    function showQuizQuestion() {

        const question = quizQuestions[currentQuestion];
        let attempts = 0;

        quizContainer.innerHTML = `
            <div class="quiz-question">

                <p class="moment-date">
                    QUESTION ${currentQuestion + 1} OF ${quizQuestions.length}
                </p>

                <h3>${question.question}</h3>

                <div class="quiz-answers">
                    ${question.answers.map((answer, index) => `
                        <button
                            class="quiz-answer"
                            data-index="${index}">
                            ${answer}
                        </button>
                    `).join("")}
                </div>

                <p class="quiz-feedback"></p>

                <button
                    class="quiz-next primary-button"
                    hidden>
                    ${currentQuestion === quizQuestions.length - 1
                        ? "Finish Quiz"
                        : "Next Question"}
                    <span>→</span>
                </button>

            </div>
        `;

        const answerButtons =
            quizContainer.querySelectorAll(".quiz-answer");

        const feedback =
            quizContainer.querySelector(".quiz-feedback");

        const nextButton =
            quizContainer.querySelector(".quiz-next");

        answerButtons.forEach(button => {

         button.addEventListener("click", () => {

    if (button.disabled) return;

    const selectedAnswer = Number(button.dataset.index);

    if (selectedAnswer === question.correct) {

        answerButtons.forEach(answerButton => {
            answerButton.disabled = true;
        });

        button.classList.add("correct");

        feedback.textContent = question.message;
        feedback.classList.remove("incorrect-feedback");
        feedback.classList.add("correct-feedback");

        nextButton.hidden = false;

    } else {

        attempts++;

        button.classList.add("incorrect");
        button.disabled = true;

        if (attempts === 1) {

            feedback.textContent =
                "Hehe, not that one, love. ❤️ Try one more time!";

            feedback.classList.remove("incorrect-feedback");
            feedback.classList.add("correct-feedback");

        } else {

            answerButtons.forEach(answerButton => {
                answerButton.disabled = true;
            });

            answerButtons[question.correct]
                .classList.add("correct");

            feedback.textContent =
                "Aww, that's okay, love. The correct answer is highlighted. ❤️";

            feedback.classList.remove("correct-feedback");
            feedback.classList.add("incorrect-feedback");

            nextButton.hidden = false;
        }
    }
});
        });

        nextButton.addEventListener("click", () => {

            if (currentQuestion < quizQuestions.length - 1) {

                currentQuestion++;
                showQuizQuestion();

           } else {

    quizContainer.innerHTML = `
        <div class="quiz-question">

            <p class="moment-date">
                QUIZ COMPLETED
            </p>

            <h3>You made it through our little quiz. ❤️</h3>

            <p class="quiz-feedback correct-feedback">
                But the best part of our story
                is that we still have so many memories to make.
            </p>

            <button class="primary-button" id="quiz-continue-btn">
                Continue
                <span>↓</span>
            </button>

        </div>
    `;

    const continueButton =
        document.getElementById("quiz-continue-btn");

    continueButton.addEventListener("click", () => {

        const nextChapter = document.getElementById("secret");

        if (nextChapter) {
            nextChapter.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });

}

        });

    }

    showQuizQuestion();
}

/* =========================================================
   CHAPTER 06 — SECRET VAULT
========================================================= */

const secretPassword = document.getElementById("secret-password");
const unlockBtn = document.getElementById("unlock-btn");
const passwordMessage = document.getElementById("password-message");
const secretLocked = document.getElementById("secret-locked");
const secretReveal = document.getElementById("secret-reveal");
const readLetterBtn = document.getElementById("read-letter-btn");

const secretCode = "092924";

// Number buttons
document.querySelectorAll(".keypad-button[data-key]").forEach((button) => {
    button.addEventListener("click", () => {
        secretPassword.value += button.dataset.key;
        passwordMessage.textContent = "";
    });
});

// Backspace button
const backspaceBtn = document.querySelector(
    '.keypad-button[data-action="backspace"]'
);

if (backspaceBtn) {
    backspaceBtn.addEventListener("click", () => {
        secretPassword.value = secretPassword.value.slice(0, -1);
        passwordMessage.textContent = "";
    });
}

// Unlock function
function unlockSecret() {
    if (secretPassword.value === secretCode) {
        secretLocked.classList.add("hidden");
        secretReveal.classList.remove("hidden");
    } else {
        passwordMessage.textContent = "Not quite, love. Try again. ❤️";
        secretPassword.value = "";
    }
}

unlockBtn.addEventListener("click", unlockSecret);

// Allow Enter key if using a physical keyboard
secretPassword.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        unlockSecret();
    }
});

// Read letter button
readLetterBtn.addEventListener("click", () => {
    const loveLetter = document.getElementById("love-letter");

    if (loveLetter) {
        loveLetter.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
});

/* =========================================================
   CHAPTER 07 — LOVE LETTER CONTINUE
========================================================= */

const letterContinueBtn =
    document.getElementById("letter-continue-btn");

if (letterContinueBtn) {
    letterContinueBtn.addEventListener("click", () => {

        const finalChapter = document.getElementById("final");

        if (finalChapter) {
            finalChapter.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }

    });
}
/* =========================================================
   REPLAY
========================================================= */

replayBtn.addEventListener("click", () => {

    const chapterOne = document.getElementById("chapter-one");

    if (chapterOne) {
        chapterOne.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

});

/* =========================================================
   CONSOLE EASTER EGG
========================================================= */

console.log(
    "%c❤️ You found something that wasn't supposed to be found.",
    "font-size: 16px; font-weight: bold;"
);

console.log(
    "%cSeptember 29, 2024 → September 29, 2026",
    "font-size: 13px;"
);