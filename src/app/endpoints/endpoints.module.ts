import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultsComponent } from './results/results.component';
import { SearchComponent } from './search/search.component';
import { HistoryComponent } from './history/history.component';

@NgModule({
  declarations: [
    ResultsComponent,
    SearchComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResultsComponent,
    SearchComponent,
    HistoryComponent
  ]
})

export class EndpointsModule { }
