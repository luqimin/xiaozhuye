
import crontab from "node-crontab";
let fn = () => {
        //定时任务具体逻辑
        //调用一个 Action
        think.http("/home/pushnotice/deadline", true); //模拟访问 /home/image/spier
        
    }
    // 1 小时执行一次
let jobId = crontab.scheduleJob("0 */1 * * *", fn);

fn();