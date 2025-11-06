/**
 * Class representing the history of previous rolls.
 */
export class History {
  previousRolls = []

  /**
   * Adds a roll to the history.
   *
   * @param {number} roll - The roll value to add.
   */
  addRollToHistory (roll) {
    this.previousRolls.push(roll)
    console.log(`Added roll ${roll} to history.`)
  }

  /**
   * Retrieves the previous rolls up to the specified number.
   *
   * @param {number} numberOfRolls - The number of previous rolls to retrieve.
   * @returns {Array} - An array of previous rolls.
   */
  getPreviousRolls (numberOfRolls) {
    if (this.previousRolls.length === 0) {
      console.log('No roll history available. Make some dice rolls first!')
    }

    if (this.previousRolls.length < numberOfRolls) {
      console.log(`Requested ${numberOfRolls} rolls, but only found ${this.previousRolls.length}.`)
      numberOfRolls = this.previousRolls.length
    }

    const previousRolls = this.previousRolls.slice(-numberOfRolls)

    const previousRollsMessage = `The last ${numberOfRolls} rolls were: ${previousRolls.join(', ')}`

    console.log(previousRollsMessage)
    return previousRollsMessage
  }
}
