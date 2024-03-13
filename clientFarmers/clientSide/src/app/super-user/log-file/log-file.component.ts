import { SuperUserService } from './../super-user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log-file',
  templateUrl: './log-file.component.html',
  styleUrls: ['./log-file.component.css'],
})
export class LogFileComponent implements OnInit {
  isLoading: boolean = true;
  logList;

  constructor(private superService: SuperUserService) {}

  ngOnInit() {
    this.superService.getLogList().subscribe((data) => {
      this.logList = data;
      this.isLoading = false
      console.log(this.logList);
    });
    
  }
}
