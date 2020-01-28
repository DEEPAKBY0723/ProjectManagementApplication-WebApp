import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable} from 'rxjs';
import { UserComponent } from './user.component';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { Component, OnInit,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, NgForm } from '@angular/forms';
import {ServiceCall} from '../Service/ServiceCall';
import {UsersTable} from '../Models/User';
import {HttpClient,HttpHeaders,HttpHandler,HttpClientJsonpModule} from '@angular/common/http';
import {Subscription} from 'rxjs';
import * as _ from 'lodash';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import {NgModel} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';



describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let serviceCall:ServiceCall;
  let spy:any;
  let http:HttpClient;
  const userMockData=[{firstName: "likith", lastName: "Somesh", employeeId: "235659", projectId: null, taskId: null}]
  let serviceCallStub={
    ViewUserDetails:function(){
      return{
        subscribe:function(callback){
          callback([
          {firstName: "likith", lastName: "Somesh", employeeId: "235659", projectId: null, taskId: null}])
        }
      }
    }

  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserComponent ],
      imports:[FormsModule,ReactiveFormsModule,AgGridModule,HttpClientJsonpModule ],
      providers:[ServiceCall,HttpClient,HttpHandler,{provide:ServiceCall,useValue:serviceCallStub}],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();

  }));
 

// var userData:UsersTable;
 //userData.EmployeeId='100';
 //userData.FirstName='siva';
 //userData.LastName='uppalapati';
  


  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    //component.rowData.push(this.Userdata);
    //fixture.detectChanges();
    let observableData:any;
    //let observable = Observable.create(observer => {
     // setTimeout(() => {
       // let users = [
         // {username:"balwant.padwal",city:"pune"},
         // {username:"test",city:"mumbai"}]
    
        //observer.next(users); // This method same as resolve() method from Angular 1
        //console.log("am done");
        //observer.complete();//to show we are done with our processing
        // observer.error(new Error("error message"));
     // }, 2000);
      //observable.subscribe((data)=>{
        //servableData=data; // users array display
     // });
  });

  it('should create user component', () => {
    expect(component).toBeTruthy();
  });

  it('Data grid value to be undefined',() => { 
    
   // spyOn(component,'viewUserDetails').and.returnValue(null); 
    //spyOn(component,'ngOnInit').and.returnValue(null);
    component.viewUserDetails();
    expect(component.userDetails).toBeUndefined();
    
  //spy = spyOn(serviceCall,'ViewUserDetails').and.returnValue(observableData); 
  });
  
  it('should display values in the grid',() => { 
    
    spyOn(component,'viewUserDetails').and.returnValue(null); 
    spyOn(component,'ngOnInit').and.returnValue(null);
    component.viewUserDetails();
    component.userDetails=userMockData;
    expect(component).toBeTruthy();
    expect(component.userDetails.length > 0);
     
    
   });
 

 
  





});

