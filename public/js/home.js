$(() => {
    $.get('/api/home').then((data) => {
        data.forEach(e => {
            $('#match-table').append(Match(e.matchDay, e.homeTeam, e.awayTeam));
        });
    });
    const Match = (matchDay, homeTeam, awayTeam) => {
        return `
        <div class="row-fluid">
            <div class="span12 tbl-cont">
                <div class="padding-lr20 table-responsive">
                    <table width="100%" id="ranking-content-table" class="tipson-table" cellpadding="0" cellspacing="0">
                        <thead class="#">
                            <tr>
                                <th class="pd-home" colspan="3">FIXTURE ${matchDay}</th>
                            </tr>
                        </thead>
                        <tbody class="tbl-hdr">
                            <tr>
                                <td>
                                    <img src="/images/team-mun.svg" alt="" class="badgeContainer">
                                </td>
                                <td>
                                    <div class="title-text bold-text text-center w70 nowrap-text"></div>
                                </td>
                                <td>
                                    <img src="/images/team-lei.svg" alt="" class="badgeContainer">
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="title-text bold-text text-center w70 nowrap-text">${homeTeam}</div>
                                </td>
                                <td>
                                    <div class="title-text bold-text text-center w70 nowrap-text">vs.</div>
                                </td>
                                <td>
                                    <div class="title-text bold-text text-center w70 nowrap-text">${awayTeam}</div>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>

                            <tr>
                                <td>
                                    <button type="button" class="btn btn-primary">HOME</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-warning">DRAW</button>
                                </td>
                                <td>
                                    <button type="button" class="btn btn-success">AWAY</button>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">
                                    <button type="button" class="btn btn-success btn-md">提交</button>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        `
    };
});