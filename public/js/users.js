$(() => {
    $.get('/api/users').then((data) => {
        data.forEach(e => {
            $('#user-list').append(User(e.first_name, e.last_name, e.email));
        });
    });
    const User = (firstName, lastName, email) => {
        return `
            <div class="info-container">
                <img class="avator" src="/images/male-user-100.png" alt="avator">
                <label class="lbl-info">First Name: </label><p>${firstName}</p>
                <label class="lbl-info">Last Name: </label><p>${lastName}</p>
                <label class="lbl-info">Email: </label><p>${email}</p>
            </div>`
    };
})