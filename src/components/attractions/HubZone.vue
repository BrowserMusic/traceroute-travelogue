<template>
  <div class="hub-zone" :style="chooseBg()">
    <h3>pick one!</h3>
    <div class="hub-grid">
      <div
        :class="getClass(loc, index)"
        v-for="(loc, index) in settings.locations"
        :key="index"
        @click="toNext(loc, index)"
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
    console.log(this.settings.locations);
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
    lockState(loc) {
      return (
        ("requires" in loc && loc.requires.length > 0) ||
        ("locked" in loc && loc.locked == true)
      );
    },
    getClass(loc, index) {
      let retval = "hub-link hub-" + index;
      retval += this.lockState(loc) ? " locked" : "";
      return retval;
    },
    async toNext(loc, index) {
      if (this.lockState(loc)) return;
      let all = this.settings.locations;

      if ("locks" in loc) {
        all[loc["locks"]].locked = true;
      }

      for (let i = 0; i < all.length; i++) {
        if ("requires" in all[i] && all[i].requires.includes(index)) {
          all[i].requires = all[i].requires.filter((s) => s != index);

          if (all[i].requires.length == 0 && all[i].locked) {
            all[i].locked = false;
          }
        }
      }

      const data = {
        id: this.settings.scene,
        data: {
          components: [
            {
              name: "hub",
              settings: { locations: all },
            },
          ],
        },
      };

      await this.$store.dispatch("path/hubAlteration", data);
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
  z-index: 100;

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
    margin-top: 1em;
    display: flex;
    flex-direction: column;

    &:hover {
      cursor: pointer;
    }

    p {
      margin: 0;
      margin-top: -1em;
      margin-left: 10px;
      position: relative;

      span {
        background: white;
        border: 6px solid orange;
        box-shadow: 3px 3px 0 0 rgba(0, 0, 0, 0.25);
      }
    }

    img {
      border: 7px solid #00abff;
      box-shadow: 2px 2px 0px 0 rgba(0, 0, 0, 0.25);
      min-width: 60px;
      max-width: 150px;
    }
  }

  .hub-link.locked {
    opacity: 0.8;

    &:hover {
      cursor: not-allowed;
    }

    img {
      filter: grayscale(100%);
    }

    img,
    p span {
      border-color: grey;
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