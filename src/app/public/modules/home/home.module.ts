import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeroComponent } from './components/hero/hero.component';
import { PublicModule } from '../../public.module';


@NgModule({
  declarations: [
    HomeComponent,
    HeroComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    PublicModule
  ]
})
export class HomeModule { }
