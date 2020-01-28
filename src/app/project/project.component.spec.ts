import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ServiceCall } from '../Service/ServiceCall';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HttpClient,HttpHeaders,HttpHandler,HttpClientJsonpModule} from '@angular/common/http';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';
import { Component, OnInit,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  const managersMockData=[{firstName: "likith", lastName: "Somesh", employeeId: "235659", projectId: null, taskId: null}]
  const projectMockData=[{firstName: "likith", lastName: "Somesh", employeeId: "235659", projectId: null, taskId: null}]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectComponent ],
      imports:[FormsModule,ReactiveFormsModule,AgGridModule,MatDatepickerModule,MatFormFieldModule,MatInputModule,MatSliderModule],
      providers:[ServiceCall,HttpClient,HttpHandler,MatDatepickerModule,MatNativeDateModule,MatRippleModule,MatFormFieldModule,MatInputModule,MatSliderModule],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
   // fixture.detectChanges();
  });

  fit('should create project component', () => {
    expect(component).toBeTruthy();
  });
  fit('Data grid value to be undefined',() => { 
    component.getManagers();
    expect(component.projectNames).toBeUndefined();
  });
  
  fit('should display values in the grid',() => { 
    
    spyOn(component,'getManagers').and.returnValue(null);
    component.getManagers();
    component.projectNames=managersMockData;
    expect(component).toBeTruthy();
    expect(component.projectNames.length > 0);
     
    
   });
   fit('Data grid value to be undefined',() => { 
    component.getProjectDetails();
    expect(component.projectDetails).toBeUndefined();
  });
  
  fit('should display values in the grid',() => { 
    
    spyOn(component,'getProjectDetails').and.returnValue(null);
    component.getProjectDetails();
    component.projectDetails=projectMockData;
    expect(component).toBeTruthy();
    expect(component.projectDetails.length > 0);
     
    
   });
   
   fit('should display values in the grid',() => { 
    
    spyOn(component,'getProjectDetails').and.returnValue(null);
    component.validateProjectDates();
    component.projectDetails=projectMockData;
    expect(component).toBeTruthy();
    expect(component.projectDetails.length > 0);
     
    
   });
   
   fit('should display values in the grid',() => { 
    component.validateProjectDates();
    expect(component).toBeTruthy();
    expect(component.highlightDates).toBeFalsy();
     
    
   });
});
