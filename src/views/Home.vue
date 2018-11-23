<template>
  <div class="main">
    <Map :sports="sports"/>
    <Panel :user="user" />
  </div>
</template>

<script>
import Map from '@/components/Map'
import Panel from '@/components/Panel'
import axios from 'axios'

export default {
	components: { Map, Panel },
	data() {
		return {
      sports: [],
      user: {}
		}
	},
	async mounted() {
		try {
      const res = await axios.get('/gps_route_share?share_id=3tqm58Y9sc0=')
      const data = res.data.data
      this.user = {
        name: data.nick,
        startDate: data['start_date'],
        endDate: data['end_date'],
        calories: data['total_calories'],
        distance: data['total_distance'],
        time: data['total_time'],
        averagePace: data['average_pace'],
        maxSpeed: data['max_pace'],
        minSpeed: data['min_pace']
      }

      this.sports = data.points
		} catch (e) {
			console.log(e)
		}
	},
}
</script>
