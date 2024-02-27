import { EmployeeapisService } from './../employeeapis.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeModel } from './emp-details.model';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {

  firstName:any;
  Surname:any;
  Email:any;
  Location:any;
  Salary:any;
  id:any;
  showAdd!:boolean;
  showUpdate!:boolean;

  @ViewChild ('empdetails') empdetailsForm:any;
  EmployeeDetails: EmployeeModel[] = [];

  constructor(
    private empservice: EmployeeapisService
  ) { }

  ngOnInit(): void {
    this.getDetails();
  }

  AddEmp(){
    this.empdetailsForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  Onsubmit(details:any){
    if(this.empdetailsForm.valid){
      this.empservice.OnPostMethod(details.value).subscribe((res:any)=>{
        if(res){
        console.log(res);
        alert("Employee Details Added Successfully");
        }
      });
      this.empdetailsForm.reset();
      window.location.reload();
    }
  }

  getDetails(){
    this.empservice.OngetMethod().subscribe(
      (res:any)=> {
        this.EmployeeDetails = res;
      }
    )
  }

  Edit(data:any){
    this.showUpdate = true;
    this.showAdd = false;
    if(data){
      this.id = data.id;
      this.Email = data.Email;
      this.firstName = data.firstName;
      this.Surname = data.Surname;
      this.Location = data.Location;
      this.Salary = data.Salary;
    }
  }

  Update(data:any){
    console.log(this.id);
    console.log("Updated Data", data.value)
    this.empservice.OnUpdateMethod(data.value, this.id).subscribe(
      (res) => {
        this.EmployeeDetails = res;
        alert("Employee Details Updated Successfully");
      }
    )
    window.location.reload();
  }

  Delete(data:any){
    this.empservice.OnDeleteMethod(data.id).subscribe(
      (res:any)=> {
        this.EmployeeDetails = res;
      }
    );
    alert("Are you sure?");
    window.location.reload();
  }
}
