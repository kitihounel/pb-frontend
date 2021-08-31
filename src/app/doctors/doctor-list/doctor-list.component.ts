import { Component, OnInit } from '@angular/core'
import { ModalService } from 'src/app/modal/modal.service'
import { CrudTableViewConfig } from "src/app/shared/crud-table-view/crud-table-view.component"

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  tableConfig: CrudTableViewConfig = {
    indexColumnWidth: '5%',
    actionsColumnWidth: '10%',
    columnNames: ['Name', 'Speciality', 'Number', 'Contact'],
    columnWidths: ['30%', '20%', '20%', '15%'],
    sortableColumns: new Set<number>(),
    properties: ['name', 'speciality', 'number', 'contact'],
    data: [],
    showEmptyDatasetMessage: true
  }

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  onPageChange($event: any) {
    console.log($event)
  } 
}
