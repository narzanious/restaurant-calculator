
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

  sumCheck: function() {
    return this.dishes.map(function(dish) { return "<li class='liClass2'>" +  dish.name + "</li>";}, "").join(" ");
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
    var totalPriceHtml = "<h4>Total price: $" + this.totalPrice() + "</h4>";
    return container.innerHTML = "<ol>" + dishesHtml + "</ol>" + totalPriceHtml; 
  },
  rendCheck: function(containerId) {
    var container = document.getElementById(containerId);
    var dishesHtml = this.sumCheck();
    var totalPriceHtml = "<h4>Total price: $" + this.totalPrice() + "</h4>";
    //var fullName = this.fullName();
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
  renderPerson: function(containerId) {
    var container = document.getElementById(containerId);
    var nameHtml = this.firstName;
    var phoneHtml = this.phone;
    var addressHtml = this.homeAdress;
    var emailHtml = this.eMail;
    var qntHtml = this.personNumber;
    var remarksHtml = this.remarks;
    return container.innerHTML = 
    "</br><div>First name: " + nameHtml + "</br>" + 
    "Telephone: " + phoneHtml + "</br>"+ 
    "Home address: " + addressHtml + "</br>" + 
    "Email adress: " + emailHtml + "</br>" + 
    "Number of persons: " + qntHtml + "</br>" +
    "Remarks: " + remarksHtml + "</div>";
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
  /*
  var processOrder = function() {
    var a = document.forInfo.name.value;
    var b = document.forInfo.phone.value;
    var c = document.forInfo.homeAdress.value;
    var d = document.forInfo.eMail.value;
    var e = document.forInfo.numberOfPersons.value;
    var f = document.forRemarks.remarks.value; 
    var customers = new Person(a,b,c,d,e,f);
    customers.renderPerson("modal-3");
    order.rendCheck("modal-4");
  }
  */
    


function editNodeText(regex, input, helpId, helpMessage) {// See if the visitor entered the right information
  if (!regex.test(input)) {          // If the wrong information was entered, warn them
    if (helpId != null) 
      while (helpId.firstChild) { // Remove any warnings that may exist
        helpId.removeChild(helpId.firstChild);
      }
    helpId.appendChild(document.createTextNode(helpMessage)); // Add new warning
  return false;
  } else {          // If the right information was entered, clear the help message
    if (helpId != null) {
      while (helpId.firstChild) { // Remove any warnings that may exist 
        helpId.removeChild(helpId.firstChild);
      }
      var a = document.forInfo.name.value;
      var b = document.forInfo.phone.value;
      var c = document.forInfo.homeAdress.value;
      var d = document.forInfo.eMail.value;
      var e = document.forInfo.numberOfPersons.value;
      var f = document.forRemarks.remarks.value; 
      var customers = new Person(a,b,c,d,e,f);
      customers.renderPerson("modal-3");
      order.rendCheck("modal-4");
    return true
      }
   }   
}

function isTheFieldEmpty(inputField, helpId) {// inputField – ID Number for the html text box
// helpId – ID Number for the child node I want to print a warning in
// See if the input value contains any text
    return editNodeText(/^[A-Za-z\.\' \-]{2,15}\s?[A-Za-z\.\' \-]{2,15}\s?[A-Za-z\.\' \-]{2,15}/, inputField.value, helpId, "Please enter a valid name.");
}// inputField.value – Value typed in the html text box


function isAddressOk(inputField, helpId) {// See if the input value contains any text
    return editNodeText(/^[A-Za-z0-9\.\' \-]{5,30}$/, inputField.value, helpId, "Enter a Street (Ex.1234 Main St.)");
}

function isStateOk(inputField, helpId) {// See if the input value contains any text
    return editNodeText(/^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/,
    inputField.value, helpId, "Enter a State Code in Uppercase (Ex.NY, PA, CA)");
}

function isPhoneOk(inputField, helpId) {// See if the input value contains any text
    return editNodeText(/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/, inputField.value, helpId, "Enter a Phone Number (Ex.412-828-3000)");
}

function isEmailOk(inputField, helpId) {// See if the input value contains any text
    return editNodeText(/^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/, inputField.value, helpId, "Enter an Email (Ex. derekbanas@newthinktank.com)");
}


var $ = function(id) { return document.getElementById(id); };    






 /*
  if ((customers.firstName !== '') && (customers.phone !== '') && (customers.homeAdress !== '') && (customers.personNumber !== '')) {
        customers.fullName();
    } else {
      alert("Please enter required customer information!"); 
      return false;
    }   
  */



/*
$("buttonPersonInfo").addEventListener("click", function() { 
  if(editNodeText() === true) {        
    var a = document.forInfo.name.value;
    var b = document.forInfo.phone.value;
    var c = document.forInfo.homeAdress.value;
    var d = document.forInfo.eMail.value;
    var e = document.forInfo.numberOfPersons.value;
    var f = document.forRemarks.remarks.value; 
    var customers = new Person(a,b,c,d,e,f);
    customers.renderPerson("modal-3");
    order.rendCheck("modal-4");                     
  }            
});
*/



    /*
    var processOrder = function() {
      var a = document.forInfo.name.value;
      var b = document.forInfo.phone.value;
      var c = document.forInfo.homeAdress.value;
      var d = document.forInfo.eMail.value;
      var e = document.forInfo.numberOfPersons.value;
      var f = document.forRemarks.remarks.value; 
      var customers = new Person(a,b,c,d,e,f);
      customers.renderPerson("modal-3");
      order.rendCheck("modal-4");
    }
    */










var $ = function(id) { return document.getElementById(id); };  

































