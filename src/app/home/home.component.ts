import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  message = '';

  constructor(
    private http: HttpClient
  ) {
    
  }

  ngOnInit(): void {
    this.http.get('https://127.0.0.1:8000/api/user', { withCredentials: true })
      .subscribe(
        (res: any ) => { 
          this.message = `Hi ${res.name}`;
          Emitters.authEmitter.emit( true );
        },
        err => {
          this.message = `You are not logged in`
          Emitters.authEmitter.emit( false );
        })
  }
}
