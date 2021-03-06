import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

const COUNTRY_API_ENDPOINT = 'https://battuta.medunes.net/api/country/all/';
const REGION_API_ENDPOINT = 'https://battuta.medunes.net/api/region/';
const CITY_API_ENDPOINT = 'https://battuta.medunes.net/api/city/';
const BATTUTA_API_KEY = '1b5ebf4ff05bb62385c55f0a141daba9';

const COUNTRY_API_URL = `${COUNTRY_API_ENDPOINT}?key=${BATTUTA_API_KEY}`;

@Injectable()
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  getCities(countryCode: string, regionName: string) {
    return this.httpClient.jsonp(`${CITY_API_ENDPOINT}${countryCode}/search/?region=${regionName}&key=${BATTUTA_API_KEY}`, 'callback')
      .map((countries: any) => {
        return countries.map((country) => {
          if (~country.city.indexOf(' Division')) {
            country.city = country.city.replace(' Division', '');
          }
          return country;
        });
      });
  }

  getCountries() {
    return this.httpClient.jsonp(COUNTRY_API_URL, 'callback');
  }

  getRegions(countryCode) {
    return this.httpClient
      .jsonp(`${REGION_API_ENDPOINT}${countryCode}/all/?key=${BATTUTA_API_KEY}`, 'callback')
      .map((states: any) => {
        return states.map((state) => {
          if (~state.region.indexOf('State of ') || ~state.region.indexOf('Union Territory of ')) {
            state.region = state.region.replace('State of ', '').replace('Union Territory of ', '');
          }
          return state;
        });
      });
  }

}
