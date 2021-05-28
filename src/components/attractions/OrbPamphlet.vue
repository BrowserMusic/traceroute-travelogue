<template>
  <div
    :class="{
      'travel-pamphlet': true,
      'show-cover': page == 0,
    }"
  >
    <div class="cover" v-if="page == 0">
      <h1>Welcome to the packet sphere!</h1>
      <p>
        Whether you're traveling through our lovely underground cables burried
        deep in the earth, on a nautical journey through our submarine ocean
        lines, or a lil' bit of both we're confident you're in for a memorable
        experience.
      </p>
    </div>
    <div v-else class="page">
      <img v-if="'image' in settings" :src="settings.image" />
      <p v-if="'text' in settings">{{ settings.text }}</p>
    </div>
    <div v-if="page != 0" class="left-page"></div>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 0,
    },
    settings: Object,
  },
};
</script>

<style lang="scss">
.travel-pamphlet {
  // background-image: url("/images/server_big.jpeg");
  border-left: 30px solid red;
  box-shadow: -29px 35px 9px 2px rgba(0, 0, 0, 0.25);
  position: absolute;
  top: 1em;
  right: 4em;
  transform: rotate(-10deg);
  max-width: 400px;
  // border: 1px solid black;
  min-height: 590px;

  &:not(.show-cover) {
    border-top: 1px solid grey;
    border-bottom: 1px solid grey;
    border-left: 30px solid white;
  }

  &::before,
  &::after {
    content: "";
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 24px;
    height: 100%;
    transform: skewY(-46.6deg) translate(-54px, -44px);
    background-color: darkred;
    border-bottom-left-radius: 2px;
  }

  &::after {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 20px;
    width: 106%;
    background: grey;
    transform: skewX(-43.6deg) translate(-18px, 25px);
    border-bottom: 4px solid #6d0000;
    box-shadow: inset 1px -2px 3px 0 rgba(0, 0, 0, 0.25);
  }

  .cover {
    background: linear-gradient(
        rgba(255, 255, 255, 0.25),
        rgba(255, 255, 255, 0.25)
      ),
      url("/images/server_big.jpeg");
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: inherit;
    min-height: inherit;
    // padding: 1em;
    // height: 300px;

    h1 {
      color: white;
      font-weight: bold;
      font-size: 3em;
      text-transform: uppercase;
      text-align: center;
      margin: 0;
      margin-bottom: 1em;
      text-shadow: -1px -1px 0 rgba(0, 0, 0, 0.25),
        0px -1px 0 rgba(0, 0, 0, 0.25), 1px 1px 0 rgba(0, 0, 0, 0.25),
        0px 1px 0 rgba(0, 0, 0, 0.25);
    }

    p {
      background-color: white;
      padding: 1em;
      margin: 1em auto;
      width: 60%;
    }
  }

  .page {
    background-color: white;
    border-right: 1px solid grey;
    // border-top: 1px solid grey;
    min-height: inherit;
    padding: 2em 2em 1em 1em;

    img {
      max-width: 100%;
    }
  }

  .left-page {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: #fffcdd;
    transform: skew(0deg, 30deg) translate(-400px, 123px);
    border-right: 10px solid #d6cece;
    border-top: 1px solid grey;
    border-left: 1px solid grey;
    box-shadow: 0px 6px 0 #6d0000;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: -20px;
      height: 100%;
      width: 15px;
      background: linear-gradient(90deg, #75757547, transparent);
      transform: skew(0deg, -30deg) translate(5px, -1px);
    }
  }
}
</style>