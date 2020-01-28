import {Injectable} from '@angular/core';

@Injectable()
export class Projects{
    Project:string;
    StartDate:String;
    EndDate:string;
    Priority:number;
    Completed:string;
    NoOfTasks:string;
    
    constructor(){}
}