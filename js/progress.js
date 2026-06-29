/* =================================
   js/progress.js
================================= */

/*
    Handles:

    - Progress calculation
    - Progress bar updates
    - Lesson completion percentage
    - Home page card updates
*/

/* ==========================
   CALCULATE %
========================== */

function calculateProgress(
    lessonIndex
){

    const lesson =
        lessons[lessonIndex];

    if(!lesson){
        return 0;
    }

    const totalTopics =
        lesson.topics.length;

    if(totalTopics === 0){
        return 0;
    }

    const completedTopic =
        getLessonProgress(
            lessonIndex
        );

    if(completedTopic < 0){
        return 0;
    }

    return Math.round(
        (
            (completedTopic + 1)
            / totalTopics
        ) * 100
    );
}

/* ==========================
   IS LESSON COMPLETE
========================== */

function isLessonCompleted(
    lessonIndex
){

    return (
        calculateProgress(
            lessonIndex
        ) >= 100
    );
}

/* ==========================
   UPDATE READER BAR
========================== */

function updateReaderProgressBar(){

    const lesson =
        lessons[currentLesson];

    if(!lesson){
        return;
    }

    const total =
        lesson.topics.length;

    const percent =
        Math.round(
            (
                (currentTopic + 1)
                / total
            ) * 100
        );

    const bar =
        document.getElementById(
            "lessonProgressBar"
        );

    if(bar){
        bar.style.width =
            percent + "%";
    }
}

/* ==========================
   UPDATE HOME CARD
========================== */

function updateLessonCard(
    lessonIndex
){

    const card =
        document.querySelector(
            `.lesson-card[data-index="${lessonIndex}"]`
        );

    if(!card){
        return;
    }

    const percent =
        calculateProgress(
            lessonIndex
        );

    const progressBar =
        card.querySelector(
            ".progress-bar"
        );

    const progressText =
        card.querySelector(
            ".lesson-progress-text"
        );

    if(progressBar){
        progressBar.style.width =
            percent + "%";
    }

    if(progressText){

        progressText.textContent =
            percent +
            "% Completed";
    }
}

/* ==========================
   UPDATE ALL CARDS
========================== */

function updateAllLessonCards(){

    lessons.forEach(
        (_, index)=>{

            updateLessonCard(
                index
            );
        }
    );
}

/* ==========================
   SAVE AND UPDATE
========================== */

function saveProgressAndRefresh(){

    saveCurrentPosition(
        currentLesson,
        currentTopic
    );

    updateReaderProgressBar();

    updateLessonCard(
        currentLesson
    );

    updateContinueReadingCard();
}

/* ==========================
   CONTINUE CARD
========================== */

function updateContinueReadingCard(){

    const info =
        getContinueReading();

    const lesson =
        lessons[
            info.lesson
        ];

    const element =
        document.getElementById(
            "continueLesson"
        );

    if(!element){
        return;
    }

    if(!lesson){

        element.textContent =
            "No lesson opened yet.";

        return;
    }

    const topic =
        lesson.topics[
            info.topic
        ];

    if(!topic){

        element.textContent =
            lesson.name;

        return;
    }

    element.textContent =
        lesson.name +
        " • " +
        topic.title;
}

/* ==========================
   NEXT TOPIC %
========================== */

function getNextProgress(){

    const lesson =
        lessons[currentLesson];

    if(!lesson){
        return 0;
    }

    const total =
        lesson.topics.length;

    return Math.round(
        (
            (currentTopic + 2)
            / total
        ) * 100
    );
}

/* ==========================
   PREVIOUS TOPIC %
========================== */

function getPreviousProgress(){

    const lesson =
        lessons[currentLesson];

    if(!lesson){
        return 0;
    }

    const total =
        lesson.topics.length;

    return Math.round(
        (
            currentTopic
            / total
        ) * 100
    );
}

/* ==========================
   RESET LESSON
========================== */

function resetProgress(
    lessonIndex
){

    resetLessonProgress(
        lessonIndex
    );

    updateLessonCard(
        lessonIndex
    );

    updateContinueReadingCard();
}

/* ==========================
   RESET EVERYTHING
========================== */

function resetAllProgress(){

    lessons.forEach(
        (_, index)=>{

            resetLessonProgress(
                index
            );
        }
    );

    updateAllLessonCards();

    updateContinueReadingCard();
}