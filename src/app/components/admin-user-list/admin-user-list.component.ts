import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Emitters } from '../emitters/emitter';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store'
import { appService } from '../state/user.service';
import { retrieveposts } from '../state/user.action';
import { Users } from 'src/app/models/userModel';
import { uniqueEmail } from '../state/user.selectors';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FilterPipe } from '../filter.pipe';


@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})

export class AdminUserListComponent implements OnInit {
  //  searchText:any=''
   searchText: string = '';


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,
    private store: Store<{ allusers: Users[] }>, private appService: appService, private toastr: ToastrService) { }
   
  userdata$ = this.store.pipe(select(uniqueEmail))
  ngOnInit(): void {
    this.http.get('http://localhost:5000/admin/active', {
      withCredentials: true
    }).subscribe((response: any) => {
      console.log(response);
      // this.getUsers()
      this.store.dispatch(retrieveposts())
      Emitters.authEmiter.emit(true)
    }, (err) => {
      this.router.navigate(['/admin']);
      Emitters.authEmiter.emit(false)
    })
  }


  deleteUser(userId: any) {
    this.http.post(`http://localhost:5000/admin/deleteUser/${userId}`, {
      withCredentials: true
    }).subscribe((response: any) => {
    
      this.store.dispatch(retrieveposts())
      this.toastr.error("Deleted", 'Success!');
  
      Emitters.authEmiter.emit(true)
    }, (err) => {
      console.log(err + "hhhhhhhhhhhhhhhhhhh");
      this.router.navigate(['/admin']);
      Emitters.authEmiter.emit(false)
    })
  }



  editUser(userId: any) {
    this.router.navigate(['/admin/editUser', userId])
  }



  createUser() {
    this.router.navigate(['admin/createuser'])
  }
}
