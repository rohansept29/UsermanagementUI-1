import { Component } from '@angular/core';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.css'],
})
export class DocumentsListComponent {
  rowsData = Array(5).fill({
    label: 'Lorem ipsum',
    date: 'April 9, 2022',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
  });
}
