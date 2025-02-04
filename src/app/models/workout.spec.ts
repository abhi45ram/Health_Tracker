import { Workout } from './workout';

describe('Workout', () => {
  it('should create an instance', () => {
    const workout: Workout ={type:'Running',minutes:30};
    expect(workout).toBeTruthy();  });
});
