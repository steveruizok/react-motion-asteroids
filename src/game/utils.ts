export function getOffsetPoint(x = 0, y = 0, angle = 0, length = 0) {
	angle = (angle * Math.PI) / 180 // if you're using degrees instead of radians
	return [length * Math.cos(angle) + x, length * Math.sin(angle) + y]
}
