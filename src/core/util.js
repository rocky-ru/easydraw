/**
 * LOG
 * 180823 no svg renderer
 */

import {renderShapeToContext} from './canvasRenderer';

const slice  = Array.prototype.slice,
      slice1 = [].slice;

/**
 * MEMO
 * delete function:
 * addImageOnload
 */
const util = {

    last(array, m){
        if (n == null) {
            n = null;
          }
          if (n) {
            return slice.call(array, Math.max(array.length - n, 0));
          } else {
            return array[array.length - 1];
          }
    },
    classSet(classNameToIsPresent) {
        let classNames = [];
        for (let key in classNameToIsPresent) {
          if (classNameToIsPresent[key]) {
            classNames.push(key);
          }
        }
        return classNames.join(' ');
    },
    getBoundingRect(rects, width, height) {
        if (!rects.length) {
          return {
            x: 0,
            y: 0,
            width: 0 || width,
            height: 0 || height
          };
        }
        let minX = rects[0].x;
        let minY = rects[0].y;
        let maxX = rects[0].x + rects[0].width;
        let maxY = rects[0].y + rects[0].height;
        for (let i = 0, len = rects.length; i < len; i++) {
          let rect = rects[i];
          minX = Math.floor(Math.min(rect.x, minX));
          minY = Math.floor(Math.min(rect.y, minY));
          maxX = Math.ceil(Math.max(maxX, rect.x + rect.width));
          maxY = Math.ceil(Math.max(maxY, rect.y + rect.height));
        }
        minX = width ? 0 : minX;
        minY = height ? 0 : minY;
        maxX = width || maxX;
        maxY = height || maxY;
        return {
          x: minX,
          y: minY,
          width: maxX - minX,
          height: maxY - minY
        };
      },
      getGUID(){
          let s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
          return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;  
      }

}

export default util;
