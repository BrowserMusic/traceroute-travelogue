<template>
  <li class="nutrient" v-if="nutrient != null">
    <div class="nut-line">
      <span class="name"
        >{{ nutrient.name }}
        <span v-if="'value' in nutrient" class="value">{{
          nutrient.value
        }}</span></span
      >

      <span v-if="'percent' in nutrient">{{ nutrient.percent }}</span>
    </div>
    <ul v-if="'children' in nutrient && nutrient.children.length > 0">
      <SingleNutrient
        v-for="(child, index) in nutrient.children"
        :nutrient="child"
        :key="index"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: "SingleNutrient",
  props: {
    nutrient: Object,
    index: Number,
  },
  mounted() {
    // console.log(this.nutrient);
    // console.log(this.nutrient.name);
    // console.log(this.index);
  },
};
</script>

<style lang="scss">
li.nutrient {
  margin-left: 0;
}
.nut-line {
  border-bottom: 1px solid black;
  display: flex;
  font-size: 0.9em;
  justify-content: space-between;
  padding: 0.25em 0;
  width: 100%;
}

li.nutrient li.nutrient .nut-line .name {
  padding-left: 1em;
}

li.nutrient li.nutrient li.nutrient .nut-line .name {
  padding-left: 2em;
}

.nutrient-root.primary > li.nutrient > .nut-line .name {
  font-weight: bold;

  .value {
    font-weight: normal;
  }
}
</style>