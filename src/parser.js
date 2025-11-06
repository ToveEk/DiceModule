/**
 * Class representing a dice parser.
 */
export class Parser {
  /**
   * Parses the dice notation to extract number of dice, sides, and any modifiers.
   *
   * @param {string} diceNotation - The dice notation string to parse (e.g., "2d6+3").
   * @returns {object} - An object containing the number of sides, number of dice, and modifier.
   */
  parseDice (diceNotation) {
    const sides = this.#removeDNotation(diceNotation)
    const numberOfDice = this.#checkNumberOfDice(diceNotation)
    const modifier = this.#parseModifier(diceNotation)
    const disadvantage = this.#checkIfDisadvantage(diceNotation)
    const advantage = this.#checkIfAdvantage(diceNotation)

    console.log(`Rolling ${numberOfDice} d${sides} with modifier: ${modifier || 0}`)

    const diceObject = {
      sides,
      numberOfDice,
      modifier: modifier || 0,
      advantage,
      disadvantage
    }

    return diceObject
  }

  /**
   * Parses the dice notation and removes the 'd' and returns the number of sides.
   *
   * @param {string} diceNotation - The dice notation string to parse.
   * @returns {number} - The number of sides on the die.
   */
  #removeDNotation (diceNotation) {
    if (diceNotation.includes('d')) {
      const sides = parseInt(diceNotation.split('d')[1])

      return sides
    } else {
      throw new Error('Invalid dice notation. Must contain "d" (e.g., "d6", "2d8")')
    }
  }

  /**
   * Parses the dice notation to find out the number of dice to roll.
   *
   * @param {string} diceNotation - The dice notation string to parse.
   * @returns {number} - The number of dice to roll.
   */
  #checkNumberOfDice (diceNotation) {
    const numberofDice = parseInt(diceNotation.split('d')[0])

    if (!isNaN(numberofDice)) {
      return numberofDice
    } else {
      return 1
    }
  }

  /**
   * Parses the dice notation to see if it includes a modifier and extracts it if present.
   *
   * @param {string} diceNotation - The dice notation string to parse.
   * @returns {number} - The modifier value.
   */
  #parseModifier (diceNotation) {
    if (diceNotation.includes('+')) {
      const modifierValue = parseInt(diceNotation.split('+')[1])

      return modifierValue
    } else if (diceNotation.includes('-')) {
      const modifierValue = parseInt(diceNotation.split('-')[1])

      return -modifierValue
    }

    return 0
  }

  /**
   * Checks if the dice notation includes disadvantage keyword.
   *
   * @param {string} diceNotation - The dice notation string to check.
   * @returns {boolean} - True if disadvantage is included, false otherwise.
   */
  #checkIfDisadvantage (diceNotation) {
    if (diceNotation.includes('disadvantage')) {
      return true
    } else {
      return false
    }
  }

  /**
   * Checks if the dice notation includes advantage or disadvantage keywords.
   *
   * @param {string} diceNotation - The dice notation string to check.
   * @returns {boolean} - True if advantage or disadvantage is included, false otherwise.
   */
  #checkIfAdvantage (diceNotation) {
    if (diceNotation.includes('advantage')) {
      return true
    } else {
      return false
    }
  }
}
