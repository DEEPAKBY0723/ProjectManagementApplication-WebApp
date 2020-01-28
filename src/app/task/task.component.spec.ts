import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import { TaskComponent } from './task.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AgGridModule } from 'ag-grid-angular';
import { Component, OnInit,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ServiceCall} from '../Service/ServiceCall';
import {HttpClient,HttpHeaders,HttpHandler,HttpClientJsonpModule} from '@angular/common/http';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  const projectMockData=[{firstName: "likith", lastName: "Somesh", employeeId: "235659", projectId: null, taskId: null}]
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports:[MultiselectDropdownModule,AgGridModule,],
      providers:[MultiselectDropdownModule,ServiceCall,HttpClient,HttpHandler],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
  });

  it('should create task component', () => {
    expect(component).toBeTruthy();
  });
  it('Data grid value to be undefined',() => { 
     component.getprojectNames();
     expect(component.projectNames).toBeUndefined();
   });
   
   it('should display values in the grid',() => { 
     
     spyOn(component,'ngOnInit').and.returnValue(null);
     component.getprojectNames();
     component.projectNames=projectMockData;
     expect(component).toBeTruthy();
     expect(component.projectNames.length > 0);
      
     
    });
    it('Data grid value to be undefined',() => { 
      component.getTasks();
      expect(component.taskNames).toBeUndefined();
    });
    
    it('should display values in the grid',() => { 
      
      spyOn(component,'ngOnInit').and.returnValue(null);
      component.getTasks();
      component.taskNames=projectMockData;
      expect(component).toBeTruthy();
      expect(component.taskNames.length > 0);
       
      
     });
     it(' getUsersData grid value to be undefined',() => { 
      component.getUsers();
      expect(component.users).toBeUndefined();
    });
    
    it(' getUsers should display values in the grid',() => { 
      
      spyOn(component,'ngOnInit').and.returnValue(null);
      component.getUsers();
      component.users=projectMockData;
      expect(component).toBeTruthy();
      expect(component.users.length > 0);
       
      
     });
      
    it('ResetData should display values in the grid',() => { 
      
      spyOn(component,'ngOnInit').and.returnValue(null);
      component.ResetData();
      expect(component).toBeTruthy();
      expect(component.taskNames.optionsModel).toBeUndefined();
      expect(component.taskNames.priorityValue).toBeUndefined();
      expect(component.taskNames.taskName).toBeUndefined();
      expect(component.taskNames.startDate).toBeUndefined();
      expect(component.taskNames.endDate).toBeUndefined();
      expect(component.taskNames.optionsModel1).toBeUndefined();
      expect(component.taskNames.optionsModel2).toBeUndefined();
     });
     
     it('should display values in the grid',() => { 
      
      spyOn(component,'AddtaskDetails').and.returnValue(null);
      component.isChecked=true;
      component.AddtaskDetails();
      expect(component).toBeTruthy();
     expect(component.highlightDateError).toBeFalsy;
     expect(component.highlightParentTaskError).toBeFalsy;
     expect(component.highlightProjectSError).toBeFalsy;
     expect(component.highlightTaskError).toBeFalsy;
     expect(component.highlightUserError).toBeFalsy;
     expect(component.inputValidationStatus).toBeTruthy;
     });
});
