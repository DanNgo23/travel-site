import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        /* select all elements on the page that have a class of "lazyload" */
        this.lazyImages = $(".lazyload");
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        /* we want this Waypoint to be created as soon as the page loads */
        /* so we call and run the method */
        this.createHeaderWaypoint();
        /* create a new property that is a collection of all our page section elements */
        /* all those page section divs have a class of page-section */
        /* use a jquery selector that grabs an elements with a class of page-section */
        this.pageSections = $(".page-section");
        /* create a new property that stores all of the header links */
        /* look inside the primary nav element and grab any and all link elements */
        this.headerLinks = $(".primary-nav a");
        /* we want to create the waypoints as soon as the page is loaded */
        /* so we will call the method in our constructor function */
        this.createPageSectionWaypoints();
        /* run this method as soon as the page loads */
        this.addSmoothScrolling();
        this.refreshWaypoints();
        
    }
    
    /* tell Waypoints to refresh its measurements everytime a new image is lazy loaded */
    /* this will stop waypoints from firing too early when implementing lazyloading */
    refreshWaypoints() {
        /* the jquery on() method takes two arguments */
        /* the first argument is the event we want to be on the lookout for */
        /* the second argument is what we want to do, e.g. supply an anonymous function */
        this.lazyImages.on('load', function() {
           /* access the main Waypoint object and it has a method refreshAll() */
           Waypoint.refreshAll();
        });
    }
    
    /* when we click on any of the top header links, over the course of a third of a second, */
    /* the browser automatically smoothly scrolls to that section */
    /* create a method to enable smooth scrolling */
    addSmoothScrolling() {
        /* call the smooth scroll library on each of the header links */
        this.headerLinks.smoothScroll();
    }
    
    createHeaderWaypoint() {
        var that = this;
        new Waypoint ({
            /* we want to give this waypoint object a few properties */
            /* which element on the page do we want to be our trigger */
            /* as we're scrolling down, as the trigger element hits the top of our viewport, */
            /* that's our cue to make our header background darker */
            /* waypoints is expecting a JS native DOM element but currently we are passing it a jquery object */
            /* we can access the native DOM element within a jquery object using [0] */
            /* this works because the first item in a jquery array-like object is */
            /* always a pointer to the native DOM element */
            element: this.headerTriggerElement[0],
            /* what do we want to happen when our trigger element gets scrolled to */
            /* add a modifier class to the page header so we can style it to use a darker background */
            handler: function(direction) {
                /* within this context, the this keyword is no longer pointing */
                /* towards our class createHeaderWaypoint or an instance of our class */
                /* this means we cannot use the this keyword to try and access the siteHeader property */
                /* an easy way to fix this is right when the createHeaderWaypoint() method begins, */
                /* we create a variable named "that" and say it equals the this keyword because */
                /* when the line of code "var that = this" runs, within this context, */
                /* the this keyword is pointing towards our main class or an instance of our class */
                /* need to go into the css file and create a new rule that targets our --dark modifier class */
                if (direction == "down") {
                    /* when we scroll down, we want to add the modifier class */
                    that.siteHeader.addClass("site-header--dark");
                } else {
                    /* when we scroll up, we want to remove the modifier class */
                    that.siteHeader.removeClass("site-header--dark");
                }
            }
        });
    }
    
    /* create a new method that creates a waypoint for each element or item in the this.pageSections collection */
    createPageSectionWaypoints() {
        var that = this;
        /* we want to do something for each element or item in the this.pageSections collection */
        /* use jquery's each method to loop through the collection */
        this.pageSections.each(function() {
            /* within this anonymous function, we want to create a new Waypoint for each page section */
            var currentPageSection = this;
            new Waypoint({
                /* give each waypoint a few properties */
                /* we want to set the element property to the page section div that we have currently looped to */
                /* and within the each method, jquery sets the javascript "this" keyword to point towards */
                /* the DOM element from our collection this.pageSections that is currently being looped to */
                /* so above the new Waypoint code, we created a new variable that equals the this keyword */
                /* so now within our waypoint code, we can set the element property to that variable */
                element: currentPageSection,
                /* so what do we want to happen when a page section gets scrolled to? */
                /* we want to use our custom data attribute from our html file as a jqery selector to */
                /* target the matching header link so we can give it a yellow modifier class */
                handler: function(direction) {
                    /* a waypoint will only be triggered when scrolling down */
                    if (direction == "down") {
                        /* extract the custom data attribute */
                        /* we access the current page section div- currentPageSection */
                        /* and to select the attribute, we use the javascript method getAttribute() */
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        /* first reset things by removing the is-current-link class from any and all header links */
                        /* when we scroll to a page section, this line of code will give us a clean slate */
                        /* so nothing in the header is highlighted orange */
                        /* and the line below that highlights only the current section */
                        /* this ensures only the current section header link is to be lit up */
                        /* within this handler function, the this keyword is not pointing towards our main class or object */
                        /* so using the this keyword below will not successfully access the headerLinks property */
                        /* what we do is when this createPageSectionWaypoints() method begins, */
                        /* we create a variable "that" which equals our this keyword */
                        /* in the above context, "this" will point towards our class object and we name that variable "that" */
                        /* so instead of "this", we use our "that" variable */
                        that.headerLinks.removeClass("is-current-link");
                        /* use the above variable as a jquery selector */
                        /* e.g. $(matchingHeaderLink) will be "#features-link" */
                        /* we must write some css so the "is-current-link" class makes the links yellow/orange */
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                /* customize how early or late in the scroll a waypoint is triggered */
                /* by default, offset is set to 0, being the very top edge of the viewport */
                /* if we want these wayports to be triggered earlier, we use a percentage */
                /* this way, as we scroll down the page, when the top of the page section is */
                /* x% from the top of the screen, instead of being at the top of the screen, */
                /* the waypoint will be triggered */
                offset: "18%"
            });
            
            new Waypoint({
                /* give each waypoint a few properties */
                /* we want to set the element property to the page section div that we have currently looped to */
                /* and within the each method, jquery sets the javascript "this" keyword to point towards */
                /* the DOM element from our collection this.pageSections that is currently being looped to */
                /* so above the new Waypoint code, we created a new variable that equals the this keyword */
                /* so now within our waypoint code, we can set the element property to that variable */
                element: currentPageSection,
                /* so what do we want to happen when a page section gets scrolled to? */
                /* we want to use our custom data attribute from our html file as a jqery selector to */
                /* target the matching header link so we can give it a yellow modifier class */
                handler: function(direction) {
                    /* a waypoint will only be triggered when scrolling up */
                    if (direction == "up") {
                        /* extract the custom data attribute */
                        /* we access the current page section div- currentPageSection */
                        /* and to select the attribute, we use the javascript method getAttribute() */
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        /* first reset things by removing the is-current-link class from any and all header links */
                        /* when we scroll to a page section, this line of code will give us a clean slate */
                        /* so nothing in the header is highlighted orange */
                        /* and the line below that highlights only the current section */
                        /* this ensures only the current section header link is to be lit up */
                        /* within this handler function, the this keyword is not pointing towards our main class or object */
                        /* so using the this keyword below will not successfully access the headerLinks property */
                        /* what we do is when this createPageSectionWaypoints() method begins, */
                        /* we create a variable "that" which equals our this keyword */
                        /* in the above context, "this" will point towards our class object and we name that variable "that" */
                        /* so instead of "this", we use our "that" variable */
                        that.headerLinks.removeClass("is-current-link");
                        /* use the above variable as a jquery selector */
                        /* e.g. $(matchingHeaderLink) will be "#features-link" */
                        /* we must write some css so the "is-current-link" class makes the links yellow/orange */
                        $(matchingHeaderLink).addClass("is-current-link");
                    }
                },
                /* customize how early or late in the scroll a waypoint is triggered */
                /* by default, offset is set to 0, being the very top edge of the viewport */
                /* if we want these wayports to be triggered earlier, we use a percentage */
                /* this way, as we scroll down the page, when the top of the page section is */
                /* x% from the top of the screen, instead of being at the top of the screen, */
                /* the waypoint will be triggered */
                
                /* so now when we scroll back up, the next section will be switched to current section much earlier */
                /* the idea is whichever section is taking up the majority of the screen, */
                /* should probably be considered the current section */
                offset: "-40%"
            });
        });
    }
}

export default StickyHeader;