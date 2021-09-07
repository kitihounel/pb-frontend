import { Component, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'

import { ModalService } from 'src/app/modal/modal.service'
import CrudTableViewMetadata from "src/app/shared/crud-table-view/crud-table-view-metadata"
import { environment as env } from 'src/environments/environment'
import { AuthService } from 'src/app/auth/auth.service'
import Doctor from "src/app/models/doctor"

interface ApiResponse {
  data: Doctor[]
  currentPage: number
  from: number
  lastPage: number
  to: number
}

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  doctors = [] as Doctor[]
  currentPage = 1
  lastPage = 1

  tableMeta: CrudTableViewMetadata = {
    indexColumn: {
      width: '5%'
    },
    actionColumn: {
      width: '10%'
    },
    columns: {
      names: ['Name', 'Speciality', 'Number', 'Contact'],
      widths: ['25%', '25%', '20%', '15%'],
      sortable: new Set<number>([0, 1]),
    },
    properties: ['name', 'speciality', 'number', 'contact'],
    showEmptyDatasetMessage: true
  }

  constructor(
    private modalService: ModalService,
    private http: HttpClient,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchDoctors(this.getLastVisitedPage())
  }

  onPageChange(page: number) {
    this.fetchDoctors(page)
  }

  fetchDoctors(page: number) {
    this.doFetch(page.toString()).pipe(
      map(response => {
        if (page > response.lastPage)
          throw new Error('Invalid page')
        return response
      }),
      catchError(() => this.doFetch('1'))
    ).subscribe(
      response => {
        this.doctors = response.data
        this.setCurrentPage(response.currentPage)
        this.setLastPage(response.lastPage)
        this.storeLastPage(response.currentPage.toString())
      },
      () => {
        const dialog = this.modalService.createInfoDialog('Error', ['Unable to retrieve doctors from server.'])
        dialog.afterClose().subscribe(() => this.doctors = [])
        dialog.open()
      }
    )
  }

  setCurrentPage(page: number) {
    this.currentPage = page
  }

  setLastPage(page: number) {
    this.lastPage = page
  }

  storeLastPage(page: string) {
    localStorage.setItem('doctors:last-page', page)
  }

  getLastVisitedPage() {
    return parseInt(
      localStorage.getItem('doctors:last-page') || '1'
    )
  }

  onTableEvent(ev: any) {
    console.log('table event', ev)
  }

  private doFetch(page: string) {
    return this.http.get<ApiResponse>(`${env.apiUrl}/doctors`, {
      headers: {
        'Authorization': `Bearer ${this.auth.user!.token}`
      },
      params: { page }
    })
  }  
}
