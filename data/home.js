/* =================================
   js/home.js
================================= */

/*
    Handles:
    - Lesson cards
    - Continue reading card
    - Dark mode button
    - Opening lessons
*/

/* ==========================
   ELEMENTS
========================== */

const lessonGrid =
    document.getElementById(
        "lessonGrid"
    );

const continueBtn =
    document.getElementById(
        "continueBtn"
    );

const themeBtn =
    document.getElementById(
        "themeBtn"
    );

/* ==========================
   CREATE LESSON CARD
========================== */

function createLessonCard(
    lesson,
    index
){

    const percent =
        calculateProgress(
            index
        );

    const card =
        document.createElement(
            "div"
        );

    card.className =
        "lesson-card";

    card.dataset.index =
        index;

    card.innerHTML = `
        <div class="lesson-icon">
            ${lesson.icon}
        </div>

        <div class="lesson-title">
            ${lesson.name}
        </div>

        <div class="lesson-progress-text">
            ${percent}% Completed
        </div>

        <div class="progress">
            <div
                class="progress-bar"
                style="
                    width:${percent}%
                ">
            </div>
        </div>
    `;

    card.addEventListener(
        "click",
        function(){

            openLesson(
                index,
                getLessonProgress(
                    index
                ) + 1 > 0
                    ? getLessonProgress(
                        index
                      )
                    : 0
            );
        }
    );

    return card;
}

/* ==========================
   RENDER LESSONS
========================== */

function renderLessons(){

    lessonGrid.innerHTML =
        "";

    lessons.forEach(
        (
            lesson,
            index
        )=>{

            const card =
                createLessonCard(
                    lesson,
                    index
                );

            lessonGrid.appendChild(
                card
            );
        }
    );
}

/* ==========================
   CONTINUE READING
========================== */

function continueReading(){

    const data =
        getContinueReading();

    const lesson =
        lessons[
            data.lesson
        ];

    if(!lesson){

        alert(
            "No lesson found."
        );

        return;
    }

    openLesson(
        data.lesson,
        data.topic
    );
}

/* ==========================
   UPDATE CONTINUE CARD
========================== */

function updateContinueCard(){

    updateContinueReadingCard();
}

/* ==========================
   THEME
========================== */

function applyTheme(){

    const dark =
        getDarkMode();

    document.body
        .classList.toggle(
            "dark",
            dark
        );

    const icon =
        themeBtn.querySelector(
            ".material-icons"
        );

    if(icon){

        icon.textContent =
            dark
                ? "light_mode"
                : "dark_mode";
    }
}

function toggleTheme(){

    const enabled =
        !document.body
            .classList.contains(
                "dark"
            );

    document.body
        .classList.toggle(
            "dark"
        );

    saveDarkMode(
        enabled
    );

    applyTheme();
}

/* ==========================
   SEARCH (Future Ready)
========================== */

function searchLessons(
    keyword
){

    keyword =
        keyword
        .toLowerCase();

    document
        .querySelectorAll(
            ".lesson-card"
        )
        .forEach(card=>{

            const title =
                card
                .querySelector(
                    ".lesson-title"
                )
                .textContent
                .toLowerCase();

            card.style.display =
                title.includes(
                    keyword
                )
                    ? ""
                    : "none";
        });
}

/* ==========================
   EVENTS
========================== */

continueBtn
?.addEventListener(
    "click",
    continueReading
);

themeBtn
?.addEventListener(
    "click",
    toggleTheme
);

/* ==========================
   INIT
========================== */

function initHome(){

    renderLessons();

    applyTheme();

    updateContinueCard();
}