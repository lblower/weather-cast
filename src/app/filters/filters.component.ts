import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';

import { LocationService } from '../services/location.service';
import { DropdownService } from '../services/dropdown.service';

@Component({
  selector: 'wc-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  cities: any;
  countries: any;
  states: any;
  locationData: any;
  locationSubscription: Subscription;

  constructor(
    private locationService: LocationService,
    private dialogRef: MatDialogRef<FiltersComponent>,
    private dropdownService: DropdownService
  ) { }

  loadDropdownData(ipData: any) {
    this.getCountries();
    this.getRegions(ipData.country_code);
    this.getCities(ipData.country_code, ipData.region);
  }

  ngOnInit() {
    this.locationSubscription = this.locationService.getIpData().subscribe(ipData => {
      this.locationData = this.locationService.ipData;
      this.loadDropdownData(this.locationData);
    });
  }

  getCities(countryCode: string, regionName: string) {
    this.dropdownService.getCities(countryCode, regionName).subscribe(
      cities => {
        this.cities = cities;
      }
    );
  }

  getCountries() {
    this.dropdownService.getCountries().subscribe(
      countries => this.countries = countries
    );
  }

  getRegions(regionName: string) {
    this.dropdownService.getRegions(regionName).subscribe(
      states => {
        this.states = states;
      }
    );
  }

  close(data) {
    this.dialogRef.close(data);
  }

}
