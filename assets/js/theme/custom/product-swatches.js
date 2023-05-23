import utils from "@bigcommerce/stencil-utils";

export class GetProductOptions {
  constructor(context) {
    this.start = '';
    this.stToken = context.stToken;
    this.fireEvents();
  }

  fetchProductsOptionsGQL() {
    let allProdIDs = [];
    const allElementsToFetchTheData = document.querySelectorAll('.card .product-options-wrapper');
    if (allElementsToFetchTheData.length > 0) {
      allElementsToFetchTheData.forEach(el => {
        let id = parseInt(el.dataset.productId);
        allProdIDs.indexOf(id) == -1 && allProdIDs.push(id);
      });

    }

    // Exit the function if there does not exist even a single product to fetch options for on the page
    if (allProdIDs.length === 0) {
      return false;
    }

    this.getGraphQlData(allProdIDs, this.start);
  }


  getGraphQlData(ids, start) {
    let i = 0
    let getOptionsQuery = `query getProductOptions($productIds: [Int!] = []) {
      site {
        products (first: 50, entityIds: $productIds${start}) {
          pageInfo{
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              entityId
              name
              path
              productOptions(first: 10) {
                edges {
                  node {
                    entityId
                    displayName
                    isRequired
                    __typename
                    ... on MultipleChoiceOption {
                      displayStyle
                      values(first: 10) {
                        edges {
                          node {
                            entityId
                            label
                            isDefault
                            ... on SwatchOptionValue {
                              hexColors
                              imageUrl(width: 100)
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }`;

    // Now we finally have our unique products with us so we get the data for all
    // these products using GraphQL API call
    let varObj = { "productIds": ids };
    fetch('/graphql', {
      method: 'POST',
      // credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.stToken}`
      },
      body: JSON.stringify({
        query: getOptionsQuery,
        variables: varObj
      })
    }).then(res => res.json()).then(res => {

      let productData = res.data.site.products;
      let finalData = {}, productURLs = {};
      res.data.site.products.edges.map(prod => prod.node && prod.node.productOptions?.edges?.length > 0 && ((finalData[prod.node.entityId] = prod.node.productOptions.edges, productURLs[prod.node.entityId] = prod.node.path)));
      this.makeHTMLDataForProductOptions(finalData, productURLs);

      if (productData.pageInfo.hasNextPage) {
        this.start = `, after: "${productData.pageInfo.endCursor}"`;
        this.getGraphQlData(ids, this.start);
      }


    });
  }

  makeHTMLDataForProductOptions(products, productURLs) {
    const that = this;
    let moreSwatch;

    Object.entries(products).forEach(([key, value]) => {
      const $targetEl = document.querySelectorAll(`.card .product-options-wrapper[data-product-id="${key}"]`);
      if ($targetEl.length > 0) {
        value.forEach(opt => {
          let innerValuesHTML = '';
          let data = opt.node;
          if (data.values?.edges?.length > 1 && data.displayStyle.toLowerCase() === 'swatch') {
            moreSwatch = data.values?.edges?.length - 4;

            data.values?.edges?.slice(0, 4).forEach(option => {
              let data = option.node;

              innerValuesHTML += `
                <li class="form-option-wrapper">
                  <a href="${productURLs[key] ? productURLs[key] : '#'}" data-product-attribute-id="${opt.node.entityId}" data-product-attribute-value="${data.entityId}" aria-label="Swatches">
                    <span class="form-option form-option-swatch">`;
              if (data.imageUrl) {
                innerValuesHTML += `<span
                  class="form-option-variant form-option-variant--color has-option-image"
                  title="${data.label}"
                  style="background: url('${data.imageUrl}') no-repeat center; background-size: contain !important;">
                </span>`;
              } else {
                data.hexColors.map((color, idx) => {
                  innerValuesHTML += `<span
                    class="form-option-variant form-option-variant--color"
                    title="${data.label}"
                    style="background-color: ${data.hexColors.length > 0 ? color : '#ddd'};">
                  </span>`;
                });
              }
              innerValuesHTML += '</span></a></li>';
            });

            let skeletonHTML = `
              <div class="product-option-type" data-option-name="${data.displayName}" data-entity-id="${data.entityId}" data-product-attribute="swatch">
                ${false ? '<label class="form-label form-label--alternate form-label--inlineSmall">${data.displayName}:</label>' : ''}
                  <ul>
                    ${innerValuesHTML}
                    ${moreSwatch > 0 ? `<li class="form-option-wrapper more-swatches">+${moreSwatch}</li>` : ''}
                  </ul>
                  
              </div>
            `.trim();
           /* to Prevent dublicate product swatch option on sort by filter */
            $($targetEl).each((i, x) => {
              if (i == 0) {
                if ($(`[data-entity-id="${data.entityId}"]`).length == 0) {
                  $(x).append(skeletonHTML);
                }
              }
            });

            $('.form-option-wrapper > a', $targetEl).on('click', function (e) {
              e.preventDefault();

              let prodId = $(this).closest('.product-options-wrapper').attr('data-product-id');
              /* add loader */
              let loadEl = $(`.product-options-wrapper[data-product-id="${prodId}"]`).siblings('.card-figure').find('.card-img-container');
              loadEl.attr('data-original-image', loadEl.find('.card-image').attr('src'));

              that.getProductRules(prodId, this.dataset.productAttributeId, this.dataset.productAttributeValue);
              $('.form-option-wrapper > a').removeClass("active");
              $(this).addClass("active");
            });
          }
        });
      }
    });
  }

  getProductRules(productId, attributeId, attributeValue) {

    let $form = document.createElement('form');
    $form.innerHTML = `
      <input type="hidden" name="action" value="add"/>
      <input type="hidden" name="product_id" value="${productId}"/>
      <input type="hidden" name="attribute[${attributeId}]" value="${attributeValue}" id="attribute_swatch"/>
      <input type="hidden" name="qty[]" value="1"/>
    `;
    utils.api.productAttributes.optionChange(productId, $($form).serialize(), 'products/bulk-discount-rates', (err, response) => {
      if (err) {
        throw new Error(err);
      }

      const $sourceToReplace = $(`.product-options-wrapper[data-product-id="${productId}"]`).parent().parent().siblings('.card-figure').find('.card-img-container');
      if (response && response.data?.image) {
        const mainImageUrl = utils.tools.imageSrcset.getSrcset(
          response.data.image.data,
          { '1x': '750x750' },
          /*
              Should match fallback image size used for the main product image in
              components/products/product-view.html
  
              Note that this will only be used as a fallback image for browsers that do not support srcset
  
              Also note that getSrcset returns a simple src string when exactly one size is provided
          */
        );
        let finalImgTag = `<img src="${mainImageUrl}" alt="${response.data.image.alt}" class="card-image lazyautosizes lazyload">`;

        if (!$sourceToReplace.attr('data-original-image')) {
          $sourceToReplace.attr('data-original-image', $sourceToReplace.find('.card-image').attr('src'));
        }
        $sourceToReplace.html(finalImgTag);
      } else if ($sourceToReplace.attr('data-original-image')) {
        let finalImgTag = `<img src="${$sourceToReplace.attr('data-original-image')}" alt="" class="card-image lazyautosizes lazyload">`;
        $sourceToReplace.html(finalImgTag);

      }
    });
  }

  fireEvents() {
    this.fetchProductsOptionsGQL();
  }
}

export default (context) => new GetProductOptions(context);
