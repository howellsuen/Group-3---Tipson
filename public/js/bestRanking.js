$(() => {
    const RankingTemplate = (profilePicture, name, description, totalTips, totalWins, winPercentage, recent10) => {
        return `

        `
    };

    $.get('/api/profile').then((user) => {
        function winPercentage(totalTips, totalWins) {
            return Math.floor(totalWins / totalTips * 100) + '%';
        }
        $('#user-profile').append(ProfileTemplate(user[0].profile_picture, user[0].name, user[0].description, user[0].total_tips, user[0].total_wins, winPercentage(user[0].total_tips, user[0].total_wins), user.recent10))
    });
});