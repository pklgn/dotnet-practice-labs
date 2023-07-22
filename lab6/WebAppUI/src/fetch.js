const extractResponse = async response => {
    let result = {};
    if (response.ok) {
        result = await response.json();
    } else {
        result = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
    }

    return result;
};

export const getData = async (url = "") => extractResponse(await fetch(url));

export const postData = async (url = "", data = {}, method = "POST") => {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        method,
    });

    return extractResponse(response);
};

export const deleteData = async (url = "") => {
    const response = await fetch(url, {
        method: "DELETE",
    });

    return extractResponse(response);
};
