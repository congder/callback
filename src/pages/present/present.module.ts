import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PresentPage } from './present';

@NgModule({
  declarations: [
    PresentPage,
  ],
  imports: [
    IonicPageModule.forChild(PresentPage),
  ],
})
export class PresentPageModule {}
