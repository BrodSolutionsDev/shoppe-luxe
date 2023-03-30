export default function headerExtras(enableStickyHeader) {
    let headerActualHeight;
    const handleStickyHeader = (header, isScrollingUp = false) => {
        try {
            // isScrollingUp returns "false" if direction is down and "true" if up
            const headerHeight = header.offsetHeight;   // Change the static value to header.offsetHeight if header height is needed
            let heightThreshold = isScrollingUp ? headerActualHeight - 60 : headerHeight;
            if (window.pageYOffset > headerHeight) {  
                    
                if(document.querySelectorAll(`[sticky="true"]`).length > 0){
                    if(!header.classList.contains('sticky-header')){
                        header.classList.add('sticky-header');
                        document.querySelector('body').style.paddingTop = `${headerHeight}px`;
                    }
                }
               
            } else {
                header.classList.remove('sticky-header');
                // stickyParent.classList.remove('sticky-added');
                // document.querySelector('body').style.paddingTop = 0;
                let body = document.querySelector('body');
                body.style.paddingTop = 0;
                body.classList.remove('has-activeNavPages');
            }
        } catch (error) {
            console.error(`Error occured at handleStickyHeader() in header-custom.js\n${error}`);
        }
    }
    (() => {
        const headerEl = document.querySelector('.header');
        headerActualHeight = headerEl.offsetHeight;
        enableStickyHeader && headerEl && handleStickyHeader(headerEl);
        enableStickyHeader && headerEl && (window.onscroll = function (e) {
            handleStickyHeader(headerEl, (this.oldScroll > this.scrollY));
            this.oldScroll = this.scrollY;
        });
    })();
};
