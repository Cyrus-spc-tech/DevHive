// Day 6: Demonstrates defining and using functions with return values in C++
// Examples: add two numbers, compute factorial, and a void greeting function.

#include <iostream>
#include <string>

// Adds two integers and returns the result
int add(int x, int y) {
    return x + y;
}

// Computes factorial of n (n!) and returns the result as long long
long long factorial(int n) {
    long long result = 1;
    for (int i = 2; i <= n; ++i) {
        result *= i;
    }
    return result;
}

// Prints a greeting message (void function)
void greet(const std::string &name) {
    std::cout << "Hello, " << name << "!" << std::endl;
}

int main() {
    int a, b;
    std::cout << "Enter two integers to add: ";
    std::cin >> a >> b;
    std::cout << "Sum = " << add(a, b) << std::endl;

    int n;
    std::cout << "Enter a non-negative integer for factorial: ";
    std::cin >> n;
    std::cout << n << "! = " << factorial(n) << std::endl;

    greet("Coder");
    return 0;
}
