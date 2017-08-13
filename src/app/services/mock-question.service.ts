export class MockQuestionService {
  getQuestions(key: string) {
    return [
      {
        title: 'Question 1',
        description: 'Description 1',
        answer: 'Answer1'
      },
      {
        title: 'Question 2',
        description: 'Description 2',
        answer: 'Answer2'
      },
      {
        title: 'Question 3',
        description: 'Description 3',
        answer: 'Answer3'
      },
    ];
  }
}
