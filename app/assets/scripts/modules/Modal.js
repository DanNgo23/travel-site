/* when we click the "Get in Touch" button, our modal overlay is revealed */

import $ from 'jquery';

class Modal {
    constructor() {
        /* select all DOM elements we will need to work with */
        /* use jquery to select that element */
        /* this is the button */
        this.openModalButton = $(".open-modal");
        /* this is the modal we want to reveal */
        this.modal = $(".modal");
        /* this is the top right X or close button */
        this.closeModalButton = $(".modal__close");
        /* we want to listen for the events as soon as the page loads, so we call the events method */
        this.events();
    }
    
    events() {
        // if user clicks the open modal button, call our openModal() method
        this.openModalButton.click(this.openModal.bind(this));
        // if user clicks the x close modal button, call our closeModal() method
        this.closeModalButton.click(this.closeModal.bind(this));
        /* user pushes any key on the keyboard, call our keyPressHandler() method */
        /* use jquery to select the overall document (the entire page) */
        /* and the jquery method keyup(), which will fire when the user let's go of the key */
        $(document).keyup(this.keyPressHandler.bind(this));
    }
    
    keyPressHandler(e) {
        /* only if it was the escape key do we want to call our closeModal() method */
        /* key code for the escape key is 27 */
        if (e.keyCode == 27) {
            /* when this line of code runs, */
            /* however, the javascript this keyword will not be set to our main object or class */
            /* it will be set to the element that called the keyup() method, */
            /* which would be the overall document or page */
            /* however, we can control the this keyword with bind() in our event handler, */
            /* and letting the this keyword keep its current value - .bind(this) */
            this.closeModal();
        }
    }
    
    openModal() {
        /* when the below line of code runs, the javascript key word will no longer be pointing */
        /* pointing towards our main class or object, meaning we won't be able to access */
        /* the modal property by using the "this" keyword */
        /* this is because we are not running the method directly */
        /* instead, the method is being called by the event handlers above */
        /* so by the time the method actually runs, javascript's this keyword will have been */
        /* reset to the element that was just clicked on */
        /* HOWEVER, we can have fine-grained control over what the this keyword gets set to by using bind() */
        /* within the event handler above, after we call the method we want to run, */
        /* we add .bind(this), wanting the this key word to stay to what it's currently set to */
        /* that way, when the openModal() method actually runs, the this keyword is still pointing */
        /* towards our main object or class so we can access a property */
        /* we want to be sure that we also use bind when we run the closeModal() method */
        
        this.modal.addClass("modal--is-visible");
        /* we include return false because the header "Get in Touch " button is a link element */
        /* and if we click a link element that has a href value of just #, */
        /* the browser automatically scrolls to the top of the page, which we do not want */
        /* return false will prevent that default behavior of scrolling up */
        return false
    }
    
    closeModal() {
        this.modal.removeClass("modal--is-visible");
    }
}

export default Modal;