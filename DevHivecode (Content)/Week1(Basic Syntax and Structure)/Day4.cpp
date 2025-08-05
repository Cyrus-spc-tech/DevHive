// Day 4: Demonstrates conditional statements (if-else and switch) in C++
#include <iostream>

int main() {
    int number;
    std::cout << "Enter an integer: ";
    std::cin >> number;

    // if-else
    if (number % 2 == 0) {
        std::cout << number << " is even.\n";
    } else {
        std::cout << number << " is odd.\n";
    }

    // switch
    char option;
    std::cout << "Enter grade (A-D): ";
    std::cin >> option;
    switch (option) {
        case 'A':
            std::cout << "Excellent!\n";
            break;
        case 'B':
            std::cout << "Good job!\n";
            break;
        case 'C':
            std::cout << "Fair.\n";
            break;
        case 'D':
            std::cout << "Needs improvement.\n";
            break;
        default:
            std::cout << "Invalid grade.\n";
    }

    return 0;
}
