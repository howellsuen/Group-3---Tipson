$(() => {
    let choice = null;
    // let disabled = true;

    $('#${matchId}-home-btn').click(() => {
        choice = 'home'
    })

    $('#${matchId}-draw-btn').click(() => {
        choice = 'draw'
    })

    $('#${matchId}-away-btn').click(() => {
        choice = 'away'
    })

    $('#${matchId}-submit-btn').click(() => {
        console.log('click', {
            matchId: $(this).data('matchId'),
            userChoice: choice,
        });

        if (choice !== null) {
            $.post('/api/home/submit', {
                choice: {
                    matchId: $(this).data('matchId'),
                    userChoice: choice
                }
            }).done(() => {
                $('#${matchId}-submit-btn').toggle();
            });
        }
    })
});