// Day 7: Practice problems recap – Basic calculator and number guessing game
// 1. Simple calculator supporting +, -, *, /
// 2. Number guessing game where the user tries to guess a randomly generated number

#include <iostream>
#include <cstdlib>
#include <ctime>

void calculator() {
    double num1, num2;
    char op;
    std::cout << "\n=== Basic Calculator ===\n";
    std::cout << "Enter expression (e.g., 4 + 5): ";
    std::cin >> num1 >> op >> num2;

    switch (op) {
        case '+': std::cout << "Result: " << num1 + num2 << "\n"; break;
        case '-': std::cout << "Result: " << num1 - num2 << "\n"; break;
        case '*': std::cout << "Result: " << num1 * num2 << "\n"; break;
        case '/': if (num2 != 0) std::cout << "Result: " << num1 / num2 << "\n"; else std::cout << "Cannot divide by zero!\n"; break;
        default: std::cout << "Invalid operator!\n";
    }
}

void guessingGame() {
    std::cout << "\n=== Number Guessing Game ===\n";
    std::srand(static_cast<unsigned>(std::time(nullptr)));
    int secret = std::rand() % 100 + 1; // 1-100
    int guess, attempts = 0;

    do {
        std::cout << "Guess the number (1-100): ";
        std::cin >> guess;
        ++attempts;
        if (guess > secret) std::cout << "Too high!\n";
        else if (guess < secret) std::cout << "Too low!\n";
        else std::cout << "Correct! You guessed it in " << attempts << " attempts.\n";
    } while (guess != secret);
}

int main() {
    int choice;
    std::cout << "Choose an option:\n1. Calculator\n2. Number Guessing Game\nEnter choice: ";
    std::cin >> choice;

    if (choice == 1)
        calculator();
    else if (choice == 2)
        guessingGame();
    else
        std::cout << "Invalid choice.\n";

    return 0;
}
