/* eslint-disable */
import Cookies from "js-cookie/dist/js.cookie";
import Noty from "jquery.growl/javascripts/jquery.growl";

export default function (contextData) {
    
    const compareRequireMessage = contextData.compareRequireMessage;
    const NoItemToCompare = contextData.NoItemToCompare;
    const CompareSuccessMessage = contextData.CompareSuccessMessage;
    const CompareAlreadyAdded = contextData.CompareAlreadyAdded;
    const CompareLimitMessage = contextData.CompareLimitMessage;
    const CompareNotFunction = contextData.CompareNotFunction;
    const CompareRemoveMessage = contextData.CompareRemoveMessage;
    


    //Comapre when no item to compare
    $(document).on('click', 'a[title="Compare"]', function (event) {
        event.preventDefault();
        var compareList = Cookies.get('compare_list', { path: '/' });
        
        if (compareList == undefined) {
            $.growl.warning({ title: "Compare", message: NoItemToCompare });
        }
        if (compareList != null || compareList != "") {
            try {
                var Clist = compareList.split(",");
                var totalItems = Clist.length;
                if (totalItems < 2) {
                    $.growl.warning({ title: "Compare", message: compareRequireMessage });
                } else {                    
                    location.href = $(this).attr('href');
                }
            } catch (ex) { }
        }

    });


    const compareListItems = new Array();
    const compareList = Cookies.get('compare_list', { path: '/' });
    function addToCompare(product_id) {
        var result = findInList(product_id);
        if (result == 1) {
            var compareList = Cookies.get('compare_list', { path: '/' });
            //console.log(compareList);
            var newCompareList = new Array();
            if (compareList != null || compareList != "") {
                try {
                    var Clist = compareList.split(",");
                    for (var i = 0; i < Clist.length; i++) {
                        newCompareList.push(Clist[i]);
                    }
                }
                catch (ex) { }
            }
            newCompareList.push(product_id);

            let totalCount = newCompareList.length > 0 ? newCompareList.length : '';
            $(".navUser-item--compare-custom span").html(totalCount);
            if (newCompareList.length > 0) {
                $(".navUser-item--compare-custom").addClass('show');
            }
            Cookies.set('compare_list', newCompareList.toString(), { expires: 7, path: '/' });
            compareCountUpdate();
            $.growl.notice({ title: "Compare", message: CompareSuccessMessage });
            $('.compare-box[data-compare-id="' + product_id + '"]').addClass('compare-active');
            $('.compare-box[data-compare-id="' + product_id + '"]').parent().addClass('compare-active-lbl');

            $('.compare-box[data-compare-id="' + product_id + '"]').removeClass('compare-box');
            if (!$('.nav-item-compare').hasClass('active')) {
                $('.nav-item-compare').addClass('active').css('display', 'inline-block');
            }

        } else if (result == 2) {
            $.growl.warning({ title: "Compare", message: CompareAlreadyAdded });
        }
        else if (result == 4) {
            $.growl.warning({ title: "Compare", message: CompareLimitMessage });
        }
        else {
            $.growl.warning({ title: "Compare", message: CompareNotFunction });
        }

    }
    function compareCountUpdate() {
        var compareList = Cookies.get('compare_list', { path: '/' });
        if (compareList != null || compareList != "") {
            try {
                var Clist = compareList.split(",");
                
                var totalItemsToCompare = Clist.length > 0 ? parseInt(Clist.length) : '';
                
                $(".navUser-item--compare-custom span").html(totalItemsToCompare);
                $(".navUser-item--compare-custom span").show();
                $('body').removeClass('emptyCompare');
                
                Clist.length > 0 && Clist.forEach(prodId => {
                    $(`[data-compare-id="${prodId}"]`).attr("checked",true);
                });
            }
            catch (ex) {
                // $(".navUser-item--compare-custom span").html("0");
                // $(".navUser-item--compare-custom span").hide();
                $('body').addClass('emptyCompare');
            }

        }

        compareNow();
    }
    function findInList(product_id) {
        var compareList = Cookies.get('compare_list', { path: '/' });

        if (compareList != null || compareList != "") {
            try {
                var Clist = compareList.split(",");
                var totalItems = Clist.length;
                if (totalItems >= 4) {
                    return 4;
                }
                for (var i = 0; i < totalItems; i++) {
                    var j = i;
                    if (product_id == Clist[j])
                        return 2;
                }
            } catch (ex) { }
        }
        return 1;


    }
    function removeCompareItem(item) {
        var compareList = Cookies.get('compare_list', { path: '/' });
        var newCompareList = new Array();

        if (compareList != null || compareList != "") {
            try {
                var Clist = compareList.split(",");

                for (var i = 0; i < Clist.length; i++) {

                    if (parseInt(Clist[i]) != parseInt(item)) {
                        newCompareList.push(Clist[i]);
                        $('.compare-box[data-compare-id="' + Clist[i] + '"]').removeClass('compare-active');
                        $('.compare-box[data-compare-id="' + Clist[i] + '"]').parent().removeClass('compare-active-lbl');
                        $('.compare-box[data-compare-id="' + Clist[i] + '"]').addClass('compare-box');
                    }

                }
                let totaCount = newCompareList.length > 0 ? newCompareList.length : '';
                
                $(".navUser-item--compare-custom span").html(totaCount);                
                Cookies.set('compare_list', newCompareList.toString(), { expires: 7, path: '/' });

                if (newCompareList.length < 1) {
                    Cookies.remove('compare_list', { path: '/' });
                    $(".navUser-item--compare-custom").removeClass('show');   
                    $(".navUser-item--compare-custom").attr("href", "javascript:void(0)");                 
                }
            }
            catch (ex) { }
            $.growl.warning({ title: "Compare", message: CompareRemoveMessage });
        } else {
            $.growl.warning({ title: "Compare", message: NoItemToCompare });
        }
        compareCountUpdate();
    }

    /* logic to send items to compare page */
    function compareNow() {

        let c_count = parseInt($('.navUser-item--compare-custom span').text());
        if (c_count > 0) {
            $('.navUser-item--compare-custom').addClass('show');
        }
        var compareList = Cookies.get('compare_list', { expires: 7, path: '/' });        
        if (compareList != null || compareList != "" || compareList != undefined) {
            try {
                var Clist = compareList.split(",");
                var cItems = "";
                for (var i = 0; i < Clist.length; i++) {
                    cItems += "/" + Clist[i];
                    $('.compare-box[data-compare-id="' + Clist[i] + '"]').addClass("compare-active");
                    $('.compare-box[data-compare-id="' + Clist[i] + '"]').parent().addClass('compare-active-lbl');
                    $('.compare-box[data-compare-id="' + Clist[i] + '"]').removeClass('compare-box');
                }
                $(".navUser-item--compare-custom").attr("href", "/compare" + cItems);                
                if (location.pathname == '/compare/' || location.pathname == '/compare') {
                    location.href = "/compare" + cItems;
                }
            }
            catch (ex) { }
        } else {

            //$.growl.warning({ message: NoItemToCompare });
        }
    }

    if (Cookies.get('compare_list', { path: '/' }) == "" || Cookies.get('compare_list', { path: '/' }) == undefined) {
        Cookies.remove('compare_list', { path: '/' });
    }



    $(document).ready(function () {
        $(document).on("click", ".compare-box", function () {            
            addToCompare($(this).attr("data-compare-id"));
        });

        $(document).on('click', '.compare-active', function () {
            $(this).removeClass('compare-active');
            $(this).parent().removeClass('compare-active-lbl');
            // console.log($(this).attr("data-compare-id"));
            removeCompareItem($(this).attr("data-compare-id"));
            $(this).addClass('compare-box');
        });

        $(document).on("click", ".doRemove", function () {
            removeCompareItem($(this).attr("data-product-id"));
        });

        if (Cookies.get('compare_list', { path: '/' }) !== "" || Cookies.get('compare_list', { path: '/' }) !== undefined) {
            var compareList = Cookies.get('compare_list', { path: '/' });

            try {
                if ($('.compareTable .card').length == 0) {                    
                    // $(".navUser-item--compare-custom span").html("0");
                    // $(".navUser-item--compare-custom span").hide();
                    // $('body').addClass('emptyCompare');
                    compareNow();
                    $('.compare-table-wrap').html('<p>'+NoItemToCompare+'</p>');
                    $('.compare-table-wrap .comparTableCustom').css('display', 'block');
                } else {                    
                    $('.compare-table-wrap .comparTableCustom').css('display', 'block');
                    if ($('.compareTable .card').length == 1) {
                        $(".navUser-item--compare-custom span").html("1");
                        $('.doRemove').attr('href', "/compare/");
                    } else {
                        var Clist = compareList.split(",");
                        var cItems = "";
                        if (Clist.length == 2) {
                            // console.log(Clist[0]);
                            $('.doRemove:not([data-product-id="' + Clist[0] + '"])').attr('href', "/compare/" + Clist[0]);
                            $('.doRemove:not([data-product-id="' + Clist[1] + '"])').attr('href', "/compare/" + Clist[1]);
                        }
                    }
                }

            } catch (ex) {

            }

        }

        $(document).ajaxStop(function () {
            var compareList = Cookies.get('compare_list', { path: '/' });
            if (compareList != null || compareList != "" || compareList != undefined) {
                try {
                    var Clist = compareList.split(",");
                    var cItems = "";
                    for (var i = 0; i < Clist.length; i++) {
                        // console.log(Clist[i])
                        $('.compare-box[data-compare-id="' + Clist[i] + '"]').addClass("compare-active");
                        $('.compare-box[data-compare-id="' + Clist[i] + '"]').parent().addClass('compare-active-lbl');
                        $('.compare-box[data-compare-id="' + Clist[i] + '"]').removeClass('compare-box');
                    }
                }
                catch (ex) { }
            } else {

                //$.growl.warning({ message: NoItemToCompare });
            }
        });
    });
    compareCountUpdate();
}
/* eslint-enable */
