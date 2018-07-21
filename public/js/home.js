$(() => {
    $.get('/api/home').then((data) => {
        $('#home-date').append(`<p>${data[0].matchDay}</p>`)
        data.forEach(e => {
            $('#match-table').append(Match(e.homeTeam, e.awayTeam));
        });
    });
    const Match = (homeTeam, awayTeam) => {
        return `
        <section class="btn-group d-flex justify-content-center home-prediction" role="button" aria-label="prediction">
            <button type="button" class="btn btn-secondary prediction-btn">
                <img src="/images/team-hud.svg" alt="" class="badgeContainer">
                <p>${homeTeam}</p>
            </button>
            <button type="button" class="btn btn-secondary prediction-btn">
                <h3>和</h3>
            </button>
            <button type="button" class="btn btn-secondary prediction-btn">
                <img src="/images/team-ars.svg" alt="" class="badgeContainer">
                <p>${awayTeam}</p>
            </button>
            <button class="btn btn-success" id="submit-btn" type="submit">提交</button>
        </section>
        `
    };
});