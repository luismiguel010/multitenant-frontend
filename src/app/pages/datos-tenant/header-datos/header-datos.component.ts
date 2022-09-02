import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-datos',
  templateUrl: './header-datos.component.html',
  styleUrls: ['./header-datos.component.css']
})
export class HeaderDatosComponent implements OnInit {
  @Input() public color: string;
  @Input() public nombreTenant: string;

  constructor() { }

  ngOnInit(): void {
  }

}
