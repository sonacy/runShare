<template>
  <div class="main">
    <div class="content">
      <div class="mile">
        <span class="big">{{user.distance}}</span>
        <span class="small">公里</span>
      </div>
      <div class="logo">
        <div class="outter">
          <img src="@/assets/logo.png">
        </div>
        <span class="name">{{user.name}}</span>
      </div>
      <div class="date">{{user.startDate}}</div>
      <div class="speed">
        <div class="line"></div>
        <div class="text">
          <span>最慢 {{user.minSpeed}}</span>
          <span>最快 {{user.maxSpeed}}</span>
        </div>
      </div>
      <div class="information">
        <span class="item">
          <span class="name">配速</span>
          <span class="value">{{user.averagePace}}</span>
        </span>
        <span class="item">
          <span class="name">时间</span>
          <span class="value">{{user.time}}</span>
        </span>
        <span class="item">
          <span class="name">消耗</span>
          <span class="value">{{user.calories}}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.main
  position absolute
  width 100%
  bottom 0
  background-image url('../../assets/bgc.png')
  background-position 0 0
  background-size cover
  background-repeat no-repeat
  z-index 999
  .content
    padding 6px 12px
    .mile
      .big
        font-size 24px
      .small
        padding-left 10px
        font-size 12px
    .logo
      position absolute
      top -24px
      right 12px
      width 48px
      height 72px
      overflow hidden
      .outter
        border-radius 50%
        background-color rgb(227, 227, 227)
        width 48px
        height 48px
        img
          margin-top 4px
          margin-left 4px
          width 40px
          height 40px
          border-radius 50%
      .name
        color rgb(119,119,119)
        font-size 12px
        line-height 24px
        text-align center
        white-space nowrap
        overflow hidden
    .date
      font-size 12px
      color rgb(119,119,119)
    .speed
      margin-top 10px
      .line
        height 4px
        width 100%
        background linear-gradient(to right,#ED5E0D, #FFD02B 40%, #A2C903)
        border-radius 2px
      .text
        display flex
        align-items center
        justify-content space-between
        color rgb(119,119,119)
        font-size 12px
        margin-top 10px
    .information
      margin-top 20px
      border-top 1px solid RGB(219, 219, 219)
      display flex
      align-items center
      justify-content space-around
      padding-top 20px
      .item
        flex 1
        text-align center
        display flex
        flex-direction column
        .name
          font-size 12px
          color rgb(119,119,119)
        .value
          font-size 24px
          color #000
</style>
