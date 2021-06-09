# Using Vue

This section is old, but still relevant for how to use Vue.

### Vue Components

Most of what you care about is in `src/components`. `App.vue` is essentially the main page of the site.

Components are generally smaller pieces of markup + style + behavior. You can see the split by the template/script/style tags. In the template section, it's basically HTML with some extra conditional stuff. Look at `src/components/ModalCityContainer.vue` to see examples of basic if statements and in-line click handling.

### Script
In the script section, Vue has a lot of predefined functions that have specific purposes.

* `data()` is where you put most variables that belong to the component in question.
* Functions inside `computed` are also variables that belong to the component, but they're defined as functions instead because they'll automatically update anything using their values if they change. This is mostly important for accessing values from the store (more on that soon).
* `mounted()` is where you put code that has to interact with the DOM. Since Vue has a server-side half that doesn't even know the browser exists, you have to wait until the component is "mounted" to do anything DOM-related. Ex: in `src/components/LeafletMap.vue`, we have to wait for the browser to exist before we can stick the map in it. There are other lifecycle methods, like `created()` and `beforeDestroy()`. Created happens before the component mounts, beforeDestroy is before you fully leave the page.

### Store (Vuex)
The last thing to explain is the store. The advantage of React, Vue, or Svelte is that they're reactive – things automatically update when values change, rather than needing a complicated series of listeners or passing a hacky global state object around. The store (called Vuex in Vue) is like having a global state, but it has some protections against accidentally overwriting values.

The store has a state, mutations, getters, and actions (no actions in ours yet though). You can look at all of those in `src/store/index.js`.

* The state is where all the variables are held. You can get these values in components by doing `this.$store.state.whatever`.
* To update the variables in the state, you have to call a mutation on them, like `this.$store.commit("myMutation", false)`. (Mutations can be complicated, but ours are all pretty simple right now.)
* Getters are completely optional, since you can just get the state with `this.$store.state.whatever`, but they're nice when there's some more complicated version of the state that you expect you'll need more than once. `getPath()` splices out all the coordinates away from the city names, for example, which makes it easier to generate points on the map. You call them as `this.$store.getters.theGetter` (no parentheses).
* Actions can be asynchronous, which means if we needed to do AJAX calls as part of setting/initializing data in the store, that's where that will/would happen.

Below are things automatically set up by the project init.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
You'll use this one the most!
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
