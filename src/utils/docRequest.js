import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';

export const generateDocFromTemplate = async (arrayBuffer, data, fileName) => {
    try {
        const zip = PizZip(arrayBuffer);

        const doc = new Docxtemplater(zip, {
            data: data,
            paragraphLoop: true,
            linebreaks: true,
        });

        try {
            doc.render(data);
        } catch (error) {
            console.error('Template rendering error: ' + error);
            return;
        }

        const out = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(out, fileName);
    } catch (error) {
        console.error('Generate error: ' + error);
    }
};
