import { Component, Input, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  @Input({ required: true }) image!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) price!: string;
  @Input({ required: true }) id!: string;
  @Input() favorito!: string;

  
  showStar = signal(true);
  storageService = inject(StorageService);

  ngOnInit(): void {
    this.showStar.set(!this.storageService.getExists(parseInt(this.id)));
  }
  constructor(){
  }

  status(status:boolean) {
    this.showStar.set(status);
    if(!status){
      this.storageService.addElement(parseInt(this.id));
    }else{
      this.storageService.removeElement(parseInt(this.id));
    }
  }

  formatPrecio(): string {
    const precio = parseFloat(this.price);
    if (isNaN(precio)) {
      return "Precio inválido";
    }
    const precioFormateado = precio.toFixed(2);
    return `$${precioFormateado}`;
  }
 
}
