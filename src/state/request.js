export default (method, path, body) => {
    return fetch(`http://localhost:4000${path}`, {
        body : JSON.stringify(body),
        method,
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        return res.json()
    });
}