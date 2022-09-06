import { Component, Input } from '@angular/core';
import { NavItem } from 'src/app/interfaces/NavItem';
import { faCross } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css'],
})
export class SidebarItemComponent {
  @Input() navItem: NavItem = {
    icon: faCross,
    label: '',
    path: '',
  };
}
