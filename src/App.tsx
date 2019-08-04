import React from 'react'
import './App.css'
import { motion } from 'framer-motion'
import { screen, game } from './game/index'
import { Ship, Asteroid, Bullet, EndScreen } from './components/index'
import { range, random } from 'lodash'

const App: React.FC = () => {
	const [asteroids, setAsteroids] = React.useState(game.asteroids)
	const [bullets, setBullets] = React.useState(game.bullets)
	const [lives, setLives] = React.useState(game.lives)

	React.useEffect(() => {
		game.setAsteroids = setAsteroids
		game.setBullets = setBullets
		game.setLives = setLives

		window.addEventListener('keypress', game.handleKeyPress)
		window.addEventListener('keydown', game.handleKeyDown)
		window.addEventListener('keyup', game.handleKeyUp)
		return () => {
			window.removeEventListener('keypress', game.handleKeyPress)
			window.removeEventListener('keydown', game.handleKeyDown)
			window.removeEventListener('keyup', game.handleKeyUp)
		}
	}, [])

	const stars = React.useMemo(() => {
		return range(100).map((i) => (
			<motion.div
				style={{
					position: 'absolute',
					x: random(0, screen.width),
					y: random(0, screen.height),
					height: random(1, 2),
					width: random(1, 2),
					backgroundColor: '#41ff02',
				}}
			/>
		))
	}, [lives])

	return (
		<div
			className="App"
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100vw',
				height: '100vh',
				placeItems: 'center',
				placeContent: 'center',
				fontSize: 32,
				color: '#41FF00',
				fontFamily: 'VT323, monospace',
				backgroundColor: '#1e1f2c',
			}}
		>
			<motion.div
				style={{
					height: screen.height,
					width: screen.width,
					border: '1px solid #41FF00',
					overflow: 'hidden',
				}}
			>
				{stars}
				{lives > 0 && (
					<Ship
						x={game.ship.x}
						y={game.ship.y}
						angle={game.ship.angle}
						radius={game.ship.radius}
					/>
				)}
				{Array.from(bullets).map(({ id, x, y, angle, radius }, i) => (
					<Bullet key={id} x={x} y={y} angle={angle} radius={radius} />
				))}
				{Array.from(asteroids).map(({ id, x, y, angle, radius }, i) => (
					<Asteroid key={id} x={x} y={y} angle={angle} radius={radius} />
				))}
				{lives <= 0 ? <EndScreen onClick={game.restart} /> : lives}
			</motion.div>
			<div style={{ padding: 16 }}>
				W thrust | A left | D right | SPACE shoot
			</div>
			<div style={{ padding: 16 }}>
				<a href="https://twitter.com/steveruizok">@steveruizok</a>
			</div>
		</div>
	)
}

export default App
