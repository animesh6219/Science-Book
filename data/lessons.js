/* =================================
   data/lessons.js
================================= */

/*
   Structure:

   lesson
      └── topics
              ├── title
              ├── sentence
              ├── meaning
              └── image
*/

const lessons = [

/* ==========================
   LESSON 1
========================== */

{
    id:1,
    name:"Lesson 1",
    icon:"🌍",

    topics:[

        {
            title:"What is Science?",
            sentence:
                "Science is the study of the natural world around us.",

            meaning:
                "विज्ञान हमारे चारों ओर की प्राकृतिक दुनिया का अध्ययन है।",

            image:
                "images/science.jpg"
        },

        {
            title:"Observation",
            sentence:
                "Scientists carefully observe things to understand nature.",

            meaning:
                "वैज्ञानिक प्रकृति को समझने के लिए चीजों का ध्यानपूर्वक अवलोकन करते हैं।",

            image:
                "images/observation.jpg"
        },

        {
            title:"Experiment",
            sentence:
                "Experiments help scientists test their ideas.",

            meaning:
                "प्रयोग वैज्ञानिकों को अपने विचारों की जांच करने में सहायता करते हैं।",

            image:
                "images/experiment.jpg"
        }

    ]
},

/* ==========================
   LESSON 2
========================== */

{
    id:2,
    name:"Lesson 2",
    icon:"🌱",

    topics:[

        {
            title:"Living Things",
            sentence:
                "Plants and animals are living things.",

            meaning:
                "पौधे और जानवर सजीव वस्तुएँ हैं।",

            image:
                "images/living.jpg"
        },

        {
            title:"Plants",
            sentence:
                "Plants prepare their food with the help of sunlight.",

            meaning:
                "पौधे सूर्य के प्रकाश की सहायता से अपना भोजन बनाते हैं।",

            image:
                "images/plants.jpg"
        },

        {
            title:"Animals",
            sentence:
                "Animals depend on plants directly or indirectly for food.",

            meaning:
                "जानवर भोजन के लिए प्रत्यक्ष या अप्रत्यक्ष रूप से पौधों पर निर्भर करते हैं।",

            image:
                "images/animals.jpg"
        }

    ]
},

/* ==========================
   LESSON 3
========================== */

{
    id:3,
    name:"Lesson 3",
    icon:"💧",

    topics:[

        {
            title:"Water",
            sentence:
                "Water is essential for all living organisms.",

            meaning:
                "जल सभी जीवित प्राणियों के लिए आवश्यक है।",

            image:
                "images/water.jpg"
        },

        {
            title:"Uses of Water",
            sentence:
                "We use water for drinking cooking and washing.",

            meaning:
                "हम पीने, खाना बनाने और धोने के लिए जल का उपयोग करते हैं।",

            image:
                "images/uses_of_water.jpg"
        },

        {
            title:"Saving Water",
            sentence:
                "We should save water because it is precious.",

            meaning:
                "हमें पानी बचाना चाहिए क्योंकि यह बहुमूल्य है।",

            image:
                "images/save_water.jpg"
        }

    ]
},

/* ==========================
   LESSON 4
========================== */

{
    id:4,
    name:"Lesson 4",
    icon:"⚡",

    topics:[

        {
            title:"Energy",
            sentence:
                "Energy enables us to do work.",

            meaning:
                "ऊर्जा हमें कार्य करने में सक्षम बनाती है।",

            image:
                "images/energy.jpg"
        },

        {
            title:"Heat Energy",
            sentence:
                "Heat is a form of energy.",

            meaning:
                "ऊष्मा ऊर्जा का एक रूप है।",

            image:
                "images/heat.jpg"
        },

        {
            title:"Light Energy",
            sentence:
                "Sunlight is the major source of light energy.",

            meaning:
                "सूर्य का प्रकाश प्रकाश ऊर्जा का प्रमुख स्रोत है।",

            image:
                "images/light.jpg"
        }

    ]
},

/* ==========================
   LESSON 5
========================== */

{
    id:5,
    name:"Lesson 5",
    icon:"🪐",

    topics:[

        {
            title:"The Earth",
            sentence:
                "The Earth is our home planet.",

            meaning:
                "पृथ्वी हमारा गृह ग्रह है।",

            image:
                "images/earth.jpg"
        },

        {
            title:"The Moon",
            sentence:
                "The Moon moves around the Earth.",

            meaning:
                "चन्द्रमा पृथ्वी के चारों ओर घूमता है।",

            image:
                "images/moon.jpg"
        },

        {
            title:"The Solar System",
            sentence:
                "The Solar System consists of the Sun and eight planets.",

            meaning:
                "सौरमंडल सूर्य और आठ ग्रहों से मिलकर बना है।",

            image:
                "images/solar_system.jpg"
        }

    ]
}

];

/* =================================
   Helper Functions
================================= */

function getLesson(id){

    return lessons.find(
        lesson =>
            lesson.id === id
    );
}

function getTopic(
    lessonIndex,
    topicIndex
){

    return lessons[lessonIndex]
        ?.topics[topicIndex];
}

function getLessonCount(){

    return lessons.length;
}

function getTopicCount(
    lessonIndex
){

    return lessons[lessonIndex]
        ?.topics.length || 0;
}