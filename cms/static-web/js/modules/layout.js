import service from "./service";
class MyComponent extends HTMLElement {
    constructor() {
        super();                         //  construct the original item to be extended, here it is the HTMLElement
        console.log("created");
    }




    // Fires when an instance was inserted into the document
    connectedCallback() {
        service.load().then(response=>{
            console.log("connected",response)
        })
    };

    // Fires when an instance was removed from the document
    disconnectedCallback() {
    };

    // Fires when an attribute was added, removed, or updated
    attributeChangedCallback(attr, oldVal, newVal) {
    };
}
customElements.define('my-component', MyComponent);

// customElements.define("my-component", MyComponent);
