import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatGridListModule,
  MatDividerModule,
  MatListModule,
  MatRadioModule
} from '@angular/material';

import { GameComponent } from './game.component';
import { CommonModule } from '@angular/common';
import { GameService } from './game.service';

@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [GameService],
  bootstrap: [GameComponent]
})
export class GameModule {}
