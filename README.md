# universal-tilt.js

JavaScript & jQuery elements movement plugin based on:

**[Tilt.js](https://gijsroge.github.io/tilt.js/)** by **[Gijs Rogé](https://twitter.com/GijsRoge)** and **[vanilla-tilt.js](https://micku7zu.github.io/vanilla-tilt.js/index.html)** by **[Șandor Sergiu](https://github.com/micku7zu)**

**universal-tilt.js** contains additional functions for **mobile devices (having a gyroscope)** and new **Position Base option**

## How to use?
Place the following code in the .js file and customize the prameters:

**USE JAVASCRIPT:**

```
const tilts = document.querySelectorAll('.tilt');
const liveTilt = new UniversalTilt(tilts);
```

**OR JQUERY:**

```
$('.tilt').universalTilt();
```

## License
This project is licensed under the MIT License
