// Day 5: Demonstrates loops in C++ (for, while, do-while)
#include <iostream>

int main() {
    // for loop: print 1-5
    std::cout << "For loop: ";
    for (int i = 1; i <= 5; ++i) {
        std::cout << i << " ";
    }
    std::cout << "\n";

    // while loop: countdown 5-1
    int n = 5;
    std::cout << "While loop: ";
    while (n > 0) {
        std::cout << n-- << " ";
    }
    std::cout << "\n";

    // do-while: ask until correct password
    int password;
    do {
        std::cout << "Enter password (1234): ";
        std::cin >> password;
    } while (password != 1234);
    std::cout << "Access granted!\n";

    return 0;
}
