import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'tab1',
        loadChildren: () => import('../tabs/tab1/tab1.module').then( m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tabs/tab2/tab2.module').then( m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tabs/tab3/tab3.module').then( m => m.Tab3PageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
