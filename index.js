const fs = require('fs');

const BP_NAME = 'BREAKPOINTS';

// const getBreakpoints = (file) => {
//   const styleString = fs.readFileSync(`${file}.scss`).toString();
//   const regExpBetweenParentheses = /\((.*)\)/;
//   const regex = new RegExp(`${BP_NAME}: \((.*)\)`, 'g');
//   // const strBetween = styleString.match(regExpBetweenParentheses);
//   // console.log(styleString.match(regex));

//   // console.log(strBetween);
// };

// getBreakpoints('config');

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

const foo = () => {
  let styleString = fs.readFileSync(`style.scss`).toString();
  const rx = /(\w+[\-])*\w+\s?:\s\(.*\)/g;
  const media = `@media screen and (min-width: `;

  const result = styleString.replace(rx, (item) => {
    const rxProperty = /(\w+[\-])*\w+/;
    const property = item.match(rxProperty)[0];

    const rxValue = /\(([^)]+)\)/;
    const value = item.match(rxValue)[1];
    const valueArr = value.split(',');
    let replaceStr = '';

    valueArr.forEach((arrItem) => {
      const arr = arrItem.split(':');
      const name = arr[0].trim();
      const value = arr[1].trim();

      replaceStr += `${media}${BREAKPOINTS[name]}px) { ${property}: ${value} }`;
    });

    return replaceStr;
  });

  return result;
};

console.log(foo());
// foo();

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

    // list.map((item) => {
    //   item = item.trim().split(':');
    //   const name = item[0];
    //   const value = item[1].trim();

    //   obj[name] = value;
    // });

    // for (const key in obj) {
    //   if (Object.hasOwnProperty.call(obj, key)) {
    //     const value = obj[key];
    //     const styleProperty = this.styleProperty;

    //     this.resultString += `
    //       ${this.mediaStr}: ${this.breakPoints[key]}px) { ${styleProperty}: ${value} };
    //       `.trim();
    //   }
    // }

    return this.resultString;
  }
}

// const result = new InlineMedia(CONFIG).init();
// console.log(result);
