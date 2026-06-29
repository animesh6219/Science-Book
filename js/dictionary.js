/* =================================
   data/dictionary.js
================================= */

/*
   English → Hindi Dictionary
   Add more words as needed.
*/

const dictionary = {

    // Greetings
    "hello":"नमस्ते",
    "hi":"नमस्ते",
    "welcome":"स्वागत",
    "good":"अच्छा",
    "morning":"सुबह",
    "night":"रात",

    // Education
    "education":"शिक्षा",
    "student":"विद्यार्थी",
    "students":"विद्यार्थी",
    "teacher":"शिक्षक",
    "teachers":"शिक्षक",
    "school":"विद्यालय",
    "classroom":"कक्षा",
    "lesson":"पाठ",
    "book":"पुस्तक",
    "science":"विज्ञान",
    "subject":"विषय",
    "chapter":"अध्याय",
    "knowledge":"ज्ञान",
    "learning":"सीखना",

    // Computer
    "computer":"कंप्यूटर",
    "mobile":"मोबाइल",
    "phone":"फ़ोन",
    "internet":"इंटरनेट",
    "website":"वेबसाइट",
    "application":"अनुप्रयोग",

    // Nature
    "tree":"पेड़",
    "trees":"पेड़",
    "plant":"पौधा",
    "plants":"पौधे",
    "flower":"फूल",
    "flowers":"फूल",
    "river":"नदी",
    "mountain":"पर्वत",
    "water":"पानी",
    "air":"वायु",
    "earth":"पृथ्वी",
    "sky":"आकाश",
    "sun":"सूर्य",
    "moon":"चन्द्रमा",
    "star":"तारा",

    // Science
    "matter":"पदार्थ",
    "energy":"ऊर्जा",
    "force":"बल",
    "motion":"गति",
    "light":"प्रकाश",
    "sound":"ध्वनि",
    "heat":"ऊष्मा",
    "atom":"परमाणु",
    "molecule":"अणु",
    "cell":"कोशिका",
    "tissue":"ऊतक",
    "organ":"अंग",
    "electricity":"विद्युत",
    "magnet":"चुम्बक",

    // Human Body
    "body":"शरीर",
    "head":"सिर",
    "eye":"आँख",
    "eyes":"आँखें",
    "ear":"कान",
    "ears":"कान",
    "nose":"नाक",
    "mouth":"मुख",
    "hand":"हाथ",
    "hands":"हाथ",
    "leg":"पैर",
    "legs":"पैर",
    "heart":"हृदय",
    "brain":"मस्तिष्क",

    // Animals
    "animal":"पशु",
    "animals":"पशु",
    "dog":"कुत्ता",
    "cat":"बिल्ली",
    "cow":"गाय",
    "horse":"घोड़ा",
    "bird":"पक्षी",
    "fish":"मछली",

    // Common Words
    "this":"यह",
    "that":"वह",
    "these":"ये",
    "those":"वे",
    "beautiful":"सुन्दर",
    "small":"छोटा",
    "big":"बड़ा",
    "new":"नया",
    "old":"पुराना",
    "every":"प्रत्येक",
    "many":"बहुत",
    "some":"कुछ",
    "all":"सभी",

    // Verbs
    "read":"पढ़ना",
    "reads":"पढ़ता है",
    "study":"अध्ययन करना",
    "learn":"सीखना",
    "teaches":"सिखाता है",
    "teach":"सिखाना",
    "write":"लिखना",
    "writes":"लिखता है",
    "speak":"बोलना",
    "speaks":"बोलता है",
    "play":"खेलना",
    "plays":"खेलता है",
    "eat":"खाना",
    "eats":"खाता है",
    "drink":"पीना",
    "drinks":"पीता है",
    "use":"उपयोग करना",
    "uses":"उपयोग करता है",
    "make":"बनाना",
    "makes":"बनाता है",

    // Pronouns
    "i":"मैं",
    "you":"तुम",
    "he":"वह",
    "she":"वह",
    "we":"हम",
    "they":"वे",
    "it":"यह",

    // Articles
    "a":"एक",
    "an":"एक",
    "the":"वह",

    // Misc
    "future":"भविष्य",
    "world":"दुनिया",
    "country":"देश",
    "village":"गाँव",
    "city":"शहर",
    "house":"घर",
    "family":"परिवार",
    "friend":"मित्र",
    "friends":"मित्र",
    "people":"लोग"
};

/* =================================
   Helper Function
================================= */

function getMeaning(word){

    if(!word) return "";

    const clean =
        word
        .toLowerCase()
        .replace(
            /[.,!?;:"'()]/g,
            ""
        );

    return (
        dictionary[clean] ||
        "Meaning not found"
    );
}