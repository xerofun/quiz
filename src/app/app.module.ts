import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { ResultsComponent } from './results/results.component';
import { GameService } from './game.service';


const appRoutes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'game', component: QuestionComponent},
  {path: 'results', component: ResultsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    ResultsComponent,
    MenuComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
