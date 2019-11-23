import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { FavoriteComponent } from './components/favorite/favorite.component';

const routes: Routes = [
  { path : "Home" , component : MainComponent },
//the option to move with selected favorited item and see it on home route
  { path: 'Home/:key', component: MainComponent },
  { path : "Favorite" , component : FavoriteComponent },
  { path : "" , redirectTo : "Home" , pathMatch : "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
