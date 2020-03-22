import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { User } from './../../models/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent implements OnInit, OnDestroy {
  @Output() formChange = new EventEmitter<FormGroup>();
  @Input() initialValue!: User;

  userForm!: FormGroup;
  subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required]
    });

    this.subscriptions.push(this.userForm.valueChanges.subscribe(result => {
      this.formChange.emit(this.userForm);
    }));

    this.userForm.patchValue({
      firstname: this.initialValue.firstname || null,
      lastname: this.initialValue.lastname || null,
      email: this.initialValue.email || null,
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(e => !e.closed ? e.unsubscribe() : null);
  }
}
