import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTaskComponent } from './view-task.component';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceCall } from '../Service/ServiceCall';
import { HttpHandler,HttpClient } from '@angular/common/http';
import { Component, OnInit,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

describe('ViewTaskComponent', () => {
  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  const projectMockData=[{firstName: "likith", lastName: "Somesh", employeeId: "235659", projectId: null, taskId: null}]

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTaskComponent ],
      imports:[AgGridModule,MultiselectDropdownModule],
      providers:[MultiselectDropdownModule,ServiceCall,,HttpHandler,HttpClient],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
   // fixture.detectChanges();
  });
  //fit('should create view-task component', () => {
    //expect(component).toBeTruthy();
 // });
  
  //fit('Data grid value to be undefined',() => { 
   //component.getprojectNames();
    //expect(component.projectList).toBeUndefined();
  //});
  
  //it('should display values in the grid',() => { 
    //spyOn(component,'ngOnInit').and.returnValue(null);
    //component.getprojectNames();
    //component.projectList=projectMockData;
    //expect(component).toBeTruthy();
    //expect(component.getprojectNames.length > 0);
//   });
});
