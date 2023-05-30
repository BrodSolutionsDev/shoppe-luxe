"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_account_js"],{

/***/ "./assets/js/theme/account.js":
/*!************************************!*\
  !*** ./assets/js/theme/account.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Account; }
/* harmony export */ });
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/find */ "./node_modules/lodash/find.js");
/* harmony import */ var lodash_find__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_find__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/reduce */ "./node_modules/lodash/reduce.js");
/* harmony import */ var lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_reduce__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _wishlist__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./wishlist */ "./assets/js/theme/wishlist.js");
/* harmony import */ var _common_form_validation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/form-validation */ "./assets/js/theme/common/form-validation.js");
/* harmony import */ var _common_state_country__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./common/state-country */ "./assets/js/theme/common/state-country.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_payment_method__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./common/payment-method */ "./assets/js/theme/common/payment-method.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* harmony import */ var _global_compare_products__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./global/compare-products */ "./assets/js/theme/global/compare-products.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");



function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }












var Account = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(Account, _PageManager);

  function Account(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_8__.createTranslationDictionary)(context);
    _this.$state = $('[data-field-type="State"]');
    _this.$body = $('body');
    return _this;
  }

  var _proto = Account.prototype;

  _proto.onReady = function onReady() {
    var $editAccountForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('form[data-edit-account-form]');
    var $addressForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('form[data-address-form]');
    var $inboxForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('form[data-inbox-form]');
    var $accountReturnForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('[data-account-return-form]');
    var $paymentMethodForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('form[data-payment-method-form]');
    var $reorderForm = (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.classifyForm)('[data-account-reorder-form]');
    var $invoiceButton = $('[data-print-invoice]');
    var $bigCommerce = window.BigCommerce;
    (0,_global_compare_products__WEBPACK_IMPORTED_MODULE_11__["default"])(this.context); // Injected via template

    this.passwordRequirements = this.context.passwordRequirements; // Instantiates wish list JS

    _wishlist__WEBPACK_IMPORTED_MODULE_4__["default"].load(this.context);

    if ($editAccountForm.length) {
      this.registerEditAccountValidation($editAccountForm);

      if (this.$state.is('input')) {
        (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.insertStateHiddenField)(this.$state);
      }
    }

    if ($invoiceButton.length) {
      $invoiceButton.on('click', function () {
        var left = window.screen.availWidth / 2 - 450;
        var top = window.screen.availHeight / 2 - 320;
        var url = $invoiceButton.data('printInvoice');
        window.open(url, 'orderInvoice', "width=900,height=650,left=" + left + ",top=" + top + ",scrollbars=1");
      });
    }

    if ($addressForm.length) {
      this.initAddressFormValidation($addressForm);

      if (this.$state.is('input')) {
        (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.insertStateHiddenField)(this.$state);
      }
    }

    if ($inboxForm.length) {
      this.registerInboxValidation($inboxForm);
    }

    if ($accountReturnForm.length) {
      this.initAccountReturnFormValidation($accountReturnForm);
    }

    if ($paymentMethodForm.length) {
      this.initPaymentMethodFormValidation($paymentMethodForm);
    }

    if ($reorderForm.length) {
      this.initReorderForm($reorderForm);
    }

    if ($bigCommerce && $bigCommerce.renderAccountPayments) {
      var _this$context = this.context,
          countries = _this$context.countries,
          paymentsUrl = _this$context.paymentsUrl,
          storeHash = _this$context.storeHash,
          storeLocale = _this$context.storeLocale,
          vaultToken = _this$context.vaultToken,
          shopperId = _this$context.shopperId,
          customerEmail = _this$context.customerEmail,
          providerId = _this$context.providerId,
          currencyCode = _this$context.currencyCode,
          paymentMethodsUrl = _this$context.paymentMethodsUrl,
          paymentProviderInitializationData = _this$context.paymentProviderInitializationData,
          themeSettings = _this$context.themeSettings;
      $bigCommerce.renderAccountPayments({
        styles: {
          inputBase: {
            color: themeSettings['input-font-color'],
            borderColor: themeSettings['input-border-color']
          },
          inputValidationError: {
            color: themeSettings['color-error'],
            borderColor: themeSettings['color-error']
          },
          inputValidationSuccess: {
            color: themeSettings['color-success'],
            borderColor: themeSettings['color-success']
          },
          submitButton: {
            color: themeSettings['button--primary-color'],
            backgroundColor: themeSettings['button--primary-backgroundColor'],
            borderColor: themeSettings['button--primary-backgroundColor'],
            '&:hover': {
              color: themeSettings['button--primary-colorHover'],
              backgroundColor: themeSettings['button--primary-backgroundColorHover'],
              borderColor: themeSettings['button--primary-backgroundColorHover']
            },
            '&:active': {
              color: themeSettings['button--primary-colorActive'],
              backgroundColor: themeSettings['button--primary-backgroundColorActive'],
              borderColor: themeSettings['button--primary-backgroundColorActive']
            },
            '&[disabled]': {
              backgroundColor: themeSettings['button--disabled-backgroundColor'],
              borderColor: themeSettings['button--disabled-borderColor'],
              color: themeSettings['button--disabled-color'],
              cursor: 'not-allowed'
            }
          },
          cancelButton: {
            color: themeSettings['button--default-color'],
            backgroundColor: 'transparent',
            borderColor: themeSettings['button--default-borderColor'],
            '&:hover': {
              color: themeSettings['button--default-colorHover'],
              backgroundColor: 'transparent',
              borderColor: themeSettings['button--default-borderColorHover']
            },
            '&:active': {
              color: themeSettings['button--default-colorActive'],
              backgroundColor: 'transparent',
              borderColor: themeSettings['button--default-borderColorActive']
            }
          },
          label: {
            color: themeSettings['form-label-font-color']
          },
          validationError: {
            color: themeSettings['color-error']
          },
          heading: {
            color: themeSettings['color-textHeading']
          }
        },
        storeContextData: {
          countries: countries,
          paymentsUrl: paymentsUrl,
          storeHash: storeHash,
          storeLocale: storeLocale,
          vaultToken: vaultToken,
          shopperId: shopperId,
          customerEmail: customerEmail,
          providerId: providerId,
          currencyCode: currencyCode,
          paymentMethodsUrl: paymentMethodsUrl,
          paymentProviderInitializationData: paymentProviderInitializationData
        },
        errorHandler: _global_modal__WEBPACK_IMPORTED_MODULE_10__.showAlertModal
      });
    }

    this.bindDeleteAddress();
    this.bindDeletePaymentMethod();
  }
  /**
   * Binds a submit hook to ensure the customer receives a confirmation dialog before deleting an address
   */
  ;

  _proto.bindDeleteAddress = function bindDeleteAddress() {
    $('[data-delete-address]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deleteAddress');

      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };

  _proto.bindDeletePaymentMethod = function bindDeletePaymentMethod() {
    $('[data-delete-payment-method]').on('submit', function (event) {
      var message = $(event.currentTarget).data('deletePaymentMethod');

      if (!window.confirm(message)) {
        event.preventDefault();
      }
    });
  };

  _proto.initReorderForm = function initReorderForm($reorderForm) {
    var _this2 = this;

    $reorderForm.on('submit', function (event) {
      var $productReorderCheckboxes = $('.account-listItem .form-checkbox:checked');
      var submitForm = false;
      $reorderForm.find('[name^="reorderitem"]').remove();
      $productReorderCheckboxes.each(function (index, productCheckbox) {
        var productId = $(productCheckbox).val();
        var $input = $('<input>', {
          type: 'hidden',
          name: "reorderitem[" + productId + "]",
          value: '1'
        });
        submitForm = true;
        $reorderForm.append($input);
      });

      if (!submitForm) {
        event.preventDefault();
        (0,_global_modal__WEBPACK_IMPORTED_MODULE_10__.showAlertModal)(_this2.context.selectItem);
      }
    });
  };

  _proto.initAddressFormValidation = function initAddressFormValidation($addressForm) {
    var _this3 = this;

    var validationModel = (0,_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($addressForm, this.context);
    var stateSelector = 'form[data-address-form] [data-field-type="State"]';
    var $stateElement = $(stateSelector);
    var addressValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-address-form] input[type="submit"]',
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.announceInputErrorMessage
    });
    addressValidator.add(validationModel);

    if ($stateElement) {
      var $last; // Requests the states for a country with AJAX

      (0,_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field) {
        if (err) {
          throw new Error(err);
        }

        var $field = $(field);

        if (addressValidator.getStatus($stateElement) !== 'undefined') {
          addressValidator.remove($stateElement);
        }

        if ($last) {
          addressValidator.remove($last);
        }

        if ($field.is('select')) {
          $last = field;
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.setStateCountryValidation(addressValidator, field, _this3.validationDictionary.field_not_blank);
        } else {
          _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.cleanUpStateValidation(field);
        }
      });
    }

    $addressForm.on('submit', function (event) {
      addressValidator.performCheck();

      if (addressValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
    });
  };

  _proto.initAccountReturnFormValidation = function initAccountReturnFormValidation($accountReturnForm) {
    var errorMessage = $accountReturnForm.data('accountReturnFormError');
    $accountReturnForm.on('submit', function (event) {
      var formSubmit = false; // Iterate until we find a non-zero value in the dropdown for quantity

      $('[name^="return_qty"]', $accountReturnForm).each(function (i, ele) {
        if (parseInt($(ele).val(), 10) !== 0) {
          formSubmit = true; // Exit out of loop if we found at least one return

          return true;
        }
      });

      if (formSubmit) {
        return true;
      }

      (0,_global_modal__WEBPACK_IMPORTED_MODULE_10__.showAlertModal)(errorMessage);
      return event.preventDefault();
    });
  };

  _proto.initPaymentMethodFormValidation = function initPaymentMethodFormValidation($paymentMethodForm) {
    var _this4 = this;

    // Inject validations into form fields before validation runs
    $paymentMethodForm.find('#first_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.firstNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#last_name.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.lastNameLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#company.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.companyLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#phone.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.phoneLabel + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address1.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address1Label + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#address2.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.address2Label + "\", \"required\": false, \"maxlength\": 0 }");
    $paymentMethodForm.find('#city.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.cityLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#country.form-field').attr('data-validation', "{ \"type\": \"singleselect\", \"label\": \"" + this.context.countryLabel + "\", \"required\": true, \"prefix\": \"" + this.context.chooseCountryLabel + "\" }");
    $paymentMethodForm.find('#state.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.stateLabel + "\", \"required\": true, \"maxlength\": 0 }");
    $paymentMethodForm.find('#postal_code.form-field').attr('data-validation', "{ \"type\": \"singleline\", \"label\": \"" + this.context.postalCodeLabel + "\", \"required\": true, \"maxlength\": 0 }");
    var validationModel = (0,_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($paymentMethodForm, this.context);
    var paymentMethodSelector = 'form[data-payment-method-form]';
    var paymentMethodValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: paymentMethodSelector + " input[type=\"submit\"]",
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.announceInputErrorMessage
    });
    var $stateElement = $(paymentMethodSelector + " [data-field-type=\"State\"]");
    var $last; // Requests the states for a country with AJAX

    (0,_common_state_country__WEBPACK_IMPORTED_MODULE_6__["default"])($stateElement, this.context, function (err, field) {
      if (err) {
        throw new Error(err);
      }

      var $field = $(field);

      if (paymentMethodValidator.getStatus($stateElement) !== 'undefined') {
        paymentMethodValidator.remove($stateElement);
      }

      if ($last) {
        paymentMethodValidator.remove($last);
      }

      if ($field.is('select')) {
        $last = field;
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.setStateCountryValidation(paymentMethodValidator, field, _this4.validationDictionary.field_not_blank);
      } else {
        _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.cleanUpStateValidation(field);
      }
    }); // Use credit card number input listener to highlight credit card type

    var cardType;
    $(paymentMethodSelector + " input[name=\"credit_card_number\"]").on('keyup', function (_ref) {
      var target = _ref.target;
      cardType = (0,_common_payment_method__WEBPACK_IMPORTED_MODULE_9__.creditCardType)(target.value);

      if (cardType) {
        $(paymentMethodSelector + " img[alt=\"" + cardType + "\"]").siblings().css('opacity', '.2');
      } else {
        $(paymentMethodSelector + " img").css('opacity', '1');
      }
    }); // Set of credit card validation

    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Validators.setCreditCardNumberValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"credit_card_number\"]", this.context.creditCardNumber);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Validators.setExpirationValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"expiration\"]", this.context.expiration);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Validators.setNameOnCardValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"name_on_card\"]", this.context.nameOnCard);
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Validators.setCvvValidation(paymentMethodValidator, paymentMethodSelector + " input[name=\"cvv\"]", this.context.cvv, function () {
      return cardType;
    }); // Set of credit card format

    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Formatters.setCreditCardNumberFormat(paymentMethodSelector + " input[name=\"credit_card_number\"]");
    _common_payment_method__WEBPACK_IMPORTED_MODULE_9__.Formatters.setExpirationFormat(paymentMethodSelector + " input[name=\"expiration\"]"); // Billing address validation

    paymentMethodValidator.add(validationModel);
    $paymentMethodForm.on('submit', function (event) {
      event.preventDefault(); // Perform final form validation

      paymentMethodValidator.performCheck();

      if (paymentMethodValidator.areAll('valid')) {
        // Serialize form data and reduce it to object
        var data = lodash_reduce__WEBPACK_IMPORTED_MODULE_1___default()($paymentMethodForm.serializeArray(), function (obj, item) {
          var refObj = obj;
          refObj[item.name] = item.value;
          return refObj;
        }, {}); // Assign country and state code


        var country = lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(_this4.context.countries, function (_ref2) {
          var value = _ref2.value;
          return value === data.country;
        });

        var state = country && lodash_find__WEBPACK_IMPORTED_MODULE_0___default()(country.states, function (_ref3) {
          var value = _ref3.value;
          return value === data.state;
        });

        data.country_code = country ? country.code : data.country;
        data.state_or_province_code = state ? state.code : data.state; // Default Instrument

        data.default_instrument = !!data.default_instrument; // Store credit card

        (0,_common_payment_method__WEBPACK_IMPORTED_MODULE_9__.storeInstrument)(_this4.context, data, function () {
          window.location.href = _this4.context.paymentMethodsUrl;
        }, function () {
          (0,_global_modal__WEBPACK_IMPORTED_MODULE_10__.showAlertModal)(_this4.context.generic_error);
        });
      }
    });
  };

  _proto.registerEditAccountValidation = function registerEditAccountValidation($editAccountForm) {
    var validationModel = (0,_common_form_validation__WEBPACK_IMPORTED_MODULE_5__["default"])($editAccountForm, this.context);
    var formEditSelector = 'form[data-edit-account-form]';
    var editValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: '${formEditSelector} input[type="submit"]',
      delay: 900
    });
    var emailSelector = formEditSelector + " [data-field-type=\"EmailAddress\"]";
    var $emailElement = $(emailSelector);
    var passwordSelector = formEditSelector + " [data-field-type=\"Password\"]";
    var $passwordElement = $(passwordSelector);
    var password2Selector = formEditSelector + " [data-field-type=\"ConfirmPassword\"]";
    var $password2Element = $(password2Selector);
    var currentPasswordSelector = formEditSelector + " [data-field-type=\"CurrentPassword\"]";
    var $currentPassword = $(currentPasswordSelector); // This only handles the custom fields, standard fields are added below

    editValidator.add(validationModel);

    if ($emailElement) {
      editValidator.remove(emailSelector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.setEmailValidation(editValidator, emailSelector, this.validationDictionary.valid_email);
    }

    if ($passwordElement && $password2Element) {
      var _this$validationDicti = this.validationDictionary,
          enterPassword = _this$validationDicti.password,
          matchPassword = _this$validationDicti.password_match;
      editValidator.remove(passwordSelector);
      editValidator.remove(password2Selector);
      _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.Validators.setPasswordValidation(editValidator, passwordSelector, password2Selector, this.passwordRequirements, (0,_common_utils_form_utils__WEBPACK_IMPORTED_MODULE_7__.createPasswordValidationErrorTextObject)(enterPassword, enterPassword, matchPassword, this.passwordRequirements.error), true);
    }

    if ($currentPassword) {
      editValidator.add({
        selector: currentPasswordSelector,
        validate: function validate(cb, val) {
          var result = true;

          if (val === '' && $passwordElement.val() !== '') {
            result = false;
          }

          cb(result);
        },
        errorMessage: this.context.currentPassword
      });
    }

    editValidator.add([{
      selector: formEditSelector + " input[name='account_firstname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.firstName
    }, {
      selector: formEditSelector + " input[name='account_lastname']",
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.lastName
    }]);
    $editAccountForm.on('submit', function (event) {
      editValidator.performCheck();

      if (editValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
      setTimeout(function () {
        var earliestError = $('span.form-inlineMessage:first').prev('input');
        earliestError.focus();
      }, 900);
    });
  };

  _proto.registerInboxValidation = function registerInboxValidation($inboxForm) {
    var inboxValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_3__["default"])({
      submit: 'form[data-inbox-form] input[type="submit"]',
      delay: 900
    });
    inboxValidator.add([{
      selector: 'form[data-inbox-form] select[name="message_order_id"]',
      validate: function validate(cb, val) {
        var result = Number(val) !== 0;
        cb(result);
      },
      errorMessage: this.context.enterOrderNum
    }, {
      selector: 'form[data-inbox-form] input[name="message_subject"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterSubject
    }, {
      selector: 'form[data-inbox-form] textarea[name="message_content"]',
      validate: function validate(cb, val) {
        var result = val.length;
        cb(result);
      },
      errorMessage: this.context.enterMessage
    }]);
    $inboxForm.on('submit', function (event) {
      inboxValidator.performCheck();

      if (inboxValidator.areAll('valid')) {
        return;
      }

      event.preventDefault();
      setTimeout(function () {
        var earliestError = $('span.form-inlineMessage:first').prev('input');
        earliestError.focus();
      }, 900);
    });
  };

  return Account;
}(_page_manager__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./assets/js/theme/common/payment-method.js":
/*!**************************************************!*\
  !*** ./assets/js/theme/common/payment-method.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Formatters": function() { return /* binding */ Formatters; },
/* harmony export */   "Validators": function() { return /* binding */ Validators; },
/* harmony export */   "creditCardType": function() { return /* binding */ creditCardType; },
/* harmony export */   "storeInstrument": function() { return /* binding */ storeInstrument; }
/* harmony export */ });
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! creditcards */ "./node_modules/creditcards/index.js");
/* harmony import */ var creditcards__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(creditcards__WEBPACK_IMPORTED_MODULE_0__);
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");

/**
 * Omit null or empty string properties of object
 * @param {Object} object
 * @returns {Object}
 */

var omitNullString = function omitNullString(obj) {
  var refObj = obj;
  $.each(refObj, function (key, value) {
    if (value === null || value === '') {
      delete refObj[key];
    }
  });
  return refObj;
};
/**
 * Get credit card type from credit card number
 * @param {string} value
 */


var creditCardType = function creditCardType(value) {
  return creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.type(creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.parse(value), true);
};
/**
 * Wrapper for ajax request to store a new instrument in bigpay
 * @param {object} Representing the data needed for the header
 * @param {object} Representing the data needed for the body
 * @param {function} done Function to execute on a successful response
 * @param {function} fail Function to execute on a unsuccessful response
 */

var storeInstrument = function storeInstrument(_ref, _ref2, done, fail) {
  var paymentsUrl = _ref.paymentsUrl,
      shopperId = _ref.shopperId,
      storeHash = _ref.storeHash,
      vaultToken = _ref.vaultToken;
  var provider_id = _ref2.provider_id,
      currency_code = _ref2.currency_code,
      credit_card_number = _ref2.credit_card_number,
      expiration = _ref2.expiration,
      name_on_card = _ref2.name_on_card,
      cvv = _ref2.cvv,
      default_instrument = _ref2.default_instrument,
      address1 = _ref2.address1,
      address2 = _ref2.address2,
      city = _ref2.city,
      postal_code = _ref2.postal_code,
      state_or_province_code = _ref2.state_or_province_code,
      country_code = _ref2.country_code,
      company = _ref2.company,
      first_name = _ref2.first_name,
      last_name = _ref2.last_name,
      email = _ref2.email,
      phone = _ref2.phone;
  var expiry = expiration.split('/');
  $.ajax({
    url: paymentsUrl + "/stores/" + storeHash + "/customers/" + shopperId + "/stored_instruments",
    dataType: 'json',
    method: 'POST',
    cache: false,
    headers: {
      Authorization: vaultToken,
      Accept: 'application/vnd.bc.v1+json',
      'Content-Type': 'application/vnd.bc.v1+json'
    },
    data: JSON.stringify({
      instrument: {
        type: 'card',
        cardholder_name: name_on_card,
        number: creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.parse(credit_card_number),
        expiry_month: creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.month.parse(expiry[0]),
        expiry_year: creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.year.parse(expiry[1], true),
        verification_value: cvv
      },
      billing_address: omitNullString({
        address1: address1,
        address2: address2,
        city: city,
        postal_code: postal_code,
        state_or_province_code: state_or_province_code,
        country_code: country_code,
        company: company,
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone
      }),
      provider_id: provider_id,
      default_instrument: default_instrument,
      currency_code: currency_code
    })
  }).done(done).fail(fail);
};
var Formatters = {
  /**
   * Sets up a format for credit card number
   * @param field
   */
  setCreditCardNumberFormat: function setCreditCardNumberFormat(field) {
    if (field) {
      $(field).on('keyup', function (_ref3) {
        var target = _ref3.target;
        var refTarget = target;
        refTarget.value = creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.format(creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.parse(target.value));
      });
    }
  },

  /**
   * Sets up a format for expiration date
   * @param field
   */
  setExpirationFormat: function setExpirationFormat(field) {
    if (field) {
      $(field).on('keyup', function (_ref4) {
        var target = _ref4.target,
            which = _ref4.which;
        var refTarget = target;

        if (which === 8 && /.*(\/)$/.test(target.value)) {
          refTarget.value = target.value.slice(0, -1);
        } else if (target.value.length > 4) {
          refTarget.value = target.value.slice(0, 5);
        } else if (which !== 8) {
          refTarget.value = target.value.replace(/^([1-9]\/|[2-9])$/g, '0$1/').replace(/^(0[1-9]|1[0-2])$/g, '$1/').replace(/^([0-1])([3-9])$/g, '0$1/$2').replace(/^(0[1-9]|1[0-2])([0-9]{2})$/g, '$1/$2').replace(/^([0]+)\/|[0]+$/g, '0').replace(/[^\d\/]|^[\/]*$/g, '').replace(/\/\//g, '/');
        }
      });
    }
  }
};
var Validators = {
  /**
   * Sets up a validation for credit card number
   * @param validator
   * @param field
   * @param errorMessage
   */
  setCreditCardNumberValidation: function setCreditCardNumberValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.isValid(creditcards__WEBPACK_IMPORTED_MODULE_0___default().card.parse(val));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },

  /**
   * Sets up a validation for expiration date
   * @param validator
   * @param field
   * @param errorMessage
   */
  setExpirationValidation: function setExpirationValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var expiry = val.split('/');
          var result = val.length && /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(val);
          result = result && !creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.isPast(creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.month.parse(expiry[0]), creditcards__WEBPACK_IMPORTED_MODULE_0___default().expiration.year.parse(expiry[1], true));
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },

  /**
   * Sets up a validation for name on card
   * @param validator
   * @param field
   * @param errorMessage
   */
  setNameOnCardValidation: function setNameOnCardValidation(validator, field, errorMessage) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var result = !!val.length;
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  },

  /**
   * Sets up a validation for cvv
   * @param validator
   * @param field
   * @param errorMessage
   * @param {any} cardType The credit card number type
   */
  setCvvValidation: function setCvvValidation(validator, field, errorMessage, cardType) {
    if (field) {
      validator.add({
        selector: field,
        validate: function validate(cb, val) {
          var type = typeof cardType === 'function' ? cardType() : cardType;
          var result = val.length && creditcards__WEBPACK_IMPORTED_MODULE_0___default().cvc.isValid(val, type);
          cb(result);
        },
        errorMessage: errorMessage
      });
    }
  }
};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9hY2NvdW50X2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7O0lBRXFCa0I7OztBQUNqQixtQkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixvQ0FBTUEsT0FBTjtBQUNBLFVBQUtDLG9CQUFMLEdBQTRCViw2RkFBMkIsQ0FBQ1MsT0FBRCxDQUF2RDtBQUNBLFVBQUtFLE1BQUwsR0FBY0MsQ0FBQyxDQUFDLDJCQUFELENBQWY7QUFDQSxVQUFLQyxLQUFMLEdBQWFELENBQUMsQ0FBQyxNQUFELENBQWQ7QUFKaUI7QUFLcEI7Ozs7U0FFREUsVUFBQSxtQkFBVTtBQUNOLFFBQU1DLGdCQUFnQixHQUFHcEIsc0VBQVksQ0FBQyw4QkFBRCxDQUFyQztBQUNBLFFBQU1xQixZQUFZLEdBQUdyQixzRUFBWSxDQUFDLHlCQUFELENBQWpDO0FBQ0EsUUFBTXNCLFVBQVUsR0FBR3RCLHNFQUFZLENBQUMsdUJBQUQsQ0FBL0I7QUFDQSxRQUFNdUIsa0JBQWtCLEdBQUd2QixzRUFBWSxDQUFDLDRCQUFELENBQXZDO0FBQ0EsUUFBTXdCLGtCQUFrQixHQUFHeEIsc0VBQVksQ0FBQyxnQ0FBRCxDQUF2QztBQUNBLFFBQU15QixZQUFZLEdBQUd6QixzRUFBWSxDQUFDLDZCQUFELENBQWpDO0FBQ0EsUUFBTTBCLGNBQWMsR0FBR1QsQ0FBQyxDQUFDLHNCQUFELENBQXhCO0FBQ0EsUUFBTVUsWUFBWSxHQUFHQyxNQUFNLENBQUNDLFdBQTVCO0FBRUFqQixJQUFBQSxxRUFBZSxDQUFDLEtBQUtFLE9BQU4sQ0FBZixDQVZNLENBWU47O0FBQ0EsU0FBS2dCLG9CQUFMLEdBQTRCLEtBQUtoQixPQUFMLENBQWFnQixvQkFBekMsQ0FiTSxDQWVOOztBQUNBakMsSUFBQUEsc0RBQUEsQ0FBYyxL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TStPLG9CQUFvQixHQUFHalEsQ0FBQyxDQUFDLE1BQUQsQ0FBRCxDQUFVcUUsSUFBVixDQUFlLG9DQUFmLENBQTdCOztBQUVBLFFBQUk0TCxvQkFBb0IsQ0FBQ2xQLE1BQXJCLElBQStCLENBQW5DLEVBQXNDO0FBQ2xDckIsTUFBQUEsc0RBQWMsQ0FBQzRQLGdCQUFELENBQWQ7QUFDQSxhQUFPLEtBQVA7QUFDSDtBQUNKLEdBUEQ7QUFRSCIsInNvdXJjZXMiOlsid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2FjY291bnQuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL3BheW1lbnQtbWV0aG9kLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYWdlTWFuYWdlciBmcm9tICcuL3BhZ2UtbWFuYWdlcic7XG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xuaW1wb3J0IFdpc2hsaXN0IGZyb20gJy4vd2lzaGxpc3QnO1xuaW1wb3J0IHZhbGlkYXRpb24gZnJvbSAnLi9jb21tb24vZm9ybS12YWxpZGF0aW9uJztcbmltcG9ydCBzdGF0ZUNvdW50cnkgZnJvbSAnLi9jb21tb24vc3RhdGUtY291bnRyeSc7XG5pbXBvcnQge1xuICAgIGNsYXNzaWZ5Rm9ybSxcbiAgICBWYWxpZGF0b3JzLFxuICAgIGFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UsXG4gICAgaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCxcbiAgICBjcmVhdGVQYXNzd29yZFZhbGlkYXRpb25FcnJvclRleHRPYmplY3QsXG59IGZyb20gJy4vY29tbW9uL3V0aWxzL2Zvcm0tdXRpbHMnO1xuaW1wb3J0IHsgY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5IH0gZnJvbSAnLi9jb21tb24vdXRpbHMvdHJhbnNsYXRpb25zLXV0aWxzJztcbmltcG9ydCB7IGNyZWRpdENhcmRUeXBlLCBzdG9yZUluc3RydW1lbnQsIFZhbGlkYXRvcnMgYXMgQ0NWYWxpZGF0b3JzLCBGb3JtYXR0ZXJzIGFzIENDRm9ybWF0dGVycyB9IGZyb20gJy4vY29tbW9uL3BheW1lbnQtbWV0aG9kJztcbmltcG9ydCB7IHNob3dBbGVydE1vZGFsIH0gZnJvbSAnLi9nbG9iYWwvbW9kYWwnO1xuaW1wb3J0IGNvbXBhcmVQcm9kdWN0cyBmcm9tICcuL2dsb2JhbC9jb21wYXJlLXByb2R1Y3RzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudCBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuICAgICAgICB0aGlzLiRzdGF0ZSA9ICQoJ1tkYXRhLWZpZWxkLXR5cGU9XCJTdGF0ZVwiXScpO1xuICAgICAgICB0aGlzLiRib2R5ID0gJCgnYm9keScpO1xuICAgIH1cblxuICAgIG9uUmVhZHkoKSB7XG4gICAgICAgIGNvbnN0ICRlZGl0QWNjb3VudEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1lZGl0LWFjY291bnQtZm9ybV0nKTtcbiAgICAgICAgY29uc3QgJGFkZHJlc3NGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXScpO1xuICAgICAgICBjb25zdCAkaW5ib3hGb3JtID0gY2xhc3NpZnlGb3JtKCdmb3JtW2RhdGEtaW5ib3gtZm9ybV0nKTtcbiAgICAgICAgY29uc3QgJGFjY291bnRSZXR1cm5Gb3JtID0gY2xhc3NpZnlGb3JtKCdbZGF0YS1hY2NvdW50LXJldHVybi1mb3JtXScpO1xuICAgICAgICBjb25zdCAkcGF5bWVudE1ldGhvZEZvcm0gPSBjbGFzc2lmeUZvcm0oJ2Zvcm1bZGF0YS1wYXltZW50LW1ldGhvZC1mb3JtXScpO1xuICAgICAgICBjb25zdCAkcmVvcmRlckZvcm0gPSBjbGFzc2lmeUZvcm0oJ1tkYXRhLWFjY291bnQtcmVvcmRlci1mb3JtXScpO1xuICAgICAgICBjb25zdCAkaW52b2ljZUJ1dHRvbiA9ICQoJ1tkYXRhLXByaW50LWludm9pY2VdJyk7XG4gICAgICAgIGNvbnN0ICRiaWdDb21tZXJjZSA9IHdpbmRvdy5CaWdDb21tZXJjZTtcblxuICAgICAgICBjb21wYXJlUHJvZHVjdHModGhpcy5jb250ZXh0KTtcblxuICAgICAgICAvLyBJbmplY3RlZCB2aWEgdGVtcGxhdGVcbiAgICAgICAgdGhpcy5wYXNzd29yZFJlcXVpcmVtZW50cyA9IHRoaXMuY29udGV4dC5wYXNzd29yZFJlcXVpcmVtZW50cztcblxuICAgICAgICAvLyBJbnN0YW50aWF0ZXMgd2lzaCBsaXN0IEpTXG4gICAgICAgIFdpc2hsaXN0LmxvYWQodGhpcy5jb250ZXh0KTtcblxuICAgICAgICBpZiAoJGVkaXRBY2NvdW50Rm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJFZGl0QWNjb3VudFZhbGlkYXRpb24oJGVkaXRBY2NvdW50Rm9ybSk7XG4gICAgICAgICAgICBpZiAodGhpcy4kc3RhdGUuaXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW52b2ljZUJ1dHRvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgICRpbnZvaWNlQnV0dG9uLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBsZWZ0ID0gd2luZG93LnNjcmVlbi5hdmFpbFdpZHRoIC8gMiAtIDQ1MDtcbiAgICAgICAgICAgICAgICBjb25zdCB0b3AgPSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0IC8gMiAtIDMyMDtcbiAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSAkaW52b2ljZUJ1dHRvbi5kYXRhKCdwcmludEludm9pY2UnKTtcblxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKHVybCwgJ29yZGVySW52b2ljZScsIGB3aWR0aD05MDAsaGVpZ2h0PTY1MCxsZWZ0PSR7bGVmdH0sdG9wPSR7dG9wfSxzY3JvbGxiYXJzPTFgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRhZGRyZXNzRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEFkZHJlc3NGb3JtVmFsaWRhdGlvbigkYWRkcmVzc0Zvcm0pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy4kc3RhdGUuaXMoJ2lucHV0JykpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRTdGF0ZUhpZGRlbkZpZWxkKHRoaXMuJHN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkaW5ib3hGb3JtLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5yZWdpc3RlckluYm94VmFsaWRhdGlvbigkaW5ib3hGb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkYWNjb3VudFJldHVybkZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRBY2NvdW50UmV0dXJuRm9ybVZhbGlkYXRpb24oJGFjY291bnRSZXR1cm5Gb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcGF5bWVudE1ldGhvZEZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRQYXltZW50TWV0aG9kRm9ybVZhbGlkYXRpb24oJHBheW1lbnRNZXRob2RGb3JtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcmVvcmRlckZvcm0ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRSZW9yZGVyRm9ybSgkcmVvcmRlckZvcm0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRiaWdDb21tZXJjZSAmJiAkYmlnQ29tbWVyY2UucmVuZGVyQWNjb3VudFBheW1lbnRzKSB7XG4gICAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICAgICAgY291bnRyaWVzLFxuICAgICAgICAgICAgICAgIHBheW1lbnRzVXJsLFxuICAgICAgICAgICAgICAgIHN0b3JlSGFzaCxcbiAgICAgICAgICAgICAgICBzdG9yZUxvY2FsZSxcbiAgICAgICAgICAgICAgICB2YXVsdFRva2VuLFxuICAgICAgICAgICAgICAgIHNob3BwZXJJZCxcbiAgICAgICAgICAgICAgICBjdXN0b21lckVtYWlsLFxuICAgICAgICAgICAgICAgIHByb3ZpZGVySWQsXG4gICAgICAgICAgICAgICAgY3VycmVuY3lDb2RlLFxuICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2RzVXJsLFxuICAgICAgICAgICAgICAgIHBheW1lbnRQcm92aWRlckluaXRpYWxpemF0aW9uRGF0YSxcbiAgICAgICAgICAgICAgICB0aGVtZVNldHRpbmdzLFxuICAgICAgICAgICAgfSA9IHRoaXMuY29udGV4dDtcblxuICAgICAgICAgICAgJGJpZ0NvbW1lcmNlLnJlbmRlckFjY291bnRQYXltZW50cyh7XG4gICAgICAgICAgICAgICAgc3R5bGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGlucHV0QmFzZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lU2V0dGluZ3NbJ2lucHV0LWZvbnQtY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZVNldHRpbmdzWydpbnB1dC1ib3JkZXItY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRWYWxpZGF0aW9uRXJyb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydjb2xvci1lcnJvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lU2V0dGluZ3NbJ2NvbG9yLWVycm9yJ10sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGlucHV0VmFsaWRhdGlvblN1Y2Nlc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydjb2xvci1zdWNjZXNzJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWVTZXR0aW5nc1snY29sb3Itc3VjY2VzcyddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLXByaW1hcnktY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1wcmltYXJ5LWJhY2tncm91bmRDb2xvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tcHJpbWFyeS1iYWNrZ3JvdW5kQ29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLXByaW1hcnktY29sb3JIb3ZlciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1wcmltYXJ5LWJhY2tncm91bmRDb2xvckhvdmVyJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tcHJpbWFyeS1iYWNrZ3JvdW5kQ29sb3JIb3ZlciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcmOmFjdGl2ZSc6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1wcmltYXJ5LWNvbG9yQWN0aXZlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLXByaW1hcnktYmFja2dyb3VuZENvbG9yQWN0aXZlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tcHJpbWFyeS1iYWNrZ3JvdW5kQ29sb3JBY3RpdmUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnJltkaXNhYmxlZF0nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRpc2FibGVkLWJhY2tncm91bmRDb2xvciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRpc2FibGVkLWJvcmRlckNvbG9yJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tZGlzYWJsZWQtY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6ICdub3QtYWxsb3dlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRlZmF1bHQtY29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlckNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRlZmF1bHQtYm9yZGVyQ29sb3InXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcmOmhvdmVyJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydidXR0b24tLWRlZmF1bHQtY29sb3JIb3ZlciddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1kZWZhdWx0LWJvcmRlckNvbG9ySG92ZXInXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnJjphY3RpdmUnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lU2V0dGluZ3NbJ2J1dHRvbi0tZGVmYXVsdC1jb2xvckFjdGl2ZSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogdGhlbWVTZXR0aW5nc1snYnV0dG9uLS1kZWZhdWx0LWJvcmRlckNvbG9yQWN0aXZlJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IHRoZW1lU2V0dGluZ3NbJ2Zvcm0tbGFiZWwtZm9udC1jb2xvciddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3I6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiB0aGVtZVNldHRpbmdzWydjb2xvci1lcnJvciddLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBoZWFkaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogdGhlbWVTZXR0aW5nc1snY29sb3ItdGV4dEhlYWRpbmcnXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0b3JlQ29udGV4dERhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgY291bnRyaWVzLFxuICAgICAgICAgICAgICAgICAgICBwYXltZW50c1VybCxcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVIYXNoLFxuICAgICAgICAgICAgICAgICAgICBzdG9yZUxvY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgdmF1bHRUb2tlbixcbiAgICAgICAgICAgICAgICAgICAgc2hvcHBlcklkLFxuICAgICAgICAgICAgICAgICAgICBjdXN0b21lckVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBwcm92aWRlcklkLFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeUNvZGUsXG4gICAgICAgICAgICAgICAgICAgIHBheW1lbnRNZXRob2RzVXJsLFxuICAgICAgICAgICAgICAgICAgICBwYXltZW50UHJvdmlkZXJJbml0aWFsaXphdGlvbkRhdGEsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvckhhbmRsZXI6IHNob3dBbGVydE1vZGFsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmJpbmREZWxldGVBZGRyZXNzKCk7XG4gICAgICAgIHRoaXMuYmluZERlbGV0ZVBheW1lbnRNZXRob2QoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCaW5kcyBhIHN1Ym1pdCBob29rIHRvIGVuc3VyZSB0aGUgY3VzdG9tZXIgcmVjZWl2ZXMgYSBjb25maXJtYXRpb24gZGlhbG9nIGJlZm9yZSBkZWxldGluZyBhbiBhZGRyZXNzXG4gICAgICovXG4gICAgYmluZERlbGV0ZUFkZHJlc3MoKSB7XG4gICAgICAgICQoJ1tkYXRhLWRlbGV0ZS1hZGRyZXNzXScpLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdkZWxldGVBZGRyZXNzJyk7XG5cbiAgICAgICAgICAgIGlmICghd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiaW5kRGVsZXRlUGF5bWVudE1ldGhvZCgpIHtcbiAgICAgICAgJCgnW2RhdGEtZGVsZXRlLXBheW1lbnQtbWV0aG9kXScpLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBjb25zdCBtZXNzYWdlID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKCdkZWxldGVQYXltZW50TWV0aG9kJyk7XG5cbiAgICAgICAgICAgIGlmICghd2luZG93LmNvbmZpcm0obWVzc2FnZSkpIHtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0UmVvcmRlckZvcm0oJHJlb3JkZXJGb3JtKSB7XG4gICAgICAgICRyZW9yZGVyRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgY29uc3QgJHByb2R1Y3RSZW9yZGVyQ2hlY2tib3hlcyA9ICQoJy5hY2NvdW50LWxpc3RJdGVtIC5mb3JtLWNoZWNrYm94OmNoZWNrZWQnKTtcbiAgICAgICAgICAgIGxldCBzdWJtaXRGb3JtID0gZmFsc2U7XG5cbiAgICAgICAgICAgICRyZW9yZGVyRm9ybS5maW5kKCdbbmFtZV49XCJyZW9yZGVyaXRlbVwiXScpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAkcHJvZHVjdFJlb3JkZXJDaGVja2JveGVzLmVhY2goKGluZGV4LCBwcm9kdWN0Q2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBwcm9kdWN0SWQgPSAkKHByb2R1Y3RDaGVja2JveCkudmFsKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgJGlucHV0ID0gJCgnPGlucHV0PicsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2hpZGRlbicsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGByZW9yZGVyaXRlbVske3Byb2R1Y3RJZH1dYCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICcxJyxcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHN1Ym1pdEZvcm0gPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgJHJlb3JkZXJGb3JtLmFwcGVuZCgkaW5wdXQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghc3VibWl0Rm9ybSkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwodGhpcy5jb250ZXh0LnNlbGVjdEl0ZW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0QWRkcmVzc0Zvcm1WYWxpZGF0aW9uKCRhZGRyZXNzRm9ybSkge1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTW9kZWwgPSB2YWxpZGF0aW9uKCRhZGRyZXNzRm9ybSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgY29uc3Qgc3RhdGVTZWxlY3RvciA9ICdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXSBbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl0nO1xuICAgICAgICBjb25zdCAkc3RhdGVFbGVtZW50ID0gJChzdGF0ZVNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgYWRkcmVzc1ZhbGlkYXRvciA9IG5vZCh7XG4gICAgICAgICAgICBzdWJtaXQ6ICdmb3JtW2RhdGEtYWRkcmVzcy1mb3JtXSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgICAgIHRhcDogYW5ub3VuY2VJbnB1dEVycm9yTWVzc2FnZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkcmVzc1ZhbGlkYXRvci5hZGQodmFsaWRhdGlvbk1vZGVsKTtcblxuICAgICAgICBpZiAoJHN0YXRlRWxlbWVudCkge1xuICAgICAgICAgICAgbGV0ICRsYXN0O1xuXG4gICAgICAgICAgICAvLyBSZXF1ZXN0cyB0aGUgc3RhdGVzIGZvciBhIGNvdW50cnkgd2l0aCBBSkFYXG4gICAgICAgICAgICBzdGF0ZUNvdW50cnkoJHN0YXRlRWxlbWVudCwgdGhpcy5jb250ZXh0LCAoZXJyLCBmaWVsZCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoYWRkcmVzc1ZhbGlkYXRvci5nZXRTdGF0dXMoJHN0YXRlRWxlbWVudCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3NWYWxpZGF0b3IucmVtb3ZlKCRzdGF0ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICgkbGFzdCkge1xuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzVmFsaWRhdG9yLnJlbW92ZSgkbGFzdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCRmaWVsZC5pcygnc2VsZWN0JykpIHtcbiAgICAgICAgICAgICAgICAgICAgJGxhc3QgPSBmaWVsZDtcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uKGFkZHJlc3NWYWxpZGF0b3IsIGZpZWxkLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmZpZWxkX25vdF9ibGFuayk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5jbGVhblVwU3RhdGVWYWxpZGF0aW9uKGZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgICRhZGRyZXNzRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgYWRkcmVzc1ZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKGFkZHJlc3NWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0QWNjb3VudFJldHVybkZvcm1WYWxpZGF0aW9uKCRhY2NvdW50UmV0dXJuRm9ybSkge1xuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAkYWNjb3VudFJldHVybkZvcm0uZGF0YSgnYWNjb3VudFJldHVybkZvcm1FcnJvcicpO1xuXG4gICAgICAgICRhY2NvdW50UmV0dXJuRm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgbGV0IGZvcm1TdWJtaXQgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gSXRlcmF0ZSB1bnRpbCB3ZSBmaW5kIGEgbm9uLXplcm8gdmFsdWUgaW4gdGhlIGRyb3Bkb3duIGZvciBxdWFudGl0eVxuICAgICAgICAgICAgJCgnW25hbWVePVwicmV0dXJuX3F0eVwiXScsICRhY2NvdW50UmV0dXJuRm9ybSkuZWFjaCgoaSwgZWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnNlSW50KCQoZWxlKS52YWwoKSwgMTApICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm1TdWJtaXQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEV4aXQgb3V0IG9mIGxvb3AgaWYgd2UgZm91bmQgYXQgbGVhc3Qgb25lIHJldHVyblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKGZvcm1TdWJtaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwoZXJyb3JNZXNzYWdlKTtcblxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXRQYXltZW50TWV0aG9kRm9ybVZhbGlkYXRpb24oJHBheW1lbnRNZXRob2RGb3JtKSB7XG4gICAgICAgIC8vIEluamVjdCB2YWxpZGF0aW9ucyBpbnRvIGZvcm0gZmllbGRzIGJlZm9yZSB2YWxpZGF0aW9uIHJ1bnNcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNmaXJzdF9uYW1lLmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVsaW5lXCIsIFwibGFiZWxcIjogXCIke3RoaXMuY29udGV4dC5maXJzdE5hbWVMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNsYXN0X25hbWUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0Lmxhc3ROYW1lTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjY29tcGFueS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQuY29tcGFueUxhYmVsfVwiLCBcInJlcXVpcmVkXCI6IGZhbHNlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNwaG9uZS5mb3JtLWZpZWxkJykuYXR0cignZGF0YS12YWxpZGF0aW9uJywgYHsgXCJ0eXBlXCI6IFwic2luZ2xlbGluZVwiLCBcImxhYmVsXCI6IFwiJHt0aGlzLmNvbnRleHQucGhvbmVMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiBmYWxzZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjYWRkcmVzczEuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmFkZHJlc3MxTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjYWRkcmVzczIuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmFkZHJlc3MyTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogZmFsc2UsIFwibWF4bGVuZ3RoXCI6IDAgfWApO1xuICAgICAgICAkcGF5bWVudE1ldGhvZEZvcm0uZmluZCgnI2NpdHkuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmNpdHlMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLmZpbmQoJyNjb3VudHJ5LmZvcm0tZmllbGQnKS5hdHRyKCdkYXRhLXZhbGlkYXRpb24nLCBgeyBcInR5cGVcIjogXCJzaW5nbGVzZWxlY3RcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LmNvdW50cnlMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcInByZWZpeFwiOiBcIiR7dGhpcy5jb250ZXh0LmNob29zZUNvdW50cnlMYWJlbH1cIiB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjc3RhdGUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LnN0YXRlTGFiZWx9XCIsIFwicmVxdWlyZWRcIjogdHJ1ZSwgXCJtYXhsZW5ndGhcIjogMCB9YCk7XG4gICAgICAgICRwYXltZW50TWV0aG9kRm9ybS5maW5kKCcjcG9zdGFsX2NvZGUuZm9ybS1maWVsZCcpLmF0dHIoJ2RhdGEtdmFsaWRhdGlvbicsIGB7IFwidHlwZVwiOiBcInNpbmdsZWxpbmVcIiwgXCJsYWJlbFwiOiBcIiR7dGhpcy5jb250ZXh0LnBvc3RhbENvZGVMYWJlbH1cIiwgXCJyZXF1aXJlZFwiOiB0cnVlLCBcIm1heGxlbmd0aFwiOiAwIH1gKTtcblxuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTW9kZWwgPSB2YWxpZGF0aW9uKCRwYXltZW50TWV0aG9kRm9ybSwgdGhpcy5jb250ZXh0KTtcbiAgICAgICAgY29uc3QgcGF5bWVudE1ldGhvZFNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1wYXltZW50LW1ldGhvZC1mb3JtXSc7XG4gICAgICAgIGNvbnN0IHBheW1lbnRNZXRob2RWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W3R5cGU9XCJzdWJtaXRcIl1gLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgJHN0YXRlRWxlbWVudCA9ICQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBbZGF0YS1maWVsZC10eXBlPVwiU3RhdGVcIl1gKTtcblxuICAgICAgICBsZXQgJGxhc3Q7XG4gICAgICAgIC8vIFJlcXVlc3RzIHRoZSBzdGF0ZXMgZm9yIGEgY291bnRyeSB3aXRoIEFKQVhcbiAgICAgICAgc3RhdGVDb3VudHJ5KCRzdGF0ZUVsZW1lbnQsIHRoaXMuY29udGV4dCwgKGVyciwgZmllbGQpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgJGZpZWxkID0gJChmaWVsZCk7XG5cbiAgICAgICAgICAgIGlmIChwYXltZW50TWV0aG9kVmFsaWRhdG9yLmdldFN0YXR1cygkc3RhdGVFbGVtZW50KSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBwYXltZW50TWV0aG9kVmFsaWRhdG9yLnJlbW92ZSgkc3RhdGVFbGVtZW50KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCRsYXN0KSB7XG4gICAgICAgICAgICAgICAgcGF5bWVudE1ldGhvZFZhbGlkYXRvci5yZW1vdmUoJGxhc3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoJGZpZWxkLmlzKCdzZWxlY3QnKSkge1xuICAgICAgICAgICAgICAgICRsYXN0ID0gZmllbGQ7XG4gICAgICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uKHBheW1lbnRNZXRob2RWYWxpZGF0b3IsIGZpZWxkLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmZpZWxkX25vdF9ibGFuayk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIFZhbGlkYXRvcnMuY2xlYW5VcFN0YXRlVmFsaWRhdGlvbihmaWVsZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFVzZSBjcmVkaXQgY2FyZCBudW1iZXIgaW5wdXQgbGlzdGVuZXIgdG8gaGlnaGxpZ2h0IGNyZWRpdCBjYXJkIHR5cGVcbiAgICAgICAgbGV0IGNhcmRUeXBlO1xuICAgICAgICAkKGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW5wdXRbbmFtZT1cImNyZWRpdF9jYXJkX251bWJlclwiXWApLm9uKCdrZXl1cCcsICh7IHRhcmdldCB9KSA9PiB7XG4gICAgICAgICAgICBjYXJkVHlwZSA9IGNyZWRpdENhcmRUeXBlKHRhcmdldC52YWx1ZSk7XG4gICAgICAgICAgICBpZiAoY2FyZFR5cGUpIHtcbiAgICAgICAgICAgICAgICAkKGAke3BheW1lbnRNZXRob2RTZWxlY3Rvcn0gaW1nW2FsdD1cIiR7Y2FyZFR5cGV9XCJdYCkuc2libGluZ3MoKS5jc3MoJ29wYWNpdHknLCAnLjInKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGltZ2ApLmNzcygnb3BhY2l0eScsICcxJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFNldCBvZiBjcmVkaXQgY2FyZCB2YWxpZGF0aW9uXG4gICAgICAgIENDVmFsaWRhdG9ycy5zZXRDcmVkaXRDYXJkTnVtYmVyVmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJjcmVkaXRfY2FyZF9udW1iZXJcIl1gLCB0aGlzLmNvbnRleHQuY3JlZGl0Q2FyZE51bWJlcik7XG4gICAgICAgIENDVmFsaWRhdG9ycy5zZXRFeHBpcmF0aW9uVmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJleHBpcmF0aW9uXCJdYCwgdGhpcy5jb250ZXh0LmV4cGlyYXRpb24pO1xuICAgICAgICBDQ1ZhbGlkYXRvcnMuc2V0TmFtZU9uQ2FyZFZhbGlkYXRpb24ocGF5bWVudE1ldGhvZFZhbGlkYXRvciwgYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwibmFtZV9vbl9jYXJkXCJdYCwgdGhpcy5jb250ZXh0Lm5hbWVPbkNhcmQpO1xuICAgICAgICBDQ1ZhbGlkYXRvcnMuc2V0Q3Z2VmFsaWRhdGlvbihwYXltZW50TWV0aG9kVmFsaWRhdG9yLCBgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJjdnZcIl1gLCB0aGlzLmNvbnRleHQuY3Z2LCAoKSA9PiBjYXJkVHlwZSk7XG5cbiAgICAgICAgLy8gU2V0IG9mIGNyZWRpdCBjYXJkIGZvcm1hdFxuICAgICAgICBDQ0Zvcm1hdHRlcnMuc2V0Q3JlZGl0Q2FyZE51bWJlckZvcm1hdChgJHtwYXltZW50TWV0aG9kU2VsZWN0b3J9IGlucHV0W25hbWU9XCJjcmVkaXRfY2FyZF9udW1iZXJcIl1gKTtcbiAgICAgICAgQ0NGb3JtYXR0ZXJzLnNldEV4cGlyYXRpb25Gb3JtYXQoYCR7cGF5bWVudE1ldGhvZFNlbGVjdG9yfSBpbnB1dFtuYW1lPVwiZXhwaXJhdGlvblwiXWApO1xuXG4gICAgICAgIC8vIEJpbGxpbmcgYWRkcmVzcyB2YWxpZGF0aW9uXG4gICAgICAgIHBheW1lbnRNZXRob2RWYWxpZGF0b3IuYWRkKHZhbGlkYXRpb25Nb2RlbCk7XG5cbiAgICAgICAgJHBheW1lbnRNZXRob2RGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgLy8gUGVyZm9ybSBmaW5hbCBmb3JtIHZhbGlkYXRpb25cbiAgICAgICAgICAgIHBheW1lbnRNZXRob2RWYWxpZGF0b3IucGVyZm9ybUNoZWNrKCk7XG4gICAgICAgICAgICBpZiAocGF5bWVudE1ldGhvZFZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICAvLyBTZXJpYWxpemUgZm9ybSBkYXRhIGFuZCByZWR1Y2UgaXQgdG8gb2JqZWN0XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IF8ucmVkdWNlKCRwYXltZW50TWV0aG9kRm9ybS5zZXJpYWxpemVBcnJheSgpLCAob2JqLCBpdGVtKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlZk9iaiA9IG9iajtcbiAgICAgICAgICAgICAgICAgICAgcmVmT2JqW2l0ZW0ubmFtZV0gPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVmT2JqO1xuICAgICAgICAgICAgICAgIH0sIHt9KTtcblxuICAgICAgICAgICAgICAgIC8vIEFzc2lnbiBjb3VudHJ5IGFuZCBzdGF0ZSBjb2RlXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnRyeSA9IF8uZmluZCh0aGlzLmNvbnRleHQuY291bnRyaWVzLCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA9PT0gZGF0YS5jb3VudHJ5KTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0ZSA9IGNvdW50cnkgJiYgXy5maW5kKGNvdW50cnkuc3RhdGVzLCAoeyB2YWx1ZSB9KSA9PiB2YWx1ZSA9PT0gZGF0YS5zdGF0ZSk7XG4gICAgICAgICAgICAgICAgZGF0YS5jb3VudHJ5X2NvZGUgPSBjb3VudHJ5ID8gY291bnRyeS5jb2RlIDogZGF0YS5jb3VudHJ5O1xuICAgICAgICAgICAgICAgIGRhdGEuc3RhdGVfb3JfcHJvdmluY2VfY29kZSA9IHN0YXRlID8gc3RhdGUuY29kZSA6IGRhdGEuc3RhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyBEZWZhdWx0IEluc3RydW1lbnRcbiAgICAgICAgICAgICAgICBkYXRhLmRlZmF1bHRfaW5zdHJ1bWVudCA9ICEhZGF0YS5kZWZhdWx0X2luc3RydW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAvLyBTdG9yZSBjcmVkaXQgY2FyZFxuICAgICAgICAgICAgICAgIHN0b3JlSW5zdHJ1bWVudCh0aGlzLmNvbnRleHQsIGRhdGEsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB0aGlzLmNvbnRleHQucGF5bWVudE1ldGhvZHNVcmw7XG4gICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzaG93QWxlcnRNb2RhbCh0aGlzLmNvbnRleHQuZ2VuZXJpY19lcnJvcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyRWRpdEFjY291bnRWYWxpZGF0aW9uKCRlZGl0QWNjb3VudEZvcm0pIHtcbiAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1vZGVsID0gdmFsaWRhdGlvbigkZWRpdEFjY291bnRGb3JtLCB0aGlzLmNvbnRleHQpO1xuICAgICAgICBjb25zdCBmb3JtRWRpdFNlbGVjdG9yID0gJ2Zvcm1bZGF0YS1lZGl0LWFjY291bnQtZm9ybV0nO1xuICAgICAgICBjb25zdCBlZGl0VmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJyR7Zm9ybUVkaXRTZWxlY3Rvcn0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgICAgICBkZWxheTogOTAwLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZW1haWxTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJFbWFpbEFkZHJlc3NcIl1gO1xuICAgICAgICBjb25zdCAkZW1haWxFbGVtZW50ID0gJChlbWFpbFNlbGVjdG9yKTtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJQYXNzd29yZFwiXWA7XG4gICAgICAgIGNvbnN0ICRwYXNzd29yZEVsZW1lbnQgPSAkKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBwYXNzd29yZDJTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJDb25maXJtUGFzc3dvcmRcIl1gO1xuICAgICAgICBjb25zdCAkcGFzc3dvcmQyRWxlbWVudCA9ICQocGFzc3dvcmQyU2VsZWN0b3IpO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFzc3dvcmRTZWxlY3RvciA9IGAke2Zvcm1FZGl0U2VsZWN0b3J9IFtkYXRhLWZpZWxkLXR5cGU9XCJDdXJyZW50UGFzc3dvcmRcIl1gO1xuICAgICAgICBjb25zdCAkY3VycmVudFBhc3N3b3JkID0gJChjdXJyZW50UGFzc3dvcmRTZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gVGhpcyBvbmx5IGhhbmRsZXMgdGhlIGN1c3RvbSBmaWVsZHMsIHN0YW5kYXJkIGZpZWxkcyBhcmUgYWRkZWQgYmVsb3dcbiAgICAgICAgZWRpdFZhbGlkYXRvci5hZGQodmFsaWRhdGlvbk1vZGVsKTtcblxuICAgICAgICBpZiAoJGVtYWlsRWxlbWVudCkge1xuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5yZW1vdmUoZW1haWxTZWxlY3Rvcik7XG4gICAgICAgICAgICBWYWxpZGF0b3JzLnNldEVtYWlsVmFsaWRhdGlvbihlZGl0VmFsaWRhdG9yLCBlbWFpbFNlbGVjdG9yLCB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LnZhbGlkX2VtYWlsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkcGFzc3dvcmRFbGVtZW50ICYmICRwYXNzd29yZDJFbGVtZW50KSB7XG4gICAgICAgICAgICBjb25zdCB7IHBhc3N3b3JkOiBlbnRlclBhc3N3b3JkLCBwYXNzd29yZF9tYXRjaDogbWF0Y2hQYXNzd29yZCB9ID0gdGhpcy52YWxpZGF0aW9uRGljdGlvbmFyeTtcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IucmVtb3ZlKHBhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5yZW1vdmUocGFzc3dvcmQyU2VsZWN0b3IpO1xuICAgICAgICAgICAgVmFsaWRhdG9ycy5zZXRQYXNzd29yZFZhbGlkYXRpb24oXG4gICAgICAgICAgICAgICAgZWRpdFZhbGlkYXRvcixcbiAgICAgICAgICAgICAgICBwYXNzd29yZFNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHBhc3N3b3JkMlNlbGVjdG9yLFxuICAgICAgICAgICAgICAgIHRoaXMucGFzc3dvcmRSZXF1aXJlbWVudHMsXG4gICAgICAgICAgICAgICAgY3JlYXRlUGFzc3dvcmRWYWxpZGF0aW9uRXJyb3JUZXh0T2JqZWN0KGVudGVyUGFzc3dvcmQsIGVudGVyUGFzc3dvcmQsIG1hdGNoUGFzc3dvcmQsIHRoaXMucGFzc3dvcmRSZXF1aXJlbWVudHMuZXJyb3IpLFxuICAgICAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCRjdXJyZW50UGFzc3dvcmQpIHtcbiAgICAgICAgICAgIGVkaXRWYWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogY3VycmVudFBhc3N3b3JkU2VsZWN0b3IsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09ICcnICYmICRwYXNzd29yZEVsZW1lbnQudmFsKCkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5jdXJyZW50UGFzc3dvcmQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGVkaXRWYWxpZGF0b3IuYWRkKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogYCR7Zm9ybUVkaXRTZWxlY3Rvcn0gaW5wdXRbbmFtZT0nYWNjb3VudF9maXJzdG5hbWUnXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZpcnN0TmFtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGAke2Zvcm1FZGl0U2VsZWN0b3J9IGlucHV0W25hbWU9J2FjY291bnRfbGFzdG5hbWUnXWAsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHZhbC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0Lmxhc3ROYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSk7XG5cbiAgICAgICAgJGVkaXRBY2NvdW50Rm9ybS5vbignc3VibWl0JywgZXZlbnQgPT4ge1xuICAgICAgICAgICAgZWRpdFZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKGVkaXRWYWxpZGF0b3IuYXJlQWxsKCd2YWxpZCcpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWFybGllc3RFcnJvciA9ICQoJ3NwYW4uZm9ybS1pbmxpbmVNZXNzYWdlOmZpcnN0JykucHJldignaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBlYXJsaWVzdEVycm9yLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCA5MDApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZWdpc3RlckluYm94VmFsaWRhdGlvbigkaW5ib3hGb3JtKSB7XG4gICAgICAgIGNvbnN0IGluYm94VmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJ2Zvcm1bZGF0YS1pbmJveC1mb3JtXSBpbnB1dFt0eXBlPVwic3VibWl0XCJdJyxcbiAgICAgICAgICAgIGRlbGF5OiA5MDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGluYm94VmFsaWRhdG9yLmFkZChbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICdmb3JtW2RhdGEtaW5ib3gtZm9ybV0gc2VsZWN0W25hbWU9XCJtZXNzYWdlX29yZGVyX2lkXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gTnVtYmVyKHZhbCkgIT09IDA7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmVudGVyT3JkZXJOdW0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIGlucHV0W25hbWU9XCJtZXNzYWdlX3N1YmplY3RcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlclN1YmplY3QsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnZm9ybVtkYXRhLWluYm94LWZvcm1dIHRleHRhcmVhW25hbWU9XCJtZXNzYWdlX2NvbnRlbnRcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5lbnRlck1lc3NhZ2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICAkaW5ib3hGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBpbmJveFZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKGluYm94VmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZWFybGllc3RFcnJvciA9ICQoJ3NwYW4uZm9ybS1pbmxpbmVNZXNzYWdlOmZpcnN0JykucHJldignaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBlYXJsaWVzdEVycm9yLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCA5MDApO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgY3JlZGl0Y2FyZHMgZnJvbSAnY3JlZGl0Y2FyZHMnO1xuXG4vKipcbiAqIE9taXQgbnVsbCBvciBlbXB0eSBzdHJpbmcgcHJvcGVydGllcyBvZiBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmNvbnN0IG9taXROdWxsU3RyaW5nID0gb2JqID0+IHtcbiAgICBjb25zdCByZWZPYmogPSBvYmo7XG5cbiAgICAkLmVhY2gocmVmT2JqLCAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICBkZWxldGUgcmVmT2JqW2tleV07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiByZWZPYmo7XG59O1xuXG4vKipcbiAqIEdldCBjcmVkaXQgY2FyZCB0eXBlIGZyb20gY3JlZGl0IGNhcmQgbnVtYmVyXG4gKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGNyZWRpdENhcmRUeXBlID0gdmFsdWUgPT4gY3JlZGl0Y2FyZHMuY2FyZC50eXBlKGNyZWRpdGNhcmRzLmNhcmQucGFyc2UodmFsdWUpLCB0cnVlKTtcblxuLyoqXG4gKiBXcmFwcGVyIGZvciBhamF4IHJlcXVlc3QgdG8gc3RvcmUgYSBuZXcgaW5zdHJ1bWVudCBpbiBiaWdwYXlcbiAqIEBwYXJhbSB7b2JqZWN0fSBSZXByZXNlbnRpbmcgdGhlIGRhdGEgbmVlZGVkIGZvciB0aGUgaGVhZGVyXG4gKiBAcGFyYW0ge29iamVjdH0gUmVwcmVzZW50aW5nIHRoZSBkYXRhIG5lZWRlZCBmb3IgdGhlIGJvZHlcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRvbmUgRnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBhIHN1Y2Nlc3NmdWwgcmVzcG9uc2VcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZhaWwgRnVuY3Rpb24gdG8gZXhlY3V0ZSBvbiBhIHVuc3VjY2Vzc2Z1bCByZXNwb25zZVxuICovXG5leHBvcnQgY29uc3Qgc3RvcmVJbnN0cnVtZW50ID0gKHtcbiAgICAvLyBIb3N0bmFtZSwgSWRzICYgVG9rZW5cbiAgICBwYXltZW50c1VybCxcbiAgICBzaG9wcGVySWQsXG4gICAgc3RvcmVIYXNoLFxuICAgIHZhdWx0VG9rZW4sXG59LCB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgKi9cbiAgICAvLyBQcm92aWRlciBJbmZvXG4gICAgcHJvdmlkZXJfaWQsXG4gICAgY3VycmVuY3lfY29kZSxcblxuICAgIC8vIEluc3RydW1lbnQgRGV0YWlsc1xuICAgIGNyZWRpdF9jYXJkX251bWJlcixcbiAgICBleHBpcmF0aW9uLFxuICAgIG5hbWVfb25fY2FyZCxcbiAgICBjdnYsXG4gICAgZGVmYXVsdF9pbnN0cnVtZW50LFxuXG4gICAgLy8gQmlsbGluZyBBZGRyZXNzXG4gICAgYWRkcmVzczEsXG4gICAgYWRkcmVzczIsXG4gICAgY2l0eSxcbiAgICBwb3N0YWxfY29kZSxcbiAgICBzdGF0ZV9vcl9wcm92aW5jZV9jb2RlLFxuICAgIGNvdW50cnlfY29kZSxcbiAgICBjb21wYW55LFxuICAgIGZpcnN0X25hbWUsXG4gICAgbGFzdF9uYW1lLFxuICAgIGVtYWlsLFxuICAgIHBob25lLFxuICAgIC8qIGVzbGludC1lbmFibGUgKi9cbn0sIGRvbmUsIGZhaWwpID0+IHtcbiAgICBjb25zdCBleHBpcnkgPSBleHBpcmF0aW9uLnNwbGl0KCcvJyk7XG5cbiAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGAke3BheW1lbnRzVXJsfS9zdG9yZXMvJHtzdG9yZUhhc2h9L2N1c3RvbWVycy8ke3Nob3BwZXJJZH0vc3RvcmVkX2luc3RydW1lbnRzYCxcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogdmF1bHRUb2tlbixcbiAgICAgICAgICAgIEFjY2VwdDogJ2FwcGxpY2F0aW9uL3ZuZC5iYy52MStqc29uJyxcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vdm5kLmJjLnYxK2pzb24nLFxuICAgICAgICB9LFxuICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICBpbnN0cnVtZW50OiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2NhcmQnLFxuICAgICAgICAgICAgICAgIGNhcmRob2xkZXJfbmFtZTogbmFtZV9vbl9jYXJkLFxuICAgICAgICAgICAgICAgIG51bWJlcjogY3JlZGl0Y2FyZHMuY2FyZC5wYXJzZShjcmVkaXRfY2FyZF9udW1iZXIpLFxuICAgICAgICAgICAgICAgIGV4cGlyeV9tb250aDogY3JlZGl0Y2FyZHMuZXhwaXJhdGlvbi5tb250aC5wYXJzZShleHBpcnlbMF0pLFxuICAgICAgICAgICAgICAgIGV4cGlyeV95ZWFyOiBjcmVkaXRjYXJkcy5leHBpcmF0aW9uLnllYXIucGFyc2UoZXhwaXJ5WzFdLCB0cnVlKSxcbiAgICAgICAgICAgICAgICB2ZXJpZmljYXRpb25fdmFsdWU6IGN2dixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiaWxsaW5nX2FkZHJlc3M6IG9taXROdWxsU3RyaW5nKHtcbiAgICAgICAgICAgICAgICBhZGRyZXNzMSxcbiAgICAgICAgICAgICAgICBhZGRyZXNzMixcbiAgICAgICAgICAgICAgICBjaXR5LFxuICAgICAgICAgICAgICAgIHBvc3RhbF9jb2RlLFxuICAgICAgICAgICAgICAgIHN0YXRlX29yX3Byb3ZpbmNlX2NvZGUsXG4gICAgICAgICAgICAgICAgY291bnRyeV9jb2RlLFxuICAgICAgICAgICAgICAgIGNvbXBhbnksXG4gICAgICAgICAgICAgICAgZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgZW1haWwsXG4gICAgICAgICAgICAgICAgcGhvbmUsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHByb3ZpZGVyX2lkLFxuICAgICAgICAgICAgZGVmYXVsdF9pbnN0cnVtZW50LFxuICAgICAgICAgICAgY3VycmVuY3lfY29kZSxcbiAgICAgICAgfSksXG4gICAgfSlcbiAgICAgICAgLmRvbmUoZG9uZSlcbiAgICAgICAgLmZhaWwoZmFpbCk7XG59O1xuXG5leHBvcnQgY29uc3QgRm9ybWF0dGVycyA9IHtcbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgZm9ybWF0IGZvciBjcmVkaXQgY2FyZCBudW1iZXJcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKi9cbiAgICBzZXRDcmVkaXRDYXJkTnVtYmVyRm9ybWF0OiBmaWVsZCA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgJChmaWVsZCkub24oJ2tleXVwJywgKHsgdGFyZ2V0IH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgcmVmVGFyZ2V0LnZhbHVlID0gY3JlZGl0Y2FyZHMuY2FyZC5mb3JtYXQoY3JlZGl0Y2FyZHMuY2FyZC5wYXJzZSh0YXJnZXQudmFsdWUpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBmb3JtYXQgZm9yIGV4cGlyYXRpb24gZGF0ZVxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqL1xuICAgIHNldEV4cGlyYXRpb25Gb3JtYXQ6IGZpZWxkID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICAkKGZpZWxkKS5vbigna2V5dXAnLCAoeyB0YXJnZXQsIHdoaWNoIH0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWZUYXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgICAgICAgICAgaWYgKHdoaWNoID09PSA4ICYmIC8uKihcXC8pJC8udGVzdCh0YXJnZXQudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZlRhcmdldC52YWx1ZSA9IHRhcmdldC52YWx1ZS5zbGljZSgwLCAtMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQudmFsdWUubGVuZ3RoID4gNCkge1xuICAgICAgICAgICAgICAgICAgICByZWZUYXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWUuc2xpY2UoMCwgNSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh3aGljaCAhPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICByZWZUYXJnZXQudmFsdWUgPSB0YXJnZXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eKFsxLTldXFwvfFsyLTldKSQvZywgJzAkMS8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oMFsxLTldfDFbMC0yXSkkL2csICckMS8nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14oWzAtMV0pKFszLTldKSQvZywgJzAkMS8kMicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXigwWzEtOV18MVswLTJdKShbMC05XXsyfSkkL2csICckMS8kMicpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXihbMF0rKVxcL3xbMF0rJC9nLCAnMCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvW15cXGRcXC9dfF5bXFwvXSokL2csICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcL1xcLy9nLCAnLycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBWYWxpZGF0b3JzID0ge1xuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSB2YWxpZGF0aW9uIGZvciBjcmVkaXQgY2FyZCBudW1iZXJcbiAgICAgKiBAcGFyYW0gdmFsaWRhdG9yXG4gICAgICogQHBhcmFtIGZpZWxkXG4gICAgICogQHBhcmFtIGVycm9yTWVzc2FnZVxuICAgICAqL1xuICAgIHNldENyZWRpdENhcmROdW1iZXJWYWxpZGF0aW9uOiAodmFsaWRhdG9yLCBmaWVsZCwgZXJyb3JNZXNzYWdlKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIGNyZWRpdGNhcmRzLmNhcmQuaXNWYWxpZChjcmVkaXRjYXJkcy5jYXJkLnBhcnNlKHZhbCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgdmFsaWRhdGlvbiBmb3IgZXhwaXJhdGlvbiBkYXRlXG4gICAgICogQHBhcmFtIHZhbGlkYXRvclxuICAgICAqIEBwYXJhbSBmaWVsZFxuICAgICAqIEBwYXJhbSBlcnJvck1lc3NhZ2VcbiAgICAgKi9cbiAgICBzZXRFeHBpcmF0aW9uVmFsaWRhdGlvbjogKHZhbGlkYXRvciwgZmllbGQsIGVycm9yTWVzc2FnZSkgPT4ge1xuICAgICAgICBpZiAoZmllbGQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRvci5hZGQoe1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiBmaWVsZCxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXhwaXJ5ID0gdmFsLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIC9eKDBbMS05XXwxWzAtMl0pXFwvKFswLTldezJ9KSQvLnRlc3QodmFsKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0ICYmICFjcmVkaXRjYXJkcy5leHBpcmF0aW9uLmlzUGFzdChjcmVkaXRjYXJkcy5leHBpcmF0aW9uLm1vbnRoLnBhcnNlKGV4cGlyeVswXSksIGNyZWRpdGNhcmRzLmV4cGlyYXRpb24ueWVhci5wYXJzZShleHBpcnlbMV0sIHRydWUpKTtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIG5hbWUgb24gY2FyZFxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXG4gICAgICovXG4gICAgc2V0TmFtZU9uQ2FyZFZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvck1lc3NhZ2UpID0+IHtcbiAgICAgICAgaWYgKGZpZWxkKSB7XG4gICAgICAgICAgICB2YWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogZmllbGQsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9ICEhdmFsLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICAgICBjYihyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0cyB1cCBhIHZhbGlkYXRpb24gZm9yIGN2dlxuICAgICAqIEBwYXJhbSB2YWxpZGF0b3JcbiAgICAgKiBAcGFyYW0gZmllbGRcbiAgICAgKiBAcGFyYW0gZXJyb3JNZXNzYWdlXG4gICAgICogQHBhcmFtIHthbnl9IGNhcmRUeXBlIFRoZSBjcmVkaXQgY2FyZCBudW1iZXIgdHlwZVxuICAgICAqL1xuICAgIHNldEN2dlZhbGlkYXRpb246ICh2YWxpZGF0b3IsIGZpZWxkLCBlcnJvck1lc3NhZ2UsIGNhcmRUeXBlKSA9PiB7XG4gICAgICAgIGlmIChmaWVsZCkge1xuICAgICAgICAgICAgdmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6IGZpZWxkLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gdHlwZW9mIGNhcmRUeXBlID09PSAnZnVuY3Rpb24nID8gY2FyZFR5cGUoKSA6IGNhcmRUeXBlO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSB2YWwubGVuZ3RoICYmIGNyZWRpdGNhcmRzLmN2Yy5pc1ZhbGlkKHZhbCwgdHlwZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSxcbn07XG4iLCJpbXBvcnQgeyBzaG93QWxlcnRNb2RhbCB9IGZyb20gJy4vbW9kYWwnO1xuXG5mdW5jdGlvbiBkZWNyZW1lbnRDb3VudGVyKGNvdW50ZXIsIGl0ZW0pIHtcbiAgICBjb25zdCBpbmRleCA9IGNvdW50ZXIuaW5kZXhPZihpdGVtKTtcblxuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGNvdW50ZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluY3JlbWVudENvdW50ZXIoY291bnRlciwgaXRlbSkge1xuICAgIGNvdW50ZXIucHVzaChpdGVtKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ291bnRlck5hdihjb3VudGVyLCAkbGluaywgdXJscykge1xuICAgIGlmIChjb3VudGVyLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBpZiAoISRsaW5rLmlzKCd2aXNpYmxlJykpIHtcbiAgICAgICAgICAgICRsaW5rLmFkZENsYXNzKCdzaG93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJGxpbmsuYXR0cignaHJlZicsIGAke3VybHMuY29tcGFyZX0vJHtjb3VudGVyLmpvaW4oJy8nKX1gKTtcbiAgICAgICAgJGxpbmsuZmluZCgnc3Bhbi5jb3VudFBpbGwnKS5odG1sKGNvdW50ZXIubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAkbGluay5yZW1vdmVDbGFzcygnc2hvdycpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKHsgbm9Db21wYXJlTWVzc2FnZSwgdXJscyB9KSB7XG4gICAgbGV0IGNvbXBhcmVDb3VudGVyID0gW107XG5cbiAgICBjb25zdCAkY29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAkKCdib2R5Jykub24oJ2NvbXBhcmVSZXNldCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgJGNoZWNrZWQgPSAkKCdib2R5JykuZmluZCgnaW5wdXRbbmFtZT1cInByb2R1Y3RzXFxbXFxdXCJdOmNoZWNrZWQnKTtcblxuICAgICAgICBjb21wYXJlQ291bnRlciA9ICRjaGVja2VkLmxlbmd0aCA/ICRjaGVja2VkLm1hcCgoaW5kZXgsIGVsZW1lbnQpID0+IGVsZW1lbnQudmFsdWUpLmdldCgpIDogW107XG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjb21wYXJlTGluaywgdXJscyk7XG4gICAgfSk7XG5cbiAgICAkKCdib2R5JykudHJpZ2dlckhhbmRsZXIoJ2NvbXBhcmVSZXNldCcpO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdbZGF0YS1jb21wYXJlLWlkXScsIGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgcHJvZHVjdCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWU7XG4gICAgICAgIGNvbnN0ICRjbGlja2VkQ29tcGFyZUxpbmsgPSAkKCdhW2RhdGEtY29tcGFyZS1uYXZdJyk7XG5cbiAgICAgICAgaWYgKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICAgICAgaW5jcmVtZW50Q291bnRlcihjb21wYXJlQ291bnRlciwgcHJvZHVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWNyZW1lbnRDb3VudGVyKGNvbXBhcmVDb3VudGVyLCBwcm9kdWN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZUNvdW50ZXJOYXYoY29tcGFyZUNvdW50ZXIsICRjbGlja2VkQ29tcGFyZUxpbmssIHVybHMpO1xuICAgIH0pO1xuXG4gICAgJCgnYm9keScpLm9uKCdjbGljaycsICdhW2RhdGEtY29tcGFyZS1uYXZdJywgKCkgPT4ge1xuICAgICAgICBjb25zdCAkY2xpY2tlZENoZWNrZWRJbnB1dCA9ICQoJ2JvZHknKS5maW5kKCdpbnB1dFtuYW1lPVwicHJvZHVjdHNcXFtcXF1cIl06Y2hlY2tlZCcpO1xuXG4gICAgICAgIGlmICgkY2xpY2tlZENoZWNrZWRJbnB1dC5sZW5ndGggPD0gMSkge1xuICAgICAgICAgICAgc2hvd0FsZXJ0TW9kYWwobm9Db21wYXJlTWVzc2FnZSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJQYWdlTWFuYWdlciIsIm5vZCIsIldpc2hsaXN0IiwidmFsaWRhdGlvbiIsInN0YXRlQ291bnRyeSIsImNsYXNzaWZ5Rm9ybSIsIlZhbGlkYXRvcnMiLCJhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIiwiaW5zZXJ0U3RhdGVIaWRkZW5GaWVsZCIsImNyZWF0ZVBhc3N3b3JkVmFsaWRhdGlvbkVycm9yVGV4dE9iamVjdCIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImNyZWRpdENhcmRUeXBlIiwic3RvcmVJbnN0cnVtZW50IiwiQ0NWYWxpZGF0b3JzIiwiRm9ybWF0dGVycyIsIkNDRm9ybWF0dGVycyIsInNob3dBbGVydE1vZGFsIiwiY29tcGFyZVByb2R1Y3RzIiwiQWNjb3VudCIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsIiRzdGF0ZSIsIiQiLCIkYm9keSIsIm9uUmVhZHkiLCIkZWRpdEFjY291bnRGb3JtIiwiJGFkZHJlc3NGb3JtIiwiJGluYm94Rm9ybSIsIiRhY2NvdW50UmV0dXJuRm9ybSIsIiRwYXltZW50TWV0aG9kRm9ybSIsIiRyZW9yZGVyRm9ybSIsIiRpbnZvaWNlQnV0dG9uIiwiJGJpZ0NvbW1lcmNlIiwid2luZG93IiwiQmlnQ29tbWVyY2UiLCJwYXNzd29yZFJlcXVpcmVtZW50cyIsImxvYWQiLCJsZW5ndGgiLCJyZWdpc3RlckVkaXRBY2NvdW50VmFsaWRhdGlvbiIsImlzIiwib24iLCJsZWZ0Iiwic2NyZWVuIiwiYXZhaWxXaWR0aCIsInRvcCIsImF2YWlsSGVpZ2h0IiwidXJsIiwiZGF0YSIsIm9wZW4iLCJpbml0QWRkcmVzc0Zvcm1WYWxpZGF0aW9uIiwicmVnaXN0ZXJJbmJveFZhbGlkYXRpb24iLCJpbml0QWNjb3VudFJldHVybkZvcm1WYWxpZGF0aW9uIiwiaW5pdFBheW1lbnRNZXRob2RGb3JtVmFsaWRhdGlvbiIsImluaXRSZW9yZGVyRm9ybSIsInJlbmRlckFjY291bnRQYXltZW50cyIsImNvdW50cmllcyIsInBheW1lbnRzVXJsIiwic3RvcmVIYXNoIiwic3RvcmVMb2NhbGUiLCJ2YXVsdFRva2VuIiwic2hvcHBlcklkIiwiY3VzdG9tZXJFbWFpbCIsInByb3ZpZGVySWQiLCJjdXJyZW5jeUNvZGUiLCJwYXltZW50TWV0aG9kc1VybCIsInBheW1lbnRQcm92aWRlckluaXRpYWxpemF0aW9uRGF0YSIsInRoZW1lU2V0dGluZ3MiLCJzdHlsZXMiLCJpbnB1dEJhc2UiLCJjb2xvciIsImJvcmRlckNvbG9yIiwiaW5wdXRWYWxpZGF0aW9uRXJyb3IiLCJpbnB1dFZhbGlkYXRpb25TdWNjZXNzIiwic3VibWl0QnV0dG9uIiwiYmFja2dyb3VuZENvbG9yIiwiY3Vyc29yIiwiY2FuY2VsQnV0dG9uIiwibGFiZWwiLCJ2YWxpZGF0aW9uRXJyb3IiLCJoZWFkaW5nIiwic3RvcmVDb250ZXh0RGF0YSIsImVycm9ySGFuZGxlciIsImJpbmREZWxldGVBZGRyZXNzIiwiYmluZERlbGV0ZVBheW1lbnRNZXRob2QiLCJldmVudCIsIm1lc3NhZ2UiLCJjdXJyZW50VGFyZ2V0IiwiY29uZmlybSIsInByZXZlbnREZWZhdWx0IiwiJHByb2R1Y3RSZW9yZGVyQ2hlY2tib3hlcyIsInN1Ym1pdEZvcm0iLCJmaW5kIiwicmVtb3ZlIiwiZWFjaCIsImluZGV4IiwicHJvZHVjdENoZWNrYm94IiwicHJvZHVjdElkIiwidmFsIiwiJGlucHV0IiwidHlwZSIsIm5hbWUiLCJ2YWx1ZSIsImFwcGVuZCIsInNlbGVjdEl0ZW0iLCJ2YWxpZGF0aW9uTW9kZWwiLCJzdGF0ZVNlbGVjdG9yIiwiJHN0YXRlRWxlbWVudCIsImFkZHJlc3NWYWxpZGF0b3IiLCJzdWJtaXQiLCJ0YXAiLCJhZGQiLCIkbGFzdCIsImVyciIsImZpZWxkIiwiRXJyb3IiLCIkZmllbGQiLCJnZXRTdGF0dXMiLCJzZXRTdGF0ZUNvdW50cnlWYWxpZGF0aW9uIiwiZmllbGRfbm90X2JsYW5rIiwiY2xlYW5VcFN0YXRlVmFsaWRhdGlvbiIsInBlcmZvcm1DaGVjayIsImFyZUFsbCIsImVycm9yTWVzc2FnZSIsImZvcm1TdWJtaXQiLCJpIiwiZWxlIiwicGFyc2VJbnQiLCJhdHRyIiwiZmlyc3ROYW1lTGFiZWwiLCJsYXN0TmFtZUxhYmVsIiwiY29tcGFueUxhYmVsIiwicGhvbmVMYWJlbCIsImFkZHJlc3MxTGFiZWwiLCJhZGRyZXNzMkxhYmVsIiwiY2l0eUxhYmVsIiwiY291bnRyeUxhYmVsIiwiY2hvb3NlQ291bnRyeUxhYmVsIiwic3RhdGVMYWJlbCIsInBvc3RhbENvZGVMYWJlbCIsInBheW1lbnRNZXRob2RTZWxlY3RvciIsInBheW1lbnRNZXRob2RWYWxpZGF0b3IiLCJjYXJkVHlwZSIsInRhcmdldCIsInNpYmxpbmdzIiwiY3NzIiwic2V0Q3JlZGl0Q2FyZE51bWJlclZhbGlkYXRpb24iLCJjcmVkaXRDYXJkTnVtYmVyIiwic2V0RXhwaXJhdGlvblZhbGlkYXRpb24iLCJleHBpcmF0aW9uIiwic2V0TmFtZU9uQ2FyZFZhbGlkYXRpb24iLCJuYW1lT25DYXJkIiwic2V0Q3Z2VmFsaWRhdGlvbiIsImN2diIsInNldENyZWRpdENhcmROdW1iZXJGb3JtYXQiLCJzZXRFeHBpcmF0aW9uRm9ybWF0Iiwic2VyaWFsaXplQXJyYXkiLCJvYmoiLCJpdGVtIiwicmVmT2JqIiwiY291bnRyeSIsInN0YXRlIiwic3RhdGVzIiwiY291bnRyeV9jb2RlIiwiY29kZSIsInN0YXRlX29yX3Byb3ZpbmNlX2NvZGUiLCJkZWZhdWx0X2luc3RydW1lbnQiLCJsb2NhdGlvbiIsImhyZWYiLCJnZW5lcmljX2Vycm9yIiwiZm9ybUVkaXRTZWxlY3RvciIsImVkaXRWYWxpZGF0b3IiLCJkZWxheSIsImVtYWlsU2VsZWN0b3IiLCIkZW1haWxFbGVtZW50IiwicGFzc3dvcmRTZWxlY3RvciIsIiRwYXNzd29yZEVsZW1lbnQiLCJwYXNzd29yZDJTZWxlY3RvciIsIiRwYXNzd29yZDJFbGVtZW50IiwiY3VycmVudFBhc3N3b3JkU2VsZWN0b3IiLCIkY3VycmVudFBhc3N3b3JkIiwic2V0RW1haWxWYWxpZGF0aW9uIiwidmFsaWRfZW1haWwiLCJlbnRlclBhc3N3b3JkIiwicGFzc3dvcmQiLCJtYXRjaFBhc3N3b3JkIiwicGFzc3dvcmRfbWF0Y2giLCJzZXRQYXNzd29yZFZhbGlkYXRpb24iLCJlcnJvciIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsInJlc3VsdCIsImN1cnJlbnRQYXNzd29yZCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwic2V0VGltZW91dCIsImVhcmxpZXN0RXJyb3IiLCJwcmV2IiwiZm9jdXMiLCJpbmJveFZhbGlkYXRvciIsIk51bWJlciIsImVudGVyT3JkZXJOdW0iLCJlbnRlclN1YmplY3QiLCJlbnRlck1lc3NhZ2UiLCJjcmVkaXRjYXJkcyIsIm9taXROdWxsU3RyaW5nIiwia2V5IiwiY2FyZCIsInBhcnNlIiwiZG9uZSIsImZhaWwiLCJwcm92aWRlcl9pZCIsImN1cnJlbmN5X2NvZGUiLCJjcmVkaXRfY2FyZF9udW1iZXIiLCJuYW1lX29uX2NhcmQiLCJhZGRyZXNzMSIsImFkZHJlc3MyIiwiY2l0eSIsInBvc3RhbF9jb2RlIiwiY29tcGFueSIsImZpcnN0X25hbWUiLCJsYXN0X25hbWUiLCJlbWFpbCIsInBob25lIiwiZXhwaXJ5Iiwic3BsaXQiLCJhamF4IiwiZGF0YVR5cGUiLCJtZXRob2QiLCJjYWNoZSIsImhlYWRlcnMiLCJBdXRob3JpemF0aW9uIiwiQWNjZXB0IiwiSlNPTiIsInN0cmluZ2lmeSIsImluc3RydW1lbnQiLCJjYXJkaG9sZGVyX25hbWUiLCJudW1iZXIiLCJleHBpcnlfbW9udGgiLCJtb250aCIsImV4cGlyeV95ZWFyIiwieWVhciIsInZlcmlmaWNhdGlvbl92YWx1ZSIsImJpbGxpbmdfYWRkcmVzcyIsInJlZlRhcmdldCIsImZvcm1hdCIsIndoaWNoIiwidGVzdCIsInNsaWNlIiwicmVwbGFjZSIsInZhbGlkYXRvciIsImlzVmFsaWQiLCJpc1Bhc3QiLCJjdmMiLCJkZWNyZW1lbnRDb3VudGVyIiwiY291bnRlciIsImluZGV4T2YiLCJzcGxpY2UiLCJpbmNyZW1lbnRDb3VudGVyIiwicHVzaCIsInVwZGF0ZUNvdW50ZXJOYXYiLCIkbGluayIsInVybHMiLCJhZGRDbGFzcyIsImNvbXBhcmUiLCJqb2luIiwiaHRtbCIsInJlbW92ZUNsYXNzIiwibm9Db21wYXJlTWVzc2FnZSIsImNvbXBhcmVDb3VudGVyIiwiJGNvbXBhcmVMaW5rIiwiJGNoZWNrZWQiLCJtYXAiLCJlbGVtZW50IiwiZ2V0IiwidHJpZ2dlckhhbmRsZXIiLCJwcm9kdWN0IiwiJGNsaWNrZWRDb21wYXJlTGluayIsImNoZWNrZWQiLCIkY2xpY2tlZENoZWNrZWRJbnB1dCJdLCJzb3VyY2VSb290IjoiIn0=