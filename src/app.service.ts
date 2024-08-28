import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import fs from 'fs';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers(html:string): Promise<string> {
    let htmlTemplate: string = '';
    // fs.readFile('./auditReportTemplate.html', 'utf8', (err, data) => {
    //   if (err) {
    //     console.log('error: ', err);
    //   } else {
    //     console.log(data);
    //     htmlTemplate = data;
    //   }
    // });

    return await this.convertHtmlToPdf(html);
  }

  async convertHtmlToPdf(html: string): Promise<string> {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'Letter',
      printBackground: true,
    });

    await browser.close();

    return this.uint8ArrayToBase64(pdf);
  }

   uint8ArrayToBase64(uint8Array: Uint8Array): string {
    // Convertimos el Uint8Array a una cadena de texto usando el método btoa
    let binary = '';
    const len = uint8Array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
  
    // Convertimos la cadena binaria a Base64
    return btoa(binary);
  }
}
