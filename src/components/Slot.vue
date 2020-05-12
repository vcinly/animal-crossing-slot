<template>
  <div class="slot-box">
    <!-- <MdButton class="md-raised md-primary" style="position: absolute; top: 0;" @click="run">Lucky</MdButton> -->
    <div :class="['box-center', {'box-center-move': isStart && done}]">
      <transition
        name="fade"
        enter-active-class="animate__animated animate__fadeInDown animation-delay-80"
        leave-active-class="animate__animated animate__slideOutUp animation-delay-80"
      >
        <div class="slot-box-first" v-if="isStart && !done ">
          <div :class="['gift-box gift-box-init', { 'gift-box-first': isStepTwo }]">
            <div class="box-inner">
              <div style="margin-top: 24px;">
              <Gift
                @finished="isFinishedOne"
                v-for="(config, index) in configs"
                :trigger="triggerOne"
                :config="config"
                :key="index"
              ></Gift>
              </div>
            </div>
          </div>

          <transition
            name="fade"
            enter-active-class="animate__animated animate__fadeIn animate__delay-1s"
          >
            <div class="gift-box gift-box-init" v-if="isStepTwo">
              <div class="box-inner"><div style="margin-top: 24px;">
                <Gift
                  @finished="isFinishedTwo"
                  v-for="(config, index) in configTwo"
                  :trigger="triggerTwo"
                  :config="config"
                  :key="index"
                ></Gift></div>
              </div>
            </div>
          </transition>

          <transition
            name="fade"
            enter-active-class="animate__animated animate__fadeIn animate__delay-1s"
          >
            <div class="gift-box gift-box-three" v-if="isStepThree">
              <div class="box-inner"><div style="margin-top: 24px;">
                <Gift
                  @finished="isFinishedThree"
                  v-for="(config, index) in configThree"
                  :trigger="triggerThree"
                  :config="config"
                  :key="index"
                ></Gift></div>
              </div>
            </div>
          </transition>
        </div>
      </transition>

      <transition
        name="fade"
        enter-active-class="animate__animated animate__heartBeat"
        leave-active-class="animate__animated animate__fadeOutDown animate__fast"
      >
        <div class="slot-box-second" v-if="!isStart && !isStepThree">
          <MdButton class="md-raised md-primary" @click="start">I'm Feeling Lucky</MdButton>
        </div>
      </transition>
    </div>

    <transition
      name="fade"
      enter-active-class="animate__animated animate__fadeIn animate__delay-1s"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        :class="['animal-avatar', { 'animal-avatar-move': showDetail && !isMobile, 'animal-avatar-mobile': isMobile }]"
        v-if="done"
      >
        <img :src="todayStar.imgUrl" />
      </div>
    </transition>

    <transition
      name="fade"
      enter-active-class="animate__animated animate__fadeIn animate__delay-1s"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        :class="['animal-detail', { 'animal-detail-move': showDetail && !isMobile, 'animal-detail-mobile': isMobile }]"
        v-if="showDetail"
      >
        <div class="box-poke-left">
          <div class="box-title-1">{{ todayStar.name }}{{ todayStar.gender }}</div>
          <div class="box-poke" style="width:50%">
            <font class="box-title-2">生日</font>
            <font class="box-font">{{ todayStar.birthday }}</font>
          </div>
          <div class="box-poke" style="width:calc(100% - 53%);margin-left:3%">
            <font class="box-title-2">性格</font>
            <font class="box-font">{{ todayStar.personality }}</font>
          </div>
          <div class="box-poke">
            <font class="box-title-2">初始口头禅</font>
            <font class="box-font">{{ todayStar.phrase }}</font>
          </div>
          <div class="box-poke">
            <font class="box-title-2">目标</font>
            <font class="box-font">{{ todayStar.dream || '--' }}</font>
          </div>
          <div class="box-poke">
            <div class="box-title-2" style="width:100%">座右铭</div>
            <div class="box-font" style="width:100%">{{ todayStar.motto || '--' }}</div>
          </div>
          <div class="box-poke">
            <font class="box-title-2">外文名称</font>
            <font class="box-font">{{ todayStar.otherName || '--' }}</font>
          </div>
        </div>
      </div>
    </transition>

    <transition
      name="fade"
      enter-active-class="animate__animated animate__fadeIn animation-delay-800"
    >
      <div :class="['restart-button', {'restart-button-mobile': isMobile}]">
        <md-button
          class="md-icon-button md-dense md-primary md-theme-light-green"
          v-if="showDetail"
          @click="reset"
        >
          <md-icon style="color: #69f0ae;">cached</md-icon>
        </md-button>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Gift from "./Gift.vue";
import animals from "../assets/animals.json";

export default {
  name: "Slot",
  components: {
    Gift
  },
  props: {
    // isStart: Boolean,
    // isStepTwo: Boolean,
    // isStepThree: Boolean,
    // done: Boolean,
    // showDetail: Boolean
  },
  data() {
    return {
      isMobile: window.innerWidth <= 750,
      isStart: false,
      isStepTwo: false,
      isStepThree: false,
      done: false,
      showDetail: false,
      run3D: true,
      triggerOne: null,
      triggerTwo: null,
      triggerThree: null,
      disabled: false,
      animals: animals,
      configTwo: [],
      configThree: [],
      selectPersonality: [],
      todayStar: {},
      configs: [
        {
          run3D: false,
          rotateY: -25,
          duration: 4000,
          rollback: 0.3,
          fontSize: 20,
          height: 48,
          width: 100,
          gifts: [
            "元气",
            "普通",
            "成熟",
            "大姐姐",
            "自恋",
            "运动",
            "悠闲",
            "暴躁"
          ]
        }
      ],
      openResultHistory: false,
      result: [],
      resultHistory: []
    };
  },
  computed: {},
  methods: {
    start() {
      this.isStart = true;
      setTimeout(() => {
        this.triggerOne = new Date();
        setTimeout(() => {
          this.triggerTwo = new Date();
        }, 6000);
      }, 1800);
    },
    run() {
      this.triggerTwo = new Date();
    },
    reset() {
      console.log("reset");
      this.showDetail = false;
      this.done = false;
      this.isStart = false;
      setTimeout(() => {
        Object.assign(this.$data, this.$options.data());
        this.isStepTwo = false;
        this.isStepThree = false;
        setTimeout(() => {
          this.start()
        }, 2000);
      }, 1000);
      let timer = null
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop > 0) {
          scrollTo(0, oTop - 20);
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    },
    isFinishedOne(val) {
      // const autoTurnList = this.$el.querySelectorAll('.autoTurn')
      // this.result.push(val)
      // if (autoTurnList.length === 1) {
      //   this.disabled = false
      //   this.resultHistory.push(this.result)
      //   this.result = []
      // }
      console.log(val);
      this.personality = this.animals.filter(x => x.personality.match(val));
      (this.configTwo = [
        {
          run3D: false,
          rotateY: -25,
          duration: 4000,
          rollback: 0.3,
          fontSize: 20,
          height: 48,
          width: 100,
          // attr: "species",
          gifts: Array.from(new Set(this.personality.map(x => x.species)))
        }
      ]),
        (this.isStepTwo = true);
    },
    isFinishedTwo(val) {
      console.log(val);
      let nameList = this.personality.filter(x => x.species.match(val));
      if (nameList.length == 1) {
        nameList = new Array(4).fill(nameList[0]);
      } else if (nameList.length == 2) {
        nameList = Array.from(new Array(4), (x, i) => {
          return nameList[i % 2];
        });
      } else if (nameList.length == 3) {
        nameList.push(nameList[0]);
      }

      (this.configThree = [
        {
          run3D: false,
          rotateY: -25,
          duration: 2000,
          rollback: 0.3,
          fontSize: 20,
          height: 48,
          width: 100,
          attr: "name",
          gifts: nameList
        }
      ]),
        (this.isStepThree = true);
      setTimeout(() => {
        this.triggerThree = new Date();
      }, 1800);
    },
    isFinishedThree(val) {
      console.log(val);
      this.todayStar = val;
      setTimeout(() => {
        this.done = true;
      }, 0);
      setTimeout(() => {
        this.showDetail = true;
        setTimeout(() => {
          if (this.isMobile) {
            this.autoMoveDown()
          }
        }, 2500);
      }, this.isMobile ? 1500 : 3500);
    },
    autoMoveDown () {
      let timer = null
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        var oTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        if (oTop < 520) {
          scrollTo(0, oTop + 10);
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.slot-box {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.box-center {
  margin-top: -5%;
  position: absolute;
}

.animation-delay-80 {
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}
.animation-delay-800 {
  -webkit-animation-delay: 8s;
  animation-delay: 8s;
}

.slot-box-first {
  user-select: none;
  position: relative;
  display: flex;
  align-items: center;
}

.gift-box {
  left: 0;
  height: 48px;
  overflow: hidden;
  border-radius: 30px;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  // background: url(https://patchwiki.biligame.com/images/dongsen/e/ef/arbetwbpw9040k4vsv8s42cnxa86mud.jpg);
}
.gift-box-init {
  position: absolute;
  left: -50px;
}

.gift-box-first {
  position: absolute;
  left: -170px;
  transition: all 1000ms linear;
}
.gift-box-three {
  position: absolute;
  left: 70px;
}
.box-center-move {
  transform: translateY(-215px);
  transition: all 1000ms linear;
}

.animal-avatar-move {
  position: absolute;
  transform: translateX(250px);
  transition: all 1000ms linear;
}
.animal-avatar-mobile {
  max-width: 90%;
}

.animal-detail {
  position: absolute;
  transform: translateX(-250px);
  width: 450px;
}
.animal-detail-mobile {
  position: absolute;
  transform: translateY(480px);
  width: 90%;
}

.box-title-1 {
  background: #fff;
  font-weight: bold;
  border-radius: 18px;
  height: 40px;
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 40px;
  margin-bottom: 10px;
  font-size: 20px;
}
.box-poke {
  float: left;
  overflow: hidden;
  background: #fff;
  border-radius: 18px;
  width: 100%;
  font-size: 20px;
  margin: 10px 0px;
}
.box-font {
  text-align: center;
  width: 65%;
  display: inline-block;
  line-height: 40px;
}
.box-title-2 {
  background: url(https://patchwiki.biligame.com/images/dongsen/e/ef/arbetwbpw9040k4vsv8s42cnxa86mud.jpg);
  font-weight: bold;
  color: #fff;
  border-radius: 18px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
  width: 35%;
  text-align: center;
}

.restart-button {
  position: absolute;
  transform: translateY(330px);
}
.restart-button-mobile {
  position: absolute;
  transform: translateY(700px);
  margin-bottom: 15px;
}

.md-button:not([disabled]).md-focused:before,
.md-button:not([disabled]):active:before,
.md-button:not([disabled]):hover:before {
  background-color: rgb(105, 240, 174);
  opacity: 0.12;
}

.box-inner {
  height: 48px;
  width: 100px;
  position: fixed;
  overflow: hidden;
  border-radius: 30px;
}

</style>
