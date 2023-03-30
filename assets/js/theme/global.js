import 'focus-within-polyfill';

import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import carousel from './common/carousel';
import svgInjector from './global/svg-injector';
import CustomScript from './custom/bs-common';
import productSwatches from './custom/product-swatches';
import productListingView from './custom/productListingView';
import headerExtras from './custom/header-custom';
import {compareProducts} from './global/product-comparison';
import customProductCount from "./custom/custom-product-count";
    window.productListingView = productListingView;

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        CustomScript(this.context);
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        svgInjector();
        headerExtras(true);
        compareProducts(this.context);
        customProductCount(this.context);
        if(this.context.CustomProductSwatch){
            productSwatches(this.context);
        }
    }
}
