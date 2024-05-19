import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly storageKey = 'favoritos';

  constructor() { }

  getExists(n:number){
    const lista = this.getList();
    const existe = lista.includes(n);
    return existe;
  }
  getList(): number[] {
    const list = localStorage.getItem(this.storageKey);
    return list ? JSON.parse(list) : [];
  }

  saveList(list: number[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(list));
  }

  addElement(element: number): void {
    let list = this.getList();
    list.push(element);
    this.saveList(list);
    Swal.fire({
      title: "Exito!",
      text: "Producto agregado a favoritos",
      icon: "success"
    });
  }

  removeElement(element: number): void {
    let list = this.getList();
    const index = list.indexOf(element);
    if (index !== -1) {
      list.splice(index, 1);
      if (list.length === 0) {
        localStorage.removeItem(this.storageKey);
      } else {
        this.saveList(list);
      }
      Swal.fire({
        title: "Retirado",
        text: "Producto retirado de favoritos",
        icon: "success"
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: "producto no encontrado",
        icon: "error"
      });
    }
  }
  
}
