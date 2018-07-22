$(() => {
    $.get('/api/home').then((data) => {
        $('#home-date').append(`<p>${data[0].matchDay}</p>`)
        data.forEach(e => {
            $('#match-table').append(Match(e.homeTeam, e.awayTeam));
        });
    }).then(() => $('.home-prediction > .prediction-btn').click(function() { // add yellow color to buttons when being clicked
        $('.home-prediction > .prediction-btn').removeClass('btn-warning');
        $(this).addClass('btn-warning');
    }));
    const Match = (homeTeam, awayTeam) => {
        return `
        <div class="btn-group d-flex justify-content-center home-prediction" role="button" aria-label="prediction">
            <button type="button" id="home-btn" class="btn btn-secondary prediction-btn">
                <img src="/images/team-hud.svg" alt="" class="badgeContainer">
                <p>${homeTeam}</p>
            </button>
            <button type="button" id="draw-btn" class="btn btn-secondary prediction-btn">
                <h3>和</h3>
            </button>
            <button type="button" id="away-btn" class="btn btn-secondary prediction-btn" >
                <img src="/images/team-ars.svg" alt="" class="badgeContainer">
                <p>${awayTeam}</p>
            </button>
            <button class="btn btn-success" id="submit-btn" type="submit">提交</button>
        </div>
        `
    };

    const userInput = [];

    $('#home-btn').click(() => {
        userInput.push({
            user_choice: home
        })
    })

    $('#draw-btn').click(() => {
        userInput.push({
            user_choice: draw
        })
    })

    $('#away-btn').click(() => {
        userInput.push({
            user_choice: away
        })
    })

    $('#submit-btn').click(() => {

        $.post('/api/home/submit', {

        }).done((data) => {
            $('#submit-btn').toggle();
        });
    });
});