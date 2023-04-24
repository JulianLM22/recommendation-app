import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EndpointsService } from '../services/endpoints.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{

  @ViewChild('Buscar') Buscar!: ElementRef<HTMLInputElement>;
  @ViewChild('BuscarCan') BuscarCan!: ElementRef<HTMLInputElement>;

  constructor(public endpointsService: EndpointsService) {

  }

  // ngAfterViewInit(): void {
  //   this.valor = this.Buscar.nativeElement.value;
  //   this.valor2 = this.BuscarCan.nativeElement.value;
  // }

  private valor = '';
  private valor2 = '';

  buscar(){
    this.valor = this.Buscar.nativeElement.value;
    this.valor2 = this.BuscarCan.nativeElement.value;
    if(this.valor!=='' && this.valor2!==''){
      this.endpointsService.buscarPorId(this.valor);
      this.Buscar.nativeElement.value = '';
      this.BuscarCan.nativeElement.value = '';
      // console.log(this._valor);
      // console.log(this.valor2);
    }
  }

  get _valor(){
    return this.valor;
  }

  get _valor2(){
    return this.valor2;
  }
}
