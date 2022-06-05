

function getSearchResults(search_value) {
   
  fetch(`Domain/search/suggest.json?q=${search_value}&resources[type]=product,article,page,collection&resources[options][unavailable_products]=last&resources[options][fields]=title,vendor,product_type,variants.title,tag&resources[options][metafield]=Metafield.description&`)
      .then((response) => {
        if (!response.ok) {
          var error = new Error(response.status);
          $(".predictive-search-wrapper.predictive-search-wrapper--drawer").addClass('content-not-found');
          this.close();
          throw error;
        }

        return response.text();
      })
      .then((text) => {
  

    
    
     const collections_data =  JSON.parse(text).resources?.results?.collections;
       var collections_html_template=collections_data.length>0?`<div class="list-container"><h3>Collections</h3>${collections_data.map((i)=>{return '<a href="'+i.url+'"><div class="main-list-box"><div class="content"><div class="title">'+i.title+'</div></div></div></a>';}).join("<br>")}</div>`:' ';
      	
    
    
       const articles_data =  JSON.parse(text).resources?.results?.articles;
       var article_html_template=articles_data.length>0?`<div class="list-container"><h3>Articles</h3>${articles_data.map((i,k)=>{return '<a href="'+i.url+'"><div class="main-list-box"><div class="leftImage"><img src="'+i.image+'" alt="'+i.title+'"/></div><div class="content"><div class="title">'+i.title+'</div></div></div></a>';}).join("<br>")}</div>`:' ';
     
      const pages_data =  JSON.parse(text).resources?.results?.pages;
       var pages_html_template=pages_data.length>0?`<div class="list-container"><h3>Pages</h3>${pages_data.map((i,k)=>{return '<a href="'+i.url+'"><div class="main-list-box"><div class="content"><div class="title">'+i.title+'</div></div></div></a>';}).join("<br>")}</div>`:' ';
      	
     
     const products_data =  JSON.parse(text).resources?.results?.products;
       var products_html_template=products_data.length>0?`<div class="list-container"><h3>Products</h3>${products_data.slice(0,4).map((i,k)=>{return '<a href="'+i.url+'"><div class="main-list-box"><div class="leftImage"><img src="'+i.image+'" alt="'+i.title+'"/></div><div class="content"><div class="title">'+i.title+'</div><div class="price-box-prod-list"><span class="price">'+i.price+' <em>'+(i.compare_at_price_max>0?i.compare_at_price_max:'')+'</em></span></div></div></div></a>';}).join("<br>")}</div>`:' ';
      	     
     $('.predictive-search-wrapper--drawer').html(products_html_template+'\n'+article_html_template+'\n'+collections_html_template+'\n'+pages_html_template);
     
       

           

      })
      .catch((error) => {
        this.close();
        throw error;
      });
  }

  const debounce = (func, wait, immediate)=> {
    var timeout;

    return function executedFunction() {
        var context = this;
        var args = arguments;
            
        var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };

        var callNow = immediate && !timeout;
        
        clearTimeout(timeout);

        timeout = setTimeout(later, wait);
        
        if (callNow) func.apply(context, args);
        };
    };

		

      $('.search-form__input').on('input', debounce(function() {
        
        const search_value =   $('.search-form__input').val();
        
        getSearchResults(search_value);
        
      }, 700)); 
