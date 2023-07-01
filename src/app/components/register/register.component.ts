import{HttpClient} from '@angular/common/http'
import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder} from '@angular/forms'
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
form:FormGroup

constructor(
  private formBuilder:FormBuilder,
  private http:HttpClient,
  private router:Router
){}
  ngOnInit(): void {
this.form=this.formBuilder.group({
  name:"",
  email:"",
  password:""
})
  }

  ValidateEmail=(email:any)=>{

    var validRegex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.match(validRegex)){
      return true
    }else{
      return false
    }
  }
  
  submit():void{
    let user=this.form.getRawValue()
    console.log(user);
    if(user.name=="" || user.email=="" || user.password=="" ){
      Swal.fire('error','Please Enter All The Fields','error')
    }else if(!this.ValidateEmail(user.email)){

      Swal.fire("Error","Please enter a valid email","error")
    }else{
      this.http.post("http://localhost:5000/api/register",user,{
        
          withCredentials:true 
      })
    }
  }

}
