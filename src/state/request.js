export default (method, path, body) => {
    return fetch(`http://localhost:4000${path}`, {
        body : JSON.stringify(body),
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return res.json()
        }else{
            return 1;
        }
    });
}