import { showAlertModal } from './modal';

function decrementCounter(counter, item) {
    const index = counter.indexOf(item);

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
        $link.attr('href', `${urls.compare}/${counter.join('/')}`);
        $link.find('span.countPill').html(counter.length);
    } else {
        $link.removeClass('show');
        //$link.find('span.countPill').html('');
    }
}

export default function ({ noCompareMessage, urls }) {
    // let compareCounter = [];

    // const $compareLink = $('a[data-compare-nav]');

    // $('body').on('compareReset', () => {
    //     const $checked = $('body').find('input[name="products\[\]"]:checked');

    //   
    //         compareCounter = $checked.length ? $checked.map((index, element) => element.value).get() : [];
    //         updateCounterNav(compareCounter, $compareLink, urls);
    // 
    // });

    // $('body').triggerHandler('compareReset');

    // $('body').on('click', '[data-compare-id]', event => {
    //     const product = event.currentTarget.value;
    //     const $clickedCompareLink = $('a[data-compare-nav]');

    //     if (event.currentTarget.checked) {
    //          incrementCounter(compareCounter, product);
    //         
            
    //         // showNotification();
    //         // setActiveCompareBtn(product);
    //     } else {
    //         decrementCounter(compareCounter, product);
    //         console.log(product);
    //         // showNotification(true);
    //         // setActiveCompareBtn(product);
    //     }

    //     updateCounterNav(compareCounter, $clickedCompareLink, urls);
    // });

    // $('body').on('click', 'a[data-compare-nav]', () => {
    //     const $clickedCheckedInput = $('body').find('input[name="products\[\]"]:checked');
    //     console.log(noCompareMessage)
    //     if ($clickedCheckedInput.length <= 1) {
    //         let msg = "There is no item to compare, please select at least 2 products";
    //         //showMessage(msg, "remove");
    //         showAlertModal(msg);
    //         return false;
    //     }
    // });
}
