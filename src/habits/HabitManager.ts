import { FileStorage } from "../storage/FileStorage.js";
import { Habit } from "./Habit.js";

//Habit Manager Class - It's responsible for calling Habit methods, Mantaining the list, and enforcing rules
// Does not Print/log anything, format output, handle user input, manage timers, or store UI-related data

export class HabitManager{
    // Fields are an array of habit objects and a private storage of FileStorage
    private _habits: Habit[] = [];
    private _storage: FileStorage; //Supposed to load on startup

    //Accept a FileStorage Instance and immediately loads habits from storage into the list of private habits
    constructor(storage: FileStorage){
        this._storage = storage;
        this._habits = this._storage.loadHabits();
    }
    //Methods
    
    //Critical method. I decided to automatically save everytime a new habit was created or removed. Only used by this class
    private save(): void {
        this._storage.saveHabits(this._habits);
    }

    //Add a new Habit; Creates Habit object, pushes it into the list
    public addHabit(name: string){
        const habit = new Habit(name);
        this._habits.push(habit);
        this.save(); // Call Save method to save it to the file
    }

    //Removes a habit by name; ensures the list stays consistent by saving again.
    public removeHabit(name: string): void{
        this._habits = this._habits.filter(h => h.getName() !== name);
        this.save();
    }

    //Lists all habits; returns a list. DOES NOT FORMAT OR PRINT (CLI handles display)
    public listHabits(): Habit[] {
        return this._habits;
    }
    
    //Find a habit; returns a habit object by name or ID. Used internally by other methods
    //If it doesn't exist, return
    private findHabit(name: string): Habit | undefined {
        return this._habits.find(h => h.getName() == name);
    }
    
    // Mark a habit complete. Finds habit, calls updateComplete, updateDate, incStreakCount
    // Basically handles streak logic
    public markHabitComplete(name: string): void{
        
    }
    // Need to compare today's date vs the habit's last completed date
    // Then apply rules; 
    // A - if habit was completed today, don't increment streak, just mark complete again
    // B - If completed yesterday, a valid streak continuation, increment streak count, update the date to today
    // C - if the habit was completed more than 1 day ago, Streak is broken, reset it, set o 1, update the date
    // D - If habit was never completed, streak starts at 1, update the date
    
    //Reset a habit; calls resetComplete(), resetStreakCount(), resets the date
    
    //Save Habits; calls Storage class, Serializes the list. Keep storage logic outside of habit itself
    
    //Load Habits; Reads from storage, reconstructs Habit objects
}