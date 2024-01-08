import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  BUTTON_TYPE,
  COLOR_PALLETE,
} from 'src/app/interface/common-ui.interface';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title: string;
  @Input() disabled: boolean = false;
  @Input() spinner: boolean = false;
  @Input() debounceTime: number = 500;
  @Input() color: COLOR_PALLETE = COLOR_PALLETE.BLUE;
  @Output() onClick: EventEmitter<void> = new EventEmitter();

  BUTTON_TYPE = BUTTON_TYPE;
  COLOR_PALLETE = COLOR_PALLETE;

  onButtonClicked($event: Event) {
    $event.preventDefault();
    if (!this.disabled) {
      this.onClick.emit();
    }
  }
}
