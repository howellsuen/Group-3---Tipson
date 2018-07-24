$(() => {
    const ProfileTemplate = (profilePicture, name, description, totalTips, totalWins, winPercentage) => {
        return `
            <header class="d-flex justify-content-center profile-header">
                <h2 id="profile-title" alt="profile-picture">個人檔案</h2>
            </header>
            <section class="d-flex justify-content-center">
                <div class="d-flex flex-column about-user">
                    <img class="rounded-circle rounded mx-auto d-block img-fluid " src="${profilePicture}" alt="user-pic" id="user-pic">
                    <div class="about-info">
                        <h3 class="user-name">${name}</h3>
                        <h4 class="user-intro">賭場浪子，皆因情場失意</h4>
                    </div>
            </section>

            <div class="d-flex justify-content-center profile-record">
                <div class="record-div" id="record-prediction">
                    <h2>總預測</h2>
                    <p>${totalTips}</p>
                </div>
                <div class="record-div" id="record-win">
                    <h2>總勝出</h2>
                    <p>${totalWins}</p>
                </div>
                <div class="record-div" id="record-rate">
                    <h2>勝率</h2>
                    <p>${winPercentage}</p>
                </div>
            </div>
            </div>
            </div>
            <section class="profile-history d-flex justify-content-center">
                <ul>
                    <li class="d-flex justify-content-end history-title">
                        <h3>近期預測</h3>
                        <a href="/history">
                            <i class="fas fa-angle-right"></i>
                        </a>
                    </li>
                    <li class="d-flex justify-content-center history-content">
                        <h3>近十場結果</h3>
                        <p>(左為最新)</p>
                    </li>
                    <li>
                        <div class="d-flex justify-content-around" id="history-content-preview">
                            <div class="recent" id="recent-0"></div>
                            <div class="recent" id="recent-1"></div>
                            <div class="recent" id="recent-2"></div>
                            <div class="recent" id="recent-3"></div>
                            <div class="recent" id="recent-4"></div>
                            <div class="recent" id="recent-5"></div>
                            <div class="recent" id="recent-6"></div>
                            <div class="recent" id="recent-7"></div>
                            <div class="recent" id="recent-8"></div>
                            <div class="recent" id="recent-9"></div>
                        </div>
                    </li>
                </ul>
            </section>
        `
    };

    $.get('/api/profile').then((user) => {
        function winPercentage(totalTips, totalWins) {
            if (totalTips !== 0) {
                return Math.floor(totalWins / totalTips * 100) + '%';
            } else {
                return 0 + '%';
            }
        }
        $('#user-profile').append(ProfileTemplate(user[0].profile_picture, user[0].name, user[0].description, user[0].total_tips, user[0].total_wins, winPercentage(user[0].total_tips, user[0].total_wins)))
    });
});