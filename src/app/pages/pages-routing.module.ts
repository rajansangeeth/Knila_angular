import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        redirectTo: "contacts",
        pathMatch: "full"
      },
      {
        path: "contacts",
        component: ContactsComponent
      },
      {
        path: "contacts/create",
        component: AddContactComponent
      },
      {
        path: "contacts/edit/:id",
        component: AddContactComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
