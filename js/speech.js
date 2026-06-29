/* =================================
   js/speech.js
================================= */

/*
    Handles:
    - Word pronunciation
    - Sentence reading
    - Hindi translation speaking
    - Highlighting words
    - Stop/Pause speech
*/

let currentUtterance = null;
let isSpeaking = false;

/* ==========================
   SPEAK FUNCTION
========================== */

function speak(
    text,
    lang = "en-IN",
    callback = null
){

    if(!text) return;

    speechSynthesis.cancel();

    currentUtterance =
        new SpeechSynthesisUtterance(
            text
        );

    currentUtterance.lang = lang;
    currentUtterance.rate = 0.9;
    currentUtterance.pitch = 1;
    currentUtterance.volume = 1;

    currentUtterance.onstart =
        function(){

            isSpeaking = true;
        };

    currentUtterance.onend =
        function(){

            isSpeaking = false;

            if(callback){
                callback();
            }
        };

    speechSynthesis.speak(
        currentUtterance
    );
}

/* ==========================
   STOP SPEAKING
========================== */

function stopSpeaking(){

    speechSynthesis.cancel();

    isSpeaking = false;
}

/* ==========================
   PAUSE
========================== */

function pauseSpeaking(){

    if(
        speechSynthesis.speaking
    ){
        speechSynthesis.pause();
    }
}

/* ==========================
   RESUME
========================== */

function resumeSpeaking(){

    if(
        speechSynthesis.paused
    ){
        speechSynthesis.resume();
    }
}

/* ==========================
   TOOLTIP
========================== */

function showSentenceTooltip(
    text
){

    const tooltip =
        document.getElementById(
            "sentenceTooltip"
        );

    tooltip.textContent =
        text;

    tooltip.classList.remove(
        "hidden"
    );

    setTimeout(()=>{

        tooltip.classList.add(
            "hidden"
        );

    },5000);
}

/* ==========================
   WORD TOOLTIP
========================== */

function showWordTooltip(
    word,
    x,
    y
){

    const tooltip =
        document.getElementById(
            "wordTooltip"
        );

    tooltip.textContent =
        getMeaning(word);

    tooltip.style.left =
        x + "px";

    tooltip.style.top =
        (y - 50) + "px";

    tooltip.classList.remove(
        "hidden"
    );

    setTimeout(()=>{

        tooltip.classList.add(
            "hidden"
        );

    },2500);
}

/* ==========================
   HIGHLIGHT HELPERS
========================== */

function clearHighlights(){

    document
        .querySelectorAll(
            ".word"
        )
        .forEach(word=>{

            word.classList.remove(
                "active"
            );

        });
}

/* ==========================
   READ SENTENCE
========================== */

function readSentence(
    sentence,
    meaning
){

    if(!sentence){
        return;
    }

    const words =
        sentence
            .split(" ");

    const wordElements =
        document.querySelectorAll(
            ".word"
        );

    let index = 0;

    function readNext(){

        if(
            index >=
            words.length
        ){

            clearHighlights();

            if(meaning){

                showSentenceTooltip(
                    meaning
                );

                speak(
                    meaning,
                    "hi-IN"
                );
            }

            return;
        }

        clearHighlights();

        if(
            wordElements[index]
        ){
            wordElements[index]
                .classList
                .add("active");
        }

        const word =
            words[index]
                .replace(
                    /[.,!?]/g,
                    ""
                );

        speak(
            word,
            "en-IN",
            function(){

                index++;
                readNext();

            }
        );
    }

    readNext();
}

/* ==========================
   SPEAK WORD
========================== */

function speakWord(
    element,
    word
){

    clearHighlights();

    element.classList.add(
        "active"
    );

    speak(
        word,
        "en-IN"
    );
}

/* ==========================
   AUTO READ CURRENT TOPIC
========================== */

function readCurrentTopic(){

    if(
        typeof currentSentence ===
        "undefined"
    ){
        return;
    }

    readSentence(
        currentSentence,
        currentMeaning
    );
}

/* ==========================
   CHECK SUPPORT
========================== */

function speechSupported(){

    return (
        "speechSynthesis"
        in window
    );
}

/* ==========================
   INIT
========================== */

function initSpeech(){

    if(
        !speechSupported()
    ){

        console.warn(
            "Speech synthesis is not supported on this device. Audio features disabled."
        );

        return;
    }

    console.log(
        "Speech engine ready."
    );
}
