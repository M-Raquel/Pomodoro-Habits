import { Habit} from "../habits/Habit.js";
import * as fs from "fs";
// Class that Reads/Writes to JSON files.

export class FileStorage{
    //Only needs 1 field, a file path
    private _filepath: string;

    constructor(filepath: string){
        this._filepath = filepath;
    }

    //Methods - only need 2

    // Saves Habits to a file in JSON, takes in a lsit of habits 
    public saveHabits(habits: Habit[]){
        try {
            const jsonList = JSON.stringify(habits, null, 2);

            fs.writeFileSync(this._filepath, jsonList);

        } catch (err) {
            console.error("Error saving habits:", err)
        }
    }
    
    //Reads Habit Objects from a file, ask user for the file
    public loadHabits(): Habit[] {
        //Check if the directory even exists
        if (!fs.existsSync(this._filepath)){
            return [];
        }

        try{
            // Read from the file and put the raw data into a list to construct into Habit objects later
            const data = fs.readFileSync(this._filepath, 'utf-8');
            const rawList = JSON.parse(data)

            //Parse JSON into Habbit objects 
            //Validate and convert to Habit instances, function to map the objects
            return rawList.map((obj: any) => {
                const habit = new Habit(obj.name)

                //restore fields using the setters in Habit.ts
                habit.setDate( new Date(obj.date));
                habit.setComplete(obj.complete);
                habit.setStreakCount(obj.streakCount);

                return habit;
            });
        } catch (err) {
            console.error(`Error reading or parsing file: ${(err as Error).message}`);
            return [];
        }
    }
}