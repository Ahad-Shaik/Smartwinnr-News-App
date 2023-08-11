import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsPageComponent } from './_components/news-page/news-page.component';
import { SecondPageComponent } from './_components/second-page/second-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/newspage', pathMatch: 'full' },
  { path: 'newspage', component: NewsPageComponent },
  { path: 'secondpage', component: SecondPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
