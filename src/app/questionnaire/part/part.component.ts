import { Component, OnInit, Input } from '@angular/core';

import { QuestionPart } from '../../models/question.model';


@Component({
  selector: 'dl-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.css']
})
export class PartComponent implements OnInit {

  @Input() part: QuestionPart;

  constructor() { }

  ngOnInit() {
  }

}
