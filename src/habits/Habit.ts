//Habit class - contains the attributes of an individual habit
export class Habit {
    //Field - a name, a date/timestamp it was last completed, completion status, and streak count
    private _name: string;
    private _date: Date;
    private _complete: boolean;
    private _streakCount: number;

    // Classes in Typescript need to be assigned to a constructor or an error message is read.
    //The user will fill only fill out name and date because a habit is complete nor has a streak
    //when first created. 
    constructor(name: string) {
        this._name = name;
        this._date = new Date();
        // When a habit is fist created, it's not going to be complete, thus false
        this._complete = false;
        this._streakCount = 0;
    }

    // Methods - Only for single class, group tasks is handled by the manager

    // Method to Mark a task complete, changes the bolean value
    public updateComplete() {
        this._complete = true;
        return this._complete;
    }

    // Method to reset the complete status, set back to false
    public resetComplete() {
        this._complete = false;
        return this._complete;
    }

    // Method to update the name of a habit,
    public updateName(name: string){
        this._name = name;       
    }

    // Method to increment the streak count. The user won't ever actually use this,
    //It's managed by the HabitManager
    public incStreakCount() {
        this._streakCount += 1;
    }

    //Method to reset the streak count
    public resetStreakCount(){
        this._streakCount = 0;
    }

    //Method to update the date, used by manager with the streaks
    public updateDate(){
        let newDate = new Date();
        this._date = newDate;
    }
}
//Need to declare export so this module can be imported into other modules such as HabitManager