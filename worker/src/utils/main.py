def two_sum(nums, target):
    num_to_index = {}
    
    for index, num in enumerate(nums):
        complement = target - num
        if complement in num_to_index:
            return [num_to_index[complement], index]
        num_to_index[num] = index
    
    return []

def main():
    # Number of test cases
    t = int(input("Enter the number of test cases: "))
    
    for case_number in range(1, t + 1):
        # Input for each test case
        n = int(input(f"Enter the number of elements in the array for test case {case_number}: "))
        nums = list(map(int, input("Enter the elements of the array separated by space: ").split()))
        target = int(input("Enter the target sum: "))
        
        # Ensure that the input size matches n
        if len(nums) != n:
            print("Error: The number of elements does not match the provided size.")
            continue
        
        # Solve the problem
        result = two_sum(nums, target)
        
        # Print result
        if result:
            print(f"Test Case {case_number}: {result}")
        else:
            print(f"Test Case {case_number}: No solution found")

if __name__ == "__main__":
    main()
