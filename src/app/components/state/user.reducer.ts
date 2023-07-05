import {createReducer,on} from '@ngrx/store'
import { Profile,Users } from 'src/app/models/userModel'
import { state } from '@angular/animations'
import { retrieveposts,retrievepostsSucces,retrieveprofileSucces,retrieveprofile } from "./user.action";

//----------users----------------

export const initialStateofUser:Profile={
    _id:"",
    name:"",
    email:"",
    password:"",
    image:"",
    __v:"",
}



const _profileReducer=createReducer(
    initialStateofUser,
    on(retrieveprofileSucces,(state,{userdetails})=>{
        return userdetails
    })
)

export function profileReducer(state:any,action:any){
    return _profileReducer(state,action);
  }
//---------------

export const initialState:Users[]=[]

const _postReducer=createReducer(
    initialState,
    on(retrievepostsSucces,(state,{allusers})=>{
        return [...allusers]
    })
)


export function postReducer(state:any,action:any){
    return _postReducer(state,action);
  }