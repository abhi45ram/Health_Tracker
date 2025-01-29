import { Component, EventEmitter, Output } from '@angular/core';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
})
export class AddWorkoutComponent {
  name = '';
  workoutType = '';
  workoutMinutes = 0;

  @Output() workoutAdded = new EventEmitter<void>();

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.name && this.workoutType && this.workoutMinutes) {
      const workout = { type: this.workoutType, minutes: this.workoutMinutes };
      const workoutData = { name: this.name, workout };

      this.workoutService.addWorkout(workoutData);
      this.workoutAdded.emit();

      this.name = '';
      this.workoutType = '';
      this.workoutMinutes = 0;
    }
  }
}
