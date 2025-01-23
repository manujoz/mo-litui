import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { IThemeMixin, ThemeMixin } from "./mixins/theme-mixin";

@customElement("mjo-typography")
export class MjoTypography extends ThemeMixin(LitElement) implements IThemeMixin {
    @property({ type: String }) tag: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "none" = "p";
    @property({ type: String }) size: "heading1" | "heading2" | "heading3" | "base" | "body1" | "body2" | "body3" = "base";
    @property({ type: String }) weight: "light" | "regular" | "medium" | "bold" = "regular";

    render() {
        switch (this.tag) {
            case "h1":
                return html`<h1 class=${`${this.size} ${this.weight}`}><slot></slot></h1>`;
            case "h2":
                return html`<h2 class=${`${this.size} ${this.weight}`}><slot></slot></h2>`;
            case "h3":
                return html`<h3 class=${`${this.size} ${this.weight}`}><slot></slot></h3>`;
            case "h4":
                return html`<h4 class=${`${this.size} ${this.weight}`}><slot></slot></h4>`;
            case "h5":
                return html`<h5 class=${`${this.size} ${this.weight}`}><slot></slot></h5>`;
            case "span":
                return html`<span class=${`${this.size} ${this.weight}`}><slot></slot></span>`;
            case "p":
                return html`<p class=${`${this.size} ${this.weight}`}><slot></slot></p>`;
            default:
                return html`<slot></slot>`;
        }
    }

    static styles = [
        css`
            :host {
                display: block;
                margin: 0.5em 0;
            }
            :host([tag="span"]),
            :host([tag="none"]) {
                margin: 0;
                display: inline;
            }
            :host([tag="none"]) {
                line-height: calc(1em + 6px);
            }
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            span {
                padding: 0;
                margin: 0;
            }
            .heading1 {
                font-size: var(--mjo-typography-h1-font-size, 2em);
                line-height: var(--mjo-typography-h1-line-height, calc(1em + 6px));
            }
            .heading2 {
                font-size: var(--mjo-typography-h2-font-size, 1.5em);
                line-height: var(--mjo-typography-h2-line-height, calc(1em + 6px));
            }
            .heading3 {
                font-size: var(--mjo-typography-h3-font-size, 1.25em);
                line-height: var(--mjo-typography-h3-line-height, calc(1em + 6px));
            }
            .base {
                font-size: var(--mjo-typography-base-font-size, 1em);
                line-height: var(--mjo-typography-base-line-height, calc(1em + 6px));
            }
            .body1 {
                font-size: var(--mjo-typography-body1-font-size, 0.875em);
                line-height: var(--mjo-typography-body1-line-height, calc(1em + 6px));
            }
            .body2 {
                font-size: var(--mjo-typography-body2-font-size, 0.75em);
                line-height: var(--mjo-typography-body2-line-height, calc(1em + 6px));
            }
            .body3 {
                font-size: var(--mjo-typography-body3-font-size, 0.625em);
                line-height: var(--mjo-typography-body3-line-height, calc(1em + 6px));
            }
            .light {
                font-weight: var(--mjo-typography-font-weight-light, 300);
            }
            .regular {
                font-weight: var(--mjo-typography-font-weight-regular, 400);
            }
            .medium {
                font-weight: var(--mjo-typography-font-weight-medium, 500);
            }
            .bold {
                font-weight: var(--mjo-typography-font-weight-bold, 700);
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "mjo-typography": MjoTypography;
    }
}
