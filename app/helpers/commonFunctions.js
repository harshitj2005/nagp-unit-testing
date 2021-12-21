class CommonFunctions {
    constructor() {
        if (this instanceof CommonFunctions) {
            throw Error("A CommonFunctions class cannot be instantiated. As this is a static class");
        }
    }
    static isInteger(val) {
        val = parseInt(val);
        if (isNaN(val))
            return false;
        return true;
    }
}

module.exports = CommonFunctions;