import { Pipe, PipeTransform } from '@angular/core';
import { Post } from './models/post';

@Pipe({
  name: 'filter',
})
export class SearchPipe implements PipeTransform {
  transform(value: Array<Post>, searchEngine: string): Array<Post> {
    return value.filter(post => {
      return (
        post.title.toLowerCase().includes(searchEngine.toLowerCase()) ||
        post.description.toLowerCase().includes(searchEngine.toLowerCase())
      );
    });
  }
}
