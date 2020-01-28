import {Injectable} from '@angular/core';

@Injectable()
export class ProjectTasks{
    Task1:string;
    StartDate:String;
    EndDate:string;
    Priority:number;
    Status:string;
    ProjectId:string;
    
    constructor(){}
}