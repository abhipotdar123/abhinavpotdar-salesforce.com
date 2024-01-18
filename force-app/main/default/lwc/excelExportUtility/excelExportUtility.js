import { LightningElement, api } from "lwc";
import { loadScript } from "lightning/platformResourceLoader";
import workbook from "@salesforce/resourceUrl/xlsjs";

export default class ExportExcelUtility extends LightningElement {
    @api headerList; //List of header columns for all the sheets
    @api apiNameList; //List of Api name for corresponding to header column
    @api filename; //File name of the excel workbook
    @api worksheetNameList; //List of all the worksheet names
    @api sheetData; //List of data for all the worksheets
    librariesLoaded = false;

    /**
     * @description load external library when component is rendered
     */
    renderedCallback() {
        if (this.librariesLoaded) return;
        this.librariesLoaded = true;

        Promise.all([loadScript(this, workbook + "/xlsx.full.min.js")])
            .then(() => {
                console.log("success");
            })
            .catch(error => {
                console.log("failure");
            });
    }

    /**
     * @description this button can be called from parent component to download the file
     */
    @api download() {
        const XLSX = window.XLSX;
        let xlsData = this.sheetData;
        let xlsHeader = this.headerList;
        let ws_name = this.worksheetNameList;
        let createXLSLFormatObj = Array(xlsData.length).fill([]);

        /* form header list */
        xlsHeader.forEach((item, index) => createXLSLFormatObj[index] = [item])

        /* form data key list */
        xlsData.forEach((item, selectedRowIndex) => {
            let xlsRowKey = this.apiNameList[selectedRowIndex];

            item.forEach((value, index) => {
                var innerRowData = [];
                xlsRowKey.forEach(item => {
                    innerRowData.push(value[item]);
                })
                createXLSLFormatObj[selectedRowIndex].push(innerRowData);
            })
        });

        /* creating new Excel */
        var wb = XLSX.utils.book_new();

        /* creating new worksheet */
        var ws = Array(createXLSLFormatObj.length).fill([]);
        
        for (let i = 0; i < ws.length; i++) {
            /* converting data to excel format and puhing to worksheet */
            let data = XLSX.utils.aoa_to_sheet(createXLSLFormatObj[i]);
            ws[i] = [...ws[i], data];

            /* Add worksheet to Excel */
            XLSX.utils.book_append_sheet(wb, ws[i][0], ws_name[i]);
        }

        /* Write Excel and Download */
        XLSX.writeFile(wb, this.filename);

        //Fire file download completion Event
        const customEvent = new CustomEvent('downloadcomplete', {});
        this.dispatchEvent(customEvent);
    }
}