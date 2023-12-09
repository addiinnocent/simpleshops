import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProductComponent } from './product/product.component';
import { AboutComponent } from './about/about.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { ShippingReturnPolicyComponent } from './shipping-return-policy/shipping-return-policy.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions/frequently-asked-questions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search', component: SearchComponent },
  //{ path: 'search/:filter', component: SearchComponent },
  { path: 'products/:productId', component: ProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'terms-conditions', component: TermsConditionsComponent },
  { path: 'shipping-return-policy', component: ShippingReturnPolicyComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'frequently-asked-questions', component: FrequentlyAskedQuestionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
