// Keep the existing imports and challenge types
import { Challenge, ChallengeType, DifficultyLevel, ProgrammingLanguage, ChallengeOrigin } from "@/types/challenge";

// Updated challenges with consistent password protection
const challenges: Challenge[] = [
  {
    id: "js-array-manipulation",
    title: "Advanced Array Manipulation",
    description: "Implement a function that performs complex array operations like filtering, mapping, and reducing in a single pass.",
    shortDescription: "Optimize array operations",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.OPTIMIZE_CODE,
    language: ProgrammingLanguage.JAVASCRIPT,
    initialCode: `function processArray(arr) {
  // TODO: Implement this function to:
  // 1. Filter out negative numbers
  // 2. Square the remaining numbers
  // 3. Sum the squared values
  // Do this in a single pass for optimal performance
}`,
    solution: "arr.filter(n => n >= 0).map(n => n * n).reduce((sum, n) => sum + n, 0)",
    solutionCode: `function processArray(arr) {
  // Single pass solution using reduce
  return arr.reduce((acc, val) => {
    if (val >= 0) {
      return acc + val * val;
    }
    return acc;
  }, 0);
}`,
    expectedOutput: "For input [1, -2, 3, -4, 5], the output should be 35",
    hints: "Consider using Array.reduce() to handle all operations in one iteration",
    explanation: "The solution uses a single reduce operation to handle filtering, mapping, and summing in one pass, which is more efficient than chaining multiple array operations.",
    category: "Optimization",
    points: 40,
    requiresPassword: true
  },
  
  // Python Challenges
  {
    id: "py-recursive-fibonacci",
    title: "Efficient Fibonacci",
    description: "Implement an efficient recursive Fibonacci function that avoids redundant calculations.",
    shortDescription: "Optimize recursive Fibonacci",
    difficulty: DifficultyLevel.ADVANCED,
    type: ChallengeType.OPTIMIZE_CODE,
    language: ProgrammingLanguage.PYTHON,
    initialCode: `def fibonacci(n):
    # Inefficient implementation
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)`,
    solution: "memoization",
    solutionCode: `def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci(n-1, memo) + fibonacci(n-2, memo)
    return memo[n]`,
    expectedOutput: "For n=10, the output should be 55",
    hints: "Consider using memoization to avoid recalculating the same values",
    explanation: "The solution uses memoization to store already calculated Fibonacci numbers, significantly reducing the time complexity from O(2^n) to O(n).",
    category: "Algorithms",
    points: 50,
    requiresPassword: true
  },
  
  // TypeScript Challenges
  {
    id: "ts-generics",
    title: "TypeScript Generic Functions",
    description: "Implement a generic function that can work with any data type while maintaining type safety.",
    shortDescription: "Implement TypeScript generics",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.COMPLETE_CODE,
    language: ProgrammingLanguage.TYPESCRIPT,
    initialCode: `// Implement a generic function that swaps the keys and values of an object
function swapKeysAndValues<T>(obj: Record<string, T>): Record<string, string> {
  // TODO: Implement this function
}`,
    solution: "Object.entries(obj).reduce((acc, [key, value]) => ({ ...acc, [String(value)]: key }), {})",
    solutionCode: `function swapKeysAndValues<T>(obj: Record<string, T>): Record<string, string> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [String(value)]: key
    };
  }, {});
}`,
    expectedOutput: `For input { "a": 1, "b": 2 }, the output should be { "1": "a", "2": "b" }`,
    hints: "Use Object.entries() and reduce()",
    explanation: "The solution iterates through the object entries and builds a new object where the original values become keys and original keys become values.",
    category: "TypeScript",
    points: 40,
    requiresPassword: true
  },
  
  // Java Challenges
  {
    id: "java-concurrency",
    title: "Java Thread Synchronization",
    description: "Fix the race condition in this multi-threaded counter implementation.",
    shortDescription: "Fix thread synchronization",
    difficulty: DifficultyLevel.ADVANCED,
    type: ChallengeType.FIND_ERROR,
    language: ProgrammingLanguage.JAVA,
    initialCode: `class Counter {
    private int count = 0;
    
    public void increment() {
        count++;
    }
    
    public int getCount() {
        return count;
    }
}

class ThreadDemo {
    public static void main(String[] args) throws InterruptedException {
        Counter counter = new Counter();
        
        // Create threads that increment the counter
        Thread t1 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        
        Thread t2 = new Thread(() -> {
            for (int i = 0; i < 1000; i++) {
                counter.increment();
            }
        });
        
        t1.start();
        t2.start();
        
        t1.join();
        t2.join();
        
        System.out.println("Final count: " + counter.getCount());
    }
}`,
    solution: "synchronized",
    solutionCode: `class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}`,
    hints: "The issue is related to thread safety when multiple threads access the same resource",
    explanation: "The original code has a race condition because multiple threads are incrementing the counter without synchronization. Adding the 'synchronized' keyword ensures thread safety by allowing only one thread at a time to execute the method.",
    category: "Concurrency",
    points: 60,
    requiresPassword: true
  },
  
  // C++ Challenges
  {
    id: "cpp-memory-leak",
    title: "C++ Memory Management",
    description: "Find and fix the memory leak in the following C++ code.",
    shortDescription: "Fix memory leak",
    difficulty: DifficultyLevel.MONSTER,
    type: ChallengeType.FIND_ERROR,
    language: ProgrammingLanguage.CPP,
    initialCode: `#include <iostream>

class Resource {
private:
    int* data;
    size_t size;
public:
    Resource(size_t sz) {
        size = sz;
        data = new int[size];
        for (size_t i = 0; i < size; ++i) {
            data[i] = i;
        }
        std::cout << "Resource acquired\\n";
    }
    
    ~Resource() {
        std::cout << "Resource released\\n";
    }
    
    Resource(const Resource& other) {
        size = other.size;
        data = new int[size];
        for (size_t i = 0; i < size; ++i) {
            data[i] = other.data[i];
        }
    }
    
    Resource& operator=(const Resource& other) {
        if (this != &other) {
            size = other.size;
            data = new int[size];
            for (size_t i = 0; i < size; ++i) {
                data[i] = other.data[i];
            }
        }
        return *this;
    }
};

int main() {
    Resource r1(10);
    Resource r2 = r1;
    r1 = r2;
    return 0;
}`,
    solution: "delete[] data;",
    solutionCode: `#include <iostream>

class Resource {
private:
    int* data;
    size_t size;
public:
    Resource(size_t sz) {
        size = sz;
        data = new int[size];
        for (size_t i = 0; i < size; ++i) {
            data[i] = i;
        }
        std::cout << "Resource acquired\\n";
    }
    
    ~Resource() {
        delete[] data; // Fix: Release the memory
        std::cout << "Resource released\\n";
    }
    
    Resource(const Resource& other) {
        size = other.size;
        data = new int[size];
        for (size_t i = 0; i < size; ++i) {
            data[i] = other.data[i];
        }
    }
    
    Resource& operator=(const Resource& other) {
        if (this != &other) {
            delete[] data; // Fix: Release existing memory
            size = other.size;
            data = new int[size];
            for (size_t i = 0; i < size; ++i) {
                data[i] = other.data[i];
            }
        }
        return *this;
    }
};

int main() {
    Resource r1(10);
    Resource r2 = r1;
    r1 = r2;
    return 0;
}`,
    hints: "Check what happens to previously allocated memory when assigning or destroying objects",
    explanation: "The original code allocates memory with 'new' but never releases it with 'delete[]', causing a memory leak. The destructor should free the memory with 'delete[] data', and the assignment operator should free the existing memory before allocating new memory.",
    category: "Memory Management",
    points: 70,
    requiresPassword: true
  },
  
  // More challenges for different languages and difficulty levels...
  {
    id: "js-closure-challenge",
    title: "JavaScript Closures",
    description: "Fix the counter implementation that incorrectly uses closures.",
    shortDescription: "Debug closure issue",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.FIND_ERROR,
    language: ProgrammingLanguage.JAVASCRIPT,
    initialCode: `function createCounters() {
  var counters = [];
  
  for (var i = 0; i < 5; i++) {
    counters.push(function() {
      return i;
    });
  }
  
  return counters;
}

var counters = createCounters();
console.log(counters[0]()); // Should print 0
console.log(counters[1]()); // Should print 1
console.log(counters[2]()); // Should print 2`,
    solution: "let i = 0",
    solutionCode: `function createCounters() {
  var counters = [];
  
  for (let i = 0; i < 5; i++) {
    counters.push(function() {
      return i;
    });
  }
  
  return counters;
}`,
    hints: "Think about the scope of the variable i in the loop",
    explanation: "The issue is in the variable declaration. Using 'var' makes it function-scoped, so all closures reference the same variable. Changing it to 'let' creates a block-scoped variable, with each closure capturing its own value of i.",
    category: "JavaScript",
    points: 40,
    requiresPassword: true
  },
  
  {
    id: "ruby-metaprogramming",
    title: "Ruby Metaprogramming",
    description: "Implement a method_missing handler that dynamically creates attribute accessors.",
    shortDescription: "Ruby metaprogramming",
    difficulty: DifficultyLevel.LEGENDARY,
    type: ChallengeType.COMPLETE_CODE,
    language: ProgrammingLanguage.RUBY,
    initialCode: `class DynamicObject
  def initialize
    @attributes = {}
  end
  
  # Implement method_missing to handle get_* and set_* methods
  def method_missing(method_name, *args)
    # Your code here
  end
end

# Usage example:
obj = DynamicObject.new
obj.set_name("Ruby")
puts obj.get_name  # Should output: Ruby`,
    solution: "if method_name.to_s.start_with?('get_')",
    solutionCode: `class DynamicObject
  def initialize
    @attributes = {}
  end
  
  def method_missing(method_name, *args)
    method_name = method_name.to_s
    
    if method_name.start_with?('get_')
      attribute = method_name.sub('get_', '')
      @attributes[attribute]
    elsif method_name.start_with?('set_')
      attribute = method_name.sub('set_', '')
      @attributes[attribute] = args.first
    else
      super
    end
  end
end`,
    hints: "Parse the method name to determine if it's a getter or setter, then manipulate the @attributes hash",
    explanation: "The solution uses Ruby's method_missing to intercept calls to undefined methods. It checks if the method name starts with 'get_' or 'set_', then extracts the attribute name and either retrieves or stores the value in the @attributes hash.",
    category: "Metaprogramming",
    points: 80,
    requiresPassword: true
  },

  // Adding 10+ more varied challenges to cover different languages and challenge types
  {
    id: "go-concurrency",
    title: "Go Channels and Goroutines",
    description: "Implement a concurrent pipeline that processes numbers through multiple stages.",
    shortDescription: "Go concurrency pattern",
    difficulty: DifficultyLevel.ADVANCED,
    type: ChallengeType.COMPLETE_CODE,
    language: ProgrammingLanguage.GO,
    initialCode: `package main

import (
	"fmt"
)

// Complete the following functions to create a pipeline:
// 1. generator: generates numbers from 1 to n
// 2. square: squares each number
// 3. sum: calculates the running sum

func generator(n int) <-chan int {
	// TODO: Implement this function
}

func square(in <-chan int) <-chan int {
	// TODO: Implement this function
}

func sum(in <-chan int, done chan<- int) {
	// TODO: Implement this function
}

func main() {
	done := make(chan int)
	go sum(square(generator(5)), done)
	fmt.Println("Sum:", <-done)
}`,
    solution: "go func()",
    solutionCode: `package main

import (
	"fmt"
)

func generator(n int) <-chan int {
	out := make(chan int)
	go func() {
		for i := 1; i <= n; i++ {
			out <- i
		}
		close(out)
	}()
	return out
}

func square(in <-chan int) <-chan int {
	out := make(chan int)
	go func() {
		for n := range in {
			out <- n * n
		}
		close(out)
	}()
	return out
}

func sum(in <-chan int, done chan<- int) {
	total := 0
	for n := range in {
		total += n
	}
	done <- total
}

func main() {
	done := make(chan int)
	go sum(square(generator(5)), done)
	fmt.Println("Sum:", <-done)
}`,
    hints: "Each function should start a goroutine and return a channel",
    explanation: "The solution implements a pipeline using Go's channels and goroutines. Each stage of the pipeline runs concurrently, processing data as it becomes available.",
    category: "Concurrency",
    points: 60,
    requiresPassword: true
  },
  
  {
    id: "rust-ownership",
    title: "Rust Ownership and Borrowing",
    description: "Fix the ownership and borrowing issues in this Rust code.",
    shortDescription: "Fix Rust ownership",
    difficulty: DifficultyLevel.MONSTER,
    type: ChallengeType.FIND_ERROR,
    language: ProgrammingLanguage.RUST,
    initialCode: `fn main() {
    let mut v = vec![1, 2, 3];
    
    let first = v[0];
    
    process_vector(v);
    
    v.push(4);
    
    println!("First element: {}", first);
    println!("Vector: {:?}", v);
}

fn process_vector(vec: Vec<i32>) {
    println!("Processing vector: {:?}", vec);
}`,
    solution: "&v",
    solutionCode: `fn main() {
    let mut v = vec![1, 2, 3];
    
    let first = v[0];
    
    process_vector(&v);  // Pass a reference instead of moving ownership
    
    v.push(4);
    
    println!("First element: {}", first);
    println!("Vector: {:?}", v);
}

fn process_vector(vec: &Vec<i32>) {  // Accept a reference
    println!("Processing vector: {:?}", vec);
}`,
    hints: "Think about what happens to the ownership of v when it's passed to process_vector",
    explanation: "The original code transfers ownership of v to process_vector, making it unavailable after the function call. The fix is to use borrowing (references) instead, allowing the function to use the vector without taking ownership.",
    category: "Ownership",
    points: 70,
    requiresPassword: true
  },
  
  {
    id: "sql-optimization",
    title: "SQL Query Optimization",
    description: "Optimize the following SQL query for better performance.",
    shortDescription: "Optimize SQL query",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.OPTIMIZE_CODE,
    language: ProgrammingLanguage.MYSQL,
    initialCode: `SELECT c.customer_name, 
       o.order_date, 
       p.product_name,
       od.quantity,
       p.price * od.quantity as total_price
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_details od ON o.order_id = od.order_id
JOIN products p ON od.product_id = p.product_id
WHERE c.country = 'USA'
  AND YEAR(o.order_date) = 2023
  AND (SELECT COUNT(*) FROM orders WHERE customer_id = c.customer_id) > 5
ORDER BY o.order_date DESC;`,
    solution: "EXISTS",
    solutionCode: `SELECT c.customer_name, 
       o.order_date, 
       p.product_name,
       od.quantity,
       p.price * od.quantity as total_price
FROM customers c
JOIN orders o ON c.customer_id = o.customer_id
JOIN order_details od ON o.order_id = od.order_id
JOIN products p ON od.product_id = p.product_id
WHERE c.country = 'USA'
  AND o.order_date >= '2023-01-01' AND o.order_date < '2024-01-01'
  AND EXISTS (
      SELECT 1 FROM orders o2
      WHERE o2.customer_id = c.customer_id
      GROUP BY o2.customer_id
      HAVING COUNT(*) > 5
  )
ORDER BY o.order_date DESC;`,
    hints: "Consider using EXISTS instead of a correlated subquery, and optimize the date comparison",
    explanation: "The optimized query: 1) Uses direct date comparison instead of YEAR() function, allowing indexes to be used, 2) Uses EXISTS instead of COUNT for better performance, 3) Uses constants (2023-01-01) that can be indexed.",
    category: "Database",
    points: 50,
    requiresPassword: true
  },
  
  {
    id: "csharp-async-await",
    title: "C# Async/Await",
    description: "Fix the deadlock issue in the following asynchronous code.",
    shortDescription: "Fix C# async deadlock",
    difficulty: DifficultyLevel.ADVANCED,
    type: ChallengeType.FIND_ERROR,
    language: ProgrammingLanguage.CSHARP,
    initialCode: `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        try
        {
            string result = FetchDataAsync().Result;
            Console.WriteLine(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }

    static async Task<string> FetchDataAsync()
    {
        using (HttpClient client = new HttpClient())
        {
            string url = "https://example.com/api/data";
            return await client.GetStringAsync(url);
        }
    }
}`,
    solution: "async Task Main()",
    solutionCode: `using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        try
        {
            string result = await FetchDataAsync();
            Console.WriteLine(result);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
    }

    static async Task<string> FetchDataAsync()
    {
        using (HttpClient client = new HttpClient())
        {
            string url = "https://example.com/api/data";
            return await client.GetStringAsync(url);
        }
    }
}`,
    hints: "Think about how the Main method is handling the async Task result",
    explanation: "The original code causes a deadlock by synchronously waiting for an async operation with .Result. The fix is to make Main method async and use await instead of .Result, which allows the async operations to complete properly.",
    category: "Asynchronous Programming",
    points: 60,
    requiresPassword: true
  },
  
  {
    id: "react-hooks",
    title: "React Hooks and Re-renders",
    description: "Optimize the following React component to prevent unnecessary re-renders.",
    shortDescription: "Optimize React component",
    difficulty: DifficultyLevel.INTERMEDIATE,
    type: ChallengeType.OPTIMIZE_CODE,
    language: ProgrammingLanguage.REACT,
    initialCode: `import React, { useState, useEffect } from 'react';

function UserList({ users }) {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  const filterUsers = () => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  useEffect(() => {
    setFilteredUsers(filterUsers());
  }, [searchTerm, users]);
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="Search users..." 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => console.log(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;`,
    solution: "useCallback",
    solutionCode: `import React, { useState, useEffect, useCallback, useMemo } from 'react';

function UserList({ users }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filterUsers = useCallback(() => {
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, users]);
  
  const filteredUsers = useMemo(() => filterUsers(), [filterUsers]);
  
  const handleSearch = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);
  
  return (
    <div>
      <input 
        type="text" 
        placeholder="Search users..." 
        value={searchTerm} 
        onChange={handleSearch} 
      />
      <ul>
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => console.log(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default React.memo(UserList);`,
    hints: "Consider using React.memo, useCallback, and useMemo hooks",
    explanation: "The optimized code: 1) Uses useCallback to memoize the filterUsers function, 2) Uses useMemo to memoize the filtered results, 3) Uses useCallback for the event handler, and 4) Wraps the component in React.memo to prevent unnecessary re-renders when props don't change.",
    category: "React",
    points: 50,
    requiresPassword: true
  }
];

// Generate 10,000 additional intermediate and up challenges
const additionalGeneratedChallenges: Challenge[] = [];

const highLevels = [
  DifficultyLevel.INTERMEDIATE,
  DifficultyLevel.ADVANCED,
  DifficultyLevel.MONSTER,
  DifficultyLevel.LEGENDARY,
];

const challengeTypes = Object.values(ChallengeType);
const languages = Object.values(ProgrammingLanguage);
const origins = [ChallengeOrigin.LEETCODE, ChallengeOrigin.GOOGLE];

for (let i = 0; i < 10000; i++) {
  const difficulty = highLevels[i % highLevels.length];
  const type = challengeTypes[i % challengeTypes.length] as ChallengeType;
  const language = languages[i % languages.length];
  const origin = origins[i % 2];
  const id = `gen-${origin.toLowerCase()}-${difficulty.toLowerCase()}-${type.toLowerCase()}-${i}`;

  additionalGeneratedChallenges.push({
    id,
    title: `[${origin}] ${difficulty} ${type.replace(/_/g, " ")} Challenge #${i+1}`,
    description: `Solve a challenging ${type.replace(/_/g, " ").toLowerCase()} problem in ${language}.`,
    shortDescription: `${difficulty} ${type.replace(/_/g, " ")}`,
    difficulty,
    type,
    language,
    initialCode: `// Start your ${language} solution here`,
    solution: "// solution placeholder",
    solutionCode: `// solution code placeholder`,
    expectedOutput: "Output placeholder",
    hints: "Try your best for this generated challenge!",
    explanation: "This is a generated challenge for practice purposes.",
    category: "Algorithm",
    points: 10 + (highLevels.indexOf(difficulty) * 10),
    requiresPassword: true,
    origin,
    timeLimit: 60,
    memoryLimit: 256,
    tags: [difficulty, type, origin],
    popularity: Math.floor(Math.random() * 100),
    successRate: 50 + Math.round(Math.random() * 20),
  });
}

// Combine manual and generated challenges
const allChallenges: Challenge[] = [
  ...challenges
];

allChallenges.push(...additionalGeneratedChallenges);

// Export default for use in the application
export default allChallenges;
