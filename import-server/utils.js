const getAll = function (urlRoute, page, size, collection) {
    const axios = require('axios');
    page = page || 1;
    size = size || 100;
    collection = collection || [];

    return axios
        .get(urlRoute + `?per_page=${size}&page=${page}`)
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
