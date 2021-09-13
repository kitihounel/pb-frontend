import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-doctor-form',
  templateUrl: './doctor-form.component.html',
  styleUrls: ['./doctor-form.component.css']
})
export class DoctorFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [ Validators.required ]),
    speciality: new FormControl('', [ Validators.required ]),
    medCouncilId: new FormControl('', [ Validators.required ]),
    phoneNumber: new FormControl('', [ Validators.required ])
  })

  constructor() {}

  ngOnInit(): void {}

}
