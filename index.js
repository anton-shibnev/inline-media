const fs = require('fs');

const BREAKPOINTS = {
  mobile: 320,
  tablet: 768,
  desktop: 1920,
};

const CONFIG = {
  styleFile: 'style',
  minMax: 'min',
  breakPoints: BREAKPOINTS,
};

class InlineMedia {
  constructor({ styleFile, minMax, breakPoints }) {
    this.minMax = minMax;
    this.breakPoints = breakPoints;

    this.styleFile = styleFile;
    this.styleString = fs.readFileSync(`${this.styleFile}.scss`).toString();

    this.mediaStr = `@media screen and (${this.minMax}-width`;

    this.regExpBefore = /\w+(?=: \()/;
    this.regExpBetweenParentheses = /\((.*)\)/;

    this.strBetween = this.styleString
      .match(this.regExpBetweenParentheses)
      .pop();
    this.styleProperty = this.styleString.match(this.regExpBefore).pop();

    this.resultString = '';
  }

  init() {
    const list = this.strBetween.split(',');
    const obj = {};

    list.map((item) => {
      item = item.trim().split(':');
      const name = item[0];
      const value = item[1].trim();

      obj[name] = value;
    });

    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        const styleProperty = this.styleProperty;

        this.resultString += `
          ${this.mediaStr}: ${this.breakPoints[key]}px) { ${styleProperty}: ${value} };
          `.trim();
      }
    }

    return this.resultString;
  }
}

const result = new InlineMedia(CONFIG).init();
console.log(result);
