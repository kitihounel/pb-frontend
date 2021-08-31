import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { ModalService } from 'src/app/modal/modal.service'
import { CrudTableViewConfig } from "src/app/shared/crud-table-view/crud-table-view.component"
import { environment as env } from 'src/environments/environment'
import { AuthService } from 'src/app/auth/auth.service'

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  tableConfig: CrudTableViewConfig = {
    indexColumn: {
      width: '5%'
    },
    actionsColumn: {
      width: '10%'
    },
    columnNames:  ['Name', 'Speciality', 'Number', 'Contact'],
    columnWidths: ['30%', '20%', '20%', '15%'],
    sortableColumns: new Set<number>([0, 1]),
    properties: ['name', 'speciality', 'number', 'contact'],
    data: [],
    showEmptyDatasetMessage: true
  }

  constructor(private modalService: ModalService, private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.http.get(`${env.apiUrl}/doctors`, {
      'headers': {
        'Authorization': `Bearer ${this.auth.user!.token}`
      }
    }).subscribe(
      (obj: any) => {
        this.tableConfig = { ...this.tableConfig, data: obj.data }
      },
      () => {
        const dialog = this.modalService.createInfoDialog('Error', ['Unable to retrieve doctors from server.'])
        dialog.afterClose().subscribe(() => this.tableConfig.data = [])
        dialog.open()
      }
    )
  }

  onPageChange($event: any) {
  } 
}
