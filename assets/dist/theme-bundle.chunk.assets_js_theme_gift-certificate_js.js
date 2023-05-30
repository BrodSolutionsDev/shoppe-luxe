"use strict";
(self["webpackChunkbigcommerce_cornerstone"] = self["webpackChunkbigcommerce_cornerstone"] || []).push([["assets_js_theme_gift-certificate_js"],{

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

/***/ }),

/***/ "./assets/js/theme/gift-certificate.js":
/*!*********************************************!*\
  !*** ./assets/js/theme/gift-certificate.js ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ GiftCertificate; }
/* harmony export */ });
/* harmony import */ var _page_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page-manager */ "./assets/js/theme/page-manager.js");
/* harmony import */ var _common_nod__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common/nod */ "./assets/js/theme/common/nod.js");
/* harmony import */ var _common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./common/gift-certificate-validator */ "./assets/js/theme/common/gift-certificate-validator.js");
/* harmony import */ var _common_models_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/models/forms */ "./assets/js/theme/common/models/forms.js");
/* harmony import */ var _common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common/utils/translations-utils */ "./assets/js/theme/common/utils/translations-utils.js");
/* harmony import */ var _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./common/utils/form-utils */ "./assets/js/theme/common/utils/form-utils.js");
/* harmony import */ var _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @bigcommerce/stencil-utils */ "./node_modules/@bigcommerce/stencil-utils/src/main.js");
/* harmony import */ var _global_modal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./global/modal */ "./assets/js/theme/global/modal.js");
/* provided dependency */ var $ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.min.js");
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }










var GiftCertificate = /*#__PURE__*/function (_PageManager) {
  _inheritsLoose(GiftCertificate, _PageManager);

  function GiftCertificate(context) {
    var _this;

    _this = _PageManager.call(this, context) || this;
    _this.validationDictionary = (0,_common_utils_translations_utils__WEBPACK_IMPORTED_MODULE_4__.createTranslationDictionary)(context);
    var $certBalanceForm = $('#gift-certificate-balance');
    var purchaseModel = {
      recipientName: function recipientName(val) {
        return val.length;
      },
      recipientEmail: function recipientEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      senderName: function senderName(val) {
        return val.length;
      },
      senderEmail: function senderEmail() {
        return _common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"].email.apply(_common_models_forms__WEBPACK_IMPORTED_MODULE_3__["default"], arguments);
      },
      customAmount: function customAmount(value, min, max) {
        return value && value >= min && value <= max;
      },
      setAmount: function setAmount(value, options) {
        var found = false;
        options.forEach(function (option) {
          if (option === value) {
            found = true;
            return false;
          }
        });
        return found;
      }
    };
    var $purchaseForm = $('#gift-certificate-form');
    var $customAmounts = $purchaseForm.find('input[name="certificate_amount"]');
    var purchaseValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: '#gift-certificate-form input[type="submit"]',
      delay: 300,
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });

    if ($customAmounts.length) {
      var $element = $purchaseForm.find('input[name="certificate_amount"]');
      var min = $element.data('min');
      var minFormatted = $element.data('minFormatted');
      var max = $element.data('max');
      var maxFormatted = $element.data('maxFormatted');

      var insertFormattedAmountsIntoErrorMessage = function insertFormattedAmountsIntoErrorMessage(message) {
        for (var _len = arguments.length, amountRange = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          amountRange[_key - 1] = arguments[_key];
        }

        var amountPlaceholders = ['[MIN]', '[MAX]'];
        var updatedErrorText = message;
        amountPlaceholders.forEach(function (placeholder, i) {
          updatedErrorText = updatedErrorText.includes(placeholder) ? updatedErrorText.replace(placeholder, amountRange[i]) : updatedErrorText;
        });
        return updatedErrorText;
      };

      purchaseValidator.add({
        selector: '#gift-certificate-form input[name="certificate_amount"]',
        validate: function validate(cb, val) {
          var numberVal = Number(val);

          if (!numberVal) {
            cb(false);
          }

          cb(numberVal >= min && numberVal <= max);
        },
        errorMessage: insertFormattedAmountsIntoErrorMessage(_this.validationDictionary.certificate_amount_range, minFormatted, maxFormatted)
      });
    }

    purchaseValidator.add([{
      selector: '#gift-certificate-form input[name="to_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientName(val);
        cb(result);
      },
      errorMessage: _this.context.toName
    }, {
      selector: '#gift-certificate-form input[name="to_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.recipientEmail(val);
        cb(result);
      },
      errorMessage: _this.context.toEmail
    }, {
      selector: '#gift-certificate-form input[name="from_name"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderName(val);
        cb(result);
      },
      errorMessage: _this.context.fromName
    }, {
      selector: '#gift-certificate-form input[name="from_email"]',
      validate: function validate(cb, val) {
        var result = purchaseModel.senderEmail(val);
        cb(result);
      },
      errorMessage: _this.context.fromEmail
    }, {
      selector: '#gift-certificate-form input[name="certificate_theme"]:first-of-type',
      triggeredBy: '#gift-certificate-form input[name="certificate_theme"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="certificate_theme"]:checked').val();
        cb(typeof val === 'string');
      },
      errorMessage: _this.context.certTheme
    }, {
      selector: '#gift-certificate-form input[name="agree"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }, {
      selector: '#gift-certificate-form input[name="agree2"]',
      validate: function validate(cb) {
        var val = $purchaseForm.find('input[name="agree2"]').get(0).checked;
        cb(val);
      },
      errorMessage: _this.context.agreeToTerms
    }]);

    if ($certBalanceForm.length) {
      var balanceVal = _this.checkCertBalanceValidator($certBalanceForm);

      $certBalanceForm.on('submit', function () {
        balanceVal.performCheck();

        if (!balanceVal.areAll('valid')) {
          return false;
        }
      });
    }

    $purchaseForm.on('submit', function (event) {
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return event.preventDefault();
      }
    });
    $('#gift-certificate-preview').click(function (event) {
      event.preventDefault();
      purchaseValidator.performCheck();

      if (!purchaseValidator.areAll('valid')) {
        return;
      }

      var modal = (0,_global_modal__WEBPACK_IMPORTED_MODULE_7__.defaultModal)();
      var previewUrl = $(event.currentTarget).data('previewUrl') + "&" + $purchaseForm.serialize();
      modal.open();
      _bigcommerce_stencil_utils__WEBPACK_IMPORTED_MODULE_6__.api.getPage(previewUrl, {}, function (err, content) {
        if (err) {
          return modal.updateContent(_this.context.previewError);
        }

        modal.updateContent(content, {
          wrap: true
        });
      });
    });
    return _this;
  }

  var _proto = GiftCertificate.prototype;

  _proto.checkCertBalanceValidator = function checkCertBalanceValidator($balanceForm) {
    var balanceValidator = (0,_common_nod__WEBPACK_IMPORTED_MODULE_1__["default"])({
      submit: $balanceForm.find('input[type="submit"]'),
      tap: _common_utils_form_utils__WEBPACK_IMPORTED_MODULE_5__.announceInputErrorMessage
    });
    balanceValidator.add({
      selector: $balanceForm.find('input[name="giftcertificatecode"]'),
      validate: function validate(cb, val) {
        cb((0,_common_gift_certificate_validator__WEBPACK_IMPORTED_MODULE_2__["default"])(val));
      },
      errorMessage: this.validationDictionary.invalid_gift_certificate
    });
    return balanceValidator;
  };

  return GiftCertificate;
}(_page_manager__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUtYnVuZGxlLmNodW5rLmFzc2V0c19qc190aGVtZV9naWZ0LWNlcnRpZmljYXRlX2pzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSw2QkFBZSxvQ0FBVUEsSUFBVixFQUFnQjtBQUMzQixNQUFJLE9BQU9BLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLElBQUksQ0FBQ0MsTUFBTCxLQUFnQixDQUFoRCxFQUFtRDtBQUMvQyxXQUFPLEtBQVA7QUFDSCxHQUgwQixDQUszQjs7O0FBQ0EsU0FBTyxJQUFQO0FBQ0g7Ozs7Ozs7Ozs7Ozs7O0FDUEQsSUFBTUMsWUFBWSxHQUFHLGNBQXJCOztBQUNBLElBQU1DLCtCQUErQixHQUFHLFNBQWxDQSwrQkFBa0MsQ0FBQ0MsVUFBRDtBQUFBLFNBQWdCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxJQUFQLENBQVlGLFVBQVUsQ0FBQ0YsWUFBRCxDQUF0QixFQUFzQ0QsTUFBeEQ7QUFBQSxDQUF4Qzs7QUFDQSxJQUFNTSxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXlCLEdBQTJCO0FBQ3RELE9BQUssSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRyxVQUFtQlAsTUFBdkMsRUFBK0NPLENBQUMsRUFBaEQsRUFBb0Q7QUFDaEQsUUFBTUosVUFBVSxHQUFHSyxJQUFJLENBQUNDLEtBQUwsQ0FBOEJGLENBQTlCLDRCQUE4QkEsQ0FBOUIseUJBQThCQSxDQUE5QixFQUFuQjs7QUFDQSxRQUFJTCwrQkFBK0IsQ0FBQ0MsVUFBRCxDQUFuQyxFQUFpRDtBQUM3QyxhQUFPQSxVQUFQO0FBQ0g7QUFDSjtBQUNKLENBUEQ7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNPLElBQU1PLDJCQUEyQixHQUFHLFNBQTlCQSwyQkFBOEIsQ0FBQ0MsT0FBRCxFQUFhO0FBQUEsTUFDNUNDLHdCQUQ0QyxHQUNvREQsT0FEcEQsQ0FDNUNDLHdCQUQ0QztBQUFBLE1BQ2xCQyxnQ0FEa0IsR0FDb0RGLE9BRHBE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S2pCdUMsTUFBQUEsWUFBWSxFQUFFLEtBQUs1QyxvQkFBTCxDQUEwQjZFO0FBTHZCLEtBQXJCO0FBUUEsV0FBT0QsZ0JBQVA7QUFDSDs7O0VBM013Q3BGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yLmpzIiwid2VicGFjazovL2JpZ2NvbW1lcmNlLWNvcm5lcnN0b25lLy4vYXNzZXRzL2pzL3RoZW1lL2NvbW1vbi91dGlscy90cmFuc2xhdGlvbnMtdXRpbHMuanMiLCJ3ZWJwYWNrOi8vYmlnY29tbWVyY2UtY29ybmVyc3RvbmUvLi9hc3NldHMvanMvdGhlbWUvZ2lmdC1jZXJ0aWZpY2F0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoY2VydCkge1xuICAgIGlmICh0eXBlb2YgY2VydCAhPT0gJ3N0cmluZycgfHwgY2VydC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEFkZCBhbnkgY3VzdG9tIGdpZnQgY2VydGlmaWNhdGUgdmFsaWRhdGlvbiBsb2dpYyBoZXJlXG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCJjb25zdCBUUkFOU0xBVElPTlMgPSAndHJhbnNsYXRpb25zJztcbmNvbnN0IGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkgPSAoZGljdGlvbmFyeSkgPT4gISFPYmplY3Qua2V5cyhkaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pLmxlbmd0aDtcbmNvbnN0IGNob29zZUFjdGl2ZURpY3Rpb25hcnkgPSAoLi4uZGljdGlvbmFyeUpzb25MaXN0KSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaWN0aW9uYXJ5SnNvbkxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGljdGlvbmFyeSA9IEpTT04ucGFyc2UoZGljdGlvbmFyeUpzb25MaXN0W2ldKTtcbiAgICAgICAgaWYgKGlzVHJhbnNsYXRpb25EaWN0aW9uYXJ5Tm90RW1wdHkoZGljdGlvbmFyeSkpIHtcbiAgICAgICAgICAgIHJldHVybiBkaWN0aW9uYXJ5O1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBkZWZpbmVzIFRyYW5zbGF0aW9uIERpY3Rpb25hcnkgdG8gdXNlXG4gKiBAcGFyYW0gY29udGV4dCBwcm92aWRlcyBhY2Nlc3MgdG8gMyB2YWxpZGF0aW9uIEpTT05zIGZyb20gZW4uanNvbjpcbiAqIHZhbGlkYXRpb25fbWVzc2FnZXMsIHZhbGlkYXRpb25fZmFsbGJhY2tfbWVzc2FnZXMgYW5kIGRlZmF1bHRfbWVzc2FnZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVUcmFuc2xhdGlvbkRpY3Rpb25hcnkgPSAoY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdmFsaWRhdGlvbkRpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiwgdmFsaWRhdGlvbkRlZmF1bHREaWN0aW9uYXJ5SlNPTiB9ID0gY29udGV4dDtcbiAgICBjb25zdCBhY3RpdmVEaWN0aW9uYXJ5ID0gY2hvb3NlQWN0aXZlRGljdGlvbmFyeSh2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04sIHZhbGlkYXRpb25GYWxsYmFja0RpY3Rpb25hcnlKU09OLCB2YWxpZGF0aW9uRGVmYXVsdERpY3Rpb25hcnlKU09OKTtcbiAgICBjb25zdCBsb2NhbGl6YXRpb25zID0gT2JqZWN0LnZhbHVlcyhhY3RpdmVEaWN0aW9uYXJ5W1RSQU5TTEFUSU9OU10pO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uS2V5cyA9IE9iamVjdC5rZXlzKGFjdGl2ZURpY3Rpb25hcnlbVFJBTlNMQVRJT05TXSkubWFwKGtleSA9PiBrZXkuc3BsaXQoJy4nKS5wb3AoKSk7XG5cbiAgICByZXR1cm4gdHJhbnNsYXRpb25LZXlzLnJlZHVjZSgoYWNjLCBrZXksIGkpID0+IHtcbiAgICAgICAgYWNjW2tleV0gPSBsb2NhbGl6YXRpb25zW2ldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHt9KTtcbn07XG4iLCJpbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSAnLi9wYWdlLW1hbmFnZXInO1xuaW1wb3J0IG5vZCBmcm9tICcuL2NvbW1vbi9ub2QnO1xuaW1wb3J0IGNoZWNrSXNHaWZ0Q2VydFZhbGlkIGZyb20gJy4vY29tbW9uL2dpZnQtY2VydGlmaWNhdGUtdmFsaWRhdG9yJztcbmltcG9ydCBmb3JtTW9kZWwgZnJvbSAnLi9jb21tb24vbW9kZWxzL2Zvcm1zJztcbmltcG9ydCB7IGNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSB9IGZyb20gJy4vY29tbW9uL3V0aWxzL3RyYW5zbGF0aW9ucy11dGlscyc7XG5pbXBvcnQgeyBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlIH0gZnJvbSAnLi9jb21tb24vdXRpbHMvZm9ybS11dGlscyc7XG5pbXBvcnQgeyBhcGkgfSBmcm9tICdAYmlnY29tbWVyY2Uvc3RlbmNpbC11dGlscyc7XG5pbXBvcnQgeyBkZWZhdWx0TW9kYWwgfSBmcm9tICcuL2dsb2JhbC9tb2RhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdpZnRDZXJ0aWZpY2F0ZSBleHRlbmRzIFBhZ2VNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyKGNvbnRleHQpO1xuICAgICAgICB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5ID0gY3JlYXRlVHJhbnNsYXRpb25EaWN0aW9uYXJ5KGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0ICRjZXJ0QmFsYW5jZUZvcm0gPSAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1iYWxhbmNlJyk7XG5cbiAgICAgICAgY29uc3QgcHVyY2hhc2VNb2RlbCA9IHtcbiAgICAgICAgICAgIHJlY2lwaWVudE5hbWUodmFsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbC5sZW5ndGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVjaXBpZW50RW1haWwoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtTW9kZWwuZW1haWwoLi4uYXJncyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2VuZGVyTmFtZSh2YWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsLmxlbmd0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZW5kZXJFbWFpbCguLi5hcmdzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1Nb2RlbC5lbWFpbCguLi5hcmdzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdXN0b21BbW91bnQodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0QW1vdW50KHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBvcHRpb25zLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9uID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0ICRwdXJjaGFzZUZvcm0gPSAkKCcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtJyk7XG4gICAgICAgIGNvbnN0ICRjdXN0b21BbW91bnRzID0gJHB1cmNoYXNlRm9ybS5maW5kKCdpbnB1dFtuYW1lPVwiY2VydGlmaWNhdGVfYW1vdW50XCJdJyk7XG4gICAgICAgIGNvbnN0IHB1cmNoYXNlVmFsaWRhdG9yID0gbm9kKHtcbiAgICAgICAgICAgIHN1Ym1pdDogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScsXG4gICAgICAgICAgICBkZWxheTogMzAwLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoJGN1c3RvbUFtb3VudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCAkZWxlbWVudCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScpO1xuICAgICAgICAgICAgY29uc3QgbWluID0gJGVsZW1lbnQuZGF0YSgnbWluJyk7XG4gICAgICAgICAgICBjb25zdCBtaW5Gb3JtYXR0ZWQgPSAkZWxlbWVudC5kYXRhKCdtaW5Gb3JtYXR0ZWQnKTtcbiAgICAgICAgICAgIGNvbnN0IG1heCA9ICRlbGVtZW50LmRhdGEoJ21heCcpO1xuICAgICAgICAgICAgY29uc3QgbWF4Rm9ybWF0dGVkID0gJGVsZW1lbnQuZGF0YSgnbWF4Rm9ybWF0dGVkJyk7XG4gICAgICAgICAgICBjb25zdCBpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSA9IChtZXNzYWdlLCAuLi5hbW91bnRSYW5nZSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGFtb3VudFBsYWNlaG9sZGVycyA9IFsnW01JTl0nLCAnW01BWF0nXTtcbiAgICAgICAgICAgICAgICBsZXQgdXBkYXRlZEVycm9yVGV4dCA9IG1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgYW1vdW50UGxhY2Vob2xkZXJzLmZvckVhY2goKHBsYWNlaG9sZGVyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRFcnJvclRleHQgPSB1cGRhdGVkRXJyb3JUZXh0LmluY2x1ZGVzKHBsYWNlaG9sZGVyKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0LnJlcGxhY2UocGxhY2Vob2xkZXIsIGFtb3VudFJhbmdlW2ldKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXJyb3JUZXh0O1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVkRXJyb3JUZXh0O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcHVyY2hhc2VWYWxpZGF0b3IuYWRkKHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX2Ftb3VudFwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG51bWJlclZhbCA9IE51bWJlcih2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghbnVtYmVyVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYihmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjYihudW1iZXJWYWwgPj0gbWluICYmIG51bWJlclZhbCA8PSBtYXgpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiBpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSh0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmNlcnRpZmljYXRlX2Ftb3VudF9yYW5nZSwgbWluRm9ybWF0dGVkLCBtYXhGb3JtYXR0ZWQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5hZGQoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwidG9fbmFtZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYiwgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHB1cmNoYXNlTW9kZWwucmVjaXBpZW50TmFtZSh2YWwpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC50b05hbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwidG9fZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnJlY2lwaWVudEVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LnRvRW1haWwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiZnJvbV9uYW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gcHVyY2hhc2VNb2RlbC5zZW5kZXJOYW1lKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZyb21OYW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RvcjogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImZyb21fZW1haWxcIl0nLFxuICAgICAgICAgICAgICAgIHZhbGlkYXRlOiAoY2IsIHZhbCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBwdXJjaGFzZU1vZGVsLnNlbmRlckVtYWlsKHZhbCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2IocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmZyb21FbWFpbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJjZXJ0aWZpY2F0ZV90aGVtZVwiXTpmaXJzdC1vZi10eXBlJyxcbiAgICAgICAgICAgICAgICB0cmlnZ2VyZWRCeTogJyNnaWZ0LWNlcnRpZmljYXRlLWZvcm0gaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImNlcnRpZmljYXRlX3RoZW1lXCJdOmNoZWNrZWQnKS52YWwoKTtcblxuICAgICAgICAgICAgICAgICAgICBjYih0eXBlb2YgKHZhbCkgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVycm9yTWVzc2FnZTogdGhpcy5jb250ZXh0LmNlcnRUaGVtZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0b3I6ICcjZ2lmdC1jZXJ0aWZpY2F0ZS1mb3JtIGlucHV0W25hbWU9XCJhZ3JlZVwiXScsXG4gICAgICAgICAgICAgICAgdmFsaWRhdGU6IChjYikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwgPSAkcHVyY2hhc2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJhZ3JlZVwiXScpLmdldCgwKS5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5hZ3JlZVRvVGVybXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdG9yOiAnI2dpZnQtY2VydGlmaWNhdGUtZm9ybSBpbnB1dFtuYW1lPVwiYWdyZWUyXCJdJyxcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZTogKGNiKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbCA9ICRwdXJjaGFzZUZvcm0uZmluZCgnaW5wdXRbbmFtZT1cImFncmVlMlwiXScpLmdldCgwKS5jaGVja2VkO1xuXG4gICAgICAgICAgICAgICAgICAgIGNiKHZhbCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2U6IHRoaXMuY29udGV4dC5hZ3JlZVRvVGVybXMsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICBpZiAoJGNlcnRCYWxhbmNlRm9ybS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IGJhbGFuY2VWYWwgPSB0aGlzLmNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IoJGNlcnRCYWxhbmNlRm9ybSk7XG5cbiAgICAgICAgICAgICRjZXJ0QmFsYW5jZUZvcm0ub24oJ3N1Ym1pdCcsICgpID0+IHtcbiAgICAgICAgICAgICAgICBiYWxhbmNlVmFsLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFiYWxhbmNlVmFsLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAkcHVyY2hhc2VGb3JtLm9uKCdzdWJtaXQnLCBldmVudCA9PiB7XG4gICAgICAgICAgICBwdXJjaGFzZVZhbGlkYXRvci5wZXJmb3JtQ2hlY2soKTtcblxuICAgICAgICAgICAgaWYgKCFwdXJjaGFzZVZhbGlkYXRvci5hcmVBbGwoJ3ZhbGlkJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnI2dpZnQtY2VydGlmaWNhdGUtcHJldmlldycpLmNsaWNrKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHB1cmNoYXNlVmFsaWRhdG9yLnBlcmZvcm1DaGVjaygpO1xuXG4gICAgICAgICAgICBpZiAoIXB1cmNoYXNlVmFsaWRhdG9yLmFyZUFsbCgndmFsaWQnKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbW9kYWwgPSBkZWZhdWx0TW9kYWwoKTtcbiAgICAgICAgICAgIGNvbnN0IHByZXZpZXdVcmwgPSBgJHskKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoJ3ByZXZpZXdVcmwnKX0mJHskcHVyY2hhc2VGb3JtLnNlcmlhbGl6ZSgpfWA7XG5cbiAgICAgICAgICAgIG1vZGFsLm9wZW4oKTtcblxuICAgICAgICAgICAgYXBpLmdldFBhZ2UocHJldmlld1VybCwge30sIChlcnIsIGNvbnRlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb2RhbC51cGRhdGVDb250ZW50KHRoaXMuY29udGV4dC5wcmV2aWV3RXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1vZGFsLnVwZGF0ZUNvbnRlbnQoY29udGVudCwgeyB3cmFwOiB0cnVlIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNoZWNrQ2VydEJhbGFuY2VWYWxpZGF0b3IoJGJhbGFuY2VGb3JtKSB7XG4gICAgICAgIGNvbnN0IGJhbGFuY2VWYWxpZGF0b3IgPSBub2Qoe1xuICAgICAgICAgICAgc3VibWl0OiAkYmFsYW5jZUZvcm0uZmluZCgnaW5wdXRbdHlwZT1cInN1Ym1pdFwiXScpLFxuICAgICAgICAgICAgdGFwOiBhbm5vdW5jZUlucHV0RXJyb3JNZXNzYWdlLFxuICAgICAgICB9KTtcblxuICAgICAgICBiYWxhbmNlVmFsaWRhdG9yLmFkZCh7XG4gICAgICAgICAgICBzZWxlY3RvcjogJGJhbGFuY2VGb3JtLmZpbmQoJ2lucHV0W25hbWU9XCJnaWZ0Y2VydGlmaWNhdGVjb2RlXCJdJyksXG4gICAgICAgICAgICB2YWxpZGF0ZShjYiwgdmFsKSB7XG4gICAgICAgICAgICAgICAgY2IoY2hlY2tJc0dpZnRDZXJ0VmFsaWQodmFsKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JNZXNzYWdlOiB0aGlzLnZhbGlkYXRpb25EaWN0aW9uYXJ5LmludmFsaWRfZ2lmdF9jZXJ0aWZpY2F0ZSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGJhbGFuY2VWYWxpZGF0b3I7XG4gICAgfVxufVxuIl0sIm5hbWVzIjpbImNlcnQiLCJsZW5ndGgiLCJUUkFOU0xBVElPTlMiLCJpc1RyYW5zbGF0aW9uRGljdGlvbmFyeU5vdEVtcHR5IiwiZGljdGlvbmFyeSIsIk9iamVjdCIsImtleXMiLCJjaG9vc2VBY3RpdmVEaWN0aW9uYXJ5IiwiaSIsIkpTT04iLCJwYXJzZSIsImNyZWF0ZVRyYW5zbGF0aW9uRGljdGlvbmFyeSIsImNvbnRleHQiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeUpTT04iLCJ2YWxpZGF0aW9uRmFsbGJhY2tEaWN0aW9uYXJ5SlNPTiIsInZhbGlkYXRpb25EZWZhdWx0RGljdGlvbmFyeUpTT04iLCJhY3RpdmVEaWN0aW9uYXJ5IiwibG9jYWxpemF0aW9ucyIsInZhbHVlcyIsInRyYW5zbGF0aW9uS2V5cyIsIm1hcCIsImtleSIsInNwbGl0IiwicG9wIiwicmVkdWNlIiwiYWNjIiwiUGFnZU1hbmFnZXIiLCJub2QiLCJjaGVja0lzR2lmdENlcnRWYWxpZCIsImZvcm1Nb2RlbCIsImFubm91bmNlSW5wdXRFcnJvck1lc3NhZ2UiLCJhcGkiLCJkZWZhdWx0TW9kYWwiLCJHaWZ0Q2VydGlmaWNhdGUiLCJ2YWxpZGF0aW9uRGljdGlvbmFyeSIsIiRjZXJ0QmFsYW5jZUZvcm0iLCIkIiwicHVyY2hhc2VNb2RlbCIsInJlY2lwaWVudE5hbWUiLCJ2YWwiLCJyZWNpcGllbnRFbWFpbCIsImVtYWlsIiwic2VuZGVyTmFtZSIsInNlbmRlckVtYWlsIiwiY3VzdG9tQW1vdW50IiwidmFsdWUiLCJtaW4iLCJtYXgiLCJzZXRBbW91bnQiLCJvcHRpb25zIiwiZm91bmQiLCJmb3JFYWNoIiwib3B0aW9uIiwiJHB1cmNoYXNlRm9ybSIsIiRjdXN0b21BbW91bnRzIiwiZmluZCIsInB1cmNoYXNlVmFsaWRhdG9yIiwic3VibWl0IiwiZGVsYXkiLCJ0YXAiLCIkZWxlbWVudCIsImRhdGEiLCJtaW5Gb3JtYXR0ZWQiLCJtYXhGb3JtYXR0ZWQiLCJpbnNlcnRGb3JtYXR0ZWRBbW91bnRzSW50b0Vycm9yTWVzc2FnZSIsIm1lc3NhZ2UiLCJhbW91bnRSYW5nZSIsImFtb3VudFBsYWNlaG9sZGVycyIsInVwZGF0ZWRFcnJvclRleHQiLCJwbGFjZWhvbGRlciIsImluY2x1ZGVzIiwicmVwbGFjZSIsImFkZCIsInNlbGVjdG9yIiwidmFsaWRhdGUiLCJjYiIsIm51bWJlclZhbCIsIk51bWJlciIsImVycm9yTWVzc2FnZSIsImNlcnRpZmljYXRlX2Ftb3VudF9yYW5nZSIsInJlc3VsdCIsInRvTmFtZSIsInRvRW1haWwiLCJmcm9tTmFtZSIsImZyb21FbWFpbCIsInRyaWdnZXJlZEJ5IiwiY2VydFRoZW1lIiwiZ2V0IiwiY2hlY2tlZCIsImFncmVlVG9UZXJtcyIsImJhbGFuY2VWYWwiLCJjaGVja0NlcnRCYWxhbmNlVmFsaWRhdG9yIiwib24iLCJwZXJmb3JtQ2hlY2siLCJhcmVBbGwiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiY2xpY2siLCJtb2RhbCIsInByZXZpZXdVcmwiLCJjdXJyZW50VGFyZ2V0Iiwic2VyaWFsaXplIiwib3BlbiIsImdldFBhZ2UiLCJlcnIiLCJjb250ZW50IiwidXBkYXRlQ29udGVudCIsInByZXZpZXdFcnJvciIsIndyYXAiLCIkYmFsYW5jZUZvcm0iLCJiYWxhbmNlVmFsaWRhdG9yIiwiaW52YWxpZF9naWZ0X2NlcnRpZmljYXRlIl0sInNvdXJjZVJvb3QiOiIifQ==