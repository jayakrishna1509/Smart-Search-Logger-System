# 🛠 Task: Smart Search & Logger System (Web-based Simulation)

This task will cover the following concepts:
- Promises: Simulating async operations like fetching search results using Promise
- Promise Chaining: Transforming and handling search data step-by-step
- Debouncing & Throttling: Optimizing user input handling to avoid excessive function calls
- Function Currying: Creating a logger that stores partial function data and prints structured logs

## 🎯 Objective

Build a simple simulated search feature that imitates querying a database and logging the result. When the user types into the input box, debounce the search function to prevent unnecessary lookups. Simulate fetching results using Promises and apply promise chaining to clean and format the data before displaying it. Use throttling to log user keystrokes at intervals, and function currying to build a custom logger that prints messages in a structured format (e.g., [TYPE] - message).

## 🖥️ Sample Output (in console and browser)

### User types “hello”  
(INFO) - Throttled keystroke: h  
(INFO) - Throttled keystroke: he  
(INFO) - Throttled keystroke: hell  
(INFO) - Throttled keystroke: hello  
(INFO) - Debounced search triggered  

### After 1 second delay  
Browser displays:  
Results: HELLO, RESULT1, RESULT2
