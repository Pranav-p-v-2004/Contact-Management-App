let contacts = []

let editIndex = ""

if (sessionStorage.getItem("contacts")) {
    contacts = JSON.parse(sessionStorage.getItem("contacts"))
    displayArray()
}


// Add and Update Contacts

userform.addEventListener('submit', (event) => {

    event.preventDefault()

    const contactNameInput = cName.value
    const contactPhoneInput = cPhone.value
    const contactEmailInput = cEmail.value

    if (contactNameInput === "" || contactPhoneInput === "" || contactEmailInput === "") {
        alert("Please fill all fields")
        return
    }

    const contact = {
        name: contactNameInput,
        phone: contactPhoneInput,
        email: contactEmailInput
    }

    if (editIndex === "") {
        contacts.push(contact)
    } else {
        contacts[editIndex] = contact
        editIndex = ""
        submitBtn.innerHTML = "Add Contact"
    }

    sessionStorage.setItem("contacts", JSON.stringify(contacts))
    displayArray()
    userform.reset()

})


// Display Contacts

function displayArray() {
    tableBody.innerHTML = ""
    contacts.forEach((item, index) => {
        tableBody.innerHTML += `

        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>
            <td>

                <button class="btn btn-primary btn-sm" onclick="editContact(${index})">Edit</button>
                <button class="btn btn-danger btn-sm"   onclick="deleteContact(${index})">Delete</button>

            </td>
        </tr>
        `

    })

}


// Edit Contact

function editContact(index) {
    cName.value = contacts[index].name
    cPhone.value = contacts[index].phone
    cEmail.value = contacts[index].email
    editIndex = index
    submitBtn.innerHTML = "Update Contact"

}


// Delete Contact

function deleteContact(index) {

    if (confirm("Are you sure you want to delete this contact?")) {
        contacts.splice(index, 1)
        sessionStorage.setItem("contacts", JSON.stringify(contacts))
        displayArray()

    }

}


// Search Contact

searchContact.addEventListener('input', () => {
    const searchValue = searchContact.value.toLowerCase()
    const filteredContacts = contacts.filter(item => {
        return item.name.toLowerCase().includes(searchValue)

    })

    tableBody.innerHTML = ""
    filteredContacts.forEach(item => {
        const index = contacts.indexOf(item)
        tableBody.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.phone}</td>
            <td>${item.email}</td>

            <td> <button class="btn btn-primary btn-sm" onclick="editContact(${index})">Edit</button>
                <button class="btn btn-danger btn-sm"  onclick="deleteContact(${index})">Delete</button>
               
            </td>

        </tr>

        `

    })

})