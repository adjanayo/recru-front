# Documentation de la Configuration API

Cette documentation explique comment utiliser et modifier la configuration globale de l'API mise en place dans l'application.

## 1. Principe de Fonctionnement

L'application utilise un **InjectionToken** d'Angular pour centraliser l'URL de base de l'API. Cette approche permet de :

- Modifier l'URL en un seul endroit.
- Faciliter les tests en injectant différentes URLs selon l'environnement.
- Maintenir une cohérence entre tous les services.

## 2. Fichiers Concernés

### `src/app/api.config.ts`

C'est ici que le token `API_URL` est défini.

```typescript
import { InjectionToken } from "@angular/core";
export const API_URL = new InjectionToken<string>("API_URL");
```

### `src/app/app.config.ts`

C'est ici que l'on fournit la valeur concrète de l'URL pour l'ensemble de l'application.

```typescript
{
  provide: API_URL,
  useValue: 'https://jsonplaceholder.typicode.com' // Modifiez cette valeur pour changer d'API
}
```

## 3. Utilisation dans un Service

Pour utiliser l'URL dans un nouveau service, suivez ces étapes :

1.  **Injectez `API_URL`** et `HttpClient` dans le constructeur (ou via la fonction `inject()`).
2.  **Utilisez l'URL** pour vos appels HTTP.

**Exemple :**

```typescript
import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_URL } from "../api.config"; // Importez le token

@Injectable({ providedIn: "root" })
export class MonService {
  private http = inject(HttpClient);
  private apiUrl = inject(API_URL);

  getData() {
    // Utilisation de l'URL injectée
    return this.http.get(`${this.apiUrl}/ma-ressource`);
  }
}
```

## 4. Modification de l'URL API

Pour changer l'URL de l'API (passer de la prod à la dev par exemple) :

1. Ouvrez le fichier `src/app/app.config.ts`.
2. Modifiez la valeur associée à `useValue` dans le provider `API_URL`.

## 5. Utilisation des Reactive Forms

Les **Reactive Forms** sont utilisés pour gérer les formulaires de manière robuste avec une validation côté TypeScript.

### Configuration

Assurez-vous d'importer `ReactiveFormsModule` dans votre composant (s'il est standalone) ou dans votre module.

```typescript
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, ...],
  // ...
})
```

### Création d'un Formulaire

Utilisez le `FormBuilder` pour définir la structure de votre formulaire et ses validations.

```typescript
import { inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

export class MonComposant {
  private fb = inject(FormBuilder);

  monForm = this.fb.group({
    titre: ["", [Validators.required, Validators.minLength(3)]],
    contenu: ["", [Validators.required, Validators.minLength(10)]],
  });

  onSubmit() {
    if (this.monForm.valid) {
      console.log(this.monForm.value);
    }
  }
}
```

### Liaison dans le Template (HTML)

Liez le groupe de formulaire et ses contrôles dans votre fichier HTML.

```html
<form [formGroup]="monForm" (ngSubmit)="onSubmit()">
  <input type="text" formControlName="titre" />
  <textarea formControlName="contenu"></textarea>

  <button type="submit" [disabled]="monForm.invalid">Envoyer</button>
</form>
```

---

_Date de création : 05 Février 2026_
