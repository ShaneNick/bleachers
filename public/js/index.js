// Create rooms functionality
const room_names = [];

async function create(e){
    e.preventDefault();
    var room_name = document.querySelector('#room-name').value;

    var btn = document.createElement('button');
    btn.setAttribute("class", "btn btn-info");
    btn.setAttribute("type", "button");
    btn.innerHTML = room_name;

    var rooms_div = document.querySelector('#rooms-div');
    rooms_div.innerHTML = btn;
    room_names.push(room_name);
}

document.querySelector('.create-form').addEventListener('submit', create);

// Collapse bootstrap functionality

$('.collapse').collapse()