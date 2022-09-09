import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Input } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent implements OnInit, AfterViewInit {


  @Input() offset!: number;
  @ViewChild('hero') hero!: ElementRef
  @ViewChild('overlay') overlay!: ElementRef
  @ViewChild('heroText') heroText!: ElementRef

  ngAfterViewInit() {
    const heroContainer = this.hero;
    const bgOverlay = this.overlay;
    const heroText = this.heroText;
    bgOverlay.nativeElement.style.opacity = 0.4;

    window.addEventListener('scroll', function(){
      let offset: number = this.window.pageYOffset;
      if(offset < 390) {
        heroContainer.nativeElement.style.backgroundPositionY = offset * -0.2 + "px";
      }

      if(offset > 200){
        bgOverlay.nativeElement.style.opacity = 0.9;

      }else if(offset <= 0){
        bgOverlay.nativeElement.style.opacity = 0.4
      }

      if(offset > 200) {
        heroText.nativeElement.style.opacity = 0;
      }
      if(offset < 200) {
        heroText.nativeElement.style.opacity = 0.8 ;
      }
    })
  }

  constructor() { }

  ngOnInit(): void {

  }

}
