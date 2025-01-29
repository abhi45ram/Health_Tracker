import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWorkoutComponent } from './add-workout.component';
import { WorkoutService } from '../../services/workout.service';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';

describe('AddWorkoutComponent', () => {
  let component: AddWorkoutComponent;
  let fixture: ComponentFixture<AddWorkoutComponent>;
  let workoutService: WorkoutService;

  beforeEach(() => {
    workoutService = { addWorkout: jasmine.createSpy('addWorkout') } as any;

    TestBed.configureTestingModule({
      declarations: [AddWorkoutComponent],
      providers: [{ provide: WorkoutService, useValue: workoutService }],
    });

    fixture = TestBed.createComponent(AddWorkoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit workoutAdded when addWorkout is called', () => {
    spyOn(component.workoutAdded, 'emit');

    component.name = 'John Doe';
    component.workoutType = 'Running';
    component.workoutMinutes = 30;

    component.addWorkout();

    expect(workoutService.addWorkout).toHaveBeenCalled();
    expect(component.workoutAdded.emit).toHaveBeenCalled();
  });

  it('should not emit workoutAdded when input fields are empty', () => {
    spyOn(component.workoutAdded, 'emit');

    component.addWorkout();

    expect(workoutService.addWorkout).not.toHaveBeenCalled();
    expect(component.workoutAdded.emit).not.toHaveBeenCalled();
  });
});
