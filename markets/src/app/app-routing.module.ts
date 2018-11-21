import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromMarkets from './markets';

const routes: Routes = [
  {
    path: '',
    component: fromMarkets.UserComponent,
  },
  {
    path: 'markets',
    children: [
      {
        path: '',
        component: fromMarkets.PostListComponent,
      },
      {
        path: 'new',
        component: fromMarkets.PostNewComponent,
      },
      {
        path: ':post_id',
        component: fromMarkets.PostDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
