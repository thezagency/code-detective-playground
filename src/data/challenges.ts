import { Challenge, ChallengeType, DifficultyLevel, ProgrammingLanguage } from "@/types/challenge";

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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
  },
  
  // TypeScript Beginner Challenges
  {
    id: generateId(),
    title: "Fix the TypeScript Interface",
    shortDescription: "Find and fix the error in a TypeScript interface",
    description: "This TypeScript code defines an interface for a User object, but there's a syntax error in the interface definition. Find and fix it.",
    difficulty: DifficultyLevel.BEGINNER,
    type: ChallengeType.FIND_ERROR,
    language: ProgrammingLanguage.TYPESCRIPT,
    initialCode: `interface User {
  id: number,
  name: string,
  email: string,
  isActive boolean // There's an error here
}

// Example usage
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: true
};

console.log(user);`,
    solution: "isActive: boolean",
    solutionCode: `interface User {
  id: number,
  name: string,
  email: string,
  isActive: boolean // Fixed: added the colon
}

// Example usage
const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: true
};

console.log(user);`,
    hints: "Look carefully at the syntax of property definitions in TypeScript interfaces.",
    explanation: "The error was a missing colon (:) between the property name 'isActive' and its type 'boolean'. In TypeScript interfaces, properties should be defined using the format 'propertyName: type'.",
    points: 10
  },
  {
    id: generateId(),
    title: "Complete the Generic Function",
    shortDescription: "Implement a generic function in TypeScript",
    description: "Complete the generic function that takes an array of any type and returns the first element. Make sure it handles empty arrays properly.",
    difficulty: DifficultyLevel.BEGINNER,
    type: ChallengeType.COMPLETE_CODE,
    language: ProgrammingLanguage.TYPESCRIPT,
    initialCode: `// Complete this generic function that returns the first element of an array
// If the array is empty, it should return undefined
function getFirstElement<T>(arr: T[]): T | undefined {
  // Your code here
}

// Example usage
console.log(getFirstElement([1, 2, 3])); // Should output 1
console.log(getFirstElement(["a", "b", "c"])); // Should output "a"
console.log(getFirstElement([])); // Should output undefined`,
    solution: `return arr.length > 0 ? arr[0] : undefined;`,
    solutionCode: `function getFirstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

// Example usage
console.log(getFirstElement([1, 2, 3])); // Outputs 1
console.log(getFirstElement(["a", "b", "c"])); // Outputs "a"
console.log(getFirstElement([])); // Outputs undefined`,
    expectedOutput: "1\na\nundefined",
    hints: "Check the length of the array before trying to access the first element.",
    points: 15
  },
  
  // Python Beginner Challenge
  {
    id: generateId(),
    title: "Fix the Python List Comprehension",
    shortDescription: "Find and fix the error in a Python list comprehension",
    description: "This Python code attempts to create a list of squares of even numbers from 0 to 9 using a list comprehension, but it contains an error. Find and fix it.",
    difficulty: DifficultyLevel.BEGINNER,
    type: ChallengeType.FIND_ERROR,
    language: ProgrammingLanguage.PYTHON,
    initialCode: `# Create a list of squares of even numbers from 0 to 9
squares = [x**2 for in range(10) if x % 2 == 0]

print(squares)  # Should print [0, 4, 16, 36, 64]`,
    solution: "[x**2 for x in range(10) if x % 2 == 0]",
    solutionCode: `# Create a list of squares of even numbers from 0 to 9
squares = [x**2 for x in range(10) if x % 2 == 0]

print(squares)  # Prints [0, 4, 16, 36, 64]`,
    hints: "Check the syntax of the list comprehension. Is there a variable missing?",
    explanation: "The error was that the variable 'x' was missing after 'for' in the list comprehension. The correct syntax for a list comprehension is '[expression for variable in iterable if condition]'.",
    points: 10
  },
  
  // Java Beginner Challenge
  {
    id: generateId(),
    title: "Fix the Java Loop",
    shortDescription: "Find and fix the error in a Java for loop",
    description: "This Java code is supposed to print numbers from 1 to 5, but there's an issue with the loop. Find and fix the error.",
    difficulty: DifficultyLevel.BEGINNER,
    type: ChallengeType.FIND_ERROR,
    language: ProgrammingLanguage.JAVA,
    initialCode: `public class Main {
    public static void main(String[] args) {
        // Print numbers from 1 to 5
        for (int i = 1; i < 5; i++) {
            System.out.println(i);
        }
    }
}`,
    solution: "for (int i = 1; i <= 5; i++) {",
    solutionCode: `public class Main {
    public static void main(String[] args) {
        // Print numbers from 1 to 5
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
    }
}`,
    hints: "The loop should include 5 in its output. Check the loop condition.",
    explanation: "The error was in the loop condition. Using 'i < 5' means the loop would only go up to 4. Changing it to 'i <= 5' ensures the loop includes 5 in its output.",
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
  },
  
  // TypeScript Intermediate Challenge
  {
    id: generateId(),
    title: "Implement a TypeScript Utility Type",
    shortDescription: "Create a custom TypeScript utility type that extracts object keys",
    description: "Implement a TypeScript utility type called 'ValueOf' that extracts the type of values in an object. This is similar to the 'keyof' operator but for values.",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.READ_WRITE,
    language: ProgrammingLanguage.TYPESCRIPT,
    initialCode: `// Implement the ValueOf<T> utility type
// It should extract the types of values in object T

// Example usage:
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

// This should be equivalent to: type UserValues = number | string | boolean
type UserValues = ValueOf<User>;

// Test case
const test1: UserValues = 42; // Should be valid
const test2: UserValues = "hello"; // Should be valid
const test3: UserValues = true; // Should be valid
const test4: UserValues = {}; // Should be a type error`,
    solution: `type ValueOf<T> = T[keyof T];`,
    solutionCode: `// Implement the ValueOf<T> utility type
// It should extract the types of values in object T
type ValueOf<T> = T[keyof T];

// Example usage:
interface User {
  id: number;
  name: string;
  isAdmin: boolean;
}

// This should be equivalent to: type UserValues = number | string | boolean
type UserValues = ValueOf<User>;

// Test case
const test1: UserValues = 42; // Valid
const test2: UserValues = "hello"; // Valid
const test3: UserValues = true; // Valid
const test4: UserValues = {}; // Type error: {} is not assignable to type UserValues`,
    hints: "Think about how you can use 'keyof' and indexed access types together to extract the type of values.",
    explanation: "The ValueOf<T> utility type uses indexed access types with 'keyof' to extract all the possible value types from type T. It works by taking the union of all property types from the given object type.",
    points: 25,
    requiresPassword: true
  },
  
  // Python Intermediate Challenge
  {
    id: generateId(),
    title: "Complete the Python Generator Function",
    shortDescription: "Implement a Fibonacci sequence generator in Python",
    description: "Complete the Python generator function that yields numbers from the Fibonacci sequence up to a specified limit.",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.COMPLETE_CODE,
    language: ProgrammingLanguage.PYTHON,
    initialCode: `def fibonacci_generator(limit):
    """
    A generator function that yields Fibonacci numbers up to the given limit.
    
    Args:
        limit (int): The maximum value (inclusive) for the generated Fibonacci numbers.
        
    Yields:
        int: The next Fibonacci number in the sequence.
    """
    # Your code here
    
    
# Example usage
for num in fibonacci_generator(50):
    print(num, end=" ")
# Should output: 0 1 1 2 3 5 8 13 21 34`,
    solution: `a, b = 0, 1
    yield a
    while b <= limit:
        yield b
        a, b = b, a + b`,
    solutionCode: `def fibonacci_generator(limit):
    """
    A generator function that yields Fibonacci numbers up to the given limit.
    
    Args:
        limit (int): The maximum value (inclusive) for the generated Fibonacci numbers.
        
    Yields:
        int: The next Fibonacci number in the sequence.
    """
    a, b = 0, 1
    yield a
    while b <= limit:
        yield b
        a, b = b, a + b
    
    
# Example usage
for num in fibonacci_generator(50):
    print(num, end=" ")
# Output: 0 1 1 2 3 5 8 13 21 34`,
    expectedOutput: "0 1 1 2 3 5 8 13 21 34 ",
    hints: "You'll need to use the 'yield' keyword for each Fibonacci number, and keep track of the current and next number in the sequence.",
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    language: ProgrammingLanguage.JAVASCRIPT,
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
    shortDescription: "Write a function that creates a deep
