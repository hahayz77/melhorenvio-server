const shipmentCalculate = async (access_token, zip_code, package) => {
    if(!package) package = { "height": 4, "width": 12, "length": 17, "weight": 0.3 } // default size of package!
    try {
        const response = await fetch("https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${access_token}`,
                "User-Agent": "Aplicação e-mail"
            }, body: JSON.stringify({
                "from": {
                    "postal_code": "01002001"
                },
                "to": {
                    "postal_code": zip_code,
                },
                "package": package,
                "options": {
                    "insurance_value": 1180.87,
                    "receipt": false,
                    "own_hand": false
                },
                "services": "1,2,3,4,7,11"
            })
        })

        if (!response.ok) return { error: response.statusText }

        const data = await response.json();
        return data;

    } catch (err) {
        throw new Error(err);
    }
}

module.exports = shipmentCalculate;
