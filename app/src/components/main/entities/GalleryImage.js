export default class GallaryImage {
  constructor() {
    this.name = '';
    this.text = '';
    this.url = '';
  }

  getName() {
    return this.name;
  }
  getText() {
    return this.text;
  }
  getUrl() {
    return this.url;
  }

  setName(value) {
    this.name = value;
  }
  setText(value) {
    this.text = value;
  }
  setUrl(value) {
    this.url = value;
  }
}