const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
 
let currentQuestion = {}
let acceptingAnswers = true
let availableQuestions = []
let score = 0
let questionNumber = 0