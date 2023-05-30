"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_search_js"],{

/***/ "./assets/js/theme/search.js":
/*!***********************************!*\
  !*** ./assets/js/theme/search.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Search; }
/* harmony export */ });
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./catalog */ "./assets/js/theme/catalog.js");
/* harmony import */ var _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/faceted-search */ "./assets/js/theme/common/faceted-search.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* harmony import */ var _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/url-utils */ "./assets/js/theme/common/utils/url-utils.js");
/* harmony import */ var url__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! url */ "./node_modules/url/url.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jstree */ "./node_modules/jstree/dist/jstree.min.js");
/* harmony import */ var jstree__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jstree__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; return function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } it = o[Symbol.iterator](); return it.next.bind(it); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }











var leftArrowKey = 37;
var rightArrowKey = 39;

var Search = /*#__PURE__*/function (_CatalogPage) {
  _inheritsLoose(Search, _CatalogPage);

  function Search() {
    return _CatalogPage.apply(this, arguments) || this;
  }

  var _proto = Search.prototype;

  _proto.formatCategoryTreeForJSTree = function formatCategoryTreeForJSTree(node) {
    var _this = this;

    var nodeData = {
      text: node.data,
      id: node.metadata.id,
      state: {
        selected: node.selected
      }
    };

    if (node.state) {
      nodeData.state.opened = node.state === 'open';
      nodeData.children = true;
    }

    if (node.children) {
      nodeData.children = [];
      node.children.forEach(function (childNode) {
        nodeData.children.push(_this.formatCategoryTreeForJSTree(childNode));
      });
    }

    return nodeData;
  };

  _proto.showProducts = function showProducts(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }

    this.$productListingContainer.removeClass('u-hidden');
    this.$facetedSearchContainer.removeClass('u-hidden');
    this.$contentResultsContainer.addClass('u-hidden');
    $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-content-results-toggle]').addClass('navBar-action');
    $('[data-product-results-toggle]').removeClass('navBar-action');
    $('[data-product-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-product-results-toggle]'));

    if (!navigate) {
      return;
    }

    var searchData = $('#search-results-product-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };

  _proto.showContent = function showContent(navigate) {
    if (navigate === void 0) {
      navigate = true;
    }

    this.$contentResultsContainer.removeClass('u-hidden');
    this.$productListingContainer.addClass('u-hidden');
    this.$facetedSearchContainer.addClass('u-hidden');
    $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
    $('[data-product-results-toggle]').addClass('navBar-action');
    $('[data-content-results-toggle]').removeClass('navBar-action');
    $('[data-content-results-toggle]').addClass('navBar-action-color--active');
    this.activateTab($('[data-content-results-toggle]'));

    if (!navigate) {
      return;
    }

    var searchData = $('#search-results-content-count span').data();
    var url = searchData.count > 0 ? searchData.url : _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].replaceParams(searchData.url, {
      page: 1
    });
    _common_utils_url_utils__WEBPACK_IMPORTED_MODULE_5__["default"].goToUrl(url);
  };

  _proto.activateTab = function activateTab($tabToActivate) {
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    $tabsCollection.each(function (idx, tab) {
      var $tab = $(tab);

      if ($tab.is($tabToActivate)) {
        $tab.removeAttr('tabindex');
        $tab.attr('aria-selected', true);
        return;
      }

      $tab.attr('tabindex', '-1');
      $tab.attr('aria-selected', false);
    });
  };

  _proto.onTabChangeWithArrows = function onTabChangeWithArrows(event) {
    var eventKey = event.which;
    var isLeftOrRightArrowKeydown = eventKey === leftArrowKey || eventKey === rightArrowKey;
    if (!isLeftOrRightArrowKeydown) return;
    var $tabsCollection = $('[data-search-page-tabs]').find('[role="tab"]');
    var isActiveElementNotTab = $tabsCollection.index($(document.activeElement)) === -1;
    if (isActiveElementNotTab) return;
    var $activeTab = $("#" + document.activeElement.id);
    var activeTabIdx = $tabsCollection.index($activeTab);
    var lastTabIdx = $tabsCollection.length - 1;
    var nextTabIdx;

    switch (eventKey) {
      case leftArrowKey:
        nextTabIdx = activeTabIdx === 0 ? lastTabIdx : activeTabIdx - 1;
        break;

      case rightArrowKey:
        nextTabIdx = activeTabIdx === lastTabIdx ? 0 : activeTabIdx + 1;
        break;

      default:
        break;
    }

    $($tabsCollection.get(nextTabIdx)).focus().trigger('click');
  };

  _proto.onReady = function onReady() {
    var _this2 = this;

    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_4__["default"])(this.context);
    this.arrangeFocusOnSortBy();
    var $searchForm = $('[data-advanced-search-form]');
    var $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
    var url = url__WEBPACK_IMPORTED_MODULE_6__.parse(window.location.href, true);
    var treeData = [];
    this.$productListingContainer = $('#product-listing-container');
    this.$facetedSearchContainer = $('#faceted-search-container');
    this.$contentResultsContainer = $('#search-results-content'); // Init faceted search

    if ($('#facetedSearch').length > 0) {
      this.initFacetedSearch();
    } else {
      this.onSortBySubmit = this.onSortBySubmit.bind(this);
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_0__.hooks.on('sortBy-submitted', this.onSortBySubmit);
    } // Init collapsibles


    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_7__["default"])();
    $('[data-product-results-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.showProducts();
    });
    $('[data-content-results-toggle]').on('click', function (event) {
      event.preventDefault();

      _this2.showContent();
    });
    $('[data-search-page-tabs]').on('keyup', this.onTabChangeWithArrows);

    if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
      this.showContent(false);
    } else {
      this.showProducts(false);
    }

    var validator = this.initValidation($searchForm).bindValidation($searchForm.find('#search_query_adv'));
    this.context.categoryTree.forEach(function (node) {
      treeData.push(_this2.formatCategoryTreeForJSTree(node));
    });
    this.categoryTreeData = treeData;
    this.createCategoryTree($categoryTreeContainer);
    $searchForm.on('submit', function (event) {
      var selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();

      if (!validator.check()) {
        return event.preventDefault();
      }

      $searchForm.find('input[name="category\[\]"]').remove();

      for (var _iterator = _createForOfIteratorHelperLoose(selectedCategoryIds), _step; !(_step = _iterator()).done;) {
        var categoryId = _step.value;
        var input = $('<input>', {
          type: 'hidden',
          name: 'category[]',
          value: categoryId
        });
        $searchForm.append(input);
      }
    });
    var $searchResultsMessage = $("<p\n            class=\"aria-description--hidden\"\n            tabindex=\"-1\"\n            role=\"status\"\n            aria-live=\"polite\"\n            >" + this.context.searchResultsCount + "</p>").prependTo('body');
    setTimeout(function () {
      return $searchResultsMessage.focus();
    }, 100);
  };

  _proto.loadTreeNodes = function loadTreeNodes(node, cb) {
    var _this3 = this;

    $.ajax({
      url: '/remote/v1/category-tree',
      data: {
        selectedCategoryId: node.id,
        prefix: 'category'
      },
      headers: {
        'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : ''
      }
    }).done(function (data) {
      var formattedResults = [];
      data.forEach(function (dataNode) {
        formattedResults.push(_this3.formatCategoryTreeForJSTree(dataNode));
      });
      cb(formattedResults);
    });
  };

  _proto.createCategoryTree = function createCategoryTree($container) {
    var _this4 = this;

    var treeOptions = {
      core: {
        data: function data(node, cb) {
          // Root node
          if (node.id === '#') {
            cb(_this4.categoryTreeData);
          } else {
            // Lazy loaded children
            _this4.loadTreeNodes(node, cb);
          }
        },
        themes: {
          icons: true
        }
      },
      checkbox: {
        three_state: false
      },
      plugins: ['checkbox']
    };
    $container.jstree(treeOptions);
  };

  _proto.initFacetedSearch = function initFacetedSearch() {
    var _this5 = this;

    // eslint-disable-next-line object-curly-newline
    var _this$context = this.context,
        onMinPriceError = _this$context.onMinPriceError,
        onMaxPriceError = _this$context.onMaxPriceError,
        minPriceNotEntered = _this$context.minPriceNotEntered,
        maxPriceNotEntered = _this$context.maxPriceNotEntered,
        onInvalidPrice = _this$context.onInvalidPrice;
    var $productListingContainer = $('#product-listing-container');
    var $contentListingContainer = $('#search-results-content');
    var $facetedSearchContainer = $('#faceted-search-container');
    var $searchHeading = $('#search-results-heading');
    var $searchCount = $('#search-results-product-count');
    var $contentCount = $('#search-results-content-count');
    var productsPerPage = this.context.searchProductsPerPage;
    var requestOptions = {
      template: {
        productListing: 'search/product-listing',
        contentListing: 'search/content-listing',
        sidebar: 'search/sidebar',
        heading: 'search/heading',
        productCount: 'search/product-count',
        contentCount: 'search/content-count'
      },
      config: {
        product_results: {
          limit: productsPerPage
        }
      },
      showMore: 'search/show-more'
    };
    this.facetedSearch = new _common_faceted_search__WEBPACK_IMPORTED_MODULE_2__["default"](requestOptions, function (content) {
      $searchHeading.html(content.heading);
      var url = url__WEBPACK_IMPORTED_MODULE_6__.parse(window.location.href, true);

      if (url.query.section === 'content') {
        $contentListingContainer.html(content.contentListing);
        $contentCount.html(content.contentCount);

        _this5.showContent(false);
      } else {
        $productListingContainer.html(content.productListing);
        $facetedSearchContainer.html(content.sidebar);
        $searchCount.html(content.productCount);

        _this5.showProducts(false);
      }

      $('body').triggerHandler('compareReset');
      $('html, body').animate({
        scrollTop: 0
      }, 100);
    }, {
      validationErrorMessages: {
        onMinPriceError: onMinPriceError,
        onMaxPriceError: onMaxPriceError,
        minPriceNotEntered: minPriceNotEntered,
        maxPriceNotEntered: maxPriceNotEntered,
        onInvalidPrice: onInvalidPrice
      }
    });
  };

  _proto.initValidation = function initValidation($form) {
    this.$form = $form;
    this.validator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_9__["default"])({
      submit: $form,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    return this;
  };

  _proto.bindValidation = function bindValidation($element) {
    if (this.validator) {
      this.validator.add({
        selector: $element,
        validate: 'presence',
        errorMessage: $element.data('errorMessage')
      });
    }

    return this;
  };

  _proto.check = function check() {
    if (this.validator) {
      this.validator.performCheck();
      return this.validator.areAll('valid');
    }

    return false;
  };

  return Search;
}(_catalog__WEBPACK_IMPORTED_MODULE_1__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9zZWFyY2hfanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBLElBQU1TLFlBQVksR0FBRyxFQUFyQjtBQUNBLElBQU1DLGFBQWEsR0FBRyxFQUF0Qjs7SUFFcUJDOzs7Ozs7Ozs7U0FDakJDLDhCQUFBLHFDQUE0QkMsSUFBNUIsRUFBa0M7QUFBQTs7QUFDOUIsUUFBTUMsUUFBUSxHQUFHO0FBQ2JDLE1BQUFBLElBQUksRUFBRUYsSUFBSSxDQUFDRyxJQURFO0FBRWJDLE1BQUFBLEVBQUUsRUFBRUosSUFBSSxDQUFDSyxRQUFMLENBQWNELEVBRkw7QUFHYkUsTUFBQUEsS0FBSyxFQUFFO0FBQ0hDLFFBQUFBLFFBQVEsRUFBRVAsSUFBSSxDQUFDTztBQURaO0FBSE0sS0FBakI7O0FBUUEsUUFBSVAsSUFBSSxDQUFDTSxLQUFULEVBQWdCO0FBQ1pMLE1BQUFBLFFBQVEsQ0FBQ0ssS0FBVCxDQUFlRSxNQUFmLEdBQXdCUixJQUFJLENBQUNNLEtBQUwsS0FBZSxNQUF2QztBQUNBTCxNQUFBQSxRQUFRLENBQUNRLFFBQVQsR0FBb0IsSUFBcEI7QUFDSDs7QUFFRCxRQUFJVCxJQUFJLENBQUNTLFFBQVQsRUFBbUI7QUFDZlIsTUFBQUEsUUFBUSxDQUFDUSxRQUFULEdBQW9CLEVBQXBCO0FBQ0FULE1BQUFBLElBQUksQ0FBQ1MsUUFBTCxDQUFjQyxPQUFkLENBQXNCLFVBQUNDLFNBQUQsRUFBZTtBQUNqQ1YsUUFBQUEsUUFBUSxDQUFDUSxRQUFULENBQWtCRyxJQUFsQixDQUF1QixLQUFJLENBQUNiLDJCQUFMLENBQWlDWSxTQUFqQyxDQUF2QjtBQUNILE9BRkQ7QUFHSDs7QUFFRCxXQUFPVixRQUFQO0FBQ0g7O1NBRURZLGVBQUEsc0JBQWFDLFFBQWIsRUFBOEI7QUFB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RUFBZkEsZUFEcUI7QUFFckJDLFFBQUFBLGVBQWUsRUFBZkEsZUFGcUI7QUFHckJDLFFBQUFBLGtCQUFrQixFQUFsQkEsa0JBSHFCO0FBSXJCQyxRQUFBQSxrQkFBa0IsRUFBbEJBLGtCQUpxQjtBQUtyQkMsUUFBQUEsY0FBYyxFQUFkQTtBQUxxQjtBQUQxQixLQXBCa0IsQ0FBckI7QUE2Qkg7O1NBRUQzQyxpQkFBQSx3QkFBZXFFLEtBQWYsRUFBc0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsU0FBS3RFLFNBQUwsR0FBaUI5RSx1REFBRyxDQUFDO0FBQ2pCcUosTUFBQUEsTUFBTSxFQUFFRCxLQURTO0FBRWpCRSxNQUFBQSxHQUFHLEVBQUUzSiwrRUFBeUJBO0FBRmIsS0FBRCxDQUFwQjtBQUtBLFdBQU8sSUFBUDtBQUNIOztTQUVEcUYsaUJBQUEsd0JBQWV1RSxRQUFmLEVBQXlCO0FBQ3JCLFFBQUksS0FBS3pFLFNBQVQsRUFBb0I7QUFDaEIsV0FBS0EsU0FBTCxDQUFlMEUsR0FBZixDQUFtQjtBQUNmQyxRQUFBQSxRQUFRLEVBQUVGLFFBREs7QUFFZkcsUUFBQUEsUUFBUSxFQUFFLFVBRks7QUFHZkMsUUFBQUEsWUFBWSxFQUFFSixRQUFRLENBQUMvSSxJQUFULENBQWMsY0FBZDtBQUhDLE9BQW5CO0FBS0g7O0FBRUQsV0FBTyxJQUFQO0FBQ0g7O1NBRUQrRSxRQUFBLGlCQUFRO0FBQ0osUUFBSSxLQUFLVCxTQUFULEVBQW9CO0FBQ2hCLFdBQUtBLFNBQUwsQ0FBZThFLFlBQWY7QUFDQSxhQUFPLEtBQUs5RSxTQUFMLENBQWUrRSxNQUFmLENBQXNCLE9BQXRCLENBQVA7QUFDSDs7QUFFRCxXQUFPLEtBQVA7QUFDSDs7O0VBbFYrQnBLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvc2VhcmNoLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGhvb2tzIH0gZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IENhdGFsb2dQYWdlIGZyb20gJy4vY2F0YWxvZyc7XG5pbXBvcnQgRmFjZXRlZFNlYXJjaCBmcm9tICcuL2NvbW1vbi9mYWNldGVkLXNlYXJjaCc7XG5pbXBvcnQgeyBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgY29tcGFyZVByb2R1Y3RzIGZyb20gJy4vZ2xvYmFsL2NvbXBhcmUtcHJvZHVjdHMnO1xuaW1wb3J0IHVybFV0aWxzIGZyb20gJy4vY29tbW9uL3V0aWxzL3VybC11dGlscyc7XG5pbXBvcnQgVXJsIGZyb20gJ3VybCc7XG5pbXBvcnQgY29sbGFwc2libGVGYWN0b3J5IGZyb20gJy4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCAnanN0cmVlJztcbmltcG9ydCBub2QgZnJvbSAnLi9jb21tb24vbm9kJztcblxuY29uc3QgbGVmdEFycm93S2V5ID0gMzc7XG5jb25zdCByaWdodEFycm93S2V5ID0gMzk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaCBleHRlbmRzIENhdGFsb2dQYWdlIHtcbiAgICBmb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUobm9kZSkge1xuICAgICAgICBjb25zdCBub2RlRGF0YSA9IHtcbiAgICAgICAgICAgIHRleHQ6IG5vZGUuZGF0YSxcbiAgICAgICAgICAgIGlkOiBub2RlLm1ldGFkYXRhLmlkLFxuICAgICAgICAgICAgc3RhdGU6IHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogbm9kZS5zZWxlY3RlZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKG5vZGUuc3RhdGUpIHtcbiAgICAgICAgICAgIG5vZGVEYXRhLnN0YXRlLm9wZW5lZCA9IG5vZGUuc3RhdGUgPT09ICdvcGVuJztcbiAgICAgICAgICAgIG5vZGVEYXRhLmNoaWxkcmVuID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICBub2RlRGF0YS5jaGlsZHJlbiA9IFtdO1xuICAgICAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZE5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICBub2RlRGF0YS5jaGlsZHJlbi5wdXNoKHRoaXMuZm9ybWF0Q2F0ZWdvcnlUcmVlRm9ySlNUcmVlKGNoaWxkTm9kZSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbm9kZURhdGE7XG4gICAgfVxuXG4gICAgc2hvd1Byb2R1Y3RzKG5hdmlnYXRlID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLiRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kZmFjZXRlZFNlYXJjaENvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy4kY29udGVudFJlc3VsdHNDb250YWluZXIuYWRkQ2xhc3MoJ3UtaGlkZGVuJyk7XG5cbiAgICAgICAgJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbi1jb2xvci0tYWN0aXZlJyk7XG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24nKTtcblxuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLnJlbW92ZUNsYXNzKCduYXZCYXItYWN0aW9uJyk7XG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykuYWRkQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xuXG4gICAgICAgIHRoaXMuYWN0aXZhdGVUYWIoJCgnW2RhdGEtcHJvZHVjdC1yZXN1bHRzLXRvZ2dsZV0nKSk7XG5cbiAgICAgICAgaWYgKCFuYXZpZ2F0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VhcmNoRGF0YSA9ICQoJyNzZWFyY2gtcmVzdWx0cy1wcm9kdWN0LWNvdW50IHNwYW4nKS5kYXRhKCk7XG4gICAgICAgIGNvbnN0IHVybCA9IChzZWFyY2hEYXRhLmNvdW50ID4gMCkgPyBzZWFyY2hEYXRhLnVybCA6IHVybFV0aWxzLnJlcGxhY2VQYXJhbXMoc2VhcmNoRGF0YS51cmwsIHtcbiAgICAgICAgICAgIHBhZ2U6IDEsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHVybFV0aWxzLmdvVG9VcmwodXJsKTtcbiAgICB9XG5cbiAgICBzaG93Q29udGVudChuYXZpZ2F0ZSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy4kY29udGVudFJlc3VsdHNDb250YWluZXIucmVtb3ZlQ2xhc3MoJ3UtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmFkZENsYXNzKCd1LWhpZGRlbicpO1xuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykucmVtb3ZlQ2xhc3MoJ25hdkJhci1hY3Rpb24tY29sb3ItLWFjdGl2ZScpO1xuICAgICAgICAkKCdbZGF0YS1wcm9kdWN0LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uJyk7XG5cbiAgICAgICAgJCgnW2RhdGEtY29udGVudC1yZXN1bHRzLXRvZ2dsZV0nKS5yZW1vdmVDbGFzcygnbmF2QmFyLWFjdGlvbicpO1xuICAgICAgICAkKCdbZGF0YS1jb250ZW50LXJlc3VsdHMtdG9nZ2xlXScpLmFkZENsYXNzKCduYXZCYXItYWN0aW9uLWNvbG9yLS1hY3RpdmUnKTtcblxuICAgICAgICB0aGlzLmFjdGl2YXRlVGFiKCQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykpO1xuXG4gICAgICAgIGlmICghbmF2aWdhdGUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNlYXJjaERhdGEgPSAkKCcjc2VhcmNoLXJlc3VsdHMtY29udGVudC1jb3VudCBzcGFuJykuZGF0YSgpO1xuICAgICAgICBjb25zdCB1cmwgPSAoc2VhcmNoRGF0YS5jb3VudCA+IDApID8gc2VhcmNoRGF0YS51cmwgOiB1cmxVdGlscy5yZXBsYWNlUGFyYW1zKHNlYXJjaERhdGEudXJsLCB7XG4gICAgICAgICAgICBwYWdlOiAxLFxuICAgICAgICB9KTtcblxuICAgICAgICB1cmxVdGlscy5nb1RvVXJsKHVybCk7XG4gICAgfVxuXG4gICAgYWN0aXZhdGVUYWIoJHRhYlRvQWN0aXZhdGUpIHtcbiAgICAgICAgY29uc3QgJHRhYnNDb2xsZWN0aW9uID0gJCgnW2RhdGEtc2VhcmNoLXBhZ2UtdGFic10nKS5maW5kKCdbcm9sZT1cInRhYlwiXScpO1xuXG4gICAgICAgICR0YWJzQ29sbGVjdGlvbi5lYWNoKChpZHgsIHRhYikgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHRhYiA9ICQodGFiKTtcblxuICAgICAgICAgICAgaWYgKCR0YWIuaXMoJHRhYlRvQWN0aXZhdGUpKSB7XG4gICAgICAgICAgICAgICAgJHRhYi5yZW1vdmVBdHRyKCd0YWJpbmRleCcpO1xuICAgICAgICAgICAgICAgICR0YWIuYXR0cignYXJpYS1zZWxlY3RlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHRhYi5hdHRyKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICAgICAgJHRhYi5hdHRyKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvblRhYkNoYW5nZVdpdGhBcnJvd3MoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgZXZlbnRLZXkgPSBldmVudC53aGljaDtcbiAgICAgICAgY29uc3QgaXNMZWZ0T3JSaWdodEFycm93S2V5ZG93biA9IGV2ZW50S2V5ID09PSBsZWZ0QXJyb3dLZXlcbiAgICAgICAgICAgIHx8IGV2ZW50S2V5ID09PSByaWdodEFycm93S2V5O1xuICAgICAgICBpZiAoIWlzTGVmdE9yUmlnaHRBcnJvd0tleWRvd24pIHJldHVybjtcblxuICAgICAgICBjb25zdCAkdGFic0NvbGxlY3Rpb24gPSAkKCdbZGF0YS1zZWFyY2gtcGFnZS10YWJzXScpLmZpbmQoJ1tyb2xlPVwidGFiXCJdJyk7XG5cbiAgICAgICAgY29uc3QgaXNBY3RpdmVFbGVtZW50Tm90VGFiID0gJHRhYnNDb2xsZWN0aW9uLmluZGV4KCQoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpID09PSAtMTtcbiAgICAgICAgaWYgKGlzQWN0aXZlRWxlbWVudE5vdFRhYikgcmV0dXJuO1xuXG4gICAgICAgIGNvbnN0ICRhY3RpdmVUYWIgPSAkKGAjJHtkb2N1bWVudC5hY3RpdmVFbGVtZW50LmlkfWApO1xuICAgICAgICBjb25zdCBhY3RpdmVUYWJJZHggPSAkdGFic0NvbGxlY3Rpb24uaW5kZXgoJGFjdGl2ZVRhYik7XG4gICAgICAgIGNvbnN0IGxhc3RUYWJJZHggPSAkdGFic0NvbGxlY3Rpb24ubGVuZ3RoIC0gMTtcblxuICAgICAgICBsZXQgbmV4dFRhYklkeDtcbiAgICAgICAgc3dpdGNoIChldmVudEtleSkge1xuICAgICAgICBjYXNlIGxlZnRBcnJvd0tleTpcbiAgICAgICAgICAgIG5leHRUYWJJZHggPSBhY3RpdmVUYWJJZHggPT09IDAgPyBsYXN0VGFiSWR4IDogYWN0aXZlVGFiSWR4IC0gMTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHJpZ2h0QXJyb3dLZXk6XG4gICAgICAgICAgICBuZXh0VGFiSWR4ID0gYWN0aXZlVGFiSWR4ID09PSBsYXN0VGFiSWR4ID8gMCA6IGFjdGl2ZVRhYklkeCArIDE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDogYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAkKCR0YWJzQ29sbGVjdGlvbi5nZXQobmV4dFRhYklkeCkpLmZvY3VzKCkudHJpZ2dlcignY2xpY2snKTtcbiAgICB9XG5cbiAgICBvblJlYWR5KCkge1xuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcbiAgICAgICAgdGhpcy5hcnJhbmdlRm9jdXNPblNvcnRCeSgpO1xuXG4gICAgICAgIGNvbnN0ICRzZWFyY2hGb3JtID0gJCgnW2RhdGEtYWR2YW5jZWQtc2VhcmNoLWZvcm1dJyk7XG4gICAgICAgIGNvbnN0ICRjYXRlZ29yeVRyZWVDb250YWluZXIgPSAkc2VhcmNoRm9ybS5maW5kKCdbZGF0YS1zZWFyY2gtY2F0ZWdvcnktdHJlZV0nKTtcbiAgICAgICAgY29uc3QgdXJsID0gVXJsLnBhcnNlKHdpbmRvdy5sb2NhdGlvbi5ocmVmLCB0cnVlKTtcbiAgICAgICAgY29uc3QgdHJlZURhdGEgPSBbXTtcbiAgICAgICAgdGhpcy4kcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLiRmYWNldGVkU2VhcmNoQ29udGFpbmVyID0gJCgnI2ZhY2V0ZWQtc2VhcmNoLWNvbnRhaW5lcicpO1xuICAgICAgICB0aGlzLiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciA9ICQoJyNzZWFyY2gtcmVzdWx0cy1jb250ZW50Jyk7XG5cbiAgICAgICAgLy8gSW5pdCBmYWNldGVkIHNlYXJjaFxuICAgICAgICBpZiAoJCgnI2ZhY2V0ZWRTZWFyY2gnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRGYWNldGVkU2VhcmNoKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9uU29ydEJ5U3VibWl0ID0gdGhpcy5vblNvcnRCeVN1Ym1pdC5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgaG9va3Mub24oJ3NvcnRCeS1zdWJtaXR0ZWQnLCB0aGlzLm9uU29ydEJ5U3VibWl0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXQgY29sbGFwc2libGVzXG4gICAgICAgIGNvbGxhcHNpYmxlRmFjdG9yeSgpO1xuXG4gICAgICAgICQoJ1tkYXRhLXByb2R1Y3QtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd1Byb2R1Y3RzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJ1tkYXRhLWNvbnRlbnQtcmVzdWx0cy10b2dnbGVdJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuc2hvd0NvbnRlbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnW2RhdGEtc2VhcmNoLXBhZ2UtdGFic10nKS5vbigna2V5dXAnLCB0aGlzLm9uVGFiQ2hhbmdlV2l0aEFycm93cyk7XG5cbiAgICAgICAgaWYgKHRoaXMuJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyLmZpbmQoJ2xpLnByb2R1Y3QnKS5sZW5ndGggPT09IDAgfHwgdXJsLnF1ZXJ5LnNlY3Rpb24gPT09ICdjb250ZW50Jykge1xuICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudChmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3dQcm9kdWN0cyhmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCB2YWxpZGF0b3IgPSB0aGlzLmluaXRWYWxpZGF0aW9uKCRzZWFyY2hGb3JtKVxuICAgICAgICAgICAgLmJpbmRWYWxpZGF0aW9uKCRzZWFyY2hGb3JtLmZpbmQoJyNzZWFyY2hfcXVlcnlfYWR2JykpO1xuXG4gICAgICAgIHRoaXMuY29udGV4dC5jYXRlZ29yeVRyZWUuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgdHJlZURhdGEucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShub2RlKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSA9IHRyZWVEYXRhO1xuICAgICAgICB0aGlzLmNyZWF0ZUNhdGVnb3J5VHJlZSgkY2F0ZWdvcnlUcmVlQ29udGFpbmVyKTtcblxuICAgICAgICAkc2VhcmNoRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRDYXRlZ29yeUlkcyA9ICRjYXRlZ29yeVRyZWVDb250YWluZXIuanN0cmVlKCkuZ2V0X3NlbGVjdGVkKCk7XG5cbiAgICAgICAgICAgIGlmICghdmFsaWRhdG9yLmNoZWNrKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJHNlYXJjaEZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNhdGVnb3J5XFxbXFxdXCJdJykucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2F0ZWdvcnlJZCBvZiBzZWxlY3RlZENhdGVnb3J5SWRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW5wdXQgPSAkKCc8aW5wdXQ+Jywge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ2NhdGVnb3J5W10nLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY2F0ZWdvcnlJZCxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICRzZWFyY2hGb3JtLmFwcGVuZChpbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0ICRzZWFyY2hSZXN1bHRzTWVzc2FnZSA9ICQoYDxwXG4gICAgICAgICAgICBjbGFzcz1cImFyaWEtZGVzY3JpcHRpb24tLWhpZGRlblwiXG4gICAgICAgICAgICB0YWJpbmRleD1cIi0xXCJcbiAgICAgICAgICAgIHJvbGU9XCJzdGF0dXNcIlxuICAgICAgICAgICAgYXJpYS1saXZlPVwicG9saXRlXCJcbiAgICAgICAgICAgID4ke3RoaXMuY29udGV4dC5zZWFyY2hSZXN1bHRzQ291bnR9PC9wPmApXG4gICAgICAgICAgICAucHJlcGVuZFRvKCdib2R5Jyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiAkc2VhcmNoUmVzdWx0c01lc3NhZ2UuZm9jdXMoKSwgMTAwKTtcbiAgICB9XG5cbiAgICBsb2FkVHJlZU5vZGVzKG5vZGUsIGNiKSB7XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6ICcvcmVtb3RlL3YxL2NhdGVnb3J5LXRyZWUnLFxuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkQ2F0ZWdvcnlJZDogbm9kZS5pZCxcbiAgICAgICAgICAgICAgICBwcmVmaXg6ICdjYXRlZ29yeScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgICd4LXhzcmYtdG9rZW4nOiB3aW5kb3cuQkNEYXRhICYmIHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA/IHdpbmRvdy5CQ0RhdGEuY3NyZl90b2tlbiA6ICcnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSkuZG9uZShkYXRhID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZFJlc3VsdHMgPSBbXTtcblxuICAgICAgICAgICAgZGF0YS5mb3JFYWNoKChkYXRhTm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgIGZvcm1hdHRlZFJlc3VsdHMucHVzaCh0aGlzLmZvcm1hdENhdGVnb3J5VHJlZUZvckpTVHJlZShkYXRhTm9kZSkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNiKGZvcm1hdHRlZFJlc3VsdHMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVDYXRlZ29yeVRyZWUoJGNvbnRhaW5lcikge1xuICAgICAgICBjb25zdCB0cmVlT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGNvcmU6IHtcbiAgICAgICAgICAgICAgICBkYXRhOiAobm9kZSwgY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUm9vdCBub2RlXG4gICAgICAgICAgICAgICAgICAgIGlmIChub2RlLmlkID09PSAnIycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNiKHRoaXMuY2F0ZWdvcnlUcmVlRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMYXp5IGxvYWRlZCBjaGlsZHJlblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2FkVHJlZU5vZGVzKG5vZGUsIGNiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdGhlbWVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGljb25zOiB0cnVlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2hlY2tib3g6IHtcbiAgICAgICAgICAgICAgICB0aHJlZV9zdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgICAgICAgICdjaGVja2JveCcsXG4gICAgICAgICAgICBdLFxuICAgICAgICB9O1xuXG4gICAgICAgICRjb250YWluZXIuanN0cmVlKHRyZWVPcHRpb25zKTtcbiAgICB9XG5cbiAgICBpbml0RmFjZXRlZFNlYXJjaCgpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG9iamVjdC1jdXJseS1uZXdsaW5lXG4gICAgICAgIGNvbnN0IHsgb25NaW5QcmljZUVycm9yLCBvbk1heFByaWNlRXJyb3IsIG1pblByaWNlTm90RW50ZXJlZCwgbWF4UHJpY2VOb3RFbnRlcmVkLCBvbkludmFsaWRQcmljZSB9ID0gdGhpcy5jb250ZXh0O1xuICAgICAgICBjb25zdCAkcHJvZHVjdExpc3RpbmdDb250YWluZXIgPSAkKCcjcHJvZHVjdC1saXN0aW5nLWNvbnRhaW5lcicpO1xuICAgICAgICBjb25zdCAkY29udGVudExpc3RpbmdDb250YWluZXIgPSAkKCcjc2VhcmNoLXJlc3VsdHMtY29udGVudCcpO1xuICAgICAgICBjb25zdCAkZmFjZXRlZFNlYXJjaENvbnRhaW5lciA9ICQoJyNmYWNldGVkLXNlYXJjaC1jb250YWluZXInKTtcbiAgICAgICAgY29uc3QgJHNlYXJjaEhlYWRpbmcgPSAkKCcjc2VhcmNoLXJlc3VsdHMtaGVhZGluZycpO1xuICAgICAgICBjb25zdCAkc2VhcmNoQ291bnQgPSAkKCcjc2VhcmNoLXJlc3VsdHMtcHJvZHVjdC1jb3VudCcpO1xuICAgICAgICBjb25zdCAkY29udGVudENvdW50ID0gJCgnI3NlYXJjaC1yZXN1bHRzLWNvbnRlbnQtY291bnQnKTtcbiAgICAgICAgY29uc3QgcHJvZHVjdHNQZXJQYWdlID0gdGhpcy5jb250ZXh0LnNlYXJjaFByb2R1Y3RzUGVyUGFnZTtcbiAgICAgICAgY29uc3QgcmVxdWVzdE9wdGlvbnMgPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZToge1xuICAgICAgICAgICAgICAgIHByb2R1Y3RMaXN0aW5nOiAnc2VhcmNoL3Byb2R1Y3QtbGlzdGluZycsXG4gICAgICAgICAgICAgICAgY29udGVudExpc3Rpbmc6ICdzZWFyY2gvY29udGVudC1saXN0aW5nJyxcbiAgICAgICAgICAgICAgICBzaWRlYmFyOiAnc2VhcmNoL3NpZGViYXInLFxuICAgICAgICAgICAgICAgIGhlYWRpbmc6ICdzZWFyY2gvaGVhZGluZycsXG4gICAgICAgICAgICAgICAgcHJvZHVjdENvdW50OiAnc2VhcmNoL3Byb2R1Y3QtY291bnQnLFxuICAgICAgICAgICAgICAgIGNvbnRlbnRDb3VudDogJ3NlYXJjaC9jb250ZW50LWNvdW50JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maWc6IHtcbiAgICAgICAgICAgICAgICBwcm9kdWN0X3Jlc3VsdHM6IHtcbiAgICAgICAgICAgICAgICAgICAgbGltaXQ6IHByb2R1Y3RzUGVyUGFnZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNob3dNb3JlOiAnc2VhcmNoL3Nob3ctbW9yZScsXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5mYWNldGVkU2VhcmNoID0gbmV3IEZhY2V0ZWRTZWFyY2gocmVxdWVzdE9wdGlvbnMsIChjb250ZW50KSA9PiB7XG4gICAgICAgICAgICAkc2VhcmNoSGVhZGluZy5odG1sKGNvbnRlbnQuaGVhZGluZyk7XG5cbiAgICAgICAgICAgIGNvbnN0IHVybCA9IFVybC5wYXJzZSh3aW5kb3cubG9jYXRpb24uaHJlZiwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAodXJsLnF1ZXJ5LnNlY3Rpb24gPT09ICdjb250ZW50Jykge1xuICAgICAgICAgICAgICAgICRjb250ZW50TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQuY29udGVudExpc3RpbmcpO1xuICAgICAgICAgICAgICAgICRjb250ZW50Q291bnQuaHRtbChjb250ZW50LmNvbnRlbnRDb3VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93Q29udGVudChmYWxzZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRwcm9kdWN0TGlzdGluZ0NvbnRhaW5lci5odG1sKGNvbnRlbnQucHJvZHVjdExpc3RpbmcpO1xuICAgICAgICAgICAgICAgICRmYWNldGVkU2VhcmNoQ29udGFpbmVyLmh0bWwoY29udGVudC5zaWRlYmFyKTtcbiAgICAgICAgICAgICAgICAkc2VhcmNoQ291bnQuaHRtbChjb250ZW50LnByb2R1Y3RDb3VudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UHJvZHVjdHMoZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwLFxuICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yTWVzc2FnZXM6IHtcbiAgICAgICAgICAgICAgICBvbk1pblByaWNlRXJyb3IsXG4gICAgICAgICAgICAgICAgb25NYXhQcmljZUVycm9yLFxuICAgICAgICAgICAgICAgIG1pblByaWNlTm90RW50ZXJlZCxcbiAgICAgICAgICAgICAgICBtYXhQcmljZU5vdEVudGVyZWQsXG4gICAgICAgICAgICAgICAgb25JbnZhbGlkUHJpY2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0VmFsaWRhdGlvbigkZm9ybSkge1xuICAgICAgICB0aGlzLiRmb3JtID0gJGZvcm07XG4gICAgICAgIHRoaXMudmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJGZvcm0sXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCRlbGVtZW50KSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6ICdwcmVzZW5jZScsXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiAkZWxlbWVudC5kYXRhKCdlcnJvck1lc3NhZ2UnKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgY2hlY2soKSB7XG4gICAgICAgIGlmICh0aGlzLnZhbGlkYXRvcikge1xuICAgICAgICAgICAgdGhpcy52YWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy52YWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cbiJdLCJuYW1lcyI6WyJob29rcyIsIkNhdGFsb2dQYWdlIiwiRmFjZXRlZFNlYXJjaCIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCJjb21wYXJlUHJvZHVjdHMiLCJ1cmxVdGlscyIsIlVybCIsImNvbGxhcHNpYmxlRmFjdG9yeSIsIm5vZCIsImxlZnRBcnJvd0tleSIsInJpZ2h0QXJyb3dLZXkiLCJTZWFyY2giLCJmb3JtYXRDYXRlZ29yeVRyZWVGb3JKU1RyZWUiLCJub2RlIiwibm9kZURhdGEiLCJ0ZXh0IiwiZGF0YSIsImlkIiwibWV0YWRhdGEiLCJzdGF0ZSIsInNlbGVjdGVkIiwib3BlbmVkIiwiY2hpbGRyZW4iLCJmb3JFYWNoIiwiY2hpbGROb2RlIiwicHVzaCIsInNob3dQcm9kdWN0cyIsIm5hdmlnYXRlIiwiJHByb2R1Y3RMaXN0aW5nQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCIkZmFjZXRlZFNlYXJjaENvbnRhaW5lciIsIiRjb250ZW50UmVzdWx0c0NvbnRhaW5lciIsImFkZENsYXNzIiwiJCIsImFjdGl2YXRlVGFiIiwic2VhcmNoRGF0YSIsInVybCIsImNvdW50IiwicmVwbGFjZVBhcmFtcyIsInBhZ2UiLCJnb1RvVXJsIiwic2hvd0NvbnRlbnQiLCIkdGFiVG9BY3RpdmF0ZSIsIiR0YWJzQ29sbGVjdGlvbiIsImZpbmQiLCJlYWNoIiwiaWR4IiwidGFiIiwiJHRhYiIsImlzIiwicmVtb3ZlQXR0ciIsImF0dHIiLCJvblRhYkNoYW5nZVdpdGhBcnJvd3MiLCJldmVudCIsImV2ZW50S2V5Iiwid2hpY2giLCJpc0xlZnRPclJpZ2h0QXJyb3dLZXlkb3duIiwiaXNBY3RpdmVFbGVtZW50Tm90VGFiIiwiaW5kZXgiLCJkb2N1bWVudCIsImFjdGl2ZUVsZW1lbnQiLCIkYWN0aXZlVGFiIiwiYWN0aXZlVGFiSWR4IiwibGFzdFRhYklkeCIsImxlbmd0aCIsIm5leHRUYWJJZHgiLCJnZXQiLCJmb2N1cyIsInRyaWdnZXIiLCJvblJlYWR5IiwiY29udGV4dCIsImFycmFuZ2VGb2N1c09uU29ydEJ5IiwiJHNlYXJjaEZvcm0iLCIkY2F0ZWdvcnlUcmVlQ29udGFpbmVyIiwicGFyc2UiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJ0cmVlRGF0YSIsImluaXRGYWNldGVkU2VhcmNoIiwib25Tb3J0QnlTdWJtaXQiLCJiaW5kIiwib24iLCJwcmV2ZW50RGVmYXVsdCIsInF1ZXJ5Iiwic2VjdGlvbiIsInZhbGlkYXRvciIsImluaXRWYWxpZGF0aW9uIiwiYmluZFZhbGlkYXRpb24iLCJjYXRlZ29yeVRyZWUiLCJjYXRlZ29yeVRyZWVEYXRhIiwiY3JlYXRlQ2F0ZWdvcnlUcmVlIiwic2VsZWN0ZWRDYXRlZ29yeUlkcyIsImpzdHJlZSIsImdldF9zZWxlY3RlZCIsImNoZWNrIiwicmVtb3ZlIiwiY2F0ZWdvcnlJZCIsImlucHV0IiwidHlwZSIsIm5hbWUiLCJ2YWx1ZSIsImFwcGVuZCIsIiRzZWFyY2hSZXN1bHRzTWVzc2FnZSIsInNlYXJjaFJlc3VsdHNDb3VudCIsInByZXBlbmRUbyIsInNldFRpbWVvdXQiLCJsb2FkVHJlZU5vZGVzIiwiY2IiLCJhamF4Iiwic2VsZWN0ZWRDYXRlZ29yeUlkIiwicHJlZml4IiwiaGVhZGVycyIsIkJDRGF0YSIsImNzcmZfdG9rZW4iLCJkb25lIiwiZm9ybWF0dGVkUmVzdWx0cyIsImRhdGFOb2RlIiwiJGNvbnRhaW5lciIsInRyZWVPcHRpb25zIiwiY29yZSIsInRoZW1lcyIsImljb25zIiwiY2hlY2tib3giLCJ0aHJlZV9zdGF0ZSIsInBsdWdpbnMiLCJvbk1pblByaWNlRXJyb3IiLCJvbk1heFByaWNlRXJyb3IiLCJtaW5QcmljZU5vdEVudGVyZWQiLCJtYXhQcmljZU5vdEVudGVyZWQiLCJvbkludmFsaWRQcmljZSIsIiRjb250ZW50TGlzdGluZ0NvbnRhaW5lciIsIiRzZWFyY2hIZWFkaW5nIiwiJHNlYXJjaENvdW50IiwiJGNvbnRlbnRDb3VudCIsInByb2R1Y3RzUGVyUGFnZSIsInNlYXJjaFByb2R1Y3RzUGVyUGFnZSIsInJlcXVlc3RPcHRpb25zIiwidGVtcGxhdGUiLCJwcm9kdWN0TGlzdGluZyIsImNvbnRlbnRMaXN0aW5nIiwic2lkZWJhciIsImhlYWRpbmciLCJwcm9kdWN0Q291bnQiLCJjb250ZW50Q291bnQiLCJjb25maWciLCJwcm9kdWN0X3Jlc3VsdHMiLCJsaW1pdCIsInNob3dNb3JlIiwiZmFjZXRlZFNlYXJjaCIsImNvbnRlbnQiLCJodG1sIiwidHJpZ2dlckhhbmRsZXIiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwidmFsaWRhdGlvbkVycm9yTWVzc2FnZXMiLCIkZm9ybSIsInN1Ym1pdCIsInRhcCIsIiRlbGVtZW50IiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImVycm9yTWVzc2FnZSIsInBlcmZvcm1DaGVjayIsImFyZUFsbCJdLCJzb3VyY2VSb290IjoiIn0=