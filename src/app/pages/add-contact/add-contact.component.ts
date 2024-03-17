import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ContactModel } from 'src/models/contact.model';
import { ContactService } from 'src/services/contacts.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  providers: [MessageService]
})
export class AddContactComponent implements OnInit, OnDestroy {

  unSubscribe$ = new Subject();
  model = new ContactModel();
  id: string | null = "";

  constructor(private contactService: ContactService, private router: Router, private activatedRoute: ActivatedRoute, private messageService: MessageService) { }


  create() {
    if ('phoneNumber' in this.model) {
      this.model.phoneNumber = String(this.model.phoneNumber);
    }
    this.contactService.postContact(this.model)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact created successfully' });
          this.router.navigateByUrl("/pages/contacts");
        },
        error: (err) => {
          console.log(err);
          if (err?.message) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
          }
        }
      });
  }

  update() {
    if (!this.id) return;
    this.contactService.updateContact(this.id, this.model)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Contact updated Successfully' });
          this.router.navigateByUrl("/pages/contacts");
        },
        error: (err) => {
          console.log(err);
          if (err?.message) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
          }
        }
      });
  }

  getById(id: string) {
    this.contactService.getContact(id)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: (response) => {
          this.model = response?.data;
        },
        error: (err) => {
          console.log(err);
          if (err?.message) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: err?.message });
          }
        }
      });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get("id");
    console.log("id id", this.id);
    if (this.id) {
      this.getById(this.id);
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe$.next(null);
    this.unSubscribe$.complete();
  }

}
