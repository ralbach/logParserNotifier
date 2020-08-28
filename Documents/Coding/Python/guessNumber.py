#This is a guess the number game
import random

secretNumber = random.randint(1, 652)
print("I'm thinking of a number between 1 and 652.")

#ask player to guess 14 times
for guessesTaken in range(1,15):
  print('Take a guess')
  guess=int(input())

  if guess < secretNumber:
    print('Guess is too low')
  elif guess > secretNumber:
    print('Guess is too high')
  else:
    break #This would be the right answer

if guess == secretNumber:
  print('Good Job! You guessed the number in ' + str(guessesTaken) + 'guesses.')
else:
  print('Nope. The Number I was thinking of was ' + str(secretNumber))