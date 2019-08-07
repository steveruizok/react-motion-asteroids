import { range, random } from 'lodash'
import { decorate, computed, observable } from 'mobx'

import Ship from './ship'
import Bullet from './bullet'
import Asteroid from './asteroid'

export const screen = {
	width: 600,
	height: 400,
}

export class Game {
	constructor() {
		window.addEventListener('keypress', this.handleKeyPress)
		window.addEventListener('keydown', this.handleKeyDown)
		window.addEventListener('keyup', this.handleKeyUp)

		this.ship = new Ship({
			x: screen.width / 2,
			y: screen.height / 2,
		})
		this.bullets = new Set<Bullet>([])
		this.asteroids = new Set(
			range(4).map((i) => {
				const [x, y] = this.ship.getOffsetPoint(
					random(128, 250, false),
					random(360)
				)
				return new Asteroid({ x, y })
			})
		)
	}

	/* ------------------------------- User Input ------------------------------- */

	presses = new Map<string, () => void>()
	inputs = new Map<string, () => void>()
	keyBuffer = new Set<string>([])

	handleKeyPress = (event: KeyboardEvent) => {
		const action = this.presses.get(event.key)
		if (action) action()
	}

	handleKeyDown = (event: KeyboardEvent) => {
		this.keyBuffer.add(event.key)
	}

	handleKeyUp = (event: KeyboardEvent) => {
		this.keyBuffer.delete(event.key)
	}

	handleKey = (key: string) => {
		const action = this.inputs.get(key)
		if (action) action()
	}

	/* ------------------------------- Observables ------------------------------ */

	lives = 3

	shots = 0

	hits = 0

	ship: Ship

	bullets: Set<Bullet>

	asteroids: Set<Asteroid>

	/* ------------------------------- Game Events ------------------------------ */

	start = () => {
		this.ship.start()
		this.bullets.forEach((asteroid) => asteroid.start())
		this.asteroids.forEach((asteroid) => asteroid.start())

		this.loop()
	}

	handlePlayerDeath = () => {
		this.lives -= 1
		if (this.lives >= 0) {
			this.resetLevel()
		}
	}

	restart = () => {
		this.lives = 3
		this.resetLevel()
	}

	resetLevel = () => {
		this.bullets = new Set<Bullet>([])
		this.asteroids = new Set(
			range(4).map((i) => {
				const [x, y] = this.ship.getOffsetPoint(
					random(128, 250, false),
					random(360)
				)
				return new Asteroid({ x, y })
			})
		)

		this.ship.dead = false
		this.ship.x.set(screen.width / 2)
		this.ship.y.set(screen.height / 2)
		this.ship.velocity = 0
	}

	get accuracy() {
		return this.hits / this.shots
	}

	/* ------------------------------- Main loop ------------------------------ */

	loop = () => {
		this.keyBuffer.forEach(this.handleKey)

		this.ship.render()
		this.bullets.forEach((asteroid) => asteroid.render())
		this.asteroids.forEach((asteroid) => asteroid.render())

		window.requestAnimationFrame(this.loop)

		if (this.asteroids.size <= 0) {
			this.resetLevel()
		}
	}
}

// Add observables
decorate(Game, {
	asteroids: observable,
	bullets: observable,
	lives: observable,
	hits: observable,
	shots: observable,
	accuracy: computed,
})

// Create game
export const game = new Game()
