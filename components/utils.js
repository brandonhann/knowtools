export function validateAndSanitizePrompt(prompt) {
    const allowedCharacters = /^[a-zA-Z0-9\s.,?!]+$/;

    if (allowedCharacters.test(prompt)) {
        return prompt;
    } else {
        return prompt.replace(/[^a-zA-Z0-9\s.,?!]/g, '');
    }
}

export function fetchWithTimeout(resource, options, timeout = 10000) {
    return new Promise(async (resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error('Request timed out'));
        }, timeout);

        try {
            const response = await fetch(resource, options);
            clearTimeout(timer);
            resolve(response);
        } catch (error) {
            clearTimeout(timer);
            reject(error);
        }
    });
}

export function prettyHtml(diffs) {
    const html = [];
    for (let x = 0; x < diffs.length; x++) {
        const op = diffs[x][0]; // Operation (insert, delete, equal)
        const data = diffs[x][1]; // Text of change
        const text = data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        switch (op) {
            case 1: // Insertion
                html.push('<ins style="background:#e6ffe6;">' + text + "</ins>");
                break;
            case -1: // Deletion
                html.push('<del style="background:#ffe6e6;">' + text + "</del>");
                break;
            case 0: // No change
                html.push('<span>' + text + "</span>");
                break;
        }
    }
    return html.join("");
}