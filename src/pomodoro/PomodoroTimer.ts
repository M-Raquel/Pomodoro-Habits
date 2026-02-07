// Timer class - contains attributes and methods for the pomodoro timer
class Pomodoro {
    // Field - duration is the amount set by the user. IntervalId is used to decrease the counter 
    // every second until it reaches 0. It is currently undefined until startTimer() method.
    private _duration: number;
    private _counter: number;
    private _intervalId: number | undefined;

    // Input from the user will determine the duration.
    constructor(duration: number){
        this._counter = duration;
        this._duration = duration;
    }

    //Method to start. Void, because it doesn't return anything. Contains an arrow function that decreases the timer once it starts.
    // The SetInterval() method is used to repeatedly execute a function at a fixed time interval 
    //until it is topped with clearInterval();
    // Put an edge case where starting the timer again, does nothing. 
    public startTimer(): void {
        if (this._intervalId == undefined)
            {
                this._intervalId = setInterval(() => {
                    this._counter--;
        
                    //If the timer reaches zero before another timer method is called, stop
                    if (this._counter <= 0 && this._intervalId) {
                        clearInterval(this._intervalId);
                    }
                }, 1000); // Rate of the countdown in miliseconds
            }
        else{
            return;
        }
    }

    //Method to stop. Clear the interval so it stops decreasing and set back to undefined.
    public stopTimer(): void {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
    }

    //Method to reset the timer. Sets Counter back to the original duration
    public resetTimer() {
        this._counter = this._duration;
        clearInterval(this._intervalId);
        this._intervalId = undefined;
    }

    //Method to display the current time counting down. 
    public get currentCount() {
        return this._counter;
    }

    //Method to change the duration of the pomodoro. Also resets the counter, but doesn't stop the countdown
    public changeDuration(duration: number){
        this._duration = duration;
        this._counter = duration;
    }
}