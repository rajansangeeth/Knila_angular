import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  @ViewChild("navContainer", { static: true }) navbarContainer!: ElementRef;

  constructor() { }

  toggle() {
    this.navbarContainer?.nativeElement?.classList?.toggle("show");
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log("navbarContainer", this.navbarContainer);

  }

}
