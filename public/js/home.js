$(() => {
    const MatchTemplate = (matchId, homeTeam, homeBadge, awayTeam, awayBadge) => {
        return `
        <div class="btn-group d-flex justify-content-center home-prediction" role="button" aria-label="prediction">
            <button type="button" id="${matchId}-home-btn" class="btn btn-secondary prediction-btn home-btn" data-id="${matchId}">
                <img src='${homeBadge}' alt="" class="badgeContainer">
                <p>${homeTeam}</p>
            </button>
            <button type="button" id="${matchId}-draw-btn" class="btn btn-secondary prediction-btn draw-btn" data-id="${matchId}">
                <h3>打和</h3>
            </button>
            <button type="button" id="${matchId}-away-btn" class="btn btn-secondary prediction-btn away-btn" data-id="${matchId}">
                <img src='${awayBadge}' alt="" class="badgeContainer">
                <p>${awayTeam}</p>
            </button>
            <button class="btn btn-success submit-btn"  data-id="${matchId}" id="${matchId}-submit-btn" type="button">提交</button>
        </div>  
        `
    };

    $.get('/api/home').then((matches) => {
        // console.log(matches);

        $('#home-date').append(`<p>${matches[0].matchDay}</p>`);

        matches.forEach(match => {
            $('#match-table').append(MatchTemplate(match.matchId, match.homeTeam, match.homeBadge, match.awayTeam, match.awayBadge));
        });

    }).then(() => $('.home-prediction > .prediction-btn').click(function() { // add yellow color to buttons when being clicked
        $('.home-prediction > .prediction-btn').removeClass('btn-warning');
        $(this).addClass('btn-warning');
    }))

    //[CODE REVIEW]
    const choice = [];

    $(document.body).on('click', '.home-btn', (e) => {
        choice[$(e.currentTarget).data('id')] = 'home';
        console.log($(e.currentTarget).data('id'), choice[$(e.currentTarget).data('id')]);
    })

    $(document.body).on('click', '.draw-btn', (e) => {
        choice[$(e.currentTarget).data('id')] = 'draw';
        console.log($(e.currentTarget).data('id'), choice[$(e.currentTarget).data('id')]);
    })

    $(document.body).on('click', '.away-btn', (e) => {
        choice[$(e.currentTarget).data('id')] = 'away';
        console.log($(e.currentTarget).data('id'), choice[$(e.currentTarget).data('id')]);
    })

    // instead of $('.submit-btn').click(() => {
    $(document.body).on('click', '.submit-btn', (e) => {
        console.log($(e.currentTarget).data('id'), choice[$(e.currentTarget).data('id')]);
        if (choice[$(e.currentTarget).data('id')] !== undefined) {
            $.post('/api/home/submit', {
                matchId: $(e.currentTarget).data('id'),
                userChoice: choice[$(e.currentTarget).data('id')],
            }).done(() => {
                $(e.currentTarget).prop('disabled', true);
            }).fail(() => {
                alert("已經揀過啦! 大哥!");
            })
        }
    })
})