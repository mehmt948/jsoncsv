function generateAutoHeaders(items) {
    const headers = [];

    let headersMap = {};
    items.forEach(function(item) {
        Object.keys(item).forEach(function(key) {
            if (!headersMap[key]) {
                headersMap[key] = key;

                headers.push({
                    title: key,
                    data: key,
                });
            }
        });
    });

    return headers;
};

function parseGivenHeaders(headersString) {
    const headers = [];

    const headersStringArray = headersString.split(',');
    headersStringArray.forEach(function(headersStringItem) {
        const parts = headersStringItem.split(':');

        const title = parts[0];
        let data = parts[0];
        if (parts.length === 2) {
            data = parts[1];
        }

        headers.push({
            title,
            data,
        })
    })

    return headers;
}

module.exports = {
    generateAutoHeaders,
    parseGivenHeaders,
};