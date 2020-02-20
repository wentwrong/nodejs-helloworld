export default class PullsController {
    static async list() {
        try {
            const response = await fetch('api/v1/pulls/list');
            return await response.json();
        }
        catch (err) {
            throw err;
        }
    }
}