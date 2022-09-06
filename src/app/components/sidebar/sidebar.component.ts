import { Component, OnInit } from '@angular/core';
import {
  faCubes,
  faHouse,
  faBug,
  faChartLine,
  faDashboard,
  faBoxesStacked,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  faCubes = faCubes;

  navItems = [
    {
      icon: faBug,
      label: 'Bug Overview',
      // the /users/1/ here is to mock a logged-in state
      path: '/users/1/bug-overview',
    },
    // Below are placeholders for showing reuseability of sidebar-item
    {
      icon: faChartLine,
      label: 'Insights',
      path: 'placeholder1',
    },
    {
      icon: faBoxesStacked,
      label: 'Builds',
      path: 'placeholder1',
    },
    {
      icon: faDashboard,
      label: 'Metrics',
      path: 'placeholder1',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
