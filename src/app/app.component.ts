import { Component } from '@angular/core';
import { WorkoutService } from './services/workout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  userData: any[] = [];
  selectedUserWorkouts: any[] = [];
  searchText = '';
  workoutTypeFilter = '';
  currentPage = 1;
  totalPages = 1;
  selecteduser: any = null;
  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.refreshWorkouts();
  }

  onSearch() {
    const filteredData = this.workoutService.searchByName(this.searchText);
    this.totalPages = Math.ceil(filteredData.length / 5);
    this.userData = this.workoutService.paginate(1, filteredData);
  }

  onFilter() {
    const filteredData = this.workoutService.filterByWorkoutType(this.workoutTypeFilter);
    this.totalPages = Math.ceil(filteredData.length / 5);
    this.userData = this.workoutService.paginate(1, filteredData);
  }

  paginate(page: number) {
    this.currentPage = page;
    this.userData = this.workoutService.paginate(page);
  }
  

  onPageChange(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.userData = this.workoutService.paginate(this.currentPage);
  }

  refreshWorkouts() {
    this.userData = this.workoutService.getWorkouts();
    this.totalPages = Math.ceil(this.userData.length / 5);
    this.paginate(this.currentPage);

    if (this.userData.length > 0) {
      this.selectUser(this.userData[0]); // Automatically select the first user
    }
  }

  handleWorkoutAdded() {
    this.refreshWorkouts();
  }

  selectUser(user: any) {
    if (user && user.workouts) {
      this.selecteduser = user;
      this.selectedUserWorkouts = user.workouts;
    } else {
      this.selectedUserWorkouts = []; 
    }
  }

  handleUserDeleted(user: any) {
    this.workoutService.deleteUser(user);
    this.refreshWorkouts();
  }
}
