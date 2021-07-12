const loaderUtils = require('loader-utils');

class ValidString {
  constructor({ source, minMax, breakpoints }) {
    this.source = source;
    this.breakpoints = breakpoints;
    this.minMax = minMax;
  }

  init() {
    const rx = /(?<!\$)((\w+[\-])*\w+\:\s?\((.*))(?=\;)/g;
    const media = `@media only screen and (${this.minMax}-width: `;

    const result = this.source.replace(rx, (item) => {
      const rxProperty = /(?<!\$)((\w+[\-])*\w+)(?=()\:\s?\()/;
      const property = item.match(rxProperty)[0];

      const rxValue = /(?<=\()([^}]*)(?=\))/;
      const value = item.match(rxValue)[1];

      const rxSplitArr =
        /(?<=(\$))(\w+\:\s)(.*)(?=(\,\s\$))|(?<=(\$))(\w+\:\s)(.*)/g;
      const valueArr = value.match(rxSplitArr);
      let replaceStr = '';

      valueArr.forEach((arrItem) => {
        const arr = arrItem.split(':');
        const name = arr[0].trim();
        const value = arr[1].trim();
        const breakpointsValue = this.breakpoints[name];

        if (breakpointsValue === 0) {
          replaceStr += `${property}: ${value};`;
        } else {
          replaceStr += `${media}${breakpointsValue}px){${property}:${value}}`;
        }
      });

      return replaceStr;
    });

    return result;
  }
}

const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1920,
};

const DEFAULT_OPTIONS = {
  minMax: 'min',
  breakpoints: BREAKPOINTS,
};

module.exports = function (source) {
  const options = loaderUtils.getOptions(this);
  const minMax = !!options.minMax ? options.minMax : DEFAULT_OPTIONS.minMax;
  const breakpoints = !!options.breakpoints
    ? options.breakpoints
    : DEFAULT_OPTIONS.breakpoints;

  const validCode = new ValidString({
    source,
    minMax: minMax,
    breakpoints: breakpoints,
  }).init();

  return validCode;
};
