import "./style.css";

(async () => {
    const response = await fetch("/api/users");

    if (response.ok) {
        const json = await response.json();
        // eslint-disable-next-line no-console
        console.log("json = ", json);
    } else {
        // eslint-disable-next-line no-console
        console.log(`HTTP error: ${response.status}`);
    }
})();

document.getElementById("operations-getUsers").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-getUsers").classList.toggle("hidden");
        document.getElementById("operations-getUsers").getElementsByTagName("span")[0].classList.toggle("hidden");
    },
    false,
);

document.getElementById("operations-addUser").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-addUser").classList.toggle("hidden");
        document.getElementById("operations-addUser").getElementsByTagName("span")[0].classList.toggle("hidden");
    },
    false,
);

document.getElementById("operations-getUser").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-getUser").classList.toggle("hidden");
        document.getElementById("operations-getUser").getElementsByTagName("span")[0].classList.toggle("hidden");
    },
    false,
);

document.getElementById("operations-updateUser").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-updateUser").classList.toggle("hidden");
        document.getElementById("operations-updateUser").getElementsByTagName("span")[0].classList.toggle("hidden");
    },
    false,
);

document.getElementById("operations-deleteUser").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-deleteUser").classList.toggle("hidden");
        document.getElementById("operations-deleteUser").getElementsByTagName("span")[0].classList.toggle("hidden");
    },
    false,
);

const fetchUsers = async () => {
    try {
        const response = await fetch("/api/users");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        // eslint-disable-next-line no-console
        console.log("json = ", data);
        return data;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error fetching data:", error);
        return null;
    }
};

const pasteResponse = (elementId, response) => {
    const responseClassList = document.getElementById(elementId).classList;
    if (responseClassList.contains("hidden")) {
        responseClassList.toggle("hidden");
    }

    document.getElementById(elementId).innerHTML = JSON.stringify(response, null, 4);
};

const getData = async (url = "") => {
    const response = await fetch(url);

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

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    });

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

document.getElementById("operations-sendRequest-getUsers").addEventListener(
    "click",
    () => {
        fetchUsers().then(users => pasteResponse("operations-response-getUsers", users));
    },
    false,
);
document.getElementById("operations-sendRequest-addUser").addEventListener(
    "click",
    () => {
        const userData = document
            .getElementById("operations-request-addUser")
            .getElementsByTagName("textarea")[0].value;
        postData("/api/users", JSON.parse(userData)).then(response =>
            pasteResponse("operations-response-addUser", response),
        );
    },
    false,
);

document.getElementById("operations-sendRequest-getUser").addEventListener(
    "click",
    () => {
        const userId = document.getElementById("operations-request-getUser").getElementsByTagName("input")[0].value;
        getData(`/api/users/${userId}`).then(response => pasteResponse("operations-response-getUser", response));
    },
    false,
);

