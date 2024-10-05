(()=> {
    'use strict';
    const subdomein = 'xxxx.cyboze.com'; //xxxは実際のkintoneドメイン
    //url
    const webhookUrl = 'https://hook.slack.com/services/〜'; //実際のSlackhookのurlが入る
    const user_name = 

    //クローズしたらSlackへ通知させる
    kintone.events.on('app.record.edit.submit.success', (event) => {
        const thisUrl = `https://${subdomein}/k/${kintone.app.getId()}/show/#record=${kintone.app.getId()}`;
        const payload = {
            text: `申請者:${event.record[user_name].value}\n対応者:${event.record[owner].value}\nkintone:${thisUrl}`
        };
        //進捗状況がクローズになったら返す
        const task = event.record.status.value;
        if(task == 'クローズ'){
            return new kintone.Promise((resolve, reject) => {
                kintone.proxy(webhookUrl, 'POST', {}, payload, (body, status, headers) => {
                    console.log(status, body);
                    resolve(event);
                });
            });
        }
    });
    //kintoneの一覧画面でもクローズ処理したら通知させる
    kintone.events.on('app.record.index.edit.submit', (event) => {
        const no = event.record.レコード番号.value;
        const thisUrl = `https://${subdomein}/k/${kintone.app.getId()}/show#record=${no}`;
        const payload = {
            text: `申請者:${event.record[user_name].value}\n対応者:${event.record[owner].value}\nkintone:${thisUrl}`
        };
        //進捗状況がクローズになったら返す
        const task = event.record.status.value;
        if(task == 'クローズ'){
            return new kintone.Promise((resolve, reject) => {
                kintone.proxy(webhookUrl, 'POST', {}, payload, (body, status, headers) => {
                    console.log(status, body);
                    resolve(event);
                });
            });
        }

    });
})();





