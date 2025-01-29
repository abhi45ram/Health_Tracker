import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss'],
})
export class WorkoutListComponent {
  @Input() workouts: any[] = [];
  @Output() paginate = new EventEmitter<number>();
  @Output() userSelected = new EventEmitter<any>();
  @Output() userDeleted = new EventEmitter<any>();

  currentPage = 1;

  onPaginate(page: number) {
    this.paginate.emit(page);
  }

  selectUser(user: any) {
    this.userSelected.emit(user);
  }

  getTotalMinutes(workouts: any[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  deleteUser(user: any) {
    this.userDeleted.emit(user);
  }
}
