/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
// import Cookies from 'js-cookie/dist/js.cookie';
/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable padded-blocks */
/* eslint-disable prefer-template */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-inner-declarations */
/* eslint-disable prefer-arrow-callback */
/*eslint-disable*/

function product_view(view_val) {
    // let view_val = Cookies.get('product-view');

    if (view_val !== undefined) {
        if (view_val === 'product-grid-view') {
            $('.product-view-button .view-button-list').removeClass('active');
            $('.product-view-button .view-button-grid').addClass('active');
            $('.product-view-mode .productGrid').addClass('product-grid-view').removeClass('product-list-view').removeClass('product-list-style');
            Cookies.set('product-view', view_val, { expires: 7, path: '/' });
        } else {
            $('.product-view-button .view-button-grid').removeClass('active');
            $('.product-view-button .view-button-list').addClass('active');
            $('.product-view-mode .productGrid').removeClass('product-grid-view').addClass('product-list-view product-list-style');
            Cookies.set('product-view', view_val, { expires: 7, path: '/' });
        }
    } else {
        $('.product-view-button .view-button-list').removeClass('active');
        $('.product-view-button .view-button-grid').addClass('active');
        $('.product-view-mode .productGrid').removeClass('product-list-view').addClass('product-grid-view product-grid-view');
        Cookies.set('product-view', view_val, { expires: 7, path: '/' });
    }
}

(function () {
    var send = XMLHttpRequest.prototype.send
    XMLHttpRequest.prototype.send = function () {
        this.addEventListener('load', function () {
            let view_val = Cookies.get('product-view', { path: '/' });          
            if (view_val != "" && view_val !== undefined  && $(window).width() > 767) {
                product_view(view_val);
            }
        });
        return send.apply(this, arguments)
    }
})();

export default function (view_val) {
/* PRODUCT VIEW ON LOAD START */    
    $(document).ready(function () {
        if (view_val != "" && $(window).width() > 767) {
            product_view(view_val);
        } 
    });
}
// eslint-disable-next-line linebreak-style
/* eslint-enable */
