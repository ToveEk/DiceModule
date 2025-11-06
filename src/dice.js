/**
 * Class representing a dice roller.
 *
 * @file dice.js
 * @description Simulates rolling various types of dice.
 * @author Tove Ek
 * @version 1.0.0
 */

import { Parser } from './parser.js'
import { Rules } from './rules.js'
import { History } from './history.js'

/**
 *
 */
export class Dice {
  diceArray = [4, 6, 8, 10, 12, 20, 100]
  roll = 0
  parser = new Parser()
  history = new History()

  /**
   * Rolls dice based on the provided dice notation string and returns the result message.
   *
   * @param {string} diceNotation - The dice notation string (e.g., "2d6").
   * @returns {string} - The result message of the dice roll.
   */
  startRolling (diceNotation) {
    try {
      const parsedDice = this.#checkDiceNotationAndParse(diceNotation)

      this.#checkIfDiceArrayIncludesSides(parsedDice)

      this.#checkForModifierAndApply(diceNotation, parsedDice)

      this.#checkNaturalTwentyOrNaturalOne(this.roll, parsedDice)

      const result = this.#showResult(this.roll, parsedDice)
      return result
    } catch (error) {
      throw new Error('An error occurred while rolling the dice.')
    }
  }

  /**
   * Checks the dice notation and parses it.
   *
   * @param {string} diceNotation - The dice notation string to parse.
   * @returns {object} - The parsed dice information.
   */
  #checkDiceNotationAndParse (diceNotation) {
    if (!diceNotation || typeof diceNotation !== 'string') {
      throw new Error('Dice notation must be a non-empty string. Examples: "d6", "2d8+1"')
    }

    if (diceNotation.trim() === '') {
      throw new Error('Dice notation cannot be empty. Examples: "d6", "2d8+1"')
    }

    const parsedDice = this.parser.parseDice(diceNotation)
    return parsedDice
  }

  /**
   * Checks if the parsed dice sides are valid and applies the appropriate rolling method.
   *
   * @param {object} parsedDice - The parsed dice information.
   * @returns {void}
   */
  #checkIfDiceArrayIncludesSides (parsedDice) {
    if (this.diceArray.includes(parsedDice.sides) && parsedDice.advantage === false && parsedDice.disadvantage === false) {
      this.#singleOrMultiple(parsedDice)
    } else if (this.diceArray.includes(parsedDice.sides) && (parsedDice.advantage === true || parsedDice.disadvantage === true)) {
      this.#applyDisadvantageOrAdvantage(this.roll, parsedDice)
    } else {
      console.log('Invalid die type. Please use d4, d6, d8, d10, d12, d20, or d100.')
    }
  }

  /**
   * Checks for modifiers in the dice notation and applies them to the roll.
   *
   * @param {string} diceNotation - The dice notation string.
   * @param {object} parsedDice - The parsed dice information.
   */
  #checkForModifierAndApply (diceNotation, parsedDice) {
    if (diceNotation.includes('+') || diceNotation.includes('-')) {
      this.#addModifier(this.roll, parsedDice)
    }
  }

  /**
   * Determines whether to roll a single die or multiple dice based on the number of dice.
   *
   * @param {object} parsedDice - The parsed dice information.
   */
  #singleOrMultiple (parsedDice) {
    if (parsedDice.numberOfDice > 1) {
      this.#rollMultipleDice(parsedDice)
    } else {
      this.#rollSingleDie(parsedDice)
    }
  }

  /**
   * Rolls a single die.
   *
   * @param {object} parsedDice - The parsed dice information.
   */
  #rollSingleDie (parsedDice) {
    this.roll = Math.floor(Math.random() * parsedDice.sides) + 1
  }

  /**
   * Rolls multiple dice and sums their results.
   *
   * @param {object} parsedDice - The parsed dice information.
   */
  #rollMultipleDice (parsedDice) {
    for (let i = 0; i < parsedDice.numberOfDice; i++) {
      this.roll += Math.floor(Math.random() * parsedDice.sides) + 1
    }
  }

  /**
   * Adds a modifier to the roll if applicable.
   *
   * @param {number} roll - The current roll value.
   * @param {object} parsedDice - The parsed dice information.
   * @returns {number} - The roll value after adding the modifier.
   */
  #addModifier (roll, parsedDice) {
    roll += parsedDice.modifier
    return roll
  }

  /**
   * Applies advantage or disadvantage rules to the roll.
   *
   * @param {number} roll - The result of the dice roll.
   * @param {object} parsedDice - The parsed dice information.
   * @returns {string} - The result message after applying rules.
   */
  #applyDisadvantageOrAdvantage (roll, parsedDice) {
    const rules = new Rules()

    if (parsedDice.disadvantage === true) {
      const resultMessage = rules.rollWithDisadvantage(parsedDice)
      return resultMessage
    } else if (parsedDice.advantage === true) {
      const resultMessage = rules.rollWithAdvantage(parsedDice)
      return resultMessage
    } else {
      return this.#showResult(roll, parsedDice)
    }
  }

  /**
   * Checks the roll for natural 20 or natural 1 conditions.
   *
   * @param {number} roll - The result of the dice roll.
   * @param {object} parsedDice - The parsed dice information.
   */
  #checkNaturalTwentyOrNaturalOne (roll, parsedDice) {
    const rules = new Rules()

    if (parsedDice.sides === 20 && roll === 20) {
      rules.naturalTwenty()
    } else if (parsedDice.sides === 20 && roll === 1) {
      rules.naturalOne()
    }
  }

  /**
   * Displays the result of the dice roll.
   *
   * @param {number} roll - The result of the dice roll.
   * @param {object} parsedDice - The parsed dice information.
   * @returns {string} - The result message.
   */
  #showResult (roll, parsedDice) {
    this.history.addRollToHistory(roll)
    const result = `You rolled a ${roll} with ${parsedDice.numberOfDice} d${parsedDice.sides}`
    return result
  }

  /**
   * Shows the history of previous rolls.
   *
   * @param {number} numberOfRolls - The number of previous rolls to show.
   */
  showHistory (numberOfRolls) {
    try {
      if (typeof numberOfRolls !== 'number' || numberOfRolls <= 0) {
        console.log('Invalid input. Number of rolls must be a positive number.')
        return
      }
      this.history.getPreviousRolls(numberOfRolls)
    } catch (error) {
      throw new Error('An error occurred while retrieving the roll history.')
    }
  }
}
