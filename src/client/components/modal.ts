import M from 'materialize-css';
import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import loadTemplate from '../utils/loadTemplate';

const debug = debugFactory('modal-component');

export default class ModalComponent extends HTMLElement {
    constructor () {
        super();
    }

    async connectedCallback (): Promise<void> {
        await this.render();
    }

    async render (): Promise<void> {
        try {
            const modalTemplate = await loadTemplate('modal');

            this.innerHTML = Mustache.render(modalTemplate, {});

            M.Modal.init(document.querySelectorAll('.modal'));

            this.setEventHandlers();
        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }

    setEventHandlers (): void {
        const addCommentButton = document.getElementById('addCommentBtn');

        if (addCommentButton) {
            addCommentButton
                .addEventListener('click', () => {
                    const commentMsg = document.getElementById('commentMessage') as HTMLTextAreaElement;

                    const data = {
                        detail: {
                            message: commentMsg.value
                        }
                    };

                    this.dispatchEvent(new CustomEvent('addCommentButtonClicked', data));
                });
        }
    }
}
