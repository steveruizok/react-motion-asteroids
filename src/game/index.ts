import Ship from './ship'
import Bullet from './bullet'
import Asteroid from './asteroid'
import { range, random } from 'lodash'

export const screen = {
	width: 600,
	height: 400,
}

export class Game {
	// key presses
	presses = new Map<string, () => void>()
	handleKeyPress = (event: KeyboardEvent) => {
		const action = this.presses.get(event.key)
		if (action) action()
	}
	// buffered keys
	inputs = new Map<string, () => void>()
	keyBuffer = new Set<string>([])
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
	// react state
	lives = 3
	ship: Ship
	bullets: Set<Bullet>
	asteroids: Set<Asteroid>
	paused = false
	setLives: any = () => null
	setAsteroids: any = () => null
	setBullets: any = () => null
	setPaused: any = () => null

	constructor() {
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

	start = () => {
		this.ship.start()
		this.bullets.forEach((asteroid) => asteroid.start())
		this.asteroids.forEach((asteroid) => asteroid.start())

		this.loop()
	}

	handlePlayerDeath = () => {
		this.lives -= 1
		if (this.lives <= 0) {
			this.setLives(this.lives)
		} else {
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
		this.setLives(this.lives)
		this.setBullets(new Set(this.bullets))
		this.setAsteroids(new Set(this.asteroids))
	}

	loop = () => {
		this.keyBuffer.forEach(this.handleKey)

		this.ship.render()
		this.bullets.forEach((asteroid) => asteroid.render())
		this.asteroids.forEach((asteroid) => asteroid.render())

		if (!this.paused) {
			window.requestAnimationFrame(this.loop)
		}

		if (this.asteroids.size <= 0) {
			this.resetLevel()
		}
	}
}

export const game = new Game()
game.start()
