export class Question {

  private _title: string;
  private _description: string;
  private _answer: string;

  constructor(title: string, description: string, answer: string) {
    this._title = title;
    this._description = description;
    this._answer = answer;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get answer(): string {
    return this._answer;
  }

}
