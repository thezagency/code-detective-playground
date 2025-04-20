import { Challenge, ChallengeType, DifficultyLevel } from "@/types/challenge";

// Helper function to create challenge IDs
const generateId = (() => {
  let id = 0;
  return () => (++id).toString();
})();

// BEGINNER CHALLENGES
const beginnerChallenges: Challenge[] = [
  {
    id: generateId(),
    title: "Fix the Array Sum Function",
    shortDescription: "Find and fix the error in an array sum function",
    description: "This function is supposed to calculate the sum of all numbers in an array. However, it contains a bug that causes it to return incorrect results. Find and fix the error.",
    difficulty: DifficultyLevel.BEGINNER,
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
    explanation: "The bug was in the loop condition. It used 'i <= arr.length' which would cause the loop to go one iteration too far (accessing arr[arr.length]), which is undefined. The correct condition should be 'i < arr.length'.",
    points: 10
  },
  {
    id: generateId(),
    title: "Implement a String Reversal Function",
    shortDescription: "Write a function that reverses a string without using built-in reverse methods",
    description: "Write a function that takes a string as input and returns the string reversed, without using the built-in reverse() method. Your function should work for any string input.",
    difficulty: DifficultyLevel.BEGINNER,
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
    hints: "Consider looping through the string from the end to the beginning and building a new string character by character.",
    points: 15
  },
  {
    id: generateId(),
    title: "Fix the Even Number Filter",
    shortDescription: "Debug a function that should filter even numbers",
    description: "This function is supposed to filter out odd numbers and return only even numbers from an array. However, it's not working correctly. Find and fix the error.",
    difficulty: DifficultyLevel.BEGINNER,
    type: ChallengeType.FIND_ERROR,
    language: "javascript",
    initialCode: `function getEvenNumbers(numbers) {
  return numbers.filter(num => num / 2 === 0);
}

// Example usage
console.log(getEvenNumbers([1, 2, 3, 4, 5, 6])); // Should return [2, 4, 6]`,
    solution: "num % 2 === 0",
    solutionCode: `function getEvenNumbers(numbers) {
  return numbers.filter(num => num % 2 === 0);
}

// Example usage
console.log(getEvenNumbers([1, 2, 3, 4, 5, 6])); // Returns [2, 4, 6]`,
    hints: "Think about how to check if a number is even. Division or remainder?",
    explanation: "The bug was using division (/) instead of modulo (%) to check for even numbers. Division will almost never equal exactly zero, but the remainder of an even number divided by 2 will be exactly 0.",
    points: 10
  },
  {
    id: generateId(),
    title: "Complete the Greeter Function",
    shortDescription: "Fill in the missing code to create a greeting function",
    description: "Complete the function to create a personalized greeting. The function should take a name and return a greeting message with the name included.",
    difficulty: DifficultyLevel.BEGINNER,
    type: ChallengeType.COMPLETE_CODE,
    language: "javascript",
    initialCode: `function createGreeting(name) {
  // Your code here - make the function return "Hello, [name]!"
}

// Example usage
console.log(createGreeting("Alice")); // Should return "Hello, Alice!"
console.log(createGreeting("World")); // Should return "Hello, World!"`,
    solution: `return "Hello, " + name + "!";`,
    solutionCode: `function createGreeting(name) {
  return "Hello, " + name + "!";
}

// Example usage
console.log(createGreeting("Alice")); // Returns "Hello, Alice!"
console.log(createGreeting("World")); // Returns "Hello, World!"`,
    expectedOutput: "Hello, Alice!\nHello, World!",
    hints: "Use string concatenation or template literals to include the name in the greeting.",
    points: 5
  },
  {
    id: generateId(),
    title: "Guess the Output: Basic Math",
    shortDescription: "Predict what this math expression will output",
    description: "Look at the following code and predict what will be printed to the console.",
    difficulty: DifficultyLevel.BEGINNER,
    type: ChallengeType.GUESS_OUTPUT,
    language: "javascript",
    initialCode: `let x = 5;
let y = "10";
let z = 2;

console.log(x + y);
console.log(x * z);
console.log(y - z);`,
    solution: "510\n10\n8",
    expectedOutput: "510\n10\n8",
    hints: "Remember that JavaScript performs type conversion depending on the operation.",
    explanation: "In the first line, + operates as concatenation since one operand is a string, resulting in '510'. In the second line, * forces conversion of operands to numbers, giving 10. In the third line, - also forces conversion to numbers, resulting in 8.",
    points: 10
  }
];

// INTERMEDIATE CHALLENGES
const intermediateChallenges: Challenge[] = [
  {
    id: generateId(),
    title: "Complete the Fibonacci Function",
    shortDescription: "Fill in the missing code to create a Fibonacci sequence generator",
    description: "Complete the missing parts of the function to generate the Fibonacci sequence up to n numbers. The Fibonacci sequence starts with 0 and 1, and each subsequent number is the sum of the two preceding ones.",
    difficulty: DifficultyLevel.INTERMEDIATE,
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
    hints: "The Fibonacci sequence is formed by adding the two previous numbers together. Start from index 2 and continue until you have n numbers.",
    points: 25
  },
  {
    id: generateId(),
    title: "Guess the Output: Nested Loops",
    shortDescription: "Determine what will be printed by this nested loop pattern",
    description: "Review the following code with nested loops and predict what will be printed to the console. Write your answer exactly as it would appear, with proper line breaks.",
    difficulty: DifficultyLevel.INTERMEDIATE,
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
    explanation: "The outer loop runs from 1 to 4, creating 4 rows. For each row i, the inner loop runs from 1 to i, adding that many asterisks to the output. After each row, a new line is added. This creates a right-angled triangle pattern of asterisks.",
    points: 20
  },
  {
    id: generateId(),
    title: "Complete the Area Calculator",
    shortDescription: "Implement the missing methods in a geometric area calculator",
    description: "Complete the geometric area calculator class by implementing the missing methods for calculating the area of a circle and a triangle.",
    difficulty: DifficultyLevel.INTERMEDIATE,
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
    hints: "For the circle area, use the formula πr². For the triangle area, use base × height ÷ 2.",
    points: 25
  },
  {
    id: generateId(),
    title: "Fix the Object Destructuring",
    shortDescription: "Find and fix the error in object destructuring syntax",
    description: "This code attempts to extract properties from an object using destructuring, but there's an error. Find and fix it.",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.FIND_ERROR,
    language: "javascript",
    initialCode: `const person = {
  name: 'Alex',
  age: 28,
  address: {
    city: 'New York',
    zip: '10001'
  }
};

// There's a problem with this destructuring
const { name, age, address: { city, zip } } = person;

console.log(name); // Should print 'Alex'
console.log(age);  // Should print 28
console.log(address); // Should print the address object
console.log(city); // Should print 'New York'
console.log(zip);  // Should print '10001'`,
    solution: "const { name, age, address, address: { city, zip } } = person;",
    solutionCode: `const person = {
  name: 'Alex',
  age: 28,
  address: {
    city: 'New York',
    zip: '10001'
  }
};

// Fixed destructuring
const { name, age, address, address: { city, zip } } = person;

console.log(name); // Prints 'Alex'
console.log(age);  // Prints 28
console.log(address); // Prints the address object
console.log(city); // Prints 'New York'
console.log(zip);  // Prints '10001'`,
    hints: "When you destructure nested properties, the parent property itself isn't automatically extracted.",
    explanation: "The original code was destructuring the nested properties 'city' and 'zip' from 'address', but wasn't keeping the 'address' object itself. The fix is to extract the 'address' object separately by including it in the destructuring pattern.",
    points: 20
  },
  {
    id: generateId(),
    title: "Implement a Palindrome Checker",
    shortDescription: "Write a function that checks if a string is a palindrome",
    description: "Write a function that determines if a given string is a palindrome (reads the same forward and backward). Ignore case and non-alphanumeric characters.",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.READ_WRITE,
    language: "javascript",
    initialCode: `function isPalindrome(str) {
  // Write your code here
}

// Example usage
console.log(isPalindrome("racecar")); // Should return true
console.log(isPalindrome("hello")); // Should return false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // Should return true`,
    solution: `  // Convert to lowercase and remove non-alphanumeric characters
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Check if the cleaned string equals its reverse
  const reversedStr = cleanStr.split('').reverse().join('');
  return cleanStr === reversedStr;`,
    solutionCode: `function isPalindrome(str) {
  // Convert to lowercase and remove non-alphanumeric characters
  const cleanStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Check if the cleaned string equals its reverse
  const reversedStr = cleanStr.split('').reverse().join('');
  return cleanStr === reversedStr;
}

// Example usage
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello")); // false
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true`,
    expectedOutput: "true\nfalse\ntrue",
    hints: "You'll need to handle preprocessing the string (remove spaces and special characters, convert to lowercase) before checking if it's a palindrome.",
    points: 25
  }
];

// ADVANCED CHALLENGES
const advancedChallenges: Challenge[] = [
  {
    id: generateId(),
    title: "Debug a Recursive Function",
    shortDescription: "Find and fix the error in a recursive factorial function",
    description: "This recursive factorial function has a bug that causes it to enter an infinite recursion for valid inputs. Find and fix the bug.",
    difficulty: DifficultyLevel.ADVANCED,
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
    explanation: "The bug was in the recursive call. The function was calling itself with the same value of n each time (factorial(n)), which would never reach the base case and cause a stack overflow. The correct recursive call should be factorial(n - 1) to decrement the value with each call until it reaches the base case.",
    points: 30
  },
  {
    id: generateId(),
    title: "Guess the Output: Array Methods",
    shortDescription: "Predict the result of array manipulations",
    description: "Review the following code that uses various array methods. Predict what will be printed to the console for each line.",
    difficulty: DifficultyLevel.ADVANCED,
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
    explanation: "1) slice(1, 2) returns elements from index 1 up to (but not including) index 2, which is ['banana'].\n2) The spread operator creates a new array with all original elements plus 'orange'.\n3) map multiplies each number by 2.\n4) filter keeps only the even numbers (2 and 4).\n5) reduce adds all numbers together, starting with an initial value of 0.",
    points: 35
  },
  {
    id: generateId(),
    title: "Fix the Promise Chain",
    shortDescription: "Debug and fix the broken promise chain",
    description: "This code tries to implement a series of asynchronous operations using promises, but it contains errors that break the chain. Identify and fix the issues.",
    difficulty: DifficultyLevel.ADVANCED,
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
    explanation: "The bug was that the first .then callback didn't return the promise from processData(). Without returning that promise, the next .then in the chain would execute immediately without waiting for processData to complete, and 'result' would be undefined. The correct implementation returns the promise: return processData(data);",
    points: 30
  },
  {
    id: generateId(),
    title: "Implement a Deep Object Clone Function",
    shortDescription: "Write a function that creates a deep copy of an object",
    description: "Create a function that performs a deep clone of an object, handling nested objects and arrays but not functions, RegExp, Date, Map, Set, or circular references.",
    difficulty: DifficultyLevel.ADVANCED,
    type: ChallengeType.READ_WRITE,
    language: "javascript",
    initialCode: `function deepClone(obj) {
  // Write your code here
}

// Example usage
const original = {
  a: 1,
  b: { c: 2, d: [3, 4] },
  e: [5, { f: 6 }]
};

const clone = deepClone(original);
console.log(clone); // Should look like original
console.log(clone === original); // Should be false
console.log(clone.b === original.b); // Should be false
console.log(clone.e === original.e); // Should be false`,
    solution: `  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  // Handle objects
  const cloned = {};
  Object.keys(obj).forEach(key => {
    cloned[key] = deepClone(obj[key]);
  });
  
  return cloned;`,
    solutionCode: `function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  // Handle objects
  const cloned = {};
  Object.keys(obj).forEach(key => {
    cloned[key] = deepClone(obj[key]);
  });
  
  return cloned;
}

// Example usage
const original = {
  a: 1,
  b: { c: 2, d: [3, 4] },
  e: [5, { f: 6 }]
};

const clone = deepClone(original);
console.log(clone); // Looks like original
console.log(clone === original); // false
console.log(clone.b === original.b); // false
console.log(clone.e === original.e); // false`,
    hints: "Use recursion to handle nested objects and arrays. Handle primitives and different object types separately.",
    points: 40
  },
  {
    id: generateId(),
    title: "Optimize the Fibonacci Sequence",
    shortDescription: "Refactor a Fibonacci function to be more efficient",
    description: "The given Fibonacci implementation is inefficient due to redundant recursive calls. Optimize it using memoization or iteration to improve its performance without changing its result.",
    difficulty: DifficultyLevel.ADVANCED,
    type: ChallengeType.OPTIMIZE_CODE,
    language: "javascript",
    initialCode: `// Inefficient recursive implementation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Test with a moderate value
console.time('fibonacci');
console.log(fibonacci(30)); // This will be slow
console.timeEnd('fibonacci');`,
    solution: `// Optimized with memoization
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  
  if (memo[n]) return memo[n];
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}`,
    solutionCode: `// Optimized with memoization
function fibonacci(n, memo = {}) {
  if (n <= 1) return n;
  
  if (memo[n]) return memo[n];
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}

// Test with a moderate value
console.time('fibonacci');
console.log(fibonacci(30)); // Much faster now
console.timeEnd('fibonacci');

// Alternative iterative solution
/*
function fibonacci(n) {
  if (n <= 1) return n;
  
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    const temp = a + b;
    a = b;
    b = temp;
  }
  
  return b;
}
*/`,
    hints: "Consider using memoization to store previously calculated results or switch to an iterative approach.",
    explanation: "The original recursive implementation had exponential time complexity O(2^n) due to redundant calculations. The optimized solution uses memoization to store previously calculated values, reducing the time complexity to O(n).",
    points: 35
  }
];

// MONSTER CHALLENGES
const monsterChallenges: Challenge[] = [
  {
    id: generateId(),
    title: "Debug Complex Recursive Tree Traversal",
    shortDescription: "Fix a bug in a complex tree traversal algorithm",
    description: "This binary tree traversal algorithm has a subtle bug that causes incorrect results for certain tree structures. Find and fix the issue.",
    difficulty: DifficultyLevel.MONSTER,
    type: ChallengeType.DEBUG_RECURSIVE,
    language: "javascript",
    initialCode: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// This function should count the number of leaf nodes in a binary tree
function countLeafNodes(root) {
  // Base case
  if (!root) {
    return 0;
  }
  
  // If it's a leaf node
  if (!root.left && !root.right) {
    return 1;
  }
  
  // Count leaves in left and right subtrees
  return countLeafNodes(root.left) + countLeafNodes(root.left);
}

// Create a test tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);

// This should return 3 (nodes 4, 5, and 6 are leaves)
console.log(countLeafNodes(root));`,
    solution: "return countLeafNodes(root.left) + countLeafNodes(root.right);",
    solutionCode: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// Fixed function to count the number of leaf nodes in a binary tree
function countLeafNodes(root) {
  // Base case
  if (!root) {
    return 0;
  }
  
  // If it's a leaf node
  if (!root.left && !root.right) {
    return 1;
  }
  
  // Count leaves in left and right subtrees
  return countLeafNodes(root.left) + countLeafNodes(root.right);
}

// Create a test tree
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
root.right.left = new TreeNode(6);

// This now correctly returns 3 (nodes 4, 5, and 6 are leaves)
console.log(countLeafNodes(root));`,
    hints: "Check the recursive calls carefully. Are they covering the entire tree structure correctly?",
    explanation: "The bug was in the recursive part where both calls were to root.left instead of one to root.left and one to root.right. This meant the right subtree was never being traversed, leading to an incorrect leaf count.",
    points: 50
  },
  {
    id: generateId(),
    title: "Implement a Debounce Function",
    shortDescription: "Write a function that limits how often a function can be called",
    description: "Create a debounce function that limits the frequency at which a function can be called. It should take a function and a delay time, and return a new function that will postpone its execution until after the specified wait time has elapsed since the last time it was invoked.",
    difficulty: DifficultyLevel.MONSTER,
    type: ChallengeType.READ_WRITE,
    language: "javascript",
    initialCode: `function debounce(func, wait) {
  // Write your code here
}

// Example usage
function handleInput(text) {
  console.log('Input received:', text);
}

// Create a debounced version that only triggers after 300ms of inactivity
const debouncedHandle = debounce(handleInput, 300);

// Simulate rapid calls (only the last one should execute after 300ms)
debouncedHandle('a');
debouncedHandle('ab');
debouncedHandle('abc');
debouncedHandle('abcd'); // Only this one should be logged after 300ms`,
    solution: `  let timeout;
  
  return function(...args) {
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };`,
    solutionCode: `function debounce(func, wait) {
  let timeout;
  
  return function(...args) {
    clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// Example usage
function handleInput(text) {
  console.log('Input received:', text);
}

// Create a debounced version that only triggers after 300ms of inactivity
const debouncedHandle = debounce(handleInput, 300);

// Simulate rapid calls (only the last one should execute after 300ms)
debouncedHandle('a');
debouncedHandle('ab');
debouncedHandle('abc');
debouncedHandle('abcd'); // Only this one should be logged after 300ms`,
    hints: "You'll need to use closures to maintain state between function calls, and setTimeout to delay the execution.",
    points: 45
  },
  {
    id: generateId(),
    title: "Fix the Memory Leak",
    shortDescription: "Identify and fix a subtle memory leak in a closure",
    description: "This code creates a memory leak due to how closures and event listeners interact. Find the issue and fix it so it doesn't leak memory when createButton is called multiple times.",
    difficulty: DifficultyLevel.MONSTER,
    type: ChallengeType.FIND_ERROR,
    language: "javascript",
    initialCode: `// Simplified DOM-like environment for testing
const domElements = [];

// DOM element simulation
class Element {
  constructor(type) {
    this.type = type;
    this.eventListeners = {};
    this.textContent = '';
  }
  
  addEventListener(event, listener) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
  }
  
  removeEventListener(event, listener) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event]
        .filter(l => l !== listener);
    }
  }
}

// This function has a memory leak
function createButton(text, data) {
  const button = new Element('button');
  button.textContent = text;
  
  // Event handler
  const handleClick = function() {
    console.log('Processing data:', data);
  };
  
  button.addEventListener('click', handleClick);
  
  return button;
}

// Simulate creating many buttons with large data
function simulateMemoryLeak() {
  for (let i = 0; i < 10; i++) {
    const largeData = new Array(1000000).fill('x');
    const button = createButton('Button ' + i, largeData);
    domElements.push(button);
  }
  
  // Remove all but keep references to handlers
  domElements.length = 0;
}

simulateMemoryLeak();
// In a real environment, the large data arrays would still be in memory
// because the event handlers reference them, even when the buttons are "removed"`,
    solution: `  // This function returns a function that can be used to later
  // remove the event listener
  return {
    element: button,
    cleanup: function() {
      button.removeEventListener('click', handleClick);
    }
  };`,
    solutionCode: `// Simplified DOM-like environment for testing
const domElements = [];

// DOM element simulation
class Element {
  constructor(type) {
    this.type = type;
    this.eventListeners = {};
    this.textContent = '';
  }
  
  addEventListener(event, listener) {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
  }
  
  removeEventListener(event, listener) {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event]
        .filter(l => l !== listener);
    }
  }
}

// Fixed function with cleanup capability
function createButton(text, data) {
  const button = new Element('button');
  button.textContent = text;
  
  // Event handler
  const handleClick = function() {
    console.log('Processing data:', data);
  };
  
  button.addEventListener('click', handleClick);
  
  // This function returns a function that can be used to later
  // remove the event listener
  return {
    element: button,
    cleanup: function() {
      button.removeEventListener('click', handleClick);
    }
  };
}

// Simulate creating many buttons with large data
function simulateMemoryLeak() {
  const buttonWrappers = [];
  
  for (let i = 0; i < 10; i++) {
    const largeData = new Array(1000000).fill('x');
    const buttonWrapper = createButton('Button ' + i, largeData);
    buttonWrappers.push(buttonWrapper);
    domElements.push(buttonWrapper.element);
  }
  
  // Proper cleanup when "removing" buttons
  buttonWrappers.forEach(wrapper => wrapper.cleanup());
  domElements.length = 0;
}

simulateMemoryLeak();
// Now the large data arrays can be garbage collected
// because we've removed the event listeners that referenced them`,
    hints: "Think about what happens to event listeners when elements are removed from the DOM. JavaScript's garbage collection won't collect objects that are still referenced by something else.",
    explanation: "The memory leak occurred because the event handlers maintained references to the large data arrays, preventing them from being garbage collected even after the buttons were 'removed'. The fix provides a cleanup function that allows for explicit removal of the event listeners, breaking the reference chain and allowing the garbage collector to reclaim the memory.",
    points: 50
  },
  {
    id: generateId(),
    title: "Refactor a Callback Mess",
    shortDescription: "Refactor nested callbacks into clean async/await or Promise code",
    description: "This code suffers from 'callback hell' with excessive nesting. Refactor it to use Promises and/or async/await to make it more readable and maintainable, while preserving the same functionality and order of operations.",
    difficulty: DifficultyLevel.MONSTER,
    type: ChallengeType.REFACTOR_CODE,
    language: "javascript",
    initialCode: `// Simulated async operations
function getUserData(userId, callback) {
  setTimeout(() => {
    const userData = { id: userId, name: 'User ' + userId };
    callback(null, userData);
  }, 300);
}

function getUserPosts(userId, callback) {
  setTimeout(() => {
    const posts = [
      { id: 1, title: 'Post 1 by user ' + userId },
      { id: 2, title: 'Post 2 by user ' + userId }
    ];
    callback(null, posts);
  }, 200);
}

function getPostComments(postId, callback) {
  setTimeout(() => {
    const comments = [
      { id: 1, text: 'Comment 1 on post ' + postId },
      { id: 2, text: 'Comment 2 on post ' + postId }
    ];
    callback(null, comments);
  }, 100);
}

// Callback hell - deeply nested callbacks
function loadUserData(userId) {
  getUserData(userId, (error, user) => {
    if (error) {
      console.error('Error fetching user:', error);
      return;
    }
    
    console.log('User:', user);
    
    getUserPosts(user.id, (error, posts) => {
      if (error) {
        console.error('Error fetching posts:', error);
        return;
      }
      
      console.log('Posts:', posts);
      
      const firstPost = posts[0];
      getPostComments(firstPost.id, (error, comments) => {
        if (error) {
          console.error('Error fetching comments:', error);
          return;
        }
        
        console.log('Comments on first post:', comments);
        console.log('Operation complete');
      });
    });
  });
}

// Execute the function
loadUserData(123);`,
    solution: `// Promisified versions
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userData = { id: userId, name: 'User ' + userId };
      resolve(userData);
    }, 300);
  });
}

function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = [
        { id: 1, title: 'Post 1 by user ' + userId },
        { id: 2, title: 'Post 2 by user ' + userId }
      ];
      resolve(posts);
    }, 200);
  });
}

function getPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comments = [
        { id: 1, text: 'Comment 1 on post ' + postId },
        { id: 2, text: 'Comment 2 on post ' + postId }
      ];
      resolve(comments);
    }, 100);
  });
}

// Refactored async/await version
async function loadUserData(userId) {
  try {
    const user = await getUserData(userId);
    console.log('User:', user);
    
    const posts = await getUserPosts(user.id);
    console.log('Posts:', posts);
    
    const firstPost = posts[0];
    const comments = await getPostComments(firstPost.id);
    console.log('Comments on first post:', comments);
    console.log('Operation complete');
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    solutionCode: `// Promisified versions
function getUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userData = { id: userId, name: 'User ' + userId };
      resolve(userData);
    }, 300);
  });
}

function getUserPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = [
        { id: 1, title: 'Post 1 by user ' + userId },
        { id: 2, title: 'Post 2 by user ' + userId }
      ];
      resolve(posts);
    }, 200);
  });
}

function getPostComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comments = [
        { id: 1, text: 'Comment 1 on post ' + postId },
        { id: 2, text: 'Comment 2 on post ' + postId }
      ];
      resolve(comments);
    }, 100);
  });
}

// Refactored async/await version
async function loadUserData(userId) {
  try {
    const user = await getUserData(userId);
    console.log('User:', user);
    
    const posts = await getUserPosts(user.id);
    console.log('Posts:', posts);
    
    const firstPost = posts[0];
    const comments = await getPostComments(firstPost.id);
    console.log('Comments on first post:', comments);
    console.log('Operation complete');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Alternative Promise chain version
/*
function loadUserData(userId) {
  return getUserData(userId)
    .then(user => {
      console.log('User:', user);
      return getUserPosts(user.id).then(posts => ({ user, posts }));
    })
    .then(({ user, posts }) => {
      console.log('Posts:', posts);
      const firstPost = posts[0];
      return getPostComments(firstPost.id).then(comments => ({ comments }));
    })
    .then(({ comments }) => {
      console.log('Comments on first post:', comments);
      console.log('Operation complete');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
*/

// Execute the function
loadUserData(123);`,
    hints: "Consider converting each callback-based function to return a Promise, then use async/await or Promise chaining to sequence operations.",
    explanation: "The refactoring converted callback-based functions to Promise-returning functions. Then, the deeply nested callbacks were replaced with clean async/await syntax, making the code much more readable while maintaining the same execution sequence. Error handling was also simplified using try/catch.",
    points: 45
  }
];

// COMBINE ALL CHALLENGES
export const challenges: Challenge[] = [
  ...beginnerChallenges,
  ...intermediateChallenges,
  ...advancedChallenges,
  ...monsterChallenges,
  // More challenges can be added here
];
