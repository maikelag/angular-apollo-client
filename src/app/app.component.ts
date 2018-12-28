import { Component, OnInit } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map, delay} from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Example NGRX';
  lista = of(['hola', 'que', 'tal', 'estas']);

  ngOnInit() {
  }
}
