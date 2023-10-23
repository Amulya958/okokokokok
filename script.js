let questions = ["Hey hi , I am Health Guardian your friendly robot, I am here to take care of you , so what is your name?",
  "Have you been experiencing this symptom all day or at specific times?",
  "Are there any specific factors that might be affecting your sleep?",
  "Can you describe the nature of the pain? Is it throbbing, sharp, or dull?",
  "Have you noticed any triggers or patterns associated with your symptoms?",
  "Can you point to the location of the discomfort and describe its intensity?",
  "Are you experiencing specific symptoms like sneezing, runny nose, or itchy eyes?",
  "Is there something specific that's causing your anxiety, or is it a general feeling?",
  "Is the rash itchy or painful, and have you been exposed to any potential irritants?",
  "Is there a particular situation or time of day when these mood swings occur?"
];

let currentQuestionIndex = 0;
let patientResponses = [];
let recognition;

function goToSecondScreen() {
  window.location.href = 'second_screen.html';
}

function startSpeechRecognition() {
  recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition();
  recognition.lang = 'en-US';
  
  recognition.onresult = function(event) {
    const transcript = event.results[0][0].transcript;
    patientResponses.push(transcript);
    displayPatientResponse(transcript);
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      speakQuestion();
    } else {
      document.getElementById('centerLabel').textContent = "Thank you for sharing!";
    }
  };
  
  recognition.start();
}

function speakQuestion() {
  const speechSynthesis = window.speechSynthesis;
  const question = new SpeechSynthesisUtterance(questions[currentQuestionIndex]);
  question.lang = 'en-US';
  
  question.onend = function(event) {
    startSpeechRecognition();
  };
  
  speechSynthesis.speak(question);
}

function askQuestions() {
  document.getElementById('centerLabel').textContent = "Please listen to the questions and respond:";
  speakQuestion();
}

function startConversation() {
  currentQuestionIndex = 0;
  patientResponses = [];
  askQuestions();
}

function displayPatientResponse(response) {
  const belowCenterLabel = document.querySelector('.below-center-label');
  const responseElement = document.createElement('p');
  responseElement.textContent = `Patient: ${response}`;
  belowCenterLabel.appendChild(responseElement);
}