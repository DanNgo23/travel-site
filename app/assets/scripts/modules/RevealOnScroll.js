/* this line will work as long as we have jquery within our node_modules folder */
import $ from 'jquery';
/* the waypoints package doesn't have a main file so unfortunately, */
/* we can't just type in the name of the npm package  */
/* instead, we need to manually point towards the node_modules and specify the exact file we want */
/* in order to point to our node_modules folder from within our scripts/modules/ folder, */
/* we need to go up several folders; we need to go up one folder to get out of the modules folder */
/* we need to go up a second folder to get out of the scripts folder */
/* we need to go up a third folder to get out of the assets folder */
/* we need to go up a fourth folder to get out of the app folder */
/* we need to go up four folders to get within our main travel-site folder, where node_modules lies */
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class RevealOnScroll {
    /* create two parameters to receive the two incoming arguments */
    constructor(els, offset) {
        /* this property should equal or point to the DOM elements that we want to reveal */
        this.itemsToReveal = els;
        /* create a new property to save the incoming offset parameter; we can name this anything we like */
        this.offsetPercentage = offset;
        /* we want these methods to run as soon as the page loads, so call or run the methods */
        this.hideInitially();
        this.createWaypoints();
    }
    
    /* first step is to hide the elements initially */
    hideInitially() {
        /* use jquery's addClass method and give these elements a class of reveal-item */
        /* must create a new css file to set up the styling for */
        /* this new reveal-item class that should hide the elements */
        this.itemsToReveal.addClass("reveal-item");
    }
    
    /* We had four unique feature items that we wanted to fade in independently from each other
    as they each are scrolled to.
    So if we have four feature items, we want to create four waypoints- one for each item
    and we store those four items within the this.itemsToReveal property.
    So this property is a collection of elements.
    It contains references to the four DOM elements on the page that have a class of feature-item.
    Now if we want to do something once for each element in this collection (this.itemsToReveal),
    we can use a query method named each().
    Within the new create waypoints method, we access this property (this.itemsToReveal),
    and we want to do something for each element in this collection (this.itemsToReveal)
    */
    createWaypoints() {
        var that = this;
        this.itemsToReveal.each(function() {
            /* anything we include here will run once for each element */
            /* create a waypoint for each item in this collection */
            /* When it comes to the element property, we just want to point to whichever DOM element is currently
            being looped through; and within jquery's each method, jquery sets the this keyword to point towards
            the current DOM element.           
            However we can't just type "this" after element or handler because the new Waypoint block of code is
            creating a new object.           
            And within this waypoint constructor function, the this keyword will just point towards the waypoint object.
            Outside of the constructor function, so on the line of code directly below, 
            the  this keyword still points towards the DOM object (each) that we want it to.
            */
            var currentItem = this;
            /* And now, within this constructor function, */
            /* we can set the element property to equal the currentItem variable we just created */
            new Waypoint({
                /* each waypoint object needs at least two properties */
                /* the element property is the DOM element we want to watch for as we scroll down the page */
                element: currentItem,
                /* the handler property is what we want to happen when that element is scrolled to */
                handler: function() {
                    /* what we want to happen to this element when it is scrolled to */
                    /* we want to add our css modifier class to it so that it grdually fades in to become visible */
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                /* The elements fade in very late. This is because by default, waypoints doesn't trigger its handler function
                until the very top of the element in question hits the very top of our viewport.
                But we can customize this by using the offset property to customize waypoints to trigger its handler earlier.
                The default is offset: 0 and if 0 is the very top edge of our viewpoirt, that would mean
                the very bottom of our viewport is 100.
                So if we set the offset to 100% and scroll down,
                we see they fade in as soon as they crossed the very bottom of the viewport.               
                And if we scroll down a bit further again, they fade in immediately.               
                A 100% might be a bit too early so we decide on a sweet spot ahead of time.
                Setting offset: this.offsetPercentage will not successfully access the this.offsetPercentage = offset property.
                This is because within this context the javascript this keyword is no longer pointing towards our main
                object that has a property of offsetPercentage.
                In this context this keyword is pointing towards the individual waypoint object being created.
                So what we need is a way to access our main object from within the this.offsetPercentage context.
                So what we can do is, above when are create waypoints method begins. is create a new variable and we can
                name it anything, but let's name it "that" and set it to be equal to "this" because when "var currentItem = this"
                line of code runs within this context, javascript's "this" keyword is pointing towards what we would expect.
                So now with this "that" variable in place, instead of using javascript's this keyword, we can use our
                custom "that" variable.
                
                */
                offset: that.offsetPercentage
                }); 
        });
    }
}

export default RevealOnScroll;