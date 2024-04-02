let testData;

const questionsContainer = document.getElementById('questions');
const resultContainer = document.getElementById('result');

function generateQuestion(questionData, index) {
  const questionElement = document.createElement('div');
  questionElement.innerHTML = `<p>${index + 1}. ${questionData.question}</p>`;

  questionData.answers.forEach((answer, answerIndex) => {
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = `question${index}`;
    input.value = answerIndex;
    input.id = `q${index}a${answerIndex}`;
    questionElement.appendChild(input);

    const label = document.createElement('label');
    label.setAttribute('for', `q${index}a${answerIndex}`);
    label.innerHTML = answer.answer;
    questionElement.appendChild(label);
  });

  questionsContainer.appendChild(questionElement);
}

function calculateScore() {
  let score = 0;
  testData.questions.forEach((question, index) => {
    const selectedAnswerIndex = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedAnswerIndex !== null) {
      const selectedAnswer = testData.questions[index].answers[selectedAnswerIndex.value];
      if (selectedAnswer.isCorrect) {
        score++;
      }
    }
  });
  return score;
}

function submitTest() {
  const score = calculateScore();
  resultContainer.textContent = `Ваш результат: ${score} з ${testData.questions.length}`;
}

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    testData = data;
    testData.questions.forEach((question, index) => generateQuestion(question, index));
  })
  .catch(error => console.error('Помилка завантаження даних:', error));

