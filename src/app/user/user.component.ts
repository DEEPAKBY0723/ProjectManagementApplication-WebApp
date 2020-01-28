import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, NgForm } from '@angular/forms';
import {ServiceCall} from '../Service/ServiceCall';
import {UsersTable} from '../Models/User';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Subscription} from 'rxjs';
import * as _ from 'lodash';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  condition: boolean = false;
  public userDetails:any;
  
  columnDefs = [
    {headerName: 'Employee Id', field: 'employeeId',sortable: true,filter:true },
    {headerName: 'First Name', field: 'firstName',sortable: true,filter:true },
    {headerName: 'Last Name', field: 'lastName',sortable: true,filter:true}
    
];
 rowData:any[];
 angForm: FormGroup;
 result:any;
 formValues:any;
 apicallobj:ServiceCall;
 userModelarray:[UsersTable];
 testarray:[];
 public userModel:UsersTable;
 sub:Subscription=new Subscription();
 testValue:string="test";

constructor(private fb: FormBuilder,servicecallObj:ServiceCall,private http:HttpClient) {
    this.createForm();
    this.http=http;
  }
  

ngOnInit() {
this.viewUserDetails();
  }
  
  createForm() {
    this.angForm = this.fb.group({
       firstname: ['', Validators.required ],
       lastname: ['', Validators.required ],
       employeeId: ['', Validators.required ]
    });
  }

  myClickFunction(form:NgForm)
  {
    this.condition=true;
    this.userModel=new UsersTable();
    this.userModel.EmployeeId=this.angForm.get('employeeId').value;
    this.userModel.FirstName=this.angForm.get('firstname').value;
    this.userModel.LastName=this.angForm.get('lastname').value;
    this.apicallobj=new ServiceCall(this.http);
    this.apicallobj.AddUserDetails(this.userModel)
    .subscribe(data =>{
      this.result=data;
      this.DisplayAlert(this.result);
      this.viewUserDetails();
    });
    this.viewUserDetails();
  } 

  DisplayAlert(dataObj:any)
  {
    alert("User data added successfully")
  }

  viewUserDetails()
  {
    debugger;
    this.apicallobj=new ServiceCall(this.http);
    this.sub=this.apicallobj.ViewUserDetails()
      .subscribe(data =>{
        this.userDetails=data;
        console.log(this.userDetails);
        this.rowData =_.cloneDeep(this.userDetails);
        for(let i=0;i<this.userDetails.length;i++)
        {
         let  userob=new UsersTable();
         userob.EmployeeId=this.userDetails.employeeId;
         userob.FirstName=this.userDetails.firstName;
         userob.LastName=this.userDetails.lastName;
         this.userModelarray=_.cloneDeep(this.userModelarray);
         console.log(this.rowData);
       }
    });

  }
}
