# Overview

This project is a command‑line Pomodoro and habit‑tracking application written in TypeScript. My goal in building it was to deepen my understanding of TypeScript’s class system, module structure, and type‑safe architecture while practicing real‑world software engineering patterns. I wanted to move beyond small syntax exercises and build something that feels like a real tool — something with state management, file persistence, user interaction, and clean separation of concerns.

The application allows users to create habits, track daily completions, maintain streaks, and run Pomodoro timers that automatically update habit progress. I focused heavily on designing maintainable classes, enforcing clear boundaries between logic layers, and writing code that is predictable, testable, and easy to extend.
This project helped me explore TypeScript’s strengths, including strong typing, encapsulation, ES module behavior, and how to structure a multi‑file application in a way that feels professional.

[Typescript Software Demo](http://youtube.link.goes.here)

# Development Environment

Editor: Visual Studio Code
Runtime: Node.js
Language: Typescript

Tools and Libraries:
- ts-node for running TypeScript directly
- readline module for CLI interaction
- No external frameworks

# Useful Websites and Videos

- [Digital Ocean New Typescript Project](https://www.digitalocean.com/community/tutorials/typescript-new-project)
- [Official Typescript Documentation](https://www.typescriptlang.org/docs/handbook/2/classes.html)
- [Typescript in 100 Seconds](https://www.youtube.com/watch?v=zQnBQ4tB3ZA)
- [W3Schools Javascript](https://www.w3schools.com/howto/howto_js_todolist.asp)
- [Online JavaScript Compiler (Programiz)](https://www.programiz.com/javascript/online-compiler)
- [How to Format Date in TypeScript – GeeksforGeeks](https://www.geeksforgeeks.org/how-to-format-date-in-typescript/)
- [TypeScript: setInterval() and clearInterval() methods (Sling Academy)](https://www.slingacademy.com/article/typescript-setinterval-and-clearinterval-methods/)
- [How to use Interface with Class in TypeScript – GeeksforGeeks](https://www.geeksforgeeks.org/how-to-use-interface-with-class-in-typescript/)
- [How to declare an Array of Objects in TypeScript – bobbyhadz](https://bobbyhadz.com/blog/typescript-array-of-objects)
- [Understanding TypeScript object serialization – LogRocket](https://blog.logrocket.com/understanding-typescript-object-serialization/)
- [How to write to a File using TypeScript – bobbyhadz](https://bobbyhadz.com/blog/typescript-write-to-file)
- [TypeScript Objects Explained (Video)](https://www.youtube.com/watch?v=ZK5v2F8ZJxw)
- [How to Get Value of Input in TypeScript – GeeksforGeeks](https://www.geeksforgeeks.org/how-to-get-value-of-input-in-typescript/)
- [How to use Async/Await with a Promise in TypeScript – GeeksforGeeks](https://www.geeksforgeeks.org/how-to-use-async-await-with-a-promise-in-typescript/)

# AI Disclosure
This project was developed by me, and all architectural decisions, class design, debugging, and final implementation were written and reasoned through by hand. I used AI tools as a supplemental resource during development — primarily to clarify TypeScript behaviors, explore alternative design patterns, and troubleshoot issues related to module resolution, date handling, and CLI flow.
AI assistance was also used to help refine documentation and improve the clarity of explanations in this README. All final code, logic, and structural decisions were reviewed, tested, and implemented manually to ensure I fully understood the concepts and could apply them independently.

# Future Work

{Make a list of things that you need to fix, improve, and add in the future.}

- Implement the "Reset Habit" option to the menu
- Improve the weekly summary with more detailed stats
- Add color formatting to the CLI or think of another visual besides the terminal
- Add editing optoins for habit names and streaks
- Improve error handling and input validation
- Add a way to track total time focused for a Habit