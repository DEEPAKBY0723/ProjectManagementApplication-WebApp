import { async, ComponentFixture, TestBed,inject } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ServiceCall } from '../Service/ServiceCall';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import {UsersTable} from '../Models/User';
import {Projects} from '../Models/Project';
import {ProjectTasks} from '../Models/Task';
import {ParentTask} from '../Models/ParentTask';

describe('ServiceCallComponent', () => {
  let component: ServiceCall;
  let called=false;
  //let fixture: ComponentFixture<ServiceCall>;
  let mockhttp:any={};
  let userInput:UsersTable;
  let projectInput:Projects;
  let projectTasks:ProjectTasks;
  let parentTaskInput:ParentTask; 
  let projects:string;
  mockhttp.get=function(){
      return{
          pipe:function(){
              console.log("true");
              called=true;
          }
      }
  };
  mockhttp.post=function(){
      return{
          pipe:function(){
              console.log("true");
              called=true;
          }
      }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[
          ServiceCall,
        {provide:HttpClient,useValue:mockhttp
        }]
    });
  });



  it('should mock service call for ViewUserDetails',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.ViewUserDetails();
    expect(called).toBeTruthy();
  }));
  it('should mock service call for AddUserDetails',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.AddUserDetails(userInput);
    expect(called).toBeTruthy();
  }));
  it('should mock service call for getManagers',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.getManagers();
    expect(called).toBeTruthy();
  }));
  it('should mock service call for viewProjectDetails',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.viewProjectDetails();
    expect(called).toBeTruthy();
  }));
  
  it('should mock service call for AddProjectDetails',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.AddProjectDetails(projectInput);
    expect(called).toBeTruthy();
  }));
  it('should mock service call for getProjectNames',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.getProjectNames();
    expect(called).toBeTruthy();
  }));
  it('should mock service call for getProjectNames',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.getProjectNames();
    expect(called).toBeTruthy();
  }));
  it('should mock service call for getTasks',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.getTasks();
    expect(called).toBeTruthy();
  }));
  it('should mock service call for getUsers',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.getUsers();
    expect(called).toBeTruthy();
  }));
  it('should mock service call for AddTaskDetails',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.AddTaskDetails(projectTasks);
    expect(called).toBeTruthy();
  }));
  it('should mock service call for AddParentTaskDetails',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.AddParentTaskDetails(parentTaskInput);
    expect(called).toBeTruthy();
  }));
  it('should mock service call for viewTaskDetails',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.viewTaskDetails();
    expect(called).toBeTruthy();
  }));
  it('should mock service call for getTaskDetails',inject([ServiceCall],(service:ServiceCall)  => {
    called=false; 
    var result=service.getTaskDetails(projects);
    expect(called).toBeTruthy();
  }));
});
