/* eslint-disable */
import utils from '@bigcommerce/stencil-utils';
import superfish from 'superfish/dist/js/superfish.min';
// import treeviewjs from "treemenu.js/treemenu";
import responsivetabs from 'responsive-tabs/js/jquery.responsiveTabs.min';
import productSwatches from './product-swatches';
import inView from "in-view";

export default function (context) {

  // cart closecode on hover other option
  $(document).on("click mousemove",(e)=>{    
    if(
      $(e.target).parents(".compare-header").length > 0 ||
      $(e.target).parents(".search-header").length > 0 ||
      $(e.target).parents(".navUser-item--account").length > 0
      ){
      if($(".navUser-item--cart .navUser-action").hasClass("is-open")){
        $(".navUser-item--cart .navUser-action").removeClass("is-open");
        $(".navUser-item--cart .navUser-action").next().removeClass("is-open f-open-dropdown");
      }
    }
 });


  /* Sf menu */
  setTimeout(() => {
    $('ul.navPages-list.sf-menu , .navUser-section.sf-menu').superfish({
      delay: 0
    });
  });

  setTimeout(() => {
    // superfish
    $('#menu ul.navPages-list').eq(0).clone().insertAfter($('#menu ul.navPages-list').eq(0));
    $('#menu ul.navPages-list').eq(1).removeClass('sf-menu').addClass('mobileNavigation').addClass('tree');
    $('.mobileNavigation  .navPage-childList-main').each(function () {
      $(this).find('ul').detach().insertBefore($(this));
      $(this).remove();
    });
    $('ul.navPages-list.sf-menu').superfish({
      delay: 0
    });

    // treeview
    $(".mobileNavigation").treeview({ 'delay': 300 });
    // headerstyle2 treeview
    $(".header-side-bar .navPages-list").treeview({
      delay: 300,
      collapsed: true,
      animated: "medium",
      collapsedArrow: '<svg><use xlink:href="#icon-header-sidebar-rightarrow"></use></svg>',
      expandedArrow: '<svg><use xlink:href="#icon-header-sidebar-downarrow"></use></svg>'
    });

  });


  /* Outside div click search close */
  $(document).ready(function () {
    $('.search-ovelary , .search-cancle').click(function (e) {
      $(this).parent('.dropdown').removeClass('is-open');
      $('body').removeClass('searchactive');
      
    });
    $('.search-close').click(function (e) {
      $(this).parents('.dropdown').removeClass('is-open');
      $('body').removeClass('searchactive');
    });
    $('.search-cancle').click(function (e) {
      $(this).parents('.dropdown').removeClass('is-open');
      
    });
    $(document).on('click', '.view-all', function () {
      $(this).closest('.search-wrapper').find('form').submit();
    });
    $('#quick-search-expand').click(function (e) {
      $('body').addClass('searchactive');
      $('body').removeClass('has-activeNavPages');
      $('.mobileMenu-toggle').removeClass('is-open');
      $('.navPages-container').removeClass('is-open');
    });
    $('.navUser-item--account .navUser-action').click(function (e) {
      $('body').removeClass('has-activeNavPages');
      $('.mobileMenu-toggle').removeClass('is-open');
      $('.navPages-container').removeClass('is-open');
    });

    $('.mobileMenu-toggle').click(function (e) {
      $(this).parents('header').removeClass('is-open');
    });


    // PDP-tabs-accordina
    $(document).on('click', '.bs-description-tabrow .tab', function () {
      $(this).parents('.bs-description-tabrow').find('.tab.active').not(this).each(function () {
        $(this).click();
      });

      $(this).find(".icon").toggleClass('active').parent().toggleClass('active');
      $(this).next('.tab-content').slideToggle();
    });

    if ($(".bs-description-tabrow").length > 0) {
      $(".bs-description-tabrow:first").find(".tab").trigger("click");
    }


    // review click per open reviews
    $('#productReview_link').on('click', function (event) {
      event.preventDefault();
      var $anchor = $("#reviewSection");
      !$anchor.find(".tab").hasClass("active") && $anchor.find(".tab-title").trigger("click");

      setTimeout(() => {
        let pos = $anchor.offset().top - $(".header").height();

        $('html, body').stop().animate({
          scrollTop: pos,
        }, 400);
      }, 400)


    });


    //jewellary variation desktop toggle script

    $(".desktopmenu-icon").find('.desktopMenu-toggle').on('click',function (e) {
      e.stopPropagation();
      $(e.currentTarget).toggleClass('is-open');
      $('body').toggleClass('headersidebaractive');
      $('.headersidebar-overlay').toggleClass('overlayactive');
      $(e.target).parents('.header-main').find('.header-side-bar').toggleClass('active');
    });


    $('html').on("click",function (e) {      
      if ($(e.target).parents("#headerSidebar").length == 0) {
        
        if(!$(e.target).is(".desktopMenu-toggle")){
          if ($("#headerSidebar").hasClass("active")) {          
            $('.desktopMenu-toggle').removeClass('is-open');
            $('#headerSidebar').removeClass('active');
            $('body').removeClass('headersidebaractive');
            $('.headersidebar-overlay').removeClass('overlayactive')
          }
        }
        
      }
    });

    
    $(window).width() > 1023 && handleDesktopMenuHover();
    homebelowbotomproducts();

  });

  /* responsive tabs */
  $('#responsiveTabsDemo').responsiveTabs({
    startCollapsed: 'accordion'
  });

  //set postion of slider when tab click
  $('#responsiveTabsDemo').find("li").on("click", () => {
    $(".productCarousel").slick('setPosition');
  });

  /* ============ FOOTER SCRIPT ============ */

  $('.footer .footer-toggle-title').click(function () {
    if ($(window).width() < 768) {
      $('.footer .footer-toggle-title').removeClass('active').next('.footer-info-list').slideUp();
      if ($(this).next('.footer-info-list').is(':hidden')) {
        $(this).addClass('active');
        $(this).next('.footer-info-list').slideDown();
      } else {
        $(this).removeClass('active');
        $(this).next('.footer-info-list').slideUp();
      }
    }
  });

  

  couchForLiving(context);

 // compareProductFucntForHome(context);

  sidebartreeview();

  mobilefacted();
  mobilesidebaraccoridan();
  resizefunction();
  categoryPageSlider();
  homebelowbotomproducts();
  mobileshopbyslider();
  relatedproduct();
  mobilerighticon1();
  // mobilesideicon();
  ocbrandlogoslider();




  $(window).resize(() => {
    resizefunction();
    categoryPageSlider();
    homebelowbotomproducts();
    mobilefacted();
    mobilesidebaraccoridan();
    mobileshopbyslider();
    relatedproduct();
    ocbrandlogoslider();

    if ($(window).width() < 768 && !$('body').hasClass('lt-768')) {
      $('body').addClass('lt-768');
      $('body').removeClass('gt-768');
      $('.footer .footer-info-list').hide();
    } else if ($(window).width() > 767 && !$('body').hasClass('gt-768')) {
      $('body').addClass('gt-768');
      $('body').removeClass('lt-768');
      $('.footer .footer-toggle-title').removeClass('active');
      $('.footer .footer-info-list').show();
    }
  });

}

$(document).ajaxComplete(function () {

  sidebartreeview();

});

const handleDesktopMenuHover = () => {
  const allLinks = $('.navPage-subMenu-simplelist  li').not('.header-side-bar .navPage-subMenu-simplelist  li');
  allLinks.each(function(e){
  
    $(this).hover(function (e) {
      // Return false if device is a mobile or tablet
      if ($(window).width() < 1024) {
        return false;
      }
      const $hoveringLink = $(e.target).is('li') ? $(e.target) : $(e.target).closest('li');
      const $childMenu = $hoveringLink.find('ul');
      if ($childMenu.length > 0) {

        let positionObj = $hoveringLink[0].getBoundingClientRect();
        let leftPos = positionObj.right - 1, topPos = positionObj.top + positionObj.height;
        if ((topPos + $childMenu.outerHeight()) < $(window).height()) {
          $childMenu.attr('style', `position:fixed; top: ${topPos}px; left: ${leftPos}px`);
        } else {
          if ($childMenu.outerHeight() > $(window).height()) {
            let modifiedTopPos = $(window).height() * 0.025;
            $childMenu.attr('style', `position:fixed; top: ${modifiedTopPos}px; left: ${leftPos}px; overflow-x: hidden; overflow-y: auto; max-height: ${$(window).height() * 0.95}px;`);
          } else {
            let modifiedTopPos = $(window).height() - $childMenu.outerHeight();
            $childMenu.attr('style', `position:fixed; top: ${modifiedTopPos}px; left: ${leftPos}px`);
          }
        }
      }
    });
  });
}


// treeview
export function sidebartreeview() {
  $(".sidebarBlock > ul").unbind().treeview({
    delay: 300,
    collapsed: true,
    animated: "medium",
    persist: "location",
    collapsedArrow: '<svg><use xlink:href="#icon-sidebar-down-arrow"></use></svg>',
    expandedArrow: '<svg><use xlink:href="#icon-sidebar-up-arrow"></use></svg>'
  });
  $(".navList-item .activePage").next().slideDown();
  let categoryelement = $(".navList-item .activePage");
  $(categoryelement).parents('.expandable').addClass('rotatearrow');
}

/// mobile-filter

export function mobilefacted() {
  let sidebarBlock = $(".category-sidebar");

  $(document).on('click', '.mobile-filter', function () {
    $(this).parents('.page-inner').find('.facetedSearch').addClass('is-open');

  });


  $(document).on('click', '.faceted-close-mobile', function () {

    $(this).parents('.facetedSearch').removeClass('is-open');

  });
  if ($(window).width() < 1024) {

    if ($('.page-content-right .category-sidebar').length == 0) {
      sidebarBlock.detach().insertAfter($(`.page-content-right [aria-label="Breadcrumb"]`));
    }
  } else {
    if ($(".page-sidebar").length > 0) {
      if ($(".page-sidebar").find(".category-sidebar").length == 0) {
        sidebarBlock.detach().insertBefore($("#faceted-search-container"));

      }
    }
  }

}

export function mobilesidebaraccoridan() {
  if ($(window).width() < 1024) {

    $('.page-content-right .sidebarBlock-heading').unbind().on("click", function () {
      $(this).next('ul').slideToggle();
      $(this).toggleClass('active');
    });
  }
}


// mobille right icon

function mobilerighticon1(){
  let pos = 0;
  let sticky = $('.mobile-navigation-link');
  let footerSection = $("footer");
  console.log(footerSection.outerHeight());
  $(window).on("scroll",()=>{
    let scrollPos = window.pageYOffset;
    let footerOffset = footerSection.offset().top;
    if ($(window).width() < 667) {
      if(pos < scrollPos){
      //down
        if(scrollPos > 1){
          if(sticky.hasClass("hide-fixed")){
            sticky.hasClass("fixed") && sticky.removeClass('fixed');
          }else{
            !sticky.hasClass("fixed") && sticky.addClass('fixed');
          }            
          if((footerOffset - scrollPos) < 500){
            sticky.hasClass("fixed") && sticky.removeClass('fixed');
          }
        }
      }else{
        //up
        console.log(footerOffset - scrollPos);
        if(scrollPos < 1){
          if(sticky.hasClass("fixed")){
            sticky.removeClass('fixed'); 
          }
        }else{
          if((footerOffset - scrollPos) > 400){
            !sticky.hasClass("fixed") && sticky.addClass('fixed');
          }
        }
      }
      pos = scrollPos > 0 ? scrollPos : 0;    
    } 
  });
}


function mobilesideicon(){
  let mobile_navigation = $('.mobile-navigation-link');
  inView('.footer')
    .on('enter', ()=>{
      if($(window).width()< 667){
        !mobile_navigation.hasClass('hide-fixed') &&  mobile_navigation.addClass('hide-fixed');
        
        mobile_navigation.hasClass('fixed') &&  mobile_navigation.removeClass('fixed');
      }
   
    })
    .on('exit', el => {
      if($(window).width()< 667){
        mobile_navigation.hasClass('hide-fixed') &&  mobile_navigation.removeClass('hide-fixed');
        !mobile_navigation.hasClass('fixed') &&  mobile_navigation.addClass('fixed');
      }
    });
}


// shopy by category slider 

function mobileshopbyslider() {

  let sliderEl = $('.shopby-section ul');
  if ($(window).width() < 767) {
    sliderEl.not('.shopby-section ul.slick-initialized').slick({

      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      speed: 300,
      centerMode: true,
      centerPadding: "30px",
      arrows: false,
      dots: false,
      row:1,
      mobileFirst:true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 551,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]

    });
  } else {
    if (sliderEl.hasClass("slick-initialized")) {
      setTimeout(() => {
        sliderEl.slick('unslick');
      }, 100);
    }
  }

}


function ocbrandlogoslider() {

  let sliderEl = $('.bs-brand-logos .custom-row');
  if ($(window).width() > 240) {
    sliderEl.not('.bs-brand-logos .custom-row.slick-initialized').slick({

      slidesToShow: 7,
      slidesToScroll: 1,
      infinite: true,
      autoplay: true,
      speed: 300,
      centerMode: false,
      centerPadding: "30px",
      arrows: false,
      dots: false,
      row: 1,
      responsive: [
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 1100,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 910,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            row: 1
          }
        },
        {
          breakpoint: 667,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            row: 1,
            centerMode:true,
            centerPadding:"52px"
          }
        },
        {
          breakpoint: 370,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            row: 1,
            centerMode:true,
            centerPadding:"52px"
          }
        }
      ]

    });
  } else {
    if (sliderEl.hasClass("slick-initialized")) {
      setTimeout(() => {
        sliderEl.slick('unslick');
      }, 100);
    }
  }

}


function resizefunction() {

  let sliderEl = $('.categoriesblocks .custom-row .custom-row');
  if ($(window).width() <= 767) {
    sliderEl.not('.categoriesblocks .custom-row .custom-row.slick-initialized').slick({
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 300,
      slidesToShow: 2,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "163px",
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 551,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  } else {
    if (sliderEl.hasClass("slick-initialized")) {
      setTimeout(() => {
        sliderEl.slick('unslick');
      }, 100);
    }
  }

}

// category page subcategory slider

function categoryPageSlider() {
  let sliderEl = $('.sub-category-block');
  if ($(window).width() < 1024) {
    sliderEl.not('.sub-category-block.slick-initialized').slick({
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "158px",
      arrows: false,
      dots: false,
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 990,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 510,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  } else {
    if (sliderEl.hasClass("slick-initialized")) {
      setTimeout(() => {
        sliderEl.slick('unslick');
      }, 100);
    }
  }

}


function homebelowbotomproducts() {
  let sliderEl = $('[data-content-region=home_below_bottom_products] [data-sub-layout-container]');
  if (window.innerWidth <= 1180) {
    let styleslector = $("[data-content-region=home_below_bottom_products] [data-sub-layout-container] > [data-container-styling]");

    $(styleslector).detach();
    $('[data-content-region="home_below_bottom_products"] [data-layout-id]').append(styleslector);
    sliderEl.not('[data-content-region=home_below_bottom_products] [data-sub-layout-container].slick-initialized').slick({
      dots: true,
      infinite: true,
      autoplay: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: "136px",
      arrows: false,
      dots: false,
      mobileFirst:true,
      responsive: [
        {
          breakpoint: 1180,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "100px"
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "136px"
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "136px"
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 551,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });
  }
  else {
    if (sliderEl.hasClass("slick-initialized")) {
      setTimeout(() => {
        sliderEl.slick('unslick');
      }, 100);
    }
  }
}


function relatedproduct() {
  let sliderEl = $('.bs-related-product .productCarousel');
  if (window.innerWidth <= 1023) {

    sliderEl.not('.bs-related-product .productCarousel.slick-initialized').slick({
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "136px"
          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "145px"
          }
        },
        {
          breakpoint: 550,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "136px"
          }
        },
        {
          breakpoint: 380,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            centerPadding: "136px"
          }
        }
      ]
    });
  }
  else {
    if (sliderEl.hasClass("slick-initialized")) {
      setTimeout(() => {
        sliderEl.slick('unslick');
      }, 100);
    }
  }
}


function couchForLiving(c) {
  if (window.location.pathname == '/') {
    if (!c.catName) return;

    let catUrl = c.catName;
    let opt = {
      template: "custom/couch-for-living",
      config: {
        products: {}
      }
    }
    utils.api.getPage(catUrl, opt, function (err, response) {
      if (err) {
        return;
      }

      $(".product-section #custom-product-section").html(response);
      if(c.CustomProductSwatch){
        productSwatches(c);
      }
      
    });
  }
}



// function compareProductFucntForHome(c) {
//   if (window.location.pathname == '/') {
//     compareProducts(c);
//   }
// }

export function getProperProductCount(){
  let srchstr = window.location.search.substr(1);
  if(srchstr.length == 0) return;
  
  let url = srchstr.split("&")??0;
  const srchParam = {}
  if(url.length > 0){
      for(let x in url){
          let makePart = url[x].split("=");
          srchParam[makePart[0]] = makePart[1];
      }
      let elemnt;
      let currentKey;
      let allkeys = Object.keys(srchParam);
      //we want this function perform only when parama have limit per page or sort by parama
      let isLimitNSort = false;
      for(let i in allkeys){
          if(allkeys[i] == 'limit'){
              elemnt = $("[data-sort-by]").find("#limit");
              isLimitNSort = true;
              currentKey = 'limit';
          }
          if(allkeys[i] == 'sort'){
              elemnt = $("[data-sort-by]").find("#sort");
              isLimitNSort = true;
              currentKey = 'sort';
          }
          if(isLimitNSort){
              elemnt.children().each(function(i,elmt){
                  if($(elmt).is("selected")){
                      $(elmt).attr('selected',false);
                  }
                  if($(elmt).prop('value') == srchParam[currentKey]){
                      $(elmt).prop('selected',true);
                  }
               });
          }
      }
  }
}

