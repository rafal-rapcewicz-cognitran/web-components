/*
    The superpower ✨ of the <template> element is that it gets pre-parsed by the HTML parser
    into a reusable content fragment. Then when rendering to the page,
    it can skip the parsing step of the expensive parse → layout → reflow loop the browser
    does when JavaScript injects content on the page.
*/
const template = document.createElement('template');
template.innerHTML = `
<style>
    label { color: green; display: block; }
    .description { 
        font-size: .65rem;
        font-weight: lighter;
        color: #777;
     }
</style>
<label>
    <input type="checkbox" />
    <slot></slot>
    <span class="description">
        <slot name="description"></slot>
    </span>
</label>`;
class TodoItem extends HTMLElement {
    constructor() {
        super();
        /*
        Shadow Roots have two modes
            open: Exposes the customElement.shadowRoot to external JavaScript
            closed: customElement.shadowRoot returns null to external JavaScript.
        */
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.append(template.content.cloneNode(true));
        this.checkbox = shadow.querySelector('input');
    }
    // only then attributeChangedCallback is called for given attributes
    static get observedAttributes() {
        return ['checked'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked')
            this.updateChacked(newValue);
    }
    // after added to DOM
    connectedCallback() {
        // testing output communication
        setTimeout(() => {
            this.dispatchEvent(new CustomEvent('onItemAdded', { detail: 'output communication test' }));
        }, 1000);
    }
    // after removed from DOM
    disconnectedCallback() { console.log('>>> disconnected'); }
    updateChacked(value) {
        this.checkbox.checked = value !== null && value !== 'false';
    }
}
customElements.define('todo-item', TodoItem);
export {};
//# sourceMappingURL=TodoItem.js.map