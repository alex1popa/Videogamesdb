import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTableModule } from 'ng-zorro-antd/table';
import { TableRoutingModule } from './table-routing.module';
import { TableComponent } from './table-component/table.component';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    TableRoutingModule,
    NzTableModule,
    NzNotificationModule,
    NzPaginationModule,
    NzModalModule,
    NzIconModule
  ]
})
export class TableModule { }
