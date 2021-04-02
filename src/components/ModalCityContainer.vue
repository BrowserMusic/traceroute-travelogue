<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">You are in {{ myCity.name }}!</slot>
        </div>

        <div class="modal-body">
          <ul>
            <li class="tab" @click.prevent="tripActivity = 0">Try some food</li>
            <li class="tab" @click.prevent="tripActivity = 1">
              Chat up the locals
            </li>
            <li class="tab" @click.prevent="tripActivity = 2">
              Go see the sights
            </li>
          </ul>

          <FineDining v-if="tripActivity == 0" />
          <SeeTheSights v-if="tripActivity == 1" />
          <TalkToLocals v-if="tripActivity == 2" />
          <!-- <slot name="body">Coordinates: {{ myCity.coords }}</slot> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FineDining from "./FineDining.vue";
import SeeTheSights from "./SeeTheSights.vue";
import TalkToLocals from "./TalkToLocals.vue";

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
      return this.$store.getters.getCurrentCityInfo;
    },
  },
  mounted() {
    // const ref = this;
    window.addEventListener("click", this.clickAwayToClose);
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
  },
};
</script>

<style>
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
  width: 300px;
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
}

.modal-default-button {
  float: right;
}

ul {
  list-style-type: none;
  padding-left: 0;
  display: flex;
}

.tab {
  cursor: pointer;
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