import M from 'materialize-css';
import Mustache from 'mustache';
import debugFactory from '../../shared/debugFactory';
import loadTemplate from '../utils/loadTemplate';
import ReposController from '../controllers/reposController';
import { Slug } from '../../shared/interfaces/slug';

const debug = debugFactory('repos-component');

export default class ReposComponent extends HTMLElement {
    constructor () {
        super();
    }

    async connectedCallback (): Promise<void> {
        await this.render();
    }

    async render (): Promise<void> {
        try {
            const reposTemplate = await loadTemplate('repos');
            const slugs = await ReposController.getSlugs();

            this.innerHTML = Mustache.render(reposTemplate, {});

            const autocompleteData = slugs.reduce((res: M.AutocompleteData, slug: Slug) => {
                res[slug.data] = slug.avatar;
                return res;
            }, {});

            const opts = {
                data:                 slugs.map(slug => ({ tag: slug.data, image: slug.avatar })) as M.ChipData[],
                placeholder:          'owner/repo',
                secondaryPlaceholder: '+ owner/repo',
                autocompleteOptions:  {
                    data:      autocompleteData,
                    limit:     Infinity,
                    minLength: 1
                },
                onChipAdd: function (this: M.Chips, element: Element, chip: Element): void {
                    const addedChipText = chip?.childNodes[0]?.textContent;

                    if (!addedChipText) return;

                    const existedSlug = slugs.find(slug => slug.data === addedChipText);

                    // NOTE:
                    // if last slug is known, then insert avatar img
                    if (existedSlug) {
                        const avatarImage = document.createElement('img');

                        avatarImage.src = existedSlug.avatar;

                        chip.appendChild(avatarImage);
                    }
                    else
                        this.deleteChip(this.chipsData.length - 1);
                }
            };

            const reposChip = document.getElementById('repos');

            if (reposChip)
                M.Chips.init(reposChip, opts);
            else
                throw new Error('Can not find repos chip!');

        }
        catch (err) {
            debug.error(err);

            throw err;
        }
    }
}
