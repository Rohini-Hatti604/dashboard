'use strict';

function _typeof(o) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o;
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o;
          }),
    _typeof(o)
  );
}
function _classCallCheck(a, n) {
  if (!(a instanceof n))
    throw new TypeError('Cannot call a class as a function');
}
function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    (o.enumerable = o.enumerable || !1),
      (o.configurable = !0),
      'value' in o && (o.writable = !0),
      Object.defineProperty(e, _toPropertyKey(o.key), o);
  }
}
function _createClass(e, r, t) {
  return (
    r && _defineProperties(e.prototype, r),
    t && _defineProperties(e, t),
    Object.defineProperty(e, 'prototype', { writable: !1 }),
    e
  );
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, 'string');
  return 'symbol' == _typeof(i) ? i : i + '';
}
function _toPrimitive(t, r) {
  if ('object' != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || 'default');
    if ('object' != _typeof(i)) return i;
    throw new TypeError('@@toPrimitive must return a primitive value.');
  }
  return ('string' === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
  return (
    (o = _getPrototypeOf(o)),
    _possibleConstructorReturn(
      t,
      _isNativeReflectConstruct()
        ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor)
        : o.apply(t, e),
    )
  );
}
function _possibleConstructorReturn(t, e) {
  if (e && ('object' == _typeof(e) || 'function' == typeof e)) return e;
  if (void 0 !== e)
    throw new TypeError(
      'Derived constructors may only return object or undefined',
    );
  return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
  if (void 0 === e)
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called",
    );
  return e;
}
function _inherits(t, e) {
  if ('function' != typeof e && null !== e)
    throw new TypeError('Super expression must either be null or a function');
  (t.prototype = Object.create(e && e.prototype, {
    constructor: { value: t, writable: !0, configurable: !0 },
  })),
    Object.defineProperty(t, 'prototype', { writable: !1 }),
    e && _setPrototypeOf(t, e);
}
function _wrapNativeSuper(t) {
  var r = 'function' == typeof Map ? new Map() : void 0;
  return (
    (_wrapNativeSuper = function _wrapNativeSuper(t) {
      if (null === t || !_isNativeFunction(t)) return t;
      if ('function' != typeof t)
        throw new TypeError(
          'Super expression must either be null or a function',
        );
      if (void 0 !== r) {
        if (r.has(t)) return r.get(t);
        r.set(t, Wrapper);
      }
      function Wrapper() {
        return _construct(t, arguments, _getPrototypeOf(this).constructor);
      }
      return (
        (Wrapper.prototype = Object.create(t.prototype, {
          constructor: {
            value: Wrapper,
            enumerable: !1,
            writable: !0,
            configurable: !0,
          },
        })),
        _setPrototypeOf(Wrapper, t)
      );
    }),
    _wrapNativeSuper(t)
  );
}
function _construct(t, e, r) {
  if (_isNativeReflectConstruct())
    return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && _setPrototypeOf(p, r.prototype), p;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(
      Reflect.construct(Boolean, [], function () {}),
    );
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf('[native code]');
  } catch (n) {
    return 'function' == typeof t;
  }
}
function _setPrototypeOf(t, e) {
  return (
    (_setPrototypeOf = Object.setPrototypeOf
      ? Object.setPrototypeOf.bind()
      : function (t, e) {
          return (t.__proto__ = e), t;
        }),
    _setPrototypeOf(t, e)
  );
}
function _getPrototypeOf(t) {
  return (
    (_getPrototypeOf = Object.setPrototypeOf
      ? Object.getPrototypeOf.bind()
      : function (t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        }),
    _getPrototypeOf(t)
  );
}
customElements.define(
  'compodoc-menu',
  /*#__PURE__*/ (function (_HTMLElement) {
    function _class() {
      var _this;
      _classCallCheck(this, _class);
      _this = _callSuper(this, _class);
      _this.isNormalMode = _this.getAttribute('mode') === 'normal';
      return _this;
    }
    _inherits(_class, _HTMLElement);
    return _createClass(_class, [
      {
        key: 'connectedCallback',
        value: function connectedCallback() {
          this.render(this.isNormalMode);
        },
      },
      {
        key: 'render',
        value: function render(isNormalMode) {
          var tp = lithtml.html(
            '\n        <nav>\n            <ul class="list">\n                <li class="title">\n                    <a href="index.html" data-type="index-link">@clean-start-dashboard/api documentation</a>\n                </li>\n\n                <li class="divider"></li>\n                '
              .concat(
                isNormalMode
                  ? '<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>'
                  : '',
                '\n                <li class="chapter">\n                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>\n                    <ul class="links">\n                        <li class="link">\n                            <a href="overview.html" data-type="chapter-link">\n                                <span class="icon ion-ios-keypad"></span>Overview\n                            </a>\n                        </li>\n                        <li class="link">\n                            <a href="index.html" data-type="chapter-link">\n                                <span class="icon ion-ios-paper"></span>README\n                            </a>\n                        </li>\n                                <li class="link">\n                                    <a href="dependencies.html" data-type="chapter-link">\n                                        <span class="icon ion-ios-list"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class="link">\n                                    <a href="properties.html" data-type="chapter-link">\n                                        <span class="icon ion-ios-apps"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class="chapter modules">\n                        <a data-type="chapter-link" href="modules.html">\n                            <div class="menu-toggler linked" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#modules-links"'
                  : 'data-bs-target="#xs-modules-links"',
                '>\n                                <span class="icon ion-ios-archive"></span>\n                                <span class="link-name">Modules</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                        </a>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"',
                '>\n                            <li class="link">\n                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                  : 'data-bs-target="#xs-controllers-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                  : 'id="xs-controllers-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                  : 'data-bs-target="#xs-injectables-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"'
                  : 'id="xs-injectables-links-module-AppModule-06d3842f81697d51a46deb59c6bb927048457df56690fec53f683b852db53b8e3e2fdff0f359804bccf1e079cf28538764f3326dc1a180d46f02b8204a740cba"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-AuthModule-4c22179a42261eea31a9ba7c5fb4e839c4ed99ad4456f12e5144bad100107411b59201d45436947de1d95a5461e265b16ce8d54d2d29d64202b087a489dc2d1c"'
                  : 'data-bs-target="#xs-controllers-links-module-AuthModule-4c22179a42261eea31a9ba7c5fb4e839c4ed99ad4456f12e5144bad100107411b59201d45436947de1d95a5461e265b16ce8d54d2d29d64202b087a489dc2d1c"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-AuthModule-4c22179a42261eea31a9ba7c5fb4e839c4ed99ad4456f12e5144bad100107411b59201d45436947de1d95a5461e265b16ce8d54d2d29d64202b087a489dc2d1c"'
                  : 'id="xs-controllers-links-module-AuthModule-4c22179a42261eea31a9ba7c5fb4e839c4ed99ad4456f12e5144bad100107411b59201d45436947de1d95a5461e265b16ce8d54d2d29d64202b087a489dc2d1c"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/CachingModule.html" data-type="entity-link" >CachingModule</a>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-CachingModule-d7ded87a0c4b9133dda3d3f5047f155b85a52e3307386157e9cc3f39fc60e3dd3f2d5ebeba723e47c4ac430124d87994bb6d1207b41638d0564d300825bb8187"'
                  : 'data-bs-target="#xs-injectables-links-module-CachingModule-d7ded87a0c4b9133dda3d3f5047f155b85a52e3307386157e9cc3f39fc60e3dd3f2d5ebeba723e47c4ac430124d87994bb6d1207b41638d0564d300825bb8187"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-CachingModule-d7ded87a0c4b9133dda3d3f5047f155b85a52e3307386157e9cc3f39fc60e3dd3f2d5ebeba723e47c4ac430124d87994bb6d1207b41638d0564d300825bb8187"'
                  : 'id="xs-injectables-links-module-CachingModule-d7ded87a0c4b9133dda3d3f5047f155b85a52e3307386157e9cc3f39fc60e3dd3f2d5ebeba723e47c4ac430124d87994bb6d1207b41638d0564d300825bb8187"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/CachingService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CachingService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/DashboardCategoryModule.html" data-type="entity-link" >DashboardCategoryModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                  : 'data-bs-target="#xs-controllers-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                  : 'id="xs-controllers-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/DashboardCategoryController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardCategoryController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                  : 'data-bs-target="#xs-injectables-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"'
                  : 'id="xs-injectables-links-module-DashboardCategoryModule-1f7a39207bb0772eeabe5b1675a571ec4582be1b540a319a2ee3b7d58d9f8d735726a6686ffa9b2501511aa0159b253b3aac6b0b3a2d259f83997d40c827db34"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/DashboardCategoryService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardCategoryService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/DashboardModule.html" data-type="entity-link" >DashboardModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                  : 'data-bs-target="#xs-controllers-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                  : 'id="xs-controllers-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/DashboardController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                  : 'data-bs-target="#xs-injectables-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"'
                  : 'id="xs-injectables-links-module-DashboardModule-4a103c0ce735f73e478e4b855e8fd42ad432e355dadca88f54438900e267f9143355f3fbc67fa2c69b5f04bf46d495cd705537da89d213c9efcc5be1edea1a10"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/DashboardService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/DashboardProfileModule.html" data-type="entity-link" >DashboardProfileModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                  : 'data-bs-target="#xs-controllers-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                  : 'id="xs-controllers-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/DashboardProfileController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardProfileController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                  : 'data-bs-target="#xs-injectables-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"'
                  : 'id="xs-injectables-links-module-DashboardProfileModule-81c27281d9e03e9aa9f4a00592f6847462b515e35fb6073cff6c9c29ebd301d9bfd5f92100fb9a8c29285dc60ae1b92f34c6ef934eb0fc8bf644245655f34c77"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/DashboardProfileService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardProfileService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/GrpcModule.html" data-type="entity-link" >GrpcModule</a>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-GrpcModule-afdfdffd884d57bd86a3ecb27ae5e5b0de960facfc5818fa34819eb955e48f19fc29fc166afc8ecb3e4f6aa6c2b4583353268efd1cf0d9e376764199e5dea642"'
                  : 'data-bs-target="#xs-injectables-links-module-GrpcModule-afdfdffd884d57bd86a3ecb27ae5e5b0de960facfc5818fa34819eb955e48f19fc29fc166afc8ecb3e4f6aa6c2b4583353268efd1cf0d9e376764199e5dea642"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-GrpcModule-afdfdffd884d57bd86a3ecb27ae5e5b0de960facfc5818fa34819eb955e48f19fc29fc166afc8ecb3e4f6aa6c2b4583353268efd1cf0d9e376764199e5dea642"'
                  : 'id="xs-injectables-links-module-GrpcModule-afdfdffd884d57bd86a3ecb27ae5e5b0de960facfc5818fa34819eb955e48f19fc29fc166afc8ecb3e4f6aa6c2b4583353268efd1cf0d9e376764199e5dea642"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/GrpcService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GrpcService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/OpenSearchModule.html" data-type="entity-link" >OpenSearchModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                  : 'data-bs-target="#xs-controllers-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                  : 'id="xs-controllers-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/OpenSearchController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenSearchController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                  : 'data-bs-target="#xs-injectables-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"'
                  : 'id="xs-injectables-links-module-OpenSearchModule-e896e58cd2da8199e0dc2126d8f46b275df7176dd1cc529399c1aac4e556526b4cdfc1643ab9a8e234f532188956123b49f4fc90c6b6dcfdf1944df913d2f3ba"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/OpenSearchClientProvider.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenSearchClientProvider</a>\n                                        </li>\n                                        <li class="link">\n                                            <a href="injectables/OpenSearchService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OpenSearchService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/RoleModule.html" data-type="entity-link" >RoleModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                  : 'data-bs-target="#xs-controllers-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                  : 'id="xs-controllers-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/RoleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                  : 'data-bs-target="#xs-injectables-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"'
                  : 'id="xs-injectables-links-module-RoleModule-6169f08e237309c02e557f03e8a2494946e7d97ed72fd60a4a4669b456b46c06bbd269a25240552c4571b389dc812b7f3e89dca171fe6c9b3e10c2155ac039a9"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/RoleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RoleService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/UserVariableModule.html" data-type="entity-link" >UserVariableModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                  : 'data-bs-target="#xs-controllers-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                  : 'id="xs-controllers-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/UserVariableController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserVariableController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                  : 'data-bs-target="#xs-injectables-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"'
                  : 'id="xs-injectables-links-module-UserVariableModule-8eced34513d127b7b05d74ff1e4971866d53ed179bc6cd95204e87372e5bb21a79a05c82d87b3fb482088d2929b3204088692fa012ff27b012ce85c082545a98"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/UserVariableService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserVariableService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class="link">\n                                <a href="modules/WidgetModule.html" data-type="entity-link" >WidgetModule</a>\n                                    <li class="chapter inner">\n                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                  : 'data-bs-target="#xs-controllers-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"',
                '>\n                                            <span class="icon ion-md-swap"></span>\n                                            <span>Controllers</span>\n                                            <span class="icon ion-ios-arrow-down"></span>\n                                        </div>\n                                        <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                  : 'id="xs-controllers-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"',
                '>\n                                            <li class="link">\n                                                <a href="controllers/WidgetController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetController</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class="chapter inner">\n                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                  : 'data-bs-target="#xs-injectables-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"',
                '>\n                                        <span class="icon ion-md-arrow-round-down"></span>\n                                        <span>Injectables</span>\n                                        <span class="icon ion-ios-arrow-down"></span>\n                                    </div>\n                                    <ul class="links collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"'
                  : 'id="xs-injectables-links-module-WidgetModule-c99d3bea3d95cad4d063864663056989e61e9159e113175a6f8d9713e55bb7337c453557585fdfda0675408f8b55d6abb58e5e8d578c70cf4a278caa03c57c36"',
                '>\n                                        <li class="link">\n                                            <a href="injectables/WidgetService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >WidgetService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                </ul>\n                </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#controllers-links"'
                  : 'data-bs-target="#xs-controllers-links"',
                '>\n                                <span class="icon ion-md-swap"></span>\n                                <span>Controllers</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " ',
              )
              .concat(
                isNormalMode
                  ? 'id="controllers-links"'
                  : 'id="xs-controllers-links"',
                '>\n                                <li class="link">\n                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/DashboardCategoryController.html" data-type="entity-link" >DashboardCategoryController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/DashboardController.html" data-type="entity-link" >DashboardController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/DashboardProfileController.html" data-type="entity-link" >DashboardProfileController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/OpenSearchController.html" data-type="entity-link" >OpenSearchController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/RoleController.html" data-type="entity-link" >RoleController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/UserVariableController.html" data-type="entity-link" >UserVariableController</a>\n                                </li>\n                                <li class="link">\n                                    <a href="controllers/WidgetController.html" data-type="entity-link" >WidgetController</a>\n                                </li>\n                            </ul>\n                        </li>\n                        <li class="chapter">\n                            <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#injectables-links"'
                  : 'data-bs-target="#xs-injectables-links"',
                '>\n                                <span class="icon ion-md-arrow-round-down"></span>\n                                <span>Injectables</span>\n                                <span class="icon ion-ios-arrow-down"></span>\n                            </div>\n                            <ul class="links collapse " ',
              )
              .concat(
                isNormalMode
                  ? 'id="injectables-links"'
                  : 'id="xs-injectables-links"',
                '>\n                                <li class="link">\n                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/CachingService.html" data-type="entity-link" >CachingService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/DashboardCategoryService.html" data-type="entity-link" >DashboardCategoryService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/DashboardProfileService.html" data-type="entity-link" >DashboardProfileService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/DashboardService.html" data-type="entity-link" >DashboardService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/GrpcService.html" data-type="entity-link" >GrpcService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/OpenSearchClientProvider.html" data-type="entity-link" >OpenSearchClientProvider</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/OpenSearchService.html" data-type="entity-link" >OpenSearchService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/RoleService.html" data-type="entity-link" >RoleService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/UserVariableService.html" data-type="entity-link" >UserVariableService</a>\n                                </li>\n                                <li class="link">\n                                    <a href="injectables/WidgetService.html" data-type="entity-link" >WidgetService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#guards-links"'
                  : 'data-bs-target="#xs-guards-links"',
                '>\n                            <span class="icon ion-ios-lock"></span>\n                            <span>Guards</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"',
                '>\n                            <li class="link">\n                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>\n                            </li>\n                            <li class="link">\n                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#interfaces-links"'
                  : 'data-bs-target="#xs-interfaces-links"',
                '>\n                            <span class="icon ion-md-information-circle-outline"></span>\n                            <span>Interfaces</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode
                  ? ' id="interfaces-links"'
                  : 'id="xs-interfaces-links"',
                '>\n                            <li class="link">\n                                <a href="interfaces/Aggregation.html" data-type="entity-link" >Aggregation</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IAddToFavouriteRequest.html" data-type="entity-link" >IAddToFavouriteRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IAggs.html" data-type="entity-link" >IAggs</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IAuthHeaders.html" data-type="entity-link" >IAuthHeaders</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ICreateDashboardCategoryRequest.html" data-type="entity-link" >ICreateDashboardCategoryRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ICreateDashboardRequest.html" data-type="entity-link" >ICreateDashboardRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ICreateRoleRequest.html" data-type="entity-link" >ICreateRoleRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ICreateUserVariableRequest.html" data-type="entity-link" >ICreateUserVariableRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ICreateWidgetRequest.html" data-type="entity-link" >ICreateWidgetRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetDashboard.html" data-type="entity-link" >IGetDashboard</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetDashboardCategory.html" data-type="entity-link" >IGetDashboardCategory</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetDashboardCategoryRequest.html" data-type="entity-link" >IGetDashboardCategoryRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetDashboardProfile.html" data-type="entity-link" >IGetDashboardProfile</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetDashboardRequest.html" data-type="entity-link" >IGetDashboardRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetQueryDataFilter.html" data-type="entity-link" >IGetQueryDataFilter</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetQueryDataRequest.html" data-type="entity-link" >IGetQueryDataRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetRole.html" data-type="entity-link" >IGetRole</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetRoleRequest.html" data-type="entity-link" >IGetRoleRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetUserVariable.html" data-type="entity-link" >IGetUserVariable</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetUserVariableRequest.html" data-type="entity-link" >IGetUserVariableRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetWidget.html" data-type="entity-link" >IGetWidget</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IGetWidgetRequest.html" data-type="entity-link" >IGetWidgetRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IListEntitiesRequest.html" data-type="entity-link" >IListEntitiesRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IListEntitiesResponse.html" data-type="entity-link" >IListEntitiesResponse</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/InterfaceResponse.html" data-type="entity-link" >InterfaceResponse</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/InterfaceService.html" data-type="entity-link" >InterfaceService</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ISearchQueryRequestPayload.html" data-type="entity-link" >ISearchQueryRequestPayload</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ISetDefaultDashbordRequest.html" data-type="entity-link" >ISetDefaultDashbordRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IUpdateDashboardCategoryRequest.html" data-type="entity-link" >IUpdateDashboardCategoryRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IUpdateDashboardRequest.html" data-type="entity-link" >IUpdateDashboardRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IUpdateRoleRequest.html" data-type="entity-link" >IUpdateRoleRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IUpdateUserVariableRequest.html" data-type="entity-link" >IUpdateUserVariableRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/IUpdateWidgetRequest.html" data-type="entity-link" >IUpdateWidgetRequest</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/MappingInput.html" data-type="entity-link" >MappingInput</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/Output.html" data-type="entity-link" >Output</a>\n                            </li>\n                            <li class="link">\n                                <a href="interfaces/ProcessNode.html" data-type="entity-link" >ProcessNode</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <div class="simple menu-toggler" data-bs-toggle="collapse" ',
              )
              .concat(
                isNormalMode
                  ? 'data-bs-target="#miscellaneous-links"'
                  : 'data-bs-target="#xs-miscellaneous-links"',
                '>\n                            <span class="icon ion-ios-cube"></span>\n                            <span>Miscellaneous</span>\n                            <span class="icon ion-ios-arrow-down"></span>\n                        </div>\n                        <ul class="links collapse " ',
              )
              .concat(
                isNormalMode
                  ? 'id="miscellaneous-links"'
                  : 'id="xs-miscellaneous-links"',
                '>\n                            <li class="link">\n                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>\n                            </li>\n                            <li class="link">\n                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>\n                            </li>\n                            <li class="link">\n                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class="chapter">\n                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>\n                    </li>\n                    <li class="divider"></li>\n                    <li class="copyright">\n                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">\n                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        ',
              ),
          );
          this.innerHTML = tp.strings;
        },
      },
    ]);
  })(/*#__PURE__*/ _wrapNativeSuper(HTMLElement)),
);
