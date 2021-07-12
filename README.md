# inline-media

loader for webpack

---

### simple example

```
.test {
  /transition/ {
    $mobile: color 2s, transform 1s;
    $tablet: none;
  }

  /font-size/ {
    $mobile: 20px;
    $tablet: 40px;
  }
}
```

compile to

```
.test {
  transition: color 2s, transform 1s;
  font-size: 20px;
}

@media only screen and (min-width: 768px) {
  .test {
    transition: none;
    font-size: 40px;
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
