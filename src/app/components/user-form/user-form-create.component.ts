import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UserFormComponent } from './user-form.component';

@Component({
  selector: 'app-user-form-create',
  templateUrl: './user-form-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormCreateComponent extends UserFormComponent {}
