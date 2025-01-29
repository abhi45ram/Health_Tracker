import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return workouts on getWorkouts', () => {
    const workouts = service.getWorkouts();
    expect(workouts.length).toBeGreaterThan(0);
  });

  it('should add a workout', () => {
    const initialLength = service.getWorkouts().length;
    const newWorkout = { name: 'John Doe', workout: { type: 'Running', minutes: 30 } };

    service.addWorkout(newWorkout);
    
    expect(service.getWorkouts().length).toBeGreaterThan(initialLength);
  });

  it('should delete a user', () => {
    const userToDelete = service.getWorkouts()[0];
    const initialLength = service.getWorkouts().length;

    service.deleteUser(userToDelete);

    expect(service.getWorkouts().length).toBeLessThan(initialLength);
  });

  it('should search users by name', () => {
    const result = service.searchByName('John');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should filter users by workout type', () => {
    const result = service.filterByWorkoutType('Running');
    expect(result.length).toBeGreaterThan(0);
  });

  it('should paginate users', () => {
    const result = service.paginate(1);
    expect(result.length).toBeLessThanOrEqual(5);
  });
});
