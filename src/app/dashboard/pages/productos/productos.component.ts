import { Component, inject, signal } from '@angular/core';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { ProductoComponent } from '../../../shared/producto/producto.component';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductoComponent],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export default class ProductosComponent {

  productosService = inject(ProductoService);

  constructor(){
    this.productosService.productos();
  }
}
