import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Emitters } from '../emitters/emitters';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  authenticated = false;

  constructor ( private http: HttpClient ) {

  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      ( auth: boolean ) => {
        this.authenticated = auth;
      }
    )
  }

  logout(): void{
    this.http.post('https://127.0.0.1:8000/api/logout', {}, { withCredentials: true })
      .subscribe( () => this.authenticated = false );
  }

}
