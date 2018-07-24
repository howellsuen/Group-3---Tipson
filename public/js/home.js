$(() => {
    const MatchTemplate = (matchId, homeTeam, homeBadge, awayTeam, awayBadge) => {
        return `
        <div class="btn-group d-flex justify-content-center home-prediction" role="button" aria-label="prediction">
            <button type="button" id="${matchId}-home-btn" class="btn btn-secondary prediction-btn">
                <img src='${homeBadge}' alt="" class="badgeContainer">
                <p>${homeTeam}</p>
            </button>
            <button type="button" id="${matchId}-draw-btn" class="btn btn-secondary prediction-btn">
                <h3>打和</h3>
            </button>
            <button type="button" id="${matchId}-away-btn" class="btn btn-secondary prediction-btn">
                <img src='${awayBadge}' alt="" class="badgeContainer">
                <p>${awayTeam}</p>
            </button>
            <button class="btn btn-success submit-btn" id="${matchId}-submit-btn" type="button">提交</button>
        </div>

        
       <script type='text/javascript'>
            $(() => {
                let choice = null;
                
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
                    console.log('submit', {
                        matchId: ${matchId},
                        userChoice: choice,
                    });

                    if (choice !== null) {
                        $.post('/api/home/submit', {
                                matchId: ${matchId},
                                userChoice: choice,
                        }).done(() => {
                            $("#${matchId}-submit-btn").prop('disabled', true);
                        }).fail(() => {
                            alert("已經揀過啦! 大哥!");
                        })
                    }
                })
            });
        </script>        
        `
    };

    $.get('/api/home').then((matches) => {
        $('#home-date').append(`<p>${matches[0].matchDay}</p>`)

        matches.forEach(match => {
            $('#match-table').append(MatchTemplate(match.matchId, match.homeTeam, match.homeBadge, match.awayTeam, match.awayBadge));
        });

    }).then(() => $('.home-prediction > .prediction-btn').click(function() { // add yellow color to buttons when being clicked
        $('.home-prediction > .prediction-btn').removeClass('btn-warning');
        $(this).addClass('btn-warning');
    }))
})