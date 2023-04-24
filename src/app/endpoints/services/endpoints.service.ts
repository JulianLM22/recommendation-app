import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { General, Prediction } from '../interface/predictions.interface';
import { SearchComponent } from '../search/search.component';

@Injectable({
  providedIn: 'root',
})

export class EndpointsService{
  private servicioUrl: string = 'http://127.0.0.1:7000/predict';
  Searchcomponent: SearchComponent = new SearchComponent(this);
  private body = {
    user_id: String(this.Searchcomponent.buscar),
    item_id: Number(this.Searchcomponent._valor2)
  };
  private _historial: string[] = [];
  public resultados: Prediction[] = [];

  //Get para acceder a los valores del arreglo _historial
  get historial(): string[] {
    return [...this._historial];
  }

  //Importacion de HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarPorId(query: string) {
    query = query.trim();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      //Buscar también para que sirve esto
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.post<General>(`${this.servicioUrl}`, {user_id: "1130612809", item_id: 5}).subscribe((resp: any) => {
      console.log(resp.prediction);
      console.log(this.Searchcomponent._valor);
      this.resultados = resp.prediction;
      console.log(this.resultados);
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }

}
