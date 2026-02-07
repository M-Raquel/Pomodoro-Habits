//Habit Manager Class - It's responsible for calling Habit methods, Mantaining the list, and enforcing rules
// Does not Print/log anything, format output, handle user input, manage timers, or store UI-related data

// Add a reference to storage class, if you want to handle saving/loading
// Keeps storage logic out of the Habit itself

//List/Array of Habit Objects 

//Methods

//Add a new Habit; Creates Habit object, pushes it into the list

//Removes a habit; By name or index, ensures the list stays consistent

//Lists all habits; returns a list. DOES NOT FORMAT OR PRINT (CLI handles display)

//Find a habit; returns a habit object by name or ID. Used internally by other methods
//If it doesn't exist, return or throw and error

// Mark a habit complete. Finds habit, calls updateComplete, updateDate, incStreakCount
// Basically handles streak logic
// Need to compare today's date vs the habit's last completed date
// Then apply rules; 
// A - if habit was completed today, don't increment streak, just mark complete again
// B - If completed yesterday, a valid streak continuation, increment streak count, update the date to today
// C - if the habit was completed more than 1 day ago, Streak is broken, reset it, set o 1, update the date
// D - If habit was never completed, streak starts at 1, update the date



//Reset a habit; calls resetComplete(), resetStreakCount(), resets the date

//Save Habits; calls Storage class, Serializes the list

//Load Habits; Reads from storage, reconstructs Habit objects
