
//  DEFINING NAMESPACE FOR THE APP
var STORE = {
    my_constructors: {
        models: {},
        collections: {},
        views: {},
        router: {}
    },
    my_objects: {
        models: {},
        collections: {},
        views: {},
        router: {}
    }
};


//  DEFINING CONSTRUCTORS FOR THE APP

//  MODELS
STORE.my_constructors.models.Product = Backbone.Model.extend({
    initialize: function(){
        console.log('A new product has been created');
    },
    defaults: {
        name: 'NO NAME',
        description: 'NO DESCRIPTION',
        price: 'NO PRICE',
        category: 'NO CATEGORY', //  men, woman, kid
        quantity: 1
    }
});

//  COLLECTIONS

//  note: we will create three catalog (man, woman, kid)
STORE.my_constructors.collections.Catalog = Backbone.Collection.extend({
    model: STORE.my_constructors.models.Product,
    initialize: function(){
        console.log('A new list of products has been created')
    }
});

STORE.my_constructors.collections.Bag = Backbone.Collection.extend({
    model: STORE.my_constructors.models.Product,
    initialize: function(){
        console.log('The Bag has been created');
        //  adding event listeners
        this.on('add', this.refresh);
    },
    refresh: function(){
        console.log('the has been refreshed');
    }
});

//  VIEWS
STORE.my_constructors.views.CatalogContainer = Backbone.View.extend({

    initialize: function(){
        console.log('The product list view has been initialized');
    },
    render: function() {
        _.each(this.collection.models, function(item){
            console.log(item.toJSON());
            var itemView = new STORE.my_constructors.views.SingleProduct({model: item});
            this.$el.append(itemView.render().el);
        }, this);
    }
});

STORE.my_constructors.views.SingleProduct = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    template: _.template($("#product_template").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click' : 'addToBag'
    },
    addToBag: function(){
        console.log('I have been added to the cart');
        STORE.my_objects.collections.myBag.add([this.model]);
        STORE.my_objects.views.BagSummary.$el.html('');
        STORE.my_objects.views.BagSummary.render();
    }
});

STORE.my_constructors.views.ShoppingCartSummary = Backbone.View.extend({
    el: '#shopping_container',
    initialize: function(){
        console.log('THE SHOPPING CART SUMMARY AREA VIEW HAS BEEN INITIALIZED');
        //this.collection = STORE.my_objects.collections.myBag;
        //this.render();
    },
    render: function() {
        _.each(STORE.my_objects.collections.myBag.models, function(item){
            console.log(item.toJSON());
            var itemView = new STORE.my_constructors.views.ShoppingCartItem({model: item});
            this.$el.append(itemView.render().el);
        }, this);
    }
});

STORE.my_constructors.views.ShoppingCartItem = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    template: _.template($("#bag_item").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    events: {
        'click .remove_item': 'removeItem',
        'click .bag_item_name': 'increaseQty'
    },
    removeItem: function(){
        this.$el.fadeOut(500, function(){
            $(this).remove();
        });
        console.log(STORE.my_objects.collections.myBag.toJSON());
        STORE.my_objects.collections.myBag.remove(this.model);
        console.log('ELEMENT REMOVED');
        console.log(STORE.my_objects.collections.myBag.toJSON());
    },
    increaseQty: function(){
        console.log('qty increased');   //TODO this still needs some work.
    }
});

STORE.my_constructors.views.TestView = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    render: function(){
        this.$el.html('<p class="animated bounceInLeft">hello test</p> <p class="animated bounceInLeft">hello test</p>');
        return this;
    }
});

STORE.my_constructors.views.Map = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    template: _.template($("#map_template").html()),
    render: function(){

        this.$el.html(this.template);
    }
});

//  ROUTER
STORE.my_constructors.router.AppRouter = Backbone.Router.extend({
    routes: {
        "home": "handleRoute0",
        "man": "handleRoute1",
        "woman": "handleRoute2",
        "kid": "handleRoute3",
        "stores": "handleRoute4",
        "check": "handleRoute5"
    },
    handleRoute0: function(){
        console.log('route home working');
    },
    handleRoute1: function(){
        STORE.my_objects.views.Man_CatalogContainer = new STORE.my_constructors.views.CatalogContainer(
            {
                el: '#right',
                collection: STORE.my_objects.collections.Man_Catalog
            }
        );
        STORE.my_objects.views.Man_CatalogContainer.$el.html('');
        STORE.my_objects.views.Man_CatalogContainer.render();
        console.log('route man working');
    },
    handleRoute2: function(){
        STORE.my_objects.views.Woman_CatalogContainer = new STORE.my_constructors.views.CatalogContainer(
            {
                el: '#right',
                collection: STORE.my_objects.collections.Woman_Catalog
            }
        );
        STORE.my_objects.views.Woman_CatalogContainer.$el.html('');
        STORE.my_objects.views.Woman_CatalogContainer.render();
        console.log('route woman working');
    },
    handleRoute3: function(){
        STORE.my_objects.views.Kid_CatalogContainer = new STORE.my_constructors.views.CatalogContainer(
            {
                el: '#right',
                collection: STORE.my_objects.collections.Kid_Catalog
            }
        );
        STORE.my_objects.views.Kid_CatalogContainer.$el.html('');
        STORE.my_objects.views.Kid_CatalogContainer.render();
        console.log('route kid working');
    },
    handleRoute4: function(){
        STORE.my_objects.views.myMap = new STORE.my_constructors.views.Map({el: '#right'});
        STORE.my_objects.map = L.map('map').setView([51.505, -0.09], 8);
        var Stamen_TonerLite = L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png', {
            attribution: '',
            subdomains: 'abcd',
            minZoom: 0,
            maxZoom: 20
        }).addTo(STORE.my_objects.map);
        L.marker([51.5, -0.09]).addTo(STORE.my_objects.map);
        L.marker([52.0, -0.20]).addTo(STORE.my_objects.map);
        L.marker([51.0, -0.20]).addTo(STORE.my_objects.map);

        console.log('route stores working');
    },
    handleRoute5: function(){
        console.log('route checkout working');
        var request = $.ajax("http://api.openweathermap.org/data/2.5/forecast/city?id=2172797&APPID=1111111111");
        request.done(function(){
            console.log('Weather Request Completed');
            STORE.my_objects.views.Checkout = new STORE.my_constructors.views.TestView({el: '#shopping_container'});
        });
    }
});



// some products for the catalog
STORE.my_objects.models.item1 = new STORE.my_constructors.models.Product({name: 'shirt1', description: 'desc1', price: 10});
STORE.my_objects.models.item2 = new STORE.my_constructors.models.Product({name: 'shirt2', description: 'desc2', price: 20});
STORE.my_objects.models.item3 = new STORE.my_constructors.models.Product({name: 'shirt3', description: 'desc3', price: 30});
STORE.my_objects.models.item4 = new STORE.my_constructors.models.Product({name: 'shirt4', description: 'desc4', price: 40});
STORE.my_objects.models.item5 = new STORE.my_constructors.models.Product({name: 'shirt5', description: 'desc5', price: 50});
STORE.my_objects.models.item6 = new STORE.my_constructors.models.Product({name: 'shirt6', description: 'desc6', price: 60});


STORE.my_objects.models.item7 = new STORE.my_constructors.models.Product({name: 'shirt7', description: 'desc7', price: 70});
STORE.my_objects.models.item8 = new STORE.my_constructors.models.Product({name: 'shirt8', description: 'desc8', price: 80});
STORE.my_objects.models.item9 = new STORE.my_constructors.models.Product({name: 'shirt9', description: 'desc9', price: 90});
STORE.my_objects.models.item10 = new STORE.my_constructors.models.Product({name: 'shirt10', description: 'desc10', price: 100});
STORE.my_objects.models.item11 = new STORE.my_constructors.models.Product({name: 'shirt11', description: 'desc11', price: 110});

//  creating the catalog of products
/*
STORE.my_objects.collections.ProductCatalog = new STORE.my_constructors.collections.Catalog();
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item1]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item2]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item3]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item4]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item5]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item6]);
*/
/*
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item7]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item8]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item9]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item10]);
STORE.my_objects.collections.ProductCatalog.add([STORE.my_objects.models.item11]);
*/

//  creating the bag
STORE.my_objects.collections.myBag = new STORE.my_constructors.collections.Bag;
/*
 STORE.my_objects.collections.myBag.add([STORE.my_objects.models.item1]);
 STORE.my_objects.collections.myBag.add([STORE.my_objects.models.item2]);
 */


//  creating the man, woman and kid catalogs
STORE.my_objects.collections.Man_Catalog = new STORE.my_constructors.collections.Catalog();
STORE.my_objects.collections.Woman_Catalog = new STORE.my_constructors.collections.Catalog();
STORE.my_objects.collections.Kid_Catalog = new STORE.my_constructors.collections.Catalog();

//  populating the catalogs
STORE.my_objects.collections.Man_Catalog.add([
    STORE.my_objects.models.item1,
    STORE.my_objects.models.item2,
    STORE.my_objects.models.item3,

]);
STORE.my_objects.collections.Woman_Catalog.add([
    STORE.my_objects.models.item4,
    STORE.my_objects.models.item5
]);
STORE.my_objects.collections.Kid_Catalog.add([
    STORE.my_objects.models.item6,
    STORE.my_objects.models.item7,
    STORE.my_objects.models.item8,
    STORE.my_objects.models.item9,
    STORE.my_objects.models.item10
]);



/*
STORE.my_objects.views.Woman_CatalogContainer = new STORE.my_constructors.views.CatalogContainer({collection: STORE.my_objects.collections.Woman_Catalog});
STORE.my_objects.views.Kid_CatalogContainer = new STORE.my_constructors.views.CatalogContainer({collection: STORE.my_objects.collections.Kid_Catalog});
*/

/*STORE.my_objects.views.Man_CatalogContainer.render();*/
/*
STORE.my_objects.views.Woman_CatalogContainer.render();
STORE.my_objects.views.Kid_CatalogContainer.render();
*/

/*STORE.my_objects.views.CatalogContainer.render();*/
//STORE.my_objects.views.SingleProduct = new STORE.my_constructors.views.SingleProduct(); //TODO test if we can remove this line, I am also instantiating during render();
STORE.my_objects.views.BagSummary = new STORE.my_constructors.views.ShoppingCartSummary;

/*STORE.my_objects.views.BagTotals = new STORE.my_constructors.views.Total();*/

console.log(_.size(STORE.my_objects.collections.Man_Catalog));
console.log(_.size(STORE.my_objects.collections.Woman_Catalog));
console.log(_.size(STORE.my_objects.collections.Kid_Catalog));

console.log(_.size(STORE.my_objects.collections.myBag));


STORE.my_objects.router.StoreRouter = new STORE.my_constructors.router.AppRouter;
Backbone.history.start(); //    this line is necessary for the router to work





/*// instantiating the bag
 STORE.my_objects.collections.myBag = new STORE.my_constructors.collections.Bag;
 STORE.my_objects.collections.myBag.add([STORE.my_objects.models.item1]);
 STORE.my_objects.collections.myBag.add([STORE.my_objects.models.item2]);
 STORE.my_objects.collections.myBag.add([STORE.my_objects.models.item3]);*/








/*
 STORE.shop = new STORE.views.ShoppingCartSummary();
 STORE.shop.render();

 STORE.cart2 = new STORE.views.ShoppingCartItem();
 STORE.cart2.render();

 STORE.views.cart_product_view = Backbone.View.extend({

 tagName: 'li',
 initialize: function(){
 console.log('The cart_product_view view has been initialized');
 this.render();
 },
 template: _.template("<p>massimo</p>"),
 render: function(){
 console.log('Product View Render STARTED');
 this.$el.html(this.template);
 console.log('Product View Render FINISHED');
 return this;
 }
 });


 *//*

 /*here I am creating a few product so we can then create a collection and add them to it*//*



 here I am creating the collection mentioned before that is going to filled with the above products

 STORE.list = new STORE.collections.product_list;

 here I am creating the shopping cart collection which will hold all the clicked elements from the catalog

 STORE.CART = new STORE.collections.shopping_cart;

 STORE.list.add(STORE.item1);
 STORE.list.add(STORE.item2);
 STORE.list.add(STORE.item3);
 STORE.list.add(STORE.item4);
 STORE.list.add(STORE.item5);

 STORE.catalog = new STORE.views.product_list();
 STORE.catalog.render();

 STORE.test_products = [
 { title: 'Bacon', price: 2.99 },
 { title: 'Cabbage' },
 { title: 'Spinach', price: 1.40 },
 { title: 'Salt', price: 0.88 },
 { title: 'Bread' },
 { title: 'Butter', price : 1.99 },
 { title: 'Bread', price : 5.99 }
 ];
 */