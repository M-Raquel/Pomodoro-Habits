//Import the modules to use them in the menu
import * as readline from 'readline';
import { HabitManager } from "./habits/HabitManager.ts";
import { Pomodoro } from "./pomodoro/PomodoroTimer.ts";
import { FileStorage } from "./storage/FileStorage.ts"

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
        console.log("9. Check Current Time");
        console.log("10. Check Status");
        console.log("0. Quit");
        
        choice = parseInt(await ask("Choose an option: "));

        switch (choice){
            case 1: {
                const name = await ask("Enter a habit name: ");
                manager.addHabit(name);
                console.log(`${name} was added to your list`)
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 2: {
                const name = await ask("Enter a habit name to remove: ");
                manager.removeHabit(name);
                console.log(`${name} was removed from your list`)
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 3: {
                const complete = await ask("Enter a habit name to mark complete: ")
                manager.markHabitComplete(complete);
                console.log(`${complete} [ X ]`)
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 4: {
                const habits = manager.listHabits();
                console.log("\nYour Habits:")
                habits.forEach(h => {
                    console.log(`- ${h.name} | Complete: ${h.complete} | Streak: ${h.streakCount}`);
                })
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 5: {
                const summary = manager.getWeeklySummary();
                console.log(summary);
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 6: {
                // Need to put a number, otherwise the pomodoro parameters doesn't recognize it
                const minutes = Number(await ask("How long would you like to focus for? "))
                const seconds = minutes * 60;

                // Create a pomodoro with callback
                pomodoro = new Pomodoro(seconds, async () => {
                    console.log("\nPomodoro complete!")

                    const habitName = await ask("Which habit should this Pomodoro apply to? ");
                    manager.markHabitComplete(habitName);
                });
                pomodoro.startTimer();
                console.log("Pomodoro Started!")
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 7: {
                pomodoro?.stopTimer();
                console.log("Pomodoro stopped.");
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 8: {
                pomodoro?.resetTimer();
                console.log("Pomodoro reset.")
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 9: {
                if (!pomodoro) console.log("No timer running.");
                else console.log(`Time left: ${pomodoro.currentCount} seconds`);
                await ask("\nPress Enter to return to the menu...");
                break;
            }
            case 10: {
                if (!pomodoro) console.log("No timer running.");
                else console.log(`Timer complete? ${pomodoro.status}`);
                await ask("\nPress Enter to return to the menu...");
                break;
            }
        }
    }
    rl.close();
    console.log("See you tomorrow!")
}

mainMenu();
