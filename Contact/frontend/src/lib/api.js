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
    if (!response.ok) {
        throw new Error();
    }
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
    if (response.status === 400) {
        throw new Error(data.message);
    }

}

export async function deleteContact(id) {
    await fetch(`${CONTACT_URL}/${id}`, {
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

    const data = await response.json();
    console.log(data);
    if (response.status === 400) {
        console.log('error thrown');
        throw new Error(data.message);
    }

}


export async function getContactById(id) {
    const response = await fetch(`${CONTACT_URL}/${id}`);
    const data = await response.json();
    return data;
}
