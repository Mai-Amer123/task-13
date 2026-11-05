
let users = JSON.parse(localStorage.getItem("users")) || [];
let usersTable = document.getElementById("usersTable");
let emptyMessage = document.getElementById("emptyMessage");

// Display 

function displayUsers() {
    usersTable.innerHTML = "";

    if (users.length === 0) {
        emptyMessage.style.display = "block";
        return;
    }

    emptyMessage.style.display = "none";

    users.forEach(function (user) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>${user.email}</td>
            <td>${Number(user.salary).toLocaleString()}</td>

            <td>
                <div class="action-buttons">

                    <button class="update-btn"
                        onclick="updateUser(${user.id})">
                        Update
                    </button>

                    <button class="delete-btn"
                        onclick="deleteUser(${user.id})">
                        Delete
                    </button>

                </div>
            </td>
        `;

        usersTable.appendChild(row);

    });
}

// Delete 

function deleteUser(id) {

    let confirmDelete = confirm("Are you sure you want to delete this user?");

    if (confirmDelete) {

        users = users.filter(function (user) {
            return user.id !== id;
        });

        localStorage.setItem("users", JSON.stringify(users));

        displayUsers();
    }
}

// Update 

function updateUser(id) {

    window.location.href = "add-user.html?id=" + id;

}
displayUsers();
