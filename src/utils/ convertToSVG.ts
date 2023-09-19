import * as potrace from 'potrace';
import * as fs from 'fs';
import * as path from 'path';

type ImageFilePath = string;

interface ProcessImagesOptions {
    inputDir: ImageFilePath;
    outputDir: ImageFilePath;
}

const processImages = ({ inputDir, outputDir }: ProcessImagesOptions): void => {
    fs.readdir(inputDir, (err: NodeJS.ErrnoException | null, files: string[]) => {
        if (err) {
            console.error(`Error reading directory: ${err}`);
            return;
        }

        files.forEach(file => {
            const bitmap = new Image();
            const inputPath = path.join(inputDir, file);
            bitmap.src = fs.readFileSync(inputPath).toString("base64");
            potrace.trace(bitmap, (error: Error | null, svg?: string) => {
                if (error || !svg) {
                    console.error(`Error tracing image ${file}: ${error}`);
                    return;
                }
                const outputPath = path.join(outputDir, `${path.basename(file, path.extname(file))}.svg`);
                fs.writeFileSync(outputPath, svg);
            });
        });
    });
};

const options: ProcessImagesOptions = {
    inputDir: path.join(__dirname, 'path_to_input_images'),
    outputDir: path.join(__dirname, 'path_to_output_svgs')
};

processImages(options);
