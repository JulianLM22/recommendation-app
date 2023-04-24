import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EndpointsService } from '../services/endpoints.service';
import { General, Prediction } from '../interface/predictions.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{

  @ViewChild('Buscar') Buscar!: ElementRef<HTMLInputElement>;
  @ViewChild('BuscarCan') BuscarCan!: ElementRef<HTMLInputElement>;


  private _historial: string[] = [];
  public resultados: Prediction[] = [];

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }
  // constructor(public endpointsService: EndpointsService) {

  // }

  // ngAfterViewInit(): void {
  //   this.valor = this.Buscar.nativeElement.value;
  //   this.valor2 = this.BuscarCan.nativeElement.value;
  // }
  public text = '';
  public text2 = '';
  private valor = '';
  private valor2 = '';

  buscar(){
    let servicioUrl: string = 'http://127.0.0.1:7000/predict';
    const body = {
      user_id: String(this.text),
      item_id: Number(this.text2)
    };
    this.text = this.Buscar.nativeElement.value;
    this.text2 = this.BuscarCan.nativeElement.value;

    const buscarPorId = (query : string) => {
      query = query.trim();

      if (!this._historial.includes(query)) {
            this._historial.unshift(query);
            this._historial = this._historial.splice(0, 10);
            //Buscar también para que sirve esto
            localStorage.setItem('historial', JSON.stringify(this._historial));
          }

      this.http.post<General>(`${servicioUrl}`, body).subscribe((resp: any) => {
        console.log(resp.prediction);
        console.log(this.text);
        this.resultados = resp.prediction;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
    }
    if(this.text!=='' && this.text2!==''){
      buscarPorId(this.text);
      this.Buscar.nativeElement.value = '';
      this.BuscarCan.nativeElement.value = '';
      // console.log(this._valor);
      // console.log(this.valor2);
    }


  }

//   get _valor(){
//     return this.valor;
//   }

//   get _valor2(){
//     return this.valor2;
//   }
// }
}
function buscarPorId(text: string) {
  throw new Error('Function not implemented.');
}

