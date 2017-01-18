
var Order = function() {
  this.dishes = [];
}
Order.prototype = {
  
  addDish: function(dish) {
    this.dishes.push(dish); 
  },

  totalPrice: function() {
    return this.dishes.reduce(function(acc, curr) { return acc + curr.price;}, 0).toFixed(2);
  },
  
  /// Returns a textual representation of all dishes in current order

  
  summary: function() {
    return this.dishes.map(function(dish) { return "<li class='liClass'>" +  dish.name + "<button class='btnClass' data-dish-name='" + dish.name + "' data-role='remove-dish'>&times;</button></li>";}, "").join(" ");
  },



  //Sorting the array
  sortIt: function() {
    return this.dishes.sort(function (a, b) { 
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
  },
  removeDish: function(dishName){
    var dishIndex = this.dishes.findIndex(function(currentDish) {
      return currentDish.name === dishName;
    }, dishName);
    this.dishes.splice(dishIndex, 1);
  },
  render: function(containerId) {
    var container = document.getElementById(containerId);
    var dishesHtml = this.summary();
    var totalPriceHtml = "<h4>Total price: " + this.totalPrice() + "</h4>";
    return container.innerHTML = "<ol>" + dishesHtml + "</ol>" + totalPriceHtml; 
  }
};

var Dish = function(name, price) {
  this.name = name;
  this.price = price;
};

Dish.prototype = {
  formattedPrice: function() {
    return "$" + this.price;
  }
  /*,

  renderToHtml: function() {
    return "<li>" +this.name + " " + this.totalPrice + "<button data-dish-name='" + this.name + "' data-role='remove-dish'>&times;</button></li>";
  }*/
};
  



//Person begin
var Person = function(firstName, phone, homeAdress, eMail, personNumber, remarks) { 
  this.firstName = firstName;
  this.phone = phone;
  this.homeAdress = homeAdress;
  this.eMail = eMail;
  this.personNumber = personNumber;
  this.remarks = remarks;
};

Person.prototype = {
  fullName: function() {
  $('modal-3').innerHTML = 
    '</br><div>First name: ' + this.firstName + '</br>' + 
    'Telephone: ' + this.phone + '</br>'+ 
    'Home adress: ' + this.homeAdress + '</br>' + 
    'Email adress: ' + this.eMail + '</br>' + 
    'Number of persons: ' + this.personNumber + '</br>' +
    'Remarks: <u>' + this.remarks + '</u></div>';
  }
};
//Person ended
var dishes = [
  new Dish("Quattro stagioni", 2),
  new Dish("Alla marinara", 3),
  new Dish("Margherita", 1.22),
  new Dish("Ai quattro formaggi", 1.39),
  new Dish("Garlic bread", 3.22),
  new Dish("French fries", 9.33),
  new Dish("Onion rings", 3.33),
  new Dish("Caprese", 2.22),
  new Dish("Chicken", 7.99),
  new Dish("Italian meats and mozzarella", 2),
  new Dish("Vegeterian", 3),
  new Dish("Hot", 7.99),
  new Dish("Garlic", 2),
  new Dish("Cheese souce", 3),
  new Dish("Black tea", 7.99),
  new Dish("Green tea", 2),
  new Dish("Black coffee", 3),
  new Dish("Cappucino", 7.99),
  new Dish("Mineral water", 2),
  new Dish("Water", 3),
  new Dish("Apple and cinnamon pie", 7.99),
  new Dish("Cookies", 2),
  new Dish("Milk shake", 3),
  new Dish("Ice cream", 7.99),
  ];


var order = new Order();

var i;
var each;
var li = document.getElementsByClassName('liClass');
var btn = document.getElementsByClassName('btnClass');
var selectedDish;
var htmlDishesSelect = document.getElementById("dishes-select");

dishes.forEach(
  function(dish) {
    var htmlOption = document.createElement("option");
    htmlOption.textContent = dish.name + ", " + dish.formattedPrice(); 
    htmlOption.value = dish.price;
    htmlDishesSelect.appendChild(htmlOption);
  }
);
window.onload = function() {
 order.render("order-data");
  
  htmlDishesSelect.addEventListener("change", function(e) {   
    //e.preventDefault();
    var dishPrice = parseFloat(e.target.value);
    var dishNameWithPrice = e.target.options[e.target.selectedIndex].innerText;  
    var dishName = dishNameWithPrice;
    //.split(",")[0]
    // TODO: use new Dish(..) here
    selectedDish = {name: dishName, price: dishPrice};    
    order.addDish(selectedDish);
    this.selectedIndex = 0;
    order.sortIt();
    
   
    order.render("order-data");
   
    });

    $("order-data").addEventListener("click", function(e) { 
        if(e.target.getAttribute("data-role") === "remove-dish") {        
          var dishName = e.target.getAttribute("data-dish-name");   
          order.removeDish(dishName);
          order.render("order-data");                      
        }            
    });

};

  function processOrder() {
    var a = document.forInfo.name.value;
    var b = document.forInfo.phone.value;
    var c = document.forInfo.homeAdress.value;
    var d = document.forInfo.eMail.value;
    var e = document.forInfo.numberOfPersons.value;
    var f = document.forRemarks.remarks.value; 

    var customers = new Person(a,b,c,d,e,f);


    
  /*
  for (var prop in customers) {
    if (customers[prop] !== '') {
        customers.fullName();
    } else {
      alert("Please enter customer information!");
      return false;
    }   
    return true;
  }
  */
  
  if ((customers.firstName !== '') && (customers.phone !== '') && (customers.homeAdress !== '') &&
   (customers.eMail !== '') && (customers.personNumber !== '') && (customers.remarks !== '')) {
        customers.fullName();
    } else {
      alert("Please enter customer information!");
      return false;
    }   
  

  /*
  for(var i in customers) {
    if(customers[i].hasOwnProperty("firstName") && customers[i].firstName === "Denis") {
     customers.fullName();
    } else {
      return false;
    }
  };
  */

}
var $ = function(id) { return document.getElementById(id); };    























































