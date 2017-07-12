;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-tel" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M957.479 235.438c4.507 30.91-4.439 74.421-6.53 82.529-75.417 324.677-292.821 547.021-611.669 624.347l-1.749 0.444-6.582 0.591c-30.857 7.073-77.881 8.38-91.807 8.602-89.539 1.479-157.844-62.423-172.178-158.698-3.688-24.765 0.32-64.88 0.32-64.88l212.894-129.489c19.469-11.868 43.599-12.362 62.972-1.27 30.241 17.289 55.156 42.577 71.991 73.101 3.056 5.532 9.981 9.279 16.265 5.903 102.256-54.789 185.5-138.5 245.746-239.080 2.99-4.992 0.607-13.508-4.609-16.403-22.963-12.747-41.405-33.567-55.922-55.823-12.618-19.335-13.383-45.644-2.070-66.323l122.171-224.109c0 0 25.411-2.734 31.82-2.833 94.491-1.579 175.136 68.75 188.935 163.389zM908.731 263.523l0.050-4.521c-0.1-5.484-0.569-11.092-1.331-16.588-9.639-69.119-68.911-120.359-137.921-119.213-0.443 0.012-0.887 0.025-1.355 0.037l-109.38 200.619c-2.366 4.337-2.441 9.71-0.025 13.359 10.597 16.29 24.744 30.414 40.864 40.838 15.798 10.216 26.372 26.742 28.961 45.287v0c1.944 14.010-0.74 27.874-7.789 40.099-63.216 109.799-155.074 199.167-265.636 258.415-30.092 16.156-67.036 4.595-84.139-26.298-12.274-22.304-30.464-40.763-52.645-53.421-3.45-1.983-8.181-1.737-12.027 0.617l-191.083 116.206c-0.025 1.763-0.049 3.537 0 5.31 0.148 7.492 0.714 14.837 1.724 22.009 9.833 70.624 57.401 115.566 121.136 114.517 26.567-0.444 62.23-2.674 82.738-7.628l1.772-0.444 6.459-0.591c298.438-73.014 501.942-281.681 573.122-587.749 1.923-6.789 5.792-32.631 6.506-40.863z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)