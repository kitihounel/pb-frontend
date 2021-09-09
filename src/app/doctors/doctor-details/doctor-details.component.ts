import { Component, Input, OnInit } from '@angular/core'
import { Doctor } from 'src/app/models/doctor'

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  @Input() data!: Doctor

  constructor() { }

  ngOnInit(): void {
  }
}
