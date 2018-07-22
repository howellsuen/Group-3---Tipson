$(() => {
    let choice = null;
    let disabled = true;

    $('#${matchId}-home-btn').click(() => {
        choice = {
            matchId: $ { matchId },
            userChoice: 'home'
        }
    })

    $('#${matchId}-draw-btn').click(() => {
        choice = {
            matchId: $ { matchId },
            userChoice: 'draw'
        }
    })

    $('#${matchId}-away-btn').click(() => {
        choice = {
            matchId: $ { matchId },
            userChoice: 'away'
        }
    })

    $('#${matchId}-submit-btn').click(() => {
        if (choice !== null) {
            $.post('/api/home/submit', choice).done(() => {
                $('#${matchId}-submit-btn').toggle();
            });
        }
    })
});