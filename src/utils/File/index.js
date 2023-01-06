export function exportFileJson(fileName, data) {
   let dataStr = JSON.stringify(data);
   let data = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
   let fileName = `${fileName}.json`;
   download(data,filename)
}
export function exportToExcel(tableSelect, filename){
   let dataType = 'application/vnd.ms-excel';
   let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
   
   // Specify file name
   filename = filename?filename+'.xls':'excel_data.xls';
   
   if(navigator.msSaveOrOpenBlob){
       let blob = new Blob(['\ufeff', tableHTML], {
           type: dataType
       });
       navigator.msSaveOrOpenBlob( blob, filename);
   }else{
       let data = 'data:' + dataType + ', ' + tableHTML;
       download(data,filename)
   }
}

function download(data,filename){
   let linkElement = document.createElement('a');
   linkElement.setAttribute('href', data);
   linkElement.setAttribute('download',filename);
   linkElement.click();
}