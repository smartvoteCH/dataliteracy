import { Smartspider } from './smartspider.model';
import { Chart } from './chart.model';

export class QuestionModel implements Question {

  private _title: string;
  private _description: QuestionPart[];
  private _answer: string;


  static fromJSON(data: any) {
    const description = new Array<QuestionPart>();
    data.description.forEach((part) => {
      if (part['type']) {
        if (part.type === 'smartspider') {
          description.push(new SmartspiderPart(<Smartspider>part.data));
        } else if (part.type === 'barchart') {
          description.push(new ChartPart(part.type, part.data));
        } else {
          console.log(`found unhandled type "${part['type']}"`);
        }
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

export class SmartspiderPart implements QuestionPart {
  private _spider: Smartspider;

  constructor(smartspider: Smartspider) {
    this._spider = smartspider;
  }
  get type(): string {
    return 'smartspider';
  }

  get smartspider(): Smartspider {
    return this._spider;
  }
}

export class ChartPart implements QuestionPart {
  private _type: string;
  private _chart: Chart;

  constructor(type: string, chart: Chart) {
    this._type = type;
    this._chart = chart;
  }

  get type(): string {
    return this._type;
  }

  get chart(): Chart {
    return this._chart;
  }
}
