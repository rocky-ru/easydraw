/**
 * The shape at the end of a line
 */

/**
 * LOG
 * 180823 remove arrow's func 'svg'
 */

const getArrowPoints = (x, y, angle, width, length) => [
	{
		x: x + Math.cos(angle + Math.PI / 2) * width / 2,
		y: y + Math.sin(angle + Math.PI / 2) * width / 2
	}, {
		x: x + Math.cos(angle) * length,
		y: y + Math.sin(angle) * length
	}, {
		x: x + Math.cos(angle - Math.PI / 2) * width / 2,
		y: y + Math.sin(angle - Math.PI / 2) * width / 2
	}
]

const lineEndCapShaped = {
	arrow: {
		drawToCanvas(ctx, x, y, angle, width, color, length) {
			let points;
			if (length == null) {
				length = 0;
			}
			length = length || width;
			ctx.fillStyle = color;
			ctx.lineWidth = 0;
			ctx.strokeStyle = 'transparent';
			ctx.beginPath();
			points = getArrowPoints(x, y, angle, width, length);
			ctx.moveTo(points[0].x, points[0].y);
			ctx.lineTo(points[1].x, points[1].y);
			ctx.lineTo(points[2].x, points[2].y);
			ctx.fill();
			ctx.draw(true)
		}
	}
}

export default lineEndCapShaped;

