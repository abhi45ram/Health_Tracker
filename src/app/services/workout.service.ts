import { Injectable } from '@angular/core';
import { User, Workout } from '../models/workout';

@Injectable({
  providedIn: 'root',
})
export class WorkoutService {
  private storageKey = 'userWorkouts';
  private defaultUserData: User[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 },
      ],
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 },
      ],
    },
  ];

  private userData: User[] = [];

  constructor() {
    this.loadDataFromStorage();
  }

  private loadDataFromStorage() {
    const storedData = localStorage.getItem(this.storageKey);
    if (storedData) {
      this.userData = JSON.parse(storedData);
    } else {
      this.userData = this.defaultUserData;
      this.saveDataToStorage();
    }
  }

  private saveDataToStorage() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
  }

  getWorkouts(): User[] {
    return this.userData;
  }

  deleteUser(user: User) {
    this.userData = this.userData.filter(u => u.id !== user.id);
    this.saveDataToStorage();
  }
  
  searchByName(name: string): User[] {
    return this.userData.filter(user =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  filterByWorkoutType(workoutType: string): User[] {
    if (!workoutType) return this.userData;
    return this.userData.filter(user =>
      user.workouts.some((workout: Workout) => workout.type === workoutType)
    );
  }

  paginate(page: number, data: User[] = this.userData): User[] {
    const start = (page - 1) * 5;
    const end = start + 5;  
    const paginatedUsers = data.slice(start, end);
    paginatedUsers.forEach(user => {
      user.workouts = user.workouts.slice(0, 5);
    });
    
    return paginatedUsers;
  }  

  addWorkout(workout: { name: string; workout: Workout }) {
    const user = this.userData.find(user => user.name === workout.name);
    if (user) {
      user.workouts.push(workout.workout);
    } else {
      this.userData.push({
        id: this.userData.length + 1,
        name: workout.name,
        workouts: [workout.workout],
      });
    }
    this.saveDataToStorage();
  }
}
