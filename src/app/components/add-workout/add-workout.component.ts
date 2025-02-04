import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.scss'],
})
export class AddWorkoutComponent {
  workoutForm: FormGroup;

  @Output() workoutAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private workoutService: WorkoutService) {
    this.workoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      workoutType: ['', Validators.required],
      workoutMinutes: [0, [Validators.required, Validators.min(1)]],
    });
  }

  get name() {
    return this.workoutForm.get('name');
  }

  get workoutType() {
    return this.workoutForm.get('workoutType');
  }

  get workoutMinutes() {
    return this.workoutForm.get('workoutMinutes');
  }

  addWorkout() {
    if (this.workoutForm.valid) {
      const { name, workoutType, workoutMinutes } = this.workoutForm.value;
      const workout = { type: workoutType, minutes: workoutMinutes };
      const workoutData = { name, workout };
      this.workoutService.addWorkout(workoutData);
      this.workoutAdded.emit();
  
      this.workoutForm.reset({
        name: '',
        workoutType: '',
        workoutMinutes: null
      }); 
      Object.keys(this.workoutForm.controls).forEach((key) => {
        this.workoutForm.controls[key].setErrors(null);
        this.workoutForm.controls[key].markAsPristine();
        this.workoutForm.controls[key].markAsUntouched();
      });
    }
  }
  
}
