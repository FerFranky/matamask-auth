const host = 'https://metamask.fernando-olmos.com/api/'
export const SendSign = async (sign, wallet) => {
    const res = await fetch(host + 'store', {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sign: sign,
            wallet: wallet
        }),
    });
    return await res.json();
}

export const GetSigns = async () => {
    const res = await fetch(host, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
    return await res.json();
}