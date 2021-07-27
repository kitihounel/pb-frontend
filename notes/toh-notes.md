# Notes

## Basic Routing
To add routing capabilities to the app, first add a routing module.
```
ng generate module app-routing --flat --module=app
```
- `--flat` puts the file in src/app instead of its own folder.
- `--module=app` tells the CLI to register it in the imports array of the AppModule.

Replace the code inside the file by soething similar to this.
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { YourComponent } from './path/to/your.component';

// Configure your routes here...
const routes: Routes = [
  { path: 'your-path', component: YourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
```

Update your `AppComponent` template and add a `router-outlet` element.
```html
<h1>{{title}}</h1>
<router-outlet></router-outlet>
<other-component></other-component>
```

Add links to enable users to navigate.
```html
<h1>{{title}}</h1>
<nav>
  <a routerLink="/your-path">Some text</a>
</nav>
<router-outlet></router-outlet>
<app-messages></app-messages>
```

Finally add a default route if you want. When the app starts, the browser's address
bar points to the web site's root. That doesn't match any existing route so the router
doesn't navigate anywhere. The space below the `<router-outlet>` is blank.

To make the app navigate to the dashboard automatically, add the following route to
the AppRoutingModule.Routes array.
```js
{ path: '', redirectTo: '/home', pathMatch: 'full' }
```

This route redirects a URL that fully matches the empty path to the route whose path is `/home`.

## Routes With Parameter
Add a parameterized route to the AppRoutingModule.routes array that matches the path pattern. For example:
```js
{ path: '/your/path/:id', component: ComponentToDisplay }
```

In the component, add the following imports. They will enable to get various information about the current route.
```js
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
```

Then inject them in your component constructor.
```js
constructor(private route: ActivatedRoute, private location: Location) {
}
```

To extract the parameters from the route, do something like this.
```js
ngOnInit(): void {
  this.doSomething();
}

doSomething(): void {
  // The route parameters as always returned as strings.
  const id = +this.route.snapshot.paramMap.get('id');
  // You can do what you want with your parameter value from here...
}
```

The `Location` object enables you to navigate in the browser history. Here is a code stub showing how to go back.
```js
goBack(): void {
  this.location.back();
}
```

## Enable HTTP Services
HttpClient is Angular's mechanism for communicating with a remote server over HTTP.

Make HttpClient available everywhere in the app in two steps. First, add it to the root AppModule by importing it:
```js
import { HttpClientModule } from '@angular/common/http';
```

Next, still in the AppModule, add HttpClient to the imports array:
```js
@NgModule({
  imports: [
    HttpClientModule
  ]
})
```

Now you can make `HttpClient` everywhere in your app.
```js
import { HttpClient, HttpHeaders } from '@angular/common/http';
```

Inject `HttpClient` in your constructors.
```js
constructor(private http: HttpClient, private messageService: MessageService) {
}
```

And you use like this.
```js
fetchSomeData(): Observable<SomeType> {
  return this.http.get<SomeType>("/your/resource/url");
}
```

### IMPORTANT
All HttpClient methods return an RxJS Observable of something. In general, an observable can return multiple
values over time. An observable from HttpClient always emits a single value and then completes, never to emit again.

`HttpClient.get()` returns the body of the response as an untyped JSON object by default. Applying the optional type
specifier, `<SomeType>`, adds TypeScript capabilities, which reduce errors during compile time.
