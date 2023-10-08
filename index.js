#! /usr/bin/env node

const fs = require('fs');
const yargs = require('yargs');
const helpers = require('./helpers.js')

const options = yargs
.usage('jsoncsv -i input.json -o out.csv -h "Id:_id,Title:title,Image:images.0.url"')
.option("i", {alias:"input", describe: "Input file(json)", type: "string", demandOption: false })
.option("o", {alias:"output", describe: "Output file", type: "string", demandOption: false })
.option("h", {alias:"headers", describe: "Headers(comma seperated)", type: "string", demandOption: false })
.option("a", {alias:"array data source", describe: "Array data source(helps for using array field in given json)", type: "string", demandOption: false })
.help(true)
.argv;

function main() {
    console.log("Input File  : ", options.i);
    console.log("Output File : ", options.o);
    console.log("File Headers: ", options.h);
    console.log("Array Source: ", options.a);

    try {
        const inputFile = options.i;
        const outputFile = options.o;
        if (!inputFile) {
            throw new Error("input file is required");
        }
        if (!outputFile) {
            throw new Error("output file is required");
        }
        
        const data = fs.readFileSync(inputFile);

        let items = JSON.parse(data);
        if (options.a) {
          items = items[options.a];
        }

        if (!Array.isArray(items)) {
          items = [items];
        }

        const headers = options.h ? helpers.parseGivenHeaders(options.h) : helpers.generateAutoHeaders(items);

        if (headers.length === 0) {
            throw new Error('headers size is zero. provide valid headers for given file');
        }

        let csvContent = headers.map(function(header){ return `"${header.title}"`; }).join(',') + '\n';

        items.forEach(function(item) {
            headers.forEach(function(header) {
              const splitHeaders = header.data.split('.');
              let headerData = item;
              try {
                splitHeaders.forEach(function(splitHeader) {
                  headerData = headerData[splitHeader];
                });
              } catch (e) {
                headerData = '';
              }
    
              csvContent += '"'+ headerData + '",';
            });
    
            csvContent = csvContent.substring(0, csvContent.length-1);
            csvContent += '\n';
          });

          fs.writeFileSync(outputFile, csvContent);

          console.log("finished");
    } catch (err) {
        return console.log(err.message);
    }
}

main();