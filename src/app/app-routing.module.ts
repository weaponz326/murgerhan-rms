import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth/auth.guard';

// TODO: implement guards with guard components
const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "settings",
    loadChildren: () => import("./pages/settings/settings.module").then(m => m.SettingsModule),
    canActivateChild: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
