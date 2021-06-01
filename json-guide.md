## Let's look at the JSON!

Here's how to the JSON works for this piece. It looks a little scary, but I promise that it's mostly just tedious.

I recommend that you get VS Code to do this. It checks JSON syntax so you can fix your errors quickly.

### Basics

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

Each 

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

### Adding Dialogue

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

To format the lines of dialogue:

1. Make a completely blank new window in VS Code.
2. Copy the speaker/text columns for however many lines you want to dump.
3. Open find-and-replace with CMD+F, and hit the carat to see the Replace part. Hit the ".*" in the upper right to switch to regex mode.
4. Copy the two lines below into the Find and Replace bits, respectively. If you did this right, every line in the speaker/text columns should highlight.
5. Press the little a-b arrow-down button to change every line you just pasted.
6. Get rid of the comma on the very last line (see the **Hot JSON Tip**, above).
7. Paste these lines into the `"lines"` block, above.

```
# Find:
(.*)	(.*)

# Replace:
{"speaker": "$1", "text": "$2"},
```

Your find/replace box should look like this:

![regex reference](/docs/regex.png)

