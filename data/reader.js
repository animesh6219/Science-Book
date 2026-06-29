/* =================================
   js/reader.js
================================= */

let currentLesson = 0;
let currentTopic = 0;

let currentSentence = "";
let currentMeaning = "";
let currentTopics = [];

/* ==========================
   ELEMENTS
========================== */

const lessonScreen =
    document.getElementById(
        "lessonScreen"
    );

const homeScreen =
    document.getElementById(
        "homeScreen"
    );

const lessonTitle =
    document.getElementById(
        "lessonTitle"
    );

const topicTitle =
    document.getElementById(
        "topicTitle"
    );

const textContainer =
    document.getElementById(
        "textContainer"
    );

const topicImage =
    document.getElementById(
        "topicImage"
    );

const topicList =
    document.getElementById(
        "topicList"
    );

/* ==========================
   OPEN LESSON
========================== */

function openLesson(
    lessonIndex,
    topicIndex = 0
){

    currentLesson =
        lessonIndex;

    currentTopic =
        topicIndex;

    currentTopics =
        lessons[
            lessonIndex
        ].topics;

    homeScreen.classList.add(
        "hidden"
    );

    lessonScreen.classList.remove(
        "hidden"
    );

    lessonTitle.textContent =
        lessons[
            lessonIndex
        ].name;

    renderTopicList();

    loadTopic(
        currentTopic
    );
}

/* ==========================
   CLOSE LESSON
========================== */

function closeLesson(){

    stopSpeaking();

    lessonScreen.classList.add(
        "hidden"
    );

    homeScreen.classList.remove(
        "hidden"
    );

    updateAllLessonCards();
}

/* ==========================
   LOAD TOPIC
========================== */

function loadTopic(
    topicIndex
){

    currentTopic =
        topicIndex;

    const topic =
        currentTopics[
            topicIndex
        ];

    if(!topic){
        return;
    }

    currentSentence =
        topic.sentence;

    currentMeaning =
        topic.meaning;

    topicTitle.textContent =
        topic.title;

    renderSentence(
        currentSentence
    );

    if(topic.image){

        topicImage.src =
            topic.image;

        topicImage.classList.remove(
            "hidden"
        );

    }else{

        topicImage.classList.add(
            "hidden"
        );
    }

    saveCurrentPosition(
        currentLesson,
        currentTopic
    );

    updateReaderProgressBar();

    updateLessonCard(
        currentLesson
    );

    updateContinueReadingCard();

    highlightTopic();
}

/* ==========================
   RENDER SENTENCE
========================== */

function renderSentence(
    sentence
){

    textContainer.innerHTML =
        "";

    const words =
        sentence.split(" ");

    words.forEach(
        (word)=>{

            const span =
                document.createElement(
                    "span"
                );

            span.className =
                "word";

            span.textContent =
                word + " ";

            span.addEventListener(
                "click",
                function(e){

                    const clean =
                        word
                        .toLowerCase()
                        .replace(
                            /[.,!?]/g,
                            ""
                        );

                    speakWord(
                        span,
                        clean
                    );

                    showWordTooltip(
                        clean,
                        e.pageX,
                        e.pageY
                    );
                }
            );

            textContainer.appendChild(
                span
            );
        }
    );
}

/* ==========================
   TOPIC LIST
========================== */

function renderTopicList(){

    topicList.innerHTML =
        "";

    currentTopics.forEach(
        (
            topic,
            index
        )=>{

            const li =
                document.createElement(
                    "li"
                );

            li.textContent =
                topic.title;

            li.onclick =
                function(){

                    loadTopic(
                        index
                    );

                    closeToc();
                };

            topicList.appendChild(
                li
            );
        }
    );
}

/* ==========================
   ACTIVE TOPIC
========================== */

function highlightTopic(){

    const items =
        topicList.querySelectorAll(
            "li"
        );

    items.forEach(
        (item,index)=>{

            item.classList.toggle(
                "active",
                index ===
                currentTopic
            );
        }
    );
}

/* ==========================
   NEXT TOPIC
========================== */

function nextTopic(){

    if(
        currentTopic <
        currentTopics.length - 1
    ){

        loadTopic(
            currentTopic + 1
        );
    }
}

/* ==========================
   PREVIOUS TOPIC
========================== */

function previousTopic(){

    if(
        currentTopic > 0
    ){

        loadTopic(
            currentTopic - 1
        );
    }
}

/* ==========================
   READ CURRENT TOPIC
========================== */

function readCurrentLesson(){

    readSentence(
        currentSentence,
        currentMeaning
    );
}

/* ==========================
   TOPIC DRAWER
========================== */

function openToc(){

    document
        .getElementById(
            "tocPanel"
        )
        .classList.add(
            "open"
        );

    document
        .getElementById(
            "tocOverlay"
        )
        .classList.remove(
            "hidden"
        );
}

function closeToc(){

    document
        .getElementById(
            "tocPanel"
        )
        .classList.remove(
            "open"
        );

    document
        .getElementById(
            "tocOverlay"
        )
        .classList.add(
            "hidden"
        );
}

/* ==========================
   BUTTON EVENTS
========================== */

document
.getElementById(
    "backBtn"
)
.addEventListener(
    "click",
    closeLesson
);

document
.getElementById(
    "nextTopicBtn"
)
.addEventListener(
    "click",
    nextTopic
);

document
.getElementById(
    "prevTopicBtn"
)
.addEventListener(
    "click",
    previousTopic
);

document
.getElementById(
    "readBtn"
)
.addEventListener(
    "click",
    readCurrentLesson
);

document
.getElementById(
    "tocBtn"
)
.addEventListener(
    "click",
    openToc
);

document
.getElementById(
    "closeTocBtn"
)
.addEventListener(
    "click",
    closeToc
);

document
.getElementById(
    "tocOverlay"
)
.addEventListener(
    "click",
    closeToc
);