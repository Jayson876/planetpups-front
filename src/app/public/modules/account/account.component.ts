import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  showList: boolean = true;
  showForm: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  listToggle() {
  this.showList = true;
  this.showForm = false;
}
  formToggle() {
  this.showList = false;
  this.showForm = true;
}

}
