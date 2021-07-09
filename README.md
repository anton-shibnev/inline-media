# inline-media

loader for webpack

---

### simple example

```
h1 {
  color: (mobile: red, tablet: black);
}
```

compile to

```
h1 {
  color: red;

  @media only screen and (min-width: 768px) {
    color: black;
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
