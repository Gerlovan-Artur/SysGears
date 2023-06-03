const fs = require('fs');

function readSurveyConfig(filePath) {
  const config = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(config);
}

function traversePaths(currentQuestion, userAnswers, surveyConfig) {
  if (!surveyConfig[currentQuestion]) {
    return [userAnswers];
  }

  const questionOptions = surveyConfig[currentQuestion];
  const paths = [];

  for (const option in questionOptions) {
    const nextQuestion = questionOptions[option];
    const updatedUserAnswers = [...userAnswers, { [currentQuestion]: option }];
    const subPaths = traversePaths(nextQuestion, updatedUserAnswers, surveyConfig);
    paths.push(...subPaths);
  }

  return paths;
}

function runSurveyTest() {
  const surveyConfig = readSurveyConfig('surveyConfig.json');
  const startQuestion = Object.keys(surveyConfig)[0];
  const allPaths = traversePaths(startQuestion, [], surveyConfig);

  const result = {
    paths: {
      number: allPaths.length,
      list: allPaths,
    },
  };

  console.log(JSON.stringify(result));
}

runSurveyTest();