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
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserComponent } from './Components/user/user.component';
import { EditUserComponent } from './Components/edit-user/edit-user.component';
import { Feedback } from './Models/feedback';
import { FeedbackListComponent } from './Components/feedback-list/feedback-list.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderComponent },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'user/management', component: UserComponent },
  { path: 'addUser', component: EditUserComponent },

  { path: 'addproduct', component: AddProductComponent },

  { path: 'ProductDetails/:idProduct', component: ProductDetailsComponent },

  { path: 'ProductCard', component: ProductCardComponent },
  { path: 'ProductList', component: ListProductComponent },

  { path: 'AddCampPlace', component: AddCampPlaceComponent },
  {
    path: 'CampPlaceDetails/:idCampPlace',
    component: CampPlaceDetailsComponent,
  },
  { path: 'listCampPlace', component: CampPlaceListComponent },

  { path: 'CampPlaceTable', component: CampPlaceTableComponent },

  { path: 'productTable', component: ProductTableComponent },
  { path: 'feedbacklist', component: FeedbackListComponent },
  { path: 'feedback', component: FeedbackComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
