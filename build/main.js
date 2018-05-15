require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 94);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

module.exports = require("mongoose");

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_local__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport_local___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport_local__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jsonwebtoken__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__facebook__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__errors_AppError__ = __webpack_require__(4);
/* harmony export (immutable) */ exports["c"] = authenticate;
/* harmony export (immutable) */ exports["d"] = authenticateFacebook;
/* harmony export (immutable) */ exports["a"] = authorize;
/* harmony export (immutable) */ exports["b"] = generateJWT;








var FacebookStrategy = __webpack_require__(90).Strategy;
var JwtStrategy = __webpack_require__(20).Strategy;
var ExtractJwt = __webpack_require__(20).ExtractJwt;
var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'si-pula-ne'

  /*
   * Local Strategy
   */
};__WEBPACK_IMPORTED_MODULE_0_koa_passport___default.a.use(new __WEBPACK_IMPORTED_MODULE_1_passport_local___default.a({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, function (email, password, done) {

  __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* default */].authenticate(email, password).then(function (user) {
    return done(null, user);
  }).catch(function (err) {
    return done(err, false);
  });
}));

/*
 * JWT Strategy
 */
__WEBPACK_IMPORTED_MODULE_0_koa_passport___default.a.use(new JwtStrategy(jwtOptions, function (payload, done) {

  __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* default */].getProfile(payload.id).then(function (profile) {
    return done(null, profile);
  }).catch(function (err) {
    return done(err, false);
  });
}));

/**
 * Facebook Strategy
 * https://github.com/wahyudibo/koa-passport-facebook-example
 */
__WEBPACK_IMPORTED_MODULE_0_koa_passport___default.a.use(new FacebookStrategy({
  clientID: __WEBPACK_IMPORTED_MODULE_4__facebook__["a" /* default */].clientId,
  clientSecret: __WEBPACK_IMPORTED_MODULE_4__facebook__["a" /* default */].clientSecret,
  callbackURL: __WEBPACK_IMPORTED_MODULE_4__facebook__["a" /* default */].callbackUrl,
  profileFields: __WEBPACK_IMPORTED_MODULE_4__facebook__["a" /* default */].profileFields
}, function (accessToken, refreshToken, profile, done) {
  return done(null, profile);
}));

/*
 * Authenticate middleware Helper.
 */
function authenticate(ctx, next) {
  return function (ctx, next) {

    return __WEBPACK_IMPORTED_MODULE_0_koa_passport___default.a.authenticate('local', function (err, user) {
      if (err) throw err;

      var payload = {
        id: user._id,
        email: user.email
      };
      var token = __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign(payload, jwtOptions.secretOrKey);

      ctx.body = { user: user.displayName, token: token };
    })(ctx, next);
  };
}

/**
 * Authenticate facebook middleware helper
 */
function authenticateFacebook(ctx, next) {
  return function (ctx, next) {

    return __WEBPACK_IMPORTED_MODULE_0_koa_passport___default.a.authenticate('facebook', {
      session: false,
      failureRedirect: '/api' // @TODO change failure redirect
    }, function (err, user) {
      if (err) throw err;

      return __WEBPACK_IMPORTED_MODULE_3__services_user__["a" /* default */].authFacebook(user) // register or update facebook profile
      .then(function (profile) {

        var payload = {
          id: profile._id, // facebook ID or bd ID?
          email: profile.email
        };
        var token = __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign(payload, jwtOptions.secretOrKey);

        ctx.body = { token: token };
      }).catch(function (err) {
        throw err;
      });
    })(ctx, next);
  };
}

/*
 * Authorization middleware Helper.
 */
function authorize() {
  return function (ctx, next) {
    return __WEBPACK_IMPORTED_MODULE_0_koa_passport___default.a.authenticate('jwt', function (err, user) {

      if (err) throw err;
      if (!user) throw new __WEBPACK_IMPORTED_MODULE_5__errors_AppError__["a" /* default */]('Unauthorized', 401);

      ctx.user = user;

      return next();
    })(ctx, next);
  };
}

/**
 * Generate JWT token
 */
function generateJWT(user) {
  var payload = {
    id: user.id,
    email: user.email
  };
  var token = __WEBPACK_IMPORTED_MODULE_2_jsonwebtoken___default.a.sign(payload, jwtOptions.secretOrKey);

  return token;
}

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("koa-router");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_roles__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_roles___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_roles__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_AppError__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_order__ = __webpack_require__(16);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }





var roles = new __WEBPACK_IMPORTED_MODULE_1_koa_roles___default.a({
  failureHandler: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, action) {
      return __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              throw new __WEBPACK_IMPORTED_MODULE_2__errors_AppError__["a" /* default */]('Access Denied - You don\'t have permission to: ' + action, 403);

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function failureHandler(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return failureHandler;
  }()
});

// anonymous users can only access the home page
// returning false stops any more rules from being
// considered
roles.use(function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, action) {
    return __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log('access public middleware', ctx.user);
            return _context2.abrupt('return', ctx.user || action === 'access public routes');

          case 2:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// Can access order :id
roles.use('access order', function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3(ctx) {
    var isOwner;
    return __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return __WEBPACK_IMPORTED_MODULE_3__services_order__["a" /* default */].isOwner(ctx.params.id, ctx.user.id);

          case 2:
            isOwner = _context3.sent;

            if (!isOwner) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt('return', true);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  }));

  return function (_x5) {
    return _ref3.apply(this, arguments);
  };
}());

// Can access admin role
roles.use('access admin', function (ctx) {
  if (ctx.user.role === 'admin') return true;
});

// moderator users can access private page, but
// they might not be the only ones so we don't return
// false if the user isn't a moderator
roles.use('access private page', function (ctx) {
  if (ctx.user.role === 'moderator') {
    return true;
  }
});

//admin users can access all pages
roles.use(function (ctx, action) {
  if (ctx.user.role === 'admin') {
    return true;
  }
});

/* harmony default export */ exports["a"] = roles;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// https://gist.github.com/slavafomin/b164e3e710a6fc9352c934b9073e7216
var AppError = function (_Error) {
  _inherits(AppError, _Error);

  function AppError(message, status) {
    _classCallCheck(this, AppError);

    // Saving class name in the property of our custom error as a shortcut.
    var _this = _possibleConstructorReturn(this, (AppError.__proto__ || Object.getPrototypeOf(AppError)).call(this, message));

    // Calling parent constructor of base Error class.


    _this.name = _this.constructor.name;

    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(_this, _this.constructor);

    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    _this.status = status || 500;
    return _this;
  }

  return AppError;
}(Error);

/* harmony default export */ exports["a"] = AppError;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return getMenuItemPrice; });
/* harmony export (binding) */ __webpack_require__.d(exports, "e", function() { return getOptionPrice; });
/* unused harmony export getTotalPrice */
/* harmony export (binding) */ __webpack_require__.d(exports, "c", function() { return getOptionGroupById; });
/* harmony export (binding) */ __webpack_require__.d(exports, "d", function() { return getOptionById; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return getDiscountPrice; });
/*
 * Get MenuItem price by size name
 */
var getMenuItemPrice = function getMenuItemPrice(menuItem, size) {
  var price = 0;

  if (!menuItem) return 0;
  if (!Array.isArray(menuItem.prices)) return 0;

  // Return price if has only one Size
  if (menuItem.prices.length === 1) return menuItem.prices[0].price;

  menuItem.prices.forEach(function (priceObj) {
    if (priceObj.name === size) {
      price = priceObj.price;
    }
  });
  return price;
};

/*
 * Get Option price of MenuItem
 */
var getOptionPrice = function getOptionPrice(menuItem, groupId, optionId, size) {
  var price = 0;

  if (!menuItem) return 0;
  if (!Array.isArray(menuItem.optionGroups)) return 0;

  menuItem.optionGroups.forEach(function (optionGroup) {
    if (optionGroup._id.toString() !== groupId) return;

    optionGroup.options.forEach(function (option) {
      if (option._id.toString() !== optionId) return;

      // Get price for specific size
      if (size) {
        price = _getOptionPriceBySizeName(menuItem, option.prices, size);
      } else {
        price = option.prices[0];
      }
    });
  });
  return price;
};

/*
 * Get LineItems total price
 */
var getTotalPrice = function getTotalPrice(lineItems) {
  var total = 0;

  lineItems.forEach(function (lineItem) {
    var extraTotal = 0;

    if (!Array.isArray(lineItem.optionGroups)) return 0;

    lineItem.optionGroups.forEach(function (group) {
      group.options.forEach(function (option) {
        var price = getOptionPrice(lineItem.menuItem, group.id, option.id, lineItem.size) * option.quantity;
        extraTotal += price;
      });
    });

    total += (extraTotal + getMenuItemPrice(lineItem.menuItem, lineItem.size)) * lineItem.quantity;
  });

  return total;
};

/*
 * Get OptionGroup ref by optionGroupId
 */
var getOptionGroupById = function getOptionGroupById(menuItem, optionGroupId) {
  var groupRef = null;

  if (!Array.isArray(menuItem.optionGroups)) return null;

  menuItem.optionGroups.forEach(function (optionGroup) {
    if (optionGroup._id.toString() === optionGroupId) {
      groupRef = optionGroup;
    }
  });

  return groupRef;
};

/*
 * Get Option ref by optionId
 */
var getOptionById = function getOptionById(menuItem, optionGroupId, optionId) {
  var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  var optionRef = null;

  if (!Array.isArray(menuItem.optionGroups)) return null;

  menuItem.optionGroups.forEach(function (optionGroup) {

    // Each OptionGroups
    if (optionGroup._id.toString() === optionGroupId) {

      // Each Options
      optionGroup.options.forEach(function (option) {
        if (option._id.toString() === optionId) {
          var price = _getOptionPriceBySizeName(menuItem, option.prices, size);

          optionRef = option;
          optionRef.price = price;
          delete optionRef.prices;
        }
      });
    }
  });

  return optionRef;
};

/**
 * Get discount price by Total and Coupon
 */
var getDiscountPrice = function getDiscountPrice(total, coupon) {
  var discountPrice = 0;
  var dicountType = coupon && coupon.discountType;

  if (dicountType === 'number') {
    discountPrice = total - coupon.discount;
  } else if (dicountType === 'percent') {
    discountPrice = total - total / (100 / coupon.discount);
  } else {
    discountPrice = total;
  }
  return discountPrice;
};

/*
 * Get option price by MenuItem size name
 */
var _getOptionPriceBySizeName = function _getOptionPriceBySizeName(menuItem, optionPrices, size) {
  var itemPrice = 0;
  var priceIndex = 0;

  menuItem.prices.forEach(function (price, index) {
    if (price.name === size) {
      priceIndex = index;
    }
  });

  return optionPrices[priceIndex] || optionPrices[0];
};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(92);


/***/ },
/* 7 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 8 */
/***/ function(module, exports) {

module.exports = require("dotenv/config");

/***/ },
/* 9 */
/***/ function(module, exports) {

module.exports = require("koa-passport");

/***/ },
/* 10 */
/***/ function(module, exports) {

module.exports = require("path");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_profile__ = __webpack_require__(81);
/* harmony export (immutable) */ exports["c"] = registerUser;
/* harmony export (immutable) */ exports["a"] = getProfile;
/* harmony export (immutable) */ exports["b"] = updateProfile;


function registerUser(ctx) {
  var user = ctx.request.body;

  // return ctx.body = user

  return __WEBPACK_IMPORTED_MODULE_0__services_profile__["a" /* default */].registerUser(user).then(function (user) {
    return ctx.body = user;
  });
}

function getProfile(ctx) {
  var id = ctx.user.id;

  return __WEBPACK_IMPORTED_MODULE_0__services_profile__["a" /* default */].getProfile(id).then(function (user) {
    return ctx.body = user;
  });
}

function updateProfile(ctx) {
  var id = ctx.user.id;
  var body = ctx.request.body;

  return __WEBPACK_IMPORTED_MODULE_0__services_profile__["a" /* default */].updateProfile(id, body).then(function (user) {
    return ctx.body = user;
  });
}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methods_category__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validate_category__ = __webpack_require__(61);





var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String }
}, { versionKey: false });

/*
 * Plugins
 */
CategorySchema.plugin(__WEBPACK_IMPORTED_MODULE_1__methods_category__["a" /* default */]); // schema methods
CategorySchema.plugin(__WEBPACK_IMPORTED_MODULE_2__validate_category__["a" /* default */]); // schema validation

/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Category', CategorySchema);

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_MenuItemPrice__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_OptionGroup__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__methods_menuItem__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validate_menuItem__ = __webpack_require__(63);







var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var MenuItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  prices: [__WEBPACK_IMPORTED_MODULE_1__types_MenuItemPrice__["a" /* default */]],
  weight: Number, // in gramms

  // featuredImage: String,
  featuredImageKey: String,
  images: [String],
  isFeatured: Boolean,

  optionGroups: [__WEBPACK_IMPORTED_MODULE_2__types_OptionGroup__["a" /* default */]],
  pizzaGroups: [],

  category: { type: ObjectId, ref: 'Category' }
}, { versionKey: false, timestamps: true, toJSON: { virtuals: true } });

/**
 * Virtuals
 */
MenuItemSchema.virtual('featuredImageURL').get(function () {
  var AWS_BUCKET = process.env.AWS_BUCKET;
  var AWS_REGION = process.env.AWS_REGION;
  if (this.featuredImageKey) {
    return 'http://' + AWS_BUCKET + '.s3-website.' + AWS_REGION + '.amazonaws.com/' + this.featuredImageKey;
  }
  return null;
});

MenuItemSchema.virtual('featuredImageSquare').get(function () {
  var AWS_BUCKET = process.env.AWS_BUCKET;
  var AWS_REGION = process.env.AWS_REGION;
  var size = '75x75';
  if (this.featuredImageKey) {
    return 'http://' + AWS_BUCKET + '.s3-website.' + AWS_REGION + '.amazonaws.com/' + size + '/' + this.featuredImageKey;
  }
  return null;
});

/*
 * Plugins
 */
MenuItemSchema.plugin(__WEBPACK_IMPORTED_MODULE_3__methods_menuItem__["a" /* default */]); // schema methods
MenuItemSchema.plugin(__WEBPACK_IMPORTED_MODULE_4__validate_menuItem__["a" /* default */]); // schema validation

/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('MenuItem', MenuItemSchema);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_transformID__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__types_UserShipAddress__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__methods_user__ = __webpack_require__(51);






var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var defaultShipAddress = {
  firstName: '',
  lastName: '',
  street: '',
  streetNumber: '',
  entrance: '',
  level: '',
  apartment: '',
  entranceCode: ''
};

var UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: { type: String },

  passwordHash: String,
  salt: String,

  shipAddress: { type: __WEBPACK_IMPORTED_MODULE_2__types_UserShipAddress__["a" /* default */], default: defaultShipAddress },

  provider: String,
  role: { type: String, default: 'user' }
}, { versionKey: false, toJSON: { transform: __WEBPACK_IMPORTED_MODULE_1__util_transformID__["a" /* default */] } });

/*
 * Plugins
 */
UserSchema.plugin(__WEBPACK_IMPORTED_MODULE_3__methods_user__["a" /* default */]); // schema methods

/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('User', UserSchema);

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_joi__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_joi___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_joi__);


/* harmony default export */ exports["a"] = {
  update: {
    body: {
      firstName: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
      lastName: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
      phone: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
      shipAddress: {
        street: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
        streetNumber: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
        entrance: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
        level: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
        apartment: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
        entranceCode: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow('')
      }
    }
  },
  create: {
    body: {
      firstName: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
      lastName: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
      phone: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().allow(''),
      email: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().email().required(),
      password: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  login: {
    body: {
      email: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().email().required(),
      password: __WEBPACK_IMPORTED_MODULE_0_joi___default.a.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  }
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Order__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_AppError__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = {
  getOrders: function getOrders(_ref) {
    var user = _ref.user;

    // { order, orderby, page, per_page }
    var params = {};
    if (user) params.user = user;

    return __WEBPACK_IMPORTED_MODULE_0__models_Order__["a" /* default */].getOrders(params);
  },
  createOrder: function createOrder(payload) {
    return new __WEBPACK_IMPORTED_MODULE_0__models_Order__["a" /* default */](payload).save();
  },
  getOrder: function getOrder(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Order__["a" /* default */].getOrder(id).then(function (order) {
      if (!order) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return order;
    });
  },
  updateOrder: function updateOrder(id, payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Order__["a" /* default */].updateOrder(id, payload).then(function (order) {
      if (!order) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return order;
    });
  },
  removeOrder: function removeOrder(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Order__["a" /* default */].findByIdAndRemove(id).exec().then(function (order) {
      if (!order) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return order;
    });
  },
  isOwner: function isOwner(orderId, userId) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Order__["a" /* default */].findOne({ _id: orderId, user: userId }).exec().then(function (order) {
      if (order) return true;
      return false;
    });
  }
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_User__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_AppError__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = {
  getUsers: function getUsers(_ref) {
    var page = _ref.page,
        perPage = _ref.perPage;

    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].find({}).exec();
  },
  createUser: function createUser(payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].create(payload);
  },
  getUser: function getUser(id) {
    console.log('getUser', id);
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findById(id).exec().then(function (res) {
      console.log('user', res);
      if (!res) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return res;
    });
  },
  updateUser: function updateUser(id, payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findByIdAndUpdate(id, payload).exec().then(function (res) {
      if (!res) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return res;
    });
  },
  deleteUser: function deleteUser(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findByIdAndRemove(id).then(function (res) {
      if (!res) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return res;
    });
  },
  authFacebook: function authFacebook(profile) {
    var email = profile.emails[0].value;
    var displayName = profile.displayName.split(' ');
    var firstName = displayName[0];
    var lastName = displayName[1];

    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findOne({ email: email }).exec().then(function (user) {
      if (user) {
        // If user exists, update profile
        return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findOneAndUpdate({ email: email }, { firstName: firstName, lastName: lastName }, { new: true }).exec();
      } else {
        // If user with this email not found, then register
        return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].create({ email: email, firstName: firstName, lastName: lastName });
      }
    });
  },
  authenticate: function authenticate(email, password) {
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findOne({ email: email }).exec().then(function (user) {
      if (user && user.checkPassword(password)) {
        return user;
      } else {
        throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('User not found or incorect password', 400);
      }
    });
  },
  getProfile: function getProfile(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findById(id).select(['_id', 'email', 'role']).exec().then(function (user) {
      if (user) {
        return {
          id: user._id,
          email: user.email,
          role: user.role
        };
      } else {
        throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('This user was disabled by admin', 400);
      }
    });
  }
};

/***/ },
/* 18 */
/***/ function(module, exports) {

module.exports = require("koa-joi-validate");

/***/ },
/* 19 */
/***/ function(module, exports) {

module.exports = require("passport");

/***/ },
/* 20 */
/***/ function(module, exports) {

module.exports = require("passport-jwt");

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(8);

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Yummy dashboard',
    meta: [{ charset: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { hid: 'description', name: 'description', content: 'Nuxt.js project' }],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }, { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/style/app.styl', 'mdi/css/materialdesignicons.min.css'],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    extend: function extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  },
  plugins: ['~/plugins/vuetify.js', '~/plugins/axios.js'],
  /*
   * Nuxt modules
   */
  modules: ['@nuxtjs/axios'],
  /*
   * Env
   */
  env: {
    baseURL: process.env.BASE_URL,
    apiURL: process.env.BASE_URL + '/api'
  }
};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Promise = Promise;
__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.set('debug', true);

__WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connect(process.env.MONGODB_URI);
console.log('DB', process.env.MONGODB_URI);

var db = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.connection;
db.on('error', console.error.bind(console, 'connection error:'));

/* harmony default export */ exports["a"] = db;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__category__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__order__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__coupon__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__upload__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__storage__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__options__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__dummy__ = __webpack_require__(69);












/* harmony default export */ exports["a"] = function (app) {
  var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  app.use(__WEBPACK_IMPORTED_MODULE_0__menu__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_1__category__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_2__order__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_3__coupon__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_4__auth__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_5__user__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_6__profile__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_7__upload__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_8__storage__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_9__options__["a" /* default */].prefix(prefix).routes());
  app.use(__WEBPACK_IMPORTED_MODULE_10__dummy__["a" /* default */].prefix(prefix).routes());
};

/***/ },
/* 24 */
/***/ function(module, exports) {

module.exports = require("http");

/***/ },
/* 25 */
/***/ function(module, exports) {

module.exports = require("https");

/***/ },
/* 26 */
/***/ function(module, exports) {

module.exports = require("koa");

/***/ },
/* 27 */
/***/ function(module, exports) {

module.exports = require("koa-body");

/***/ },
/* 28 */
/***/ function(module, exports) {

module.exports = require("koa-force-ssl");

/***/ },
/* 29 */
/***/ function(module, exports) {

module.exports = require("koa-mount");

/***/ },
/* 30 */
/***/ function(module, exports) {

module.exports = require("koa-static");

/***/ },
/* 31 */
/***/ function(module, exports) {

module.exports = require("koa2-cors");

/***/ },
/* 32 */
/***/ function(module, exports) {

module.exports = require("nuxt");

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/**
 * Manual facebook login flow
 * https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow
 * http://localhost:3000/api/auth/facebook
 */

/* harmony default export */ exports["a"] = {
  clientId: '1655272257894090',
  clientSecret: '7971deaa031f28a9bffa5dba9e2d9bff',
  callbackUrl: 'https://localhost/api/auth/facebook/callback',
  profileFields: ['id', 'displayName', 'photos', 'email']
};

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_category__ = __webpack_require__(77);
/* harmony export (immutable) */ exports["a"] = getCategories;
/* harmony export (immutable) */ exports["b"] = createCategory;
/* harmony export (immutable) */ exports["c"] = getCategory;
/* harmony export (immutable) */ exports["d"] = updateCategory;
/* harmony export (immutable) */ exports["e"] = removeCategory;


function getCategories(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_category__["a" /* default */].getCategories().then(function (categories) {
    return ctx.body = categories;
  });
}

function createCategory(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_category__["a" /* default */].createCategory(ctx.request.body).then(function (category) {
    return ctx.body = category;
  });
}

function getCategory(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_category__["a" /* default */].getCategory(ctx.params.id).then(function (category) {
    return ctx.body = category;
  });
}

function updateCategory(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_category__["a" /* default */].updateCategory(ctx.params.id, ctx.request.body).then(function (res) {
    return ctx.body = res;
  });
}

function removeCategory(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_category__["a" /* default */].removeCategory(ctx.params.id).then(function (res) {
    return ctx.body = res;
  });
}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_coupon__ = __webpack_require__(78);
/* harmony export (immutable) */ exports["a"] = getCoupons;
/* harmony export (immutable) */ exports["b"] = createCoupon;
/* harmony export (immutable) */ exports["c"] = getCoupon;
/* harmony export (immutable) */ exports["d"] = updateCoupon;
/* harmony export (immutable) */ exports["e"] = removeCoupon;


function getCoupons(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_coupon__["a" /* default */].getCoupons().then(function (coupons) {
    return ctx.body = coupons;
  });
}

function createCoupon(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_coupon__["a" /* default */].createCoupon(ctx.request.body).then(function (coupon) {
    return ctx.body = coupon;
  });
}

function getCoupon(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_coupon__["a" /* default */].getCoupon(ctx.params.id).then(function (coupon) {
    return ctx.body = coupon;
  });
}

function updateCoupon(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_coupon__["a" /* default */].updateCoupon(ctx.params.id, ctx.request.body).then(function (res) {
    return ctx.body = res;
  });
}

function removeCoupon(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_coupon__["a" /* default */].removeCoupon(ctx.params.id).then(function (res) {
    return ctx.body = res;
  });
}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_menuItem__ = __webpack_require__(79);
/* harmony export (immutable) */ exports["a"] = getMenuItems;
/* harmony export (immutable) */ exports["b"] = createMenuItem;
/* harmony export (immutable) */ exports["c"] = getMenuItem;
/* harmony export (immutable) */ exports["d"] = updateMenuItem;
/* harmony export (immutable) */ exports["e"] = removeMenuItem;


function getMenuItems(ctx, next) {
  var category = ctx.query.category;

  return __WEBPACK_IMPORTED_MODULE_0__services_menuItem__["a" /* default */].getMenuItems({ category: category }).then(function (menuItems) {
    return ctx.body = menuItems;
  });
}

function createMenuItem(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_menuItem__["a" /* default */].createMenuItem(ctx.request.body).then(function (menuItem) {
    return ctx.body = menuItem;
  });
}

function getMenuItem(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_menuItem__["a" /* default */].getMenuItem(ctx.params.id).then(function (menuItem) {
    return ctx.body = menuItem;
  });
}

function updateMenuItem(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_menuItem__["a" /* default */].updateMenuItem(ctx.params.id, ctx.request.body).then(function (res) {
    return ctx.body = res;
  });
}

function removeMenuItem(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_menuItem__["a" /* default */].removeMenuItem(ctx.params.id).then(function (res) {
    return ctx.body = res;
  });
}

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_options__ = __webpack_require__(80);
/* harmony export (immutable) */ exports["a"] = getOptions;
/* harmony export (immutable) */ exports["b"] = saveOptions;


function getOptions(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_options__["a" /* default */].getOptions().then(function (options) {
    return ctx.body = options;
  });
}

function saveOptions(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_options__["a" /* default */].saveOptions(ctx.request.body).then(function (res) {
    return ctx.body = res;
  });
}

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_order__ = __webpack_require__(16);
/* harmony export (immutable) */ exports["a"] = getOrders;
/* harmony export (immutable) */ exports["b"] = createOrder;
/* harmony export (immutable) */ exports["c"] = getOrder;
/* harmony export (immutable) */ exports["d"] = updateOrder;
/* harmony export (immutable) */ exports["e"] = removeOrder;


function getOrders(ctx, next) {
  // If is admin return all orders
  var user = ctx.user.role === 'admin' ? null : ctx.user.id;

  return __WEBPACK_IMPORTED_MODULE_0__services_order__["a" /* default */].getOrders({ user: user }).then(function (orders) {
    return ctx.body = orders;
  });
}

function createOrder(ctx, next) {
  var user = ctx.user.id;
  var body = Object.assign({}, ctx.request.body, { user: user });

  return __WEBPACK_IMPORTED_MODULE_0__services_order__["a" /* default */].createOrder(body).then(function (order) {
    return ctx.body = order;
  });
}

function getOrder(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_order__["a" /* default */].getOrder(ctx.params.id).then(function (order) {
    return ctx.body = order;
  });
}

function updateOrder(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_order__["a" /* default */].updateOrder(ctx.params.id, ctx.request.body).then(function (res) {
    return ctx.body = res;
  });
}

function removeOrder(ctx, next) {
  return __WEBPACK_IMPORTED_MODULE_0__services_order__["a" /* default */].removeOrder(ctx.params.id).then(function (res) {
    return ctx.body = res;
  });
}

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_uuid___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_uuid__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_storage__ = __webpack_require__(82);
/* harmony export (immutable) */ exports["a"] = uploadImage;




function uploadImage(ctx, next) {
  var file = ctx.request.body.files && ctx.request.body.files.image || '';
  var fileName = __WEBPACK_IMPORTED_MODULE_0_uuid___default()();

  return __WEBPACK_IMPORTED_MODULE_1__services_storage__["a" /* default */].uploadImage(file, fileName).then(function (res) {
    return ctx.body = res;
  });
}

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_upload__ = __webpack_require__(83);
/* harmony export (immutable) */ exports["a"] = uploadFeaturedImage;


function uploadFeaturedImage(ctx, next) {
  var file = ctx.request.body.files.image;
  var newFileName = Date.now() + '.jpg';

  return __WEBPACK_IMPORTED_MODULE_0__services_upload__["a" /* default */].uploadImage(file, newFileName).then(function (res) {
    ctx.body = res;
  });
}

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_user__ = __webpack_require__(17);
/* harmony export (immutable) */ exports["a"] = getUsers;
/* harmony export (immutable) */ exports["b"] = createUser;
/* harmony export (immutable) */ exports["c"] = getUser;
/* harmony export (immutable) */ exports["d"] = updateUser;
/* harmony export (immutable) */ exports["e"] = deleteUser;


function getUsers(ctx) {
  var _ctx$params = ctx.params,
      page = _ctx$params.page,
      perPage = _ctx$params.perPage;


  return __WEBPACK_IMPORTED_MODULE_0__services_user__["a" /* default */].getUsers({ page: page, perPage: perPage }).then(function (users) {
    return ctx.body = users;
  });
}

function createUser(ctx) {
  return __WEBPACK_IMPORTED_MODULE_0__services_user__["a" /* default */].createUser(ctx.request.body).then(function (user) {
    return ctx.body = user;
  });
}

function getUser(ctx) {
  return __WEBPACK_IMPORTED_MODULE_0__services_user__["a" /* default */].getUser(ctx.params.id).then(function (user) {
    return ctx.body = user;
  });
}

function updateUser(ctx) {
  return __WEBPACK_IMPORTED_MODULE_0__services_user__["a" /* default */].updateUser(ctx.params.id, ctx.request.body).then(function (res) {
    return ctx.body = res;
  });
}

function deleteUser(ctx) {
  return __WEBPACK_IMPORTED_MODULE_0__services_user__["a" /* default */].deleteUser(ctx.params.id).then(function (res) {
    return ctx.body = res;
  });
}

/***/ },
/* 42 */
/***/ function(module, exports) {

var categories = [{
  _id: '5a78c4169d3f2c2bc96c4205',
  name: 'Pizzas',
  slug: 'pizzas'
}, {
  _id: '5a78c4169d3f2c2bc96c4206',
  name: 'Soups',
  slug: 'soups'
}, {
  _id: '5a78c4169d3f2c2bc96c4207',
  name: 'Salads',
  slug: 'salads'
}];

/*
 * MenuItems: Pizzas, Soups, Salads
 */
var pizzas = [{
  name: 'Mario',
  description: 'Blat subțire. Sos de roșii, busuioc, ulei de măsline, maioneză, brânză Mozzarella, carne de pui, cașcaval Dor Blue, spanac, cârnăciori Cabanos, gogoșari.',
  prices: [{
    name: 'Small',
    price: 80
  }],
  weight: 500,
  featuredImage: 'mario.jpg',
  category: '5a78c4169d3f2c2bc96c4205',

  optionGroups: [{
    name: 'Cascaval',
    multiselect: true,
    options: [{
      name: 'Cașcaval Edam 50g',
      prices: [10]
    }, {
      name: 'Mozzarella 50g',
      prices: [10]
    }, {
      name: 'Parmigiano 15g',
      prices: [10]
    }]
  }, {
    name: 'Carne',
    multiselect: true,
    options: [{
      name: 'Jambon de Tambov 50g',
      prices: [15]
    }, {
      name: 'Piept de pui 50g',
      prices: [10]
    }, {
      name: 'Salami 30g',
      prices: [20]
    }]
  }]
}, {
  name: 'Siciliana',
  description: 'Brânză mozzarella, jambon de “tambov”, ciuperci coapte, anghinare coapte, măsline kalamata, sos de pizza.',
  prices: [{
    name: 'Small',
    price: 50
  }, {
    name: 'Medium',
    price: 80
  }, {
    name: 'Big',
    price: 100
  }],
  weight: 520,
  featuredImage: 'sicilian.jpg',
  category: '5a78c4169d3f2c2bc96c4205',

  optionGroups: [{
    name: 'Cascaval',
    multiselect: true,
    options: [{
      name: 'Cașcaval Edam 50g',
      prices: [10, 15, 20]
    }, {
      name: 'Mozzarella 50g',
      prices: [5, 8, 10]
    }, {
      name: 'Parmigiano 15g',
      prices: [5]
    }]
  }, {
    name: 'Carne',
    multiselect: false,
    options: [{
      name: 'Jambon de Tambov 50g',
      prices: [15]
    }, {
      name: 'Piept de pui 50g',
      prices: [20, 30, 40]
    }, {
      name: 'Salami 30g',
      prices: [20]
    }]
  }]
}];

var soups = [{
  name: 'Zeamă de pui',
  description: 'Bulion de pui, file de pui, verdeaţă, roşii, tăiţei de casă, ardei gras, rădăcină de țelină, pătrunjel, smântână, ardei iute.',
  prices: [{ name: '', price: 45 }],
  weight: 460,
  featuredImage: 'zeama.jpg',
  category: '5a78c4169d3f2c2bc96c4206'
}, {
  name: 'Supă-cremă de pui',
  description: 'Bulion de pui, pulpă de pui, ciuperci champignon, sos bechamel, smântână lichidă, ulei de măsline, piper negru, pătrunjel. Se serveşte în chiflă.',
  prices: [{ name: '', price: 53 }],
  weight: 430,
  featuredImage: 'supa.jpg',
  category: '5a78c4169d3f2c2bc96c4206'
}, {
  name: 'Supă-cremă de fasole',
  description: 'Bulion de legume, fasole, usturoi, pesmeți, ceapă verde, piper negru, ulei de măsline.',
  prices: [{ name: '', price: 40 }],
  weight: 350,
  featuredImage: 'supa.jpg',
  category: '5a78c4169d3f2c2bc96c4206',

  optionGroups: [{
    name: 'Temperatura',
    multiselect: false,
    options: [{
      name: 'Rece',
      prices: [0]
    }, {
      name: 'Calda',
      prices: [1]
    }]
  }]
}];

/*
 * Merge MenuItems from all categories.
 */
var menuItems = [].concat(pizzas, soups);

module.exports = {
  menuItems: menuItems,
  categories: categories
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__methods_coupon__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__validate_coupon__ = __webpack_require__(62);





var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var CouponSchema = new Schema({
  _id: { type: String, required: true }, // _id is code
  discountType: { type: String, required: true, enum: ['percent', 'number'], default: 'percent' }, // percent or number
  discount: { type: Number, required: true }
}, { versionKey: false });

/*
 * Plugins
 */
CouponSchema.plugin(__WEBPACK_IMPORTED_MODULE_1__methods_coupon__["a" /* default */]); // schema methods
CouponSchema.plugin(__WEBPACK_IMPORTED_MODULE_2__validate_coupon__["a" /* default */]); // schema validation

/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Coupon', CouponSchema);

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_options__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods_options__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validate_options__ = __webpack_require__(64);






var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var OptionSchema = new Schema({
  _id: { type: String, required: true }, // options

  // general options
  deliveryPrice: { type: Number, default: 0 },
  freeShippingFrom: { type: Number, default: 0 },
  deliveryTime: { type: Number }, // in minutes

  // store options
  storeAddress1: String,
  storeAddress2: String,
  storeCity: String,
  storeCountry: String,
  storePostcode: String,

  // currency options
  currency: { type: String, enum: __WEBPACK_IMPORTED_MODULE_1__util_options__["a" /* currencies */], default: 'USD' },
  currencyPosition: { type: String, enum: ['left', 'right', 'leftSpace', 'rightSpace'], default: 'left' },
  currencyThSeperator: { type: String, enum: [',', '.'], default: '.' }, // Thousand separator
  currencyDecSeperator: { type: String, enum: [',', '.'], default: ',' }, // Decimal separator
  currencyNumDec: { type: Number, default: 2 },

  // payment options
  paymentStripeKey: String,
  paymentPaypalKey: String
}, { versionKey: false });

/*
 * Plugins
 */
OptionSchema.plugin(__WEBPACK_IMPORTED_MODULE_2__methods_options__["a" /* default */]); // schema methods
OptionSchema.plugin(__WEBPACK_IMPORTED_MODULE_3__validate_options__["a" /* default */]); // schema validation

/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Options', OptionSchema);

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__types_OrderItem__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__methods_order__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validate_order__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_order__ = __webpack_require__(5);







var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var OrderSchema = new Schema({
  items: [__WEBPACK_IMPORTED_MODULE_1__types_OrderItem__["a" /* default */]],
  coupon: { type: String, ref: 'Coupon' },
  source: String,
  methods: { type: String, enum: ['cash', 'stripe', 'paypal'], default: 'cash' },
  status: { type: String, enum: ['pending', 'failed', 'processing', 'completed', 'canceled', 'ontheway'], default: 'pending' }, // https://docs.woocommerce.com/document/managing-orders/
  user: { type: ObjectId, ref: 'User' }
}, { versionKey: false, timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

/*
 * Virtuals
 */
OrderSchema.virtual('subtotal').get(function () {
  // return getTotalPrice(this.items)
  var subtotal = 0;
  this.items.forEach(function (lineItem) {
    subtotal += lineItem.lineItemTotal;
  });
  return subtotal;
});

OrderSchema.virtual('total').get(function () {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__util_order__["a" /* getDiscountPrice */])(this.subtotal, this.coupon);
});

/*
 * Plugins
 */
OrderSchema.plugin(__WEBPACK_IMPORTED_MODULE_2__methods_order__["a" /* default */]); // schema methods
OrderSchema.plugin(__WEBPACK_IMPORTED_MODULE_3__validate_order__["a" /* default */]); // schema validation

/* harmony default export */ exports["a"] = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.model('Order', OrderSchema);

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {
  schema.statics.getCategories = function () {
    return this.find({}).exec();
  };

  schema.statics.getCategory = function (id) {
    return this.findById(id).exec();
  };

  schema.statics.updateCategory = function (id, payload) {
    return this.findByIdAndUpdate(id, payload).exec();
  };
};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {
  schema.statics.getCoupons = function () {
    return this.find({}).exec();
  };

  schema.statics.getCoupon = function (id) {
    return this.findById(id).exec();
  };

  schema.statics.updateCoupon = function (id, payload) {
    return this.findByIdAndUpdate(id, payload).exec();
  };
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {
  schema.statics.getMenuItems = function (_ref) {
    var category = _ref.category;

    var query = {};
    if (category) {
      query.category = category;
    }
    return this.find(query).sort({ createdAt: -1 }).populate(['category']).exec();
  };

  schema.statics.getMenuItem = function (id) {
    return this.findById(id).exec();
  };

  schema.statics.updateMenuItem = function (id, payload) {
    return this.findByIdAndUpdate(id, payload).exec();
  };
};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {
  schema.statics.getOptions = function () {
    return this.findOne({ _id: 'options' }).exec().then(function (options) {
      if (options) {
        return options;
      } else {
        return {};
      }
    });
  };

  schema.statics.updateOptions = function (payload) {
    payload._id = 'options';
    return this.update({ _id: 'options' }, payload, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec();
  };
};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {
  schema.statics.getOrders = function (options) {
    return this.find(options).select({ source: 1, items: 1, coupon: 1, status: 1, createdAt: 1, updatedAt: 1 }).populate({ path: 'items.menuItem', select: { pizzaGroups: 0 } }).populate({ path: 'user', select: { _id: 1, email: 1, firstName: 1, lastName: 1, shipAddress: 1 } }).populate({ path: 'coupon', select: { _id: 1, code: 1, discount: 1, discountType: 1 } }).exec();
  };

  schema.statics.getOrder = function (id) {
    return this.findById(id).select({ source: 1, items: 1, coupon: 1, status: 1, createdAt: 1, updatedAt: 1 }).populate({ path: 'items.menuItem', select: { pizzaGroups: 0 } }).populate({ path: 'user', select: { _id: 1, email: 1, firstName: 1, lastName: 1, shipAddress: 1 } }).populate({ path: 'coupon', select: { _id: 1, code: 1, discount: 1, discountType: 1 } }).exec();
  };

  schema.statics.updateOrder = function (id, payload) {
    // return this.findByIdAndUpdate(id, payload).exec() // need to return new document after update
    return this.findOneAndUpdate({ _id: id }, { $set: payload }, { new: true }).populate({ path: 'items.menuItem', select: { pizzaGroups: 0 } }).populate({ path: 'user', select: { _id: 1, email: 1, firstName: 1, lastName: 1, shipAddress: 1 } }).populate({ path: 'coupon', select: { _id: 1, code: 1, discount: 1, discountType: 1 } }).exec();
  };
};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_crypto___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_crypto__);


// https://habrahabr.ru/post/324066/
/* harmony default export */ exports["a"] = function (schema, options) {

  schema.virtual('password').set(function (password) {
    this._plainPassword = password;
    if (password) {
      this.salt = __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.randomBytes(128).toString('base64');
      this.passwordHash = __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  }).get(function () {
    return this._plainPassword;
  });

  schema.methods.checkPassword = function (password) {
    if (!password) return false;
    if (!this.passwordHash) return false;
    return __WEBPACK_IMPORTED_MODULE_0_crypto___default.a.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
  };
};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var MenuItemPriceSchema = new Schema({
  name: String,
  price: Number
}, { versionKey: false });

/* harmony default export */ exports["a"] = MenuItemPriceSchema;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var OptionSchema = new Schema({
  name: String,
  price: Number,
  prices: [Number]
}, { versionKey: false });

/* harmony default export */ exports["a"] = OptionSchema;

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Option__ = __webpack_require__(53);




var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var OptionGroupSchema = new Schema({
  name: String,
  multiselect: Boolean,
  min: Boolean,
  max: Boolean,
  options: [__WEBPACK_IMPORTED_MODULE_1__Option__["a" /* default */]]
}, { versionKey: false });

/* harmony default export */ exports["a"] = OptionGroupSchema;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OrderOptionGroup__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_order__ = __webpack_require__(5);





var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var OrderItemSchema = new Schema({
  quantity: Number,
  size: String,
  optionGroups: [__WEBPACK_IMPORTED_MODULE_1__OrderOptionGroup__["a" /* default */]],
  menuItem: { type: ObjectId, ref: 'MenuItem' }
}, { versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OrderItemSchema.virtual('itemPrice').get(function () {
  var price = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_order__["b" /* getMenuItemPrice */])(this.menuItem, this.size);

  return price;
});

OrderItemSchema.virtual('optionsTotalPrice').get(function () {
  var total = 0;

  this.optionGroups.forEach(function (optionGroup) {
    total += optionGroup.groupTotalPrice;
  });

  return total;
});

OrderItemSchema.virtual('lineItemPrice').get(function () {
  return this.itemPrice + this.optionsTotalPrice;
});

OrderItemSchema.virtual('lineItemTotal').get(function () {
  return this.lineItemPrice * this.quantity;
});

/* harmony default export */ exports["a"] = OrderItemSchema;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_order__ = __webpack_require__(5);




var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var OrderOptionSchema = new Schema({
  id: String, // OptionID
  quantity: Number
}, { versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OrderOptionSchema.virtual('optionRef').get(function () {
  var lineItem = this.parent().parent();
  var optionGroupId = this.parent().group;
  var optionId = this.id;

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_order__["d" /* getOptionById */])(lineItem.menuItem, optionGroupId, optionId);
});

OrderOptionSchema.virtual('unitPrice').get(function () {
  var lineItem = this.parent().parent();
  var optionGroup = this.parent();

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util_order__["e" /* getOptionPrice */])(lineItem.menuItem, optionGroup.group, this.id, lineItem.size);
});

OrderOptionSchema.virtual('optionTotalPrice').get(function () {
  return this.unitPrice * this.quantity;
});

/* harmony default export */ exports["a"] = OrderOptionSchema;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OrderOption__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_order__ = __webpack_require__(5);





var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var OrderOptionGroupSchema = new Schema({
  id: String, // OptionGroupID
  options: [__WEBPACK_IMPORTED_MODULE_1__OrderOption__["a" /* default */]]
}, { versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true } });

OrderOptionGroupSchema.virtual('groupRef').get(function () {
  var lineItem = this.parent();
  var optionGroupId = this.id;

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util_order__["c" /* getOptionGroupById */])(lineItem.menuItem, optionGroupId);
});

OrderOptionGroupSchema.virtual('groupTotalPrice').get(function () {
  var total = 0;
  this.options.forEach(function (option) {
    total += option.optionTotalPrice;
  });
  return total;
});

/* harmony default export */ exports["a"] = OrderOptionGroupSchema;

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_mongoose___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_mongoose__);


var Schema = __WEBPACK_IMPORTED_MODULE_0_mongoose___default.a.Schema;
var ObjectId = Schema.ObjectId;

var UserShipAddressSchema = new Schema({
  firstName: String,
  lastName: String,
  // city: String,
  street: String,
  streetNumber: String,
  entrance: String,
  level: String,
  apartment: String,

  entranceCode: String
}, { versionKey: false });

/* harmony default export */ exports["a"] = UserShipAddressSchema;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_currency_codes__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_currency_codes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_currency_codes__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return currencies; });


var currencies = __WEBPACK_IMPORTED_MODULE_0_currency_codes___default.a.codes();

// export const currencies = [
//   "AED",
//   "AFN",
//   "ALL",
//   "AMD",
//   "ANG",
//   "AOA",
//   "ARS",
//   "AUD",
//   "AWG",
//   "AZN",
//   "BAM",
//   "BBD",
//   "BDT",
//   "BGN",
//   "BHD",
//   "BIF",
//   "BMD",
//   "BND",
//   "BOB",
//   "BOV",
//   "BRL",
//   "BSD",
//   "BTN",
//   "BWP",
//   "BYR",
//   "BZD",
//   "CAD",
//   "CDF",
//   "CHE",
//   "CHF",
//   "CHW",
//   "CLF",
//   "CLP",
//   "CNY",
//   "COP",
//   "COU",
//   "CRC",
//   "CUC",
//   "CUP",
//   "CVE",
//   "CZK",
//   "DJF",
//   "DKK",
//   "DOP",
//   "DZD",
//   "EGP",
//   "ERN",
//   "ETB",
//   "EUR",
//   "FJD",
//   "FKP",
//   "GBP",
//   "GEL",
//   "GHS",
//   "GIP",
//   "GMD",
//   "GNF",
//   "GTQ",
//   "GYD",
//   "HKD",
//   "HNL",
//   "HRK",
//   "HTG",
//   "HUF",
//   "IDR",
//   "ILS",
//   "INR",
//   "IQD",
//   "IRR",
//   "ISK",
//   "JMD",
//   "JOD",
//   "JPY",
//   "KES",
//   "KGS",
//   "KHR",
//   "KMF",
//   "KPW",
//   "KRW",
//   "KWD",
//   "KYD",
//   "KZT",
//   "LAK",
//   "LBP",
//   "LKR",
//   "LRD",
//   "LSL",
//   "LTL",
//   "LVL",
//   "LYD",
//   "MAD",
//   "MDL",
//   "MGA",
//   "MKD",
//   "MMK",
//   "MNT",
//   "MOP",
//   "MRO",
//   "MUR",
//   "MVR",
//   "MWK",
//   "MXN",
//   "MXV",
//   "MYR",
//   "MZN",
//   "NAD",
//   "NGN",
//   "NIO",
//   "NOK",
//   "NPR",
//   "NZD",
//   "OMR",
//   "PAB",
//   "PEN",
//   "PGK",
//   "PHP",
//   "PKR",
//   "PLN",
//   "PYG",
//   "QAR",
//   "RON",
//   "RSD",
//   "RUB",
//   "RWF",
//   "SAR",
//   "SBD",
//   "SCR",
//   "SDG",
//   "SEK",
//   "SGD",
//   "SHP",
//   "SLL",
//   "SOS",
//   "SRD",
//   "SSP",
//   "STD",
//   "SYP",
//   "SZL",
//   "THB",
//   "TJS",
//   "TMT",
//   "TND",
//   "TOP",
//   "TRY",
//   "TTD",
//   "TWD",
//   "TZS",
//   "UAH",
//   "UGX",
//   "USD",
//   "USN",
//   "USS",
//   "UYI",
//   "UYU",
//   "UZS",
//   "VEF",
//   "VND",
//   "VUV",
//   "WST",
//   "XAF",
//   "XAG",
//   "XAU",
//   "XBA",
//   "XBB",
//   "XBC",
//   "XBD",
//   "XBT",
//   "XCD",
//   "XDR",
//   "XFU",
//   "XOF",
//   "XPD",
//   "XPF",
//   "XPT",
//   "XTS",
//   "XXX",
//   "YER",
//   "ZAR",
//   "ZMW"
// ]

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = transformID;
function transformID(doc, ret) {
  ret.id = ret._id;
  delete ret._id;
}

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony default export */ exports["a"] = function (schema, options) {};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_joi_validate__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_joi_validate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_joi_validate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validation_profile__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controllers_profile__ = __webpack_require__(11);








var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

/*
 * Login.
 */
router.post('/login', __WEBPACK_IMPORTED_MODULE_2_koa_joi_validate___default()(__WEBPACK_IMPORTED_MODULE_3__validation_profile__["a" /* default */].create), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__config_passport__["c" /* authenticate */])());

/**
 * Register
 */
router.post('/register', __WEBPACK_IMPORTED_MODULE_2_koa_joi_validate___default()(__WEBPACK_IMPORTED_MODULE_3__validation_profile__["a" /* default */].create), __WEBPACK_IMPORTED_MODULE_5__controllers_profile__["c" /* registerUser */]);

/**
 * Facebok login redirect.
 */
router.get('/auth/facebook', __WEBPACK_IMPORTED_MODULE_1_passport___default.a.authenticate('facebook', {
  scope: ['public_profile', 'email']
}));

/**
 * Facebok login callback.
 */
router.get('/auth/facebook/callback', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__config_passport__["d" /* authenticateFacebook */])());

/* harmony default export */ exports["a"] = router;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_category__ = __webpack_require__(34);






var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

/*
 * List Categories.
 */
router.get('/category', __WEBPACK_IMPORTED_MODULE_3__controllers_category__["a" /* getCategories */]);

/*
 * Create a Category.
 */
router.post('/category', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_category__["b" /* createCategory */]);

/*
 * Retrieve a Category.
 */
router.get('/category/:id', __WEBPACK_IMPORTED_MODULE_3__controllers_category__["c" /* getCategory */]);

/*
 * Update a Category.
 */
router.put('/category/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_category__["d" /* updateCategory */]);

/*
 * Delete a Category.
 */
router.delete('/category/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_category__["e" /* removeCategory */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_coupon__ = __webpack_require__(35);






var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

/*
 * List Coupons.
 */
router.get('/coupon', __WEBPACK_IMPORTED_MODULE_3__controllers_coupon__["a" /* getCoupons */]);

/*
 * Create an Coupon.
 */
router.post('/coupon', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_coupon__["b" /* createCoupon */]);

/*
 * Retrieve an Coupon.
 */
router.get('/coupon/:id', __WEBPACK_IMPORTED_MODULE_3__controllers_coupon__["c" /* getCoupon */]);

/*
 * Update an Coupon.
 */
router.put('/coupon/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_coupon__["d" /* updateCoupon */]);

/*
 * Delete an Coupon.
 */
router.delete('/coupon/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_coupon__["e" /* removeCoupon */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_roles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_MenuItem__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_Category__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dummy__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__dummy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__dummy__);


var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }









var router = new __WEBPACK_IMPORTED_MODULE_1_koa_router___default.a();

/*
 * Import Dummy Categories.
 */
router.get('/dummy/categories', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_3__middlewares_roles__["a" /* default */].can('access admin'), function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx) {
    return __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              console.log('Saving categories...');
              __WEBPACK_IMPORTED_MODULE_6__dummy___default.a.categories.map(function (item) {
                var category = new __WEBPACK_IMPORTED_MODULE_5__models_Category__["a" /* default */](item);
                var result = category.save();
                console.log(result);
              });
            } catch (err) {
              ctx.throw(400, err);
            }

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

/*
 * Import Dummy MenuItems.
 */
router.get('/dummy/menu', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_3__middlewares_roles__["a" /* default */].can('access admin'), function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx) {
    return __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            try {
              console.log('Saving menuItems...');
              __WEBPACK_IMPORTED_MODULE_6__dummy___default.a.menuItems.map(function (item) {
                var menuItem = new __WEBPACK_IMPORTED_MODULE_4__models_MenuItem__["a" /* default */](item);
                var result = menuItem.save();
                console.log(result);
              });
            } catch (err) {
              ctx.throw(400, err);
            }

          case 1:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  }));

  return function (_x2) {
    return _ref2.apply(this, arguments);
  };
}());

/* harmony default export */ exports["a"] = router;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_menuItem__ = __webpack_require__(36);






var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

// http://docs.opendining.net/api/#!/menuitems.js/getMenuItem_get_0

/*
 * List MenuItems.
 */
router.get('/menu', __WEBPACK_IMPORTED_MODULE_3__controllers_menuItem__["a" /* getMenuItems */]);

/*
 * Create a MenuItem.
 */
router.post('/menu', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_menuItem__["b" /* createMenuItem */]);

/*
 * Retrieve a MenuItem.
 */
router.get('/menu/:id', __WEBPACK_IMPORTED_MODULE_3__controllers_menuItem__["c" /* getMenuItem */]);

/*
 * Update a MenuItem.
 */
router.put('/menu/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_menuItem__["d" /* updateMenuItem */]);

/*
 * Delete a MenuItem.
 */
router.delete('/menu/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_menuItem__["e" /* removeMenuItem */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_options__ = __webpack_require__(37);






var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

/*
 * Get Options.
 */
router.get('/options', __WEBPACK_IMPORTED_MODULE_3__controllers_options__["a" /* getOptions */]);

/*
 * Update Options.
 */
router.post('/options', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_options__["b" /* saveOptions */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__controllers_order__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__middlewares_roles__ = __webpack_require__(3);

//import validate from 'express-validation'





var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

/*
 * List Orders.
 */
router.get('/order', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__controllers_order__["a" /* getOrders */]);

/*
 * Create an Order.
 */
router.post('/order', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__controllers_order__["b" /* createOrder */]);

/*
 * Retrieve an Order.
 */
router.get('/order/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_3__middlewares_roles__["a" /* default */].can('access order'), __WEBPACK_IMPORTED_MODULE_2__controllers_order__["c" /* getOrder */]);

/*
 * Update an Order.
 */
router.put('/order/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_3__middlewares_roles__["a" /* default */].can('access order'), __WEBPACK_IMPORTED_MODULE_2__controllers_order__["d" /* updateOrder */]);

/*
 * Delete an Order.
 */
router.delete('/order/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_3__middlewares_roles__["a" /* default */].can('access order'), __WEBPACK_IMPORTED_MODULE_2__controllers_order__["e" /* removeOrder */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_joi_validate__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_joi_validate___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_joi_validate__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validation_profile__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__controllers_profile__ = __webpack_require__(11);








var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

/*
 * Retrieve profile.
 */
router.get('/profile', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_5__controllers_profile__["a" /* getProfile */]);

/*
 * Update profile.
 */
router.put('/profile', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2_koa_joi_validate___default()(__WEBPACK_IMPORTED_MODULE_3__validation_profile__["a" /* default */].update), __WEBPACK_IMPORTED_MODULE_5__controllers_profile__["b" /* updateProfile */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_storage__ = __webpack_require__(39);






var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

router.post('/storage/upload', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_storage__["a" /* uploadImage */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_upload__ = __webpack_require__(40);






var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

router.post('/upload', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_upload__["a" /* uploadFeaturedImage */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__controllers_user__ = __webpack_require__(41);






var router = new __WEBPACK_IMPORTED_MODULE_0_koa_router___default.a();

/*
 * List Users.
 */
router.get('/user', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_user__["a" /* getUsers */]);

/*
 * Create an User.
 */
router.post('/user', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_user__["b" /* createUser */]);

/*
 * Retrieve an User.
 */
router.get('/user/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_user__["c" /* getUser */]);

/*
 * Update an User.
 */
router.put('/user/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_user__["d" /* updateUser */]);

/*
 * Delete an User.
 */
router.delete('/user/:id', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__config_passport__["a" /* authorize */])(), __WEBPACK_IMPORTED_MODULE_2__middlewares_roles__["a" /* default */].can('access admin'), __WEBPACK_IMPORTED_MODULE_3__controllers_user__["e" /* deleteUser */]);

/* harmony default export */ exports["a"] = router;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Category__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_AppError__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = {
  getCategories: function getCategories() {
    return __WEBPACK_IMPORTED_MODULE_0__models_Category__["a" /* default */].getCategories({});
  },
  createCategory: function createCategory(payload) {
    return new __WEBPACK_IMPORTED_MODULE_0__models_Category__["a" /* default */](payload).save();
  },
  getCategory: function getCategory(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Category__["a" /* default */].getCategory(id).then(function (category) {
      if (!category) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return category;
    });
  },
  updateCategory: function updateCategory(id, payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Category__["a" /* default */].updateCategory(id, payload).then(function (category) {
      if (!category) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return category;
    });
  },
  removeCategory: function removeCategory(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Category__["a" /* default */].findByIdAndRemove(id).then(function (category) {
      if (!category) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return category;
    });
  }
};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Coupon__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_AppError__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = {
  getCoupons: function getCoupons() {
    return __WEBPACK_IMPORTED_MODULE_0__models_Coupon__["a" /* default */].getCoupons({});
  },
  createCoupon: function createCoupon(payload) {
    return new __WEBPACK_IMPORTED_MODULE_0__models_Coupon__["a" /* default */](payload).save();
  },
  getCoupon: function getCoupon(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Coupon__["a" /* default */].getCoupon(id).then(function (coupon) {
      if (!coupon) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return coupon;
    });
  },
  updateCoupon: function updateCoupon(id, payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Coupon__["a" /* default */].updateCoupon(id, payload).then(function (coupon) {
      if (!coupon) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return coupon;
    });
  },
  removeCoupon: function removeCoupon(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Coupon__["a" /* default */].findByIdAndRemove(id).then(function (coupon) {
      if (!coupon) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return coupon;
    });
  }
};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_MenuItem__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_AppError__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = {
  getMenuItems: function getMenuItems(_ref) {
    var category = _ref.category;

    return __WEBPACK_IMPORTED_MODULE_0__models_MenuItem__["a" /* default */].getMenuItems({ category: category });
  },
  createMenuItem: function createMenuItem(payload) {
    return new __WEBPACK_IMPORTED_MODULE_0__models_MenuItem__["a" /* default */](payload).save();
  },
  getMenuItem: function getMenuItem(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_MenuItem__["a" /* default */].getMenuItem(id).then(function (menuItem) {
      if (!menuItem) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return menuItem;
    });
  },
  updateMenuItem: function updateMenuItem(id, payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_MenuItem__["a" /* default */].updateMenuItem(id, payload).then(function (menuItem) {
      if (!menuItem) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return menuItem;
    });
  },
  removeMenuItem: function removeMenuItem(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_MenuItem__["a" /* default */].findByIdAndRemove(id).then(function (menuItem) {
      if (!menuItem) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return menuItem;
    });
  }
};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_Options__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_AppError__ = __webpack_require__(4);



/* harmony default export */ exports["a"] = {
  getOptions: function getOptions() {
    return __WEBPACK_IMPORTED_MODULE_0__models_Options__["a" /* default */].getOptions();
  },
  saveOptions: function saveOptions(payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_Options__["a" /* default */].updateOptions(payload).then(function (options) {
      if (!options) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Options not found', 404);
      return options;
    });
  }
};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__models_User__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__errors_AppError__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_passport__ = __webpack_require__(1);




var selectedFields = {
  'id': 1,
  'firstName': 1,
  'lastName': 1,
  'email': 1,
  'phone': 1,
  'shipAddress': 1
};

/* harmony default export */ exports["a"] = {
  registerUser: function registerUser(payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].create(payload).then(function (user) {
      if (user) {
        var token = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__config_passport__["b" /* generateJWT */])(user);
        return { user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
          }, token: token };
      } else {
        throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Can not create new User', 400);
      }
    }).catch(function (err) {
      throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('This user already exists', 400);
    });
  },
  getProfile: function getProfile(id) {
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findById(id, selectedFields).exec().then(function (user) {
      if (user) {
        return user;
      } else {
        throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('This user was disabled by admin', 400);
      }
    });
  },
  updateProfile: function updateProfile(id, payload) {
    return __WEBPACK_IMPORTED_MODULE_0__models_User__["a" /* default */].findByIdAndUpdate(id, payload, { select: selectedFields, new: true }).exec().then(function (res) {
      if (!res) throw new __WEBPACK_IMPORTED_MODULE_1__errors_AppError__["a" /* default */]('Item not found', 404);
      return res;
    });
  }
};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aws_sdk__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aws_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_aws_sdk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__errors_AppError__ = __webpack_require__(4);





__WEBPACK_IMPORTED_MODULE_1_aws_sdk___default.a.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
});

var s3 = new __WEBPACK_IMPORTED_MODULE_1_aws_sdk___default.a.S3();

/* harmony default export */ exports["a"] = {
  uploadImage: function uploadImage(file, name) {
    return new Promise(function (resolve, reject) {

      if (!file || !name) return reject(new __WEBPACK_IMPORTED_MODULE_2__errors_AppError__["a" /* default */]('Missing file or filename', 400));
      if (file.type !== 'image/png' && file.type !== 'image/jpeg') return reject(new __WEBPACK_IMPORTED_MODULE_2__errors_AppError__["a" /* default */]('Only data type image/png allowed', 400));

      __WEBPACK_IMPORTED_MODULE_0_fs___default.a.readFile(file.path, function (err, data) {

        if (err) return reject(new __WEBPACK_IMPORTED_MODULE_2__errors_AppError__["a" /* default */](err.message, 500));
        if (!data) return reject(new __WEBPACK_IMPORTED_MODULE_2__errors_AppError__["a" /* default */]('The file is empty', 400));
        s3.upload({
          Key: name,
          Body: data,
          ContentType: file.type,
          Bucket: process.env.AWS_BUCKET
        }, function (err, data) {
          console.log('AWS S3 data', data);
          if (err) return reject(new __WEBPACK_IMPORTED_MODULE_2__errors_AppError__["a" /* default */](err.message, 500));
          if (data) return resolve({ location: data.Location, key: data.Key });
          reject(new __WEBPACK_IMPORTED_MODULE_2__errors_AppError__["a" /* default */]('Unexpected error', 500));
        });
      });
    });
  }
};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_path__);



/* harmony default export */ exports["a"] = {
  uploadImage: function uploadImage(file, filename) {

    var newFilePath = __WEBPACK_IMPORTED_MODULE_1_path___default.a.join(__dirname, './../static/' + filename);

    return new Promise(function (resolve, reject) {
      __WEBPACK_IMPORTED_MODULE_0_fs___default.a.readFile(file.path, function (err, data) {
        if (err) return reject(err);
        __WEBPACK_IMPORTED_MODULE_0_fs___default.a.writeFile(newFilePath, data, function (err) {
          if (err) return reject(err);
          __WEBPACK_IMPORTED_MODULE_0_fs___default.a.unlink(file.path, function (err) {
            if (err) return reject(err);
            resolve({ file: '/static/' + filename });
          });
        });
      });
    });
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "server/services"))

/***/ },
/* 84 */
/***/ function(module, exports) {

module.exports = require("aws-sdk");

/***/ },
/* 85 */
/***/ function(module, exports) {

module.exports = require("crypto");

/***/ },
/* 86 */
/***/ function(module, exports) {

module.exports = require("currency-codes");

/***/ },
/* 87 */
/***/ function(module, exports) {

module.exports = require("joi");

/***/ },
/* 88 */
/***/ function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ },
/* 89 */
/***/ function(module, exports) {

module.exports = require("koa-roles");

/***/ },
/* 90 */
/***/ function(module, exports) {

module.exports = require("passport-facebook");

/***/ },
/* 91 */
/***/ function(module, exports) {

module.exports = require("passport-local");

/***/ },
/* 92 */
/***/ function(module, exports) {

module.exports = require("regenerator-runtime");

/***/ },
/* 93 */
/***/ function(module, exports) {

module.exports = require("uuid");

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {Object.defineProperty(exports, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dotenv_config__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dotenv_config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dotenv_config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_body__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_body___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_koa_body__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_mount__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_mount___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_koa_mount__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_static__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_static___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_koa_static__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_koa2_cors__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_koa2_cors___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_koa2_cors__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_koa_passport__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_koa_passport___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_koa_passport__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_path___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_path__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_nuxt__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_http__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_http___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_http__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_https__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_https___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_https__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_koa_force_ssl__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_koa_force_ssl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_koa_force_ssl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_fs__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_fs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_fs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__routes__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__db__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__config_passport__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__middlewares_roles__ = __webpack_require__(3);


var start = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.mark(function _callee3() {
    var _this = this;

    var app, host, port, config, nuxt, builder;
    return __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            app = new __WEBPACK_IMPORTED_MODULE_2_koa___default.a();
            host = process.env.HOST;
            port = process.env.PORT;

            // Catch errors

            app.use(function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.mark(function _callee(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return next();

                      case 3:
                        _context.next = 10;
                        break;

                      case 5:
                        _context.prev = 5;
                        _context.t0 = _context['catch'](0);

                        ctx.status = _context.t0.status || 500;
                        ctx.body = { error: _context.t0.message };
                        ctx.app.emit('error', _context.t0, ctx);

                      case 10:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, _this, [[0, 5]]);
              }));

              return function (_x, _x2) {
                return _ref2.apply(this, arguments);
              };
            }());

            // Force SSL on all page
            // app.use(forceSSL())

            // Register middlewares
            app.use(__WEBPACK_IMPORTED_MODULE_6_koa2_cors___default()({ origin: '*' }));
            app.use(__WEBPACK_IMPORTED_MODULE_3_koa_body___default()({ multipart: true }));
            app.use(__WEBPACK_IMPORTED_MODULE_4_koa_mount___default()('/static', __WEBPACK_IMPORTED_MODULE_5_koa_static___default()(__WEBPACK_IMPORTED_MODULE_8_path___default.a.join(__dirname, '/static'))));
            app.use(__WEBPACK_IMPORTED_MODULE_7_koa_passport___default.a.initialize());

            // Koa roles
            app.use(__WEBPACK_IMPORTED_MODULE_17__middlewares_roles__["a" /* default */].middleware());

            // Register routes
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_14__routes__["a" /* default */])(app, '/api');

            // Import and Set Nuxt.js options
            config = __webpack_require__(21);

            config.dev = !(app.env === 'production');

            // Instantiate nuxt.js
            nuxt = new __WEBPACK_IMPORTED_MODULE_9_nuxt__["Nuxt"](config);

            // Build in development

            if (!config.dev) {
              _context3.next = 17;
              break;
            }

            builder = new __WEBPACK_IMPORTED_MODULE_9_nuxt__["Builder"](nuxt);
            _context3.next = 17;
            return builder.build();

          case 17:

            app.use(function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/__WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.mark(function _callee2(ctx, next) {
                return __WEBPACK_IMPORTED_MODULE_0__home_bluder_Projects_Nuxt_yummy_dashboard_node_modules_babel_runtime_regenerator___default.a.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return next();

                      case 2:
                        ctx.status = 200; // koa defaults to 404 when it sees that status is unset
                        return _context2.abrupt('return', new Promise(function (resolve, reject) {
                          ctx.res.on('close', resolve);
                          ctx.res.on('finish', resolve);
                          nuxt.render(ctx.req, ctx.res, function (promise) {
                            // nuxt.render passes a rejected promise into callback on error.
                            promise.then(resolve).catch(reject);
                          });
                        }));

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, _callee2, _this);
              }));

              return function (_x3, _x4) {
                return _ref3.apply(this, arguments);
              };
            }());

            // Listen mongo & koa
            __WEBPACK_IMPORTED_MODULE_15__db__["a" /* default */].once('open', function () {
              // app.listen(port, host)
              // console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
            });

            // Start server
            app.listen(port, host);
            console.log('Server listening on ' + host + ':' + port); // eslint-disable-line no-console

            // SSL options
            // var options = {
            //   key: fs.readFileSync(path.resolve(__dirname) + '/../.ssl/key.pem'),
            //   cert: fs.readFileSync(path.resolve(__dirname) + '/../.ssl/cert.pem')
            // }

            // start the server
            //http.createServer(app.callback()).listen(port)
            //https.createServer(options, app.callback()).listen(443)

            return _context3.abrupt('return', { app: app, db: __WEBPACK_IMPORTED_MODULE_15__db__["a" /* default */] });

          case 22:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }




















var server = start();

/* harmony default export */ exports["default"] = server;
/* WEBPACK VAR INJECTION */}.call(exports, "server"))

/***/ }
/******/ ]);
//# sourceMappingURL=main.map