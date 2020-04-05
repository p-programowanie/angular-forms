import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { UserFormShowComponent } from './components/user-form/user-form-show.component';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mt-5">
      <h2>Create new user</h2>
      <app-user-form-create (formChange)="formChange($event)"></app-user-form-create>

      <button (click)="register()" class="btn" [disabled]="!form?.valid"
        [ngClass]="{'btn-success': form?.valid, 'btn-secondary': !form?.valid}">Register</button>
    </div>

    <div class="container mt-5">
      <h2>Preview existing user</h2>
      <app-user-form-show [isReadonly]="true"></app-user-form-show>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild(UserFormShowComponent) previewForm!: UserFormShowComponent;

  form!: { valid: boolean, pristine: boolean, value: User };

  constructor() { }

  ngAfterViewInit() {
    this.previewForm.initForm({
      name: 'John',
      lastname: 'Green',
      email: 'john@example.com'
    });
  }

  formChange(value: { valid: boolean, pristine: boolean, value: User }) {
    this.form = value;
  }

  register() {
    alert(JSON.stringify(this.form.value));
  }
}
