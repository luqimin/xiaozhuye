'use strict';

import Base from './base.js';
import xml2js from 'xml2js';

let parser = new xml2js.Parser();
let builder = new xml2js.Builder();

import crypto from "crypto";

function sha1(str) {
    var md5sum = crypto.createHash("sha1");
    md5sum.update(str);
    str = md5sum.digest("hex");
    return str;
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

        let signature = this.get('signature');
        let timestamp = this.get('timestamp');
        let nonce = this.get('nonce');
        let echostr = this.get('echostr');

        let oriArray = [];
        oriArray[0] = nonce;
        oriArray[1] = timestamp;
        oriArray[2] = 'xiaozhuye';
        oriArray.sort();
        let original = oriArray.join('');
        let scyptoString = sha1(original);

        if (signature == scyptoString) {
            this.end(echostr);
        } else {
            this.end("false");
        }

        let autoEnd = setTimeout(() => {
            this.end('');
        }, 3000);

        this.http.req.on('data', data => {
            parser.parseString(data, (err, result) => {
                let _postMsg = result.xml,
                    ToUserName = _postMsg.ToUserName[0],
                    FromUserName = _postMsg.FromUserName[0],
                    CreateTime = _postMsg.CreateTime[0],
                    MsgType = _postMsg.MsgType[0],
                    Content = _postMsg.Content[0],
                    MsgId = _postMsg.MsgId[0];


                let resMsg = {
                    xml: {
                        ToUserName: FromUserName,
                        FromUserName: ToUserName,
                        CreateTime: parseInt(new Date().valueOf() / 1000),
                        MsgType: 'text',
                        Content: 'hehehhe',
                    }
                };

                let _resText = '3312321hehehehe';

                let _resXml = `<xml>
    <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
    <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
    <CreateTime>${parseInt(new Date().valueOf() / 1000)}</CreateTime>
    <MsgType><![CDATA[text]]></MsgType>
    <Content><![CDATA[${_resText}]]></Content>
</xml>`;
                clearTimeout(autoEnd);
                this.end(_resXml);
            });
        });
    }

}