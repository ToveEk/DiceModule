# Dice Module
A modular JavaScript library for simulating dice rolls, parsing dice notation, and applying modifiers and rules.

Created for the 1DV610 Software Quality course at Linneaus University.

## Table of Contents
- Features
- Installation
- Usage Example
- Dependencies, Language and Version
- Testing
- Bug Reports and Known Issues
- Intended Use
- Contributing
- License
- Versioning and Release
- Author

## Features
- Roll a single or multiple dice (d4, d6, d8, d10, d12, d20, d100)
- Parse dice notation strings (e.g. 2d6+1)
- Support for modifiers and custom rules
- Show history of previous dice rolls

## Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/ToveEk/1DV610-L2.git
cd 1DV610-L2
npm install
```

## Usage Example
import { Dice } from './src/dice.js'

const diceRoller = new Dice()

```bash
console.log(diceRoller.startRolling('2d6+1')) // Roll two six-sided dice with +1 modifier
console.log(diceRoller.startRolling('2d20 with advantage')) // Roll two d20 with advantage
console.log(diceRoller.startRolling('3d8-2')) // Roll three eight-sided dice with -2 modifier

diceRolley.showHistory(100) // Show the last 100 rolls
diceRoller.showHistory(3) // Show the last 3 rolls
```

## Dependencies, Language and Version
- **Language:** JavaScript (ES Modules)
- **Node.js:** v16+ recommended
- **Dependencies:**
    - eslint (dev)
    - @lnu/eslint-config (dev)

## Testing
Testing has been done manually by running various dice roll commands and verifying expected outcomes.

To run the program:
```bash
npm start
```

## Bug Reports and Known Issues
- The message for "natural 20" and "natural 1" is not displayed correctly.
- Misspelled input (e.g. “advntage”) is not handled with an error message.
- Rolling with advantage is currently allowed for all dice types, even though it should be restricted.

New issues can be reported via the [GitHub Issues page](https://github.com/ToveEk/1DV610-L2/issues).

## Intended Use
Users should only interact with the **Dice** class through the `startRolling()` method.
Other files such as `parser.js` and `rules.js` handle internal logic and should not be modified.

## Contributing
To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes.
4. Open a pull request.

Please follow the code style.

## License
MIT

## Versioning and Release
Current version: 1.0.0  
Initial release for 1DV610 Software Quality course.

## Author
Tove Ek
