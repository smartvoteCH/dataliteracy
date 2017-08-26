import { Smartspider } from './smartspider.model';
import { Chart } from './chart.model';

export class QuestionModel implements Question {

  private _title: string;
  private _description: QuestionPart[];
  private _answer: QuestionPart[];
  private _buttonLabel: {open: string, closed: string};


  static fromJSON(data: any) {
    const description = this.questionPartFromJSON(data.description);
    const answer = this.questionPartFromJSON(data.answer);
    return new QuestionModel(data.title, description, answer, data.buttonLabel);
  }

  private static questionPartFromJSON(list: any): QuestionPart[] {
    const parts = new Array<QuestionPart>();
    if (!list) {
      return parts;
    }
    list.forEach((part) => {
      if (part['type']) {
        if (part.type === 'smartspider') {
          parts.push(new SmartspiderPart(<Smartspider>part.data));
        } else if (part.type === 'barchart' || part.type === 'piechart') {
          parts.push(new ChartPart(part.type, part.data));
        } else if (part.type === 'figure') {
          parts.push(new FigurePart(part));
        } else {
          console.log(`found unhandled type "${part['type']}"`);
        }
      } else if (typeof part === 'string') {
        parts.push(new TextPart(part));
      }else {
        console.warn('can not parse part', part);
      }
    });
    return parts;
  }

  constructor(title: string, description: QuestionPart[], answer: QuestionPart[], buttonLabel?: {open: string, closed: string}) {
    this._title = title;
    this._description = description;
    this._answer = answer;
    this._buttonLabel = buttonLabel || {open: 'Antwort verbergen', closed: 'Antwort anzeigen'};
  }

  get title(): string {
    return this._title;
  }

  get description(): QuestionPart[] {
    return this._description;
  }

  get answer(): QuestionPart[] {
    return this._answer;
  }

  get buttonLabel(): {open: string, closed: string} {
    return this._buttonLabel;
  }

}

export interface Question {
  title: string;
  description: QuestionPart[];
  answer: QuestionPart[];
  buttonLabel: {open: string, closed: string};
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

export class FigurePart implements QuestionPart {
  private _figure: any;

  constructor(figure: any) {
    this._figure = figure;
  }

  get type(): string {
    return 'figure';
  }

  get figure() {
    return this._figure;
  }
}
