/**
 * LOG
 * 180823 no svg renderer
 */

import {renderShapeToContext} from 'canvasRenderer'
import {renderShapeToSVG} from 'svgRenderer'

const slice  = Array.prototype.slice,
      slice1 = [].slice;

/**
 * MEMO
 * delete function:
 * addImageOnload
 */
const util = {
    addImageOnload(img, fn){
      var oldOnload;
      oldOnload = img.onload;
      img.onload = function() {
        if (typeof oldOnload === "function") {
          oldOnload();
        }
        return fn();
      };
      return img;
    },
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
    // can not use
    matchElementSize: function(elementToMatch, elementsToResize, scale, callback) {
      var resize;
      if (callback == null) {
        callback = function() {};
      }
      resize = (function(_this) {
        return function() {
          var el, i, len;
          for (i = 0, len = elementsToResize.length; i < len; i++) {
            el = elementsToResize[i];
            el.style.width = elementToMatch.offsetWidth + "px";
            el.style.height = elementToMatch.offsetHeight + "px";
            if (el.width != null) {
              el.setAttribute('width', el.offsetWidth * scale);
              el.setAttribute('height', el.offsetHeight * scale);
            }
          }
          return callback();
        };
      })(this);
      elementToMatch.addEventListener('resize', resize);
      window.addEventListener('resize', resize);
      window.addEventListener('orientationchange', resize);
      resize();
      return resize;
    },
    // can not use
    combineCanvases: function() {
      var c, canvas, canvases, ctx, i, j, len, len1;
      canvases = 1 <= arguments.length ? slice1.call(arguments, 0) : [];
      c = document.createElement('canvas');
      c.width = canvases[0].width;
      c.height = canvases[0].height;
      for (i = 0, len = canvases.length; i < len; i++) {
        canvas = canvases[i];
        c.width = Math.max(canvas.width, c.width);
        c.height = Math.max(canvas.height, c.height);
      }
      ctx = c.getContext('2d');
      for (j = 0, len1 = canvases.length; j < len1; j++) {
        canvas = canvases[j];
        ctx.drawImage(canvas, 0, 0);
      }
      return c;
    },
    // can not use
    renderShapes: function(shapes, bounds, scale, canvas) {
      var ctx, i, len, shape;
      if (scale == null) {
        scale = 1;
      }
      if (canvas == null) {
        canvas = null;
      }
      canvas = canvas || document.createElement('canvas');
      canvas.width = bounds.width * scale;
      canvas.height = bounds.height * scale;
      ctx = canvas.getContext('2d');
      ctx.translate(-bounds.x * scale, -bounds.y * scale);
      ctx.scale(scale, scale);
      for (i = 0, len = shapes.length; i < len; i++) {
        shape = shapes[i];
        renderShapeToContext(ctx, shape);
      }
      return canvas;
    },
    // maybe useful
    renderShapesToSVG: function(shapes, arg, backgroundColor) {
      var height, width, x, y;
      x = arg.x, y = arg.y, width = arg.width, height = arg.height;
      return ("<svg xmlns='http://www.w3.org/2000/svg' width='" + width + "' height='" + height + "' viewBox='0 0 " + width + " " + height + "'> <rect width='" + width + "' height='" + height + "' x='0' y='0' fill='" + backgroundColor + "' /> <g transform='translate(" + (-x) + ", " + (-y) + ")'> " + (shapes.map(renderShapeToSVG).join('')) + " </g> </svg>").replace(/(\r\n|\n|\r)/gm, "");
    },
    // maybe useful
    getDefaultImageRect: function(shapeBoundingRects, explicitSize, margin) {
      var height, rect, width;
      if (explicitSize == null) {
        explicitSize = {
          width: 0,
          height: 0
        };
      }
      if (margin == null) {
        margin = {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        };
      }
      width = explicitSize.width, height = explicitSize.height;
      rect = util.getBoundingRect(shapeBoundingRects, width === 'infinite' ? 0 : width, height === 'infinite' ? 0 : height);
      rect.x -= margin.left;
      rect.y -= margin.top;
      rect.width += margin.left + margin.right;
      rect.height += margin.top + margin.bottom;
      return rect;
    },
    // maybe useful
    getBackingScale: function(context) {
      if (window.devicePixelRatio == null) {
        return 1;
      }
      if (!(window.devicePixelRatio > 1)) {
        return 1;
      }
      return window.devicePixelRatio;
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
    },
    // maybe useful 
    requestAnimationFrame: function(f) {
      if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(f);
      }
      if (window.webkitRequestAnimationFrame) {
        return window.webkitRequestAnimationFrame(f);
      }
      if (window.mozRequestAnimationFrame) {
        return window.mozRequestAnimationFrame(f);
      }
      return setTimeout(f, 0);
    },
    // maybe useful
    cancelAnimationFrame: function(f) {
      if (window.cancelAnimationFrame) {
        return window.cancelAnimationFrame(f);
      }
      if (window.webkitCancelRequestAnimationFrame) {
        return window.webkitCancelRequestAnimationFrame(f);
      }
      if (window.webkitCancelAnimationFrame) {
        return window.webkitCancelAnimationFrame(f);
      }
      if (window.mozCancelAnimationFrame) {
        return window.mozCancelAnimationFrame(f);
      }
      return clearTimeout(f);
    }

}

export default util;
