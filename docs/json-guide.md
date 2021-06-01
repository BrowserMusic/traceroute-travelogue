# Let's look at the JSON!

Here's how to the JSON works for this piece. It looks a little scary, but I promise that it's mostly just tedious.

I recommend that you get VS Code to do this. It checks JSON syntax so you can fix your errors quickly.

## Basics

All the individual files are in /src/data/story, labeled by its city, with a number in front of it. Each city is a list of scenes, and each scene is an object. In the abstract, a city with three scenes looks like this:

```json
[
  {
    "thing": "one"
  },
  {
    "thing": "two"
  },
  {
    "thing": "three"
  }
]
```

In practice, a city with three scenes, where the first two are animations and the second is a section of dialogue, looks like this:

```json
[
  {
    "type": "animation",
    "this": "is a scene",
    "stuff": "etc"
  },
  {
    "type": "animation",
    "this": "is a second scene",
    "stuff": "etc"
  },
  {
    "type": "dialogue",
    "this": "is a third scene",
    "lines": [
      {
        "speaker": "Becky",
        "text": "with lines of dialogue in it"
      },
      {
        "speaker": "Becky",
        "text": "a second line of dialogue??"
      },
      {
        "speaker": "Becky",
        "text": "a third line of dialogue??"
      }
    ]
  }
]
```

**Hot JSON tip**: you need commas between everything but the last element in a block, or JSON will throw errors. So every dialogue line but the last as a comma between. Every scene but the last has a comma between. Every parameter inside a scene but the last has a comma between.

As you press "Proceed" or hit the spacebar, the piece will jump to the next scene in the JSON, or the next line, if there's dialogue. So in this case, the first scene loads automatically. When you hit proceed, the second scene loads. When you hit proceed a third time, the third scene loads, and the first line of dialogue displays right when it loads. Every "Proceed" will keep stepping through the dialogue until it runs out of lines, at which point it jumps to the next scene.

## Adding Dialogue

First, add a new scene with the dialogue boilerplate in it. That looks like this:

```json
{
  "type": "dialogue",
  "id": "main",
  "level": 1,
  "lines": [
    {
      "speaker": "Mike",
      "text": "Say... that's feeling pretty good!... whoo hoo!!! I'm free!"
    }
  ]
}
```

For the main in-character dialogue, it should look like the above. If you're adding dialogue that should go in the second chat window, where the out-of-character tech explanations go, that should have `"id": "tutorial", "level": 2` instead.

### Formatting Dialogue

Adding all the "speaker" and "text" lines yourself will make you go crazy. Here's the easier way.

1. Make a completely blank new window in VS Code.
2. Copy the speaker/text columns for however many lines you want to dump.
3. Open find-and-replace with CMD+F, and hit the carat to see the Replace part. Hit the ".*" in the upper right to switch to regex mode.
4. Copy the two lines below into the Find and Replace bits, respectively. If you did this right, every line in the speaker/text columns should highlight.
5. Press the little a-b arrow-down button to change every line you just pasted.
6. Get rid of the comma on the very last line (see the **Hot JSON Tip**, above).
7. Paste these lines into the `"lines"` block, above.

The regex lines you use to find/replace:
```
# Find:
(.*)	(.*)

# Replace:
{"speaker": "$1", "text": "$2"},
```

Your find/replace box should look like this:

![regex reference](/docs/regex.png)

If you need a reference for what it should look like, you can check any existing dialogue block. I always copy over the boilerplate from another scene first.

## No Dialogue?

Often, a scene needs to transition to adding a component (or something), but no dialogue should be included. In that case, use `"type": "animation"` on the scene. The "id" and "level" tags don't matter outside of dialogue. Like so:

```json
{
    "type": "animation",
    "components": [
      {
        "name": "bigbutton",
        "state": "start",
        "settings": {
          "text": "Zak: Remove head."
        }
      }
    ]
  },
```

## Adding Components

Components are what make this piece go! As seen above, you add components as a list, and each component is an object with a `name`, a `state`, and some `settings`.

* `name` is how we internally reference the component.
* `state` is either "start" or "stop". A component added with `"state": "start"` will persist until something tells it to stop.
* `settings` are specific to the component, and will get outlined for each individually.

### Components in Dialogue

Any component added at the top of a scene like the above example will start or stop the minute the scene is shown. But what if we want to make changes when a dialogue line is displayed?

It's the same process!

```json
"lines": [
  "...",
  {
    "speaker": "Becky",
    "text": "\"**version**\" is 4, because we’re using IPv4",
    "components": [
      {
        "name": "ipv4",
        "settings": {
          "highlight": [
            "version"
          ]
        }
      }
    ]
  },
  "..."
]
```

In this case, the ipv4 component doesn't have a "state" value, because it was started earlier in this scene. Its settings will change so that the "version" is highlighted when this line of text is displayed.

You can start or stop components on dialogue lines, same as in scenes.

### Path Freeze

Sometimes, you don't want someone to just be able to hit the space bar endlessly to keep progressing the story. You also don't want someone to be able to press the "Proceed" button in a conversation block and keep proceeding the story without any dialogue lines.

Components that freeze the state until they're interacted with are noted in their listing. Some components also have an optional freeze option.

### Going Out of Order

When you press proceed, you go forward one scene. But what about when you're dealing with scenes that have multiple options?

In that case, we need to give a scene a unique pathid so that we have somewhere to go back to. This matters mostly with the `hub` component, but here's an example of that:

```json
{
  "type": "animation",
  "pathid": "landing-whan",
  "components": [
    {
      "name": "hub",
      "state": "start",
      "settings": {
        "locations": [
          {
            "text": "up to local network",
            "img": "/images/email.gif",
            "to": "err-whan-1"
          },
          {
            "text": "up to local network",
            "img": "/images/email.gif",
            "to": "err-whan-2"
          }
        ]
      }
    },
    {
      "name": "error",
      "state": "stop"
    }
  ]
},
{
  "type": "error",
  "pathid": "err-whan-1",
  "components": [
    {
      "name": "error",
      "state": "start",
      "settings": {
        "title": "up to local network",
        "text": "You just came from there! We're not at our destination yet.",
        "to": "landing-whan"
      }
    }
  ]
},
{
  "type": "error",
  "pathid": "err-whan-2",
  "components": [
    {
      "name": "error",
      "state": "start",
      "settings": {
        "title": "up to local network",
        "text": "Oh shucks! Dead end",
        "to": "landing-whan"
      }
    }
  ]
},
```

Here, we have three scenes. The first is a hub, with a path id of `"landing-whan"` (for Whanganui). It has two locations in its settings, which go to scenes with pathids of `error-whan-1` and `error-whan-2`.

The two errors that follow it also have a `"to"` field, both of which redirect back to `"landing-whan"`. You can loop endlessly over the same three scenes before eventually continuing to the third location in the hub, which is not included here for brevity. Wow!

Also note that the scene with the hub in it also stops the "error" component. If you didn't do this, the error component would never stop displaying. It's fine to "stop" a component before it "start"s.