import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component'),
        children:[
            {
                path: 'productos',
                title: 'Productos',
                loadComponent: () => import('./dashboard/pages/productos/productos.component')
            },
            {
                path: 'favoritos',
                title: 'Favoritos',
                loadComponent: () => import('./dashboard/pages/favoritos/favoritos.component')
            },
            {
                path: 'detalles/:id',
                title: 'Ver detalle',
                loadComponent: () => import('./dashboard/pages/detalles/detalles.component')
            },
            {
                path: '',redirectTo: 'productos',pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        title: 'Ver detalle',
        loadComponent: () => import('./dashboard/pages/error/error.component')
    }
];
//{path:'**', component:ErrorPersonalizadoComponentComponent}