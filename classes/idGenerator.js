module.exports = class IdGenerator {
    constructor() {
        this.lastId = 0;
    };

    getNewId() {
        return ++this.lastId;   
    };
};