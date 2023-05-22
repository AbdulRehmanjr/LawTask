import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'linkify'
})
export class LinkifyPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) { }

    transform(value: any): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(this.stylize(value));
    }

    private stylize(text: string): string {
        const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        return text.replace(urlRegex, url =>
          `<a target="_blank" href="${url.startsWith('www') ? 'http://' + url : url }">${url}</a>`
        );
    }

}
