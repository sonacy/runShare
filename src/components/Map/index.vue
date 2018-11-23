<template>
  <div id="main">
    <div id="track"></div>
    <canvas id="lineCanvas" style="background-color: rgba(0, 0, 0, 0.35);" :width="width" :height="height"></canvas>
    <div id='img_start_point'>
      <img src="@/assets/startpoint.png">
    </div>
    <div id='img_end_point'>
      <img src="@/assets/finishpoint.png">
    </div>
    <div id="img_light_point">
      <img src="@/assets/lightdot.png">
    </div>
  </div>
</template>

<script>
import { createMap, generateColors, generatePos } from '../../utils/map.js'

export default {
	name: 'amap',
	props: {
		sports: {
			type: Array,
			required: true,
		},
		heightRate: {
			type: Number,
			default: 0.7,
		},
	},
	data() {
		return {
			width: 375,
			height: 380,
		}
	},
	created() {
		this.map = null
		this.points = []
		this.lineArr = []
		this.pos = []
	},
	async mounted() {
		try {
			// 初始化地图
			const msg = await createMap()
			console.log(msg)

			this.lightPoint = document.getElementById('img_light_point')
			this.endPoint = document.getElementById('img_end_point')
			this.startPoint = document.getElementById('img_start_point')
			this.main = document.getElementById('main')

			this.width = window.innerWidth
			this.height = window.innerHeight * this.heightRate
			this.main.style.height = window.innerHeight * this.heightRate + 'px'

			this.map = new AMap.Map('track', {
				resizeEnable: false,
				dragEnable: false,
				zoomEnable: false,
				doubleClickZoom: false,
				mapStyle: 'amap://styles/whitesmoke',
			})
		} catch (e) {
			toast(e.message)
		}
	},
	methods: {
		animate(ctx) {
			let index = 0
			let raf

			this.startPoint.style.display = 'block'
			this.startPoint.style.left =
				this.pos[0].x - this.startPoint.offsetWidth / 2 + 'px'
			this.startPoint.style.top =
				this.pos[0].y - this.startPoint.offsetHeight / 2 + 'px'
			this.lightPoint.style.display = 'block'

			ctx.lineWidth = 5
			ctx.shadowBlur = 1
			ctx.lineJoin = 'round'
			ctx.lineCap = 'round'

			const run = () => {
				if (index < this.pos.length - 3) {
					ctx.beginPath()
					ctx.strokeStyle = this.pos[index].color
					ctx.moveTo(this.pos[index].x, this.pos[index].y),
						ctx.quadraticCurveTo(
							this.pos[index + 1].x,
							this.pos[index + 1].y,
							this.pos[index + 2].x,
							this.pos[index + 2].y
						),
						ctx.stroke()
					index++
					this.lightPoint.style.left =
						this.pos[index].x - this.lightPoint.offsetWidth / 2 + 'px'
					this.lightPoint.style.top =
						this.pos[index].y - this.lightPoint.offsetHeight / 2 + 'px'
					// raf = requestAnimationFrame(run)
					raf = setTimeout(run, 8)
				} else {
					// cancelAnimationFrame(raf)
					clearTimeout(raf)
					this.lightPoint.style.display = 'none'
					this.endPoint.style.display = 'block'
					this.endPoint.style.left =
						this.pos[this.pos.length - 1].x -
						this.endPoint.offsetWidth / 2 +
						'px'
					this.endPoint.style.top =
						this.pos[this.pos.length - 1].y -
						this.endPoint.offsetHeight / 2 +
						'px'
				}
			}
			run()
		},
	},
	watch: {
		sports: {
			immediate: true,
			deep: true,
			handler(sports) {
				if (sports && this.map) {
					this.points = generateColors(sports)
					this.lineArr = this.points.map(item =>
						generatePos(item.longitude, item.latitude)
					)

					new AMap.Polyline({
						map: this.map,
						path: this.lineArr,
						showDir: true,
						strokeColor: '#00A',
						strokeOpacity: 0,
					})
					// 显示覆盖物
					this.map.setFitView()

					this.map.on('complete', () => {
						this.lineArr.forEach((item, index) => {
							if (index !== 0) {
								const s = this.map.lnglatTocontainer(item)
								this.pos.push({
									x: s.getX(),
									y: s.getY(),
									color: this.sports[index].color,
								})
							}
						})

						const lineCanvas = document.getElementById('lineCanvas')
						const ctx = lineCanvas.getContext('2d')
						this.animate(ctx)
					})
				}
			},
		},
	},
}
</script>

<style lang="stylus" scoped>
#main
  position relative
  width 100%
  overflow hidden

#track
  position absolute
  top 0
  width 100%
  height 100%

#lineCanvas
  position absolute
  width 100%
  height 100%
  z-index 100
  top 0
  left 0

#img_start_point, #img_end_point, #img_light_point
  position absolute
  z-index 9999
  width 60px
  height 60px
  display none

#img_start_point img, #img_end_point img, #img_light_point img
  width 60px
  height 60px
  border 0
</style>
