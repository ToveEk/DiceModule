/**
 * Entry point for testing the Dice module.
 *
 * @file testApp.js
 * @description Entry point for testing the Dice module.
 * @author Tove Ek
 * @version 1.0.0
 */

import { Dice } from '../src/dice.js'

const diceRoller = new Dice()

// ---------------
// Basic rolls
// ---------------

console.log('==== Basic Rolls ====')
console.log(diceRoller.startRolling('2d6+1')) // Roll two six-sided dice with plus 1 modifier

console.log(diceRoller.startRolling('d4+5')) // Roll a single four-sided die with plus 5 modifier

console.log(diceRoller.startRolling('3d8-2')) // Roll three eight-sided dice with minus 2 modifier

// -------------------------------
// Rolls with single dice types
// -------------------------------

console.log('\n==== Rolls with Single Dice Types ====')
console.log(diceRoller.startRolling('d10')) // Roll a single ten-sided die
console.log(diceRoller.startRolling('d12')) // Roll a single twelve-sided die
console.log(diceRoller.startRolling('d100')) // Roll a single one-hundred-sided die

// ------------------------------------
// Rolls with advantage/disadvantage
// ------------------------------------

console.log('\n==== Rolls with Advantage/Disadvantage ====')
console.log(diceRoller.startRolling('2d20 with advantage')) // Roll two twenty-sided dice with advantage
console.log(diceRoller.startRolling('3d20 with disadvantage')) // Roll two twenty-sided dice with disadvantage

// -----------------
// Natural 20 and 1
// -----------------

console.log('\n==== Natural 20 and Natural 1 ====')
console.log(diceRoller.startRolling('d20')) // Roll a single twenty-sided die (may result in natural 20 or 1)

// -----------------
// Invalid rolls
// -----------------

console.log('\n==== Invalid Rolls ====')
// console.log(diceRoller.startRolling('d5')) // Invalid die type
// console.log(diceRoller.startRolling('6')) // Invalid notation
// console.log(diceRoller.startRolling()) // Invalid notation
// console.log(diceRoller.startRolling('2d20 with advntage')) // Misspelled advantage
// console.log(diceRoller.startRolling('2d4 with advantage')) // Advantage not allowed with d4

// -----------------
// Show history
// -----------------

console.log('\n==== Show Roll History ====')
diceRoller.showHistory(100) // Show the last 100 rolls
diceRoller.showHistory(3) // Show the last 3 rolls
diceRoller.showHistory(0) // Invalid input
diceRoller.showHistory(-2) // Invalid input
diceRoller.showHistory('two') // Invalid input
