import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductoService } from '../../../services/producto.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-detalles',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export default class DetallesComponent {

  private route = inject(ActivatedRoute);
  private productosService = inject(ProductoService);
  storageService = inject(StorageService);

  showStar = signal(true);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.showStar.set(!this.storageService.getExists(Number(id)));
    });

  }
  
  public detalle = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => this.productosService.getProductoById(id))
    )
  );

  status(status: boolean) {
    this.showStar.set(status);
    const detalleValue = this.detalle();
    if (detalleValue) {
      if (!status) {
        this.storageService.addElement(Number(detalleValue.id));
      } else {
        this.storageService.removeElement(Number(detalleValue.id));
      }
    }
  }
  
}
