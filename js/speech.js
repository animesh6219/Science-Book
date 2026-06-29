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

    if(!tooltip) return;

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

    if(!tooltip) return;

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
   SPEAK WORD
========================== */

function speakWord(
    element,
    word
){

    speak(
        word,
        "en-IN"
    );

    if(element){
        element.classList.add(
            "active"
        );

        setTimeout(()=>{
            element.classList.remove(
                "active"
            );
        }, 1000);
    }
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
                .add(
                    "active"
                );
        }

        speak(
            words[index],
            "en-IN",
            readNext
        );

        index++;
    }

    readNext();
}

/* ==========================
   INIT SPEECH
========================== */

function initSpeech(){
    // Initialize speech synthesis if needed
    if(!window.speechSynthesis){
        console.warn("Speech Synthesis not supported");
    }
}