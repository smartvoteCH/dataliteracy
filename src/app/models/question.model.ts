export class QuestionModel implements Question {

  private _title: string;
  private _description: QuestionPart[];
  private _answer: string;


  static fromJSON(data: any) {
    const description = new Array<QuestionPart>();
    data.description.forEach((part) => {
      if (part['type']) {
        console.log('is typed', part['type']);
      } else if (typeof part === 'string') {
        description.push(new TextPart(part));
      }else {
        console.warn('can not parse part', part);
      }
    });
    return new QuestionModel(data.title, description, data.answer);
  }

  constructor(title: string, description: QuestionPart[], answer: string) {
    this._title = title;
    this._description = description;
    this._answer = answer;
  }

  get title(): string {
    return this._title;
  }

  get description(): QuestionPart[] {
    return this._description;
  }

  get answer(): string {
    return this._answer;
  }

}

export interface Question {
  title: string;
  description: QuestionPart[];
  answer: string;
}

export interface QuestionPart {
  type: string;
}

export class TextPart implements QuestionPart {
  private _text: string;

  constructor(text: string) {
    this._text = text;
  }

  get type() {
    return 'text';
  }

  get text() {
    return this._text;
  }
}
