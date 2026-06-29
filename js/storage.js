/* =================================
   js/storage.js
================================= */

/*
    Wrapper around localStorage.

    Stores:
    - Last opened lesson
    - Last opened topic
    - Lesson progress
    - Dark mode state
*/

/* ==========================
   KEYS
========================== */

const STORAGE_KEYS = {
    LAST_LESSON : "science_last_lesson",
    LAST_TOPIC  : "science_last_topic",
    PROGRESS    : "science_progress",
    DARK_MODE   : "science_dark_mode"
};

/* ==========================
   GENERIC FUNCTIONS
========================== */

function saveData(key, value){

    try{

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }catch(e){

        console.error(
            "Storage save error:",
            e
        );
    }
}

function getData(
    key,
    defaultValue = null
){

    try{

        const value =
            localStorage.getItem(key);

        if(value === null){
            return defaultValue;
        }

        return JSON.parse(value);

    }catch(e){

        console.error(
            "Storage read error:",
            e
        );

        return defaultValue;
    }
}

function removeData(key){

    localStorage.removeItem(key);
}

/* ==========================
   LAST OPENED LESSON
========================== */

function saveLastLesson(
    lessonIndex
){

    saveData(
        STORAGE_KEYS.LAST_LESSON,
        lessonIndex
    );
}

function getLastLesson(){

    return getData(
        STORAGE_KEYS.LAST_LESSON,
        0
    );
}

/* ==========================
   LAST OPENED TOPIC
========================== */

function saveLastTopic(
    topicIndex
){

    saveData(
        STORAGE_KEYS.LAST_TOPIC,
        topicIndex
    );
}

function getLastTopic(){

    return getData(
        STORAGE_KEYS.LAST_TOPIC,
        0
    );
}

/* ==========================
   DARK MODE
========================== */

function saveDarkMode(
    enabled
){

    saveData(
        STORAGE_KEYS.DARK_MODE,
        enabled
    );
}

function getDarkMode(){

    return getData(
        STORAGE_KEYS.DARK_MODE,
        false
    );
}

/* ==========================
   LESSON PROGRESS
========================== */

/*
Example:

{
   "0":2,
   "1":5,
   "2":1
}

Means:

Lesson 0 -> topic 2 completed
Lesson 1 -> topic 5 completed
Lesson 2 -> topic 1 completed
*/

function getProgressObject(){

    return getData(
        STORAGE_KEYS.PROGRESS,
        {}
    );
}

function saveProgressObject(
    progress
){

    saveData(
        STORAGE_KEYS.PROGRESS,
        progress
    );
}

/* ==========================
   SAVE PROGRESS
========================== */

function saveLessonProgress(
    lessonIndex,
    topicIndex
){

    const progress =
        getProgressObject();

    const oldTopic =
        progress[lessonIndex] ?? -1;

    /*
        Never decrease progress.
    */

    progress[lessonIndex] =
        Math.max(
            oldTopic,
            topicIndex
        );

    saveProgressObject(
        progress
    );
}

/* ==========================
   GET PROGRESS
========================== */

function getLessonProgress(
    lessonIndex
){

    const progress =
        getProgressObject();

    return (
        progress[lessonIndex] ?? -1
    );
}

/* ==========================
   RESET LESSON
========================== */

function resetLessonProgress(
    lessonIndex
){

    const progress =
        getProgressObject();

    delete progress[
        lessonIndex
    ];

    saveProgressObject(
        progress
    );
}

/* ==========================
   RESET EVERYTHING
========================== */

function clearAllAppData(){

    localStorage.removeItem(
        STORAGE_KEYS.LAST_LESSON
    );

    localStorage.removeItem(
        STORAGE_KEYS.LAST_TOPIC
    );

    localStorage.removeItem(
        STORAGE_KEYS.PROGRESS
    );

    localStorage.removeItem(
        STORAGE_KEYS.DARK_MODE
    );
}

/* ==========================
   CONTINUE READING
========================== */

function getContinueReading(){

    return {

        lesson :
            getLastLesson(),

        topic :
            getLastTopic()
    };
}

/* ==========================
   SAVE CURRENT POSITION
========================== */

function saveCurrentPosition(
    lessonIndex,
    topicIndex
){

    saveLastLesson(
        lessonIndex
    );

    saveLastTopic(
        topicIndex
    );

    saveLessonProgress(
        lessonIndex,
        topicIndex
    );
}