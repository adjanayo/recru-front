import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { injectMutation, injectQueryClient } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from 'rxjs';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../types/post.type';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-form.html',
  styleUrl: './post-form.css'
})
export class PostFormComponent {
  private fb = inject(FormBuilder);
  private postsService = inject(PostsService);
  private queryClient = injectQueryClient();

  postForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    body: ['', [Validators.required, Validators.minLength(10)]],
    userId: [1] // Valeur par défaut pour l'exemple
  });

  createMutation = injectMutation(() => ({
    mutationFn: (newPost: Omit<Post, 'id'>) => lastValueFrom(this.postsService.createPost(newPost)),
    onSuccess: () => {
      // Rafraîchir la liste des posts après succès
      this.queryClient.invalidateQueries({ queryKey: ['posts'] });
      this.postForm.reset({ userId: 1 });
    }
  }));

  onSubmit() {
    if (this.postForm.valid && !this.createMutation.isPending()) {
      const formValue = this.postForm.value;
      this.createMutation.mutate({
        title: formValue.title as string,
        body: formValue.body as string,
        userId: formValue.userId as number
      });
    }
  }
}
