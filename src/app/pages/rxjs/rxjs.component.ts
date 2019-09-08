import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 

    this.subscription = this.counter()
    .pipe(
      map( data =>  data['contador']),
      filter( ( valor, index) => {
        if((valor % 2) === 1){
          //impar
          return true
        }else{
          //par
          return false;
        }
      })
      )
    .subscribe(
      num => {console.log('subs', num);},
      error => {console.log('error', error);},
      () => {console.log('El observador terminó');}
      );
  }

  ngOnInit() {
  }

  ngOnDestroy(){
    console.log('La pagina de rxjs se cerró');
    this.subscription.unsubscribe();
  }

  counter(): Observable<any>{
    
    return new Observable( (observer: Subscriber<any>) => {

      let counter = 0;
      
      let interval = setInterval(()=>{

        counter++;

        const salida = {
          contador : counter
        }

        observer.next(salida);

        // if(counter === 3){
        //   clearInterval(interval);
        //   observer.complete();
        // }

      }, 1000);

    });

  }

}
