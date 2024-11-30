const alertBadRequest = (response, alertWithMessage) => {
    response.text()
        .then(text => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(text, "application/xml");

            let msg = response.status + ": " + xml.getElementsByTagName("message")[0].textContent
            alertWithMessage(msg)
            console.log("error", msg);
        }
    )
}

const makeFetch = async (url, requestInit, ifSuccess, alertWithMessage) => {
    await fetch(url, requestInit)
        .then(response => {
                if (200 <= response.status && response.status < 300) {
                    if (response.body !== null) {
                        response
                            .text()
                            .then(ifSuccess)
                            .catch(resp => console.log(resp))
                    }
                } else {
                    alertBadRequest(response, alertWithMessage)
                }
            }
        )
        .catch(error =>
            console.log("error", error)
        )
}

export default makeFetch
