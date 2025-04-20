
import { Challenge, ChallengeType } from "@/types/challenge";

export const challenges: Challenge[] = [
  {
    id: "1",
    title: "Fix the Array Sum Function",
    shortDescription: "Find and fix the error in an array sum function",
    description: "This function is supposed to calculate the sum of all numbers in an array. However, it contains a bug that causes it to return incorrect results. Find and fix the error.",
    difficulty: "Easy",
    type: ChallengeType.FIND_ERROR,
    language: "javascript",
    initialCode: `function calculateSum(arr) {
  let sum = 0;
  
  for (let i = 0; i <= arr.length; i++) {
    sum += arr[i];
  }
  
  return sum;
}

// Example usage
const numbers = [5, 10, 15, 20, 25];
console.log(calculateSum(numbers)); // Should return 75`,
    solution: "for (let i = 0; i < arr.length; i++) {",
    solutionCode: `function calculateSum(arr) {
  let sum = 0;
  
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  
  return sum;
}

// Example usage
const numbers = [5, 10, 15, 20, 25];
console.log(calculateSum(numbers)); // Returns 75 correctly`,
    hints: "Pay close attention to the loop boundary condition. Off-by-one errors are common in loop iterations.",
    explanation: "The bug was in the loop condition. It used 'i <= arr.length' which would cause the loop to go one iteration too far (accessing arr[arr.length]), which is undefined. The correct condition should be 'i < arr.length'."
  },
  {
    id: "2",
    title: "Complete the Fibonacci Function",
    shortDescription: "Fill in the missing code to create a Fibonacci sequence generator",
    description: "Complete the missing parts of the function to generate the Fibonacci sequence up to n numbers. The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.",
    difficulty: "Medium",
    type: ChallengeType.COMPLETE_CODE,
    language: "javascript",
    initialCode: `function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const fibonacci = [0, 1];
  
  // Your code here - complete the function to generate 
  // the Fibonacci sequence up to n numbers
  
  return fibonacci;
}

// Example usage
console.log(generateFibonacci(8)); // Should return [0, 1, 1, 2, 3, 5, 8, 13]`,
    solution: `for (let i = 2; i < n; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  }`,
    solutionCode: `function generateFibonacci(n) {
  if (n <= 0) return [];
  if (n === 1) return [0];
  
  const fibonacci = [0, 1];
  
  for (let i = 2; i < n; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2];
  }
  
  return fibonacci;
}

// Example usage
console.log(generateFibonacci(8)); // Returns [0, 1, 1, 2, 3, 5, 8, 13]`,
    expectedOutput: "[0, 1, 1, 2, 3, 5, 8, 13]",
    hints: "The Fibonacci sequence is formed by adding the two previous numbers together. Start from index 2 and continue until you have n numbers."
  },
  {
    id: "3",
    title: "Guess the Output of Nested Loops",
    shortDescription: "Determine what will be printed by this nested loop pattern",
    description: "Review the following code with nested loops and predict what will be printed to the console. Write your answer exactly as it would appear, with proper line breaks.",
    difficulty: "Medium",
    type: ChallengeType.GUESS_OUTPUT,
    language: "javascript",
    initialCode: `let output = '';

for (let i = 1; i <= 4; i++) {
  for (let j = 1; j <= i; j++) {
    output += '*';
  }
  output += '\\n';
}

console.log(output);`,
    solution: "*\n**\n***\n****",
    expectedOutput: "*\n**\n***\n****",
    hints: "The code builds a pattern of asterisks. For each row (i), it adds i number of asterisks, followed by a newline character.",
    explanation: "The outer loop runs from 1 to 4, creating 4 rows. For each row i, the inner loop runs from 1 to i, adding that many asterisks to the output. After each row, a new line is added. This creates a right-angled triangle pattern of asterisks."
  },
  {
    id: "4",
    title: "Implement a String Reversal Function",
    shortDescription: "Write a function that reverses a string without using built-in reverse methods",
    description: "Write a function that takes a string as input and returns the string reversed, without using the built-in reverse() method. Your function should work for any string input.",
    difficulty: "Easy",
    type: ChallengeType.READ_WRITE,
    language: "javascript",
    initialCode: `function reverseString(str) {
  // Write your code here
}

// Example usage
console.log(reverseString("hello")); // Should output "olleh"
console.log(reverseString("JavaScript")); // Should output "tpircSavaJ"`,
    solution: `let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;`,
    solutionCode: `function reverseString(str) {
  let reversed = '';
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

// Example usage
console.log(reverseString("hello")); // "olleh"
console.log(reverseString("JavaScript")); // "tpircSavaJ"`,
    expectedOutput: "olleh\ntpircSavaJ",
    hints: "Consider looping through the string from the end to the beginning and building a new string character by character."
  },
  {
    id: "5",
    title: "Debug a Recursive Function",
    shortDescription: "Find and fix the error in a recursive factorial function",
    description: "This recursive factorial function has a bug that causes it to enter an infinite recursion for valid inputs. Find and fix the bug.",
    difficulty: "Hard",
    type: ChallengeType.FIND_ERROR,
    language: "javascript",
    initialCode: `function factorial(n) {
  if (n <= 0) {
    return 1;
  }
  
  return n * factorial(n);
}

// Example usage
console.log(factorial(5)); // Should return 120`,
    solution: "return n * factorial(n - 1);",
    solutionCode: `function factorial(n) {
  if (n <= 0) {
    return 1;
  }
  
  return n * factorial(n - 1);
}

// Example usage
console.log(factorial(5)); // Returns 120 correctly`,
    hints: "Look closely at the recursive call. Is the function approaching the base case with each call?",
    explanation: "The bug was in the recursive call. The function was calling itself with the same value of n each time (factorial(n)), which would never reach the base case and cause a stack overflow. The correct recursive call should be factorial(n - 1) to decrement the value with each call until it reaches the base case."
  },
  {
    id: "6",
    title: "Complete the Area Calculator",
    shortDescription: "Implement the missing methods in a geometric area calculator",
    description: "Complete the geometric area calculator class by implementing the missing methods for calculating the area of a circle and a triangle.",
    difficulty: "Medium",
    type: ChallengeType.COMPLETE_CODE,
    language: "javascript",
    initialCode: `class AreaCalculator {
  // Calculate area of rectangle (implemented for reference)
  calculateRectangleArea(width, height) {
    return width * height;
  }
  
  // Complete this method to calculate circle area
  calculateCircleArea(radius) {
    // Your code here - use Math.PI for π
  }
  
  // Complete this method to calculate triangle area
  calculateTriangleArea(base, height) {
    // Your code here
  }
}

// Example usage
const calculator = new AreaCalculator();
console.log(calculator.calculateRectangleArea(4, 5)); // 20
console.log(calculator.calculateCircleArea(3)); // Should be approximately 28.27
console.log(calculator.calculateTriangleArea(6, 4)); // Should be 12`,
    solution: `calculateCircleArea(radius) {
    return Math.PI * radius * radius;
  }
  
  calculateTriangleArea(base, height) {
    return 0.5 * base * height;
  }`,
    solutionCode: `class AreaCalculator {
  // Calculate area of rectangle (implemented for reference)
  calculateRectangleArea(width, height) {
    return width * height;
  }
  
  calculateCircleArea(radius) {
    return Math.PI * radius * radius;
  }
  
  calculateTriangleArea(base, height) {
    return 0.5 * base * height;
  }
}

// Example usage
const calculator = new AreaCalculator();
console.log(calculator.calculateRectangleArea(4, 5)); // 20
console.log(calculator.calculateCircleArea(3)); // Approximately 28.27
console.log(calculator.calculateTriangleArea(6, 4)); // 12`,
    expectedOutput: "20\n28.274333882308138\n12",
    hints: "For the circle area, use the formula πr². For the triangle area, use base × height ÷ 2."
  },
  {
    id: "7",
    title: "Guess the Output: Array Methods",
    shortDescription: "Predict the result of array manipulations",
    description: "Review the following code that uses various array methods. Predict what will be printed to the console for each line.",
    difficulty: "Hard",
    type: ChallengeType.GUESS_OUTPUT,
    language: "javascript",
    initialCode: `const fruits = ['apple', 'banana', 'cherry'];
const numbers = [1, 2, 3, 4, 5];

console.log(fruits.slice(1, 2));
console.log([...fruits, 'orange']);
console.log(numbers.map(n => n * 2));
console.log(numbers.filter(n => n % 2 === 0));
console.log(numbers.reduce((sum, n) => sum + n, 0));`,
    solution: `["banana"]
["apple", "banana", "cherry", "orange"]
[2, 4, 6, 8, 10]
[2, 4]
15`,
    expectedOutput: `["banana"]
["apple", "banana", "cherry", "orange"]
[2, 4, 6, 8, 10]
[2, 4]
15`,
    hints: "Think about what each array method does: slice extracts a portion, spread creates a new array, map transforms each element, filter selects elements based on a condition, and reduce accumulates values.",
    explanation: "1) slice(1, 2) returns elements from index 1 up to (but not including) index 2, which is ['banana'].\n2) The spread operator creates a new array with all original elements plus 'orange'.\n3) map multiplies each number by 2.\n4) filter keeps only the even numbers (2 and 4).\n5) reduce adds all numbers together, starting with an initial value of 0."
  },
  {
    id: "8",
    title: "Fix the Promise Chain",
    shortDescription: "Debug and fix the broken promise chain",
    description: "This code tries to implement a series of asynchronous operations using promises, but it contains errors that break the chain. Identify and fix the issues.",
    difficulty: "Hard",
    type: ChallengeType.FIND_ERROR,
    language: "javascript",
    initialCode: `function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
}

function processData(data) {
  return new Promise((resolve, reject) => {
    if (data) {
      resolve("Data processed: " + data);
    } else {
      reject("Error: No data to process");
    }
  });
}

// The promise chain has issues
fetchData()
  .then(data => {
    processData(data);
  })
  .then(result => {
    console.log(result);
    return "Operation complete";
  })
  .catch(error => {
    console.error(error);
  });`,
    solution: `.then(data => {
    return processData(data);
  })`,
    solutionCode: `function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Data fetched!"), 1000);
  });
}

function processData(data) {
  return new Promise((resolve, reject) => {
    if (data) {
      resolve("Data processed: " + data);
    } else {
      reject("Error: No data to process");
    }
  });
}

// Fixed promise chain
fetchData()
  .then(data => {
    return processData(data);
  })
  .then(result => {
    console.log(result);
    return "Operation complete";
  })
  .catch(error => {
    console.error(error);
  });`,
    hints: "Remember that in promise chains, you need to return the promise from each .then callback to maintain the chain.",
    explanation: "The bug was that the first .then callback didn't return the promise from processData(). Without returning that promise, the next .then in the chain would execute immediately without waiting for processData to complete, and 'result' would be undefined. The correct implementation returns the promise: return processData(data);"
  }
];
