import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Admin } from '../../../core/services/admin';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html'
})
export class Dashboard implements OnInit, AfterViewInit {

  stats: any = {};
  loading = true;
  recentProducts: any[] = [];
  recentUsers: any[] = [];

  constructor(private adminService: Admin) { }

  ngOnInit(): void {
    this.adminService.getStats().subscribe({
      next: (res) => {
        this.loading = false;
        this.stats = res;
        this.createCharts();
      },
      error: (err) => {
        this.loading = false;
        console.log('Error loading stats', err);
      }
    });

    this.adminService.getRecentProducts().subscribe(res => {
      this.recentProducts = res;
    });

    this.adminService.getRecentUsers().subscribe(res => {
      this.recentUsers = res;
    });
  }

  ngAfterViewInit() {}

  createCharts() {

    // Bar Chart
    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Users', 'Products'],
        datasets: [{
          label: 'Counts',
          data: [this.stats.users, this.stats.products]
        }]
      }
    });

    // Pie Chart
    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Approved', 'Pending'],
        datasets: [{
          data: [this.stats.approved, this.stats.pending]
        }]
      }
    });
  }
}