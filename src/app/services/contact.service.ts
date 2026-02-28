import { Injectable } from '@angular/core';
import { Database, listVal, push, ref, serverTimestamp, set, update } from '@angular/fire/database';
import { Observable, map } from 'rxjs';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  dates?: string;
  message: string;
  createdAt?: number | object | null;
  status?: 'new' | 'reviewed';
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  constructor(private readonly database: Database) {}

  submitMessage(payload: ContactMessage) {
    const contactsRef = ref(this.database, 'contacts');
    const newMessageRef = push(contactsRef);
    return set(newMessageRef, {
      ...payload,
      status: 'new',
      createdAt: serverTimestamp()
    });
  }

  getMessages(): Observable<ContactMessage[]> {
    const contactsRef = ref(this.database, 'contacts');
    return listVal<ContactMessage>(contactsRef, { keyField: 'id' }).pipe(
      map((messages) =>
        [...messages].sort(
          (a, b) => (Number(b.createdAt) || 0) - (Number(a.createdAt) || 0)
        )
      )
    );
  }

  markReviewed(id: string) {
    return update(ref(this.database, `contacts/${id}`), { status: 'reviewed' });
  }
}
