import { LitElement, css, html, nothing } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { AiFillCheckSquare } from "mjo-icons/ai/AiFillCheckSquare.js";

import { FormMixin, IFormMixin } from "./mixins/form-mixin.js";
import { IInputErrorMixin, InputErrorMixin } from "./mixins/input-error.js";
import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin.js";

import "./helpers/input-helper-text.js";
import "./mjo-icon.js";

@customElement("mjo-checkbox")
export class MjoCheckbox extends ThemeMixin(InputErrorMixin(FormMixin(LitElement))) implements IThemeMixin, IInputErrorMixin, IFormMixin {
    @property({ type: String }) color: "primary" | "secondary" = "primary";
    @property({ type: Boolean, reflect: true }) checked = false;
    @property({ type: Boolean, reflect: true }) disabled = false;
    @property({ type: String }) helperText?: string;
    @property({ type: String }) label?: string;
    @property({ type: String }) name?: string;
    @property({ type: String }) value = "";
    @property({ type: String, reflect: true }) checkgroup?: string;
    @property({ type: Boolean }) hideErrors = false;

    @query("input#mjoCheckboxInput") inputElement!: HTMLInputElement;

    type = "checkbox";

    render() {
        return html` <div class="container" ?data-disabled=${this.disabled}>
            <div class="flexContainer" @click=${this.#handleClick}>
                <div class="box">
                    <div class="checkbox" ?data-checked=${this.checked}><mjo-icon src=${AiFillCheckSquare}></mjo-icon></div>
                </div>
                ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
                <input id="mjoCheckboxInput" type="checkbox" name=${ifDefined(this.name)} value=${ifDefined(this.value)} ?checked=${this.checked} />
            </div>
            ${this.helperText ? html`<input-helper-text>${this.helperText}</input-helper-text> ` : nothing}
            ${this.errormsg || this.successmsg
                ? html`<input-helper-text .errormsg=${this.errormsg} .successmsg=${this.successmsg}></input-helper-text> `
                : nothing}
        </div>`;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });
    }

    getValue() {
        return this.checked ? this.value : "";
    }

    setValue(value: string) {
        this.value = value;
    }

    #handleClick() {
        if (this.disabled) {
            return;
        }

        this.checked = !this.checked;
        this.updateFormData({ name: this.name || "", value: this.checked ? this.value || "1" : "" });
        this.dispatchEvent(new Event("change"));
    }

    static styles = [
        css`
            :host {
                display: inline-block;
                width: 200px;
            }
            .container {
                position: relative;
            }
            .container[data-disabled] {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .container[data-disabled] input-helper-text,
            .container[data-disabled] .label {
                opacity: 0.5;
            }
            .flexContainer {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                cursor: pointer;
            }
            .container[data-disabled] .flexContainer {
                cursor: not-allowed;
            }
            .box {
                position: relative;
                flex-grow: 0;
                flex-basis: auto;
            }
            .checkbox {
                position: relative;
                border: solid 2px var(--mjo-checkbox-border-color, var(--mjo-foreground-color-light, rgb(51, 51, 51)));
                border-radius: 0.2rem;
                line-height: 0;
                transition: border-color 0.3s;
            }
            mjo-icon {
                transform: scale(0);
                transition: transform 0.3s;
                font-size: 1rem;
            }
            .checkbox[data-checked] {
                color: var(--mjo-checkbox-checked-color, var(--mjo-primary-color));
                border-color: var(--mjo-checkbox-checked-border-color, var(--mjo-checkbox-checked-color, var(--mjo-primary-color)));
            }
            .checkbox[data-checked] mjo-icon {
                transform: scale(1);
            }
            .label {
                position: relative;
                display: flex;
                align-items: center;
                padding-left: 5px;
                user-select: none;
            }
            input {
                display: none;
            }
            input-helper-text {
                padding-left: calc(1rem + 9px);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-checkbox": MjoCheckbox;
    }
}
