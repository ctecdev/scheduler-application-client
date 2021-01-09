import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../task';
import { TaskService } from '../task.service';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  @ViewChild('f') form: any;

  task: Task = new Task();

  constructor(
    private taskService: TaskService,
    private router: Router  
  ) { }

  ngOnInit(): void { }

  onSubmit() {
    this.taskService.createTask(this.task);
    this.goToTaskList();
  }

  cancel(event: any) {
    event.preventDefault();
    this.goToTaskList();
  }

  goToTaskList(){
    this.router.navigate(['/tasks']);
  }

  // Name validation
  nameChanged(arg: string) {
    console.log("modelchanged: " + arg); 
    //not empty or blank
    var input = arg.trim();
    if (input == "") {
      this.form.controls['name'].setErrors({'required':"true"});
      return;
    }
    //check lenght
    if (arg.length < 4 || arg.length > 250) {
      this.form.controls['name'].setErrors({'size':"true"});
      return;
    }
    //TODO: fix check characters
    var regexp = new RegExp('^[a-zA-Z0-9]$');
    var test = regexp.test(arg);
    if (test) {
      this.form.controls['name'].setErrors({'chars':"true"});
      return;
    }
    //check does name exists
    this.taskService.nameExists(arg).subscribe(data => {
      if (data) {
        this.form.controls['name'].setErrors({'conflict':"true"});
      return;
      }
    });  
    //clean errors
    this.form.controls['name'].setErrors(null);
  }

  // Reccurency validation
  reccurencyChanged(arg: string) {
    //not empty or blank
    var input = arg.trim();
    if (input == "") {
      this.form.controls['reccurency'].setErrors({'required':"true"});
      return;
    }
    //check lenght
    if (arg.length < 10 || arg.length > 30) {
      this.form.controls['reccurency'].setErrors({'size':"true"});
      return;
    }
    //check cron expression on backend
    this.taskService.isCronValid(arg).subscribe(data => {
      if (!data) {
        this.form.controls['reccurency'].setErrors({'invalid':"true"});
      return;
      }
    });  
    //clean errors
    this.form.controls['reccurency'].setErrors(null);
  }

  // Code validation
  codeChanged(arg: string) {
    //not empty or blank
    var input = arg.trim();
    if (input == "") {
      this.form.controls['code'].setErrors({'required':"true"});
      return;
    }
    //check lenght
    if (arg.length < 10 || arg.length > 1000) {
      this.form.controls['code'].setErrors({'size':"true"});
      return;
    }
    //check is groovy script on backend
    this.taskService.isCodeValid(arg).subscribe(data => {
      if (!data) {
        this.form.controls['code'].setErrors({'invalid':"true"});
      return;
      }
    });  
    //clean errors
    this.form.controls['name'].setErrors(null);
  }

}
