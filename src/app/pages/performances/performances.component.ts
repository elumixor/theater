import {Component, OnInit} from '@angular/core';
import {DataManagementService} from '../../services/data-management.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-performances',
  templateUrl: './performances.component.html',
  styleUrls: ['./performances.component.scss']
})
export class PerformancesComponent implements OnInit {

  constructor(private dms: DataManagementService,
              private router: Router) {
  }

  ngOnInit() {
  }

  displayPerformanceDetail(id: number) {
    this.router.navigate(['./performances/' + id]);
  }
}
