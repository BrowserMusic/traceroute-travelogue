<template>
  <div class="hub-zone" :style="chooseBg()">
    <h3>pick one!</h3>
    <div class="hub-grid">
      <div
        :class="'hub-link hub-' + index"
        v-for="(loc, index) in settings.locations"
        :key="index"
        @click="toNext(loc)"
      >
        <img v-if="'img' in loc" :src="loc.img" />
        <p v-if="'text' in loc">
          <span>{{ loc.text }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HubZone",
  props: {
    settings: Object,
  },
  mounted() {
    this.$store.commit("path/freeze", true);
  },
  methods: {
    chooseBg() {
      if ("bg" in this.settings) {
        return `--bg-image: url('${this.settings.bg}');`;
      } else {
        return "";
      }
    },
    async toNext(loc) {
      console.log(loc.to);
      await this.$store.dispatch("path/toOption", loc.to);
    },
  },
};
</script>

<style lang="scss">
.hub-zone {
  --bg-image: linear-gradient(
    90deg,
    rgba(63, 94, 251, 1) 0%,
    rgba(129, 83, 184, 1) 15%,
    rgba(252, 70, 107, 1) 40%,
    rgba(232, 187, 48, 1) 58%,
    rgba(104, 205, 86, 1) 74%,
    rgba(86, 94, 205, 1) 96%
  );
  background: var(--bg-image);

  padding: 2em;
  position: absolute;
  bottom: 2em;
  right: 200px;
  // height: 400px;
  min-width: 350px;
  border: 5px solid white;
  box-shadow: 0px 0px 0px 2px black;
  border-radius: 10px;

  .hub-grid {
    display: flex;
    flex-direction: column;
  }

  h3 {
    margin: 0;
    margin-bottom: 1em;
    text-align: center;
  }

  .hub-link {
    display: inline-block;
    margin-top: 1em;

    &:hover {
      cursor: pointer;
    }

    p {
      margin: 0;
      span {
        background: white;
      }
    }

    img {
      max-width: 100%;
    }
  }

  .hub-1 {
    align-self: flex-end;
    // grid-row: 2;
    // grid-column: 3;
  }
  .hub-2 {
    align-self: center;
    // grid-row: 3;
    // grid-column: 2;
  }
}
</style>