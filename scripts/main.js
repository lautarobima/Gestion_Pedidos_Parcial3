var allRequests = [];
var visibleRequests = [];
var filterStatus = "all";
var searchName = "";



async function getRequests() {
    const url = "https://diligent-victory-production.up.railway.app/requests";
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        allRequests = data;
        visibleRequests = data;
    } catch (error) {
        console.error("Error fetching requests:", error);
    }
}

function mapRequests() {
    const requestsContainer = document.getElementById("requestsContainer");
    requestsContainer.innerHTML += visibleRequests.map(
        ({id, name, phone, address, price, status}) => {
            return `<div class="request">
                <p class="req_id">request id : ${id}</p>
                <p class="req_name">name : ${name}</p>
                <div class="req_status">
                    <p>status : </p>
                    <select name="status">
                        <option value="pendiente" ${setStatus(id, "pendiente")}>pendiente</option>
                        <option valuer="atendido" ${setStatus(id, "atendido")}>atendido</option>
                    </select>
                </div>
                <p class="req_phone">phone number : ${phone}</p>
                <p class="req_address">address : ${address}</p>
                <p class="req_price">price : ${price}$</p>
                <div class="req_list">
                    ${mapRequestLines(id)}
                </div>
            </div>`
        }).join("");
}

function setStatus(id, status) {
    const request = findById(id);
    console.log(request.status);
    console.log(status);
    console.log(request.status == status);
    if (request.status == status) 
        return `selected`;
    return ``;
}
function mapRequestLines(id) {
    const request = findById(id);
    let map = parseCuantity(request);
    let lines = ``;
    for (i in request.products)
        lines += `<div class="req_line"><p>id: ${request.products[i].id}  |  title: ${request.products[i].title}  |  price: ${request.products[i].price}$  |  cuantity: ${map.get(request.products[i].id)}</p></div>`;
    return lines;
}
function findById(id) {
    for (i in visibleRequests)
        if (visibleRequests[i].id == id)
            return visibleRequests[i];
}
function parseCuantity(request) {
    let map = new Map();
    for (i in request.cuantity) 
        map.set(parseInt(request.cuantity[i].split(":")[0]), parseInt(request.cuantity[i].split(":")[1]));
    return map;
}


async function startApp() {
    await getRequests();
    mapRequests();
}




startApp();