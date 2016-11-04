import crontab from "node-crontab";
let pushDeadline = () => {
    //调用推送deadlineAction
    think.http("/home/pushnotice/deadline", true);
}

//每天10点执行
let jobId = crontab.scheduleJob("10 10,18 * * *", pushDeadline);

//f服务启动立即执行一次
// pushDeadline();