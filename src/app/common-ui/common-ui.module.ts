import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [ButtonComponent],
  imports: [CommonModule, AngularMaterialModule],
  exports: [ButtonComponent],
})
export class CommonUiModule {}
