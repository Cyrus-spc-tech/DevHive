// Day 1: Hello World and basic input/output example
// Demonstrates cout for output and cin for input.
#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, World!" << std::endl;

    std::cout << "Enter your name: ";
    std::string name;
    std::cin >> name;
    std::cout << "Welcome, " << name << "!" << std::endl;

    return 0;
}
