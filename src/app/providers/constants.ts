export class APIROOT {
    private cloud_link = 'https://1-7-rg-dot-bonnie-organic-tracker.appspot.com/';
    private relative_url = 'localhost:8080/';

    getTestLink() {
        return this.cloud_link;
    }

    getRelativeLink() {
        return this.relative_url;
    }
}
