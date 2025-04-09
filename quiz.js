const quizData = [
    {
        question: "Co to jest inflacja?",
        answers: {
            a: "Wzrost cen towarów i usług",
            b: "Spadek cen towarów i usług",
            c: "Stałość cen towarów i usług"
        },
        correctAnswer: "a"
    },
    {
        question: "Czym jest budżet osobisty?",
        answers: {
            a: "Plan wydatków firmy",
            b: "Plan przychodów i wydatków osobistych",
            c: "Rodzaj inwestycji"
        },
        correctAnswer: "b"
    },
    {
        question: "Co to jest stopa procentowa?",
        answers: {
            a: "Opłata za przechowywanie pieniędzy w banku",
            b: "Procent zysku z inwestycji",
            c: "Koszt pożyczenia pieniędzy wyrażony w procentach"
        },
        correctAnswer: "c"
    },
    {
        question: "Czym jest fundusz emerytalny?",
        answers: {
            a: "Rodzaj kredytu bankowego",
            b: "Program oszczędzania na emeryturę",
            c: "Forma ubezpieczenia na życie"
        },
        correctAnswer: "b"
    },
    {
        question: "Co to jest kapitalizacja odsetek?",
        answers: {
            a: "Dodawanie odsetek do kapitału",
            b: "Odejmowanie odsetek od kapitału",
            c: "Wypłacanie odsetek w gotówce"
        },
        correctAnswer: "a"
    },
    {
        question: "Czym jest dywersyfikacja portfela inwestycyjnego?",
        answers: {
            a: "Inwestowanie wszystkich środków w jeden rodzaj aktywów",
            b: "Rozłożenie inwestycji na różne rodzaje aktywów",
            c: "Sprzedaż wszystkich inwestycji"
        },
        correctAnswer: "b"
    },
    {
        question: "Co to jest zdolność kredytowa?",
        answers: {
            a: "Suma wszystkich kredytów danej osoby",
            b: "Zdolność banku do udzielania kredytów",
            c: "Zdolność osoby do spłaty zaciągniętego kredytu"
        },
        correctAnswer: "c"
    },
    {
        question: "Czym jest kryptowaluta?",
        answers: {
            a: "Rodzaj waluty papierowej",
            b: "Cyfrowa lub wirtualna waluta",
            c: "Waluta używana tylko w bankach"
        },
        correctAnswer: "b"
    },
    {
        question: "Co to jest płynność finansowa?",
        answers: {
            a: "Zdolność do regulowania bieżących zobowiązań",
            b: "Ilość gotówki w portfelu",
            c: "Szybkość przepływu pieniędzy w gospodarce"
        },
        correctAnswer: "a"
    },
    {
        question: "Czym jest obligacja?",
        answers: {
            a: "Rodzaj akcji spółki",
            b: "Papier wartościowy potwierdzający dług",
            c: "Forma ubezpieczenia majątkowego"
        },
        correctAnswer: "b"
    }
];

function buildQuiz() {
    const output = [];

    quizData.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        for(letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        output.push(
            `<div class="question">
                <p>${currentQuestion.question}</p>
                <div class="answers">${answers.join('')}</div>
            </div>`
        );
    });

    quizElement.innerHTML = output.join('');
}

function showResults() {
    const answerContainers = quizElement.querySelectorAll('.answers');
    let numCorrect = 0;

    quizData.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'green';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsElement.innerHTML = `${numCorrect} z ${quizData.length}`;
}

const quizElement = document.getElementById('quiz');
const resultsElement = document.getElementById('results');
const submitButton = document.getElementById('submit');

buildQuiz();

submitButton.addEventListener('click', showResults);
