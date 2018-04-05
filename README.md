# Memory Game Project

**Memory Game** is fun HTML5 and JavaScript game that will test your memory abilities.


## Table of Contents

* [Rules](#rules)
* [How to win](#how-to-win)
* [Code Dipendencies](#code-dependencies)
* [Known Bugs](#known-bugs)
* [Contributing](#contributing)
* [Licence](#licence)

## Rules

The game starts with a deck of 16 cards, with 8 identical pairs. The player can choose two cards at time:
1. If the cards match, they'll stay face up.
2. If the cards don't match, they'll return face down.

Each game starts with a total of 3 stars. The number of stars will decrement depending on number of moves that has been done.

## How to win

To win the game the player needs to match all the 8 pairs of cards. A scoreboard is shown everytime the player wins.

## Code Dependencies

The app is built with the following code dependencies:

 1. [Font Awesome](https://fontawesome.com/get-started)
 2. [Google Font APIs](https://fonts.google.com/)

## Known Bugs

| Bug | Description | Status |
| ------ | ------ | ------ |
| Moves Counter | The moves counter increases if the player clicks more thant two cards at one time. | _Not fixed_ |
| Card match | If player click on a single card two times it will count as the cards has matched. | _Not fixed_ |

## Contributing

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).

## Licence

MIT
