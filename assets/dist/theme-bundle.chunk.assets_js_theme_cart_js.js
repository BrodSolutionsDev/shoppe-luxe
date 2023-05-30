"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_cart_js"],{

/***/ "./assets/js/theme/cart.js":
/*!*********************************!*\
  !*** ./assets/js/theme/cart.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Cart; }
/* harmony export */ });
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/debounce */ "./node_modules/lodash/debounce.js");
/* harmony import */ var lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_debounce__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/bind */ "./node_modules/lodash/bind.js");
/* harmony import */ var lodash_bind__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_bind__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cart/shipping-estimator */ "./assets/js/theme/cart/shipping-estimator.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/cart-item-details */ "./assets/js/theme/common/cart-item-details.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }









var Cart = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Cart, _PageManager);

  function Cart() {
    return _PageManager.apply(this, arguments) || this;
  }

  var _proto = Cart.prototype;

  _proto.onReady = function onReady() {
    this.$modal = null;
    this.$cartPageContent = $('[data-cart]');
    this.$cartContent = $('[data-cart-content]');
    this.$cartMessages = $('[data-cart-status]');
    this.$cartTotals = $('[data-cart-totals]');
    this.$cartAdditionalCheckoutBtns = $('[data-cart-additional-checkout-buttons]');
    this.$overlay = $('[data-cart] .loadingOverlay').hide(); // TODO: temporary until roper pulls in his cart components

    this.$activeCartItemId = null;
    this.$activeCartItemBtnAction = null;
    this.setApplePaySupport();
    this.bindEvents();
  };

  _proto.setApplePaySupport = function setApplePaySupport() {
    if (window.ApplePaySession) {
      this.$cartPageContent.addClass('apple-pay-supported');
    }
  };

  _proto.cartUpdate = function cartUpdate($target) {
    var _this = this;

    var itemId = $target.data('cartItemid');
    this.$activeCartItemId = itemId;
    this.$activeCartItemBtnAction = $target.data('action');
    var $el = $("#qty-" + itemId);
    var oldQty = parseInt($el.val(), 10);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = $target.data('action') === 'inc' ? oldQty + 1 : oldQty - 1; // Does not quality for min/max quantity

    if (newQty < minQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this.refreshContent(remove);
      } else {
        $el.val(oldQty);
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };

  _proto.cartUpdateQtyTextChange = function cartUpdateQtyTextChange($target, preVal) {
    var _this2 = this;

    if (preVal === void 0) {
      preVal = null;
    }

    var itemId = $target.data('cartItemid');
    var $el = $("#qty-" + itemId);
    var maxQty = parseInt($el.data('quantityMax'), 10);
    var minQty = parseInt($el.data('quantityMin'), 10);
    var oldQty = preVal !== null ? preVal : minQty;
    var minError = $el.data('quantityMinError');
    var maxError = $el.data('quantityMaxError');
    var newQty = parseInt(Number($el.val()), 10);
    var invalidEntry; // Does not quality for min/max quantity

    if (!Number.isInteger(newQty)) {
      invalidEntry = $el.val();
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(this.context.invalidEntryMessage.replace('[ENTRY]', invalidEntry));
    } else if (newQty < minQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(minError);
    } else if (maxQty > 0 && newQty > maxQty) {
      $el.val(oldQty);
      return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(maxError);
    }

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemUpdate(itemId, newQty, function (err, response) {
      _this2.$overlay.hide();

      if (response.data.status === 'succeed') {
        // if the quantity is changed "1" from "0", we have to remove the row.
        var remove = newQty === 0;

        _this2.refreshContent(remove);
      } else {
        $el.val(oldQty);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };

  _proto.cartRemoveItem = function cartRemoveItem(itemId) {
    var _this3 = this;

    this.$overlay.show();
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.itemRemove(itemId, function (err, response) {
      if (response.data.status === 'succeed') {
        _this3.refreshContent(true);
      } else {
        _this3.$overlay.hide();

        (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
      }
    });
  };

  _proto.cartEditOptions = function cartEditOptions(itemId, productId) {
    var _this4 = this;

    var context = Object.assign({
      productForChangeId: productId
    }, this.context);
    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();

    if (this.$modal === null) {
      this.$modal = $('#modal');
    }

    var options = {
      template: 'cart/modals/configure-product'
    };
    modal.open();
    this.$modal.find('.modal-content').addClass('hide-content');
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.configureInCart(itemId, options, function (err, response) {
      modal.updateContent(response.content);

      var optionChangeHandler = function optionChangeHandler() {
        var $productOptionsContainer = $('[data-product-attributes-wrapper]', _this4.$modal);
        var modalBodyReservedHeight = $productOptionsContainer.outerHeight();

        if ($productOptionsContainer.length && modalBodyReservedHeight) {
          $productOptionsContainer.css('height', modalBodyReservedHeight);
        }
      };

      if (_this4.$modal.hasClass('open')) {
        optionChangeHandler();
      } else {
        _this4.$modal.one(_global_modal__WEBPACK_IMPORTED_MODULE_7__.ModalEvents.opened, optionChangeHandler);
      }

      _this4.productDetails = new _common_cart_item_details__WEBPACK_IMPORTED_MODULE_8__["default"](_this4.$modal, context);

      _this4.bindGiftWrappingForm();
    });
    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].hooks.on('product-option-change', function (event, currentTarget) {
      var $form = $(currentTarget).find('form');
      var $submit = $('input.button', $form);
      var $messageBox = $('.alertMessageBox');
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.productAttributes.optionChange(productId, $form.serialize(), function (err, result) {
        var data = result.data || {};

        if (err) {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(err);
          return false;
        }

        if (data.purchasing_message) {
          $('p.alertBox-message', $messageBox).text(data.purchasing_message);
          $submit.prop('disabled', true);
          $messageBox.show();
        } else {
          $submit.prop('disabled', false);
          $messageBox.hide();
        }

        if (!data.purchasable || !data.instock) {
          $submit.prop('disabled', true);
        } else {
          $submit.prop('disabled', false);
        }
      });
    });
  };

  _proto.refreshContent = function refreshContent(remove) {
    var _this5 = this;

    var $cartItemsRows = $('[data-item-row]', this.$cartContent);
    var $cartPageTitle = $('[data-cart-page-title]');
    var options = {
      template: {
        content: 'cart/content',
        totals: 'cart/totals',
        pageTitle: 'cart/page-title',
        statusMessages: 'cart/status-messages',
        additionalCheckoutButtons: 'cart/additional-checkout-buttons'
      }
    };
    this.$overlay.show(); // Remove last item from cart? Reload

    if (remove && $cartItemsRows.length === 1) {
      return window.location.reload();
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getContent(options, function (err, response) {
      _this5.$cartContent.html(response.content);

      _this5.$cartTotals.html(response.totals);

      _this5.$cartMessages.html(response.statusMessages);

      _this5.$cartAdditionalCheckoutBtns.html(response.additionalCheckoutButtons);

      $cartPageTitle.replaceWith(response.pageTitle);
      var quantity = $('[data-cart-quantity]', _this5.$cartContent).data('cartQuantity') || 0;

      if (!quantity) {
        return window.location.reload();
      }

      _this5.bindEvents();

      _this5.$overlay.hide();

      $('body').trigger('cart-quantity-update', quantity);
      $("[data-cart-itemid='" + _this5.$activeCartItemId + "']", _this5.$cartContent).filter("[data-action='" + _this5.$activeCartItemBtnAction + "']").trigger('focus');
    });
  };

  _proto.bindCartEvents = function bindCartEvents() {
    var _this6 = this;

    var debounceTimeout = 400;

    var cartUpdate = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdate, debounceTimeout), this);

    var cartUpdateQtyTextChange = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartUpdateQtyTextChange, debounceTimeout), this);

    var cartRemoveItem = lodash_bind__WEBPACK_IMPORTED_MODULE_1___default()(lodash_debounce__WEBPACK_IMPORTED_MODULE_0___default()(this.cartRemoveItem, debounceTimeout), this);

    var preVal; // cart update

    $('[data-cart-update]', this.$cartContent).on('click', function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdate($target);
    }); // cart qty manually updates

    $('.cart-item-qty-input', this.$cartContent).on('focus', function onQtyFocus() {
      preVal = this.value;
    }).change(function (event) {
      var $target = $(event.currentTarget);
      event.preventDefault(); // update cart quantity

      cartUpdateQtyTextChange($target, preVal);
    });
    $('.cart-remove', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('cartItemid');
      var string = $(event.currentTarget).data('confirmDelete');
      (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(string, {
        icon: 'warning',
        showCancelButton: true,
        onConfirm: function onConfirm() {
          // remove item from cart
          cartRemoveItem(itemId);
        }
      });
      event.preventDefault();
    });
    $('[data-item-edit]', this.$cartContent).on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemEdit');
      var productId = $(event.currentTarget).data('productId');
      event.preventDefault(); // edit item in cart

      _this6.cartEditOptions(itemId, productId);
    });
  };

  _proto.bindPromoCodeEvents = function bindPromoCodeEvents() {
    var _this7 = this;

    var $couponContainer = $('.coupon-code');
    var $couponForm = $('.coupon-form');
    var $codeInput = $('[name="couponcode"]', $couponForm);
    $('.coupon-code-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).hide();
      $couponContainer.show();
      $('.coupon-code-cancel').show();
      $codeInput.trigger('focus');
    });
    $('.coupon-code-cancel').on('click', function (event) {
      event.preventDefault();
      $couponContainer.hide();
      $('.coupon-code-cancel').hide();
      $('.coupon-code-add').show();
    });
    $couponForm.on('submit', function (event) {
      var code = $codeInput.val();
      event.preventDefault(); // Empty code

      if (!code) {
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)($codeInput.data('error'));
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyCode(code, function (err, response) {
        if (response.data.status === 'success') {
          _this7.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(response.data.errors.join('\n'));
        }
      });
    });
  };

  _proto.bindGiftCertificateEvents = function bindGiftCertificateEvents() {
    var _this8 = this;

    var $certContainer = $('.gift-certificate-code');
    var $certForm = $('.cart-gift-certificate-form');
    var $certInput = $('[name="certcode"]', $certForm);
    $('.gift-certificate-add').on('click', function (event) {
      event.preventDefault();
      $(event.currentTarget).toggle();
      $certContainer.toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $('.gift-certificate-cancel').on('click', function (event) {
      event.preventDefault();
      $certContainer.toggle();
      $('.gift-certificate-add').toggle();
      $('.gift-certificate-cancel').toggle();
    });
    $certForm.on('submit', function (event) {
      var code = $certInput.val();
      event.preventDefault();

      if (!(0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_3__["default"])(code)) {
        var validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(_this8.context);
        return (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(validationDictionary.invalid_gift_certificate);
      }

      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.applyGiftCertificate(code, function (err, resp) {
        if (resp.data.status === 'success') {
          _this8.refreshContent();
        } else {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.showAlertModal)(resp.data.errors.join('\n'));
        }
      });
    });
  };

  _proto.bindGiftWrappingEvents = function bindGiftWrappingEvents() {
    var _this9 = this;

    var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
    $('[data-item-giftwrap]').on('click', function (event) {
      var itemId = $(event.currentTarget).data('itemGiftwrap');
      var options = {
        template: 'cart/modals/gift-wrapping-form'
      };
      event.preventDefault();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_5__["default"].api.cart.getItemGiftWrappingOptions(itemId, options, function (err, response) {
        modal.updateContent(response.content);

        _this9.bindGiftWrappingForm();
      });
    });
  };

  _proto.bindGiftWrappingForm = function bindGiftWrappingForm() {
    $('.giftWrapping-select').on('change', function (event) {
      var $select = $(event.currentTarget);
      var id = $select.val();
      var index = $select.data('index');

      if (!id) {
        return;
      }

      var allowMessage = $select.find("option[value=" + id + "]").data('allowMessage');
      $(".giftWrapping-image-" + index).hide();
      $("#giftWrapping-image-" + index + "-" + id).show();

      if (allowMessage) {
        $("#giftWrapping-message-" + index).show();
      } else {
        $("#giftWrapping-message-" + index).hide();
      }
    });
    $('.giftWrapping-select').trigger('change');

    function toggleViews() {
      var value = $('input:radio[name ="giftwraptype"]:checked').val();
      var $singleForm = $('.giftWrapping-single');
      var $multiForm = $('.giftWrapping-multiple');

      if (value === 'same') {
        $singleForm.show();
        $multiForm.hide();
      } else {
        $singleForm.hide();
        $multiForm.show();
      }
    }

    $('[name="giftwraptype"]').on('click', toggleViews);
    toggleViews();
  };

  _proto.bindEvents = function bindEvents() {
    this.bindCartEvents();
    this.bindPromoCodeEvents();
    this.bindGiftWrappingEvents();
    this.bindGiftCertificateEvents(); // initiate shipping estimator module

    var shippingErrorMessages = {
      country: this.context.shippingCountryErrorMessage,
      province: this.context.shippingProvinceErrorMessage
    };
    this.shippingEstimator = new _cart_shipping_estimator__WEBPACK_IMPORTED_MODULE_6__["default"]($('[data-shipping-estimator]'), shippingErrorMessages);
  };

  return Cart;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./assets/js/theme/cart/shipping-estimator.js":
/*!****************************************************!*\
  !*** ./assets/js/theme/cart/shipping-estimator.js ***!
  \****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ShippingEstimator; }
/* harmony export */ });
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_collapsible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/collapsible */ "./assets/js/theme/common/collapsible.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");







var ShippingEstimator = /*#__PURE__*/function () {
  function ShippingEstimator($element, shippingErrorMessages) {
    this.$element = $element;
    this.$state = $('[data-field-type="State"]', this.$element);
    this.isEstimatorFormOpened = false;
    this.shippingErrorMessages = shippingErrorMessages;
    this.initFormValidation();
    this.bindStateCountryChange();
    this.bindEstimatorEvents();
  }

  var _proto = ShippingEstimator.prototype;

  _proto.initFormValidation = function initFormValidation() {
    var _this = this;

    var shippingEstimatorAlert = $('.shipping-quotes');
    this.shippingEstimator = 'form[data-shipping-estimator]';
    this.shippingValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: this.shippingEstimator + " .shipping-estimate-submit",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.announceInputErrorMessage
    });
    $('.shipping-estimate-submit', this.$element).on('click', function (event) {
      // estimator error messages are being injected in html as a result
      // of user submit; clearing and adding role on submit provides
      // regular announcement of these error messages
      if (shippingEstimatorAlert.attr('role')) {
        shippingEstimatorAlert.removeAttr('role');
      }

      shippingEstimatorAlert.attr('role', 'alert'); // When switching between countries, the state/region is dynamic
      // Only perform a check for all fields when country has a value
      // Otherwise areAll('valid') will check country for validity

      if ($(_this.shippingEstimator + " select[name=\"shipping-country\"]").val()) {
        _this.shippingValidator.performCheck();
      }

      if (_this.shippingValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
    this.bindValidation();
    this.bindStateValidation();
    this.bindUPSRates();
  };

  _proto.bindValidation = function bindValidation() {
    this.shippingValidator.add([{
      selector: this.shippingEstimator + " select[name=\"shipping-country\"]",
      validate: function validate(cb, val) {
        var countryId = Number(val);
        var result = countryId !== 0 && !Number.isNaN(countryId);
        cb(result);
      },
      errorMessage: this.shippingErrorMessages.country
    }]);
  };

  _proto.bindStateValidation = function bindStateValidation() {
    var _this2 = this;

    this.shippingValidator.add([{
      selector: $(this.shippingEstimator + " select[name=\"shipping-state\"]"),
      validate: function validate(cb) {
        var result;
        var $ele = $(_this2.shippingEstimator + " select[name=\"shipping-state\"]");

        if ($ele.length) {
          var eleVal = $ele.val();
          result = eleVal && eleVal.length && eleVal !== 'State/province';
        }

        cb(result);
      },
      errorMessage: this.shippingErrorMessages.province
    }]);
  }
  /**
   * Toggle between default shipping and ups shipping rates
   */
  ;

  _proto.bindUPSRates = function bindUPSRates() {
    var UPSRateToggle = '.estimator-form-toggleUPSRate';
    $('body').on('click', UPSRateToggle, function (event) {
      var $estimatorFormUps = $('.estimator-form--ups');
      var $estimatorFormDefault = $('.estimator-form--default');
      event.preventDefault();
      $estimatorFormUps.toggleClass('u-hiddenVisually');
      $estimatorFormDefault.toggleClass('u-hiddenVisually');
    });
  };

  _proto.bindStateCountryChange = function bindStateCountryChange() {
    var _this3 = this;

    var $last; // Requests the states for a country with AJAX

    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_0__["default"])(this.$state, this.context, {
      useIdForStates: true
    }, function (err, field) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_5__.showAlertModal)(err);
        throw new Error(err);
      }

      var $field = $(field);

      if (_this3.shippingValidator.getStatus(_this3.$state) !== 'undefined') {
        _this3.shippingValidator.remove(_this3.$state);
      }

      if ($last) {
        _this3.shippingValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;

        _this3.bindStateValidation();
      } else {
        $field.attr('placeholder', 'State/province');
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.Validators.cleanUpStateValidation(field);
      } // When you change a country, you swap the state/province between an input and a select dropdown
      // Not all countries require the province to be filled
      // We have to remove this class when we swap since nod validation doesn't cleanup for us


      $(_this3.shippingEstimator).find('.form-field--success').removeClass('form-field--success');
    });
  };

  _proto.toggleEstimatorFormState = function toggleEstimatorFormState(toggleButton, buttonSelector, $toggleContainer) {
    var changeAttributesOnToggle = function changeAttributesOnToggle(selectorToActivate) {
      $(toggleButton).attr('aria-labelledby', selectorToActivate);
      $(buttonSelector).text($("#" + selectorToActivate).text());
    };

    if (!this.isEstimatorFormOpened) {
      changeAttributesOnToggle('estimator-close');
      $toggleContainer.removeClass('u-hidden');
    } else {
      changeAttributesOnToggle('estimator-add');
      $toggleContainer.addClass('u-hidden');
    }

    this.isEstimatorFormOpened = !this.isEstimatorFormOpened;
  };

  _proto.bindEstimatorEvents = function bindEstimatorEvents() {
    var _this4 = this;

    var $estimatorContainer = $('.shipping-estimator');
    var $estimatorForm = $('.estimator-form');
    (0,_common_collapsible__WEBPACK_IMPORTED_MODULE_4__["default"])();
    $estimatorForm.on('submit', function (event) {
      var params = {
        country_id: $('[name="shipping-country"]', $estimatorForm).val(),
        state_id: $('[name="shipping-state"]', $estimatorForm).val(),
        city: $('[name="shipping-city"]', $estimatorForm).val(),
        zip_code: $('[name="shipping-zip"]', $estimatorForm).val()
      };
      event.preventDefault();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.getShippingQuotes(params, 'cart/shipping-quotes', function (err, response) {
        $('.shipping-quotes').html(response.content); // bind the select button

        $('.select-shipping-quote').on('click', function (clickEvent) {
          var quoteId = $('.shipping-quote:checked').val();
          clickEvent.preventDefault();
          _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.cart.submitShippingQuote(quoteId, function () {
            window.location.reload();
          });
        });
      });
    });
    $('.shipping-estimate-show').on('click', function (event) {
      event.preventDefault();

      _this4.toggleEstimatorFormState(event.currentTarget, '.shipping-estimate-show__btn-name', $estimatorContainer);
    });
  };

  return ShippingEstimator;
}();



/***/ }),

/***/ "./assets/js/theme/common/cart-item-details.js":
/*!*****************************************************!*\
  !*** ./assets/js/theme/common/cart-item-details.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ CartItemDetails; }
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _product_details_base__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-details-base */ "./assets/js/theme/common/product-details-base.js");
/* harmony import */ var _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/ie-helpers */ "./assets/js/theme/common/utils/ie-helpers.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");


function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var CartItemDetails = /*#__PURE__*/function (_ProductDetailsBase) {
  _inheritsLoose(CartItemDetails, _ProductDetailsBase);

  function CartItemDetails($scope, context, productAttributesData) {
    var _this;

    if (productAttributesData === void 0) {
      productAttributesData = {};
    }

    _this = _ProductDetailsBase.call(this, $scope, context) || this;
    var $form = $('#CartEditProductFieldsForm', _this.$scope);
    var $productOptionsElement = $('[data-product-attributes-wrapper]', $form);
    var hasOptions = $productOptionsElement.html().trim().length;
    var hasDefaultOptions = $productOptionsElement.find('[data-default]').length;
    $productOptionsElement.on('change', function () {
      _this.setProductVariant();
    });
    var optionChangeCallback = _product_details_base__WEBPACK_IMPORTED_MODULE_2__.optionChangeDecorator.call(_assertThisInitialized(_this), hasDefaultOptions); // Update product attributes. Also update the initial view in case items are oos
    // or have default variant properties that change the view

    if ((lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(productAttributesData) || hasDefaultOptions) && hasOptions) {
      var productId = _this.context.productForChangeId;
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_1__["default"].api.productAttributes.optionChange(productId, $form.serialize(), 'products/bulk-discount-rates', optionChangeCallback);
    } else {
      _this.updateProductAttributes(productAttributesData);
    }

    return _this;
  }

  var _proto = CartItemDetails.prototype;

  _proto.setProductVariant = function setProductVariant() {
    var unsatisfiedRequiredFields = [];
    var options = [];
    $.each($('[data-product-attribute]'), function (index, value) {
      var optionLabel = value.children[0].innerText;
      var optionTitle = optionLabel.split(':')[0].trim();
      var required = optionLabel.toLowerCase().includes('required');
      var type = value.getAttribute('data-product-attribute');

      if ((type === 'input-file' || type === 'input-text' || type === 'input-number') && value.querySelector('input').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'textarea' && value.querySelector('textarea').value === '' && required) {
        unsatisfiedRequiredFields.push(value);
      }

      if (type === 'date') {
        var isSatisfied = Array.from(value.querySelectorAll('select')).every(function (select) {
          return select.selectedIndex !== 0;
        });

        if (isSatisfied) {
          var dateString = Array.from(value.querySelectorAll('select')).map(function (x) {
            return x.value;
          }).join('-');
          options.push(optionTitle + ":" + dateString);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-select') {
        var select = value.querySelector('select');
        var selectedIndex = select.selectedIndex;

        if (selectedIndex !== 0) {
          options.push(optionTitle + ":" + select.options[selectedIndex].innerText);
          return;
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }

      if (type === 'set-rectangle' || type === 'set-radio' || type === 'swatch' || type === 'input-checkbox' || type === 'product-list') {
        var checked = value.querySelector(':checked');

        if (checked) {
          var getSelectedOptionLabel = function getSelectedOptionLabel() {
            var productVariantslist = (0,_utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.convertIntoArray)(value.children);

            var matchLabelForCheckedInput = function matchLabelForCheckedInput(inpt) {
              return inpt.dataset.productAttributeValue === checked.value;
            };

            return productVariantslist.filter(matchLabelForCheckedInput)[0];
          };

          if (type === 'set-rectangle' || type === 'set-radio' || type === 'product-list') {
            var label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().innerText.trim() : checked.labels[0].innerText;

            if (label) {
              options.push(optionTitle + ":" + label);
            }
          }

          if (type === 'swatch') {
            var _label = _utils_ie_helpers__WEBPACK_IMPORTED_MODULE_3__.isBrowserIE ? getSelectedOptionLabel().children[0] : checked.labels[0].children[0];

            if (_label) {
              options.push(optionTitle + ":" + _label.title);
            }
          }

          if (type === 'input-checkbox') {
            options.push(optionTitle + ":Yes");
          }

          return;
        }

        if (type === 'input-checkbox') {
          options.push(optionTitle + ":No");
        }

        if (required) {
          unsatisfiedRequiredFields.push(value);
        }
      }
    });
    var productVariant = unsatisfiedRequiredFields.length === 0 ? options.sort().join(', ') : 'unsatisfied';
    var view = $('.modal-header-title');

    if (productVariant) {
      productVariant = productVariant === 'unsatisfied' ? '' : productVariant;

      if (view.attr('data-event-type')) {
        view.attr('data-product-variant', productVariant);
      } else {
        var productName = view.html().match(/'(.*?)'/)[1];
        var card = $("[data-name=\"" + productName + "\"]");
        card.attr('data-product-variant', productVariant);
      }
    }
  }
  /**
   * Hide or mark as unavailable out of stock attributes if enabled
   * @param  {Object} data Product attribute data
   */
  ;

  _proto.updateProductAttributes = function updateProductAttributes(data) {
    _ProductDetailsBase.prototype.updateProductAttributes.call(this, data);

    this.$scope.find('.modal-content').removeClass('hide-content');
  };

  return CartItemDetails;
}(_product_details_base__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./assets/js/theme/common/gift-certificate-validator.js":
/*!**************************************************************!*\
  !*** ./assets/js/theme/common/gift-certificate-validator.js ***!
  \**************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(cert) {
  if (typeof cert !== 'string' || cert.length === 0) {
    return false;
  } // Add any custom gift certificate validation logic here


  return true;
}

/***/ }),

/***/ "./assets/js/theme/common/state-country.js":
/*!*************************************************!*\
  !*** ./assets/js/theme/common/state-country.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* export default binding */ __WEBPACK_DEFAULT_EXPORT__; }
/* harmony export */ });
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/isEmpty */ "./node_modules/lodash/isEmpty.js");
/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/transform */ "./node_modules/lodash/transform.js");
/* harmony import */ var lodash_transform__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_transform__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _utils_form_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");





/**
 * If there are no options from bcapp, a text field will be sent. This will create a select element to hold options after the remote request.
 * @returns {jQuery|HTMLElement}
 */

function makeStateRequired(stateElement, context) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });

  var replacementAttributes = {
    id: attrs.id,
    'data-label': attrs['data-label'],
    class: 'form-select',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<select></select>', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');
  var $hiddenInput = $('[name*="FormFieldIsText"]');

  if ($hiddenInput.length !== 0) {
    $hiddenInput.remove();
  }

  if ($newElement.prev().find('small').length === 0) {
    // String is injected from localizer
    $newElement.prev().append("<small>" + context.required + "</small>");
  } else {
    $newElement.prev().find('small').show();
  }

  return $newElement;
}
/**
 * If a country with states is the default, a select will be sent,
 * In this case we need to be able to switch to an input field and hide the required field
 */


function makeStateOptional(stateElement) {
  var attrs = lodash_transform__WEBPACK_IMPORTED_MODULE_1___default()(stateElement.prop('attributes'), function (result, item) {
    var ret = result;
    ret[item.name] = item.value;
    return ret;
  });

  var replacementAttributes = {
    type: 'text',
    id: attrs.id,
    'data-label': attrs['data-label'],
    class: 'form-input',
    name: attrs.name,
    'data-field-type': attrs['data-field-type']
  };
  stateElement.replaceWith($('<input />', replacementAttributes));
  var $newElement = $('[data-field-type="State"]');

  if ($newElement.length !== 0) {
    (0,_utils_form_utils__WEBPACK_IMPORTED_MODULE_3__.insertStateHiddenField)($newElement);
    $newElement.prev().find('small').hide();
  }

  return $newElement;
}
/**
 * Adds the array of options from the remote request to the newly created select box.
 * @param {Object} statesArray
 * @param {jQuery} $selectElement
 * @param {Object} options
 */


function addOptions(statesArray, $selectElement, options) {
  var container = [];
  container.push("<option value=\"\">" + statesArray.prefix + "</option>");

  if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()($selectElement)) {
    statesArray.states.forEach(function (stateObj) {
      if (options.useIdForStates) {
        container.push("<option value=\"" + stateObj.id + "\">" + stateObj.name + "</option>");
      } else {
        container.push("<option value=\"" + stateObj.name + "\">" + (stateObj.label ? stateObj.label : stateObj.name) + "</option>");
      }
    });
    $selectElement.html(container.join(' '));
  }
}
/**
 *
 * @param {jQuery} stateElement
 * @param {Object} context
 * @param {Object} options
 * @param {Function} callback
 */


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(stateElement, context, options, callback) {
  if (context === void 0) {
    context = {};
  }

  /**
   * Backwards compatible for three parameters instead of four
   *
   * Available options:
   *
   * useIdForStates {Bool} - Generates states dropdown using id for values instead of strings
   */
  if (typeof options === 'function') {
    /* eslint-disable no-param-reassign */
    callback = options;
    options = {};
    /* eslint-enable no-param-reassign */
  }

  $('select[data-field-type="Country"]').on('change', function (event) {
    var countryName = $(event.currentTarget).val();

    if (countryName === '') {
      return;
    }

    _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_2__["default"].api.country.getByName(countryName, function (err, response) {
      if (err) {
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_4__.showAlertModal)(context.state_error);
        return callback(err);
      }

      var $currentInput = $('[data-field-type="State"]');

      if (!lodash_isEmpty__WEBPACK_IMPORTED_MODULE_0___default()(response.data.states)) {
        // The element may have been replaced with a select, reselect it
        var $selectElement = makeStateRequired($currentInput, context);
        addOptions(response.data, $selectElement, options);
        callback(null, $selectElement);
      } else {
        var newElement = makeStateOptional($currentInput, context);
        callback(null, newElement);
      }
    });
  });
}

/***/ }),

/***/ "./assets/js/theme/common/utils/translations-utils.js":
/*!************************************************************!*\
  !*** ./assets/js/theme/common/utils/translations-utils.js ***!
  \************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTranslationDictionary": function() { return /* binding */ createTranslationDictionary; }
/* harmony export */ });
var TRANSLATIONS = 'translations';

var isTranslationDictionaryNotEmpty = function isTranslationDictionaryNotEmpty(dictionary) {
  return !!Object.keys(dictionary[TRANSLATIONS]).length;
};

var chooseActiveDictionary = function chooseActiveDictionary() {
  for (var i = 0; i < arguments.length; i++) {
    var dictionary = JSON.parse(i < 0 || arguments.length <= i ? undefined : arguments[i]);

    if (isTranslationDictionaryNotEmpty(dictionary)) {
      return dictionary;
    }
  }
};
/**
 * defines Translation Dictionary to use
 * @param context provides access to 3 validation JSONs from en.json:
 * validation_messages, validation_fallback_messages and default_messages
 * @returns {Object}
 */


var createTranslationDictionary = function createTranslationDictionary(context) {
  var validationDictionaryJSON = context.validationDictionaryJSON,
      validationFallbackDictionaryJSON = context.validationFallbackDictionaryJSON,
      validationDefaultDictionaryJSON = context.validationDefaultDictionaryJSON;
  var activeDictionary = chooseActiveDictionary(validationDictionaryJSON, validationFallbackDictionaryJSON, validationDefaultDictionaryJSON);
  var localizations = Object.values(activeDictionary[TRANSLATIONS]);
  var translationKeys = Object.keys(activeDictionary[TRANSLATIONS]).map(function (key) {
    return key.split('.').pop();
  });
  return translationKeys.reduce(function (acc, key, i) {
    acc[key] = localizations[i];
    return acc;
  }, {});
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9jYXJ0X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCUzs7Ozs7Ozs7O1NBQ2pCQyxVQUFBLG1CQUFVO0FBQ04sU0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QkMsQ0FBQyxDQUFDLGFBQUQsQ0FBekI7QUFDQSxTQUFLQyxZQUFMLEdBQW9CRCxDQUFDLENBQUMscUJBQUQsQ0FBckI7QUFDQSxTQUFLRSxhQUFMLEdBQXFCRixDQUFDLENBQUMsb0JBQUQsQ0FBdEI7QUFDQSxTQUFLRyxXQUFMLEdBQW1CSCxDQUFDLENBQUMsb0JBQUQsQ0FBcEI7QUFDQSxTQUFLSSwyQkFBTCxHQUFtQ0osQ0FBQyxDQUFDLHlDQUFELENBQXBDO0FBQ0EsU0FBS0ssUUFBTCxHQUFnQkwsQ0FBQyxDQUFDLDZCQUFELENBQUQsQ0FDWE0sSUFEVyxFQUFoQixDQVBNLENBUU87O0FBQ2IsU0FBS0MsaUJBQUwsR0FBeUIsSUFBekI7QUFDQSxTQUFLQyx3QkFBTCxHQUFnQyxJQUFoQztBQUVBLFNBQUtDLGtCQUFMO0FBQ0EsU0FBS0MsVUFBTDtBQUNIOztTQUVERCxxQkFBQSw4QkFBcUI7QUFDakIsUUFBSUUsTUFBTSxDQUFDQyxlQUFYLEVBQTRCO0FBQ3hCLFdBQUtiLGdCQUFMLENBQXNCYyxRQUF0QixDQUErQixxQkFBL0I7QUFDSDtBQUNKOztTQUVEQyxhQUFBLG9CQUFXQyxPQUFYLEVBQW9CO0FBQUE7O0FBQ2hCLFFBQU1DLE1BQU0sR0FBR0QsT0FBTyxDQUFDRSxJQUFSLENBQWEsWUFBYixDQUFmO0FBQ0EsU0FBS1YsaUJBQUwsR0FBeUJTLE1BQXpCO0FBQ0EsU0FBS1Isd0JBQUwsR0FBZ0NPLE9BQU8sQ0FBQ0UsSUFBUixDQUFhLFFBQWIsQ0FBaEM7QUFFQSxRQUFNQyxHQUFH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TSxFQUdKLEVBSEksQ0FBUDtBQUlILENBVk0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jYXJ0LmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NhcnQvc2hpcHBpbmctZXN0aW1hdG9yLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi9jYXJ0LWl0ZW0tZGV0YWlscy5qcyIsIndlYnBhY2s6Ly9iaWdjb21tZXJjZS1jb3JuZXJzdG9uZS8uL2Fzc2V0cy9qcy90aGVtZS9jb21tb24vZ2lmdC1jZXJ0aWZpY2F0ZS12YWxpZGF0b3IuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3N0YXRlLWNvdW50cnkuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IHsgYmluZCwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFNoaXBwaW5nRXN0aW1hdG9yIGZyb20gJy4vY2FydC9zaGlwcGluZy1lc3RpbWF0b3InO1xuaW1wb3J0IHsgZGVmYXVsdE1vZGFsLCBzaG93QWxlcnRNb2RhbCwgTW9kYWxFdmVudHMgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5pbXBvcnQgQ2FydEl0ZW1EZXRhaWxzIGZyb20gJy4vY29tbW9uL2NhcnQtaXRlbS1kZXRhaWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FydCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBvblJlYWR5KCkge1xuICAgICAgICB0aGlzLiRtb2RhbCA9IG51bGw7XG4gICAgICAgIHRoaXMuJGNhcnRQYWdlQ29udGVudCA9ICQoJ1tkYXRhLWNhcnRdJyk7XG4gICAgICAgIHRoaXMuJGNhcnRDb250ZW50ID0gJCgnW2RhdGEtY2FydC1jb250ZW50XScpO1xuICAgICAgICB0aGlzLiRjYXJ0TWVzc2FnZXMgPSAkKCdbZGF0YS1jYXJ0LXN0YXR1c10nKTtcbiAgICAgICAgdGhpcy4kY2FydFRvdGFscyA9ICQoJ1tkYXRhLWNhcnQtdG90YWxzXScpO1xuICAgICAgICB0aGlzLiRjYXJ0QWRkaXRpb25hbENoZWNrb3V0QnRucyA9ICQoJ1tkYXRhLWNhcnQtYWRkaXRpb25hbC1jaGVja291dC1idXR0b25zXScpO1xuICAgICAgICB0aGlzLiRvdmVybGF5ID0gJCgnW2RhdGEtY2FydF0gLmxvYWRpbmdPdmVybGF5JylcbiAgICAgICAgICAgIC5oaWRlKCk7IC8vIFRPRE86IHRlbXBvcmFyeSB1bnRpbCByb3BlciBwdWxscyBpbiBoaXMgY2FydCBjb21wb25lbnRzXG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBudWxsO1xuICAgICAgICB0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbiA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5zZXRBcHBsZVBheVN1cHBvcnQoKTtcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgc2V0QXBwbGVQYXlTdXBwb3J0KCkge1xuICAgICAgICBpZiAod2luZG93LkFwcGxlUGF5U2Vzc2lvbikge1xuICAgICAgICAgICAgdGhpcy4kY2FydFBhZ2VDb250ZW50LmFkZENsYXNzKCdhcHBsZS1wYXktc3VwcG9ydGVkJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlKCR0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgaXRlbUlkID0gJHRhcmdldC5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtSWQgPSBpdGVtSWQ7XG4gICAgICAgIHRoaXMuJGFjdGl2ZUNhcnRJdGVtQnRuQWN0aW9uID0gJHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblxuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xuICAgICAgICBjb25zdCBvbGRRdHkgPSBwYXJzZUludCgkZWwudmFsKCksIDEwKTtcbiAgICAgICAgY29uc3QgbWF4UXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWF4JyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluUXR5ID0gcGFyc2VJbnQoJGVsLmRhdGEoJ3F1YW50aXR5TWluJyksIDEwKTtcbiAgICAgICAgY29uc3QgbWluRXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNaW5FcnJvcicpO1xuICAgICAgICBjb25zdCBtYXhFcnJvciA9ICRlbC5kYXRhKCdxdWFudGl0eU1heEVycm9yJyk7XG4gICAgICAgIGNvbnN0IG5ld1F0eSA9ICR0YXJnZXQuZGF0YSgnYWN0aW9uJykgPT09ICdpbmMnID8gb2xkUXR5ICsgMSA6IG9sZFF0eSAtIDE7XG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcbiAgICAgICAgaWYgKG5ld1F0eSA8IG1pblF0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKG1pbkVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXhRdHkgPiAwICYmIG5ld1F0eSA+IG1heFF0eSkge1xuICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKG1heEVycm9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJG92ZXJsYXkuc2hvdygpO1xuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwgPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGl0ZW1JZCA9ICR0YXJnZXQuZGF0YSgnY2FydEl0ZW1pZCcpO1xuICAgICAgICBjb25zdCAkZWwgPSAkKGAjcXR5LSR7aXRlbUlkfWApO1xuICAgICAgICBjb25zdCBtYXhRdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNYXgnKSwgMTApO1xuICAgICAgICBjb25zdCBtaW5RdHkgPSBwYXJzZUludCgkZWwuZGF0YSgncXVhbnRpdHlNaW4nKSwgMTApO1xuICAgICAgICBjb25zdCBvbGRRdHkgPSBwcmVWYWwgIT09IG51bGwgPyBwcmVWYWwgOiBtaW5RdHk7XG4gICAgICAgIGNvbnN0IG1pbkVycm9yID0gJGVsLmRhdGEoJ3F1YW50aXR5TWluRXJyb3InKTtcbiAgICAgICAgY29uc3QgbWF4RXJyb3IgPSAkZWwuZGF0YSgncXVhbnRpdHlNYXhFcnJvcicpO1xuICAgICAgICBjb25zdCBuZXdRdHkgPSBwYXJzZUludChOdW1iZXIoJGVsLnZhbCgpKSwgMTApO1xuICAgICAgICBsZXQgaW52YWxpZEVudHJ5O1xuXG4gICAgICAgIC8vIERvZXMgbm90IHF1YWxpdHkgZm9yIG1pbi9tYXggcXVhbnRpdHlcbiAgICAgICAgaWYgKCFOdW1iZXIuaXNJbnRlZ2VyKG5ld1F0eSkpIHtcbiAgICAgICAgICAgIGludmFsaWRFbnRyeSA9ICRlbC52YWwoKTtcbiAgICAgICAgICAgICRlbC52YWwob2xkUXR5KTtcbiAgICAgICAgICAgIHJldHVybiBzaG93QWxlcnRNb2RhbCh0aGlzLmNvbnRleHQuaW52YWxpZEVudHJ5TWVzc2FnZS5yZXBsYWNlKCdbRU5UUlldJywgaW52YWxpZEVudHJ5KSk7XG4gICAgICAgIH0gZWxzZSBpZiAobmV3UXR5IDwgbWluUXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWluRXJyb3IpO1xuICAgICAgICB9IGVsc2UgaWYgKG1heFF0eSA+IDAgJiYgbmV3UXR5ID4gbWF4UXR5KSB7XG4gICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG4gICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwobWF4RXJyb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1VcGRhdGUoaXRlbUlkLCBuZXdRdHksIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcblxuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiB0aGUgcXVhbnRpdHkgaXMgY2hhbmdlZCBcIjFcIiBmcm9tIFwiMFwiLCB3ZSBoYXZlIHRvIHJlbW92ZSB0aGUgcm93LlxuICAgICAgICAgICAgICAgIGNvbnN0IHJlbW92ZSA9IChuZXdRdHkgPT09IDApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoQ29udGVudChyZW1vdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZWwudmFsKG9sZFF0eSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvd0FsZXJ0TW9kYWwocmVzcG9uc2UuZGF0YS5lcnJvcnMuam9pbignXFxuJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYXJ0UmVtb3ZlSXRlbShpdGVtSWQpIHtcbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0Lml0ZW1SZW1vdmUoaXRlbUlkLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEuc3RhdHVzID09PSAnc3VjY2VlZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2hDb250ZW50KHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRvdmVybGF5LmhpZGUoKTtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhcnRFZGl0T3B0aW9ucyhpdGVtSWQsIHByb2R1Y3RJZCkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0geyBwcm9kdWN0Rm9yQ2hhbmdlSWQ6IHByb2R1Y3RJZCwgLi4udGhpcy5jb250ZXh0IH07XG4gICAgICAgIGNvbnN0IG1vZGFsID0gZGVmYXVsdE1vZGFsKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuJG1vZGFsID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLiRtb2RhbCA9ICQoJyNtb2RhbCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvY29uZmlndXJlLXByb2R1Y3QnLFxuICAgICAgICB9O1xuXG4gICAgICAgIG1vZGFsLm9wZW4oKTtcbiAgICAgICAgdGhpcy4kbW9kYWwuZmluZCgnLm1vZGFsLWNvbnRlbnQnKS5hZGRDbGFzcygnaGlkZS1jb250ZW50Jyk7XG5cbiAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLmNvbmZpZ3VyZUluQ2FydChpdGVtSWQsIG9wdGlvbnMsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBtb2RhbC51cGRhdGVDb250ZW50KHJlc3BvbnNlLmNvbnRlbnQpO1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIgPSAkKCdbZGF0YS1wcm9kdWN0LWF0dHJpYnV0ZXMtd3JhcHBlcl0nLCB0aGlzLiRtb2RhbCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQgPSAkcHJvZHVjdE9wdGlvbnNDb250YWluZXIub3V0ZXJIZWlnaHQoKTtcblxuICAgICAgICAgICAgICAgIGlmICgkcHJvZHVjdE9wdGlvbnNDb250YWluZXIubGVuZ3RoICYmIG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICRwcm9kdWN0T3B0aW9uc0NvbnRhaW5lci5jc3MoJ2hlaWdodCcsIG1vZGFsQm9keVJlc2VydmVkSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAodGhpcy4kbW9kYWwuaGFzQ2xhc3MoJ29wZW4nKSkge1xuICAgICAgICAgICAgICAgIG9wdGlvbkNoYW5nZUhhbmRsZXIoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbW9kYWwub25lKE1vZGFsRXZlbnRzLm9wZW5lZCwgb3B0aW9uQ2hhbmdlSGFuZGxlcik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMucHJvZHVjdERldGFpbHMgPSBuZXcgQ2FydEl0ZW1EZXRhaWxzKHRoaXMuJG1vZGFsLCBjb250ZXh0KTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kR2lmdFdyYXBwaW5nRm9ybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB1dGlscy5ob29rcy5vbigncHJvZHVjdC1vcHRpb24tY2hhbmdlJywgKGV2ZW50LCBjdXJyZW50VGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCAkZm9ybSA9ICQoY3VycmVudFRhcmdldCkuZmluZCgnZm9ybScpO1xuICAgICAgICAgICAgY29uc3QgJHN1Ym1pdCA9ICQoJ2lucHV0LmJ1dHRvbicsICRmb3JtKTtcbiAgICAgICAgICAgIGNvbnN0ICRtZXNzYWdlQm94ID0gJCgnLmFsZXJ0TWVzc2FnZUJveCcpO1xuXG4gICAgICAgICAgICB1dGlscy5hcGkucHJvZHVjdEF0dHJpYnV0ZXMub3B0aW9uQ2hhbmdlKHByb2R1Y3RJZCwgJGZvcm0uc2VyaWFsaXplKCksIChlcnIsIHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHQuZGF0YSB8fCB7fTtcblxuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICAgICAkKCdwLmFsZXJ0Qm94LW1lc3NhZ2UnLCAkbWVzc2FnZUJveCkudGV4dChkYXRhLnB1cmNoYXNpbmdfbWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgJG1lc3NhZ2VCb3guc2hvdygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICRzdWJtaXQucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICRtZXNzYWdlQm94LmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoIWRhdGEucHVyY2hhc2FibGUgfHwgIWRhdGEuaW5zdG9jaykge1xuICAgICAgICAgICAgICAgICAgICAkc3VibWl0LnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHN1Ym1pdC5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVmcmVzaENvbnRlbnQocmVtb3ZlKSB7XG4gICAgICAgIGNvbnN0ICRjYXJ0SXRlbXNSb3dzID0gJCgnW2RhdGEtaXRlbS1yb3ddJywgdGhpcy4kY2FydENvbnRlbnQpO1xuICAgICAgICBjb25zdCAkY2FydFBhZ2VUaXRsZSA9ICQoJ1tkYXRhLWNhcnQtcGFnZS10aXRsZV0nKTtcbiAgICAgICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiB7XG4gICAgICAgICAgICAgICAgY29udGVudDogJ2NhcnQvY29udGVudCcsXG4gICAgICAgICAgICAgICAgdG90YWxzOiAnY2FydC90b3RhbHMnLFxuICAgICAgICAgICAgICAgIHBhZ2VUaXRsZTogJ2NhcnQvcGFnZS10aXRsZScsXG4gICAgICAgICAgICAgICAgc3RhdHVzTWVzc2FnZXM6ICdjYXJ0L3N0YXR1cy1tZXNzYWdlcycsXG4gICAgICAgICAgICAgICAgYWRkaXRpb25hbENoZWNrb3V0QnV0dG9uczogJ2NhcnQvYWRkaXRpb25hbC1jaGVja291dC1idXR0b25zJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy4kb3ZlcmxheS5zaG93KCk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGxhc3QgaXRlbSBmcm9tIGNhcnQ/IFJlbG9hZFxuICAgICAgICBpZiAocmVtb3ZlICYmICRjYXJ0SXRlbXNSb3dzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldENvbnRlbnQob3B0aW9ucywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRDb250ZW50Lmh0bWwocmVzcG9uc2UuY29udGVudCk7XG4gICAgICAgICAgICB0aGlzLiRjYXJ0VG90YWxzLmh0bWwocmVzcG9uc2UudG90YWxzKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRNZXNzYWdlcy5odG1sKHJlc3BvbnNlLnN0YXR1c01lc3NhZ2VzKTtcbiAgICAgICAgICAgIHRoaXMuJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zLmh0bWwocmVzcG9uc2UuYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyk7XG5cbiAgICAgICAgICAgICRjYXJ0UGFnZVRpdGxlLnJlcGxhY2VXaXRoKHJlc3BvbnNlLnBhZ2VUaXRsZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IHF1YW50aXR5ID0gJCgnW2RhdGEtY2FydC1xdWFudGl0eV0nLCB0aGlzLiRjYXJ0Q29udGVudCkuZGF0YSgnY2FydFF1YW50aXR5JykgfHwgMDtcblxuICAgICAgICAgICAgaWYgKCFxdWFudGl0eSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgICAgICAgICAgdGhpcy4kb3ZlcmxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdjYXJ0LXF1YW50aXR5LXVwZGF0ZScsIHF1YW50aXR5KTtcblxuICAgICAgICAgICAgJChgW2RhdGEtY2FydC1pdGVtaWQ9JyR7dGhpcy4kYWN0aXZlQ2FydEl0ZW1JZH0nXWAsIHRoaXMuJGNhcnRDb250ZW50KVxuICAgICAgICAgICAgICAgIC5maWx0ZXIoYFtkYXRhLWFjdGlvbj0nJHt0aGlzLiRhY3RpdmVDYXJ0SXRlbUJ0bkFjdGlvbn0nXWApXG4gICAgICAgICAgICAgICAgLnRyaWdnZXIoJ2ZvY3VzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRDYXJ0RXZlbnRzKCkge1xuICAgICAgICBjb25zdCBkZWJvdW5jZVRpbWVvdXQgPSA0MDA7XG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGUgPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFVwZGF0ZSwgZGVib3VuY2VUaW1lb3V0KSwgdGhpcyk7XG4gICAgICAgIGNvbnN0IGNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlID0gYmluZChkZWJvdW5jZSh0aGlzLmNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlLCBkZWJvdW5jZVRpbWVvdXQpLCB0aGlzKTtcbiAgICAgICAgY29uc3QgY2FydFJlbW92ZUl0ZW0gPSBiaW5kKGRlYm91bmNlKHRoaXMuY2FydFJlbW92ZUl0ZW0sIGRlYm91bmNlVGltZW91dCksIHRoaXMpO1xuICAgICAgICBsZXQgcHJlVmFsO1xuXG4gICAgICAgIC8vIGNhcnQgdXBkYXRlXG4gICAgICAgICQoJ1tkYXRhLWNhcnQtdXBkYXRlXScsIHRoaXMuJGNhcnRDb250ZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIGNhcnQgcXVhbnRpdHlcbiAgICAgICAgICAgIGNhcnRVcGRhdGUoJHRhcmdldCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGNhcnQgcXR5IG1hbnVhbGx5IHVwZGF0ZXNcbiAgICAgICAgJCgnLmNhcnQtaXRlbS1xdHktaW5wdXQnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2ZvY3VzJywgZnVuY3Rpb24gb25RdHlGb2N1cygpIHtcbiAgICAgICAgICAgIHByZVZhbCA9IHRoaXMudmFsdWU7XG4gICAgICAgIH0pLmNoYW5nZShldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCAkdGFyZ2V0ID0gJChldmVudC5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSBjYXJ0IHF1YW50aXR5XG4gICAgICAgICAgICBjYXJ0VXBkYXRlUXR5VGV4dENoYW5nZSgkdGFyZ2V0LCBwcmVWYWwpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuY2FydC1yZW1vdmUnLCB0aGlzLiRjYXJ0Q29udGVudCkub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgaXRlbUlkID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdjYXJ0SXRlbWlkJyk7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ2NvbmZpcm1EZWxldGUnKTtcbiAgICAgICAgICAgIHNob3dBbGVydE1vZGFsKHN0cmluZywge1xuICAgICAgICAgICAgICAgIGljb246ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIG9uQ29uZmlybTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgaXRlbSBmcm9tIGNhcnRcbiAgICAgICAgICAgICAgICAgICAgY2FydFJlbW92ZUl0ZW0oaXRlbUlkKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWVkaXRdJywgdGhpcy4kY2FydENvbnRlbnQpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUVkaXQnKTtcbiAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RJZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgncHJvZHVjdElkJyk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gZWRpdCBpdGVtIGluIGNhcnRcbiAgICAgICAgICAgIHRoaXMuY2FydEVkaXRPcHRpb25zKGl0ZW1JZCwgcHJvZHVjdElkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFByb21vQ29kZUV2ZW50cygpIHtcbiAgICAgICAgY29uc3QgJGNvdXBvbkNvbnRhaW5lciA9ICQoJy5jb3Vwb24tY29kZScpO1xuICAgICAgICBjb25zdCAkY291cG9uRm9ybSA9ICQoJy5jb3Vwb24tZm9ybScpO1xuICAgICAgICBjb25zdCAkY29kZUlucHV0ID0gJCgnW25hbWU9XCJjb3Vwb25jb2RlXCJdJywgJGNvdXBvbkZvcm0pO1xuXG4gICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmhpZGUoKTtcbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuc2hvdygpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLnNob3coKTtcbiAgICAgICAgICAgICRjb2RlSW5wdXQudHJpZ2dlcignZm9jdXMnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRjb3Vwb25Db250YWluZXIuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmNvdXBvbi1jb2RlLWNhbmNlbCcpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5jb3Vwb24tY29kZS1hZGQnKS5zaG93KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICRjb3Vwb25Gb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNvZGVJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgLy8gRW1wdHkgY29kZVxuICAgICAgICAgICAgaWYgKCFjb2RlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKCRjb2RlSW5wdXQuZGF0YSgnZXJyb3InKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5Q29kZShjb2RlLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwb25zZS5kYXRhLmVycm9ycy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMoKSB7XG4gICAgICAgIGNvbnN0ICRjZXJ0Q29udGFpbmVyID0gJCgnLmdpZnQtY2VydGlmaWNhdGUtY29kZScpO1xuICAgICAgICBjb25zdCAkY2VydEZvcm0gPSAkKCcuY2FydC1naWZ0LWNlcnRpZmljYXRlLWZvcm0nKTtcbiAgICAgICAgY29uc3QgJGNlcnRJbnB1dCA9ICQoJ1tuYW1lPVwiY2VydGNvZGVcIl0nLCAkY2VydEZvcm0pO1xuXG4gICAgICAgICQoJy5naWZ0LWNlcnRpZmljYXRlLWFkZCcpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJGNlcnRDb250YWluZXIudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtY2FuY2VsJykub24oJ2NsaWNrJywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICRjZXJ0Q29udGFpbmVyLnRvZ2dsZSgpO1xuICAgICAgICAgICAgJCgnLmdpZnQtY2VydGlmaWNhdGUtYWRkJykudG9nZ2xlKCk7XG4gICAgICAgICAgICAkKCcuZ2lmdC1jZXJ0aWZpY2F0ZS1jYW5jZWwnKS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGNlcnRGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBjb2RlID0gJGNlcnRJbnB1dC52YWwoKTtcblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgaWYgKCFjaGVja0lzR2lmdENlcnRWYWxpZChjb2RlKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KHRoaXMuY29udGV4dCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3dBbGVydE1vZGFsKHZhbGlkYXRpb25EaWN0aW9uYXJ5LmludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmFwcGx5R2lmdENlcnRpZmljYXRlKGNvZGUsIChlcnIsIHJlc3ApID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5kYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmcmVzaENvbnRlbnQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChyZXNwLmRhdGEuZXJyb3JzLmpvaW4oJ1xcbicpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0V2ZW50cygpIHtcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcblxuICAgICAgICAkKCdbZGF0YS1pdGVtLWdpZnR3cmFwXScpLm9uKCdjbGljaycsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGl0ZW1JZCA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YSgnaXRlbUdpZnR3cmFwJyk7XG4gICAgICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiAnY2FydC9tb2RhbHMvZ2lmdC13cmFwcGluZy1mb3JtJyxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLmNhcnQuZ2V0SXRlbUdpZnRXcmFwcGluZ09wdGlvbnMoaXRlbUlkLCBvcHRpb25zLCAoZXJyLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQocmVzcG9uc2UuY29udGVudCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdGb3JtKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZEdpZnRXcmFwcGluZ0Zvcm0oKSB7XG4gICAgICAgICQoJy5naWZ0V3JhcHBpbmctc2VsZWN0Jykub24oJ2NoYW5nZScsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0ICRzZWxlY3QgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgICAgICAgICAgY29uc3QgaWQgPSAkc2VsZWN0LnZhbCgpO1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSAkc2VsZWN0LmRhdGEoJ2luZGV4Jyk7XG5cbiAgICAgICAgICAgIGlmICghaWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGFsbG93TWVzc2FnZSA9ICRzZWxlY3QuZmluZChgb3B0aW9uW3ZhbHVlPSR7aWR9XWApLmRhdGEoJ2FsbG93TWVzc2FnZScpO1xuXG4gICAgICAgICAgICAkKGAuZ2lmdFdyYXBwaW5nLWltYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1pbWFnZS0ke2luZGV4fS0ke2lkfWApLnNob3coKTtcblxuICAgICAgICAgICAgaWYgKGFsbG93TWVzc2FnZSkge1xuICAgICAgICAgICAgICAgICQoYCNnaWZ0V3JhcHBpbmctbWVzc2FnZS0ke2luZGV4fWApLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgI2dpZnRXcmFwcGluZy1tZXNzYWdlLSR7aW5kZXh9YCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKCcuZ2lmdFdyYXBwaW5nLXNlbGVjdCcpLnRyaWdnZXIoJ2NoYW5nZScpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVZpZXdzKCkge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSAkKCdpbnB1dDpyYWRpb1tuYW1lID1cImdpZnR3cmFwdHlwZVwiXTpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgICBjb25zdCAkc2luZ2xlRm9ybSA9ICQoJy5naWZ0V3JhcHBpbmctc2luZ2xlJyk7XG4gICAgICAgICAgICBjb25zdCAkbXVsdGlGb3JtID0gJCgnLmdpZnRXcmFwcGluZy1tdWx0aXBsZScpO1xuXG4gICAgICAgICAgICBpZiAodmFsdWUgPT09ICdzYW1lJykge1xuICAgICAgICAgICAgICAgICRzaW5nbGVGb3JtLnNob3coKTtcbiAgICAgICAgICAgICAgICAkbXVsdGlGb3JtLmhpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNpbmdsZUZvcm0uaGlkZSgpO1xuICAgICAgICAgICAgICAgICRtdWx0aUZvcm0uc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJCgnW25hbWU9XCJnaWZ0d3JhcHR5cGVcIl0nKS5vbignY2xpY2snLCB0b2dnbGVWaWV3cyk7XG5cbiAgICAgICAgdG9nZ2xlVmlld3MoKTtcbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmJpbmRDYXJ0RXZlbnRzKCk7XG4gICAgICAgIHRoaXMuYmluZFByb21vQ29kZUV2ZW50cygpO1xuICAgICAgICB0aGlzLmJpbmRHaWZ0V3JhcHBpbmdFdmVudHMoKTtcbiAgICAgICAgdGhpcy5iaW5kR2lmdENlcnRpZmljYXRlRXZlbnRzKCk7XG5cbiAgICAgICAgLy8gaW5pdGlhdGUgc2hpcHBpbmcgZXN0aW1hdG9yIG1vZHVsZVxuICAgICAgICBjb25zdCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMgPSB7XG4gICAgICAgICAgICBjb3VudHJ5OiB0aGlzLmNvbnRleHQuc2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgcHJvdmluY2U6IHRoaXMuY29udGV4dC5zaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNoaXBwaW5nRXN0aW1hdG9yID0gbmV3IFNoaXBwaW5nRXN0aW1hdG9yKCQoJ1tkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nKSwgc2hpcHBpbmdFcnJvck1lc3NhZ2VzKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgc3RhdGVDb3VudHJ5IGZyb20gJy4uL2NvbW1vbi9zdGF0ZS1jb3VudHJ5JztcbmltcG9ydCBub2QgZnJvbSAnLi4vY29tbW9uL25vZCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IHsgVmFsaWRhdG9ycywgYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSB9IGZyb20gJy4uL2NvbW1vbi91dGlscy9mb3JtLXV0aWxzJztcbmltcG9ydCBjb2xsYXBzaWJsZUZhY3RvcnkgZnJvbSAnLi4vY29tbW9uL2NvbGxhcHNpYmxlJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi4vZ2xvYmFsL21vZGFsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2hpcHBpbmdFc3RpbWF0b3Ige1xuICAgIGNvbnN0cnVjdG9yKCRlbGVtZW50LCBzaGlwcGluZ0Vycm9yTWVzc2FnZXMpIHtcbiAgICAgICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuXG4gICAgICAgIHRoaXMuJHN0YXRlID0gJCgnW2RhdGEtZmllbGQtdHlwZT1cIlN0YXRlXCJdJywgdGhpcy4kZWxlbWVudCk7XG4gICAgICAgIHRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzID0gc2hpcHBpbmdFcnJvck1lc3NhZ2VzO1xuICAgICAgICB0aGlzLmluaXRGb3JtVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRTdGF0ZUNvdW50cnlDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5iaW5kRXN0aW1hdG9yRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaW5pdEZvcm1WYWxpZGF0aW9uKCkge1xuICAgICAgICBjb25zdCBzaGlwcGluZ0VzdGltYXRvckFsZXJ0ID0gJCgnLnNoaXBwaW5nLXF1b3RlcycpO1xuXG4gICAgICAgIHRoaXMuc2hpcHBpbmdFc3RpbWF0b3IgPSAnZm9ybVtkYXRhLXNoaXBwaW5nLWVzdGltYXRvcl0nO1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gLnNoaXBwaW5nLWVzdGltYXRlLXN1Ym1pdGAsXG4gICAgICAgICAgICB0YXA6IGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5zaGlwcGluZy1lc3RpbWF0ZS1zdWJtaXQnLCB0aGlzLiRlbGVtZW50KS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICAvLyBlc3RpbWF0b3IgZXJyb3IgbWVzc2FnZXMgYXJlIGJlaW5nIGluamVjdGVkIGluIGh0bWwgYXMgYSByZXN1bHRcbiAgICAgICAgICAgIC8vIG9mIHVzZXIgc3VibWl0OyBjbGVhcmluZyBhbmQgYWRkaW5nIHJvbGUgb24gc3VibWl0IHByb3ZpZGVzXG4gICAgICAgICAgICAvLyByZWd1bGFyIGFubm91bmNlbWVudCBvZiB0aGVzZSBlcnJvciBtZXNzYWdlc1xuICAgICAgICAgICAgaWYgKHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScpKSB7XG4gICAgICAgICAgICAgICAgc2hpcHBpbmdFc3RpbWF0b3JBbGVydC5yZW1vdmVBdHRyKCdyb2xlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNoaXBwaW5nRXN0aW1hdG9yQWxlcnQuYXR0cigncm9sZScsICdhbGVydCcpO1xuICAgICAgICAgICAgLy8gV2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBjb3VudHJpZXMsIHRoZSBzdGF0ZS9yZWdpb24gaXMgZHluYW1pY1xuICAgICAgICAgICAgLy8gT25seSBwZXJmb3JtIGEgY2hlY2sgZm9yIGFsbCBmaWVsZHMgd2hlbiBjb3VudHJ5IGhhcyBhIHZhbHVlXG4gICAgICAgICAgICAvLyBPdGhlcndpc2UgYXJlQWxsKCd2YWxpZCcpIHdpbGwgY2hlY2sgY291bnRyeSBmb3IgdmFsaWRpdHlcbiAgICAgICAgICAgIGlmICgkKGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWApLnZhbCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwcGluZ1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmJpbmRWYWxpZGF0aW9uKCk7XG4gICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICB0aGlzLmJpbmRVUFNSYXRlcygpO1xuICAgIH1cblxuICAgIGJpbmRWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke3RoaXMuc2hpcHBpbmdFc3RpbWF0b3J9IHNlbGVjdFtuYW1lPVwic2hpcHBpbmctY291bnRyeVwiXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvdW50cnlJZCA9IE51bWJlcih2YWwpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBjb3VudHJ5SWQgIT09IDAgJiYgIU51bWJlci5pc05hTihjb3VudHJ5SWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuc2hpcHBpbmdFcnJvck1lc3NhZ2VzLmNvdW50cnksXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICBiaW5kU3RhdGVWYWxpZGF0aW9uKCkge1xuICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICQoYCR7dGhpcy5zaGlwcGluZ0VzdGltYXRvcn0gc2VsZWN0W25hbWU9XCJzaGlwcGluZy1zdGF0ZVwiXWApLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCAkZWxlID0gJChgJHt0aGlzLnNoaXBwaW5nRXN0aW1hdG9yfSBzZWxlY3RbbmFtZT1cInNoaXBwaW5nLXN0YXRlXCJdYCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKCRlbGUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbGVWYWwgPSAkZWxlLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBlbGVWYWwgJiYgZWxlVmFsLmxlbmd0aCAmJiBlbGVWYWwgIT09ICdTdGF0ZS9wcm92aW5jZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnNoaXBwaW5nRXJyb3JNZXNzYWdlcy5wcm92aW5jZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZSBiZXR3ZWVuIGRlZmF1bHQgc2hpcHBpbmcgYW5kIHVwcyBzaGlwcGluZyByYXRlc1xuICAgICAqL1xuICAgIGJpbmRVUFNSYXRlcygpIHtcbiAgICAgICAgY29uc3QgVVBTUmF0ZVRvZ2dsZSA9ICcuZXN0aW1hdG9yLWZvcm0tdG9nZ2xlVVBTUmF0ZSc7XG5cbiAgICAgICAgJCgnYm9keScpLm9uKCdjbGljaycsIFVQU1JhdGVUb2dnbGUsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1VcHMgPSAkKCcuZXN0aW1hdG9yLWZvcm0tLXVwcycpO1xuICAgICAgICAgICAgY29uc3QgJGVzdGltYXRvckZvcm1EZWZhdWx0ID0gJCgnLmVzdGltYXRvci1mb3JtLS1kZWZhdWx0Jyk7XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICRlc3RpbWF0b3JGb3JtVXBzLnRvZ2dsZUNsYXNzKCd1LWhpZGRlblZpc3VhbGx5Jyk7XG4gICAgICAgICAgICAkZXN0aW1hdG9yRm9ybURlZmF1bHQudG9nZ2xlQ2xhc3MoJ3UtaGlkZGVuVmlzdWFsbHknKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmluZFN0YXRlQ291bnRyeUNoYW5nZSgpIHtcbiAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgc3RhdGVDb3VudHJ5KHRoaXMuJHN0YXRlLCB0aGlzLmNvbnRleHQsIHsgdXNlSWRGb3JTdGF0ZXM6IHRydWUgfSwgKGVyciwgZmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbChlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCAkZmllbGQgPSAkKGZpZWxkKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IuZ2V0U3RhdHVzKHRoaXMuJHN0YXRlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBwaW5nVmFsaWRhdG9yLnJlbW92ZSh0aGlzLiRzdGF0ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hpcHBpbmdWYWxpZGF0b3IucmVtb3ZlKCRsYXN0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAkbGFzdCA9IGZpZWxkO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZFN0YXRlVmFsaWRhdGlvbigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkZmllbGQuYXR0cigncGxhY2Vob2xkZXInLCAnU3RhdGUvcHJvdmluY2UnKTtcbiAgICAgICAgICAgICAgICBWYWxpZGF0b3JzLmNsZWFuVXBTdGF0ZVZhbGlkYXRpb24oZmllbGQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXaGVuIHlvdSBjaGFuZ2UgYSBjb3VudHJ5LCB5b3Ugc3dhcCB0aGUgc3RhdGUvcHJvdmluY2UgYmV0d2VlbiBhbiBpbnB1dCBhbmQgYSBzZWxlY3QgZHJvcGRvd25cbiAgICAgICAgICAgIC8vIE5vdCBhbGwgY291bnRyaWVzIHJlcXVpcmUgdGhlIHByb3ZpbmNlIHRvIGJlIGZpbGxlZFxuICAgICAgICAgICAgLy8gV2UgaGF2ZSB0byByZW1vdmUgdGhpcyBjbGFzcyB3aGVuIHdlIHN3YXAgc2luY2Ugbm9kIHZhbGlkYXRpb24gZG9lc24ndCBjbGVhbnVwIGZvciB1c1xuICAgICAgICAgICAgJCh0aGlzLnNoaXBwaW5nRXN0aW1hdG9yKS5maW5kKCcuZm9ybS1maWVsZC0tc3VjY2VzcycpLnJlbW92ZUNsYXNzKCdmb3JtLWZpZWxkLS1zdWNjZXNzJyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSh0b2dnbGVCdXR0b24sIGJ1dHRvblNlbGVjdG9yLCAkdG9nZ2xlQ29udGFpbmVyKSB7XG4gICAgICAgIGNvbnN0IGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSA9IChzZWxlY3RvclRvQWN0aXZhdGUpID0+IHtcbiAgICAgICAgICAgICQodG9nZ2xlQnV0dG9uKS5hdHRyKCdhcmlhLWxhYmVsbGVkYnknLCBzZWxlY3RvclRvQWN0aXZhdGUpO1xuICAgICAgICAgICAgJChidXR0b25TZWxlY3RvcikudGV4dCgkKGAjJHtzZWxlY3RvclRvQWN0aXZhdGV9YCkudGV4dCgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNFc3RpbWF0b3JGb3JtT3BlbmVkKSB7XG4gICAgICAgICAgICBjaGFuZ2VBdHRyaWJ1dGVzT25Ub2dnbGUoJ2VzdGltYXRvci1jbG9zZScpO1xuICAgICAgICAgICAgJHRvZ2dsZUNvbnRhaW5lci5yZW1vdmVDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSgnZXN0aW1hdG9yLWFkZCcpO1xuICAgICAgICAgICAgJHRvZ2dsZUNvbnRhaW5lci5hZGRDbGFzcygndS1oaWRkZW4nKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZCA9ICF0aGlzLmlzRXN0aW1hdG9yRm9ybU9wZW5lZDtcbiAgICB9XG5cbiAgICBiaW5kRXN0aW1hdG9yRXZlbnRzKCkge1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yQ29udGFpbmVyID0gJCgnLnNoaXBwaW5nLWVzdGltYXRvcicpO1xuICAgICAgICBjb25zdCAkZXN0aW1hdG9yRm9ybSA9ICQoJy5lc3RpbWF0b3ItZm9ybScpO1xuICAgICAgICBjb2xsYXBzaWJsZUZhY3RvcnkoKTtcbiAgICAgICAgJGVzdGltYXRvckZvcm0ub24oJ3N1Ym1pdCcsIGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHtcbiAgICAgICAgICAgICAgICBjb3VudHJ5X2lkOiAkKCdbbmFtZT1cInNoaXBwaW5nLWNvdW50cnlcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgc3RhdGVfaWQ6ICQoJ1tuYW1lPVwic2hpcHBpbmctc3RhdGVcIl0nLCAkZXN0aW1hdG9yRm9ybSkudmFsKCksXG4gICAgICAgICAgICAgICAgY2l0eTogJCgnW25hbWU9XCJzaGlwcGluZy1jaXR5XCJdJywgJGVzdGltYXRvckZvcm0pLnZhbCgpLFxuICAgICAgICAgICAgICAgIHppcF9jb2RlOiAkKCdbbmFtZT1cInNoaXBwaW5nLXppcFwiXScsICRlc3RpbWF0b3JGb3JtKS52YWwoKSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHV0aWxzLmFwaS5jYXJ0LmdldFNoaXBwaW5nUXVvdGVzKHBhcmFtcywgJ2NhcnQvc2hpcHBpbmctcXVvdGVzJywgKGVyciwgcmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAkKCcuc2hpcHBpbmctcXVvdGVzJykuaHRtbChyZXNwb25zZS5jb250ZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIGJpbmQgdGhlIHNlbGVjdCBidXR0b25cbiAgICAgICAgICAgICAgICAkKCcuc2VsZWN0LXNoaXBwaW5nLXF1b3RlJykub24oJ2NsaWNrJywgY2xpY2tFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1b3RlSWQgPSAkKCcuc2hpcHBpbmctcXVvdGU6Y2hlY2tlZCcpLnZhbCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNsaWNrRXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICB1dGlscy5hcGkuY2FydC5zdWJtaXRTaGlwcGluZ1F1b3RlKHF1b3RlSWQsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLnNoaXBwaW5nLWVzdGltYXRlLXNob3cnKS5vbignY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVFc3RpbWF0b3JGb3JtU3RhdGUoZXZlbnQuY3VycmVudFRhcmdldCwgJy5zaGlwcGluZy1lc3RpbWF0ZS1zaG93X19idG4tbmFtZScsICRlc3RpbWF0b3JDb250YWluZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IFByb2R1Y3REZXRhaWxzQmFzZSwgeyBvcHRpb25DaGFuZ2VEZWNvcmF0b3IgfSBmcm9tICcuL3Byb2R1Y3QtZGV0YWlscy1iYXNlJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaXNCcm93c2VySUUsIGNvbnZlcnRJbnRvQXJyYXkgfSBmcm9tICcuL3V0aWxzL2llLWhlbHBlcnMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDYXJ0SXRlbURldGFpbHMgZXh0ZW5kcyBQcm9kdWN0RGV0YWlsc0Jhc2Uge1xuICAgIGNvbnN0cnVjdG9yKCRzY29wZSwgY29udGV4dCwgcHJvZHVjdEF0dHJpYnV0ZXNEYXRhID0ge30pIHtcbiAgICAgICAgc3VwZXIoJHNjb3BlLCBjb250ZXh0KTtcblxuICAgICAgICBjb25zdCAkZm9ybSA9ICQoJyNDYXJ0RWRpdFByb2R1Y3RGaWVsZHNGb3JtJywgdGhpcy4kc2NvcGUpO1xuICAgICAgICBjb25zdCAkcHJvZHVjdE9wdGlvbnNFbGVtZW50ID0gJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVzLXdyYXBwZXJdJywgJGZvcm0pO1xuICAgICAgICBjb25zdCBoYXNPcHRpb25zID0gJHByb2R1Y3RPcHRpb25zRWxlbWVudC5odG1sKCkudHJpbSgpLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaGFzRGVmYXVsdE9wdGlvbnMgPSAkcHJvZHVjdE9wdGlvbnNFbGVtZW50LmZpbmQoJ1tkYXRhLWRlZmF1bHRdJykubGVuZ3RoO1xuXG4gICAgICAgICRwcm9kdWN0T3B0aW9uc0VsZW1lbnQub24oJ2NoYW5nZScsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0UHJvZHVjdFZhcmlhbnQoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3Qgb3B0aW9uQ2hhbmdlQ2FsbGJhY2sgPSBvcHRpb25DaGFuZ2VEZWNvcmF0b3IuY2FsbCh0aGlzLCBoYXNEZWZhdWx0T3B0aW9ucyk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHByb2R1Y3QgYXR0cmlidXRlcy4gQWxzbyB1cGRhdGUgdGhlIGluaXRpYWwgdmlldyBpbiBjYXNlIGl0ZW1zIGFyZSBvb3NcbiAgICAgICAgLy8gb3IgaGF2ZSBkZWZhdWx0IHZhcmlhbnQgcHJvcGVydGllcyB0aGF0IGNoYW5nZSB0aGUgdmlld1xuICAgICAgICBpZiAoKGlzRW1wdHkocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKSB8fCBoYXNEZWZhdWx0T3B0aW9ucykgJiYgaGFzT3B0aW9ucykge1xuICAgICAgICAgICAgY29uc3QgcHJvZHVjdElkID0gdGhpcy5jb250ZXh0LnByb2R1Y3RGb3JDaGFuZ2VJZDtcblxuICAgICAgICAgICAgdXRpbHMuYXBpLnByb2R1Y3RBdHRyaWJ1dGVzLm9wdGlvbkNoYW5nZShwcm9kdWN0SWQsICRmb3JtLnNlcmlhbGl6ZSgpLCAncHJvZHVjdHMvYnVsay1kaXNjb3VudC1yYXRlcycsIG9wdGlvbkNoYW5nZUNhbGxiYWNrKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMocHJvZHVjdEF0dHJpYnV0ZXNEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFByb2R1Y3RWYXJpYW50KCkge1xuICAgICAgICBjb25zdCB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzID0gW107XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcblxuICAgICAgICAkLmVhY2goJCgnW2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGVdJyksIChpbmRleCwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gdmFsdWUuY2hpbGRyZW5bMF0uaW5uZXJUZXh0O1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uVGl0bGUgPSBvcHRpb25MYWJlbC5zcGxpdCgnOicpWzBdLnRyaW0oKTtcbiAgICAgICAgICAgIGNvbnN0IHJlcXVpcmVkID0gb3B0aW9uTGFiZWwudG9Mb3dlckNhc2UoKS5pbmNsdWRlcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB2YWx1ZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZHVjdC1hdHRyaWJ1dGUnKTtcblxuICAgICAgICAgICAgaWYgKCh0eXBlID09PSAnaW5wdXQtZmlsZScgfHwgdHlwZSA9PT0gJ2lucHV0LXRleHQnIHx8IHR5cGUgPT09ICdpbnB1dC1udW1iZXInKSAmJiB2YWx1ZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID09PSAnJyAmJiByZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgIHVuc2F0aXNmaWVkUmVxdWlyZWRGaWVsZHMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlID09PSAndGV4dGFyZWEnICYmIHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhJykudmFsdWUgPT09ICcnICYmIHJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzU2F0aXNmaWVkID0gQXJyYXkuZnJvbSh2YWx1ZS5xdWVyeVNlbGVjdG9yQWxsKCdzZWxlY3QnKSkuZXZlcnkoKHNlbGVjdCkgPT4gc2VsZWN0LnNlbGVjdGVkSW5kZXggIT09IDApO1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzU2F0aXNmaWVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSBBcnJheS5mcm9tKHZhbHVlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3NlbGVjdCcpKS5tYXAoKHgpID0+IHgudmFsdWUpLmpvaW4oJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2RhdGVTdHJpbmd9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtc2VsZWN0Jykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdCcpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkSW5kZXggPSBzZWxlY3Quc2VsZWN0ZWRJbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEluZGV4ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtzZWxlY3Qub3B0aW9uc1tzZWxlY3RlZEluZGV4XS5pbm5lclRleHR9YCk7XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdzZXQtcmVjdGFuZ2xlJyB8fCB0eXBlID09PSAnc2V0LXJhZGlvJyB8fCB0eXBlID09PSAnc3dhdGNoJyB8fCB0eXBlID09PSAnaW5wdXQtY2hlY2tib3gnIHx8IHR5cGUgPT09ICdwcm9kdWN0LWxpc3QnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hlY2tlZCA9IHZhbHVlLnF1ZXJ5U2VsZWN0b3IoJzpjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgaWYgKGNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZ2V0U2VsZWN0ZWRPcHRpb25MYWJlbCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2R1Y3RWYXJpYW50c2xpc3QgPSBjb252ZXJ0SW50b0FycmF5KHZhbHVlLmNoaWxkcmVuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoTGFiZWxGb3JDaGVja2VkSW5wdXQgPSBpbnB0ID0+IGlucHQuZGF0YXNldC5wcm9kdWN0QXR0cmlidXRlVmFsdWUgPT09IGNoZWNrZWQudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdFZhcmlhbnRzbGlzdC5maWx0ZXIobWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dClbMF07XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc2V0LXJlY3RhbmdsZScgfHwgdHlwZSA9PT0gJ3NldC1yYWRpbycgfHwgdHlwZSA9PT0gJ3Byb2R1Y3QtbGlzdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhYmVsID0gaXNCcm93c2VySUUgPyBnZXRTZWxlY3RlZE9wdGlvbkxhYmVsKCkuaW5uZXJUZXh0LnRyaW0oKSA6IGNoZWNrZWQubGFiZWxzWzBdLmlubmVyVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06JHtsYWJlbH1gKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlID09PSAnc3dhdGNoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbGFiZWwgPSBpc0Jyb3dzZXJJRSA/IGdldFNlbGVjdGVkT3B0aW9uTGFiZWwoKS5jaGlsZHJlblswXSA6IGNoZWNrZWQubGFiZWxzWzBdLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfToke2xhYmVsLnRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMucHVzaChgJHtvcHRpb25UaXRsZX06WWVzYCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT09ICdpbnB1dC1jaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5wdXNoKGAke29wdGlvblRpdGxlfTpOb2ApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXF1aXJlZCkge1xuICAgICAgICAgICAgICAgICAgICB1bnNhdGlzZmllZFJlcXVpcmVkRmllbGRzLnB1c2godmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IHByb2R1Y3RWYXJpYW50ID0gdW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcy5sZW5ndGggPT09IDAgPyBvcHRpb25zLnNvcnQoKS5qb2luKCcsICcpIDogJ3Vuc2F0aXNmaWVkJztcbiAgICAgICAgY29uc3QgdmlldyA9ICQoJy5tb2RhbC1oZWFkZXItdGl0bGUnKTtcblxuICAgICAgICBpZiAocHJvZHVjdFZhcmlhbnQpIHtcbiAgICAgICAgICAgIHByb2R1Y3RWYXJpYW50ID0gcHJvZHVjdFZhcmlhbnQgPT09ICd1bnNhdGlzZmllZCcgPyAnJyA6IHByb2R1Y3RWYXJpYW50O1xuICAgICAgICAgICAgaWYgKHZpZXcuYXR0cignZGF0YS1ldmVudC10eXBlJykpIHtcbiAgICAgICAgICAgICAgICB2aWV3LmF0dHIoJ2RhdGEtcHJvZHVjdC12YXJpYW50JywgcHJvZHVjdFZhcmlhbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0TmFtZSA9IHZpZXcuaHRtbCgpLm1hdGNoKC8nKC4qPyknLylbMV07XG4gICAgICAgICAgICAgICAgY29uc3QgY2FyZCA9ICQoYFtkYXRhLW5hbWU9XCIke3Byb2R1Y3ROYW1lfVwiXWApO1xuICAgICAgICAgICAgICAgIGNhcmQuYXR0cignZGF0YS1wcm9kdWN0LXZhcmlhbnQnLCBwcm9kdWN0VmFyaWFudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlIG9yIG1hcmsgYXMgdW5hdmFpbGFibGUgb3V0IG9mIHN0b2NrIGF0dHJpYnV0ZXMgaWYgZW5hYmxlZFxuICAgICAqIEBwYXJhbSAge09iamVjdH0gZGF0YSBQcm9kdWN0IGF0dHJpYnV0ZSBkYXRhXG4gICAgICovXG4gICAgdXBkYXRlUHJvZHVjdEF0dHJpYnV0ZXMoZGF0YSkge1xuICAgICAgICBzdXBlci51cGRhdGVQcm9kdWN0QXR0cmlidXRlcyhkYXRhKTtcblxuICAgICAgICB0aGlzLiRzY29wZS5maW5kKCcubW9kYWwtY29udGVudCcpLnJlbW92ZUNsYXNzKCdoaWRlLWNvbnRlbnQnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycgfHwgY2VydC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJpbXBvcnQgdXRpbHMgZnJvbSAnQGJpZ2NvbW1lcmNlL3N0ZW5jaWwtdXRpbHMnO1xuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGluc2VydFN0YXRlSGlkZGVuRmllbGQgfSBmcm9tICcuL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHsgc2hvd0FsZXJ0TW9kYWwgfSBmcm9tICcuLi9nbG9iYWwvbW9kYWwnO1xuXG4vKipcbiAqIElmIHRoZXJlIGFyZSBubyBvcHRpb25zIGZyb20gYmNhcHAsIGEgdGV4dCBmaWVsZCB3aWxsIGJlIHNlbnQuIFRoaXMgd2lsbCBjcmVhdGUgYSBzZWxlY3QgZWxlbWVudCB0byBob2xkIG9wdGlvbnMgYWZ0ZXIgdGhlIHJlbW90ZSByZXF1ZXN0LlxuICogQHJldHVybnMge2pRdWVyeXxIVE1MRWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gbWFrZVN0YXRlUmVxdWlyZWQoc3RhdGVFbGVtZW50LCBjb250ZXh0KSB7XG4gICAgY29uc3QgYXR0cnMgPSBfLnRyYW5zZm9ybShzdGF0ZUVsZW1lbnQucHJvcCgnYXR0cmlidXRlcycpLCAocmVzdWx0LCBpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJldCA9IHJlc3VsdDtcbiAgICAgICAgcmV0W2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH0pO1xuXG4gICAgY29uc3QgcmVwbGFjZW1lbnRBdHRyaWJ1dGVzID0ge1xuICAgICAgICBpZDogYXR0cnMuaWQsXG4gICAgICAgICdkYXRhLWxhYmVsJzogYXR0cnNbJ2RhdGEtbGFiZWwnXSxcbiAgICAgICAgY2xhc3M6ICdmb3JtLXNlbGVjdCcsXG4gICAgICAgIG5hbWU6IGF0dHJzLm5hbWUsXG4gICAgICAgICdkYXRhLWZpZWxkLXR5cGUnOiBhdHRyc1snZGF0YS1maWVsZC10eXBlJ10sXG4gICAgfTtcblxuICAgIHN0YXRlRWxlbWVudC5yZXBsYWNlV2l0aCgkKCc8c2VsZWN0Pjwvc2VsZWN0PicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcbiAgICBjb25zdCAkaGlkZGVuSW5wdXQgPSAkKCdbbmFtZSo9XCJGb3JtRmllbGRJc1RleHRcIl0nKTtcblxuICAgIGlmICgkaGlkZGVuSW5wdXQubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICRoaWRkZW5JbnB1dC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBpZiAoJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIFN0cmluZyBpcyBpbmplY3RlZCBmcm9tIGxvY2FsaXplclxuICAgICAgICAkbmV3RWxlbWVudC5wcmV2KCkuYXBwZW5kKGA8c21hbGw+JHtjb250ZXh0LnJlcXVpcmVkfTwvc21hbGw+YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgJG5ld0VsZW1lbnQucHJldigpLmZpbmQoJ3NtYWxsJykuc2hvdygpO1xuICAgIH1cblxuICAgIHJldHVybiAkbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBJZiBhIGNvdW50cnkgd2l0aCBzdGF0ZXMgaXMgdGhlIGRlZmF1bHQsIGEgc2VsZWN0IHdpbGwgYmUgc2VudCxcbiAqIEluIHRoaXMgY2FzZSB3ZSBuZWVkIHRvIGJlIGFibGUgdG8gc3dpdGNoIHRvIGFuIGlucHV0IGZpZWxkIGFuZCBoaWRlIHRoZSByZXF1aXJlZCBmaWVsZFxuICovXG5mdW5jdGlvbiBtYWtlU3RhdGVPcHRpb25hbChzdGF0ZUVsZW1lbnQpIHtcbiAgICBjb25zdCBhdHRycyA9IF8udHJhbnNmb3JtKHN0YXRlRWxlbWVudC5wcm9wKCdhdHRyaWJ1dGVzJyksIChyZXN1bHQsIGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xuICAgICAgICByZXRbaXRlbS5uYW1lXSA9IGl0ZW0udmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlcGxhY2VtZW50QXR0cmlidXRlcyA9IHtcbiAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICBpZDogYXR0cnMuaWQsXG4gICAgICAgICdkYXRhLWxhYmVsJzogYXR0cnNbJ2RhdGEtbGFiZWwnXSxcbiAgICAgICAgY2xhc3M6ICdmb3JtLWlucHV0JyxcbiAgICAgICAgbmFtZTogYXR0cnMubmFtZSxcbiAgICAgICAgJ2RhdGEtZmllbGQtdHlwZSc6IGF0dHJzWydkYXRhLWZpZWxkLXR5cGUnXSxcbiAgICB9O1xuXG4gICAgc3RhdGVFbGVtZW50LnJlcGxhY2VXaXRoKCQoJzxpbnB1dCAvPicsIHJlcGxhY2VtZW50QXR0cmlidXRlcykpO1xuXG4gICAgY29uc3QgJG5ld0VsZW1lbnQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcblxuICAgIGlmICgkbmV3RWxlbWVudC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCgkbmV3RWxlbWVudCk7XG4gICAgICAgICRuZXdFbGVtZW50LnByZXYoKS5maW5kKCdzbWFsbCcpLmhpZGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gJG5ld0VsZW1lbnQ7XG59XG5cbi8qKlxuICogQWRkcyB0aGUgYXJyYXkgb2Ygb3B0aW9ucyBmcm9tIHRoZSByZW1vdGUgcmVxdWVzdCB0byB0aGUgbmV3bHkgY3JlYXRlZCBzZWxlY3QgYm94LlxuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlc0FycmF5XG4gKiBAcGFyYW0ge2pRdWVyeX0gJHNlbGVjdEVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFkZE9wdGlvbnMoc3RhdGVzQXJyYXksICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKSB7XG4gICAgY29uc3QgY29udGFpbmVyID0gW107XG5cbiAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIlwiPiR7c3RhdGVzQXJyYXkucHJlZml4fTwvb3B0aW9uPmApO1xuXG4gICAgaWYgKCFfLmlzRW1wdHkoJHNlbGVjdEVsZW1lbnQpKSB7XG4gICAgICAgIHN0YXRlc0FycmF5LnN0YXRlcy5mb3JFYWNoKChzdGF0ZU9iaikgPT4ge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMudXNlSWRGb3JTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmouaWR9XCI+JHtzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucHVzaChgPG9wdGlvbiB2YWx1ZT1cIiR7c3RhdGVPYmoubmFtZX1cIj4ke3N0YXRlT2JqLmxhYmVsID8gc3RhdGVPYmoubGFiZWwgOiBzdGF0ZU9iai5uYW1lfTwvb3B0aW9uPmApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkc2VsZWN0RWxlbWVudC5odG1sKGNvbnRhaW5lci5qb2luKCcgJykpO1xuICAgIH1cbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtqUXVlcnl9IHN0YXRlRWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc3RhdGVFbGVtZW50LCBjb250ZXh0ID0ge30sIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgLyoqXG4gICAgICogQmFja3dhcmRzIGNvbXBhdGlibGUgZm9yIHRocmVlIHBhcmFtZXRlcnMgaW5zdGVhZCBvZiBmb3VyXG4gICAgICpcbiAgICAgKiBBdmFpbGFibGUgb3B0aW9uczpcbiAgICAgKlxuICAgICAqIHVzZUlkRm9yU3RhdGVzIHtCb29sfSAtIEdlbmVyYXRlcyBzdGF0ZXMgZHJvcGRvd24gdXNpbmcgaWQgZm9yIHZhbHVlcyBpbnN0ZWFkIG9mIHN0cmluZ3NcbiAgICAgKi9cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zO1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgICAgIC8qIGVzbGludC1lbmFibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgICB9XG5cbiAgICAkKCdzZWxlY3RbZGF0YS1maWVsZC10eXBlPVwiQ291bnRyeVwiXScpLm9uKCdjaGFuZ2UnLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvdW50cnlOYW1lID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS52YWwoKTtcblxuICAgICAgICBpZiAoY291bnRyeU5hbWUgPT09ICcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1dGlscy5hcGkuY291bnRyeS5nZXRCeU5hbWUoY291bnRyeU5hbWUsIChlcnIsIHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoY29udGV4dC5zdGF0ZV9lcnJvcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0ICRjdXJyZW50SW5wdXQgPSAkKCdbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nKTtcblxuICAgICAgICAgICAgaWYgKCFfLmlzRW1wdHkocmVzcG9uc2UuZGF0YS5zdGF0ZXMpKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGVsZW1lbnQgbWF5IGhhdmUgYmVlbiByZXBsYWNlZCB3aXRoIGEgc2VsZWN0LCByZXNlbGVjdCBpdFxuICAgICAgICAgICAgICAgIGNvbnN0ICRzZWxlY3RFbGVtZW50ID0gbWFrZVN0YXRlUmVxdWlyZWQoJGN1cnJlbnRJbnB1dCwgY29udGV4dCk7XG5cbiAgICAgICAgICAgICAgICBhZGRPcHRpb25zKHJlc3BvbnNlLmRhdGEsICRzZWxlY3RFbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsLCAkc2VsZWN0RWxlbWVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBtYWtlU3RhdGVPcHRpb25hbCgkY3VycmVudElucHV0LCBjb250ZXh0KTtcblxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwsIG5ld0VsZW1lbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbiIsImNvbnN0IFRSQU5TTEFUSU9OUyA9ICd0cmFuc2xhdGlvbnMnO1xuY29uc3QgaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eSA9IChkaWN0aW9uYXJ5KSA9PiAhIU9iamVjdC5rZXlzKGRpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubGVuZ3RoO1xuY29uc3QgY2hvb3NlQWN0aXZlRGljdGlvbmFyeSA9ICguLi5kaWN0aW9uYXJ5SnNvbkxpc3QpID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpY3Rpb25hcnlKc29uTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBkaWN0aW9uYXJ5ID0gSlNPTi5wYXJzZShkaWN0aW9uYXJ5SnNvbkxpc3RbaV0pO1xuICAgICAgICBpZiAoaXNUcmFuc2xhdGlvbkRpY3Rpb25hcnlOb3RFbXB0eShkaWN0aW9uYXJ5KSkge1xuICAgICAgICAgICAgcmV0dXJuIGRpY3Rpb25hcnk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGRlZmluZXMgVHJhbnNsYXRpb24gRGljdGlvbmFyeSB0byB1c2VcbiAqIEBwYXJhbSBjb250ZXh0IHByb3ZpZGVzIGFjY2VzcyB0byAzIHZhbGlkYXRpb24gSlNPTnMgZnJvbSBlbi5qc29uOlxuICogdmFsaWRhdGlvbl9tZXNzYWdlcywgdmFsaWRhdGlvbl9mYWxsYmFja19tZXNzYWdlcyBhbmQgZGVmYXVsdF9tZXNzYWdlc1xuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSA9IChjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgeyB2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OIH0gPSBjb250ZXh0O1xuICAgIGNvbnN0IGFjdGl2ZURpY3Rpb25hcnkgPSBjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5KHZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkZhbGxiYWNrRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04pO1xuICAgIGNvbnN0IGxvY2FsaXphdGlvbnMgPSBPYmplY3QudmFsdWVzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSk7XG4gICAgY29uc3QgdHJhbnNsYXRpb25LZXlzID0gT2JqZWN0LmtleXMoYWN0aXZlRGljdGlvbmFyeVtUUkFOU0xBVElPTlNdKS5tYXAoa2V5ID0+IGtleS5zcGxpdCgnLicpLnBvcCgpKTtcblxuICAgIHJldHVybiB0cmFuc2xhdGlvbktleXMucmVkdWNlKChhY2MsIGtleSwgaSkgPT4ge1xuICAgICAgICBhY2Nba2V5XSA9IGxvY2FsaXphdGlvbnNbaV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwge30pO1xufTtcbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsImNoZWNrSXNHaWZ0Q2VydFZhbGlkIiwiY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IiwidXRpbHMiLCJTaGlwcGluZ0VzdGltYXRvciIsImRlZmF1bHRNb2RhbCIsInNob3dBbGVydE1vZGFsIiwiTW9kYWxFdmVudHMiLCJDYXJ0SXRlbURldGFpbHMiLCJDYXJ0Iiwib25SZWFkeSIsIiRtb2RhbCIsIiRjYXJ0UGFnZUNvbnRlbnQiLCIkIiwiJGNhcnRDb250ZW50IiwiJGNhcnRNZXNzYWdlcyIsIiRjYXJ0VG90YWxzIiwiJGNhcnRBZGRpdGlvbmFsQ2hlY2tvdXRCdG5zIiwiJG92ZXJsYXkiLCJoaWRlIiwiJGFjdGl2ZUNhcnRJdGVtSWQiLCIkYWN0aXZlQ2FydEl0ZW1CdG5BY3Rpb24iLCJzZXRBcHBsZVBheVN1cHBvcnQiLCJiaW5kRXZlbnRzIiwid2luZG93IiwiQXBwbGVQYXlTZXNzaW9uIiwiYWRkQ2xhc3MiLCJjYXJ0VXBkYXRlIiwiJHRhcmdldCIsIml0ZW1JZCIsImRhdGEiLCIkZWwiLCJvbGRRdHkiLCJwYXJzZUludCIsInZhbCIsIm1heFF0eSIsIm1pblF0eSIsIm1pbkVycm9yIiwibWF4RXJyb3IiLCJuZXdRdHkiLCJzaG93IiwiYXBpIiwiY2FydCIsIml0ZW1VcGRhdGUiLCJlcnIiLCJyZXNwb25zZSIsInN0YXR1cyIsInJlbW92ZSIsInJlZnJlc2hDb250ZW50IiwiZXJyb3JzIiwiam9pbiIsImNhcnRVcGRhdGVRdHlUZXh0Q2hhbmdlIiwicHJlVmFsIiwiTnVtYmVyIiwiaW52YWxpZEVudHJ5IiwiaXNJbnRlZ2VyIiwiY29udGV4dCIsImludmFsaWRFbnRyeU1lc3NhZ2UiLCJyZXBsYWNlIiwiY2FydFJlbW92ZUl0ZW0iLCJpdGVtUmVtb3ZlIiwiY2FydEVkaXRPcHRpb25zIiwicHJvZHVjdElkIiwicHJvZHVjdEZvckNoYW5nZUlkIiwibW9kYWwiLCJvcHRpb25zIiwidGVtcGxhdGUiLCJvcGVuIiwiZmluZCIsInByb2R1Y3RBdHRyaWJ1dGVzIiwiY29uZmlndXJlSW5DYXJ0IiwidXBkYXRlQ29udGVudCIsImNvbnRlbnQiLCJvcHRpb25DaGFuZ2VIYW5kbGVyIiwiJHByb2R1Y3RPcHRpb25zQ29udGFpbmVyIiwibW9kYWxCb2R5UmVzZXJ2ZWRIZWlnaHQiLCJvdXRlckhlaWdodCIsImxlbmd0aCIsImNzcyIsImhhc0NsYXNzIiwib25lIiwib3BlbmVkIiwicHJvZHVjdERldGFpbHMiLCJiaW5kR2lmdFdyYXBwaW5nRm9ybSIsImhvb2tzIiwib24iLCJldmVudCIsImN1cnJlbnRUYXJnZXQiLCIkZm9ybSIsIiRzdWJtaXQiLCIkbWVzc2FnZUJveCIsIm9wdGlvbkNoYW5nZSIsInNlcmlhbGl6ZSIsInJlc3VsdCIsInB1cmNoYXNpbmdfbWVzc2FnZSIsInRleHQiLCJwcm9wIiwicHVyY2hhc2FibGUiLCJpbnN0b2NrIiwiJGNhcnRJdGVtc1Jvd3MiLCIkY2FydFBhZ2VUaXRsZSIsInRvdGFscyIsInBhZ2VUaXRsZSIsInN0YXR1c01lc3NhZ2VzIiwiYWRkaXRpb25hbENoZWNrb3V0QnV0dG9ucyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZ2V0Q29udGVudCIsImh0bWwiLCJyZXBsYWNlV2l0aCIsInF1YW50aXR5IiwidHJpZ2dlciIsImZpbHRlciIsImJpbmRDYXJ0RXZlbnRzIiwiZGVib3VuY2VUaW1lb3V0IiwicHJldmVudERlZmF1bHQiLCJvblF0eUZvY3VzIiwidmFsdWUiLCJjaGFuZ2UiLCJzdHJpbmciLCJpY29uIiwic2hvd0NhbmNlbEJ1dHRvbiIsIm9uQ29uZmlybSIsImJpbmRQcm9tb0NvZGVFdmVudHMiLCIkY291cG9uQ29udGFpbmVyIiwiJGNvdXBvbkZvcm0iLCIkY29kZUlucHV0IiwiY29kZSIsImFwcGx5Q29kZSIsImJpbmRHaWZ0Q2VydGlmaWNhdGVFdmVudHMiLCIkY2VydENvbnRhaW5lciIsIiRjZXJ0Rm9ybSIsIiRjZXJ0SW5wdXQiLCJ0b2dnbGUiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsImludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSIsImFwcGx5R2lmdENlcnRpZmljYXRlIiwicmVzcCIsImJpbmRHaWZ0V3JhcHBpbmdFdmVudHMiLCJnZXRJdGVtR2lmdFdyYXBwaW5nT3B0aW9ucyIsIiRzZWxlY3QiLCJpZCIsImluZGV4IiwiYWxsb3dNZXNzYWdlIiwidG9nZ2xlVmlld3MiLCIkc2luZ2xlRm9ybSIsIiRtdWx0aUZvcm0iLCJzaGlwcGluZ0Vycm9yTWVzc2FnZXMiLCJjb3VudHJ5Iiwic2hpcHBpbmdDb3VudHJ5RXJyb3JNZXNzYWdlIiwicHJvdmluY2UiLCJzaGlwcGluZ1Byb3ZpbmNlRXJyb3JNZXNzYWdlIiwic2hpcHBpbmdFc3RpbWF0b3IiLCJzdGF0ZUNvdW50cnkiLCJub2QiLCJWYWxpZGF0b3JzIiwiYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSIsImNvbGxhcHNpYmxlRmFjdG9yeSIsIiRlbGVtZW50IiwiJHN0YXRlIiwiaXNFc3RpbWF0b3JGb3JtT3BlbmVkIiwiaW5pdEZvcm1WYWxpZGF0aW9uIiwiYmluZFN0YXRlQ291bnRyeUNoYW5nZSIsImJpbmRFc3RpbWF0b3JFdmVudHMiLCJzaGlwcGluZ0VzdGltYXRvckFsZXJ0Iiwic2hpcHBpbmdWYWxpZGF0b3IiLCJzdWJtaXQiLCJ0YXAiLCJhdHRyIiwicmVtb3ZlQXR0ciIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImJpbmRWYWxpZGF0aW9uIiwiYmluZFN0YXRlVmFsaWRhdGlvbiIsImJpbmRVUFNSYXRlcyIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsImNvdW50cnlJZCIsImlzTmFOIiwiZXJyb3JNZXNzYWdlIiwiJGVsZSIsImVsZVZhbCIsIlVQU1JhdGVUb2dnbGUiLCIkZXN0aW1hdG9yRm9ybVVwcyIsIiRlc3RpbWF0b3JGb3JtRGVmYXVsdCIsInRvZ2dsZUNsYXNzIiwiJGxhc3QiLCJ1c2VJZEZvclN0YXRlcyIsImZpZWxkIiwiRXJyb3IiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJpcyIsImNsZWFuVXBTdGF0ZVZhbGlkYXRpb24iLCJyZW1vdmVDbGFzcyIsInRvZ2dsZUVzdGltYXRvckZvcm1TdGF0ZSIsInRvZ2dsZUJ1dHRvbiIsImJ1dHRvblNlbGVjdG9yIiwiJHRvZ2dsZUNvbnRhaW5lciIsImNoYW5nZUF0dHJpYnV0ZXNPblRvZ2dsZSIsInNlbGVjdG9yVG9BY3RpdmF0ZSIsIiRlc3RpbWF0b3JDb250YWluZXIiLCIkZXN0aW1hdG9yRm9ybSIsInBhcmFtcyIsImNvdW50cnlfaWQiLCJzdGF0ZV9pZCIsImNpdHkiLCJ6aXBfY29kZSIsImdldFNoaXBwaW5nUXVvdGVzIiwiY2xpY2tFdmVudCIsInF1b3RlSWQiLCJzdWJtaXRTaGlwcGluZ1F1b3RlIiwiUHJvZHVjdERldGFpbHNCYXNlIiwib3B0aW9uQ2hhbmdlRGVjb3JhdG9yIiwiaXNCcm93c2VySUUiLCJjb252ZXJ0SW50b0FycmF5IiwiJHNjb3BlIiwicHJvZHVjdEF0dHJpYnV0ZXNEYXRhIiwiJHByb2R1Y3RPcHRpb25zRWxlbWVudCIsImhhc09wdGlvbnMiLCJ0cmltIiwiaGFzRGVmYXVsdE9wdGlvbnMiLCJzZXRQcm9kdWN0VmFyaWFudCIsIm9wdGlvbkNoYW5nZUNhbGxiYWNrIiwiY2FsbCIsInVwZGF0ZVByb2R1Y3RBdHRyaWJ1dGVzIiwidW5zYXRpc2ZpZWRSZXF1aXJlZEZpZWxkcyIsImVhY2giLCJvcHRpb25MYWJlbCIsImNoaWxkcmVuIiwiaW5uZXJUZXh0Iiwib3B0aW9uVGl0bGUiLCJzcGxpdCIsInJlcXVpcmVkIiwidG9Mb3dlckNhc2UiLCJpbmNsdWRlcyIsInR5cGUiLCJnZXRBdHRyaWJ1dGUiLCJxdWVyeVNlbGVjdG9yIiwicHVzaCIsImlzU2F0aXNmaWVkIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImV2ZXJ5Iiwic2VsZWN0Iiwic2VsZWN0ZWRJbmRleCIsImRhdGVTdHJpbmciLCJtYXAiLCJ4IiwiY2hlY2tlZCIsImdldFNlbGVjdGVkT3B0aW9uTGFiZWwiLCJwcm9kdWN0VmFyaWFudHNsaXN0IiwibWF0Y2hMYWJlbEZvckNoZWNrZWRJbnB1dCIsImlucHQiLCJkYXRhc2V0IiwicHJvZHVjdEF0dHJpYnV0ZVZhbHVlIiwibGFiZWwiLCJsYWJlbHMiLCJ0aXRsZSIsInByb2R1Y3RWYXJpYW50Iiwic29ydCIsInZpZXciLCJwcm9kdWN0TmFtZSIsIm1hdGNoIiwiY2FyZCIsImNlcnQiLCJpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkIiwibWFrZVN0YXRlUmVxdWlyZWQiLCJzdGF0ZUVsZW1lbnQiLCJhdHRycyIsIml0ZW0iLCJyZXQiLCJuYW1lIiwicmVwbGFjZW1lbnRBdHRyaWJ1dGVzIiwiY2xhc3MiLCIkbmV3RWxlbWVudCIsIiRoaWRkZW5JbnB1dCIsInByZXYiLCJhcHBlbmQiLCJtYWtlU3RhdGVPcHRpb25hbCIsImFkZE9wdGlvbnMiLCJzdGF0ZXNBcnJheSIsIiRzZWxlY3RFbGVtZW50IiwiY29udGFpbmVyIiwicHJlZml4Iiwic3RhdGVzIiwiZm9yRWFjaCIsInN0YXRlT2JqIiwiY2FsbGJhY2siLCJjb3VudHJ5TmFtZSIsImdldEJ5TmFtZSIsInN0YXRlX2Vycm9yIiwiJGN1cnJlbnRJbnB1dCIsIm5ld0VsZW1lbnQiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsInZhbGlkYXRpb25EaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OIiwidmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiIsImFjdGl2ZURpY3Rpb25hcnkiLCJsb2NhbGl6YXRpb25zIiwidmFsdWVzIiwidHJhbnNsYXRpb25LZXlzIiwia2V5IiwicG9wIiwicmVkdWNlIiwiYWNjIl0sInNvdXJjZVJvb3QiOiIifQ==