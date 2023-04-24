import { Component } from '@angular/core';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent {

  get resultados() {
    return this.endpointsService.resultados;
  }

  constructor(private endpointsService: EndpointsService) { }
}
