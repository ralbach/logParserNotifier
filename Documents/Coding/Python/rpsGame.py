import random, sys

print('ROCK PAPER SCISSORS THE GAME (bad text version)')

# These vars track wins losses and ties
wins = 0
losses = 0
ties = 0

while True: #Main game loop
  print('%s Wins, %s Losses, %s Ties' % (wins, losses, ties))
  while True: #Player input loop
    print('Enter your move: (r)ock, (p)aper, (s)cissors or (q)uit')
    playerMove = input()
    if(playerMove == 'q'):
      sys.exit()  # exit prog
    if playerMove == 'r' or playerMove == 'p' or playerMove == 's':
      break # break out of player input to go to next step
    print('Type one of  r, p, s, or q.')

  #Display player choice
  if playerMove == 'r':
    print('\nROCK versus....')
  elif playerMove == 'p':
    print('\nPAPER versus....')
  elif playerMove == 's':
    print('\nSCISSORS versus....')

  #Display what AI chooses

  randomNumber = random.randint(1,3)
  if randomNumber == 1:
    computerMove = 'r'
    print('ROCK \n')
  elif randomNumber == 2:
    computerMove = 'p'
    print('PAPER \n')
  elif randomNumber == 3:
    computerMove = 's'
    print('SCISSORS \n')


  #Display win/loss/tie
  if playerMove == computerMove:
    print("It's a tie!")
    ties = ties + 1
  elif playerMove == 'r' and computerMove == 's':
    print('You win!')
    wins = wins + 1
  elif playerMove == 'p' and computerMove == 'r':
    print('You win!')
    wins = wins + 1
  elif playerMove == 's' and computerMove == 'p':
      print('You win!')
      wins = wins + 1
  elif playerMove == 'r' and computerMove == 'p':
      print('You lose!')
      losses = losses + 1
  elif playerMove == 'p' and computerMove == 's':
      print('You lose!')
      losses = losses + 1
  elif playerMove == 's' and computerMove == 'r':
      print('You lose!')
      losses = losses + 1
