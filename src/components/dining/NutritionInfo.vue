<template>
  <div class="nutrition-info">
    <h1>Nutrition Facts</h1>
    <div class="serving-size">
      <span>Serving Size</span>
      <span>1 {{ decideName() }}</span>
    </div>
    <div class="calories">
      <p>
        <span>Amount per serving</span>
        <span>Calories</span>
      </p>
      <p>{{ current.calories }}</p>
    </div>
    <div class="stats">
      <!-- <p class="dv">% Daily Value*</p> -->
      <ul class="nutrient-root primary">
        <li class="nutrient dv">% Daily Value*</li>
        <SingleNutrient
          v-for="(stat, index) in current.stats"
          :nutrient="stat"
          :key="index"
        />
      </ul>
      <ul class="nutrient-root vitamins">
        <SingleNutrient
          v-for="(vitamin, index) in current.vitamins"
          :nutrient="vitamin"
          :key="index"
        />
      </ul>
      <p class="info">
        <span>*</span>
        <span
          >The % Daily Value (DV) tells you how much a nutrient in a serving of
          food contributes to a daily diet. 2,000 calories a day is used for
          general nutrition advice.</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import SingleNutrient from "./SingleNutrient.vue";

export default {
  name: "NutritionInfo",
  components: { SingleNutrient },
  props: {
    selected: String,
  },
  data() {
    return {
      current: {
        name: "Potato",
        calories: 110,
        stats: [
          {
            name: "Total Fat",
            value: "0g",
            percent: "0%",
            children: [
              {
                name: "Saturated Fat",
                value: "0g",
                percent: "0%",
              },
              {
                name: "Trans Fat",
                value: "0g",
              },
            ],
          },
          {
            name: "Cholesterol",
            value: "0mg",
            percent: "0%",
          },
          {
            name: "Sodium",
            value: "0mg",
            percent: "0%",
          },
          {
            name: "Total Carbohydrate",
            value: "26g",
            percent: "7%",
            children: [
              {
                name: "Dietary Fiber",
                value: "2g",
                percent: "7%",
              },
              {
                name: "Total Sugars",
                value: "1g",
                children: [
                  {
                    name: "Includes 0g Added Sugars",
                    percent: "0%",
                  },
                ],
              },
            ],
          },
          {
            name: "Protein",
            value: "3g",
          },
        ],
        vitamins: [
          {
            name: "Vitamin D",
            value: "0mg",
            percent: "0%",
          },
          {
            name: "Calcum",
            value: "20mg",
            percent: "2%",
          },
          {
            name: "Iron",
            value: "1mg",
            percent: "6%",
          },
          {
            name: "Potassium",
            value: "620mg",
            percent: "15%",
          },
          {
            name: "Vitamin C",
            value: "27mg",
            percent: "30%",
          },
          {
            name: "Vitamin B12",
            value: "0.2mg",
            percent: "10%",
          },
        ],
      },
    };
  },
  methods: {
    decideName() {
      if (this.selected != null) {
        return this.selected;
      } else {
        return this.current.name;
      }
    },
  },
};
</script>

<style lang="scss">
.nutrition-info {
  --main-border: 5px solid black;
  --big-border: 10px solid black;
  border: var(--main-border);
  margin: 0.5em;
  max-width: 250px;
  padding: 0.5em;

  h1 {
    border-bottom: 1px solid black;
    margin: 0;
  }

  .calories,
  .stats,
  .serving-size {
    display: flex;
    flex-wrap: wrap;
  }

  .serving-size {
    justify-content: space-between;
    margin: 0.25em 0;
  }

  .calories {
    align-items: flex-end;
    border-top: var(--big-border);
    border-bottom: var(--main-border);
    justify-content: space-between;
    padding: 0.4em 0 0;

    p:first-child {
      margin: 0;
    }

    p:first-child span:last-child {
      display: block;
      font-weight: bold;
      font-size: 2em;
      text-align: left;
    }
    p:last-child {
      font-size: 3em;
      font-weight: bold;
      line-height: 1;
      margin: 0;
      // margin-top: 0.15em;
      // margin-bottom: 0;
    }
  }
  ul {
    width: 100%;

    .dv {
      border-bottom: 1px solid black;
      font-size: 0.9em;
      font-weight: bold;
      text-align: right;
    }
  }
  .info {
    display: flex;
    font-size: 0.8em;
    span:first-child {
      margin-right: 0.5em;
    }
  }
}

.nutrient-root {
  margin: 0;

  &.primary {
    border-bottom: var(--big-border);
  }
  &.vitamins {
    border-bottom: var(--main-border);
  }
}
</style>