import {Injectable} from '@angular/core';

@Injectable()
export class TaskDetails{
    Task:string;
    StartDate:String;
    EndDate:string;
    Priority:number;
    Parent:string;
    
    constructor(){}
}