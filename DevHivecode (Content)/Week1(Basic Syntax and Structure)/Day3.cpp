// Day 3: Demonstrates arithmetic, comparison, and logical operators in C++
#include <iostream>

int main() {
    int a = 10, b = 3;

    // Arithmetic
    std::cout << "a + b = " << a + b << "\n";
    std::cout << "a - b = " << a - b << "\n";
    std::cout << "a * b = " << a * b << "\n";
    std::cout << "a / b = " << a / b << "\n";
    std::cout << "a % b = " << a % b << "\n";

    // Comparison
    std::cout << std::boolalpha; // print bools as true/false
    std::cout << "a == b: " << (a == b) << "\n";
    std::cout << "a != b: " << (a != b) << "\n";
    std::cout << "a > b: " << (a > b) << "\n";
    std::cout << "a < b: " << (a < b) << "\n";

    // Logical
    bool x = true, y = false;
    std::cout << "x && y: " << (x && y) << "\n";
    std::cout << "x || y: " << (x || y) << "\n";
    std::cout << "!x: " << (!x) << "\n";

    return 0;
}
