import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, NgForm } from '@angular/forms';
import { IMultiSelectOption,IMultiSelectSettings,IMultiSelectTexts} from 'angular-2-dropdown-multiselect';
import {ServiceCall} from '../Service/ServiceCall';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {Subscription} from 'rxjs';
import {Projects} from '../Models/Project';
import * as _ from 'lodash';
import * as moment from 'moment';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  angForm: FormGroup;
  public isChecked : boolean=false;
  public projectNames:any;
  priorityValue:number;
  public myOptions:IMultiSelectOption[]=[];
  optionsModel:any[]=[];
  public projectDetails:any;
 projectName:string;
 startDate:string;
 endDate:string;
 priority:number;
public highlightProject:boolean=false;
public highlightDates:boolean=false;
public highlightNoDatesError:boolean=false;
public projectInput:Projects;
public highlightManager:boolean=false;
public validationStatus:boolean=true;
columnDefs = [
  {headerName: 'Project', field: 'project',sortable: true,filter:true },
  {headerName: 'Start Date', field: 'startDate',sortable: true,filter:true },
  {headerName: 'End  Date', field: 'endDate',sortable: true,filter:true},
  {headerName: 'Priority', field: 'priority',sortable: true,filter:true },
  {headerName: 'No of Tasks', field: 'noOfTasks',sortable: true,filter:true },
  {headerName: 'Completed', field: 'completed',sortable: true,filter:true}
];
rowData:any[];
sub:Subscription=new Subscription();
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
managers:string[] =[];
apicallobj:ServiceCall;
  constructor(private fb: FormBuilder,servicecallObj:ServiceCall,private http:HttpClient) { 
    this.http=http;
  }
  IsCheckBoxChecked()
  {
    debugger;
    const checkbox = document.getElementById('dateCheckBox') as HTMLInputElement;
    console.log(checkbox);
    if (checkbox.checked)
    {
      this.isChecked=true;
    }
    else{
      this.isChecked=false;
    }
  }
  getManagers(){
    debugger;
    this.apicallobj=new ServiceCall(this.http);
    this.apicallobj.getManagers()
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
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    console.log(value);
    return value;
   
  }

  ngOnInit() 
  {
    this.highlightDates=false;
    this.highlightManager=false;
    this.highlightProject=false;
    this.highlightNoDatesError=false;
    this.getManagers();
    this.getProjectDetails();
  }


  AddProjectDetails()
  {
    debugger;
    this.getSelectedManagers();
    this.validateProjectDates();
    if(this.projectName==undefined ||this.projectName.length == 0)
    {
      this.highlightProject=true;
      this.validationStatus=false;
    }
    else{
      this.highlightProject=false;
      this.validationStatus=true;
    }
    console.log(this.priorityValue);
    
    if(this.validationStatus)
    {
      debugger;
      //this.highlightNoDatesError=false;
      var projectInput=new Projects();
      projectInput.Project=this.projectName;
      projectInput.StartDate=this.startDate;
      projectInput.EndDate=this.endDate;
      projectInput.Priority=this.priorityValue;
      console.log(projectInput);
      debugger;
      this.apicallobj=new ServiceCall(this.http);
      this.apicallobj.AddProjectDetails(projectInput)
      .subscribe(data =>{
        this.projectNames=data;
        alert("Click on 'Refresh Results' to see results");
      });
    }

    
  }

  getSelectedManagers()
{
  debugger;
  this.projectInput=new Projects();
  if(this.optionsModel.length>1)
{
  this.highlightManager=true;
  this.validationStatus=false;
 // for(var i=0;i < this.optionsModel.length;i++)
 // {
  //  debugger;
   // this.managers[i]=this.myOptions[i].name;
 // }
}
}


myClickFunction(form:NgForm)
  {

this.AddProjectDetails();

  } 
  functionName()
  {
    debugger;
    console.log(this.startDate);
  }
  ResetData()
  {
    debugger;
    this.projectName="";
    this.startDate="";
    this.endDate="";
    this.priorityValue=0;
    this.optionsModel=[];
  }
  validateProjectDates()
  {
    debugger;
    this.highlightDates=false;
   
    if(this.startDate != undefined && this.endDate != undefined)
    {
    this.startDate=moment(this.startDate).format("MM/DD/YYYY");
    console.log(this.startDate);
    console.log(this.endDate);
    this.endDate=moment(this.endDate).format("MM/DD/YYYY");
    console.log(this.endDate);
    if( this.startDate !=null && this.startDate !=" " && this.startDate !="" && this.endDate != null && this.endDate !=" " && this.endDate !="" )
    {
     
     
    var startDt=Date.parse(this.startDate);
    var endDt=Date.parse(this.endDate);
    if(startDt > endDt )
      {
        this.highlightDates=true;
        this.validationStatus=false;
      }
      else{
       this.highlightDates=false;
       this.validationStatus=true; 
      }
    } 
  }
  else{
    if(this.isChecked)
    {
   alert("Please select start date and end date");
    this.validationStatus=false;
    }
  }
  }
  createForm() {
    this.angForm = this.fb.group({
      projectName: ['', Validators.required ]
    
    });
  }
  onChange() {
    //console.log(this.optionsModel);
}

getProjectDetails()
{
  this.apicallobj=new ServiceCall(this.http);
  this.sub=this.apicallobj.viewProjectDetails()
    .subscribe(data =>{
      this.projectDetails=data;
      console.log(this.projectDetails);
      this.rowData =_.cloneDeep(this.projectDetails);
  });
}
 
}
