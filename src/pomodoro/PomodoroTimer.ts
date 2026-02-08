// Timer class - contains attributes and methods for the pomodoro timer
export class Pomodoro {
    // Field - duration is the amount set by the user. IntervalId is used to decrease the counter 
    // every second until it reaches 0. It is currently undefined until startTimer() method.
    // small function that checks if it is complete, and that states it is so.
    private _duration: number;
    private _counter: number;
    private _intervalId: NodeJS.Timeout | undefined;
    private _complete: boolean;
    private _onComplete: (() => void) | null;

    // Input from the user will determine the duration.
    constructor(duration: number, onComplete?: () => void){
        this._counter = duration;
        this._duration = duration;
        this._complete = false;
        this._onComplete = onComplete ?? null;
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
    
                    //If the timer reaches zero before another timer method is called, stop and reset 
                    if (this._counter <= 0 && this._intervalId) {
                        clearInterval(this._intervalId);
                        this._intervalId = undefined;
                        this._counter = this._duration;
                        this._complete = true;

                        if (this._onComplete){
                            this._onComplete();
                        }
                    }
                }, 1000); // Rate of the countdown in miliseconds
            }
        else{
            return;
        }
    }

    //Method to stop. Clear the interval so it stops decreasing and set back to undefined.
    // Don't need to change the _complete.
    public stopTimer(): void {
        if (this._intervalId) {
            clearInterval(this._intervalId);
            this._intervalId = undefined;
        }
    }

    //Method to reset the timer. Sets Counter back to the original duration
    public resetTimer() {
        this._counter = 0;
        clearInterval(this._intervalId);
        this._intervalId = undefined;
        this._complete = false;
    }

    //Method to check state of the timer, Is it complete yet?
    get currentCount() {
        return this._counter;
    }

    get status(){
        return this._complete;
    }

    // Add this in a future update. 
    //Method to change the duration of the pomodoro. Also resets the counter and stops timer
    // public changeDuration(duration: number){
    //     clearInterval(this._intervalId);
    //     this._intervalId = undefined;
    //     this._duration = duration;
    //     this._counter = duration;
    //     this._complete = false;
    // }
}