import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, take, takeUntil } from 'rxjs';
import { ContactModel } from 'src/models/contact.model';
import { ContactService } from 'src/services/contacts.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class ContactsComponent implements OnInit {

  contacts: any[] = [
    { id: 1, firstName: "Sangeeth", lastName: "Rajan", email: "srajan@gmail.com", phoneNumber: "868584877", city: "kkdi", country: "India" },
    { id: 2, firstName: "Sangeeth", lastName: "Rajan", email: "srajan@gmail.com", phoneNumber: "868584877", city: "kkdi", country: "India" },
    { id: 3, firstName: "Sangeeth", lastName: "Rajan", email: "srajan@gmail.com", phoneNumber: "868584877", city: "kkdi", country: "India" }
  ];
  unSubscribe$ = new Subject();
  showConfirmModel: boolean = false;
  cols = [
    { field: 'edit', header: 'Edit' },
    { field: 'firstName', header: 'First name' },
    { field: 'lastName', header: 'Last name' },
    { field: 'email', header: 'Email' },
    { field: 'phoneNumber', header: 'Phone number' },
    { field: 'city', header: 'City' },
    { field: 'country', header: 'Country' },
    { field: 'delete', header: 'Delete' },
  ];
  constructor(private contactService: ContactService, private router: Router, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  edit(rowData: any) {
    if (rowData?.id) {
      this.router.navigateByUrl(`/pages/contacts/edit/${rowData?.id}`);
    }
  }

  confirm(rowData: ContactModel) {
    this.showConfirmModel = true;
    this.confirmationService.confirm({
      message: 'Do you want to delete this contact?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",

      accept: () => {
        this.delete(rowData);
        this.showConfirmModel = false;
      },
      reject: () => {
        this.showConfirmModel = false;
      }
    });
  }

  delete(rowData: any) {
    console.log(rowData);
    this.contactService.deleteContact(rowData?.id)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (resp) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact deleted successfully' });
        },
        error: (err) => {

        }
      });
  }

  addContact() {
    this.router.navigateByUrl("/pages/contacts/create");
  }

  getAll() {
    this.contactService.getContacts()
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (response) => {
          this.contacts = response?.data;
        },
        error(err) {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getAll();
  }

}
