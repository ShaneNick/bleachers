document.addEventListener("DOMContentLoaded", () => {
	let rooms = [];
  
	function addRoom() {
		let roomNameInput = document.getElementById("room-name");
		let roomName = roomNameInput.value;
		if (roomName === "") {
		  alert("Please enter a room name");
		  return;
		}
		socket.emit("create room", roomName);
	  
		rooms.push(roomName);
		roomNameInput.value = "";
	  
		let roomsList = document.getElementById("rooms-list");
		let newRoomItem = document.createElement("li");
		newRoomItem.classList.add("room-item");
		let newRoomLink = document.createElement("a");
		newRoomLink.href = "/chatroom/" + roomName;
		newRoomLink.innerText = roomName;
		newRoomItem.appendChild(newRoomLink);
		roomsList.appendChild(newRoomItem);
	  
		socket.emit("join room", roomName);
	  }
	  
	let addButton = document.getElementById("addroom");
	addButton.addEventListener("click", function (event) {
	  event.preventDefault(); // prevent form submission
	  addRoom(); // call addRoom() function
	});
  });
  
  
  