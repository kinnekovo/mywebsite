const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');

function crawlBaikeTable(url) {
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
    };
    request({ url, headers }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(body);
            const tables = $('table');
            tables.each((index, table) => {
                const tableData = [];
                $(table).find('tr').each((_, row) => {
                    const cols = [];
                    $(row).find('th, td').each((__, col) => {
                        cols.push($(col).text().trim());
                    });
                    tableData.push(cols);
                });
                const dataString = tableData.map(row => row.join(',')).join('\n');
                fs.writeFileSync(`sixu_table_${index}.csv`, dataString, 'utf8');
            });
            console.log("表格数据爬取并存储成功！");
        } else {
            console.error(`请求失败，状态码: ${response && response.statusCode}，错误: ${error}`);
        }
    });
}

const url = "https://baike.baidu.com/item/%E5%A4%8F%E5%BD%A6/23690040";
crawlBaikeTable(url);