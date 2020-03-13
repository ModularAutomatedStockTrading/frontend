export default (method, path, body) => {
    return fetch(method, path, {body}).then(res => res.json());
}