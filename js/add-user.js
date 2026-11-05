
let users = JSON.parse(localStorage.getItem("users")) || [];
let userForm = document.getElementById("userForm");
let fullName = document.getElementById("fullName");
let role = document.getElementById("role");
let salary = document.getElementById("salary");
let email = document.getElementById("email");
let formTitle = document.getElementById("formTitle");
let params = new URLSearchParams(window.location.search);
let userId = params.get("id");

// updating a user

if (userId !== null) {

    let selectedUser = users.find(function (user) {
        return user.id === Number(userId);
    });

    if (selectedUser) {

        fullName.value = selectedUser.name;
        role.value = selectedUser.role;
        salary.value = selectedUser.salary;
        email.value = selectedUser.email;

        formTitle.textContent = "Update User";

    } else {

        alert("User not found!");
        window.location.href = "users.html";

    }
}

// Save user

userForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let nameValue = fullName.value.trim();
    let roleValue = role.value;
    let salaryValue = salary.value;
    let emailValue = email.value.trim();


    let duplicateEmail = users.some(function (user) {

        return user.email.toLowerCase() === emailValue.toLowerCase()
            && user.id !== Number(userId);

    });

    if (duplicateEmail) {

        alert("This email already exists!");
        return;

    }

    if (userId !== null) {
        let selectedUser = users.find(function (user) {
            return user.id === Number(userId);
        });

        if (selectedUser) {

            selectedUser.name = nameValue;
            selectedUser.role = roleValue;
            selectedUser.salary = Number(salaryValue);
            selectedUser.email = emailValue;

            alert("User updated successfully!");

        }

    } else {

        // Add new user

        let newUser = {

            id: Date.now(),
            name: nameValue,
            role: roleValue,
            salary: Number(salaryValue),
            email: emailValue

        };

        users.push(newUser);

        alert("User added successfully!");

    }

    localStorage.setItem("users", JSON.stringify(users));

    window.location.href = "users.html";

});
