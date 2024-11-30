import makeFetch from "./makeFetch";
import { js2xml } from 'xml-js';

const BASE_SPACE_MARINE_SERVICE_URL = "https://localhost:8443/space-marines-api-0.0.1-SNAPSHOT/api/v1"

export const fetchGetMarines = async (setMarines, setPage, sortBy, order, limit, page, filters, alertWithMessage) => {
    const url = new URL(BASE_SPACE_MARINE_SERVICE_URL + "/spacemarines");
    let params = {
        limit: limit,
        page: page,
        orderBy: order,
    }

    try {
        let searchParams = new URLSearchParams(params)
        sortBy.forEach(value => searchParams.append('sortBy', value))
        let keysForDel = [];
        searchParams.forEach((value, key) => {
            if (value === "null" || value === "") {
                keysForDel.push(key);
            }
        });
        keysForDel.forEach(key => {
            searchParams.delete(key);
        });
        url.search = searchParams.toString()
        console.log(searchParams.toString())
        await makeFetch(
            url,
            () => {},
            text => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, "application/xml");

                const spaceMarines = Array.from(xml.getElementsByTagName('data')).map(sm => {
                    return {
                        id: sm.getElementsByTagName('id')[0].textContent,
                        name: sm.getElementsByTagName('name')[0].textContent,
                        coordinates: {
                            x: sm.getElementsByTagName('coordinates')[0].getElementsByTagName('x')[0].textContent,
                            y: sm.getElementsByTagName('coordinates')[0].getElementsByTagName('y')[0].textContent
                        },
                        creationDate: sm.getElementsByTagName('creationDate')[0].textContent,
                        health: sm.getElementsByTagName('health')[0].textContent,
                        category: sm.getElementsByTagName('category')[0].textContent,
                        weaponType: sm.getElementsByTagName('weaponType')[0].textContent,
                        meleeWeapon: sm.getElementsByTagName('meleeWeapon')[0].textContent,
                        chapter: {
                            id: sm.getElementsByTagName('chapter')[0].getElementsByTagName('id')[0].textContent,
                            name: sm.getElementsByTagName('chapter')[0].getElementsByTagName('name')[0].textContent,
                            world: sm.getElementsByTagName('chapter')[0].getElementsByTagName('world')[0].textContent
                        }
                    };
                });

                setMarines(spaceMarines);
            },
            alertWithMessage,
        )
    } catch (e) {
        console.log("error", e);
    }
}

export const fetchMarineById = async (value, setMarines, alertWithMessage) => {
    if (value !== "") {
        const url = new URL(BASE_SPACE_MARINE_SERVICE_URL + "/spacemarines/" + value);
        await makeFetch(
            url,
            {},
            text => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(text, "application/xml");

                const spaceMarine = {
                    id: xml.getElementsByTagName('id')[0].textContent,
                    name: xml.getElementsByTagName('name')[0].textContent,
                    coordinates: {
                        x: xml.getElementsByTagName('coordinates')[0].getElementsByTagName('x')[0].textContent,
                        y: xml.getElementsByTagName('coordinates')[0].getElementsByTagName('y')[0].textContent
                    },
                    creationDate: xml.getElementsByTagName('creationDate')[0].textContent,
                    health: xml.getElementsByTagName('health')[0].textContent,
                    category: xml.getElementsByTagName('category')[0].textContent,
                    weaponType: xml.getElementsByTagName('weaponType')[0].textContent,
                    meleeWeapon: xml.getElementsByTagName('meleeWeapon')[0].textContent,
                    chapter: {
                        id: xml.getElementsByTagName('chapter')[0].getElementsByTagName('id')[0].textContent,
                        name: xml.getElementsByTagName('chapter')[0].getElementsByTagName('name')[0].textContent,
                        world: xml.getElementsByTagName('chapter')[0].getElementsByTagName('world')[0].textContent
                    }
                };
                setMarines([spaceMarine])
            },
            alertWithMessage
        )
    }
}

export const fetchDeleteById = async (id, alertWithMessage) => {
    if (id !== "") {
        const url = new URL(BASE_SPACE_MARINE_SERVICE_URL + "/spacemarines/" + id);
        await makeFetch(url, {method: 'DELETE'}, () => {
        }, alertWithMessage)
    }
}

export const fetchAdd = async (data, alertWithMessage) => {
    if (data !== null) {
        const url = new URL(BASE_SPACE_MARINE_SERVICE_URL + "/spacemarines");

        const options = { compact: true, ignoreComment: true, spaces: 4 };

        await makeFetch(
            url,
            {
                method: 'POST',
                headers: {
                    "Content-Type": "application/xml",
                },
                body: js2xml(data, options)
            },
            _ => {
            },
            alertWithMessage
        )
    }
}

export const fetchUpdateById = async (id, data, alertWithMessage) => {
    if (id !== null && data !== null) {
        const url = new URL(BASE_SPACE_MARINE_SERVICE_URL + "/spacemarines/" + id);
        await makeFetch(
            url,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            },
            _ => {
            },
            alertWithMessage
        )
    }
}

export const fetchDeleteOneByCategory = async (category, alertWithMessage) => {
    if (category !== null) {
        const url = new URL(BASE_SPACE_MARINE_SERVICE_URL + "/spacemarines/categories/" + category);
        await makeFetch(url, {method: 'DELETE'}, _ => {
        }, alertWithMessage)
    }
}

export const fetchGetLoyalist = async (alertWithMessage) => {
    const url = new URL(BASE_SPACE_MARINE_SERVICE_URL + "/spacemarines/loyalists");
    await makeFetch(url, {method: "GET"}, resp => alertWithMessage("Loyalist id: " + resp["id"]), alertWithMessage)
}

export const fetchGetCountOfHealthyMarines = async (minHealth, alertWithMessage) => {
    const url = new URL(BASE_SPACE_MARINE_SERVICE_URL + "/spacemarines/amount");
    let params = {minHealth: minHealth}
    url.search = new URLSearchParams(params).toString()
    await makeFetch(url, {method: "GET"}, resp => alertWithMessage("Amount: " + resp["amount"]), alertWithMessage)
}
