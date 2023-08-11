import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { NewsServiceService } from 'src/app/_services/news-service.service';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit, OnDestroy {
  newsData: any[] = [];
  filteredNewsData: any[] = [];
  recordsLength: number = 0;
  searchWord: any;
  myForm: FormGroup;
  disableSearchButton:boolean=false;
  pageSize = 5;
  currentPage = 0;
  copyOriginalData: any[] = [];

  constructor(
    private _serviceData: NewsServiceService,
    private fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.getNewsData();
    this.myForm = this.fb.group({
      searchWord: [''],
      fromDate: '',
      toDate: '',
    });
  }

  /* page will be refreshed or reload on every 10 sec's */
  ngOnInit() {
    setInterval(() => {
      window.location.reload();
    }, 10000);
  }
  
  /* hitting api to get updated news */
  getNewsData() {
    this._serviceData.getNewsdata().subscribe((res: any) => {
      this.newsData = res.articles;
      this.recordsLength = this.newsData.length;
      this.filteredNewsData = this.newsData;
      this.copyOriginalData = this.newsData;
    });
  }

  /* when click on individual news url it will open its' website */
  openUrl(url: string) {
    window.open(url);
  }

  /* get method to read based upon pageSize it will show the number of records */
  get displayedNewsData(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredNewsData.slice(startIndex, startIndex + this.pageSize);
  }

  /* to handle page size change options as i have 5,10,15 as page size options */
  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  /* based on keyword search and date filters the date will be populated 
  filtering data based on keyword in description*/
  onSearch() {
    let transFromDate: any = this.datePipe.transform(
      this.myForm.value.fromDate,
      'yyyy-MM-ddTHH:mm:ssZ'
    );
    let transToDate: any = this.datePipe.transform(
      this.myForm.value.toDate,
      'yyyy-MM-ddTHH:mm:ssZ'
    );

    if (
      this.myForm.value.fromDate &&
      this.myForm.value.toDate &&
      this.myForm.value.searchWord
    ) {
      const searchKeyword = this.myForm.value.searchWord.toLowerCase();
      this.filteredNewsData = this.newsData.filter(
        (val) =>
          val.description.toLowerCase().includes(searchKeyword) &&
          val.publishedAt >= transFromDate &&
          val.publishedAt <= transToDate
      );
    } else if (this.myForm.value.fromDate && this.myForm.value.toDate) {
      this.filteredNewsData = this.newsData.filter(
        (val) =>
          val.publishedAt >= transFromDate && val.publishedAt <= transToDate
      );
    }

    if (this.myForm.value.searchWord) {
      const searchKeyword = this.myForm.value.searchWord.toLowerCase();
      this.filteredNewsData = this.newsData.filter((val) =>
        val.description.toLowerCase().includes(searchKeyword)
      );
    }

    this.currentPage = 0;
    this.recordsLength = this.filteredNewsData.length;
  }

  /* resetting to its original form */
  onReset() {
    this.myForm.reset();
    this.currentPage = 0;
    this.filteredNewsData = this.copyOriginalData;
    this.recordsLength = this.filteredNewsData.length;
  }

  onInput(event: any) {
    console.log(this.myForm.value.searchWord);
    
  }
  
  ngOnDestroy() {
    clearInterval(10000);
  }
}
