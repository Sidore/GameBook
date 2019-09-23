class LSController {
    set(token: string, type: string, value: any) : boolean {
        if (typeof localStorage !== "undefined") {
            localStorage.setItem(token, JSON.stringify({
                type,
                value
            }))
            return true;
        }
        return false;
    }

    get(token: string) {
        if (typeof localStorage !== "undefined") {
            const storeRes = JSON.parse(localStorage.getItem(token));
            return storeRes.value;
        }
        return null;
    }
}

export default new LSController();