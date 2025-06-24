import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  { path: '**', redirectTo: 'users' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
