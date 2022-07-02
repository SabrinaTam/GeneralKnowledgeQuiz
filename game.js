const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');

let currentQuestion = {}
let acceptingAnswers = true
let availableQuestions = []
let score = 0
let questionNumber = 0

let questions = [{
        question: 'What is the largest country in the world?',
        choice1: 'Russia',
        choice2: 'Antarctica',
        choice3: 'United States',
        choice4: 'China',
        answer: 1,
    },
    {
        question: "What does 'He' stand for on the periodic table?",
        choice1: "Holmium",
        choice2: "Hydrogen",
        choice3: "Helium",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "What was the name of Britney Spears' first single?",
        choice1: "Toxic",
        choice2: "Oops! I Did It Again",
        choice3: "Baby One More Time",
        choice4: "Crazy",
        answer: 3,
    },
    {
        question: "The Statue of Liberty was a gift to the United States from which European country?",
        choice1: "France",
        choice2: "Belgium",
        choice3: "Germany",
        choice4: "Spain",
        answer: 1,
    },
    {
        question: "The human body is made up of approximately how much water?",
        choice1: "80%",
        choice2: "50%",
        choice3: "75%",
        choice4: "60%",
        answer: 4,
    },
    {
        question: "Which artist famoulsy cut off his own ear?",
        choice1: "Pablo Picasso",
        choice2: "Vincent Van Gogh",
        choice3: "Claude Monet",
        choice4: "Salvador Dali",
        answer: 2,
    },
]

startGame = () => {
    questionNumber = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

const scorePoints = 10
const maximumQuestions = 6

getNewQuestion = function () {
    if (availableQuestions.length == 0 || questionNumber > maximumQuestions) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    ++questionNumber
    progressText.innerHTML = `Question ${questionNumber} out of ${maximumQuestions}`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerHTML = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerHTML = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(scorePoints)
        }

        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerHTML = score
}

startGame()