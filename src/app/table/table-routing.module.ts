import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './table-component/table.component';

const routes: Routes = [
  {
    path: '',
    component: TableComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class TableRoutingModule { }
