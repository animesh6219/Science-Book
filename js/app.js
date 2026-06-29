/* =================================
   js/app.js
================================= */

/*
    Main application controller.

    Responsibilities:
    - Show splash screen
    - Initialize modules
    - Restore state
    - Register global events
*/

/* ==========================
   ELEMENTS
========================== */

const splashScreen =
    document.getElementById(
        "splashScreen"
    );

const homeScreen =
    document.getElementById(
        "homeScreen"
    );

const loader =
    document.getElementById(
        "loader"
    );

/* ==========================
   LOADER
========================== */

function showLoader(){

    if(loader){
        loader.classList.remove(
            "hidden"
        );
    }
}

function hideLoader(){

    if(loader){
        loader.classList.add(
            "hidden"
        );
    }
}

/* ==========================
   SPLASH SCREEN
========================== */

function hideSplash(){

    splashScreen.style.opacity =
        "0";

    splashScreen.style.transition =
        "opacity .5s";

    setTimeout(()=>{

        splashScreen.style.display =
            "none";

        homeScreen.classList.remove(
            "hidden"
        );

    },500);
}

/* ==========================
   RESTORE APP STATE
========================== */

function restoreState(){

    try {
        updateContinueReadingCard();
        updateAllLessonCards();
    } catch(e) {
        console.error("Error restoring state:", e);
    }
}

/* ==========================
   START APPLICATION
========================== */

function startApp(){

    try {
        // Initialize all modules
        initHome();
        restoreState();

        // Hide splash screen after initialization
        setTimeout(()=>{
            hideLoader();
            hideSplash();
        }, 500);

    } catch(e) {
        console.error("Application startup error:", e);
        // Still hide splash even if there's an error
        setTimeout(() => {
            hideLoader();
            hideSplash();
        }, 500);
    }
}

/* ==========================
   KEYBOARD SHORTCUTS
========================== */

document.addEventListener(
    "keydown",
    function(e){

        /*
            Escape
        */

        if(
            e.key === "Escape"
        ){

            closeToc();

            stopSpeaking();
        }

        /*
            Arrow Right
        */

        if(
            typeof lessonScreen !== "undefined" &&
            !lessonScreen.classList
                .contains(
                    "hidden"
                )
        ){

            if(
                e.key ===
                "ArrowRight"
            ){
                nextTopic();
            }

            if(
                e.key ===
                "ArrowLeft"
            ){
                previousTopic();
            }

            if(
                e.key === " "
            ){

                e.preventDefault();

                readCurrentLesson();
            }
        }
    }
);

/* ==========================
   PAGE VISIBILITY
========================== */

document.addEventListener(
    "visibilitychange",
    function(){

        if(
            document.hidden
        ){

            stopSpeaking();
        }
    }
);

/* ==========================
   SAVE BEFORE EXIT
========================== */

window.addEventListener(
    "beforeunload",
    function(){

        if(
            typeof currentLesson !==
                "undefined" &&
            typeof currentTopic !==
                "undefined"
        ){

            saveCurrentPosition(
                currentLesson,
                currentTopic
            );
        }
    }
);

/* ==========================
   IMAGE FALLBACK
========================== */

document
.querySelectorAll("img")
.forEach(img=>{

    img.onerror =
        function(){

            this.classList.add(
                "hidden"
            );
        };
});

/* ==========================
   GLOBAL ERROR HANDLER
========================== */

window.addEventListener(
    "error",
    function(e){

        console.error(
            "Application Error:",
            e.error
        );
    }
);

/* ==========================
   START
========================== */

window.addEventListener(
    "load",
    startApp
);