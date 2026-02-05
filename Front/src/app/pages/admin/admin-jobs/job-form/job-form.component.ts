import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormArray } from '@angular/forms';
import { JobOffer } from '../../../../types/job-offer.type';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-job-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './job-form.component.html',
  styleUrl: './job-form.component.css'
})
export class JobFormComponent implements OnInit {
  @Input() initialData: JobOffer | null = null;
  @Input() isEditMode = false;
  @Output() formSubmit = new EventEmitter<Omit<JobOffer, 'id' | 'viewCount' | 'applicationsCount' | 'postedDate'>>();

  jobForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.jobForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      company: ['', [Validators.required]],
      companyLogo: [''],
      location: ['', [Validators.required]],
      type: ['CDI', [Validators.required]],
      domain: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      salary: [''],
      isPublished: [false],
      requirements: this.fb.array([]),
      responsibilities: this.fb.array([]),
      benefits: this.fb.array([]),
      tags: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.initialData) {
      this.jobForm.patchValue({
        title: this.initialData.title,
        company: this.initialData.company,
        companyLogo: this.initialData.companyLogo,
        location: this.initialData.location,
        type: this.initialData.type,
        domain: this.initialData.domain,
        description: this.initialData.description,
        salary: this.initialData.salary,
        isPublished: this.initialData.isPublished
      });

      this.setArray('requirements', this.initialData.requirements);
      this.setArray('responsibilities', this.initialData.responsibilities);
      this.setArray('benefits', this.initialData.benefits || []);
      this.setArray('tags', this.initialData.tags);
    } else {
      // Add one empty field for arrays by default for better UX
      this.addItem('requirements');
      this.addItem('responsibilities');
    }
  }

  get requirements() { return this.jobForm.get('requirements') as FormArray; }
  get responsibilities() { return this.jobForm.get('responsibilities') as FormArray; }
  get benefits() { return this.jobForm.get('benefits') as FormArray; }
  get tags() { return this.jobForm.get('tags') as FormArray; }

  setArray(controlName: string, items: string[]) {
    const array = this.jobForm.get(controlName) as FormArray;
    array.clear();
    items.forEach(item => array.push(this.fb.control(item, Validators.required)));
  }

  addItem(controlName: string) {
    const array = this.jobForm.get(controlName) as FormArray;
    array.push(this.fb.control('', Validators.required));
  }

  removeItem(controlName: string, index: number) {
    const array = this.jobForm.get(controlName) as FormArray;
    array.removeAt(index);
  }

  onSubmit() {
    this.submitted = true;
    if (this.jobForm.valid) {
      this.formSubmit.emit(this.jobForm.value);
    } else {
        this.jobForm.markAllAsTouched();
    }
  }
}
