const fs = require('fs-extra');
const Handlebars = require('handlebars');

class FileService {

  saveFile(rute, data) {
    fs.writeFileSync(rute, data);
  }

  readFile(rute) {
    return fs.readFileSync(rute);
  }

  renderTemplate(templates, info) {
    const template = Handlebars.compile(templates);
    return template(info);
  }

  createFolder() {
    fs.mkdirSync();
  }
}

module.exports = FileService;