import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './Components/home/home.component';


import { AddProductComponent } from './Components/product/add-product/add-product.component';
import { ProductDetailsComponent } from './Components/product/product-details/product-details.component';
import { ProductCardComponent } from './Components/product/product-card/product-card.component';
import { ListProductComponent } from './Components/product/list-product/list-product.component';

import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AddCampPlaceComponent } from './Components/campPlace/add-camp-place/add-camp-place.component';
import { CampPlaceDetailsComponent } from './Components/campPlace/camp-place-details/camp-place-details.component';
import { CampPlaceListComponent } from './Components/campPlace/camp-place-list/camp-place-list.component';

import { ProductTableComponent } from './Components/product/product-table/product-table.component';

import { CampPlaceTableComponent } from './Components/campPlace/camp-place-table/camp-place-table.component';
import { HeaderComponent } from './Shared/header/header.component';
import { EventListComponent } from './Components/event/eventlist/eventlist.component';
import { AddEventComponent } from './Components/event/add-event/add-event.component';
import { EventCardComponent } from './Components/event/event-card/event-card.component';
import { EventDetailsComponent } from './Components/event/event-details/event-details.component';
import { EventTableComponent } from './Components/event/event-table/event-table.component';
import { EditEventComponent } from './Components/event/edit-event/edit-event.component';




const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "header", component: HeaderComponent },

  { path: "addproduct", component: AddProductComponent },

  { path: "ProductDetails/:idProduct", component: ProductDetailsComponent },

  { path: "ProductCard", component: ProductCardComponent },
  { path: "ProductList", component: ListProductComponent },
  { path: "EventCard/:idEvent", component: ProductCardComponent },
  { path: "AddCampPlace", component: EventCardComponent },
  { path: "CampPlaceDetails/:idCampPlace", component: CampPlaceDetailsComponent },
  { path: "listCampPlace", component: CampPlaceListComponent },
  { path: "AddEvent", component: AddEventComponent },
  { path: "EventList", component: EventListComponent },
  { path: "EventDetails/:idEvent", component: EventDetailsComponent },
  { path: "EventTable", component: EventTableComponent },
  { path: "CampPlaceTable", component: CampPlaceTableComponent },
  { path: "productTable", component: ProductTableComponent },
  { path: 'edit-event/:id', component: EditEventComponent },




  { path: '', redirectTo: '/home', pathMatch: 'full' },


  { path: "**", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
