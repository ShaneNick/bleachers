var room_names = [];

async function create(e) {
    e.preventDefault();
    var room_name = document.querySelector('#room-name').value.trim();

    if (room_name && !room_names.includes(room_name)) {
        try {
            let response = await fetch('/api/createRoom', {
                method: 'POST',
                body: JSON.stringify({ roomName: room_name }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                let roomData = await response.json();

                var listItem = document.createElement('li');
                listItem.className = "list-group-item";

                const roomLink = document.createElement('a');
                roomLink.href = `chatRoomPage?roomName=${encodeURIComponent(roomData.roomName)}`;
                roomLink.textContent = roomData.roomName;

                listItem.appendChild(roomLink);

                var roomsList = document.querySelector('#rooms-list');
                roomsList.appendChild(listItem);

                room_names.push(roomData.roomName);

                await saveRoom(roomData.roomName);  // Call saveRoom to save to the database
            } else {
                alert("Failed to create room. Please try again.");
            }                               
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert("Please enter a unique room name.");
    }
}



document.querySelector('.create-form').addEventListener('submit', create);

async function loadRooms() {
    try {
        let response = await fetch('/api/rooms');
        if (response.ok) {
            let rooms = await response.json();
            rooms.forEach(room => {
                var listItem = document.createElement('li');
                listItem.className = "list-group-item";

                const roomLink = document.createElement('a');
                roomLink.href = `chatRoomPage?roomName=${encodeURIComponent(room.name)}`;
                roomLink.textContent = room.name;

                listItem.appendChild(roomLink);

                var roomsList = document.querySelector('#rooms-list');
                roomsList.appendChild(listItem);
            });
        }
    } catch (error) {
        console.error('Failed to load rooms:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadRooms);

  