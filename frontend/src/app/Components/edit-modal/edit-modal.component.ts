import { Component, ElementRef, Input, Output, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { JobsService } from 'src/app/services/jobs.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  @Input() companies: any[] = [];
  // @Output()
  constructor() {}
}
