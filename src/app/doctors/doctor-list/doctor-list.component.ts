import { Component, OnInit } from '@angular/core'
import { ModalService } from 'src/app/modal/modal.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.modalService.showPrompt('title', ['content'], (v) => {
      console.log('The user clicks', v)
    })
  }
}
