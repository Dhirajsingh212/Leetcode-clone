export const problemsData = [
  {
    id: 1,
    tag: "Easy",
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    examples: [
      {
        input: `
          5
          4 9
          2 7 11 15
          3 6
          3 2 4
          2 6
          3 3
          5 8
          1 2 3 4 5
          4 0
          0 4 3 0`,
        output: `
          [0, 1]
          [1, 2]
          [0, 1]
          [2, 4]
          [0, 3]
        `,
      },
    ],
    explanation: `
      Input:
      The first line contains an integer t (the number of test cases).
      Each test case contains two lines: 
      - The first line consists of two integers, n (the number of elements in the array) and target (the target sum).
      - The second line consists of n integers representing the array.
      
      Output:
      For each test case, output two integers representing the indices of the two numbers in the array that add up to the target sum.
      
      Example:
      Test case 1: For the array [2,7,11,15] and target 9, the numbers at indices 0 and 1 (2 + 7) add up to 9. The output is 0 1.
      Test case 2: For the array [3,2,4] and target 6, the numbers at indices 1 and 2 (2 + 4) add up to 6. The output is 1 2.
    `,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
  },
  {
    id: 2,
    tag: "Medium",
    title: "Add Two Numbers",
    description:
      "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    examples: [
      {
        input: `
          3
          3
          2 4 3
          3
          5 6 4
          1
          0
          1
          0
          7
          9 9 9 9 9 9 9
          4
          9 9 9 9`,
        output: `
          7 0 8
          0
          8 9 9 9 0 0 0 1
        `,
      },
    ],
    explanation: `
      Input:
      The first line contains an integer t (the number of test cases).
      Each test case contains two lines: 
      - The first line consists of an integer n (the number of digits in the first number) and then the digits of the first number.
      - The second line consists of an integer m (the number of digits in the second number) and then the digits of the second number.
      
      Output:
      For each test case, output the sum of the two numbers as a linked list.
      
      Example:
      Test case 1: For [2,4,3] and [5,6,4], their sum is [7,0,8] because 342 + 465 = 807.
      Test case 2: For [0] and [0], their sum is [0].
    `,
    constraints: [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9",
      "It is guaranteed that the list represents a number that does not have leading zeros.",
    ],
  },
  {
    id: 3,
    tag: "Hard",
    title: "Merge K Sorted Lists",
    description:
      "You are given an array of k linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.",
    examples: [
      {
        input: `
          2
          3
          1 4 5
          3
          1 3 4
          2
          2 6
          0`,
        output: `
          1 1 2 3 4 4 5 6
          []
        `,
      },
    ],
    explanation: `
      Input:
      The first line contains an integer t (the number of test cases).
      Each test case contains an integer k (the number of linked lists) followed by k arrays representing the linked lists, each of which is sorted in ascending order.
      
      Output:
      For each test case, output a single array representing the merged sorted list.
      
      Example:
      Test case 1: Merging the lists [1,4,5], [1,3,4], and [2,6] results in the sorted list [1,1,2,3,4,4,5,6].
      Test case 2: An empty list remains empty, so the output is [].
    `,
    constraints: [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4",
      "lists[i] is sorted in ascending order.",
    ],
  },
  {
    id: 4,
    tag: "Medium",
    title: "Longest Substring Without Repeating Characters",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    examples: [
      {
        input: `
        5
        abcabcbb
        bbbbb
        pwwkew
        dvdf`,
        output: `
        3
        1
        3
        3
        `,
      },
    ],
    explanation: `
    Input:
    The first line contains an integer t (the number of test cases).
    Each test case consists of a single string s.
    
    Output:
    For each test case, output an integer representing the length of the longest substring without repeating characters.
    
    Example:
    Test case 1: For the string "abcabcbb", the longest substring without repeating characters is "abc", which has a length of 3.
    Test case 2: For the string "bbbbb", the longest substring is "b", with a length of 1.
    `,
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols, and spaces.",
    ],
  },
  {
    id: 5,
    tag: "Medium",
    title: "Find Sum",
    description: "Given two numbers find the sum of two numbers.",
    examples: [
      {
        input: `
          5
          1 2
          3 5
          6 7
          2 5`,
        output: `
          3
          8
          13
          7
        `,
      },
    ],
    explanation: `
      Input:
      The first line contains an integer t (the number of test cases).
      Each test case consists of a single string s.
      
      Output:
      For each test case, output an integer representing the length of the longest substring without repeating characters.
      
      Example:
      Test case 1: For the string "abcabcbb", the longest substring without repeating characters is "abc", which has a length of 3.
      Test case 2: For the string "bbbbb", the longest substring is "b", with a length of 1.
    `,
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols, and spaces.",
    ],
  },
];
