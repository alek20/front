import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { ListCrudService } from 'src/app/services/list-crud.service';

import { Admission } from 'src/app/models/Admission';

import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-admission-list',
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.scss']
})
export class AdmissionListComponent implements OnInit {
admissions$: Observable<Admission[]>;


constructor(private ListCrudService: ListCrudService) {}

  ngOnInit(): void {
  this.admissions$ = this.fetchAll();
  }
  fetchAll(): Observable<Admission[]> {
    return this.ListCrudService.fetchAll();
  }

  post(Admission: Omit <Admission,"id">): void {
const stu_name = (<string>Admission.stu_name).trim();

const stu_surname = (<string>Admission.stu_surname).trim();

const email = (<string>Admission.email).trim();




if (!stu_name || !stu_surname || !email) return;

this.admissions$ = this.ListCrudService
.post({ stu_name, stu_surname, email })
.pipe(tap(() => (this.admissions$ = this.fetchAll())));
}

//UPDATE 

/*update(id: number, Admission: Omit <Admission,"id">): void {
  const stu_name = (<string>Admission.stu_name).trim();
  const stu_surname = (<string>Admission.stu_surname).trim();
  const email = (<string>Admission.email).trim();
  

  if (!stu_name || !stu_surname || !email) return;
  
 
 
  
  this.admissions$ = this.ListCrudService
  .update( Admission )
  .pipe(tap(() => (this.admissions$ = this.fetchAll())));
  }*/

  delete(id: number): void {
    this.admissions$ = this.ListCrudService
    .delete( id )
    .pipe(tap(() => (this.admissions$ = this.fetchAll())));
  }
}
