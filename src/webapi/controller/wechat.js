'use strict';

import Base from './base.js';
import xml2js from 'xml2js';

let parser = new xml2js.Parser();
let builder = new xml2js.Builder();

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

                this.end(_resXml);
            });
        });
    }
}