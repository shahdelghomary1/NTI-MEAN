import { Component, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  note = { title: '', content: '' };
  error: { [key: string]: string } = {};

  constructor(private notesService: NotesService) {}

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes() {
    if (!localStorage.getItem('token')) {
      this.error['general'] = 'You must be logged in to view notes';
      return;
    }

    this.notesService.getNotes().subscribe((res: any) => {
      this.notes = res;
    });
  }

  validateNote() {
    this.error = {};
    if (!this.note.title.trim()) {
      this.error['title'] = 'Title is required';
    }
    if (!this.note.content.trim()) {
      this.error['content'] = 'Content is required';
    }
    return Object.keys(this.error).length === 0;
  }

  addNote() {
    if (!localStorage.getItem('token')) {
      this.error['general'] = 'Please login first';
      return;
    }

    if (!this.validateNote()) return;

    this.notesService.createNote(this.note).subscribe(() => {
      this.note = { title: '', content: '' };
      this.loadNotes();
    });
  }

  updateNote(id: string, note: any) {
    if (!localStorage.getItem('token')) {
      this.error['general'] = 'Please login first';
      return;
    }

    this.notesService.updateNote(id, note).subscribe((res: any) => {
      console.log('Updated:', res);
      this.loadNotes();
    });
  }

deleteNote(id: string) {
  this.notesService.deleteNote(id).subscribe({
    next: (res: any) => {
      console.log('Deleted:', res);
      this.loadNotes();
    },
    error: (err) => {
      console.error('Delete error:', err.error || err.message);
    }
  });
}

}
