import { Habit} from "../habits/Habit.js";
// Class that Reads/Writes to JSON files.

class FileStorage{
    //Only needs 1 field, a file path
    private _filepath: string;

    constructor(filepath: string){
        this._filepath = filepath;
    }

    //Only needs two methods, to convert habit objects into JSON and laod them.
    public saveHabits(habits: Habit[]){

    }

    public loadHabits(){
        //Reads the JSON file 
    }
}
