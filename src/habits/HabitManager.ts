import { FileStorage } from "../storage/FileStorage.ts";
import { Habit } from "./Habit.ts";

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
    
    //Critical methods. I decided to automatically save everytime a new habit was created or removed. Only used by this class
    private save(): void {
        this._storage.saveHabits(this._habits);
    }

    // Methods to use later down in the markHabitComplete, 1st compares both dates and says yes or no. Second gets the date difference
    private isSameDay(a: Date, b: Date): boolean {
        return a.toDateString() === b.toDateString();
    }

    private isYesterday(today: Date, last: Date): boolean {
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        return this.isSameDay(yesterday, last);
    }

    //Add a new Habit; Creates Habit object, pushes it into the list
    public addHabit(name: string){
        const habit = new Habit(name);
        this._habits.push(habit);
        this.save(); // Call Save method to save it to the file
    }

    //Removes a habit by name; ensures the list stays consistent by saving again.
    public removeHabit(name: string): void{
        this._habits = this._habits.filter(h => h.name !== name);
        this.save();
    }

    //Lists all habits; returns a list. DOES NOT FORMAT OR PRINT (CLI handles display)
    public listHabits(): Habit[] {
        return this._habits;
    }
    
    //Find a habit; returns a habit object by name or ID. Used internally by other methods
    //If it doesn't exist, return
    private findHabit(name: string): Habit | undefined {
        return this._habits.find(h => h.name == name);
    }
    
    // Mark a habit complete. Finds habit using method above, calls updateComplete, updateDate, incStreakCount in Habit class
    // Basically handles streak logic
    public markHabitComplete(name: string): void{
        const habit = this.findHabit(name);
        if (!habit) return;

        // Need to compare today's date vs the habit's last completed date, so grab both and save into variables
        const today = new Date();
        const lastDate = habit.date;
        // Then apply rules; 

        // A - if habit was completed today, don't increment streak, just mark complete again
        if (lastDate && this.isSameDay(today, lastDate)) {
            habit.setComplete(true);
            this.save();
            return;
        }

        // B - If completed yesterday, a valid streak continuation, increment streak count, update the date to today
        if (lastDate && this.isYesterday(today, lastDate)){
            habit.incStreakCount();
        }

        // C - if the habit was completed more than 1 day ago, Streak is broken, reset it, set o 1, update the date
        else if (lastDate){
            habit.resetStreakCount();
        }
        // D - If habit was never completed, streak starts at 1, update the date
        else {
            habit.setStreakCount(1);
        }

        habit.setDate(today);
        habit.setComplete(true);
        this.save();
    }
    
    // Get a weekly summary that records the amount of habits completed and streaks maintained. Also starts the week on Sunday
    public getWeeklySummary() {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay());

        let completeThisWeek = 0;
        let streaksMaintained = 0;

        for (const habit of this._habits){
            if (!habit.date) continue;

            const date = new Date(habit.date);

            if (date >= startOfWeek && date <= now){
                completeThisWeek++;
            }

            if (habit.streakCount > 1){
                streaksMaintained++;
            }
        }
        return {
            completeThisWeek,
            streaksMaintained,
            totalHabits: this._habits.length
        };
    }

    // Method for future updates.
    //Reset a habit manually; calls resetComplete(), resetStreakCount(), doesn't reset the date, because that only happens on completion
    // public resetHabit(name: string): void{
    //     const habit = this.findHabit(name);
    //     if (!habit) return;

    //     habit.resetComplete();
    //     habit.resetStreakCount();
    // }
}