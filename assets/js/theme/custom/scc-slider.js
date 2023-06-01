export default function () {
    $('.scc-slider').slick({
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        mobileFirst: true,
        swipeToSlide: true,
        responsive: [
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },

        ],
    });
}
