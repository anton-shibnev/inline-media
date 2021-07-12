# inline-media

loader for webpack

---

### simple example

```
.test {
  transform: ($mobile: scale(1) translate(10px), $desktop: scale(1.1));
  transition: ($mobile: color 2s, transform 1s, $tablet: none);
  font-size: ($mobile: 20px, $tablet: 40px);
}
```

compile to

```
.test {
  transform: scale(1) translate(10px);
  transition: color 2s, transform 1s;
  font-size: 20px;
}

@media only screen and (min-width: 768px) {
  .test {
    transition: none;
    font-size: 40px;
  }
}

@media only screen and (min-width: 1260px) {
  .test {
    transform: scale(1.1);
  }
}
```

---

### installation

you can install from npm

```
npm i inline-media -D
```

### webpack.config.js

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        loader: 'inline-media',
        options: {
          minMax: 'min',
          breakpoints: {
            mobile: 0,
            tablet: 768,
            desktop: 1260,
          },
        },
      },
    ],
  },
};
```
