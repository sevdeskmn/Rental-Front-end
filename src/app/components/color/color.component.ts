import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css'],
})
export class ColorComponent implements OnInit {
  colors: Color[] = [];
  currentColor: Color;
  filterText = '';

  constructor(
    private colorService: ColorService,
    private router: Router,
    private brandService: BrandService
  ) {
    this.brandService.statusUpdated.subscribe(() => {
      this.currentColor = { colorId: 0, colorName: '' };
    });
  }

  ngOnInit(): void {
    this.getColors();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
    console.log(color.colorName);
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }

  doFilter(color: Color) {
    this.currentColor = color;
    this.router.navigate([''], {
      queryParams: { colorId: color.colorId },
      queryParamsHandling: 'merge',
    });
  }

  clearFilter() {
    this.filterText = '';
    this.getColors();
  }
}
