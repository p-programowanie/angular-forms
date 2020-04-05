import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-user-form-show',
  templateUrl: './user-form-show.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormShowComponent extends UserFormComponent {}
