<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">You are in {{ myCity.name }}!</slot>
        </div>

        <div class="modal-body">
          <ul class="activity-tabs">
            <li class="tab" @click.prevent="tripActivity = 0">Try some food</li>
            <li class="tab" @click.prevent="tripActivity = 1">
              Go see the sights
            </li>
            <li class="tab" @click.prevent="tripActivity = 2">
              Chat up the locals
            </li>
          </ul>

          <FineDining v-if="tripActivity == 0" />
          <SeeTheSights v-if="tripActivity == 1" />
          <TalkToLocals v-if="tripActivity == 2" />
          <!-- <slot name="body">Coordinates: {{ myCity.coords }}</slot> -->

          <ul>
            <li class="tab" @click.prevent="prevCity" v-if="cityIndex > 0">
              Previous city
            </li>
            <li
              class="tab"
              @click.prevent="nextCity"
              v-if="cityIndex < tripLength"
            >
              Next city
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FineDining from "./dining/FineDining.vue";
import SeeTheSights from "./attractions/SeeTheSights.vue";
import TalkToLocals from "./attractions/TalkToLocals.vue";

export default {
  components: {
    FineDining,
    SeeTheSights,
    TalkToLocals,
  },
  data() {
    return {
      tripActivity: -1,
    };
  },
  computed: {
    myCity() {
      return this.$store.getters["path/getCurrentCityInfo"];
    },
    cityIndex() {
      return this.$store.state.path.currentCity;
    },
    tripLength() {
      return this.$store.getters["path/tripLength"];
    },
  },
  mounted() {
    const ref = this;
    window.addEventListener("click", this.clickAwayToClose);

    document.addEventListener("keydown", (e) => {
      if (e.key == "Escape") {
        ref.$store.commit("openModal", false);
      }
    });
  },
  beforeDestroy() {
    window.removeEventListener("click", this.clickAwayToClose);
  },
  methods: {
    clickAwayToClose(e) {
      const ref = this;
      if (e.target.classList[0] == "modal-wrapper") {
        ref.$store.commit("openModal", false);
      }
    },
    nextCity() {
      // this.$store.commit("changeCity", this.$store.state.path.currentCity + 1);
      // this.changeCity(this.$store.state.path.currentCity);
      this.$store.commit(
        "path/changeCity",
        this.$store.state.path.currentCity + 1
      );
      this.changeCity(this.$store.state.path.currentCity);
    },
    prevCity() {
      this.$store.commit(
        "path/changeCity",
        this.$store.state.path.currentCity - 1
      );
      this.changeCity(this.$store.state.path.currentCity);
    },
    changeCity(cIndex) {
      this.$emit("changeCity", cIndex);
    },
  },
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90vw;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;

  ul.activity-tabs {
    // list-style-type: none;
    // padding-left: 0;
    display: flex;
    // justify-content: center;
  }
}

ul {
  list-style-type: none;
  padding-left: 0;
}

.modal-default-button {
  float: right;
}

.tab {
  cursor: pointer;
  padding: 0.5em 1em;
  background: #d7d7d7;
  margin-right: 0.5em;
  border-radius: 2px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>