import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { TutorServiceProvider } from '../../providers/tutor-service/tutor-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
  ],
  declarations: [Tab1Page],
  providers: [
    TutorServiceProvider,
    InputDialogServiceProvider
  ]
})
export class Tab1PageModule {}
