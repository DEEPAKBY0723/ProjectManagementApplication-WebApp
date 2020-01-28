import { Component, OnInit } from '@angular/core';
import { IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {ServiceCall} from '../Service/ServiceCall';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ProjectTasks} from  '../Models/Task';
import * as moment from 'moment';
import {ParentTask} from '../Models/ParentTask';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

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

  public projectNames:any;
  public taskNames:any;
  public users:any;
  apicallobj:ServiceCall;
  public myOptions:IMultiSelectOption[]=[];
  public taskOptions:IMultiSelectOption[]=[];
  public userOptions:IMultiSelectOption[]=[];
  public priorityValue:number;
  public taskName:string;
  public isChecked:boolean=false;
  public inputValidationStatus=true;
  public highlightTaskError:boolean=false;
  public highlightProjectSError:boolean=false;
  public highlightUserError:boolean=false;
  public highlightDateError:boolean=false;
  public highlightParentTaskError:boolean=false;
  public isDisabled=false;
  optionsModel:any[]=[];
  optionsModel1:any[]=[];
  optionsModel2:any[]=[];
  public selectedProject:string;
  startDate:string;
 endDate:string;
 parentTaskInput:ParentTask;
  


  constructor(servicecallObj:ServiceCall,private http:HttpClient) {
    this.http=http;
   }



  ngOnInit() {
   this.getprojectNames();
   this.getTasks();
   this.getUsers();
  }
  IsCheckBoxChecked()
  {
    
    const checkbox = document.getElementById('dateCheckBox') as HTMLInputElement;
    
    if (checkbox.checked)
    {
      this.isChecked=true;
      this.isDisabled=true;
    }
    else{
      this.isChecked=false;
      this.isDisabled=false;
    }
  }

getTasks()
{
  debugger;
  this.apicallobj=new ServiceCall(this.http);
    this.apicallobj.getTasks()
    .subscribe(data =>{
      this.taskNames=data;
      this.taskOptions=[];
     
      if(this.taskNames != undefined)
      {
        for(var i=0;i< this.taskNames.length;i++)
        {
          var tasks={id:i,name:this.taskNames[i].task1}
          
          this.taskOptions.push(tasks);
        }
      }
    });

}

  getprojectNames(){
    debugger;
    this.apicallobj=new ServiceCall(this.http);
    this.apicallobj.getProjectNames()
    .subscribe(data =>{
      this.projectNames=data;
      this.myOptions=[];
    
      if(this.projectNames != undefined)
      {
        for(var i=0;i< this.projectNames.length;i++)
        {
          var projects={id:i,name:this.projectNames[i].project}
          this.myOptions.push(projects);
        }
      }
    });

  }
  ResetData(){
    this.optionsModel=[];
    this.priorityValue=0;
    this.taskName="";
    this.startDate="";
    this.endDate="";
    this.optionsModel1=[];
    this.optionsModel2=[];
  }
  getUsers(){
    debugger;
    this.apicallobj=new ServiceCall(this.http);
    this.apicallobj.getUsers()
    .subscribe(data =>{
      this.users=data;
      this.userOptions=[];
      console.log(this.users)
      if(this.users != undefined)
      {
        for(var i=0;i< this.users.length;i++)
        {
          var username=this.users[i].firstName + "," +this.users[i].lastName;
          console.log(username);
          var Usrs={id:i,name:username}
          this.userOptions.push(Usrs);
        }
      }
    });

  }
  
  AddtaskDetails()
  {
    if(this.isChecked){
 debugger;
 this.highlightDateError=false;
    this.highlightParentTaskError=false;
    this.highlightProjectSError=false;
    this.highlightTaskError=false;
    this.highlightUserError=false;
    this.inputValidationStatus=true;
 if(this.optionsModel.length>1 || this.optionsModel.length==0)
{
  this.highlightProjectSError=true;
  this.inputValidationStatus=false;
 
}
if(this.taskName == undefined || this.taskName == " " || this.taskName.length <= 0)
    {
      //this.taskName=this.taskName.trim();
    this.inputValidationStatus=false;
    this.highlightTaskError=true;

    }
this.parentTaskInput=new ParentTask();
this.parentTaskInput.ParentTasks=this.taskName;
this.apicallobj=new ServiceCall(this.http);
  

      this.apicallobj.AddParentTaskDetails(this.parentTaskInput)
      .subscribe(data =>{
        this.projectNames=data;
      });
    }

    else{

   
    this.ValidateTaskInput();
    if(this.inputValidationStatus)
    {
      var taskInput=new ProjectTasks();
      taskInput.Task1=this.taskName;
      taskInput.Priority=this.priorityValue;
      taskInput.Status="No";
      taskInput.StartDate=this.startDate;
      taskInput.EndDate=this.endDate;
      taskInput.ProjectId=this.selectedProject;
      this.apicallobj=new ServiceCall(this.http);
      this.apicallobj.AddTaskDetails(taskInput)
      .subscribe(data =>{
        this.projectNames=data;
      });
    }
  }
}




getSelectedDropDownValues()
{
  debugger;

  if(this.optionsModel.length>1 || this.optionsModel.length==0)
{
  this.highlightProjectSError=true;
  this.inputValidationStatus=false;
 
}

if(this.optionsModel2.length>1 || this.optionsModel2.length==0 )
{
  this.highlightParentTaskError=true;
  this.inputValidationStatus=false;
 
}

if(this.optionsModel1.length>1 || this.optionsModel1.length==0 )
{
  this.highlightUserError=true;
  this.inputValidationStatus=false;
 
}

}
  ValidateTaskInput()
  {
    debugger;
    this.highlightDateError=false;
    this.highlightParentTaskError=false;
    this.highlightProjectSError=false;
    this.highlightTaskError=false;
    this.highlightUserError=false;
    this.inputValidationStatus=true;
    if(this.taskName == undefined || this.taskName == " " || this.taskName.length <= 0)
    {
      //this.taskName=this.taskName.trim();
    this.inputValidationStatus=false;
    this.highlightTaskError=true;

    }
   
    this.validateProjectDates();
    this.getSelectedProjects();
    this.getSelectedDropDownValues();
    

  }
  
  getSelectedProjects()
{
  debugger;
  
  if(this.optionsModel.length>1 || this.optionsModel.length ==0)
    {
  this.highlightProjectSError=true;
  this.inputValidationStatus=false;
}
else{
  for(var i=0;i < this.optionsModel.length;i++)
  {
    debugger;
     this.selectedProject=this.myOptions[i].name;
   }
 
}
}
validateProjectDates()
{
  
    if(this.startDate != undefined && this.endDate != undefined)
    {
    this.startDate=moment(this.startDate).format("MM/DD/YYYY");
   
    this.endDate=moment(this.endDate).format("MM/DD/YYYY");
    
    if( this.startDate !=null && this.startDate !=" " && this.startDate !="" && this.endDate != null && this.endDate !=" " && this.endDate !="" )
    {
     
     
    var startDt=Date.parse(this.startDate);
    var endDt=Date.parse(this.endDate);
    if(startDt > endDt )
      {
        this.highlightDateError=true;
        this.inputValidationStatus=false;
      }
     } 
    else{
      alert("Please select start date and end date");
       this.inputValidationStatus=false;
     }
  
}
else{
  alert("Please select start date and end date");
   this.inputValidationStatus=false;
 }
}

}
