// not in use now

$(() => {
    const RankingTemplate = (profilePicture, name, description, totalTips, totalWins, winPercentage, recent10) => {
        return `
                <a href="#" class="ranking-link">
                <li class="d-flex justify-content-between ranking-content">
                    <div>
                        <img src="/images/avatar.png" class="img-fluid rounded ranking-pic" alt="user-image">
                    </div>
                    <div class="ranking-name">Alex</div>
                    <div class="ranking-rate">90%</div>
                </li>
            </a>
        `
    };

    $.get('/api/ranking').then((user) => {
        function winPercentage(totalTips, totalWins) {
            return Math.floor(totalWins / totalTips * 100) + '%';
        }
        $('#user-profile').append(ProfileTemplate(user[0].profile_picture, user[0].name, user[0].description, user[0].total_tips, user[0].total_wins, winPercentage(user[0].total_tips, user[0].total_wins), user.recent10))
    });
});