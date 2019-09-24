export class Toggle extends HTMLElement {
    constructor(id) {
        super();
        this.id = id;
        this.shadow = this.attachShadow({ mode: 'open' });
        this.shadow.innerHTML = `
        <div>
            <input type="checkbox" id="${id}" style="display:none"/>
            <label for="${id}" class="toggle"><span></span></label>    
        </div>
        `;

        this.checkbox = this.shadow.querySelector('input');

        let style = document.createElement('style');

        style.innerHTML = `
          .toggle {
            position: relative;
            display: block;
            width: 40px;
            height: 20px;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;
            transform: translate3d(0, 0, 0);
          }
          .toggle:before {
            content: "";
            position: relative;
            top: 3px;
            left: 3px;
            width: 34px;
            height: 14px;
            display: block;
            background: #9A9999;
            border-radius: 8px;
            transition: background 0.2s ease;
          }
          .toggle span {
            position: absolute;
            top: 0;
            left: 0;
            width: 20px;
            height: 20px;
            display: block;
            background: white;
            border-radius: 10px;
            box-shadow: 0 3px 8px rgba(154, 153, 153, 0.5);
            transition: all 0.2s ease;
          }
          .toggle span:before {
            content: "";
            position: absolute;
            display: block;
            margin: -18px;
            width: 56px;
            height: 56px;
            background: rgba(79, 46, 220, 0.5);
            border-radius: 50%;
            transform: scale(0);
            opacity: 1;
            pointer-events: none;
          }
          
          input[type=checkbox]:checked + .toggle:before {
            background: #947ADA;
          }
          input[type=checkbox]:checked + .toggle span {
            background: #4F2EDC;
            transform: translateX(20px);
            transition: all 0.2s cubic-bezier(0.8, 0.4, 0.3, 1.25), background 0.15s ease;
            box-shadow: 0 3px 8px rgba(79, 46, 220, 0.2);
          }
          input[type=checkbox]:checked + .toggle span:before {
            transform: scale(1);
            opacity: 0;
            transition: all 0.4s ease;
          }
          `;

        this.shadow.appendChild(style);
    }

    get checked() {
        return this.checkbox.checked;
    }

    addEventListener(name, callback) {
        this.checkbox.addEventListener(name, callback);
    }
}

window.customElements.define('sb-toggle', Toggle);