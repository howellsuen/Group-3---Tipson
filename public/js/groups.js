$(()=>{
    $.get('/api/groups').then((data)=>{
        data.forEach(e => {
            $('#group-list').append(Group(e.name));
        });
    });

    const Group = (name)=>{
        return `
            <div class="info-container">
                <img class="avator" src="/images/male-user-100.png" alt="avator">
                <label class="lbl-info">Group Name: </label><p>${name}</p>
            </div>`
    }
})