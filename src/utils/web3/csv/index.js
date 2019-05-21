import ObjectsToCsv from 'objects-to-csv';

class Csv {
    csv_object = [];

    set(object) {
        this.csv_object.push(...object);
    }

    async download() {
        const blob = new Blob([await this.__convert()], {type: "text/csv"});
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'download.csv');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async __convert() {
        const csv = new ObjectsToCsv(this.csv_object);
        return await csv.toString();
    }
}
export default Csv;