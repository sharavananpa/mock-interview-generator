import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "",
        loadComponent: () => import("./topic-selector/topic-selector.component").then(m => m.TopicSelectorComponent),
        pathMatch: "full"
    },
    {
        path: "result",
        loadComponent: () => import("./display-questions/display-questions.component").then(m => m.DisplayQuestionsComponent)
    }
];