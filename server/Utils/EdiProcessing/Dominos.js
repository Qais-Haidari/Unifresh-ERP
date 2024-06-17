let Client = require("ssh2-sftp-client");
const {exit} = require("process");
// const readTextFile = require("read-text-file");
// const axios = require('axios')
// const TXTReport = require('./CreateTXTReport')
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
// const convert = require("xml-js");
// const puppeteer = require("puppeteer");

async function order() {
    class SFTPClient {
        constructor() {
            this.client = new Client();
        }

        async connect(options) {
            console.log(`Connecting to ${options.host}:${options.port}`);
            try {
                await this.client.connect(options);
            } catch (err) {
                console.log("Failed to connect:", err);
            }
        }

        async disconnect() {
            await this.client.end();
        }
        async listFiles(remoteDir, fileGlob) {
            console.log(`Listing ${remoteDir} ...`);
            let fileObjects;
            try {
                fileObjects = await this.client.list(remoteDir, fileGlob);
            } catch (err) {
                console.log("Listing failed:", err);
            }
            const fileNames = [];
            if (fileObjects == undefined) {
                setInterval(() => {
                    order();
                }, 50000);
            }
            for (const file of fileObjects) {
                if (file.type === "d") {
                    console.log(
                        `${new Date(file.modifyTime).toISOString()} PRE ${file.name}`
                    );
                } else {
                    console.log(
                        `${new Date(file.modifyTime).toISOString()} ${file.size} ${
              file.name
            }`
                    );
                }

                fileNames.push(file.name);
            }
            return fileNames;
        }
        async uploadFile(localFile, remoteFile) {
            console.log(`Uploading ${localFile} to ${remoteFile} ...`);
            try {
                await this.client.put(localFile, remoteFile);
            } catch (err) {
                console.error("Uploading failed:", err);
            }
        }

        async downloadFile(remoteFile, localFile) {
            console.log(`Downloading ${remoteFile} to ${localFile} ...`);
            try {
                await this.client.get(remoteFile, localFile);
            } catch (err) {
                console.error("Downloading failed:", err);
            }
        }

        async deleteFile(remoteFile) {
            console.log(`Deleting ${remoteFile}`);
            try {
                await this.client.delete(remoteFile);
            } catch (err) {
                console.error("Deleting failed:", err);
            }
        }
    }

    const host = "sftpdev.unifresh.com.au";
    const port = "22";
    const username = "domediuser";
    const password = "domediuser123#@!";
    const client = new SFTPClient();
    await client.connect({
        host,
        port,
        username,
        password
    });
    const data = await client.listFiles("./uploaded");
    let filename = data[0];
    if (filename == undefined) {
        await client.disconnect();
        console.log("No File Found");
        setTimeout(() => {exit()}, 5000);
    } else {
        console.log('a')
        return
        await client.downloadFile(`./po/${filename}`,`./Orders/Inbound/${filename}`);
        var contents = readTextFile.readSync(`./Orders/Inbound/${filename}`).replace(/(\r\n|\n|\r)/gm, "");
        const StoreID = contents.split(',')[0];
        const OrderDate = contents.split(',')[1];
        const PONumber = contents.split(',')[3];
        const CustomerName = await axios.get(`http://localhost:5000/Ostendo/EDI/CUSTOMER/DETAIL/${StoreID}`);
        const Storelist = await axios.get(`http://localhost:5000/Ostendo/EDI/CUSTOMER/CUSTOMERLIST/${CustomerName.data[0].CUSTOMER}`);
        const OrderDates = await axios.get(`http://localhost:5000/Ostendo/EDI/CUSTOMER/SCHEDULE/DETAIL/${CustomerName.data[0].CUSTOMER}`)
        let masterarr = [];
        let FinalList = [];
        let DeliveryDate;
        for (var i = 0; i < contents.split(',').slice(4, -1).length; i += 3) {
          masterarr.push(contents.split(',').slice(4, -1).slice(i, i + 3))
        }
        for (let index = 0; index < masterarr.length; index++) {
          const element = masterarr[index];
          if (element[1] === 'Lettuce') {FinalList.push([Storelist.data[0].LINECODE, element[2]])}
          if (element[1] === 'Onions') {FinalList.push([Storelist.data[1].LINECODE, element[2]])}
        }
        for (let index1 = 0; index1 < OrderDates.data.length; index1++) {
          const element = OrderDates.data[index1];
          if (element.DISPATCHDAY == OrderDate) { DeliveryDate = element.DELIVERYDAY }
        }
    }
}
order()