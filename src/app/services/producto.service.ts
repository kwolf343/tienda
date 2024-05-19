import { Injectable, computed, inject, signal } from '@angular/core';
import { Producto } from '../interfaces/req-response';
import { HttpClient } from '@angular/common/http';
import { environment } from '../utils/environment';
import { map } from 'rxjs';

interface State{
  productos: Producto[];
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private http = inject(HttpClient);

  #state = signal<State>({
    loading: true,
    productos: [],
  });

  public productos = computed(()=> this.#state().productos);
  public loading = computed(()=> this.#state().loading);
  
  constructor() {
    this.getProductos();
  }

  getProductos() {
    this.http.get<Producto[]>(`${environment.urlApi}/product.json`)
      .subscribe({
        next: res => {
          console.log('Solicitud exitosa');
          this.#state.set({ loading: false, productos: res });
        },
        error: err => {
          console.error('Error en la solicitud', err);
          this.#state.set({ loading: false, productos: [] });
        }
      });
  }
  
  getProductoById(id:string){
    return this.http.get<Producto>(`${environment.urlApi}/product/${id}.json`)
    .pipe(
      map(resp => resp)
    )
  }
}
