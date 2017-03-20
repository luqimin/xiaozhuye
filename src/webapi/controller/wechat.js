'use strict';

import Base from './base.js';
import axios from 'axios';
import xml2js from 'xml2js';
// import crypto from "crypto";

let parser = new xml2js.Parser();
let builder = new xml2js.Builder();

// function sha1(str) {
//     var md5sum = crypto.createHash("sha1");
//     md5sum.update(str);
//     str = md5sum.digest("hex");
//     return str;
// }

let parseXml = xml => {
    return new Promise((resolve, reject) => {
        parser.parseString(xml, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    })
}

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    indexAction() {
        //auto render template file index_index.html
        return this.display();
    }

    async postmsgAction() {
        let creatMsg = (FromUserName, ToUserName, msg) => {
            let xml = `<xml>
    <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
    <CreateTime>${parseInt(new Date().valueOf() / 1000)}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${msg}]]></Content>
</xml>`;
            return xml;
        };

        let xml = await this.http.getPayload();
        let _postMsg = await parseXml(xml);
        let _postMsgData = _postMsg.xml;

        let ToUserName = _postMsgData.ToUserName[0],
            FromUserName = _postMsgData.FromUserName[0],
            CreateTime = _postMsgData.CreateTime[0],
            MsgType = _postMsgData.MsgType[0],
            Content = _postMsgData.Content[0],
            MsgId = _postMsgData.MsgId[0];

        console.log(`收到微信消息: ${FromUserName} === ${Content}`);

        let tuling = await axios.post('http://www.tuling123.com/openapi/api', {
            'key': '09ff8a2bd69e43d7bbdb924090c5c492',
            'info': Content,
            'loc': '',
            'userid': FromUserName.replace(/[^a-zA-Z0-9]/g, '')
        }, { timeout: 3000 }).catch(err => {
            console.log(err);
            this.end(creatMsg(FromUserName, ToUserName, '超时了...真尴尬'));
        });

        let _resText = '呀，猿收到你消息啦';
        
        if (tuling.status == 200 && tuling.data) {
            _resText = tuling.data.text;
            //处理多种机器人反馈信息
            switch (parseInt(tuling.data.code)) {
            case 200000:
                _resText += `: ${tuling.data.url}`;
                break;
            case 302000:
                break;
            default:
                break;
            }
            console.log(`获得图灵机器人反馈: ${_resText}`);
        }

        let _resXml = creatMsg(FromUserName, ToUserName, _resText);

        this.end(_resXml);

        // //验证微信开发者token
        // let signature = this.get('signature');
        // let timestamp = this.get('timestamp');
        // let nonce = this.get('nonce');
        // let echostr = this.get('echostr');

        // let oriArray = [];
        // oriArray[0] = nonce;
        // oriArray[1] = timestamp;
        // oriArray[2] = 'xiaozhuye';
        // oriArray.sort();
        // let original = oriArray.join('');
        // let scyptoString = sha1(original);

        // if (signature == scyptoString) {
        //     this.end(echostr);
        // } else {
        //     this.end("false");
        // }
    }

}