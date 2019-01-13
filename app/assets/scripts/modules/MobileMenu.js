/* import jquery */
import $ from 'jquery';

class MobileMenu {
    /* this constructor function will run immediately when a new object is created with this class */
    constructor() {
        /* like spaghetti, this is intertwined and tangled code */
        /* the first part is selecting an element from the DOM */
        /* the second part is event handling */
        /* the third part is defining functionality */
        /* we want all parts to be in their own compartments */
        /*
        $(".site-header__menu-icon").click(function() {
           console.log("The top right icon was clicked."); 
        });
        */
        
        /* a property or shortcut that stores our DOM selection for the menu icon element */
        this.siteHeader = $(".site-header");
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $(".site-header__menu-content");
        /* if we want the browser to be listening for this event as soon as the page loads,
        /* we need to manually call the events method as soon as our object is created */
        this.events();
    }
    
    /* a new method that lists all the events we want to watch for */
    events() {
        /* here, we won't define our functionality within the () of what we want to happen */
        /* we want the this keyword in toggleTheMenu to point back to our object so we */
        /* can use it access the menuContent property */
        /* so how can we override JS's default behavior and have fine-grained control over the this keyword? */
        /* we can use a JS feature named bind(); anything we include in */
        /* the parenthesis will be used as the this keyword when the toggleTheMenu method runs */
        /* by adding bind() in this case, the this keyword will refer to an instance of our MobileMenu class */
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }
    
    /* define our functionality */
    toggleTheMenu() {
        /* chain on jquery's method named toggleClass */
        /* follow the BEM methodology and give it a specific modifier name */
        /* if without, the bind() above, the following line returns an error because */
        /* the this keyword instead equals the element that triggered the event */
        /* the toggleTheMenu method runs in response to the click event and in JS, when a function is used as an event handler, */
        /* the this key word within that function (shown below) gets set to the DOM element that the event fired from */
        /* in this case, it's the element that got clicked on; so without the bind() above, the this key word gets */
        /* set to our menuIcon element <div class="site-header__menu-icon"></div> */
        /* we want it to instead be an instance of our MobileMenu class, so we can access the menuContent property */
        /* by adding bind() above, we accomplish that */
        this.menuContent.toggleClass("site-header__menu-content--is-visible");
        
        this.siteHeader.toggleClass("site-header--is-expanded");
        this.menuIcon.toggleClass("site-header__menu-icon--close-x");
    }
}

export default MobileMenu;