"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_catalog_js-assets_js_theme_common_faceted-search_js-assets_js_theme_global_co-3f5afe"],{

/***/ "./assets/js/theme/catalog.js":
/*!************************************!*\
  !*** ./assets/js/theme/catalog.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CatalogPage; }
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CatalogPage = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(CatalogPage, _PageManager);

  function CatalogPage(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    window.addEventListener('beforeunload', function () {
      if (document.activeElement.id === 'sort') {
        window.localStorage.setItem('sortByStatus', 'selected');
      }
    });
    return _this;
  }

  var _proto = CatalogPage.prototype;

  _proto.arrangeFocusOnSortBy = function arrangeFocusOnSortBy() {
    var $sortBySelector = $('[data-sort-by="product"] #sort');

    if (window.localStorage.getItem('sortByStatus')) {
      $sortBySelector.focus();
      window.localStorage.removeItem('sortByStatus');
    }
  };

  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_2__.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page;
    event.preventDefault();
    window.location = url__WEBPACK_IMPORTED_MODULE_2__.format({
      pathname: url.pathname,
      search: _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_1__["default"].buildQueryString(url.query)
    });
  };

  return CatalogPage;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./assets/js/theme/common/faceted-search.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/faceted-search.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/union */ "./node_modules/lodash/union.js");
/* harmony import */ var lodash_union__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_union__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/without */ "./node_modules/lodash/without.js");
/* harmony import */ var lodash_without__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_without__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash/extend */ "./node_modules/lodash/extend.js");
/* harmony import */ var lodash_extend__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash_extend__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./nod */ "./assets/js/theme/common/nod.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");










var defaultOptions = {
  accordionToggleSelector: '#facetedSearch .accordion-navigation, #facetedSearch .facetedSearch-toggle',
  blockerSelector: '#facetedSearch .blocker',
  clearFacetSelector: '#facetedSearch .facetedSearch-clearLink',
  componentSelector: '#facetedSearch-navList',
  facetNavListSelector: '#facetedSearch .navList',
  priceRangeErrorSelector: '#facet-range-form .form-inlineMessage',
  priceRangeFieldsetSelector: '#facet-range-form .form-fieldset',
  priceRangeFormSelector: '#facet-range-form',
  priceRangeMaxPriceSelector: '#facet-range-form [name=max_price]',
  priceRangeMinPriceSelector: '#facet-range-form [name=min_price]',
  showMoreToggleSelector: '#facetedSearch .accordion-content .toggleLink',
  facetedSearchFilterItems: '#facetedSearch-filterItems .form-input',
  modal: (0,_global_modal__WEBPACK_IMPORTED_MODULE_6__["default"])('#modal')[0],
  modalOpen: false
};
/**
 * Faceted search view component
 */

var FacetedSearch = /*#__PURE__*/function () {
  /**
   * @param {object} requestOptions - Object with options for the ajax requests
   * @param {function} callback - Function to execute after fetching templates
   * @param {object} options - Configurable options
   * @example
   *
   * let requestOptions = {
   *      templates: {
   *          productListing: 'category/product-listing',
   *          sidebar: 'category/sidebar'
   *     }
   * };
   *
   * let templatesDidLoad = function(content) {
   *     $productListingContainer.html(content.productListing);
   *     $facetedSearchContainer.html(content.sidebar);
   * };
   *
   * let facetedSearch = new FacetedSearch(requestOptions, templatesDidLoad);
   */
  function FacetedSearch(requestOptions, callback, options) {
    var _this = this;

    // Private properties
    this.requestOptions = requestOptions;
    this.callback = callback;
    this.options = lodash_extend__WEBPACK_IMPORTED_MODULE_2___default()({}, defaultOptions, options);
    this.collapsedFacets = [];
    this.collapsedFacetItems = []; // Init collapsibles

    (0,_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])(); // Init price validator

    this.initPriceValidator(); // Show limited items by default

    $(this.options.facetNavListSelector).each(function (index, navList) {
      _this.collapseFacetItems($(navList));
    }); // Mark initially collapsed accordions

    $(this.options.accordionToggleSelector).each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');

      if (collapsible.isCollapsed) {
        _this.collapsedFacets.push(collapsible.targetId);
      }
    }); // Collapse all facets if initially hidden
    // NOTE: Need to execute after Collapsible gets bootstrapped

    setTimeout(function () {
      if ($(_this.options.componentSelector).is(':hidden')) {
        _this.collapseAllFacets();
      }
    }); // Observe user events

    this.onStateChange = this.onStateChange.bind(this);
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onAccordionToggle = this.onAccordionToggle.bind(this);
    this.onClearFacet = this.onClearFacet.bind(this);
    this.onFacetClick = this.onFacetClick.bind(this);
    this.onRangeSubmit = this.onRangeSubmit.bind(this);
    this.onSortBySubmit = this.onSortBySubmit.bind(this);
    this.filterFacetItems = this.filterFacetItems.bind(this);
    this.bindEvents();
  } // Public methods


  var _proto = FacetedSearch.prototype;

  _proto.refreshView = function refreshView(content) {
    if (content) {
      this.callback(content);
    } // Init collapsibles


    (0,_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])(); // Init price validator

    this.initPriceValidator(); // Restore view state

    this.restoreCollapsedFacets();
    this.restoreCollapsedFacetItems(); // Bind events

    this.bindEvents();
  };

  _proto.updateView = function updateView() {
    var _this2 = this;

    $(this.options.blockerSelector).show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.api.getPage(_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl(), this.requestOptions, function (err, content) {
      $(_this2.options.blockerSelector).hide();

      if (err) {
        throw new Error(err);
      } // Refresh view with new content


      _this2.refreshView(content);
    });
  };

  _proto.expandFacetItems = function expandFacetItems($navList) {
    var id = $navList.attr('id'); // Remove

    this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
  };

  _proto.collapseFacetItems = function collapseFacetItems($navList) {
    var id = $navList.attr('id');
    var hasMoreResults = $navList.data('hasMoreResults');

    if (hasMoreResults) {
      this.collapsedFacetItems = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacetItems, [id]);
    } else {
      this.collapsedFacetItems = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacetItems, id);
    }
  };

  _proto.toggleFacetItems = function toggleFacetItems($navList) {
    var id = $navList.attr('id'); // Toggle depending on `collapsed` flag

    if (this.collapsedFacetItems.includes(id)) {
      this.getMoreFacetResults($navList);
      return true;
    }

    this.collapseFacetItems($navList);
    return false;
  };

  _proto.getMoreFacetResults = function getMoreFacetResults($navList) {
    var _this3 = this;

    var facet = $navList.data('facet');
    var facetUrl = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].getUrl();

    if (this.requestOptions.showMore) {
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.api.getPage(facetUrl, {
        template: this.requestOptions.showMore,
        params: {
          list_all: facet
        }
      }, function (err, response) {
        if (err) {
          throw new Error(err);
        }

        _this3.options.modal.open();

        _this3.options.modalOpen = true;

        _this3.options.modal.updateContent(response);
      });
    }

    this.collapseFacetItems($navList);
    return false;
  };

  _proto.filterFacetItems = function filterFacetItems(event) {
    var $items = $('.navList-item');
    var query = $(event.currentTarget).val().toLowerCase();
    $items.each(function (index, element) {
      var text = $(element).text().toLowerCase();

      if (text.indexOf(query) !== -1) {
        $(element).show();
      } else {
        $(element).hide();
      }
    });
  };

  _proto.expandFacet = function expandFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.open();
  };

  _proto.collapseFacet = function collapseFacet($accordionToggle) {
    var collapsible = $accordionToggle.data('collapsibleInstance');
    collapsible.close();
  };

  _proto.collapseAllFacets = function collapseAllFacets() {
    var _this4 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);

      _this4.collapseFacet($accordionToggle);
    });
  };

  _proto.expandAllFacets = function expandAllFacets() {
    var _this5 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);

      _this5.expandFacet($accordionToggle);
    });
  } // Private methods
  ;

  _proto.initPriceValidator = function initPriceValidator() {
    if ($(this.options.priceRangeFormSelector).length === 0) {
      return;
    }

    var validator = (0,_nod__WEBPACK_IMPORTED_MODULE_9__["default"])();
    var selectors = {
      errorSelector: this.options.priceRangeErrorSelector,
      fieldsetSelector: this.options.priceRangeFieldsetSelector,
      formSelector: this.options.priceRangeFormSelector,
      maxPriceSelector: this.options.priceRangeMaxPriceSelector,
      minPriceSelector: this.options.priceRangeMinPriceSelector
    };
    _utils_form_utils__WEBPACK_IMPORTED_MODULE_8__.Validators.setMinMaxPriceValidation(validator, selectors, this.options.validationErrorMessages);
    this.priceRangeValidator = validator;
  };

  _proto.restoreCollapsedFacetItems = function restoreCollapsedFacetItems() {
    var _this6 = this;

    var $navLists = $(this.options.facetNavListSelector); // Restore collapsed state for each facet

    $navLists.each(function (index, navList) {
      var $navList = $(navList);
      var id = $navList.attr('id');

      var shouldCollapse = _this6.collapsedFacetItems.includes(id);

      if (shouldCollapse) {
        _this6.collapseFacetItems($navList);
      } else {
        _this6.expandFacetItems($navList);
      }
    });
  };

  _proto.restoreCollapsedFacets = function restoreCollapsedFacets() {
    var _this7 = this;

    var $accordionToggles = $(this.options.accordionToggleSelector);
    $accordionToggles.each(function (index, accordionToggle) {
      var $accordionToggle = $(accordionToggle);
      var collapsible = $accordionToggle.data('collapsibleInstance');
      var id = collapsible.targetId;

      var shouldCollapse = _this7.collapsedFacets.includes(id);

      if (shouldCollapse) {
        _this7.collapseFacet($accordionToggle);
      } else {
        _this7.expandFacet($accordionToggle);
      }
    });
  };

  _proto.bindEvents = function bindEvents() {
    // Clean-up
    this.unbindEvents(); // DOM events

    $(window).on('statechange', this.onStateChange);
    $(window).on('popstate', this.onPopState);
    $(document).on('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).on('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).on('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).on('click', this.onClearFacet); // Hooks

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.on('sortBy-submitted', this.onSortBySubmit);
  };

  _proto.unbindEvents = function unbindEvents() {
    // DOM events
    $(window).off('statechange', this.onStateChange);
    $(window).off('popstate', this.onPopState);
    $(document).off('click', this.options.showMoreToggleSelector, this.onToggleClick);
    $(document).off('toggle.collapsible', this.options.accordionToggleSelector, this.onAccordionToggle);
    $(document).off('keyup', this.options.facetedSearchFilterItems, this.filterFacetItems);
    $(this.options.clearFacetSelector).off('click', this.onClearFacet); // Hooks

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('facetedSearch-facet-clicked', this.onFacetClick);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('facetedSearch-range-submitted', this.onRangeSubmit);
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_3__.hooks.off('sortBy-submitted', this.onSortBySubmit);
  };

  _proto.onClearFacet = function onClearFacet(event) {
    var $link = $(event.currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    event.stopPropagation(); // Update URL

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };

  _proto.onToggleClick = function onToggleClick(event) {
    var $toggle = $(event.currentTarget);
    var $navList = $($toggle.attr('href')); // Prevent default

    event.preventDefault(); // Toggle visible items

    this.toggleFacetItems($navList);
  };

  _proto.onFacetClick = function onFacetClick(event, currentTarget) {
    var $link = $(currentTarget);
    var url = $link.attr('href');
    event.preventDefault();
    $link.toggleClass('is-selected'); // Update URL

    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);

    if (this.options.modalOpen) {
      this.options.modal.close();
    }
  };

  _proto.onSortBySubmit = function onSortBySubmit(event, currentTarget) {
    var url = url__WEBPACK_IMPORTED_MODULE_4__.parse(window.location.href, true);
    var queryParams = $(currentTarget).serialize().split('=');
    url.query[queryParams[0]] = queryParams[1];
    delete url.query.page; // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead

    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    event.preventDefault();
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4__.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };

  _proto.onRangeSubmit = function onRangeSubmit(event, currentTarget) {
    event.preventDefault();

    if (!this.priceRangeValidator.areAll(_nod__WEBPACK_IMPORTED_MODULE_9__["default"].constants.VALID)) {
      return;
    }

    var url = url__WEBPACK_IMPORTED_MODULE_4__.parse(window.location.href, true);
    var queryParams = decodeURI($(currentTarget).serialize()).split('&');
    queryParams = _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].parseQueryParams(queryParams);

    for (var key in queryParams) {
      if (queryParams.hasOwnProperty(key)) {
        url.query[key] = queryParams[key];
      }
    } // Url object `query` is not a traditional JavaScript Object on all systems, clone it instead


    var urlQueryParams = {};
    Object.assign(urlQueryParams, url.query);
    _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url__WEBPACK_IMPORTED_MODULE_4__.format({
      pathname: url.pathname,
      search: _utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].buildQueryString(urlQueryParams)
    }));
  };

  _proto.onStateChange = function onStateChange() {
    this.updateView();
  };

  _proto.onAccordionToggle = function onAccordionToggle(event) {
    var $accordionToggle = $(event.currentTarget);
    var collapsible = $accordionToggle.data('collapsibleInstance');
    var id = collapsible.targetId;

    if (collapsible.isCollapsed) {
      this.collapsedFacets = lodash_union__WEBPACK_IMPORTED_MODULE_0___default()(this.collapsedFacets, [id]);
    } else {
      this.collapsedFacets = lodash_without__WEBPACK_IMPORTED_MODULE_1___default()(this.collapsedFacets, id);
    }
  };

  _proto.onPopState = function onPopState() {
    var currentUrl = window.location.href;
    var searchParams = new URLSearchParams(currentUrl); // If searchParams does not contain a page value then modify url query string to have page=1

    if (!searchParams.has('page')) {
      var linkUrl = $('.pagination-link').attr('href');
      var re = /page=[0-9]+/i;
      var updatedLinkUrl = linkUrl.replace(re, 'page=1');
      window.history.replaceState({}, document.title, updatedLinkUrl);
    }

    $(window).trigger('statechange');
  };

  return FacetedSearch;
}();

/* harmony default export */ __webpack_exports__["default"] = (FacetedSearch);

/***/ }),

/***/ "./assets/js/theme/common/utils/url-utils.js":
/*!***************************************************!*\
  !*** ./assets/js/theme/common/utils/url-utils.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

var urlUtils = {
  getUrl: function getUrl() {
    return "" + window.location.pathname + window.location.search;
  },
  goToUrl: function goToUrl(url) {
    window.history.pushState({}, document.title, url);
    $(window).trigger('statechange');
  },
  replaceParams: function replaceParams(url, params) {
    var parsed = url__WEBPACK_IMPORTED_MODULE_0__.parse(url, true);
    var param; // Let the formatter use the query object to build the new url

    parsed.search = null;

    for (param in params) {
      if (params.hasOwnProperty(param)) {
        parsed.query[param] = params[param];
      }
    }

    return url__WEBPACK_IMPORTED_MODULE_0__.format(parsed);
  },
  buildQueryString: function buildQueryString(queryData) {
    var out = '';
    var key;

    for (key in queryData) {
      if (queryData.hasOwnProperty(key)) {
        if (Array.isArray(queryData[key])) {
          var ndx = void 0;

          for (ndx in queryData[key]) {
            if (queryData[key].hasOwnProperty(ndx)) {
              out += "&" + key + "=" + queryData[key][ndx];
            }
          }
        } else {
          out += "&" + key + "=" + queryData[key];
        }
      }
    }

    return out.substring(1);
  },
  parseQueryParams: function parseQueryParams(queryData) {
    var params = {};

    for (var i = 0; i < queryData.length; i++) {
      var temp = queryData[i].split('=');

      if (temp[0] in params) {
        if (Array.isArray(params[temp[0]])) {
          params[temp[0]].push(temp[1]);
        } else {
          params[temp[0]] = [params[temp[0]], temp[1]];
        }
      } else {
        params[temp[0]] = temp[1];
      }
    }

    return params;
  }
};
/* harmony default export */ __webpack_exports__["default"] = (urlUtils);

/***/ }),

/***/ "./assets/js/theme/global/compare-products.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/global/compare-products.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function decrementCounter(counter, item) {
  var index = counter.indexOf(item);

  if (index > -1) {
    counter.splice(index, 1);
  }
}

function incrementCounter(counter, item) {
  counter.push(item);
}

function updateCounterNav(counter, $link, urls) {
  if (counter.length !== 0) {
    if (!$link.is('visible')) {
      $link.addClass('show');
    }

    $link.attr('href', urls.compare + "/" + counter.join('/'));
    $link.find('span.countPill').html(counter.length);
  } else {
    $link.removeClass('show');
  }
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(_ref) {
  var noCompareMessage = _ref.noCompareMessage,
      urls = _ref.urls;
  var compareCounter = [];
  var $compareLink = $('a[data-compare-nav]');
  $('body').on('compareReset', function () {
    var $checked = $('body').find('input[name="products\[\]"]:checked');
    compareCounter = $checked.length ? $checked.map(function (index, element) {
      return element.value;
    }).get() : [];
    updateCounterNav(compareCounter, $compareLink, urls);
  });
  $('body').triggerHandler('compareReset');
  $('body').on('click', '[data-compare-id]', function (event) {
    var product = event.currentTarget.value;
    var $clickedCompareLink = $('a[data-compare-nav]');

    if (event.currentTarget.checked) {
      incrementCounter(compareCounter, product);
    } else {
      decrementCounter(compareCounter, product);
    }

    updateCounterNav(compareCounter, $clickedCompareLink, urls);
  });
  $('body').on('click', 'a[data-compare-nav]', function () {
    var $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');

    if ($clickedCheckedInput.length <= 1) {
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.showAlertModal)(noCompareMessage);
      return false;
    }
  });
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXRhbG9nX2pzLWFzc2V0c19qc190aGVtZV9jb21tb25fZmFjZXRlZC1zZWFyY2hfanMtYXNzZXRzX2pzX3RoZW1lX2dsb2JhbF9jby0zZjVhZmUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBOztJQUVxQkc7OztBQUNqQix1QkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixvQ0FBTUEsT0FBTjtBQUVBQyxJQUFBQSxNQUFNLENBQUNDLGdCQUFQLENBQXdCLGNBQXhCLEVBQXdDLFlBQU07QUFDMUMsVUFBSUMsUUFBUSxDQUFDQyxhQUFULENBQXVCQyxFQUF2QixLQUE4QixNQUFsQyxFQUEwQztBQUN0Q0osUUFBQUEsTUFBTSxDQUFDSyxZQUFQLENBQW9CQyxPQUFwQixDQUE0QixjQUE1QixFQUE0QyxVQUE1QztBQUNIO0FBQ0osS0FKRDtBQUhpQjtBQVFwQjs7OztTQUVEQyx1QkFBQSxnQ0FBdUI7QUFDbkIsUUFBTUMsZUFBZSxHQUFHQyxDQUFDLENBQUMsZ0NBQUQsQ0FBekI7O0FBRUEsUUFBSVQsTUFBTSxDQUFDSyxZQUFQLENBQW9CSyxPQUFwQixDQUE0QixjQUE1QixDQUFKLEVBQWlEO0FBQzdDRixNQUFBQSxlQUFlLENBQUNHLEtBQWhCO0FBQ0FYLE1BQUFBLE1BQU0sQ0FBQ0ssWUFBUCxDQUFvQk8sVUFBcEIsQ0FBK0IsY0FBL0I7QUFDSDtBQUNKOztTQUVEQyxpQkFBQSx3QkFBZUMsS0FBZixFQUFzQkMsYUFBdEIsRUFBcUM7QUFDakMsUUFBTUMsR0FBRyxHQUFHbkIsc0NBQUEsQ0FBVUcsTUFBTSxDQUFDa0IsUUFBUCxDQUFnQkMsSUFBMUIsRUFBZ0MsSUFBaEMsQ0FBWjtBQUNBLFFBQU1DLFdBQVcsR0FBR1gsQ0FBQyxDQUFDTSxhQUFELENBQUQsQ0FBaUJNLFNBQWpCLEdBQTZCQyxLQUE3QixDQUFtQyxHQUFuQyxDQUFwQjtBQUVBTixJQUFBQSxHQUFHLENBQUNPLEtBQUosQ0FBVUgsV0FBVyxDQUFDLENBQUQsQ0FBckIsSUFBNEJBLFdBQVcsQ0FBQyxDQUFELENBQXZDO0FBQ0EsV0FBT0osR0FBRyxDQUFDTyxLQUFKLENBQVVDLElBQWpCO0FBRUFWLElBQUFBLEtBQUssQ0FBQ1csY0FBTjtBQUNBekIsSUFBQUEsTUFBTSxDQUFDa0IsUUFBUCxHQUFrQnJCLHVDQUFBLENBQVc7QUFBRThCLE1BQUFBLFFBQVEsRUFBRVgsR0FBRyxDQUFDVyxRQUFoQjtBQUEwQkMsTUFBQUEsTUFBTSxFQUFFaEMsZ0ZBQUEsQ0FBMEJvQixHQUFHLENBQUNPLEtBQTlCO0FBQWxDLEtBQVgsQ0FBbEI7QUFDSDs7O0VBN0JvQzVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNKekM7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQSxJQUFNeUMsY0FBYyxHQUFHO0FBQ25CQyxFQUFBQSx1QkFBdUIsRUFBRSw0RUFETjtBQUVuQkMsRUFBQUEsZUFBZSxFQUFFLHlCQUZFO0FBR25CQyxFQUFBQSxrQkFBa0IsRUFBRSx5Q0FIRDtBQUluQkMsRUFBQUEsaUJBQWlCLEVBQUUsd0JBSkE7QUFLbkJDLEVBQUFBLG9CQUFvQixFQUFFLHlCQUxIO0FBTW5CQyxFQUFBQSx1QkFBdUIsRUFBRSx1Q0FOTjtBQU9uQkMsRUFBQUEsMEJBQTBCLEVBQUUsa0NBUFQ7QUFRbkJDLEVBQUFBLHNCQUFzQixFQUFFLG1CQVJMO0FBU25CQyxFQUFBQSwwQkFBMEIsRUFBRSxvQ0FUVDtBQVVuQkMsRUFBQUEsMEJBQTBCLEVBQUUsb0NBVlQ7QUFXbkJDLEVBQUFBLHNCQUFzQixFQUFFLCtDQVhMO0FBWW5CQyxFQUFBQSx3QkFBd0IsRUFBRSx3Q0FaUDtBQWFuQkMsRUFBQUEsS0FBSyxFQUFFakIseURBQVksQ0FBQyxRQUFELENBQVosQ0FBdUIsQ0FBdkIsQ0FiWTtBQWNuQmtCLEVBQUFBLFNBQVMsRUFBRTtBQWRRLENBQXZCO0FBaUJBO0FBQ0E7QUFDQTs7SUFDTUM7QUFDRjtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0kseUJBQVlDLGNBQVosRUFBNEJDLFFBQTVCLEVBQXNDQyxPQUF0QyxFQUErQztBQUFBOztBQUMzQztBQUNBLFNBQUtGLGNBQUwsR0FBc0JBLGNBQXRCO0FBQ0EsU0FBS0MsUUFBTCxHQUFnQkEsUUFBaEI7QUFDQSxTQUFLQyxPQUFMLEdBQWUscURBQVMsRUFBVCxFQUFhbEIsY0FBYixFQUE2QmtCLE9BQTdCLENBQWY7QUFDQSxTQUFLQyxlQUFMLEdBQXVCLEVBQXZCO0FBQ0EsU0FBS0MsbUJBQUwsR0FBMkIsRUFBM0IsQ0FOMkMsQ0FRM0M7O0FBQ0F2QixJQUFBQSx3REFBa0IsR0FUeUIsQ0FXM0M7O0FBQ0EsU0FBS3dCLGtCQUFMLEdBWjJDLENBYzNDOztBQUNBaEQsSUFBQUEsQ0FBQyxDQUFDLEtBQUs2QyxPQUFMLENBQWFiLG9CQUFkLENBQUQsQ0FBcUNpQixJQUFyQyxDQUEwQyxVQUFDQyxLQUFELEVBQVFDLE9BQVIsRUFBb0I7QUFDMUQsV0FBSSxDQUFDQyxrQkFBTCxDQUF3QnBELENBQUMsQ0FBQ21ELE9BQUQsQ0FBekI7QUFDSCxLQUZELEVBZjJDLENBbUIzQzs7QUFDQW5ELElBQUFBLENBQUMsQ0FBQyxLQUFLNkMsT0FBTCxDQUFhakIsdUJBQWQsQ0FBRCxDQUF3Q3FCLElBQXhDLENBQTZDLFVBQUNDLEtBQUQsRUFBUUcsZUFBUixFQUE0QjtBQUNyRSxVQUFNQyxnQkFBZ0IsR0FBR3RELENBQUMsQ0FBQ3FELGVBQUQsQ0FBMUI7QUFDQSxVQUFNRSxXQUFXLEdBQUdELGdCQUFnQixDQUFDRSxJQUFqQixDQUFzQixxQkFBdEIsQ0FBcEI7O0FBRUEsVUFBSUQsV0FBVyxDQUFDRSxXQUFoQixFQUE2QjtBQUN6QixhQUFJLENBQUNYLGVBQUwsQ0FBcUJZLElBQXJCLENBQTBCSCxXQUFXLENBQUNJLFFBQXRDO0FBQ0g7QUFDSixLQVBELEVBcEIyQyxDQTZCM0M7QUFDQTs7QUFDQUMsSUFBQUEsVUFBVSxDQUFDLFlBQU07QUFDYixVQUFJNUQsQ0FBQyxDQUFDLEtBQUksQ0FBQzZDLE9BQUwsQ0FBYWQsaUJBQWQsQ0FBRCxDQUFrQzhCLEVBQWxDLENBQXFDLFNBQXJDLENBQUosRUFBcUQ7QUFDakQsYUFBSSxDQUFDQyxpQkFBTDtBQUNIO0FBQ0osS0FKUyxDQUFWLENBL0IyQyxDQXFDM0M7O0FBQ0EsU0FBS0MsYUFBTCxHQUFxQixLQUFLQSxhQUFMLENBQW1CQyxJQUFuQixDQUF3QixJQUF4QixDQUFyQjtBQUNBLFNBQUtDLGFBQUwsR0FBcUIsS0FBS0EsYUFBTCxDQUFtQkQsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBckI7QUFDQSxTQUFLRSxpQkFBTCxHQUF5QixLQUFLQSxpQkFBTCxDQUF1QkYsSUFBdkIsQ0FBNEIsSUFBNUIsQ0FBekI7QUFDQSxTQUFLRyxZQUFMLEdBQW9CLEtBQUtBLFlBQUwsQ0FBa0JILElBQWxCLENBQXVCLElBQXZCLENBQXBCO0FBQ0EsU0FBS0ksWUFBTCxHQUFvQixLQUFLQSxZQUFMLENBQWtCSixJQUFsQixDQUF1QixJQUF2QixDQUFwQjtBQUNBLFNBQUtLLGFBQUwsR0FBcUIsS0FBS0EsYUFBTCxDQUFtQkwsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FBckI7QUFDQSxTQUFLNUQsY0FBTCxHQUFzQixLQUFLQSxjQUFMLENBQW9CNEQsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBdEI7QUFDQSxTQUFLTSxnQkFBTCxHQUF3QixLQUFLQSxnQkFBTCxDQUFzQk4sSUFBdEIsQ0FBMkIsSUFBM0IsQ0FBeEI7QUFFQSxTQUFLTyxVQUFMO0FBQ0gsSUFFRDs7Ozs7U0FDQUMsY0FBQSxxQkFBWUMsT0FBWixFQUFxQjtBQUNqQixRQUFJQSxPQUFKLEVBQWE7QUFDVCxXQUFLN0IsUUFBTCxDQUFjNkIsT0FBZDtBQUNILEtBSGdCLENBS2pCOzs7QUFDQWpELElBQUFBLHdEQUFrQixHQU5ELENBUWpCOztBQUNBLFNBQUt3QixrQkFBTCxHQVRpQixDQVdqQjs7QUFDQSxTQUFLMEIsc0JBQUw7QUFDQSxTQUFLQywwQkFBTCxHQWJpQixDQWVqQjs7QUFDQSxTQUFLSixVQUFMO0FBQ0g7O1NBRURLLGFBQUEsc0JBQWE7QUFBQTs7QUFDVDVFLElBQUFBLENBQUMsQ0FBQyxLQUFLNkMsT0FBTCxDQUFhaEIsZUFBZCxDQUFELENBQWdDZ0QsSUFBaEM7QUFFQXZELElBQUFBLG1FQUFBLENBQVluQywrREFBQSxFQUFaLEVBQStCLEtBQUt3RCxjQUFwQyxFQUFvRCxVQUFDcUMsR0FBRCxFQUFNUCxPQUFOLEVBQWtCO0FBQ2xFekUsTUFBQUEsQ0FBQyxDQUFDLE1BQUksQ0FBQzZDLE9BQUwsQ0FBYWhCLGVBQWQsQ0FBRCxDQUFnQ29ELElBQWhDOztBQUVBLFVBQUlELEdBQUosRUFBUztBQUNMLGNBQU0sSUFBSUUsS0FBSixDQUFVRixHQUFWLENBQU47QUFDSCxPQUxpRSxDQU9sRTs7O0FBQ0EsWUFBSSxDQUFDUixXQUFMLENBQWlCQyxPQUFqQjtBQUNILEtBVEQ7QUFVSDs7U0FFRFUsbUJBQUEsMEJBQWlCQyxRQUFqQixFQUEyQjtBQUN2QixRQUFNekYsRUFBRSxHQUFHeUYsUUFBUSxDQUFDQyxJQUFULENBQWMsSUFBZCxDQUFYLENBRHVCLENBR3ZCOztBQUNBLFNBQUt0QyxtQkFBTCxHQUEyQixzREFBVSxLQUFLQSxtQkFBZixFQUFvQ3BELEVBQXBDLENBQTNCO0FBQ0g7O1NBRUR5RCxxQkFBQSw0QkFBbUJnQyxRQUFuQixFQUE2QjtBQUN6QixRQUFNekYsRUFBRSxHQUFHeUYsUUFBUSxDQUFDQyxJQUFULENBQWMsSUFBZCxDQUFYO0FBQ0EsUUFBTUMsY0FBYyxHQUFHRixRQUFRLENBQUM1QixJQUFULENBQWMsZ0JBQWQsQ0FBdkI7O0FBRUEsUUFBSThCLGNBQUosRUFBb0I7QUFDaEIsV0FBS3ZDLG1CQUFMLEdBQTJCLG9EQUFRLEtBQUtBLG1CQUFiLEVBQWtDLENBQUNwRCxFQUFELENBQWxDLENBQTNCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS29ELG1CQUFMLEdBQTJCLHNEQUFVLEtBQUtBLG1CQUFmLEVBQW9DcEQsRUFBcEMsQ0FBM0I7QUFDSDtBQUNKOztTQUVENEYsbUJBQUEsMEJBQWlCSCxRQUFqQixFQUEyQjtBQUN2QixRQUFNekYsRUFBRSxHQUFHeUYsUUFBUSxDQUFDQyxJQUFULENBQWMsSUFBZCxDQUFYLENBRHVCLENBR3ZCOztBQUNBLFFBQUksS0FBS3RDLG1CQUFMLENBQXlCeUMsUUFBekIsQ0FBa0M3RixFQUFsQyxDQUFKLEVBQTJDO0FBQ3ZDLFdBQUs4RixtQkFBTCxDQUF5QkwsUUFBekI7QUFFQSxhQUFPLElBQVA7QUFDSDs7QUFFRCxTQUFLaEMsa0JBQUwsQ0FBd0JnQyxRQUF4QjtBQUVBLFdBQU8sS0FBUDtBQUNIOztTQUVESyxzQkFBQSw2QkFBb0JMLFFBQXBCLEVBQThCO0FBQUE7O0FBQzFCLFFBQU1NLEtBQUssR0FBR04sUUFBUSxDQUFDNUIsSUFBVCxDQUFjLE9BQWQsQ0FBZDtBQUNBLFFBQU1tQyxRQUFRLEdBQUd4RywrREFBQSxFQUFqQjs7QUFFQSxRQUFJLEtBQUt3RCxjQUFMLENBQW9CaUQsUUFBeEIsRUFBa0M7QUFDOUJ0RSxNQUFBQSxtRUFBQSxDQUFZcUUsUUFBWixFQUFzQjtBQUNsQkUsUUFBQUEsUUFBUSxFQUFFLEtBQUtsRCxjQUFMLENBQW9CaUQsUUFEWjtBQUVsQkUsUUFBQUEsTUFBTSxFQUFFO0FBQ0pDLFVBQUFBLFFBQVEsRUFBRUw7QUFETjtBQUZVLE9BQXRCLEVBS0csVUFBQ1YsR0FBRCxFQUFNZ0IsUUFBTixFQUFtQjtBQUNsQixZQUFJaEIsR0FBSixFQUFTO0FBQ0wsZ0JBQU0sSUFBSUUsS0FBSixDQUFVRixHQUFWLENBQU47QUFDSDs7QUFFRCxjQUFJLENBQUNuQyxPQUFMLENBQWFMLEtBQWIsQ0FBbUJ5RCxJQUFuQjs7QUFDQSxjQUFJLENBQUNwRCxPQUFMLENBQWFKLFNBQWIsR0FBeUIsSUFBekI7O0FBQ0EsY0FBSSxDQUFDSSxPQUFMLENBQWFMLEtBQWIsQ0FBbUIwRCxhQUFuQixDQUFpQ0YsUUFBakM7QUFDSCxPQWJEO0FBY0g7O0FBRUQsU0FBSzVDLGtCQUFMLENBQXdCZ0MsUUFBeEI7QUFFQSxXQUFPLEtBQVA7QUFDSDs7U0FFRGQsbUJBQUEsMEJBQWlCakUsS0FBakIsRUFBd0I7QUFDcEIsUUFBTThGLE1BQU0sR0FBR25HLENBQUMsQ0FBQyxlQUFELENBQWhCO0FBQ0EsUUFBTWMsS0FBSyxHQUFHZCxDQUFDLENBQUNLLEtBQUssQ0FBQ0MsYUFBUCxDQUFELENBQXVCOEYsR0FBdkIsR0FBNkJDLFdBQTdCLEVBQWQ7QUFFQUYsSUFBQUEsTUFBTSxDQUFDbEQsSUFBUCxDQUFZLFVBQUNDLEtBQUQsRUFBUW9ELE9BQVIsRUFBb0I7QUFDNUIsVUFBTUMsSUFBSSxHQUFHdkcsQ0FBQyxDQUFDc0csT0FBRCxDQUFELENBQVdDLElBQVgsR0FBa0JGLFdBQWxCLEVBQWI7O0FBQ0EsVUFBSUUsSUFBSSxDQUFDQyxPQUFMLENBQWExRixLQUFiLE1BQXdCLENBQUMsQ0FBN0IsRUFBZ0M7QUFDNUJkLFFBQUFBLENBQUMsQ0FBQ3NHLE9BQUQsQ0FBRCxDQUFXekIsSUFBWDtBQUNILE9BRkQsTUFFTztBQUNIN0UsUUFBQUEsQ0FBQyxDQUFDc0csT0FBRCxDQUFELENBQVdyQixJQUFYO0FBQ0g7QUFDSixLQVBEO0FBUUg7O1NBRUR3QixjQUFBLHFCQUFZbkQsZ0JBQVosRUFBOEI7QUFDMUIsUUFBTUMsV0FBVyxHQUFHRCxnQkFBZ0IsQ0FBQ0UsSUFBakIsQ0FBc0IscUJBQXRCLENBQXBCO0FBRUFELElBQUFBLFdBQVcsQ0FBQzBDLElBQVo7QUFDSDs7U0FFRFMsZ0JBQUEsdUJBQWNwRCxnQkFBZCxFQUFnQztBQUM1QixRQUFNQyxXQUFXLEdBQUdELGdCQUFnQixDQUFDRSxJQUFqQixDQUFzQixxQkFBdEIsQ0FBcEI7QUFFQUQsSUFBQUEsV0FBVyxDQUFDb0QsS0FBWjtBQUNIOztTQUVEN0Msb0JBQUEsNkJBQW9CO0FBQUE7O0FBQ2hCLFFBQU04QyxpQkFBaUIsR0FBRzVHLENBQUMsQ0FBQyxLQUFLNkMsT0FBTCxDQUFhakIsdUJBQWQsQ0FBM0I7QUFFQWdGLElBQUFBLGlCQUFpQixDQUFDM0QsSUFBbEIsQ0FBdUIsVUFBQ0MsS0FBRCxFQUFRRyxlQUFSLEVBQTRCO0FBQy9DLFVBQU1DLGdCQUFnQixHQUFHdEQsQ0FBQyxDQUFDcUQsZUFBRCxDQUExQjs7QUFFQSxZQUFJLENBQUNxRCxhQUFMLENBQW1CcEQsZ0JBQW5CO0FBQ0gsS0FKRDtBQUtIOztTQUVEdUQsa0JBQUEsMkJBQWtCO0FBQUE7O0FBQ2QsUUFBTUQsaUJBQWlCLEdBQUc1RyxDQUFDLENBQUMsS0FBSzZDLE9BQUwsQ0FBYWpCLHVCQUFkLENBQTNCO0FBRUFnRixJQUFBQSxpQkFBaUIsQ0FBQzNELElBQWxCLENBQXVCLFVBQUNDLEtBQUQsRUFBUUcsZUFBUixFQUE0QjtBQUMvQyxVQUFNQyxnQkFBZ0IsR0FBR3RELENBQUMsQ0FBQ3FELGVBQUQsQ0FBMUI7O0FBRUEsWUFBSSxDQUFDb0QsV0FBTCxDQUFpQm5ELGdCQUFqQjtBQUNILEtBSkQ7QUFLSCxJQUVEOzs7U0FDQU4scUJBQUEsOEJBQXFCO0FBQ2pCLFFBQUloRCxDQUFDLENBQUMsS0FBSzZDLE9BQUwsQ0FBYVYsc0JBQWQsQ0FBRCxDQUF1QzJFLE1BQXZDLEtBQWtELENBQXRELEVBQXlEO0FBQ3JEO0FBQ0g7O0FBRUQsUUFBTUMsU0FBUyxHQUFHckYsZ0RBQUcsRUFBckI7QUFDQSxRQUFNc0YsU0FBUyxHQUFHO0FBQ2RDLE1BQUFBLGFBQWEsRUFBRSxLQUFLcEUsT0FBTCxDQUFhWix1QkFEZDtBQUVkaUYsTUFBQUEsZ0JBQWdCLEVBQUUsS0FBS3JFLE9BQUwsQ0FBYVgsMEJBRmpCO0FBR2RpRixNQUFBQSxZQUFZLEVBQUUsS0FBS3RFLE9BQUwsQ0FBYVYsc0JBSGI7QUFJZGlGLE1BQUFBLGdCQUFnQixFQUFFLEtBQUt2RSxPQUFMLENBQWFULDBCQUpqQjtBQUtkaUYsTUFBQUEsZ0JBQWdCLEVBQUUsS0FBS3hFLE9BQUwsQ0FBYVI7QUFMakIsS0FBbEI7QUFRQVosSUFBQUEsa0ZBQUEsQ0FBb0NzRixTQUFwQyxFQUErQ0MsU0FBL0MsRUFBMEQsS0FBS25FLE9BQUwsQ0FBYTBFLHVCQUF2RTtBQUVBLFNBQUtDLG1CQUFMLEdBQTJCVCxTQUEzQjtBQUNIOztTQUVEcEMsNkJBQUEsc0NBQTZCO0FBQUE7O0FBQ3pCLFFBQU04QyxTQUFTLEdBQUd6SCxDQUFDLENBQUMsS0FBSzZDLE9BQUwsQ0FBYWIsb0JBQWQsQ0FBbkIsQ0FEeUIsQ0FHekI7O0FBQ0F5RixJQUFBQSxTQUFTLENBQUN4RSxJQUFWLENBQWUsVUFBQ0MsS0FBRCxFQUFRQyxPQUFSLEVBQW9CO0FBQy9CLFVBQU1pQyxRQUFRLEdBQUdwRixDQUFDLENBQUNtRCxPQUFELENBQWxCO0FBQ0EsVUFBTXhELEVBQUUsR0FBR3lGLFFBQVEsQ0FBQ0MsSUFBVCxDQUFjLElBQWQsQ0FBWDs7QUFDQSxVQUFNcUMsY0FBYyxHQUFHLE1BQUksQ0FBQzNFLG1CQUFMLENBQXlCeUMsUUFBekIsQ0FBa0M3RixFQUFsQyxDQUF2Qjs7QUFFQSxVQUFJK0gsY0FBSixFQUFvQjtBQUNoQixjQUFJLENBQUN0RSxrQkFBTCxDQUF3QmdDLFFBQXhCO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsY0FBSSxDQUFDRCxnQkFBTCxDQUFzQkMsUUFBdEI7QUFDSDtBQUNKLEtBVkQ7QUFXSDs7U0FFRFYseUJBQUEsa0NBQXlCO0FBQUE7O0FBQ3JCLFFBQU1rQyxpQkFBaUIsR0FBRzVHLENBQUMsQ0FBQyxLQUFLNkMsT0FBTCxDQUFhakIsdUJBQWQsQ0FBM0I7QUFFQWdGLElBQUFBLGlCQUFpQixDQUFDM0QsSUFBbEIsQ0FBdUIsVUFBQ0MsS0FBRCxFQUFRRyxlQUFSLEVBQTRCO0FBQy9DLFVBQU1DLGdCQUFnQixHQUFHdEQsQ0FBQyxDQUFDcUQsZUFBRCxDQUExQjtBQUNBLFVBQU1FLFdBQVcsR0FBR0QsZ0JBQWdCLENBQUNFLElBQWpCLENBQXNCLHFCQUF0QixDQUFwQjtBQUNBLFVBQU03RCxFQUFFLEdBQUc0RCxXQUFXLENBQUNJLFFBQXZCOztBQUNBLFVBQU0rRCxjQUFjLEdBQUcsTUFBSSxDQUFDNUUsZUFBTCxDQUFxQjBDLFFBQXJCLENBQThCN0YsRUFBOUIsQ0FBdkI7O0FBRUEsVUFBSStILGNBQUosRUFBb0I7QUFDaEIsY0FBSSxDQUFDaEIsYUFBTCxDQUFtQnBELGdCQUFuQjtBQUNILE9BRkQsTUFFTztBQUNILGNBQUksQ0FBQ21ELFdBQUwsQ0FBaUJuRCxnQkFBakI7QUFDSDtBQUNKLEtBWEQ7QUFZSDs7U0FFRGlCLGFBQUEsc0JBQWE7QUFDVDtBQUNBLFNBQUtvRCxZQUFMLEdBRlMsQ0FJVDs7QUFDQTNILElBQUFBLENBQUMsQ0FBQ1QsTUFBRCxDQUFELENBQVVxSSxFQUFWLENBQWEsYUFBYixFQUE0QixLQUFLN0QsYUFBakM7QUFDQS9ELElBQUFBLENBQUMsQ0FBQ1QsTUFBRCxDQUFELENBQVVxSSxFQUFWLENBQWEsVUFBYixFQUF5QixLQUFLQyxVQUE5QjtBQUNBN0gsSUFBQUEsQ0FBQyxDQUFDUCxRQUFELENBQUQsQ0FBWW1JLEVBQVosQ0FBZSxPQUFmLEVBQXdCLEtBQUsvRSxPQUFMLENBQWFQLHNCQUFyQyxFQUE2RCxLQUFLMkIsYUFBbEU7QUFDQWpFLElBQUFBLENBQUMsQ0FBQ1AsUUFBRCxDQUFELENBQVltSSxFQUFaLENBQWUsb0JBQWYsRUFBcUMsS0FBSy9FLE9BQUwsQ0FBYWpCLHVCQUFsRCxFQUEyRSxLQUFLc0MsaUJBQWhGO0FBQ0FsRSxJQUFBQSxDQUFDLENBQUNQLFFBQUQsQ0FBRCxDQUFZbUksRUFBWixDQUFlLE9BQWYsRUFBd0IsS0FBSy9FLE9BQUwsQ0FBYU4sd0JBQXJDLEVBQStELEtBQUsrQixnQkFBcEU7QUFDQXRFLElBQUFBLENBQUMsQ0FBQyxLQUFLNkMsT0FBTCxDQUFhZixrQkFBZCxDQUFELENBQW1DOEYsRUFBbkMsQ0FBc0MsT0FBdEMsRUFBK0MsS0FBS3pELFlBQXBELEVBVlMsQ0FZVDs7QUFDQTlDLElBQUFBLGdFQUFBLENBQVMsNkJBQVQsRUFBd0MsS0FBSytDLFlBQTdDO0FBQ0EvQyxJQUFBQSxnRUFBQSxDQUFTLCtCQUFULEVBQTBDLEtBQUtnRCxhQUEvQztBQUNBaEQsSUFBQUEsZ0VBQUEsQ0FBUyxrQkFBVCxFQUE2QixLQUFLakIsY0FBbEM7QUFDSDs7U0FFRHVILGVBQUEsd0JBQWU7QUFDWDtBQUNBM0gsSUFBQUEsQ0FBQyxDQUFDVCxNQUFELENBQUQsQ0FBVXVJLEdBQVYsQ0FBYyxhQUFkLEVBQTZCLEtBQUsvRCxhQUFsQztBQUNBL0QsSUFBQUEsQ0FBQyxDQUFDVCxNQUFELENBQUQsQ0FBVXVJLEdBQVYsQ0FBYyxVQUFkLEVBQTBCLEtBQUtELFVBQS9CO0FBQ0E3SCxJQUFBQSxDQUFDLENBQUNQLFFBQUQsQ0FBRCxDQUFZcUksR0FBWixDQUFnQixPQUFoQixFQUF5QixLQUFLakYsT0FBTCxDQUFhUCxzQkFBdEMsRUFBOEQsS0FBSzJCLGFBQW5FO0FBQ0FqRSxJQUFBQSxDQUFDLENBQUNQLFFBQUQsQ0FBRCxDQUFZcUksR0FBWixDQUFnQixvQkFBaEIsRUFBc0MsS0FBS2pGLE9BQUwsQ0FBYWpCLHVCQUFuRCxFQUE0RSxLQUFLc0MsaUJBQWpGO0FBQ0FsRSxJQUFBQSxDQUFDLENBQUNQLFFBQUQsQ0FBRCxDQUFZcUksR0FBWixDQUFnQixPQUFoQixFQUF5QixLQUFLakYsT0FBTCxDQUFhTix3QkFBdEMsRUFBZ0UsS0FBSytCLGdCQUFyRTtBQUNBdEUsSUFBQUEsQ0FBQyxDQUFDLEtBQUs2QyxPQUFMLENBQWFmLGtCQUFkLENBQUQsQ0FBbUNnRyxHQUFuQyxDQUF1QyxPQUF2QyxFQUFnRCxLQUFLM0QsWUFBckQsRUFQVyxDQVNYOztBQUNBOUMsSUFBQUEsaUVBQUEsQ0FBVSw2QkFBVixFQUF5QyxLQUFLK0MsWUFBOUM7QUFDQS9DLElBQUFBLGlFQUFBLENBQVUsK0JBQVYsRUFBMkMsS0FBS2dELGFBQWhEO0FBQ0FoRCxJQUFBQSxpRUFBQSxDQUFVLGtCQUFWLEVBQThCLEtBQUtqQixjQUFuQztBQUNIOztTQUVEK0QsZUFBQSxzQkFBYTlELEtBQWIsRUFBb0I7QUFDaEIsUUFBTTBILEtBQUssR0FBRy9ILENBQUMsQ0FBQ0ssS0FBSyxDQUFDQyxhQUFQLENBQWY7QUFDQSxRQUFNQyxHQUFHLEdBQUd3SCxLQUFLLENBQUMxQyxJQUFOLENBQVcsTUFBWCxDQUFaO0FBRUFoRixJQUFBQSxLQUFLLENBQUNXLGNBQU47QUFDQVgsSUFBQUEsS0FBSyxDQUFDMkgsZUFBTixHQUxnQixDQU9oQjs7QUFDQTdJLElBQUFBLGdFQUFBLENBQWlCb0IsR0FBakI7QUFDSDs7U0FFRDBELGdCQUFBLHVCQUFjNUQsS0FBZCxFQUFxQjtBQUNqQixRQUFNNkgsT0FBTyxHQUFHbEksQ0FBQyxDQUFDSyxLQUFLLENBQUNDLGFBQVAsQ0FBakI7QUFDQSxRQUFNOEUsUUFBUSxHQUFHcEYsQ0FBQyxDQUFDa0ksT0FBTyxDQUFDN0MsSUFBUixDQUFhLE1BQWIsQ0FBRCxDQUFsQixDQUZpQixDQUlqQjs7QUFDQWhGLElBQUFBLEtBQUssQ0FBQ1csY0FBTixHQUxpQixDQU9qQjs7QUFDQSxTQUFLdUUsZ0JBQUwsQ0FBc0JILFFBQXRCO0FBQ0g7O1NBRURoQixlQUFBLHNCQUFhL0QsS0FBYixFQUFvQkMsYUFBcEIsRUFBbUM7QUFDL0IsUUFBTXlILEtBQUssR0FBRy9ILENBQUMsQ0FBQ00sYUFBRCxDQUFmO0FBQ0EsUUFBTUMsR0FBRyxHQUFHd0gsS0FBSyxDQUFDMUMsSUFBTixDQUFXLE1BQVgsQ0FBWjtBQUVBaEYsSUFBQUEsS0FBSyxDQUFDVyxjQUFOO0FBRUErRyxJQUFBQSxLQUFLLENBQUNJLFdBQU4sQ0FBa0IsYUFBbEIsRUFOK0IsQ0FRL0I7O0FBQ0FoSixJQUFBQSxnRUFBQSxDQUFpQm9CLEdBQWpCOztBQUVBLFFBQUksS0FBS3NDLE9BQUwsQ0FBYUosU0FBakIsRUFBNEI7QUFDeEIsV0FBS0ksT0FBTCxDQUFhTCxLQUFiLENBQW1CbUUsS0FBbkI7QUFDSDtBQUNKOztTQUVEdkcsaUJBQUEsd0JBQWVDLEtBQWYsRUFBc0JDLGFBQXRCLEVBQXFDO0FBQ2pDLFFBQU1DLEdBQUcsR0FBR25CLHNDQUFBLENBQVVHLE1BQU0sQ0FBQ2tCLFFBQVAsQ0FBZ0JDLElBQTFCLEVBQWdDLElBQWhDLENBQVo7QUFDQSxRQUFNQyxXQUFXLEdBQUdYLENBQUMsQ0FBQ00sYUFBRCxDQUFELENBQWlCTSxTQUFqQixHQUE2QkMsS0FBN0IsQ0FBbUMsR0FBbkMsQ0FBcEI7QUFFQU4sSUFBQUEsR0FBRyxDQUFDTyxLQUFKLENBQVVILFdBQVcsQ0FBQyxDQUFELENBQXJCLElBQTRCQSxXQUFXLENBQUMsQ0FBRCxDQUF2QztBQUNBLFdBQU9KLEdBQUcsQ0FBQ08sS0FBSixDQUFVQyxJQUFqQixDQUxpQyxDQU9qQzs7QUFDQSxRQUFNcUgsY0FBYyxHQUFHLEVBQXZCO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjRixjQUFkLEVBQThCN0gsR0FBRyxDQUFDTyxLQUFsQztBQUVBVCxJQUFBQSxLQUFLLENBQUNXLGNBQU47QUFFQTdCLElBQUFBLGdFQUFBLENBQWlCQyx1Q0FBQSxDQUFXO0FBQUU4QixNQUFBQSxRQUFRLEVBQUVYLEdBQUcsQ0FBQ1csUUFBaEI7QUFBMEJDLE1BQUFBLE1BQU0sRUFBRWhDLHlFQUFBLENBQTBCaUosY0FBMUI7QUFBbEMsS0FBWCxDQUFqQjtBQUNIOztTQUVEL0QsZ0JBQUEsdUJBQWNoRSxLQUFkLEVBQXFCQyxhQUFyQixFQUFvQztBQUNoQ0QsSUFBQUEsS0FBSyxDQUFDVyxjQUFOOztBQUVBLFFBQUksQ0FBQyxLQUFLd0csbUJBQUwsQ0FBeUJlLE1BQXpCLENBQWdDN0csNERBQWhDLENBQUwsRUFBMkQ7QUFDdkQ7QUFDSDs7QUFFRCxRQUFNbkIsR0FBRyxHQUFHbkIsc0NBQUEsQ0FBVUcsTUFBTSxDQUFDa0IsUUFBUCxDQUFnQkMsSUFBMUIsRUFBZ0MsSUFBaEMsQ0FBWjtBQUNBLFFBQUlDLFdBQVcsR0FBRytILFNBQVMsQ0FBQzFJLENBQUMsQ0FBQ00sYUFBRCxDQUFELENBQWlCTSxTQUFqQixFQUFELENBQVQsQ0FBd0NDLEtBQXhDLENBQThDLEdBQTlDLENBQWxCO0FBQ0FGLElBQUFBLFdBQVcsR0FBR3hCLHlFQUFBLENBQTBCd0IsV0FBMUIsQ0FBZDs7QUFFQSxTQUFLLElBQU1pSSxHQUFYLElBQWtCakksV0FBbEIsRUFBK0I7QUFDM0IsVUFBSUEsV0FBVyxDQUFDa0ksY0FBWixDQUEyQkQsR0FBM0IsQ0FBSixFQUFxQztBQUNqQ3JJLFFBQUFBLEdBQUcsQ0FBQ08sS0FBSixDQUFVOEgsR0FBVixJQUFpQmpJLFdBQVcsQ0FBQ2lJLEdBQUQsQ0FBNUI7QUFDSDtBQUNKLEtBZitCLENBaUJoQzs7O0FBQ0EsUUFBTVIsY0FBYyxHQUFHLEVBQXZCO0FBQ0FDLElBQUFBLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjRixjQUFkLEVBQThCN0gsR0FBRyxDQUFDTyxLQUFsQztBQUVBM0IsSUFBQUEsZ0VBQUEsQ0FBaUJDLHVDQUFBLENBQVc7QUFBRThCLE1BQUFBLFFBQVEsRUFBRVgsR0FBRyxDQUFDVyxRQUFoQjtBQUEwQkMsTUFBQUEsTUFBTSxFQUFFaEMseUVBQUEsQ0FBMEJpSixjQUExQjtBQUFsQyxLQUFYLENBQWpCO0FBQ0g7O1NBRURyRSxnQkFBQSx5QkFBZ0I7QUFDWixTQUFLYSxVQUFMO0FBQ0g7O1NBRURWLG9CQUFBLDJCQUFrQjdELEtBQWxCLEVBQXlCO0FBQ3JCLFFBQU1pRCxnQkFBZ0IsR0FBR3RELENBQUMsQ0FBQ0ssS0FBSyxDQUFDQyxhQUFQLENBQTFCO0FBQ0EsUUFBTWlELFdBQVcsR0FBR0QsZ0JBQWdCLENBQUNFLElBQWpCLENBQXNCLHFCQUF0QixDQUFwQjtBQUNBLFFBQU03RCxFQUFFLEdBQUc0RCxXQUFXLENBQUNJLFFBQXZCOztBQUVBLFFBQUlKLFdBQVcsQ0FBQ0UsV0FBaEIsRUFBNkI7QUFDekIsV0FBS1gsZUFBTCxHQUF1QixvREFBUSxLQUFLQSxlQUFiLEVBQThCLENBQUNuRCxFQUFELENBQTlCLENBQXZCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS21ELGVBQUwsR0FBdUIsc0RBQVUsS0FBS0EsZUFBZixFQUFnQ25ELEVBQWhDLENBQXZCO0FBQ0g7QUFDSjs7U0FFRGtJLGFBQUEsc0JBQWE7QUFDVCxRQUFNaUIsVUFBVSxHQUFHdkosTUFBTSxDQUFDa0IsUUFBUCxDQUFnQkMsSUFBbkM7QUFDQSxRQUFNcUksWUFBWSxHQUFHLElBQUlDLGVBQUosQ0FBb0JGLFVBQXBCLENBQXJCLENBRlMsQ0FHVDs7QUFDQSxRQUFJLENBQUNDLFlBQVksQ0FBQ0UsR0FBYixDQUFpQixNQUFqQixDQUFMLEVBQStCO0FBQzNCLFVBQU1DLE9BQU8sR0FBR2xKLENBQUMsQ0FBQyxrQkFBRCxDQUFELENBQXNCcUYsSUFBdEIsQ0FBMkIsTUFBM0IsQ0FBaEI7QUFDQSxVQUFNOEQsRUFBRSxHQUFHLGNBQVg7QUFDQSxVQUFNQyxjQUFjLEdBQUdGLE9BQU8sQ0FBQ0csT0FBUixDQUFnQkYsRUFBaEIsRUFBb0IsUUFBcEIsQ0FBdkI7QUFDQTVKLE1BQUFBLE1BQU0sQ0FBQytKLE9BQVAsQ0FBZUMsWUFBZixDQUE0QixFQUE1QixFQUFnQzlKLFFBQVEsQ0FBQytKLEtBQXpDLEVBQWdESixjQUFoRDtBQUNIOztBQUNEcEosSUFBQUEsQ0FBQyxDQUFDVCxNQUFELENBQUQsQ0FBVWtLLE9BQVYsQ0FBa0IsYUFBbEI7QUFDSDs7Ozs7QUFHTCwrREFBZS9HLGFBQWY7Ozs7Ozs7Ozs7Ozs7QUNwYkE7QUFFQSxJQUFNdkQsUUFBUSxHQUFHO0FBQ2I0RixFQUFBQSxNQUFNLEVBQUU7QUFBQSxnQkFBU3hGLE1BQU0sQ0FBQ2tCLFFBQVAsQ0FBZ0JTLFFBQXpCLEdBQW9DM0IsTUFBTSxDQUFDa0IsUUFBUCxDQUFnQlUsTUFBcEQ7QUFBQSxHQURLO0FBR2I4RyxFQUFBQSxPQUFPLEVBQUUsaUJBQUMxSCxHQUFELEVBQVM7QUFDZGhCLElBQUFBLE1BQU0sQ0FBQytKLE9BQVAsQ0FBZUksU0FBZixDQUF5QixFQUF6QixFQUE2QmpLLFFBQVEsQ0FBQytKLEtBQXRDLEVBQTZDakosR0FBN0M7QUFDQVAsSUFBQUEsQ0FBQyxDQUFDVCxNQUFELENBQUQsQ0FBVWtLLE9BQVYsQ0FBa0IsYUFBbEI7QUFDSCxHQU5ZO0FBUWJFLEVBQUFBLGFBQWEsRUFBRSx1QkFBQ3BKLEdBQUQsRUFBTXVGLE1BQU4sRUFBaUI7QUFDNUIsUUFBTThELE1BQU0sR0FBR3hLLHNDQUFBLENBQVVtQixHQUFWLEVBQWUsSUFBZixDQUFmO0FBQ0EsUUFBSXNKLEtBQUosQ0FGNEIsQ0FJNUI7O0FBQ0FELElBQUFBLE1BQU0sQ0FBQ3pJLE1BQVAsR0FBZ0IsSUFBaEI7O0FBRUEsU0FBSzBJLEtBQUwsSUFBYy9ELE1BQWQsRUFBc0I7QUFDbEIsVUFBSUEsTUFBTSxDQUFDK0MsY0FBUCxDQUFzQmdCLEtBQXRCLENBQUosRUFBa0M7QUFDOUJELFFBQUFBLE1BQU0sQ0FBQzlJLEtBQVAsQ0FBYStJLEtBQWIsSUFBc0IvRCxNQUFNLENBQUMrRCxLQUFELENBQTVCO0FBQ0g7QUFDSjs7QUFFRCxXQUFPekssdUNBQUEsQ0FBV3dLLE1BQVgsQ0FBUDtBQUNILEdBdEJZO0FBd0JieEksRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQUMwSSxTQUFELEVBQWU7QUFDN0IsUUFBSUMsR0FBRyxHQUFHLEVBQVY7QUFDQSxRQUFJbkIsR0FBSjs7QUFDQSxTQUFLQSxHQUFMLElBQVlrQixTQUFaLEVBQXVCO0FBQ25CLFVBQUlBLFNBQVMsQ0FBQ2pCLGNBQVYsQ0FBeUJELEdBQXpCLENBQUosRUFBbUM7QUFDL0IsWUFBSW9CLEtBQUssQ0FBQ0MsT0FBTixDQUFjSCxTQUFTLENBQUNsQixHQUFELENBQXZCLENBQUosRUFBbUM7QUFDL0IsY0FBSXNCLEdBQUcsU0FBUDs7QUFFQSxlQUFLQSxHQUFMLElBQVlKLFNBQVMsQ0FBQ2xCLEdBQUQsQ0FBckIsRUFBNEI7QUFDeEIsZ0JBQUlrQixTQUFTLENBQUNsQixHQUFELENBQVQsQ0FBZUMsY0FBZixDQUE4QnFCLEdBQTlCLENBQUosRUFBd0M7QUFDcENILGNBQUFBLEdBQUcsVUFBUW5CLEdBQVIsU0FBZWtCLFNBQVMsQ0FBQ2xCLEdBQUQsQ0FBVCxDQUFlc0IsR0FBZixDQUFsQjtBQUNIO0FBQ0o7QUFDSixTQVJELE1BUU87QUFDSEgsVUFBQUEsR0FBRyxVQUFRbkIsR0FBUixTQUFla0IsU0FBUyxDQUFDbEIsR0FBRCxDQUEzQjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxXQUFPbUIsR0FBRyxDQUFDSSxTQUFKLENBQWMsQ0FBZCxDQUFQO0FBQ0gsR0E1Q1k7QUE4Q2J4QixFQUFBQSxnQkFBZ0IsRUFBRSwwQkFBQ21CLFNBQUQsRUFBZTtBQUM3QixRQUFNaEUsTUFBTSxHQUFHLEVBQWY7O0FBRUEsU0FBSyxJQUFJc0UsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR04sU0FBUyxDQUFDaEQsTUFBOUIsRUFBc0NzRCxDQUFDLEVBQXZDLEVBQTJDO0FBQ3ZDLFVBQU1DLElBQUksR0FBR1AsU0FBUyxDQUFDTSxDQUFELENBQVQsQ0FBYXZKLEtBQWIsQ0FBbUIsR0FBbkIsQ0FBYjs7QUFFQSxVQUFJd0osSUFBSSxDQUFDLENBQUQsQ0FBSixJQUFXdkUsTUFBZixFQUF1QjtBQUNuQixZQUFJa0UsS0FBSyxDQUFDQyxPQUFOLENBQWNuRSxNQUFNLENBQUN1RSxJQUFJLENBQUMsQ0FBRCxDQUFMLENBQXBCLENBQUosRUFBb0M7QUFDaEN2RSxVQUFBQSxNQUFNLENBQUN1RSxJQUFJLENBQUMsQ0FBRCxDQUFMLENBQU4sQ0FBZ0IzRyxJQUFoQixDQUFxQjJHLElBQUksQ0FBQyxDQUFELENBQXpCO0FBQ0gsU0FGRCxNQUVPO0FBQ0h2RSxVQUFBQSxNQUFNLENBQUN1RSxJQUFJLENBQUMsQ0FBRCxDQUFMLENBQU4sR0FBa0IsQ0FBQ3ZFLE1BQU0sQ0FBQ3VFLElBQUksQ0FBQyxDQUFELENBQUwsQ0FBUCxFQUFrQkEsSUFBSSxDQUFDLENBQUQsQ0FBdEIsQ0FBbEI7QUFDSDtBQUNKLE9BTkQsTUFNTztBQUNIdkUsUUFBQUEsTUFBTSxDQUFDdUUsSUFBSSxDQUFDLENBQUQsQ0FBTCxDQUFOLEdBQWtCQSxJQUFJLENBQUMsQ0FBRCxDQUF0QjtBQUNIO0FBQ0o7O0FBRUQsV0FBT3ZFLE1BQVA7QUFDSDtBQWhFWSxDQUFqQjtBQW1FQSwrREFBZTNHLFFBQWY7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRUE7O0FBRUEsU0FBU29MLGdCQUFULENBQTBCQyxPQUExQixFQUFtQ0MsSUFBbkMsRUFBeUM7QUFDckMsTUFBTXZILEtBQUssR0FBR3NILE9BQU8sQ0FBQ2hFLE9BQVIsQ0FBZ0JpRSxJQUFoQixDQUFkOztBQUVBLE1BQUl2SCxLQUFLLEdBQUcsQ0FBQyxDQUFiLEVBQWdCO0FBQ1pzSCxJQUFBQSxPQUFPLENBQUNFLE1BQVIsQ0FBZXhILEtBQWYsRUFBc0IsQ0FBdEI7QUFDSDtBQUNKOztBQUVELFNBQVN5SCxnQkFBVCxDQUEwQkgsT0FBMUIsRUFBbUNDLElBQW5DLEVBQXlDO0FBQ3JDRCxFQUFBQSxPQUFPLENBQUM5RyxJQUFSLENBQWErRyxJQUFiO0FBQ0g7O0FBRUQsU0FBU0csZ0JBQVQsQ0FBMEJKLE9BQTFCLEVBQW1DekMsS0FBbkMsRUFBMEM4QyxJQUExQyxFQUFnRDtBQUM1QyxNQUFJTCxPQUFPLENBQUMxRCxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3RCLFFBQUksQ0FBQ2lCLEtBQUssQ0FBQ2xFLEVBQU4sQ0FBUyxTQUFULENBQUwsRUFBMEI7QUFDdEJrRSxNQUFBQSxLQUFLLENBQUMrQyxRQUFOLENBQWUsTUFBZjtBQUNIOztBQUNEL0MsSUFBQUEsS0FBSyxDQUFDMUMsSUFBTixDQUFXLE1BQVgsRUFBc0J3RixJQUFJLENBQUNFLE9BQTNCLFNBQXNDUCxPQUFPLENBQUNRLElBQVIsQ0FBYSxHQUFiLENBQXRDO0FBQ0FqRCxJQUFBQSxLQUFLLENBQUNrRCxJQUFOLENBQVcsZ0JBQVgsRUFBNkJDLElBQTdCLENBQWtDVixPQUFPLENBQUMxRCxNQUExQztBQUNILEdBTkQsTUFNTztBQUNIaUIsSUFBQUEsS0FBSyxDQUFDb0QsV0FBTixDQUFrQixNQUFsQjtBQUNIO0FBQ0o7O0FBRUQsNkJBQWUsb0NBQVUsTUFBNEI7QUFBQSxNQUExQkMsZ0JBQTBCLFFBQTFCQSxnQkFBMEI7QUFBQSxNQUFSUCxJQUFRLFFBQVJBLElBQVE7QUFDakQsTUFBSVEsY0FBYyxHQUFHLEVBQXJCO0FBRUEsTUFBTUMsWUFBWSxHQUFHdEwsQ0FBQyxDQUFDLHFCQUFELENBQXRCO0FBRUFBLEVBQUFBLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVTRILEVBQVYsQ0FBYSxjQUFiLEVBQTZCLFlBQU07QUFDL0IsUUFBTTJELFFBQVEsR0FBR3ZMLENBQUMsQ0FBQyxNQUFELENBQUQsQ0FBVWlMLElBQVYsQ0FBZSxvQ0FBZixDQUFqQjtBQUVBSSxJQUFBQSxjQUFjLEdBQUdFLFFBQVEsQ0FBQ3pFLE1BQVQsR0FBa0J5RSxRQUFRLENBQUNDLEdBQVQsQ0FBYSxVQUFDdEksS0FBRCxFQUFRb0QsT0FBUjtBQUFBLGFBQW9CQSxPQUFPLENBQUNtRixLQUE1QjtBQUFBLEtBQWIsRUFBZ0RDLEdBQWhELEVBQWxCLEdBQTBFLEVBQTNGO0FBQ0FkLElBQUFBLGdCQUFnQixDQUFDUyxjQUFELEVBQWlCQyxZQUFqQixFQUErQlQsSUFBL0IsQ0FBaEI7QUFDSCxHQUxEO0FBT0E3SyxFQUFBQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVUyTCxjQUFWLENBQXlCLGNBQXpCO0FBRUEzTCxFQUFBQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVU0SCxFQUFWLENBQWEsT0FBYixFQUFzQixtQkFBdEIsRUFBMkMsVUFBQXZILEtBQUssRUFBSTtBQUNoRCxRQUFNdUwsT0FBTyxHQUFHdkwsS0FBSyxDQUFDQyxhQUFOLENBQW9CbUwsS0FBcEM7QUFDQSxRQUFNSSxtQkFBbUIsR0FBRzdMLENBQUMsQ0FBQyxxQkFBRCxDQUE3Qjs7QUFFQSxRQUFJSyxLQUFLLENBQUNDLGFBQU4sQ0FBb0J3TCxPQUF4QixFQUFpQztBQUM3Qm5CLE1BQUFBLGdCQUFnQixDQUFDVSxjQUFELEVBQWlCTyxPQUFqQixDQUFoQjtBQUNILEtBRkQsTUFFTztBQUNIckIsTUFBQUEsZ0JBQWdCLENBQUNjLGNBQUQsRUFBaUJPLE9BQWpCLENBQWhCO0FBQ0g7O0FBRURoQixJQUFBQSxnQkFBZ0IsQ0FBQ1MsY0FBRCxFQUFpQlEsbUJBQWpCLEVBQXNDaEIsSUFBdEMsQ0FBaEI7QUFDSCxHQVhEO0FBYUE3SyxFQUFBQSxDQUFDLENBQUMsTUFBRCxDQUFELENBQVU0SCxFQUFWLENBQWEsT0FBYixFQUFzQixxQkFBdEIsRUFBNkMsWUFBTTtBQUMvQyxRQUFNbUUsb0JBQW9CLEdBQUcvTCxDQUFDLENBQUMsTUFBRCxDQUFELENBQVVpTCxJQUFWLENBQWUsb0NBQWYsQ0FBN0I7O0FBRUEsUUFBSWMsb0JBQW9CLENBQUNqRixNQUFyQixJQUErQixDQUFuQyxFQUFzQztBQUNsQ3dELE1BQUFBLHNEQUFjLENBQUNjLGdCQUFELENBQWQ7QUFDQSxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBUEQ7QUFRSCIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NhdGFsb2cuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2ZhY2V0ZWQtc2VhcmNoLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy91cmwtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL2NvbW1vbi91dGlscy91cmwtdXRpbHMnO1xuaW1wb3J0IFVybCBmcm9tICd1cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXRhbG9nUGFnZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5pZCA9PT0gJ3NvcnQnKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzb3J0QnlTdGF0dXMnLCAnc2VsZWN0ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXJyYW5nZUZvY3VzT25Tb3J0QnkoKSB7XG4gICAgICAgIGNvbnN0ICRzb3J0QnlTZWxlY3RvciA9ICQoJ1tkYXRhLXNvcnQtYnk9XCJwcm9kdWN0XCJdICNzb3J0Jyk7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc29ydEJ5U3RhdHVzJykpIHtcbiAgICAgICAgICAgICRzb3J0QnlTZWxlY3Rvci5mb2N1cygpO1xuICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdzb3J0QnlTdGF0dXMnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uU29ydEJ5U3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5UGFyYW1zID0gJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKS5zcGxpdCgnPScpO1xuXG4gICAgICAgIHVybC5xdWVyeVtxdWVyeVBhcmFtc1swXV0gPSBxdWVyeVBhcmFtc1sxXTtcbiAgICAgICAgZGVsZXRlIHVybC5xdWVyeS5wYWdlO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9IFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsLnF1ZXJ5KSB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBob29rcywgYXBpIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBVcmwgZnJvbSAndXJsJztcbmltcG9ydCB1cmxVdGlscyBmcm9tICcuL3V0aWxzL3VybC11dGlscyc7XG5pbXBvcnQgbW9kYWxGYWN0b3J5IGZyb20gJy4uL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29sbGFwc2libGUnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycyB9IGZyb20gJy4vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgbm9kIGZyb20gJy4vbm9kJztcblxuXG5jb25zdCBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBhY2NvcmRpb25Ub2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tbmF2aWdhdGlvbiwgI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtdG9nZ2xlJyxcbiAgICBibG9ja2VyU2VsZWN0b3I6ICcjZmFjZXRlZFNlYXJjaCAuYmxvY2tlcicsXG4gICAgY2xlYXJGYWNldFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLmZhY2V0ZWRTZWFyY2gtY2xlYXJMaW5rJyxcbiAgICBjb21wb25lbnRTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoLW5hdkxpc3QnLFxuICAgIGZhY2V0TmF2TGlzdFNlbGVjdG9yOiAnI2ZhY2V0ZWRTZWFyY2ggLm5hdkxpc3QnLFxuICAgIHByaWNlUmFuZ2VFcnJvclNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gLmZvcm0taW5saW5lTWVzc2FnZScsXG4gICAgcHJpY2VSYW5nZUZpZWxkc2V0U2VsZWN0b3I6ICcjZmFjZXQtcmFuZ2UtZm9ybSAuZm9ybS1maWVsZHNldCcsXG4gICAgcHJpY2VSYW5nZUZvcm1TZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtJyxcbiAgICBwcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcjogJyNmYWNldC1yYW5nZS1mb3JtIFtuYW1lPW1heF9wcmljZV0nLFxuICAgIHByaWNlUmFuZ2VNaW5QcmljZVNlbGVjdG9yOiAnI2ZhY2V0LXJhbmdlLWZvcm0gW25hbWU9bWluX3ByaWNlXScsXG4gICAgc2hvd01vcmVUb2dnbGVTZWxlY3RvcjogJyNmYWNldGVkU2VhcmNoIC5hY2NvcmRpb24tY29udGVudCAudG9nZ2xlTGluaycsXG4gICAgZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zOiAnI2ZhY2V0ZWRTZWFyY2gtZmlsdGVySXRlbXMgLmZvcm0taW5wdXQnLFxuICAgIG1vZGFsOiBtb2RhbEZhY3RvcnkoJyNtb2RhbCcpWzBdLFxuICAgIG1vZGFsT3BlbjogZmFsc2UsXG59O1xuXG4vKipcbiAqIEZhY2V0ZWQgc2VhcmNoIHZpZXcgY29tcG9uZW50XG4gKi9cbmNsYXNzIEZhY2V0ZWRTZWFyY2gge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSByZXF1ZXN0T3B0aW9ucyAtIE9iamVjdCB3aXRoIG9wdGlvbnMgZm9yIHRoZSBhamF4IHJlcXVlc3RzXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgLSBGdW5jdGlvbiB0byBleGVjdXRlIGFmdGVyIGZldGNoaW5nIHRlbXBsYXRlc1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gQ29uZmlndXJhYmxlIG9wdGlvbnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogbGV0IHJlcXVlc3RPcHRpb25zID0ge1xuICAgICAqICAgICAgdGVtcGxhdGVzOiB7XG4gICAgICogICAgICAgICAgcHJvZHVjdExpc3Rpbmc6ICdjYXRlZ29yeS9wcm9kdWN0LWxpc3RpbmcnLFxuICAgICAqICAgICAgICAgIHNpZGViYXI6ICdjYXRlZ29yeS9zaWRlYmFyJ1xuICAgICAqICAgICB9XG4gICAgICogfTtcbiAgICAgKlxuICAgICAqIGxldCB0ZW1wbGF0ZXNEaWRMb2FkID0gZnVuY3Rpb24oY29udGVudCkge1xuICAgICAqICAgICAkcHJvZHVjdExpc3RpbmdDb250YWluZXIuaHRtbChjb250ZW50LnByb2R1Y3RMaXN0aW5nKTtcbiAgICAgKiAgICAgJGZhY2V0ZWRTZWFyY2hDb250YWluZXIuaHRtbChjb250ZW50LnNpZGViYXIpO1xuICAgICAqIH07XG4gICAgICpcbiAgICAgKiBsZXQgZmFjZXRlZFNlYXJjaCA9IG5ldyBGYWNldGVkU2VhcmNoKHJlcXVlc3RPcHRpb25zLCB0ZW1wbGF0ZXNEaWRMb2FkKTtcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihyZXF1ZXN0T3B0aW9ucywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gUHJpdmF0ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHRoaXMucmVxdWVzdE9wdGlvbnMgPSByZXF1ZXN0T3B0aW9ucztcbiAgICAgICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBfLmV4dGVuZCh7fSwgZGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IFtdO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMgPSBbXTtcblxuICAgICAgICAvLyBJbml0IGNvbGxhcHNpYmxlc1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcblxuICAgICAgICAvLyBJbml0IHByaWNlIHZhbGlkYXRvclxuICAgICAgICB0aGlzLmluaXRQcmljZVZhbGlkYXRvcigpO1xuXG4gICAgICAgIC8vIFNob3cgbGltaXRlZCBpdGVtcyBieSBkZWZhdWx0XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKS5lYWNoKChpbmRleCwgbmF2TGlzdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJChuYXZMaXN0KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE1hcmsgaW5pdGlhbGx5IGNvbGxhcHNlZCBhY2NvcmRpb25zXG4gICAgICAgICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKS5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICAgICAgaWYgKGNvbGxhcHNpYmxlLmlzQ29sbGFwc2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldHMucHVzaChjb2xsYXBzaWJsZS50YXJnZXRJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbGxhcHNlIGFsbCBmYWNldHMgaWYgaW5pdGlhbGx5IGhpZGRlblxuICAgICAgICAvLyBOT1RFOiBOZWVkIHRvIGV4ZWN1dGUgYWZ0ZXIgQ29sbGFwc2libGUgZ2V0cyBib290c3RyYXBwZWRcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29tcG9uZW50U2VsZWN0b3IpLmlzKCc6aGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbGxhcHNlQWxsRmFjZXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIE9ic2VydmUgdXNlciBldmVudHNcbiAgICAgICAgdGhpcy5vblN0YXRlQ2hhbmdlID0gdGhpcy5vblN0YXRlQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Ub2dnbGVDbGljayA9IHRoaXMub25Ub2dnbGVDbGljay5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlID0gdGhpcy5vbkFjY29yZGlvblRvZ2dsZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLm9uQ2xlYXJGYWNldCA9IHRoaXMub25DbGVhckZhY2V0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25GYWNldENsaWNrID0gdGhpcy5vbkZhY2V0Q2xpY2suYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5vblJhbmdlU3VibWl0ID0gdGhpcy5vblJhbmdlU3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMub25Tb3J0QnlTdWJtaXQgPSB0aGlzLm9uU29ydEJ5U3VibWl0LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyA9IHRoaXMuZmlsdGVyRmFjZXRJdGVtcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIC8vIFB1YmxpYyBtZXRob2RzXG4gICAgcmVmcmVzaFZpZXcoY29udGVudCkge1xuICAgICAgICBpZiAoY29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayhjb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgIC8vIEluaXQgcHJpY2UgdmFsaWRhdG9yXG4gICAgICAgIHRoaXMuaW5pdFByaWNlVmFsaWRhdG9yKCk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSB2aWV3IHN0YXRlXG4gICAgICAgIHRoaXMucmVzdG9yZUNvbGxhcHNlZEZhY2V0cygpO1xuICAgICAgICB0aGlzLnJlc3RvcmVDb2xsYXBzZWRGYWNldEl0ZW1zKCk7XG5cbiAgICAgICAgLy8gQmluZCBldmVudHNcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlldygpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuYmxvY2tlclNlbGVjdG9yKS5zaG93KCk7XG5cbiAgICAgICAgYXBpLmdldFBhZ2UodXJsVXRpbHMuZ2V0VXJsKCksIHRoaXMucmVxdWVzdE9wdGlvbnMsIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICQodGhpcy5vcHRpb25zLmJsb2NrZXJTZWxlY3RvcikuaGlkZSgpO1xuXG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFJlZnJlc2ggdmlldyB3aXRoIG5ldyBjb250ZW50XG4gICAgICAgICAgICB0aGlzLnJlZnJlc2hWaWV3KGNvbnRlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBleHBhbmRGYWNldEl0ZW1zKCRuYXZMaXN0KSB7XG4gICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcblxuICAgICAgICAvLyBSZW1vdmVcbiAgICAgICAgdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zID0gXy53aXRob3V0KHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcywgaWQpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCkge1xuICAgICAgICBjb25zdCBpZCA9ICRuYXZMaXN0LmF0dHIoJ2lkJyk7XG4gICAgICAgIGNvbnN0IGhhc01vcmVSZXN1bHRzID0gJG5hdkxpc3QuZGF0YSgnaGFzTW9yZVJlc3VsdHMnKTtcblxuICAgICAgICBpZiAoaGFzTW9yZVJlc3VsdHMpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8udW5pb24odGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLCBbaWRdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRJdGVtcyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0SXRlbXMsIGlkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZUZhY2V0SXRlbXMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgaWQgPSAkbmF2TGlzdC5hdHRyKCdpZCcpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSBkZXBlbmRpbmcgb24gYGNvbGxhcHNlZGAgZmxhZ1xuICAgICAgICBpZiAodGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLmluY2x1ZGVzKGlkKSkge1xuICAgICAgICAgICAgdGhpcy5nZXRNb3JlRmFjZXRSZXN1bHRzKCRuYXZMaXN0KTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldE1vcmVGYWNldFJlc3VsdHMoJG5hdkxpc3QpIHtcbiAgICAgICAgY29uc3QgZmFjZXQgPSAkbmF2TGlzdC5kYXRhKCdmYWNldCcpO1xuICAgICAgICBjb25zdCBmYWNldFVybCA9IHVybFV0aWxzLmdldFVybCgpO1xuXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlKSB7XG4gICAgICAgICAgICBhcGkuZ2V0UGFnZShmYWNldFVybCwge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiB0aGlzLnJlcXVlc3RPcHRpb25zLnNob3dNb3JlLFxuICAgICAgICAgICAgICAgIHBhcmFtczoge1xuICAgICAgICAgICAgICAgICAgICBsaXN0X2FsbDogZmFjZXQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMubW9kYWwub3BlbigpO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbE9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmaWx0ZXJGYWNldEl0ZW1zKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICRpdGVtcyA9ICQoJy5uYXZMaXN0LWl0ZW0nKTtcbiAgICAgICAgY29uc3QgcXVlcnkgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnZhbCgpLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgJGl0ZW1zLmVhY2goKGluZGV4LCBlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gJChlbGVtZW50KS50ZXh0KCkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YocXVlcnkpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICQoZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZXhwYW5kRmFjZXQoJGFjY29yZGlvblRvZ2dsZSkge1xuICAgICAgICBjb25zdCBjb2xsYXBzaWJsZSA9ICRhY2NvcmRpb25Ub2dnbGUuZGF0YSgnY29sbGFwc2libGVJbnN0YW5jZScpO1xuXG4gICAgICAgIGNvbGxhcHNpYmxlLm9wZW4oKTtcbiAgICB9XG5cbiAgICBjb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpIHtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcblxuICAgICAgICBjb2xsYXBzaWJsZS5jbG9zZSgpO1xuICAgIH1cblxuICAgIGNvbGxhcHNlQWxsRmFjZXRzKCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlRmFjZXQoJGFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGV4cGFuZEFsbEZhY2V0cygpIHtcbiAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZXMgPSAkKHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3Rvcik7XG5cbiAgICAgICAgJGFjY29yZGlvblRvZ2dsZXMuZWFjaCgoaW5kZXgsIGFjY29yZGlvblRvZ2dsZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGFjY29yZGlvblRvZ2dsZSA9ICQoYWNjb3JkaW9uVG9nZ2xlKTtcblxuICAgICAgICAgICAgdGhpcy5leHBhbmRGYWNldCgkYWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gUHJpdmF0ZSBtZXRob2RzXG4gICAgaW5pdFByaWNlVmFsaWRhdG9yKCkge1xuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSBub2QoKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0ge1xuICAgICAgICAgICAgZXJyb3JTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VFcnJvclNlbGVjdG9yLFxuICAgICAgICAgICAgZmllbGRzZXRTZWxlY3RvcjogdGhpcy5vcHRpb25zLnByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yLFxuICAgICAgICAgICAgZm9ybVNlbGVjdG9yOiB0aGlzLm9wdGlvbnMucHJpY2VSYW5nZUZvcm1TZWxlY3RvcixcbiAgICAgICAgICAgIG1heFByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWF4UHJpY2VTZWxlY3RvcixcbiAgICAgICAgICAgIG1pblByaWNlU2VsZWN0b3I6IHRoaXMub3B0aW9ucy5wcmljZVJhbmdlTWluUHJpY2VTZWxlY3RvcixcbiAgICAgICAgfTtcblxuICAgICAgICBWYWxpZGF0b3JzLnNldE1pbk1heFByaWNlVmFsaWRhdGlvbih2YWxpZGF0b3IsIHNlbGVjdG9ycywgdGhpcy5vcHRpb25zLnZhbGlkYXRpb25FcnJvck1lc3NhZ2VzKTtcblxuICAgICAgICB0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IgPSB2YWxpZGF0b3I7XG4gICAgfVxuXG4gICAgcmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMoKSB7XG4gICAgICAgIGNvbnN0ICRuYXZMaXN0cyA9ICQodGhpcy5vcHRpb25zLmZhY2V0TmF2TGlzdFNlbGVjdG9yKTtcblxuICAgICAgICAvLyBSZXN0b3JlIGNvbGxhcHNlZCBzdGF0ZSBmb3IgZWFjaCBmYWNldFxuICAgICAgICAkbmF2TGlzdHMuZWFjaCgoaW5kZXgsIG5hdkxpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRuYXZMaXN0ID0gJChuYXZMaXN0KTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gJG5hdkxpc3QuYXR0cignaWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHNob3VsZENvbGxhcHNlID0gdGhpcy5jb2xsYXBzZWRGYWNldEl0ZW1zLmluY2x1ZGVzKGlkKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0SXRlbXMoJG5hdkxpc3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXN0b3JlQ29sbGFwc2VkRmFjZXRzKCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlcyA9ICQodGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yKTtcblxuICAgICAgICAkYWNjb3JkaW9uVG9nZ2xlcy5lYWNoKChpbmRleCwgYWNjb3JkaW9uVG9nZ2xlKSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gY29sbGFwc2libGUudGFyZ2V0SWQ7XG4gICAgICAgICAgICBjb25zdCBzaG91bGRDb2xsYXBzZSA9IHRoaXMuY29sbGFwc2VkRmFjZXRzLmluY2x1ZGVzKGlkKTtcblxuICAgICAgICAgICAgaWYgKHNob3VsZENvbGxhcHNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZUZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZEZhY2V0KCRhY2NvcmRpb25Ub2dnbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICAvLyBDbGVhbi11cFxuICAgICAgICB0aGlzLnVuYmluZEV2ZW50cygpO1xuXG4gICAgICAgIC8vIERPTSBldmVudHNcbiAgICAgICAgJCh3aW5kb3cpLm9uKCdzdGF0ZWNoYW5nZScsIHRoaXMub25TdGF0ZUNoYW5nZSk7XG4gICAgICAgICQod2luZG93KS5vbigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCB0aGlzLm9wdGlvbnMuc2hvd01vcmVUb2dnbGVTZWxlY3RvciwgdGhpcy5vblRvZ2dsZUNsaWNrKTtcbiAgICAgICAgJChkb2N1bWVudCkub24oJ3RvZ2dsZS5jb2xsYXBzaWJsZScsIHRoaXMub3B0aW9ucy5hY2NvcmRpb25Ub2dnbGVTZWxlY3RvciwgdGhpcy5vbkFjY29yZGlvblRvZ2dsZSk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdrZXl1cCcsIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub24oJ2NsaWNrJywgdGhpcy5vbkNsZWFyRmFjZXQpO1xuXG4gICAgICAgIC8vIEhvb2tzXG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLWZhY2V0LWNsaWNrZWQnLCB0aGlzLm9uRmFjZXRDbGljayk7XG4gICAgICAgIGhvb2tzLm9uKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgICAgIGhvb2tzLm9uKCdzb3J0Qnktc3VibWl0dGVkJywgdGhpcy5vblNvcnRCeVN1Ym1pdCk7XG4gICAgfVxuXG4gICAgdW5iaW5kRXZlbnRzKCkge1xuICAgICAgICAvLyBET00gZXZlbnRzXG4gICAgICAgICQod2luZG93KS5vZmYoJ3N0YXRlY2hhbmdlJywgdGhpcy5vblN0YXRlQ2hhbmdlKTtcbiAgICAgICAgJCh3aW5kb3cpLm9mZigncG9wc3RhdGUnLCB0aGlzLm9uUG9wU3RhdGUpO1xuICAgICAgICAkKGRvY3VtZW50KS5vZmYoJ2NsaWNrJywgdGhpcy5vcHRpb25zLnNob3dNb3JlVG9nZ2xlU2VsZWN0b3IsIHRoaXMub25Ub2dnbGVDbGljayk7XG4gICAgICAgICQoZG9jdW1lbnQpLm9mZigndG9nZ2xlLmNvbGxhcHNpYmxlJywgdGhpcy5vcHRpb25zLmFjY29yZGlvblRvZ2dsZVNlbGVjdG9yLCB0aGlzLm9uQWNjb3JkaW9uVG9nZ2xlKTtcbiAgICAgICAgJChkb2N1bWVudCkub2ZmKCdrZXl1cCcsIHRoaXMub3B0aW9ucy5mYWNldGVkU2VhcmNoRmlsdGVySXRlbXMsIHRoaXMuZmlsdGVyRmFjZXRJdGVtcyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmNsZWFyRmFjZXRTZWxlY3Rvcikub2ZmKCdjbGljaycsIHRoaXMub25DbGVhckZhY2V0KTtcblxuICAgICAgICAvLyBIb29rc1xuICAgICAgICBob29rcy5vZmYoJ2ZhY2V0ZWRTZWFyY2gtZmFjZXQtY2xpY2tlZCcsIHRoaXMub25GYWNldENsaWNrKTtcbiAgICAgICAgaG9va3Mub2ZmKCdmYWNldGVkU2VhcmNoLXJhbmdlLXN1Ym1pdHRlZCcsIHRoaXMub25SYW5nZVN1Ym1pdCk7XG4gICAgICAgIGhvb2tzLm9mZignc29ydEJ5LXN1Ym1pdHRlZCcsIHRoaXMub25Tb3J0QnlTdWJtaXQpO1xuICAgIH1cblxuICAgIG9uQ2xlYXJGYWNldChldmVudCkge1xuICAgICAgICBjb25zdCAkbGluayA9ICQoZXZlbnQuY3VycmVudFRhcmdldCk7XG4gICAgICAgIGNvbnN0IHVybCA9ICRsaW5rLmF0dHIoJ2hyZWYnKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAvLyBVcGRhdGUgVVJMXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZUNsaWNrKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0ICR0b2dnbGUgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICBjb25zdCAkbmF2TGlzdCA9ICQoJHRvZ2dsZS5hdHRyKCdocmVmJykpO1xuXG4gICAgICAgIC8vIFByZXZlbnQgZGVmYXVsdFxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIFRvZ2dsZSB2aXNpYmxlIGl0ZW1zXG4gICAgICAgIHRoaXMudG9nZ2xlRmFjZXRJdGVtcygkbmF2TGlzdCk7XG4gICAgfVxuXG4gICAgb25GYWNldENsaWNrKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGNvbnN0ICRsaW5rID0gJChjdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgdXJsID0gJGxpbmsuYXR0cignaHJlZicpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJGxpbmsudG9nZ2xlQ2xhc3MoJ2lzLXNlbGVjdGVkJyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIFVSTFxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG5cbiAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5tb2RhbE9wZW4pIHtcbiAgICAgICAgICAgIHRoaXMub3B0aW9ucy5tb2RhbC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Tb3J0QnlTdWJtaXQoZXZlbnQsIGN1cnJlbnRUYXJnZXQpIHtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSAkKGN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZSgpLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgdXJsLnF1ZXJ5W3F1ZXJ5UGFyYW1zWzBdXSA9IHF1ZXJ5UGFyYW1zWzFdO1xuICAgICAgICBkZWxldGUgdXJsLnF1ZXJ5LnBhZ2U7XG5cbiAgICAgICAgLy8gVXJsIG9iamVjdCBgcXVlcnlgIGlzIG5vdCBhIHRyYWRpdGlvbmFsIEphdmFTY3JpcHQgT2JqZWN0IG9uIGFsbCBzeXN0ZW1zLCBjbG9uZSBpdCBpbnN0ZWFkXG4gICAgICAgIGNvbnN0IHVybFF1ZXJ5UGFyYW1zID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24odXJsUXVlcnlQYXJhbXMsIHVybC5xdWVyeSk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpIH0pKTtcbiAgICB9XG5cbiAgICBvblJhbmdlU3VibWl0KGV2ZW50LCBjdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLnByaWNlUmFuZ2VWYWxpZGF0b3IuYXJlQWxsKG5vZC5jb25zdGFudHMuVkFMSUQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB1cmwgPSBVcmwucGFyc2Uod2luZG93LmxvY2F0aW9uLmhyZWYsIHRydWUpO1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBkZWNvZGVVUkkoJChjdXJyZW50VGFyZ2V0KS5zZXJpYWxpemUoKSkuc3BsaXQoJyYnKTtcbiAgICAgICAgcXVlcnlQYXJhbXMgPSB1cmxVdGlscy5wYXJzZVF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zKTtcblxuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBxdWVyeVBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHF1ZXJ5UGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICB1cmwucXVlcnlba2V5XSA9IHF1ZXJ5UGFyYW1zW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcmwgb2JqZWN0IGBxdWVyeWAgaXMgbm90IGEgdHJhZGl0aW9uYWwgSmF2YVNjcmlwdCBPYmplY3Qgb24gYWxsIHN5c3RlbXMsIGNsb25lIGl0IGluc3RlYWRcbiAgICAgICAgY29uc3QgdXJsUXVlcnlQYXJhbXMgPSB7fTtcbiAgICAgICAgT2JqZWN0LmFzc2lnbih1cmxRdWVyeVBhcmFtcywgdXJsLnF1ZXJ5KTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKFVybC5mb3JtYXQoeyBwYXRobmFtZTogdXJsLnBhdGhuYW1lLCBzZWFyY2g6IHVybFV0aWxzLmJ1aWxkUXVlcnlTdHJpbmcodXJsUXVlcnlQYXJhbXMpIH0pKTtcbiAgICB9XG5cbiAgICBvblN0YXRlQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZXcoKTtcbiAgICB9XG5cbiAgICBvbkFjY29yZGlvblRvZ2dsZShldmVudCkge1xuICAgICAgICBjb25zdCAkYWNjb3JkaW9uVG9nZ2xlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgY29uc3QgY29sbGFwc2libGUgPSAkYWNjb3JkaW9uVG9nZ2xlLmRhdGEoJ2NvbGxhcHNpYmxlSW5zdGFuY2UnKTtcbiAgICAgICAgY29uc3QgaWQgPSBjb2xsYXBzaWJsZS50YXJnZXRJZDtcblxuICAgICAgICBpZiAoY29sbGFwc2libGUuaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2VkRmFjZXRzID0gXy51bmlvbih0aGlzLmNvbGxhcHNlZEZhY2V0cywgW2lkXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlZEZhY2V0cyA9IF8ud2l0aG91dCh0aGlzLmNvbGxhcHNlZEZhY2V0cywgaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Qb3BTdGF0ZSgpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFVybCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBjb25zdCBzZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGN1cnJlbnRVcmwpO1xuICAgICAgICAvLyBJZiBzZWFyY2hQYXJhbXMgZG9lcyBub3QgY29udGFpbiBhIHBhZ2UgdmFsdWUgdGhlbiBtb2RpZnkgdXJsIHF1ZXJ5IHN0cmluZyB0byBoYXZlIHBhZ2U9MVxuICAgICAgICBpZiAoIXNlYXJjaFBhcmFtcy5oYXMoJ3BhZ2UnKSkge1xuICAgICAgICAgICAgY29uc3QgbGlua1VybCA9ICQoJy5wYWdpbmF0aW9uLWxpbmsnKS5hdHRyKCdocmVmJyk7XG4gICAgICAgICAgICBjb25zdCByZSA9IC9wYWdlPVswLTldKy9pO1xuICAgICAgICAgICAgY29uc3QgdXBkYXRlZExpbmtVcmwgPSBsaW5rVXJsLnJlcGxhY2UocmUsICdwYWdlPTEnKTtcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSh7fSwgZG9jdW1lbnQudGl0bGUsIHVwZGF0ZWRMaW5rVXJsKTtcbiAgICAgICAgfVxuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZhY2V0ZWRTZWFyY2g7XG4iLCJpbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5cbmNvbnN0IHVybFV0aWxzID0ge1xuICAgIGdldFVybDogKCkgPT4gYCR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfSR7d2luZG93LmxvY2F0aW9uLnNlYXJjaH1gLFxuXG4gICAgZ29Ub1VybDogKHVybCkgPT4ge1xuICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIGRvY3VtZW50LnRpdGxlLCB1cmwpO1xuICAgICAgICAkKHdpbmRvdykudHJpZ2dlcignc3RhdGVjaGFuZ2UnKTtcbiAgICB9LFxuXG4gICAgcmVwbGFjZVBhcmFtczogKHVybCwgcGFyYW1zKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IFVybC5wYXJzZSh1cmwsIHRydWUpO1xuICAgICAgICBsZXQgcGFyYW07XG5cbiAgICAgICAgLy8gTGV0IHRoZSBmb3JtYXR0ZXIgdXNlIHRoZSBxdWVyeSBvYmplY3QgdG8gYnVpbGQgdGhlIG5ldyB1cmxcbiAgICAgICAgcGFyc2VkLnNlYXJjaCA9IG51bGw7XG5cbiAgICAgICAgZm9yIChwYXJhbSBpbiBwYXJhbXMpIHtcbiAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkocGFyYW0pKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VkLnF1ZXJ5W3BhcmFtXSA9IHBhcmFtc1twYXJhbV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gVXJsLmZvcm1hdChwYXJzZWQpO1xuICAgIH0sXG5cbiAgICBidWlsZFF1ZXJ5U3RyaW5nOiAocXVlcnlEYXRhKSA9PiB7XG4gICAgICAgIGxldCBvdXQgPSAnJztcbiAgICAgICAgbGV0IGtleTtcbiAgICAgICAgZm9yIChrZXkgaW4gcXVlcnlEYXRhKSB7XG4gICAgICAgICAgICBpZiAocXVlcnlEYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShxdWVyeURhdGFba2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5keDtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKG5keCBpbiBxdWVyeURhdGFba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHF1ZXJ5RGF0YVtrZXldLmhhc093blByb3BlcnR5KG5keCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXQgKz0gYCYke2tleX09JHtxdWVyeURhdGFba2V5XVtuZHhdfWA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvdXQgKz0gYCYke2tleX09JHtxdWVyeURhdGFba2V5XX1gO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQuc3Vic3RyaW5nKDEpO1xuICAgIH0sXG5cbiAgICBwYXJzZVF1ZXJ5UGFyYW1zOiAocXVlcnlEYXRhKSA9PiB7XG4gICAgICAgIGNvbnN0IHBhcmFtcyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcXVlcnlEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB0ZW1wID0gcXVlcnlEYXRhW2ldLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgIGlmICh0ZW1wWzBdIGluIHBhcmFtcykge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBhcmFtc1t0ZW1wWzBdXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW3RlbXBbMF1dLnB1c2godGVtcFsxXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zW3RlbXBbMF1dID0gW3BhcmFtc1t0ZW1wWzBdXSwgdGVtcFsxXV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNbdGVtcFswXV0gPSB0ZW1wWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHBhcmFtcztcbiAgICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgdXJsVXRpbHM7XG4iLCJpbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xuXG5mdW5jdGlvbiBkZWNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IGNvdW50ZXIuaW5kZXhPZihpdGVtKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xuICAgIGNvdW50ZXIucHVzaChpdGVtKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ291bnRlck5hdihjb3VudGVyLCAkbGluaywgdXJscykge1xuICAgIGlmIChjb3VudGVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpZiAoISRsaW5rLmlzKCd2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICRsaW5rLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsIGAke3VybHMuY29tcGFyZX0vJHtjb3VudGVyLmpvaW4oJy8nKX1gKTtcbiAgICAgICAgJGxpbmsuZmluZCgnc3Bhbi5jb3VudFBpbGwnKS5odG1sKGNvdW50ZXIubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbGluay5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgbm9Db21wYXJlTWVzc2FnZSwgdXJscyB9KSB7XG4gICAgbGV0IGNvbXBhcmVDb3VudGVyID0gW107XG5cbiAgICBjb25zdCAkY29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NvbXBhcmVSZXNldCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNoZWNrZWQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBjb21wYXJlQ291bnRlciA9ICRjaGVja2VkLmxlbmd0aCA/ICRjaGVja2VkLm1hcCgoaW5kZXgsIGVsZW1lbnQpID0+IGVsZW1lbnQudmFsdWUpLmdldCgpIDogW107XG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjb21wYXJlTGluaywgdXJscyk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgaW5jcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjbGlja2VkQ29tcGFyZUxpbmssIHVybHMpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdhW2RhdGEtY29tcGFyZS1uYXZdJywgKCkgPT4ge1xuICAgICAgICBjb25zdCAkY2xpY2tlZENoZWNrZWRJbnB1dCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xuXG4gICAgICAgIGlmICgkY2xpY2tlZENoZWNrZWRJbnB1dC5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwobm9Db21wYXJlTWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsInVybFV0aWxzIiwiVXJsIiwiQ2F0YWxvZ1BhZ2UiLCJjb250ZXh0Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImRvY3VtZW50IiwiYWN0aXZlRWxlbWVudCIsImlkIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiJHNvcnRCeVNlbGVjdG9yIiwiJCIsImdldEl0ZW0iLCJmb2N1cyIsInJlbW92ZUl0ZW0iLCJvblNvcnRCeVN1Ym1pdCIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsInVybCIsInBhcnNlIiwibG9jYXRpb24iLCJocmVmIiwicXVlcnlQYXJhbXMiLCJzZXJpYWxpemUiLCJzcGxpdCIsInF1ZXJ5IiwicGFnZSIsInByZXZlbnREZWZhdWx0IiwiZm9ybWF0IiwicGF0aG5hbWUiLCJzZWFyY2giLCJidWlsZFF1ZXJ5U3RyaW5nIiwiaG9va3MiLCJhcGkiLCJtb2RhbEZhY3RvcnkiLCJjb2xsYXBzaWJsZUZhY3RvcnkiLCJWYWxpZGF0b3JzIiwibm9kIiwiZGVmYXVsdE9wdGlvbnMiLCJhY2NvcmRpb25Ub2dnbGVTZWxlY3RvciIsImJsb2NrZXJTZWxlY3RvciIsImNsZWFyRmFjZXRTZWxlY3RvciIsImNvbXBvbmVudFNlbGVjdG9yIiwiZmFjZXROYXZMaXN0U2VsZWN0b3IiLCJwcmljZVJhbmdlRXJyb3JTZWxlY3RvciIsInByaWNlUmFuZ2VGaWVsZHNldFNlbGVjdG9yIiwicHJpY2VSYW5nZUZvcm1TZWxlY3RvciIsInByaWNlUmFuZ2VNYXhQcmljZVNlbGVjdG9yIiwicHJpY2VSYW5nZU1pblByaWNlU2VsZWN0b3IiLCJzaG93TW9yZVRvZ2dsZVNlbGVjdG9yIiwiZmFjZXRlZFNlYXJjaEZpbHRlckl0ZW1zIiwibW9kYWwiLCJtb2RhbE9wZW4iLCJGYWNldGVkU2VhcmNoIiwicmVxdWVzdE9wdGlvbnMiLCJjYWxsYmFjayIsIm9wdGlvbnMiLCJjb2xsYXBzZWRGYWNldHMiLCJjb2xsYXBzZWRGYWNldEl0ZW1zIiwiaW5pdFByaWNlVmFsaWRhdG9yIiwiZWFjaCIsImluZGV4IiwibmF2TGlzdCIsImNvbGxhcHNlRmFjZXRJdGVtcyIsImFjY29yZGlvblRvZ2dsZSIsIiRhY2NvcmRpb25Ub2dnbGUiLCJjb2xsYXBzaWJsZSIsImRhdGEiLCJpc0NvbGxhcHNlZCIsInB1c2giLCJ0YXJnZXRJZCIsInNldFRpbWVvdXQiLCJpcyIsImNvbGxhcHNlQWxsRmFjZXRzIiwib25TdGF0ZUNoYW5nZSIsImJpbmQiLCJvblRvZ2dsZUNsaWNrIiwib25BY2NvcmRpb25Ub2dnbGUiLCJvbkNsZWFyRmFjZXQiLCJvbkZhY2V0Q2xpY2siLCJvblJhbmdlU3VibWl0IiwiZmlsdGVyRmFjZXRJdGVtcyIsImJpbmRFdmVudHMiLCJyZWZyZXNoVmlldyIsImNvbnRlbnQiLCJyZXN0b3JlQ29sbGFwc2VkRmFjZXRzIiwicmVzdG9yZUNvbGxhcHNlZEZhY2V0SXRlbXMiLCJ1cGRhdGVWaWV3Iiwic2hvdyIsImdldFBhZ2UiLCJnZXRVcmwiLCJlcnIiLCJoaWRlIiwiRXJyb3IiLCJleHBhbmRGYWNldEl0ZW1zIiwiJG5hdkxpc3QiLCJhdHRyIiwiaGFzTW9yZVJlc3VsdHMiLCJ0b2dnbGVGYWNldEl0ZW1zIiwiaW5jbHVkZXMiLCJnZXRNb3JlRmFjZXRSZXN1bHRzIiwiZmFjZXQiLCJmYWNldFVybCIsInNob3dNb3JlIiwidGVtcGxhdGUiLCJwYXJhbXMiLCJsaXN0X2FsbCIsInJlc3BvbnNlIiwib3BlbiIsInVwZGF0ZUNvbnRlbnQiLCIkaXRlbXMiLCJ2YWwiLCJ0b0xvd2VyQ2FzZSIsImVsZW1lbnQiLCJ0ZXh0IiwiaW5kZXhPZiIsImV4cGFuZEZhY2V0IiwiY29sbGFwc2VGYWNldCIsImNsb3NlIiwiJGFjY29yZGlvblRvZ2dsZXMiLCJleHBhbmRBbGxGYWNldHMiLCJsZW5ndGgiLCJ2YWxpZGF0b3IiLCJzZWxlY3RvcnMiLCJlcnJvclNlbGVjdG9yIiwiZmllbGRzZXRTZWxlY3RvciIsImZvcm1TZWxlY3RvciIsIm1heFByaWNlU2VsZWN0b3IiLCJtaW5QcmljZVNlbGVjdG9yIiwic2V0TWluTWF4UHJpY2VWYWxpZGF0aW9uIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCJwcmljZVJhbmdlVmFsaWRhdG9yIiwiJG5hdkxpc3RzIiwic2hvdWxkQ29sbGFwc2UiLCJ1bmJpbmRFdmVudHMiLCJvbiIsIm9uUG9wU3RhdGUiLCJvZmYiLCIkbGluayIsInN0b3BQcm9wYWdhdGlvbiIsImdvVG9VcmwiLCIkdG9nZ2xlIiwidG9nZ2xlQ2xhc3MiLCJ1cmxRdWVyeVBhcmFtcyIsIk9iamVjdCIsImFzc2lnbiIsImFyZUFsbCIsImNvbnN0YW50cyIsIlZBTElEIiwiZGVjb2RlVVJJIiwicGFyc2VRdWVyeVBhcmFtcyIsImtleSIsImhhc093blByb3BlcnR5IiwiY3VycmVudFVybCIsInNlYXJjaFBhcmFtcyIsIlVSTFNlYXJjaFBhcmFtcyIsImhhcyIsImxpbmtVcmwiLCJyZSIsInVwZGF0ZWRMaW5rVXJsIiwicmVwbGFjZSIsImhpc3RvcnkiLCJyZXBsYWNlU3RhdGUiLCJ0aXRsZSIsInRyaWdnZXIiLCJwdXNoU3RhdGUiLCJyZXBsYWNlUGFyYW1zIiwicGFyc2VkIiwicGFyYW0iLCJxdWVyeURhdGEiLCJvdXQiLCJBcnJheSIsImlzQXJyYXkiLCJuZHgiLCJzdWJzdHJpbmciLCJpIiwidGVtcCIsInNob3dBbGVydE1vZGFsIiwiZGVjcmVtZW50Q291bnRlciIsImNvdW50ZXIiLCJpdGVtIiwic3BsaWNlIiwiaW5jcmVtZW50Q291bnRlciIsInVwZGF0ZUNvdW50ZXJOYXYiLCJ1cmxzIiwiYWRkQ2xhc3MiLCJjb21wYXJlIiwiam9pbiIsImZpbmQiLCJodG1sIiwicmVtb3ZlQ2xhc3MiLCJub0NvbXBhcmVNZXNzYWdlIiwiY29tcGFyZUNvdW50ZXIiLCIkY29tcGFyZUxpbmsiLCIkY2hlY2tlZCIsIm1hcCIsInZhbHVlIiwiZ2V0IiwidHJpZ2dlckhhbmRsZXIiLCJwcm9kdWN0IiwiJGNsaWNrZWRDb21wYXJlTGluayIsImNoZWNrZWQiLCIkY2xpY2tlZENoZWNrZWRJbnB1dCJdLCJzb3VyY2VSb290IjoiIn0=