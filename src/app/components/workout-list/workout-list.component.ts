import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss'],
})
  export class WorkoutListComponent {
    @Input() workouts: any[] = [];
    @Input() currentPage = 1;
    @Input() totalPages = 1;
    @Output() paginate = new EventEmitter<number>();
    @Output() userSelected = new EventEmitter<any>();
    @Output() userDeleted = new EventEmitter<any>();
  
    get pages(): number[] {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
    onPaginate(page: number) {
      this.currentPage = page;
      this.paginate.emit(page);
    }
  
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.paginate.emit(this.currentPage);
      }
    }
  
    goToNextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.paginate.emit(this.currentPage);
      }
    }
  
    selectUser(user: any) {
    this.userSelected.emit(user);
    }

    getTotalMinutes(workouts: any[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
    } 
}
