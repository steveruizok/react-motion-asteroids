import React from 'react'
import { motion } from 'framer-motion'
import { range, random } from 'lodash'
import { observer } from 'mobx-react-lite'

import { screen, game } from './game/index'
import { Ship, Asteroid, Bullet, EndScreen } from './components/index'
import './App.css'

const App: React.FC = observer(() => {
	// Observables
	const { asteroids, bullets, lives, accuracy } = game

	// Start Game
	React.useEffect(() => {
		game.start()
	}, [])

	// Generate stars on each life change
	const stars = React.useMemo(() => {
		return range(100 - lives).map((i) => (
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
					position: 'relative',
				}}
			>
				{stars}
				{// ship
				lives > 0 && (
					<Ship
						x={game.ship.x}
						y={game.ship.y}
						angle={game.ship.angle}
						radius={game.ship.radius}
					/>
				)}
				{// bullets
				Array.from(bullets).map(({ id, x, y, angle, radius }, i) => (
					<Bullet key={id} x={x} y={y} angle={angle} radius={radius} />
				))}
				{// asteroids
				Array.from(asteroids).map(({ id, x, y, angle, radius }, i) => (
					<Asteroid key={id} x={x} y={y} angle={angle} radius={radius} />
				))}
				<div style={{ position: 'absolute', top: 0, left: 0, width: '100%' }}>
					{accuracy ? (accuracy * 100).toFixed() + '%' : '100%'} |{' '}
					{lives <= 0 ? <EndScreen onClick={game.restart} /> : lives}
				</div>
			</motion.div>
			<div style={{ padding: 16 }}>
				W thrust | A left | D right | SPACE shoot
			</div>
			<div style={{ padding: 16 }}>
				<a href="https://twitter.com/steveruizok">@steveruizok</a>
			</div>
		</div>
	)
})

export default App
