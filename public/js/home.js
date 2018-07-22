$(() => {
    const MatchTemplate = (matchId, homeTeam, awayTeam) => {
        return `
        <div class="btn-group d-flex justify-content-center home-prediction" role="button" aria-label="prediction">
            <button type="button" id="${matchId}-home-btn" class="btn btn-secondary prediction-btn">
                <img src="/images/team-hud.svg" alt="" class="badgeContainer">
                <p>${homeTeam}</p>
            </button>
            <button type="button" id="${matchId}-draw-btn" class="btn btn-secondary prediction-btn">
                <h3>打和</h3>
            </button>
            <button type="button" id="${matchId}-away-btn" class="btn btn-secondary prediction-btn">
                <img src="/images/team-ars.svg" alt="" class="badgeContainer">
                <p>${awayTeam}</p>
            </button>
            <button class="btn btn-success submit-btn" id="${matchId}-submit-btn" type="button">提交</button>
        </div>
        <script type='text/javascript'>
            $(() => {
                let choice = null;
                let disabled = true;

                $('#${matchId}-home-btn').click(() => {
                    choice = {
                        matchId: ${matchId},
                        userChoice: 'home'
                    }
                })

                $('#${matchId}-draw-btn').click(() => {
                    choice = {
                        matchId: ${matchId},
                        userChoice: 'draw'
                    }
                })

                $('#${matchId}-away-btn').click(() => {
                    choice = {
                        matchId: ${matchId},
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
        </script>        
        `
    };

    $.get('/api/home').then((matches) => {
        $('#home-date').append(`<p>${matches[0].matchDay}</p>`)

        matches.forEach(match => {
            $('#match-table').append(MatchTemplate(match.matchId, match.homeTeam, match.awayTeam));
        });

    }).then(() => $('.home-prediction > .prediction-btn').click(function() { // add yellow color to buttons when being clicked
        $('.home-prediction > .prediction-btn').removeClass('btn-warning');
        $(this).addClass('btn-warning');
    }));
});