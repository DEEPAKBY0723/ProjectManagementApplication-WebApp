import  {Injectable} from '@angular/core';
import { Observable} from 'rxjs';
import {Response} from '@angular/http';
import {UsersTable} from '../Models/User';
import {Projects} from '../Models/Project';
import {ProjectTasks} from '../Models/Task';

import {map,mergeMap,catchError} from 'rxjs/operators';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ParentTask} from '../Models/ParentTask';

@Injectable()

export class ServiceCall{
    // apiUrl: string = "https://localhost:44358/api/";
     apiUrl: string = "http://projectmanageapi.com/api/";
    
    constructor(private http:HttpClient)
    {
        this.http=http;
    }
  AddUserDetails(userObj:UsersTable):Observable<Response>
  {
      let options={
          headers: new HttpHeaders({
              'Content-Type':'application/json'
          })
      };
      
      let apiCallOptions=new HttpHeaders()
      .set('Content-Type','application/json')
      .set('Cache-Control','max-age=0')
      .set('Pragma','no-cache')
      .set('Access-Control-Allow-Origin','*')
      .set('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
      .set('Access-Control-Allow-Headres','Content-Type')
      .set('Access-Control-Allow-Credentials','true');
    return this.http.post(this.apiUrl + "User/AddUser",userObj,options)
     .pipe(map((res:Response) =>{return res})
     ,     catchError(this.HandleError));
        
        
  }
  ViewUserDetails():Observable<Response>{
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    return this.http.get(this.apiUrl + "User/ViewUser",options)
    .pipe(map((res:Response)=>{return res}));
    //,
    //catchError(this.HandleError));
  }

  getManagers():Observable<Response>{
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    return this.http.get(this.apiUrl+ "Project/GetManagers",options)
    .pipe(map((res:Response)=>{return res}),
    catchError(this.HandleError));
  }

  viewProjectDetails():Observable<Response>{
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    return this.http.get(this.apiUrl +  "Project/Get",options)
    .pipe(map((res:Response)=>{return res})
    ,    catchError(this.HandleError));
  }

  
  AddProjectDetails(projectObj:Projects):Observable<Response>{
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    
    let apiCallOptions=new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Cache-Control','max-age=0')
    .set('Pragma','no-cache')
    .set('Access-Control-Allow-Origin','*')
    .set('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    .set('Access-Control-Allow-Headres','Content-Type')
    .set('Access-Control-Allow-Credentials','true');
  return this.http.post(this.apiUrl + "Project/AddProject",projectObj,options)
   .pipe(map((res:Response) =>{return res})
   ,   catchError(this.HandleError));
  }

  getProjectNames():Observable<Response>{
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    return this.http.get(this.apiUrl + "Project/GetProjects",options)
    .pipe(map((res:Response)=>{return res})
    ,catchError(this.HandleError));
  }

   private HandleError(error:Response | any){
       return Observable.throw(error.message || error);
       
   }

   getTasks():Observable<Response>{
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    return this.http.get(this.apiUrl + "Task/GetTasks",options)
    .pipe(map((res:Response)=>{return res})
    ,catchError(this.HandleError));
  }
 getUsers():Observable<Response>{
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    return this.http.get(this.apiUrl + "User/GetUsers",options)
    .pipe(map((res:Response)=>{return res})
    , catchError(this.HandleError));
  }
  AddTaskDetails(taskInput:ProjectTasks):Observable<Response>{
      debugger;
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    
    let apiCallOptions=new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Cache-Control','max-age=0')
    .set('Pragma','no-cache')
    .set('Access-Control-Allow-Origin','*')
    .set('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    .set('Access-Control-Allow-Headres','Content-Type')
    .set('Access-Control-Allow-Credentials','true');
  return this.http.post(this.apiUrl + "Task/AddTask",taskInput,options)
   .pipe(map((res:Response) =>{return res})
  , catchError(this.HandleError));
  }
  AddParentTaskDetails(taskInput:ParentTask):Observable<Response>{
    debugger;
  let options={
      headers: new HttpHeaders({
          'Content-Type':'application/json'
      })
  };
  
  let apiCallOptions=new HttpHeaders()
  .set('Content-Type','application/json')
  .set('Cache-Control','max-age=0')
  .set('Pragma','no-cache')
  .set('Access-Control-Allow-Origin','*')
  .set('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
  .set('Access-Control-Allow-Headres','Content-Type')
  .set('Access-Control-Allow-Credentials','true');
return this.http.post(this.apiUrl + "Task/AddParentTask",taskInput,options)
 .pipe(map((res:Response) =>{return res})
 , catchError(this.HandleError));
}

  viewTaskDetails():Observable<Response>{
    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
    
    return this.http.get(this.apiUrl + "Task/Get",options)
    .pipe(map((res:Response)=>{return res})
    ,    catchError(this.HandleError));
  }
  getTaskDetails(projects:string):Observable<Response>{

    let options={
        headers: new HttpHeaders({
            'Content-Type':'application/json'
        })
    };
     let apiCallOptions=new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Cache-Control','max-age=0')
    .set('Pragma','no-cache')
    .set('Access-Control-Allow-Origin','*')
    .set('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    .set('Access-Control-Allow-Headres','Content-Type')
    .set('Access-Control-Allow-Credentials','true');
    return this.http.get(this.apiUrl + "Task/View?projects=" + projects,options)
    .pipe(map((res:Response)=>{return res})
    ,    catchError(this.HandleError));
  }
}
 