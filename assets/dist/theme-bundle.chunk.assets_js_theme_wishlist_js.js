"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_wishlist_js"],{

/***/ "./assets/js/theme/common/utils/pagination-utils.js":
/*!**********************************************************!*\
  !*** ./assets/js/theme/common/utils/pagination-utils.js ***!
  \**********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "wishlistPaginatorHelper": function() { return /* binding */ wishlistPaginatorHelper; }
/* harmony export */ });
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
var changeWishlistPaginationLinks = function changeWishlistPaginationLinks(wishlistUrl) {
  for (var _len = arguments.length, paginationItems = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    paginationItems[_key - 1] = arguments[_key];
  }
  return $.each(paginationItems, function (_, $item) {
    var paginationLink = $item.children('.pagination-link');
    if ($item.length && !paginationLink.attr('href').includes('page=')) {
      var pageNumber = paginationLink.attr('href');
      paginationLink.attr('href', wishlistUrl + "page=" + pageNumber);
    }
  });
};

/**
 * helps to withdraw differences in structures around the stencil resource pagination
 */
var wishlistPaginatorHelper = function wishlistPaginatorHelper() {
  var $paginationList = $('.pagination-list');
  if (!$paginationList.length) return;
  var $nextItem = $('.pagination-item--next', $paginationList);
  var $prevItem = $('.pagination-item--previous', $paginationList);
  var currentHref = $('[data-pagination-current-page-link]').attr('href');
  var partialPaginationUrl = currentHref.split('page=').shift();
  changeWishlistPaginationLinks(partialPaginationUrl, $prevItem, $nextItem);
};

/***/ }),

/***/ "./assets/js/theme/wishlist.js":
/*!*************************************!*\
  !*** ./assets/js/theme/wishlist.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ WishList; }
/* harmony export */ });
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation */ "./node_modules/foundation-sites/js/foundation/foundation.js");
/* harmony import */ var foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! foundation-sites/js/foundation/foundation.reveal */ "./node_modules/foundation-sites/js/foundation/foundation.reveal.js");
/* harmony import */ var foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(foundation_sites_js_foundation_foundation_reveal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_utils_pagination_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/pagination-utils */ "./assets/js/theme/common/utils/pagination-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var WishList = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(WishList, _PageManager);
  function WishList(context) {
    var _this;
    _this = _PageManager.call(this, context) || this;
    _this.options = {
      template: 'account/add-wishlist'
    };
    return _assertThisInitialized(_this) || _assertThisInitialized(_this);
  }

  /**
   * Creates a confirm box before deleting all wish lists
   */
  var _proto = WishList.prototype;
  _proto.wishlistDeleteConfirm = function wishlistDeleteConfirm() {
    var _this2 = this;
    $('body').on('click', '[data-wishlist-delete]', function (event) {
      var confirmed = window.confirm(_this2.context.wishlistDelete);
      if (confirmed) {
        return true;
      }
      event.preventDefault();
    });
  };
  _proto.registerAddWishListValidation = function registerAddWishListValidation($addWishlistForm) {
    var _this3 = this;
    this.addWishlistValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_2__["default"])({
      submit: '.wishlist-form input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    this.addWishlistValidator.add([{
      selector: '.wishlist-form input[name="wishlistname"]',
      validate: function validate(cb, val) {
        var result = val.length > 0;
        cb(result);
      },
      errorMessage: this.context.enterWishlistNameError
    }]);
    $addWishlistForm.on('submit', function (event) {
      _this3.addWishlistValidator.performCheck();
      if (_this3.addWishlistValidator.areAll('valid')) {
        return;
      }
      event.preventDefault();
    });
  };
  _proto.onReady = function onReady() {
    var $addWishListForm = $('.wishlist-form');
    if ($('[data-pagination-wishlist]').length) {
      (0,_common_utils_pagination_utils__WEBPACK_IMPORTED_MODULE_4__.wishlistPaginatorHelper)();
    }
    if ($addWishListForm.length) {
      this.registerAddWishListValidation($addWishListForm);
    }
    this.wishlistDeleteConfirm();
  };
  return WishList;
}(_page_manager__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV93aXNobGlzdF9qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLElBQU1BLDZCQUE2QixHQUFHLFNBQWhDQSw2QkFBNkJBLENBQUlDLFdBQVc7RUFBQSxTQUFBQyxJQUFBLEdBQUFDLFNBQUEsQ0FBQUMsTUFBQSxFQUFLQyxlQUFlLE9BQUFDLEtBQUEsQ0FBQUosSUFBQSxPQUFBQSxJQUFBLFdBQUFLLElBQUEsTUFBQUEsSUFBQSxHQUFBTCxJQUFBLEVBQUFLLElBQUE7SUFBZkYsZUFBZSxDQUFBRSxJQUFBLFFBQUFKLFNBQUEsQ0FBQUksSUFBQTtFQUFBO0VBQUEsT0FBS0MsQ0FBQyxDQUFDQyxJQUFJLENBQUNKLGVBQWUsRUFBRSxVQUFDSyxDQUFDLEVBQUVDLEtBQUssRUFBSztJQUM3RyxJQUFNQyxjQUFjLEdBQUdELEtBQUssQ0FBQ0UsUUFBUSxDQUFDLGtCQUFrQixDQUFDO0lBRXpELElBQUlGLEtBQUssQ0FBQ1AsTUFBTSxJQUFJLENBQUNRLGNBQWMsQ0FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7TUFDaEUsSUFBTUMsVUFBVSxHQUFHSixjQUFjLENBQUNFLElBQUksQ0FBQyxNQUFNLENBQUM7TUFDOUNGLGNBQWMsQ0FBQ0UsSUFBSSxDQUFDLE1BQU0sRUFBS2IsV0FBVyxhQUFRZSxVQUFVLENBQUc7SUFDbkU7RUFDSixDQUFDLENBQUM7QUFBQTs7QUFFRjtBQUNBO0FBQ0E7QUFDTyxJQUFNQyx1QkFBdUIsR0FBRyxTQUExQkEsdUJBQXVCQSxDQUFBLEVBQVM7RUFDekMsSUFBTUMsZUFBZSxHQUFHVixDQUFDLENBQUMsa0JBQWtCLENBQUM7RUFFN0MsSUFBSSxDQUFDVSxlQUFlLENBQUNkLE1BQU0sRUFBRTtFQUU3QixJQUFNZSxTQUFTLEdBQUdYLENBQUMsQ0FBQyx3QkFBd0IsRUFBRVUsZUFBZSxDQUFDO0VBQzlELElB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QUFJZ0QsZ0JBQWdCLENBQUM3RCxNQUFNLEVBQUU7TUFDekIsSUFBSSxDQUFDNEMsNkJBQTZCLENBQUNpQixnQkFBZ0IsQ0FBQztJQUN4RDtJQUVBLElBQUksQ0FBQzFCLHFCQUFxQixFQUFFO0VBQ2hDLENBQUM7RUFBQSxPQUFBWCxRQUFBO0FBQUEsRUFuRWlDRixxREFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy9wYWdpbmF0aW9uLXV0aWxzLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL3dpc2hsaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGNoYW5nZVdpc2hsaXN0UGFnaW5hdGlvbkxpbmtzID0gKHdpc2hsaXN0VXJsLCAuLi5wYWdpbmF0aW9uSXRlbXMpID0+ICQuZWFjaChwYWdpbmF0aW9uSXRlbXMsIChfLCAkaXRlbSkgPT4ge1xuICAgIGNvbnN0IHBhZ2luYXRpb25MaW5rID0gJGl0ZW0uY2hpbGRyZW4oJy5wYWdpbmF0aW9uLWxpbmsnKTtcblxuICAgIGlmICgkaXRlbS5sZW5ndGggJiYgIXBhZ2luYXRpb25MaW5rLmF0dHIoJ2hyZWYnKS5pbmNsdWRlcygncGFnZT0nKSkge1xuICAgICAgICBjb25zdCBwYWdlTnVtYmVyID0gcGFnaW5hdGlvbkxpbmsuYXR0cignaHJlZicpO1xuICAgICAgICBwYWdpbmF0aW9uTGluay5hdHRyKCdocmVmJywgYCR7d2lzaGxpc3RVcmx9cGFnZT0ke3BhZ2VOdW1iZXJ9YCk7XG4gICAgfVxufSk7XG5cbi8qKlxuICogaGVscHMgdG8gd2l0aGRyYXcgZGlmZmVyZW5jZXMgaW4gc3RydWN0dXJlcyBhcm91bmQgdGhlIHN0ZW5jaWwgcmVzb3VyY2UgcGFnaW5hdGlvblxuICovXG5leHBvcnQgY29uc3Qgd2lzaGxpc3RQYWdpbmF0b3JIZWxwZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgJHBhZ2luYXRpb25MaXN0ID0gJCgnLnBhZ2luYXRpb24tbGlzdCcpO1xuXG4gICAgaWYgKCEkcGFnaW5hdGlvbkxpc3QubGVuZ3RoKSByZXR1cm47XG5cbiAgICBjb25zdCAkbmV4dEl0ZW0gPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1uZXh0JywgJHBhZ2luYXRpb25MaXN0KTtcbiAgICBjb25zdCAkcHJldkl0ZW0gPSAkKCcucGFnaW5hdGlvbi1pdGVtLS1wcmV2aW91cycsICRwYWdpbmF0aW9uTGlzdCk7XG4gICAgY29uc3QgY3VycmVudEhyZWYgPSAkKCdbZGF0YS1wYWdpbmF0aW9uLWN1cnJlbnQtcGFnZS1saW5rXScpLmF0dHIoJ2hyZWYnKTtcbiAgICBjb25zdCBwYXJ0aWFsUGFnaW5hdGlvblVybCA9IGN1cnJlbnRIcmVmLnNwbGl0KCdwYWdlPScpLnNoaWZ0KCk7XG5cbiAgICBjaGFuZ2VXaXNobGlzdFBhZ2luYXRpb25MaW5rcyhwYXJ0aWFsUGFnaW5hdGlvblVybCwgJHByZXZJdGVtLCAkbmV4dEl0ZW0pO1xufTtcbiIsImltcG9ydCAnZm91bmRhdGlvbi1zaXRlcy9qcy9mb3VuZGF0aW9uL2ZvdW5kYXRpb24nO1xuaW1wb3J0ICdmb3VuZGF0aW9uLXNpdGVzL2pzL2ZvdW5kYXRpb24vZm91bmRhdGlvbi5yZXZlYWwnO1xuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xuaW1wb3J0IFBhZ2VNYW5hZ2VyIGZyb20gJy4vcGFnZS1tYW5hZ2VyJztcbmltcG9ydCB7IHdpc2hsaXN0UGFnaW5hdG9ySGVscGVyIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvcGFnaW5hdGlvbi11dGlscyc7XG5pbXBvcnQgeyBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdpc2hMaXN0IGV4dGVuZHMgUGFnZU1hbmFnZXIge1xuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIoY29udGV4dCk7XG5cbiAgICAgICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICAgICAgdGVtcGxhdGU6ICdhY2NvdW50L2FkZC13aXNobGlzdCcsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGNvbmZpcm0gYm94IGJlZm9yZSBkZWxldGluZyBhbGwgd2lzaCBsaXN0c1xuICAgICAqL1xuICAgIHdpc2hsaXN0RGVsZXRlQ29uZmlybSgpIHtcbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS13aXNobGlzdC1kZWxldGVdJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgY29uZmlybWVkID0gd2luZG93LmNvbmZpcm0odGhpcy5jb250ZXh0Lndpc2hsaXN0RGVsZXRlKTtcblxuICAgICAgICAgICAgaWYgKGNvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlckFkZFdpc2hMaXN0VmFsaWRhdGlvbigkYWRkV2lzaGxpc3RGb3JtKSB7XG4gICAgICAgIHRoaXMuYWRkV2lzaGxpc3RWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAnLndpc2hsaXN0LWZvcm0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuYWRkV2lzaGxpc3RWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJy53aXNobGlzdC1mb3JtIGlucHV0W25hbWU9XCJ3aXNobGlzdG5hbWVcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoID4gMDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLmNvbnRleHQuZW50ZXJXaXNobGlzdE5hbWVFcnJvcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuXG4gICAgICAgICRhZGRXaXNobGlzdEZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIHRoaXMuYWRkV2lzaGxpc3RWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmFkZFdpc2hsaXN0VmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25SZWFkeSgpIHtcbiAgICAgICAgY29uc3QgJGFkZFdpc2hMaXN0Rm9ybSA9ICQoJy53aXNobGlzdC1mb3JtJyk7XG5cbiAgICAgICAgaWYgKCQoJ1tkYXRhLXBhZ2luYXRpb24td2lzaGxpc3RdJykubGVuZ3RoKSB7XG4gICAgICAgICAgICB3aXNobGlzdFBhZ2luYXRvckhlbHBlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRhZGRXaXNoTGlzdEZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyQWRkV2lzaExpc3RWYWxpZGF0aW9uKCRhZGRXaXNoTGlzdEZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53aXNobGlzdERlbGV0ZUNvbmZpcm0oKTtcbiAgICB9XG59XG4iXSwibmFtZXMiOlsiY2hhbmdlV2lzaGxpc3RQYWdpbmF0aW9uTGlua3MiLCJ3aXNobGlzdFVybCIsIl9sZW4iLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJwYWdpbmF0aW9uSXRlbXMiLCJBcnJheSIsIl9rZXkiLCIkIiwiZWFjaCIsIl8iLCIkaXRlbSIsInBhZ2luYXRpb25MaW5rIiwiY2hpbGRyZW4iLCJhdHRyIiwiaW5jbHVkZXMiLCJwYWdlTnVtYmVyIiwid2lzaGxpc3RQYWdpbmF0b3JIZWxwZXIiLCIkcGFnaW5hdGlvbkxpc3QiLCIkbmV4dEl0ZW0iLCIkcHJldkl0ZW0iLCJjdXJyZW50SHJlZiIsInBhcnRpYWxQYWdpbmF0aW9uVXJsIiwic3BsaXQiLCJzaGlmdCIsIm5vZCIsIlBhZ2VNYW5hZ2VyIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsIldpc2hMaXN0IiwiX1BhZ2VNYW5hZ2VyIiwiX2luaGVyaXRzTG9vc2UiLCJjb250ZXh0IiwiX3RoaXMiLCJjYWxsIiwib3B0aW9ucyIsInRlbXBsYXRlIiwiX2Fzc2VydFRoaXNJbml0aWFsaXplZCIsIl9wcm90byIsInByb3RvdHlwZSIsIndpc2hsaXN0RGVsZXRlQ29uZmlybSIsIl90aGlzMiIsIm9uIiwiZXZlbnQiLCJjb25maXJtZWQiLCJ3aW5kb3ciLCJjb25maXJtIiwid2lzaGxpc3REZWxldGUiLCJwcmV2ZW50RGVmYXVsdCIsInJlZ2lzdGVyQWRkV2lzaExpc3RWYWxpZGF0aW9uIiwiJGFkZFdpc2hsaXN0Rm9ybSIsIl90aGlzMyIsImFkZFdpc2hsaXN0VmFsaWRhdG9yIiwic3VibWl0IiwidGFwIiwiYWRkIiwic2VsZWN0b3IiLCJ2YWxpZGF0ZSIsImNiIiwidmFsIiwicmVzdWx0IiwiZXJyb3JNZXNzYWdlIiwiZW50ZXJXaXNobGlzdE5hbWVFcnJvciIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsIm9uUmVhZHkiLCIkYWRkV2lzaExpc3RGb3JtIiwiZGVmYXVsdCJdLCJzb3VyY2VSb290IjoiIn0=