import { Component, inject, signal } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { ProductoComponent } from '../../../shared/producto/producto.component';
import { StorageService } from '../../../services/storage.service';
import { Producto } from '../../../interfaces/req-response';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, ProductoComponent],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export default class FavoritosComponent {

  productosService = inject(ProductoService);
  storageService = inject(StorageService);

  convertir(dato:any){
    return Number(dato);
  }
}
