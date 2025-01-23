import { MessageTypes } from "../../types/mjo-message";

import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { AiFillCheckCircle } from "mjo-icons/ai/AiFillCheckCircle.js";
import { AiFillCloseCircle } from "mjo-icons/ai/AiFillCloseCircle.js";
import { AiFillInfoCircle } from "mjo-icons/ai/AiFillInfoCircle.js";
import { AiFillWarning } from "mjo-icons/ai/AiFillWarning.js";

@customElement("message-item")
export class MessageItem extends LitElement {
    @property({ type: String }) message = "";
    @property({ type: String }) type: MessageTypes = "info";
    @property({ type: Number }) time = 3000;

    timeOut?: NodeJS.Timeout;
    removing = false;

    render() {
        return html`
            <div class="icon" data-type=${this.type}>
                <mjo-icon
                    src=${this.type === "info"
                        ? AiFillInfoCircle
                        : this.type === "warning"
                          ? AiFillWarning
                          : this.type === "error"
                            ? AiFillCloseCircle
                            : AiFillCheckCircle}
                ></mjo-icon>
            </div>
            <div class="message">${this.message}</div>
        `;
    }

    connectedCallback(): void {
        super.connectedCallback();

        this.timeOut = setTimeout(() => {
            this.removeMessage();
        }, this.time);
    }

    removeMessage() {
        if (this.removing) return;

        clearTimeout(this.timeOut!);
        this.removing = true;

        const marginTop = window.getComputedStyle(this).marginTop;

        this.style.animation = "none";
        this.style.opacity = "1";
        this.style.marginTop = marginTop;
        this.style.transition = "margin 0.5s, opacity 0.3s";

        setTimeout(() => {
            this.style.opacity = "0";
            this.style.marginTop = `-${this.offsetHeight}px`;
        }, 20);

        setTimeout(() => {
            this.dispatchEvent(new CustomEvent("remove"));
            this.remove();
        }, 520);
    }

    static styles = [
        css`
            :host {
                display: flex;
                flex: 0 1 auto;
                gap: 7px;
                background-color: var(--mjo-message-background-color, var(--mjo-background-color-low, #ffffff));
                box-shadow: var(--mjo-message-box-shadow, var(--mjo-box-shadow-2, 0 0 10px rgba(0, 0, 0, 0.1)));
                border-radius: var(--mjo-message-radius, var(--mjo-radius-large, 4px));
                margin: var(--mjo-message-margin-top, 15px) 0 0;
                padding: 7px 15px;
                max-width: 90vw;
                box-sizing: border-box;
                animation: slideIn 0.5s forwards;
            }

            @keyframes slideIn {
                from {
                    opacity: 0;
                    margin-top: -20px;
                }
                to {
                    opacity: 1;
                    margin-top: var(--mjo-message-margin-top, 15px);
                }
            }

            .icon {
                position: relative;
                display: grid;
                place-content: center;
            }
            .icon[data-type="success"] {
                color: var(--mjo-color-success);
            }
            .icon[data-type="error"] {
                color: var(--mjo-color-error);
            }
            .icon[data-type="warning"] {
                color: var(--mjo-color-warning);
            }
            .icon[data-type="info"] {
                color: var(--mjo-color-info);
            }
            mjo-icon {
                font-size: 1em;
            }
            .message {
                position: relative;
                max-width: 80vw;
                width: 200px;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "message-item": MessageItem;
    }
}
