let resource_url = 'https://swkeep-tablet'

export default {
    get,
    post,
};

async function get(NUICB) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${resource_url}/${NUICB}`, requestOptions);
    return handleResponse(response);
}

async function post(NUICB, body) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };
    const response = await fetch(`${resource_url}/${NUICB}`, requestOptions);
    return handleResponse(response);
}

// helper functions

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}