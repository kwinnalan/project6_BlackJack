'use strict';

const FS = require('fs');
const FORMIDABLE = require('formidable').IncomingForm;

class DataHandler {
    static renderDom(path, contentType, callback, encoding) {
        FS.readFile(path, encoding ? encoding : `utf-8`, (error, string) => {
            callback(error, string, contentType);
        });
    }

    static async receiveFile(request, response) {
        console.log('in receive file');
        let form = new FORMIDABLE.IncomingForm();
        try {
            form.parse(request);
            form.on('fileBegin', (name, file) => {
                file.path = `data/${file.name}`;
            });
            form.on('end', () => {
                response.end('File uploaded!');
            });
        } catch (error) {
            return error;
        }
    }

    static getKey() {
        console.log('Getting key');
        return FS.readFileSync(`data/certificates/key.rsa`);
    }

    static getCert() {
        console.log('Getting cert');
        return FS.readFileSync(`data/certificates/cert.crt`);
    }
}

module.exports = DataHandler;