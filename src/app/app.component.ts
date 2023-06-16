import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { StoreServiceService } from './services/store-service.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'store';

  cols = 4;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  constructor(private storeService: StoreServiceService){}

  ngOnInit(): void {
     this.getProducts();
  }

  getProducts():void{
    this.productsSubscription = this.storeService.getAllProducts(this.count, this.sort)
    .subscribe((_products) => {
      this.products = _products
    });
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  // onItemsCountChange(count: number): void {
  //   this.count = count.toString();
  //   this.getProducts();
  // }

  // onSortChange(newSort: string): void {
  //   this.sort = newSort;
  //   this.getProducts();

  ngOnDestroy():void {
    if(this.productsSubscription){
      this.productsSubscription.unsubscribe();
    }
  }

}
