const CONTACT_URL = "http://localhost:9005/contacts";

export async function getAllContacts() {
    const response = await fetch(`${CONTACT_URL}`);
    const data = await response.json();
    const contacts = [];
    for (let i in data) {
        const contactObj = { ...data[i] };
        contacts.push(contactObj);
    }
    // console.log(contacts);
    return contacts;
}

export async function addContact(requestData) {
    const response = await fetch(`${CONTACT_URL}`, {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    console.log(data.message);
    if (response.status === 400) {
        throw new Error(data.message);
    }
    return data;
}

export async function deleteContact(id) {
    const response = await fetch(`${CONTACT_URL}/${id}`, {
        method: 'DELETE'
    });

}

export async function updateContact(contactObj) {
    const response = await fetch(`${CONTACT_URL}`, {
        method: 'PUT',
        body: JSON.stringify(contactObj),
        headers: {
            'Content-Type': 'application/json'
        }
    });

}

export async function checkIfContactExists(mobileNumber) {
    console.log(mobileNumber);
    const response = await fetch(`${CONTACT_URL}/${mobileNumber}`);
    console.log(response);
    const data = response.json();
    console.log(data);
    return data;
}
