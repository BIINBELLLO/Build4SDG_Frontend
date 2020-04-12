import { Component, OnInit } from '@angular/core';
import * as estimator from '../../estimator-function/estimator.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  estimatorForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildEstimatorForm();
  }

  buildEstimatorForm() {
    this.estimatorForm = this.fb.group({
      population: ['', Validators.required],
      timeToElapse: ['', Validators.required],
      reportedCases: ['', Validators.required],
      totalHospitalBeds: ['', Validators.required],
      periodType: ['', Validators.required]
    });
  }

  estimateData() { }

}
