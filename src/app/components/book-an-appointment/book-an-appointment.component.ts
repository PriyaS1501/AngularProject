import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/shared/services/global.service';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { regExFullName, regExEmail, regExContact } from 'src/app/shared/common-data/constants';


@Component({
  selector: 'app-book-an-appointment',
  templateUrl: './book-an-appointment.component.html',
  styleUrls: ['./book-an-appointment.component.css']
})
export class BookAnAppointmentComponent implements OnInit {
  bookappointment: any
  submitted: boolean = false
  tableName = "Appointments"
  tableName1 = "Centres"
  centresData: any


  addData(data: any) {

    const centreObj = {
      fname: data.fname,
      emailid: data.emailid,
      acontact: data.acontact,
      doa: data.doa,
      city: data.city,
      gender: data.gender,
      preferredcentre: data.preferredcentre,
      contactway: data.contactway,
      comment: data.comment
    }
    this.submitted = true
    this.service.addRecord(this.tableName, centreObj).subscribe(() => {
      alert("Appointment booked sucessfully, We will call you back shortly. Thank You!!")
      this.router.navigate(['/home'])
    })

  }

  constructor(private formBuilder: FormBuilder, private service: GlobalService, private router: Router) {
  }

  ngOnInit(): void {
    this.bookappointment = this.formBuilder.group(
      {
        fname: ['', [Validators.required, Validators.pattern(regExFullName)]],
        emailid: ['', [Validators.required, Validators.pattern(regExEmail)]],
        acontact: ['', [Validators.required, Validators.pattern(regExContact)]],
        doa: ['', [Validators.required]],
        city: ['', [Validators.required]],
        gender: ['', [Validators.required]],
        contactway: ['', [Validators.required]],
        preferredcentre: ['', [Validators.required]],
        comment: ['', [Validators.required]]
      })
    this.service.getRecords(this.tableName1).subscribe((res) => {
      this.centresData = res
    })
  }
}

