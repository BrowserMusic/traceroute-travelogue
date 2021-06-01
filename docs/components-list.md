# Components List

## `character`

`character` displays a character's icon on the left or right.

### example

```json
{
  "name": "character",
  "state": "start",
  "settings": {
    "name": "box",
    "align": "right"
  }
}
```

### settings
* `name`: the character's name. The list of possibilities is in `/src/data/characters.json, but your options are "box", "orb", and "mike" at the moment. 
* `align`: can be "left" or "right".

## `ipv4`

`ipv4` displays the IPv4 packet graphic.

### example

```json
{
  "name": "ipv4",
  "settings": {
    "highlight": [
      "source",
      "destination"
    ]
  }
}
```

### settings
* `highlight`: a list of all the blocks of the IPv4 packet, to change where the highlight is pointing. This always has to be a list of strings.

## `bigtext`

`bigtext` displays big text.

### example
```json
{
  "name": "bigtext",
  "state": "start",
  "settings": {
    "text": "what does it cost to use the internet?"
  }
}
```

### settings
* `text`: like it says on the can.

## `error`

`error` displays an error message that freezes the proceed button until it's clicked on. This are used almost exclusively with the `hub` component.

### example
```json
{
  "name": "error",
  "state": "start",
  "settings": {
    "title": "up to local network",
    "text": "You just came from there! We're not at our destination yet.",
    "to": "landing-whan"
  }
}
```

### settings
* `title`: title of the error message. currently not implemented.
* `text`: the text of the error message.
* `to`: what scene to go back to when you press OK. Make sure this is the `pathid` of the hub you're returning to.
