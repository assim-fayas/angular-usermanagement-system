import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { retrieveposts,retrievepostsSucces,retrieveprofileSucces,retrieveprofile } from "./user.action";
import { map, switchMap } from "rxjs";
import { appService } from "./user.service";
import { Profile,Users } from "src/app/models/userModel";


@Injectable()
export class appEffects{
   constructor(private actions$:Actions,private appServie:appService){}
   loadAllUsers$=createEffect(()=>
   this.actions$.pipe(
    ofType(retrieveposts),
    switchMap(()=>{
       return this.appServie.loadUsers()
       .pipe(map((data)=>retrievepostsSucces({allusers:data as Users[]})
     ))
        
    })
   )
   )

   loadProfile$=createEffect(()=>
   this.actions$.pipe(
    ofType(retrieveprofile),
    switchMap(()=>{
       return this.appServie.loadProfile()
       .pipe(map((data)=>retrieveprofileSucces({userdetails:data as Profile })
     ))
        
    })
   )
   )

}