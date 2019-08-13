"use strict";
// exports.__esModule = true;
var https = require("https");
var querystring = require("querystring");
var libxmljs = require("libxmljs");
var EpochtaApiv2 = /** @class */ (function () {
    /**
     *
     * @param {string} login -
     * @param {string} password
     * @param {boolean} debug
     */
    function EpochtaApiv2(login, password, debug) {
        if (debug === void 0) { debug = true; }
        this.gateway = 'https://api.myatompark.com/members/sms/xml.php';
        this.gatewayhost = 'api.atompark.com';
        this.gatewaypath = '/members/sms/xml.php';
        this.debug = debug;
        this.login = login;
        this.password = password;
    }
    /**
     * Отправка смс
     * @param {string} sender
     * @param {string} message
     * @param {Array<iphone>} numbers
     * @param {string} sentdate
     * @param {Function} callback -
     * @param {Function} error_callback -
     */
    EpochtaApiv2.prototype.sendSms = function (sender, message, numbers, sentdate, callback, error_callback) {
        var xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        
        <SMS>\n            
            <operations>\n                
                <operation></operation>\n            
            </operations>\n            
            <authentification>\n                
                <username></username>\n                
                <password></password>\n            
            </authentification>\n            
            <message>\n                
                <sender></sender>\n                
                <text></text>\n            
            </message>\n            
            <numbers>\n            
            </numbers>\n        
        </SMS>`;
        var xmlDoc = libxmljs.parseXmlString(xml);
        xmlDoc.get("//operation").text("SEND");
        xmlDoc.get("//username").text(this.login);
        xmlDoc.get("//password").text(this.password);
        xmlDoc.get("//sender").text(sender);
        xmlDoc.get("//text").text(message);
        var xml_numbers = xmlDoc.get("//numbers"), node;
        if (typeof sentdate !== 'undefined') {
            node = libxmljs
                .Element(xmlDoc, 'sentdate')
                .text(sentdate);
            xmlDoc.root().addChild(node);
        }
        for (var i = 0; i < numbers.length; i++) {
            node = libxmljs
                .Element(xmlDoc, 'number')
                .text(numbers[i].val);
            if (typeof numbers[i].id !== 'undefined') {
                node.attr({ messageID: numbers[i].id });
            }
            if (typeof numbers[i].vars !== 'undefined') {
                node.attr({ variables: numbers[i].vars });
            }
            xml_numbers.addChild(node);
        }
        return this.request(xmlDoc.toString(), callback, error_callback);
    };
    /**
     * Расчет стоимости отправки смс
     * @param {String} sender
     * @param {String} message
     * @param {Array} numbers
     * ([
     *      {val: "380933630001", id:"msg1", vars:"var1;var2;var3;"},
     *      {val: "380933630002", id:"msg2"}
     *  ])
     * @param {String} sentdat - (2012-05-01 00:20:00)
     * @param {Function} callback -
     * @param {Function} error_callback -
     * @returns {Boolean}
     */
    EpochtaApiv2.prototype.getPrice = function (sender, message, numbers, sentdate, callback, error_callback) {
        var xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        
        <SMS>\n            
            <operations>\n                
                <operation></operation>\n            
            </operations>\n            
            <authentification>\n                
                <username></username>\n                
                <password></password>\n            
            </authentification>\n            
            <message>\n                
                <sender></sender>\n                
                <text></text>\n            
            </message>\n            
            <numbers>\n            
            </numbers>\n        
        </SMS>`;
        var xmlDoc = libxmljs.parseXmlString(xml);
        xmlDoc.get("//operation").text("GETPRICE");
        xmlDoc.get("//username").text(this.login);
        xmlDoc.get("//password").text(this.password);
        xmlDoc.get("//sender").text(sender);
        xmlDoc.get("//text").text(message);
        var xml_numbers = xmlDoc.get("//numbers"), node;
        if (typeof sentdate !== 'undefined') {
            node = libxmljs
                .Element(xmlDoc, 'sentdate')
                .text(sentdate);
            xmlDoc.root().addChild(node);
        }
        for (var i = 0; i < numbers.length; i++) {
            node = libxmljs
                .Element(xmlDoc, 'number')
                .text(numbers[i].val);
            if (typeof numbers[i].id !== 'undefined') {
                node.attr({ messageID: numbers[i].id });
            }
            if (typeof numbers[i].vars !== 'undefined') {
                node.attr({ variables: numbers[i].vars });
            }
            xml_numbers.addChild(node);
        }
        return this.request(xmlDoc.toString(), callback, error_callback);
    };
    /**
     * Получения статуса отправленной смс
     * @param {Array} id_list - (['msg1', 'msg2'])
     * @param {Function} callback -
     * @param {Function} error_callback -
     * @returns {Boolean}
     */
    EpochtaApiv2.prototype.getStatus = function (id_list, callback, error_callback) {
        var xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        
        <SMS>\n            
            <operations>\n                
                <operation>GETSTATUS</operation>\n            
            </operations>\n            
            <authentification>\n                
                <username></username>\n                
                <password></password>\n            
            </authentification>\n            
            <statistics>\n            
            </statistics>\n        
        </SMS>`;
        var xmlDoc = libxmljs.parseXmlString(xml);
        xmlDoc.get("//username").text(this.login);
        xmlDoc.get("//password").text(this.password);
        var statistics = xmlDoc.get("//statistics");
        var node;
        for (var i = 0; i < id_list.length; i++) {
            node = libxmljs
                .Element(xmlDoc, 'messageid')
                .text(id_list[i].val);
            statistics.addChild(node);
        }
        return this.request(xmlDoc.toString(), callback, error_callback);
    };
    /**
     * Получение баланса
     * @param {Function} callback -
     * @param {Function} error_callback -
     * @returns {Boolean}
     */
    EpochtaApiv2.prototype.getBalance = function (callback, error_callback) {
        var xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        
        <SMS>\n            
            <operations>\n                
                <operation>BALANCE</operation>\n            
            </operations>\n            
            <authentification>\n                
                <username></username>\n                
                <password></password>\n            
            </authentification>\n        
        </SMS>`;
        var xmlDoc = libxmljs.parseXmlString(xml);
        xmlDoc.get("//username").text(this.login);
        xmlDoc.get("//password").text(this.password);
        return this.request(xmlDoc.toString(), callback, error_callback);
    };
    /**
     * Получение стоимости одного кредита
     * @param {Function} callback -
     * @param {Function} error_callback -
     * @returns {Boolean}
     */
    EpochtaApiv2.prototype.getCreditPrice = function (callback, error_callback) {
        var xml = `<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n        
        <SMS>\n            
            <operations>\n                
                <operation>CREDITPRICE</operation>\n            
            </operations>\n            
            <authentification>\n                
                <username></username>\n                
                <password></password>\n            
            </authentification>\n        
        </SMS>`;
        var xmlDoc = libxmljs.parseXmlString(xml);
        xmlDoc.get("//username").text(this.login);
        xmlDoc.get("//password").text(this.password);
        return this.request(xmlDoc.toString(), callback, error_callback);
    };
    /**
     *
     * @param {XMLDocument} xml
     * @param {string} type
     * @param {Function} callback
     * @param {Function} error_callback
     */
    EpochtaApiv2.prototype.request = function (xml, callback, error_callback) {
        if (this.debug) {
            console.log({ data: xml });
            return true;
        }
        var _this = this;
        var postData = querystring.stringify({ XML: xml });
        var options = {
            hostname: this.gatewayhost,
            port: 443,
            path: this.gatewaypath,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postData.length
            }
        };
        var req = https.request(options, function (res) {
            if (res.statusCode == 200) {
                res.on('data', function (d) {

                    var xmlDoc = libxmljs.parseXmlString(d);


                    var code = parseInt(xmlDoc.get('//status'));
                    console.log("https.request", xmlDoc.toString(), "status", code)

                    if (code >= 0) { // OK
                        callback(xmlDoc);
                    }
                    else {
                        error_callback(xmlDoc);
                    }
                });
            }
            else {
                error_callback({ error: "uknown", result: 'false' });
            }
        });
        req.on('error', function (e) {
            error_callback({ error: "uknown", message: e + '', result: 'false' });
        });
        req.write(postData);
        req.end();
        return true;
    };
    /**
     *
     * @param {string} status
     */
    EpochtaApiv2.prototype.error_handler = function (status) {
        var messages;
        messages = {
            '-1': { 'status': '-1', 'code': 'AUTH_FAILED', 'message': 'Неправильний логін та/або пароль' },
            '-2': { 'status': '-2', 'code': 'XML_ERROR', 'message': 'Неправильний формат XML' },
            '-3': { 'status': '-3', 'code': 'NOT_ENOUGH_CREDITS', 'message': 'Недостатньо кредитів на акаунті користувача' },
            '-4': { 'status': '-4', 'code': 'NO_RECIPIENTS', 'message': 'Немає вірних номерів отримувачів' },
            '-7': { 'status': '-7', 'code': 'BAD_SENDER_NAME', 'message': 'Помилка в імені відправника' }
        };
        if (typeof messages[status] !== 'undefined') {
            return messages[status];
        }
        return { 'status': status, 'message': 'Unknow error' };
    };
    return EpochtaApiv2;
}());

export const api2 = new EpochtaApiv2('sidorenkovladyslav@gmail.com', 'Pa$$w0rd', false);


