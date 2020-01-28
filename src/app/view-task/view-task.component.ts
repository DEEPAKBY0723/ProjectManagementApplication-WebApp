import { Component, OnInit,forwardRef,NgModule } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ServiceCall} from '../Service/ServiceCall';
import * as _ from 'lodash';
import {UsersTable} from '../Models/User';
import {Subscription} from 'rxjs';
import { IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {TaskDetails} from '../Models/TaskDetails';


@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {
  apicallobj:ServiceCall;
  sub:Subscription=new Subscription();
  public taskDetails:any;
  public myOptions:IMultiSelectOption[]=[];
  optionsModel:any[]=[];
  public projectDetails:any[]=[];
  selectedProjects:string="";
  projectList:any;
  tasklist:TaskDetails;
  taskData:any;
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-default btn-block',
    dynamicTitleMaxItems: 3,
    displayAllSelectedText: true
  };
  myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'item selected',
    checkedPlural: 'items selected',
    searchPlaceholder: 'Find',
    defaultTitle: 'Select',
    allSelected: 'All selected',
  };
  columnDefs = [
    {headerName: 'Task', field: 'task1',sortable: true,filter:true },
    {headerName: 'Parent', field: 'parentId',sortable: true,filter:true },
    {headerName: 'Priority', field: 'priority',sortable: true,filter:true},
    {headerName: 'Start', field: 'startDate',sortable: true,filter:true},
    {headerName: 'End', field: 'endDate',sortable: true,filter:true},
];
 rowData:TaskDetails[];
  constructor(servicecallObj:ServiceCall,private http:HttpClient) { }

  ngOnInit() {
    this.getprojectNames();
   // this.viewTaskDetails();
    this.ViewTask();
  }
  //(ngModelChange)="viewTaskDetails($event)"
viewTaskDetails(projectList:string)
 {
  
    debugger;
    this.apicallobj=new ServiceCall(this.http);
    this.sub=this.apicallobj.getTaskDetails(projectList)
     .subscribe(data =>{
       this.taskDetails=data;
        this.rowData =_.cloneDeep(this.taskDetails);
       
   });

  }

  ViewTask()
  {
    debugger;
    this.apicallobj=new ServiceCall(this.http);
    this.sub=this.apicallobj.viewTaskDetails()
      .subscribe(data =>{
        this.taskDetails=data;
        console.log(this.taskDetails);
        this.tasklist=new TaskDetails();
        this.tasklist.Task=this.taskDetails.task1;
        if(this.taskDetails.parentId==null)
        {
          this.taskDetails.parentId="N";
        }
       ;
        this.rowData =_.cloneDeep(this.taskDetails);
       
    });
  }
  onProjectChange(selectedProjects:any)
  {
    debugger;
   if(selectedProjects.length > 0)
   {
    this.selectedProjects="";
    var selectedId=selectedProjects;
    for (var j=0;j< selectedProjects.length;j++)
    {
      this.selectedProjects=this.selectedProjects + "," +this.myOptions[selectedProjects[j]].name;
    }
    this.viewTaskDetails(this.selectedProjects);
  }
  }
  getSelectedProjects()
  {
    this.selectedProjects="";
    debugger;
    for(var i=0;i < this.optionsModel.length;i++)
  {
    debugger;
    
     this.projectDetails[i]=this.myOptions[i].name;
     
     this.selectedProjects=this.selectedProjects + "," +this.projectDetails[i];
   }

  }
  
  getprojectNames(){
    debugger;
    this.apicallobj=new ServiceCall(this.http);
    this.apicallobj.getProjectNames()
    .subscribe(data =>{
      this.projectList=data;
      this.myOptions=[];
    
      if(this.projectList != undefined)
      {
        for(var i=0;i< this.projectList.length;i++)
        {
          var projects={id:i,name:this.projectList[i].project}
          this.myOptions.push(projects);
        }
      }
    });

  }
}
