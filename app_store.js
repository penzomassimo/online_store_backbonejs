
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
        quantity: 0
    }
});
STORE.my_constructors.models.CheckoutFormData = Backbone.Model.extend({
    initialize: function(){
        console.log('THE FORM DATA OBJECT HAS BEEN CREATED');
    },
    defaults: {
        name: 'NO NAME',
        last_name: 'NO LAST NAME',
        email: 'NO EMAIL',
        phone_number: 'NO PHONE NUMBER',
        credit_card_number: 'NO CREDIT CARD NUMBER'
    }
});

//  COLLECTIONS

//  note: we will create three catalogs (man, woman, kid)
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
        'click .add': 'addToBag',
        'click .quick_view': 'showQuickView'
    },
    addToBag: function(){
        //this.$el.fadeTo( "slow" , 0.5, function() {});
        if (STORE.my_objects.collections.myBag.contains(this.model)){
            /*increase quantity property*/
            var index = _.indexOf(STORE.my_objects.collections.myBag.models, this.model);
            var prevQTY = STORE.my_objects.collections.myBag.models[index].get('quantity');
            var newQTY = prevQTY + 1;
            STORE.my_objects.collections.myBag.models[index].set('quantity',newQTY);
            console.log('the product is already in the bag');
        } else {
            STORE.my_objects.collections.myBag.add([this.model]);
            var index = _.indexOf(STORE.my_objects.collections.myBag.models, this.model);
            var prevQTY = STORE.my_objects.collections.myBag.models[index].get('quantity');
            var newQTY = prevQTY + 1;
            STORE.my_objects.collections.myBag.models[index].set('quantity',newQTY);
            console.log('A new product has been added to the Bag');
        }
        STORE.my_objects.views.BagSummary.$el.html('');
        STORE.my_objects.views.BagSummary.render();
    },
    showQuickView: function(){
        STORE.my_objects.views.Quick_view = new STORE.my_constructors.views.QuickLook(
            {
                el: '#quick',
                model: this.model
            }
        );
        console.log('QUICK VIEW HAS BEEN ACTIVATED');
    }
});
STORE.my_constructors.views.QuickLook = Backbone.View.extend({
    initialize: function(){
        this.render();
    },
    template: _.template($("#quick_view_template").html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }/*,
     events: {
     'mouseover .zoom': 'startMagnifier'
     },
     startMagnifier: function(){
     $('.zoom').okzoom({
     width: 250,
     height: 250,
     round: true,
     background: "#000000",
     backgroundRepeat: "no-repeat",
     shadow: "0 0 0px #000",
     border: "1px solid black"
     });
     }*/
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
        this.$el.html('<p>hello test</p> <p>hello test</p>');
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
STORE.my_constructors.views.CheckoutForm = Backbone.View.extend({
    el: '#shopping_container',
    initialize: function(){
        this.render();
    },
    template: _.template($("#checkout_form_template").html()),
    render: function(){
        this.$el.html(this.template);
        return this;
    },
    events: {
        'click #order_btn': 'sendOrderData'
    },
    sendOrderData: function(){
        STORE.my_objects.models.FormData.set(
            {
                name: $("[name='name']").val(),
                last_name: $("[name='lastname']").val(),
                email: $("[name='email']").val(),
                phone_number: $("[name='phone']").val(),
                credit_card_number: $("[name='creditcard']").val()
            }
        );
        var purchase_order = {
            customer: STORE.my_objects.models.FormData,
            products: STORE.my_objects.collections.myBag
        };
        console.log(JSON.stringify(STORE.my_objects.models.FormData.toJSON()));
        $.ajax(
            {
                url:"http://localhost:8080/max/webapi/storeRESTendpoint/send_email",
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                data: JSON.stringify(purchase_order)
            }
        );
        this.$el.html('Your order has been placed');
        /*STORE.my_objects.views.BagSummary.render();*/
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
        "check": "handleRoute5",
        '*path':  'handleRoute1' // this is the default route
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

        L.tileLayer('http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png',
            {
                attribution: '',
                subdomains: 'abcd',
                minZoom: 0,
                maxZoom: 20
            }
        ).addTo(STORE.my_objects.map);

        L.marker([51.5, -0.09]).addTo(STORE.my_objects.map);
        L.marker([52.0, -0.20]).addTo(STORE.my_objects.map);
        L.marker([51.0, -0.20]).addTo(STORE.my_objects.map);

        console.log('route stores working');
    },
    handleRoute5: function(){
        console.log('route checkout working');
        //  GET request
        var request1 = $.ajax("http://localhost:8080/max/webapi/storeRESTendpoint/man_catalog");
        request1.done(function(){
            console.log('Request 1 Completed');
            STORE.my_objects.views.Checkout = new STORE.my_constructors.views.CheckoutForm();
        });
        //  POST request
        var data_test = JSON.stringify(STORE.my_objects.collections.myBag.toJSON());
        console.log(data_test);
        var request2 = $.ajax(
            {
                url:"http://api.openweathermap.org/data/2.5/forecast/city?id=2172797&APPID=1111111111",
                type: 'POST',
                data: data_test
            }
        );
        request2.done(function(){
            console.log('Request 2 Completed');
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

//  creating the bag
STORE.my_objects.collections.myBag = new STORE.my_constructors.collections.Bag;

//  creating the man, woman and kid catalogs collections
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


STORE.my_objects.views.BagSummary = new STORE.my_constructors.views.ShoppingCartSummary;

//  creating the form data object
STORE.my_objects.models.FormData = new STORE.my_constructors.models.CheckoutFormData;

console.log(_.size(STORE.my_objects.collections.Man_Catalog));
console.log(_.size(STORE.my_objects.collections.Woman_Catalog));
console.log(_.size(STORE.my_objects.collections.Kid_Catalog));

console.log(_.size(STORE.my_objects.collections.myBag));


STORE.my_objects.router.StoreRouter = new STORE.my_constructors.router.AppRouter;
Backbone.history.start(); //    this line is necessary for the router to work


var isa = $.ajax(
    {
        url:"http://localhost:8080/max/webapi/storeRESTendpoint/man_catalog",
        type: 'GET',
        dataType: 'json', // the type of data you are expecting from the server
        data: {                 //  parameters to be sent with the request
            name : "The name",
            desc : "The description"
        }
    }
);



isa.done(function(data){
    STORE.my_objects.collections.TESTCAT = new STORE.my_constructors.collections.Catalog();
    STORE.my_objects.collections.TESTCAT.add(data);
    console.log(data);
});

isa.done(function(data){
    STORE.my_objects.collections.Man_Catalog.add(data);
    console.log(data);
});


//GEOLOCATION TEST
/*
 if ("geolocation" in navigator) {
 console.log('we have geolocation services');
 */
/* geolocation is available *//*

 } else {
 console.log('no geo');
 }
 navigator.geolocation.getCurrentPosition(success, error);
 function success(position) {
 var latitude  = position.coords.latitude;
 var longitude = position.coords.longitude;
 console.log('Latitude is ' + latitude + '° Longitude is ' + longitude + '°');
 };
 function error() {
 console.log('unable to find coordinates');
 };*/
