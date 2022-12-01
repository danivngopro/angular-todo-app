import { CrudService } from "./../../service/crud.service";
import { Component } from "@angular/core";
import { Task } from "src/app/model/task";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
  task: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = "";
  editTaskValue: string = ""; 

  constructor(private CrudService: CrudService) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.task = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask(): void {
    this.CrudService.getAll().subscribe({
      next: (res) => (this.taskArr = res),
      error: (err) => console.log("could not get all tasks"),
    });
  }

  addTask(): void {
    this.task.taskName = this.addTaskValue;
    this.CrudService.addTask(this.task).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.addTaskValue = "";
      },
      error: (err) => console.log("failed to add new task"),
    });
  }

  editTask(): void {
    this.task.taskName = this.editTaskValue;
    this.CrudService.editTask(this.task).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => console.log("failed to edit a task"),
    });
  }

  deleteTask(newTask: Task): void {
    this.CrudService.deleteTask(newTask).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => console.log("failed to delete a task"),
    });
  }

  call(task: Task): void {
    this.task = task;
    this.editTaskValue = task.taskName;
  }

}
