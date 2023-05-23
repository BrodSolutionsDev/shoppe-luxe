/*----------------------------------------------------------------
  Custom Product Count Funtionlity
  ===============================================================
  -This functionality show the product pagination.
  (eg. Show 1 to 10 products of 129)
  
  -This functionality works on category, search and category brand 
   product listing page
------------------------------------------------------------------*/
import Url from 'url';
import utils from "@bigcommerce/stencil-utils";
class CustomProductCount{
    constructor(cntxt){
        let url = Url.parse(window.location.href, true);
        this.$context = cntxt;        
        this.$TotalProductEl = null;
        this.$ProductPrePage =  url.query.limit ? url.query.limit : (this.$context.ProductsPerPage ? this.$context.ProductsPerPage : 0);
        this.$totalProducts = this.getTotalProducts();
        this.start = 1;
        this.end = this.$ProductPrePage;
        this.allBrandArr = {};
        this.selectedFacets = null;                
        if(!sessionStorage.getItem("AllBrand")) {
          this.fetchAllbrand();
        }
        this.calculatePagination();
        this.listenPaginationChangEvent();
        if($("body").hasClass("type-brand")){
          let t = setInterval(()=>{
                if(sessionStorage.getItem("AllBrand")){
                    clearInterval(t);
                    this.getSeletedFacets()
                    this.getTotalBrandProduct();
                }
            },1000)
        }
    }
   
    /*
      Thsi code run after applying the filter so get freash product count
    */
    listenPaginationChangEvent(){
        $(window).on('paginationChange', ()=>{          
          if($("body").hasClass("type-brand")) this.getSeletedFacets();
          this.$totalProducts = this.getTotalProducts();                  
          this.calculatePagination();
        });
    }
    calculatePagination(){
        let createEl;
        let url = Url.parse(window.location.href, true);
        let page = url.query.page ? url.query.page : 1;
        this.$ProductPrePage =  url.query.limit ? url.query.limit : (this.$context.ProductsPerPage ? this.$context.ProductsPerPage : 0);
        if(page == 1){            
            this.start = 1;
            this.end = this.$ProductPrePage;
        }
        if(page > 1){
            this.start = (this.$ProductPrePage * page) - this.$ProductPrePage + 1;            
            this.end = this.$ProductPrePage * page;
        }
        if(this.end > this.$totalProducts){
            this.end = this.$totalProducts;
        }
        setTimeout(()=>{
            createEl = `Showing ${this.start} - ${this.end} Products of ${this.$totalProducts} `;            
            this.$TotalProductEl = $("body").find("#totalProducts");
            this.$totalProducts && this.$TotalProductEl.html(createEl);
        },100);
    }
    getTotalProducts(){
        if($(`[data-total-product]`).length > 0){
            return parseInt($(`[data-total-product]`).data("total-product"));
        }else{
          return this.$totalProducts;            
        }
    }
    fetchAllbrand(start = ''){
        if(this.$context.stToken){
            let getOptionsQuery = `query ExtendedProductsById {
                site{
                  brands(first: 50 ${start}){
                      pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                      }
                      edges{
                        node{
                            id
                            entityId
                            name
                            path
                        }
                      }
                  }    
                }
              }`;          
              fetch('/graphql', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.$context.stToken}`
                },
                body: JSON.stringify({
                  query: getOptionsQuery
                })
              }).then(res => res.json()).then(res => {
                let productData = res.data.site.brands;
                if(productData.edges.length > 0) {
                  productData.edges.forEach(el => {
                    this.allBrandArr[el.node.path] = el.node;
                  });
                }
                if(productData.pageInfo.hasNextPage){
                  this.start = `, after: "${productData.pageInfo.endCursor}"`;                                     
                  this.fetchAllbrand(this.start);
                }else{                    
                    if(!sessionStorage.getItem("AllBrand")){
                        sessionStorage.setItem("AllBrand",JSON.stringify(this.allBrandArr));
                    }
                }          
              });
        }
    }
    getTotalBrandProduct(){
        let opt = {
          template: "getTotalBrandProd"
        }
        let bData = JSON.parse(sessionStorage.getItem("AllBrand"));
        let brandData = bData[this.$context.brandUrl];
        utils.api.getPage(`/categories/?brand=${brandData.entityId}`, opt, (err, content) => {
          if (err) {
            throw new Error(err);
          }
          if(parseInt(content) > 0){
              this.$totalProducts = parseInt(content);
              this.calculatePagination();
          }
        });
    }
    getSeletedFacets(){
      this.selectedFacets = $("[data-selected-obj]").length > 0 ? $("[data-selected-obj]").data("selected-obj") : null;
      if(this.selectedFacets && this.selectedFacets.items.length > 0){
        this.$totalProducts = this.selectedFacets.items[0].true_count;
      }else{
        this.getTotalBrandProduct();
      }
    }
}
export default function(c){
    new CustomProductCount(c);
}
