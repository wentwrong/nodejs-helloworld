export default class PullsController {
    static async list () {
        const response = await fetch('api/v1/pulls/list');

        return await response.json();
    }
}
