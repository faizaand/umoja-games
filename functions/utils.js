const getAll = function (urlRoute, page, size, collection, add) {
    const axios = require('axios');
    page = page || 1;
    size = size || 100;
    collection = collection || [];
    add = add || false;
    const sep = add ? "&" : "?";
    return axios
        .get(urlRoute + sep + `per_page=${size}&page=${page}`)
        .then(response => response.data)
        .then(raw => {
            raw.forEach(item => collection.push(item));

            // if (raw.length < size) {
            //     console.log("Done");
            //     return collection;
            // }
            // Recurse over the next set of matches by adding another promise to the chain.
            return getAll(urlRoute, page + 1, size, collection);
        }).catch(reason => {
            // All done return the compiled list.
            return collection;
        })
};

module.exports.getAll = getAll;

module.exports.catMap = {
    87: "Boys' Under 12",
    86: "Boys' Under 16",
    88: "Boys' Under 8",
    91: "Girls' Under 10",
    90: "Girls' Under 14",
    172: "Girls' Under 8",
    84: "Men's Open",
    85: "Men's Over 35",
    89: "Women's Open",
    92: "Toddlers",
};

module.exports.venueMap = {
    175: "Field 1A",
    176: "Field 1B",
    177: "Field 2A",
    211: "Field 2A",
    178: "Field 2B",
    182: "Field 3A",
    183: "Field 3B",
    174: "Field 4A",
    179: "Field 4B",
    180: "Outdoor A",
    181: "Outdoor B",
};
