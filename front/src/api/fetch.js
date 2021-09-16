export const GET = async (url, params = undefined) => {
    try {
        if (params) {
            url += params.join("/"); //takes all parameters and puts a / between them
        }
        let res = await fetch(url, { method: 'GET' });
        let data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

export const POST = async (url, body = undefined) => {
    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body ? JSON.stringify(body) : ""
        });
        let data = await res.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}