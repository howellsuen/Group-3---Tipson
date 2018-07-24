$(() => {
    const HistoryTemplate = (matchDay, homeTeam, awayTeam, matchResult, tipResult) => {
        return `
                        <tr>
                        <th scope="row">${matchDay}</th>
                        <td>${homeTeam} vs ${awayTeam}</td>
                        <td>${matchResult}</td>
                        <td>${tipResult}</td>
                        </tr>
                        `
    };

    $.get('/api/history').then((results) => {
        console.log(results);
        results.forEach(result => {
            let tipResult = '';
            if (result.result === result.userChoice) {
                tipResult = '中';
            } else {
                tipResult = '唔中';
            }

            if (result.result === 'home') {
                result.result = '主';
            } else if (result.result === 'away') {
                result.result = '客';
            } else {
                result.result = '和';
            }

            $('#recent-10-history').append(HistoryTemplate(result.matchDay, result.homeTeam, result.awayTeam, result.result, tipResult));

            //recent 10 predicitons' color indicator
            function recentColor() {
                if (tipResult === '中') {
                    $(`#recent-${results.indexOf(result)}`).css("background-color", "#77D353");
                } else {
                    $(`#recent-${results.indexOf(result)}`).css("background-color", "#F95F62");
                }
            }

            recentColor();
        });
    })
});