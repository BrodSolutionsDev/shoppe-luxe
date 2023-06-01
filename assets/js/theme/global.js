import 'focus-within-polyfill';

import carousel from './common/carousel';
import './common/select-option-plugin';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import currencySelector from './global/currency-selector';
import foundation from './global/foundation';
import './global/jquery-migrate';
import menu from './global/menu';
import mobileMenuToggle from './global/mobile-menu-toggle';
import quickSearch from './global/quick-search';
import quickView from './global/quick-view';
import svgInjector from './global/svg-injector';
import PageManager from './page-manager';

// Brod Solutions
import sccSlider from './custom/scc-slider';

export default class Global extends PageManager {
    onReady() {
        const { cartId, secureBaseUrl } = this.context;
        cartPreview(secureBaseUrl, cartId);
        quickSearch();
        currencySelector(cartId);
        foundation($(document));
        quickView(this.context);
        carousel(this.context);
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        svgInjector();
        // Brod Solutions
        sccSlider();
    }
}
