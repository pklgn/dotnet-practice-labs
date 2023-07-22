import { FIRST_ELEMENT, JSON_INDENTATION } from "./config.js";
import { deleteData, getData, postData } from "./fetch.js";
import "./style.css";

document.getElementById("operations-getUsers").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-getUsers").classList.toggle("hidden");
        document
            .getElementById("operations-getUsers")
            .getElementsByTagName("span")
            [FIRST_ELEMENT].classList.toggle("hidden");
    },
    false,
);

document.getElementById("operations-addUser").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-addUser").classList.toggle("hidden");
        document
            .getElementById("operations-addUser")
            .getElementsByTagName("span")
            [FIRST_ELEMENT].classList.toggle("hidden");
    },
    false,
);

document.getElementById("operations-getUser").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-getUser").classList.toggle("hidden");
        document
            .getElementById("operations-getUser")
            .getElementsByTagName("span")
            [FIRST_ELEMENT].classList.toggle("hidden");
    },
    false,
);

document.getElementById("operations-updateUser").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-updateUser").classList.toggle("hidden");
        document
            .getElementById("operations-updateUser")
            .getElementsByTagName("span")
            [FIRST_ELEMENT].classList.toggle("hidden");
    },
    false,
);

document.getElementById("operations-deleteUser").addEventListener(
    "click",
    () => {
        document.getElementById("operations-request-deleteUser").classList.toggle("hidden");
        document
            .getElementById("operations-deleteUser")
            .getElementsByTagName("span")
            [FIRST_ELEMENT].classList.toggle("hidden");
    },
    false,
);

const pasteResponse = (elementId, response) => {
    const responseClassList = document.getElementById(elementId).classList;
    if (responseClassList.contains("hidden")) {
        responseClassList.toggle("hidden");
    }

    document.getElementById(elementId).innerHTML = JSON.stringify(response, null, JSON_INDENTATION);
};

document.getElementById("operations-sendRequest-getUsers").addEventListener(
    "click",
    () => {
        getData("/api/users").then(users => pasteResponse("operations-response-getUsers", users));
    },
    false,
);

document.getElementById("operations-sendRequest-addUser").addEventListener(
    "click",
    () => {
        const userData = document.getElementById("operations-request-addUser").getElementsByTagName("textarea")[
            FIRST_ELEMENT
        ].value;
        postData("/api/users", JSON.parse(userData)).then(response =>
            pasteResponse("operations-response-addUser", response),
        );
    },
    false,
);

document.getElementById("operations-sendRequest-getUser").addEventListener(
    "click",
    () => {
        const userId = document.getElementById("operations-request-getUser").getElementsByTagName("input")[
            FIRST_ELEMENT
        ].value;
        getData(`/api/users/${userId}`).then(response => pasteResponse("operations-response-getUser", response));
    },
    false,
);

document.getElementById("operations-sendRequest-updateUser").addEventListener(
    "click",
    () => {
        const userId = document.getElementById("operations-request-updateUser").getElementsByTagName("input")[
            FIRST_ELEMENT
        ].value;
        const userData = document.getElementById("operations-request-updateUser").getElementsByTagName("textarea")[
            FIRST_ELEMENT
        ].value;
        postData(`/api/users/${userId}`, JSON.parse(userData), "PUT").then(response =>
            pasteResponse("operations-response-updateUser", response),
        );
    },
    false,
);

document.getElementById("operations-sendRequest-deleteUser").addEventListener(
    "click",
    () => {
        const userId = document.getElementById("operations-request-deleteUser").getElementsByTagName("input")[
            FIRST_ELEMENT
        ].value;
        deleteData(`/api/users/${userId}`).then(response => pasteResponse("operations-response-deleteUser", response));
    },
    false,
);

