import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import L, { icon, Map, map, tileLayer } from 'leaflet';



@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {

  @ViewChild('map')
  mapElementRef: ElementRef = null!;

  public map: Map = null!;

  ngAfterViewInit(): void {

    this.map = map(this.mapElementRef.nativeElement)
        .setView([42.306629822076665, 2.708329434767353], 15);

    const icon = L.icon({
      iconUrl: 'assets/homepage_img.jpg',
      iconSize: [40, 40]
    });

    const marker = L.marker([42.306629822076665, 2.708329434767353], {icon: icon, title: 'GreenCamp'},).addTo(this.map);
    marker.bindPopup("<b>Welcome to the GreenCamp!</b>").openPopup();
    

    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // add a link to OpenStreetMap (omitted here for shorter line width)
        attribution: '&copy; OpenStreetMap'
    }).addTo(this.map);

  }

}
