//Import the modules to use them in the menu
import * as readline from 'readline';
import { HabitManager } from "./habits/HabitManager.js";
import { Pomodoro } from "./pomodoro/PomodoroTimer.js";
import { FileStorage } from "./storage/FileStorage.js"

//Set instances of the objects to use in the file
// I gave a manual filepath for testing, but in future versions the user should be able to write to a file of their choice/fill it out
const filepath = 'habits.txt'
const storage = new FileStorage(filepath);
const manager = new HabitManager(storage);
// Create the timer, but set it to null because user hasn't actually set a duration yet.
let pomodoro: Pomodoro | null = null;

//Readline is used to read user input for the terminal, need to set up the interface
const rl = readline.createInterface( {
    input: process.stdin,
    output: process.stdout
});

//function to ask questions to the user.
// A promise is an object representint the eventual completion/failure of an asynch operation. A placeholder for a value that may be 
// available now, in the future, or never.
function ask(question: string): Promise<string> {
    return new Promise(resolve => rl.question(question, resolve));
}


// Put the menu as a function that will be called at the end
async function mainMenu() {
    let choice = -1;

    while (choice != 0){
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~POMODORO HABITS~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n")
        console.log("1. Add a habit");
        console.log("2. Remove a habit");
        console.log("3. Complete a habit");
        console.log("4. List habits");
        console.log("5. Weekly summary");
        console.log("6. Start Pomodoro");
        console.log("7. Stop Pomodoro");
        console.log("8. Reset Pomodoro");
        console.log("0. Quit");
        
        choice = parseInt(await ask("Choose an option: "));

        switch (choice){
            case 1: {
                const name = await ask("Enter a habit name: ");
                manager.addHabit(name);
                break;
            }
            case 2: {
                const name = await ask("Enter a habit name to remove: ");
                manager.removeHabit(name);
                break;
            }
            case 3: {
                const complete = await ask("Enter a habit name to mark complete: ")
                manager.markHabitComplete(complete);
                break;
            }
            case 4: {
                console.log(manager.listHabits());
                break;
            }
            case 5: {
                const summary = manager.getWeeklySummary();
                console.log(summary);
                break;
            }
            case 6: {
                // Need to put a number, otherwise the pomodoro parameters doesn't recognize it
                const minutes = Number(await ask("How long would you like to focus for? "))
                pomodoro = new Pomodoro(minutes, () => {
                    console.log("Pomodoro complete!")
                });
                pomodoro.startTimer();
                break;
            }
            case 7: {
                pomodoro?.stopTimer();
                break;
            }
            case 8: {
                pomodoro?.resetTimer();
                break;
            }
        }
    }
    rl.close();
    console.log("See you tomorrow!")
}

mainMenu();
