import { Component, Input, OnInit } from '@angular/core';
import { Dictionary } from 'src/app/models/dictionary.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  @Input() categories!: Dictionary[];
  @Input() sizes!: Dictionary[];

  constructor() { }

  ngOnInit(): void {
  }

}
