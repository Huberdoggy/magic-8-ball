const answerArr = [
  'It is decidedly so.',
  'It is certain!',
  'Without a doubt.',
  'Yes, definitely.',
  'You may rely on it.',
  'As I see it, yes',
  'Most likely',
  'Outlook is good.',
  'Yes',
  'Signs point to yes.',
  'Reply hazy, try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again.',
  "Don't count on it",
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful',
];

const formEl = document.getElementById('question-box');
const responseEl = document.getElementById('question-response');
let questionArr = [];

function genRand() {
  return Math.floor(Math.random() * answerArr.length);
}

function renderResponses() {
  const qInput = document.getElementById('qInput');
  qInput.value = '';
  responseEl.replaceChildren();
  // eslint-disable-next-line no-restricted-syntax
  for (let question of questionArr) {
    let responsePara = document.createElement('div');
    responsePara.className = 'responses-para';
    let regex = /^(?!Most likely)([\w\s]+)?[no|not|don't|doubtful]([\w\s]+)?$/;
    if (question.response.match(regex)) {
      console.log(regex);
      responsePara.innerHTML = `<p>You asked: "${question.prevQuestion}"</p><br>
      <span>Magic Ball says:</span><p style='color: tomato'>${question.response}</p>`;
    } else {
      responsePara.innerHTML = `<p>You asked: "${question.prevQuestion}"</p><br>
      <span>Magic Ball says:</span><p style='color: lawngreen'>${question.response}</p>`;
    }
    responseEl.appendChild(responsePara); // similar to 'push'
    qInput.focus();
  }
}

if (formEl !== null) {
  formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(formEl);
    let theAnswer = answerArr[genRand()];
    const newQuestion = {
      question: formData.get('question'),
      response: theAnswer,
      prevQuestion: formData.get('question'), // for displaying in the answer div
    };
    if (newQuestion.question) {
      questionArr = [newQuestion]; // I only want to show the most recent
      // console.log(newQuestion.prevQuestion);
      renderResponses(); // Now, run func with their 'Question' in the array
    }
  });
}
