import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import _Vue from 'vue';

export default {
  install(Vue: typeof _Vue) {
    Vue.prototype.$dayjs = dayjs;
    dayjs.extend(isBetween);
    dayjs.extend(relativeTime);
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);
  },
};
