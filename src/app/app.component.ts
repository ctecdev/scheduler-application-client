import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Scheduler Application Client';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    setInterval(
      () => {
        this.taskService.getOutput().subscribe(data => {
          data.forEach(element => {
            if (element != "") {
              console.log(element);
            }
          });
        });
      }, 1000);
  }

}
