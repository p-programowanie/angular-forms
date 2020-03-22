import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserFormComponent {
  constructor(public controlContainer: ControlContainer) { }
}
