import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
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

      if (urlRegex.test(text)) {
        return text.replace(urlRegex, url =>
          `<a  href="${url.startsWith('www') ? 'https://' + url : url }">${url}</a>`
        );
      } else {
        // If the text does not contain a URL, sanitize it
        return this.sanitizer.sanitize(SecurityContext.HTML, text);
      }
    }

}
