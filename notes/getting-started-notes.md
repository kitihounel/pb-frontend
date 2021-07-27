# Notes

## How to Create a Project With Specific Angular Version
You need to have `npx` installed. It is available by default on recent versions of NodeJS.

Then we need to execute `npx` command with the `-p` parameter where we put a specific
`@angular/cli` version. The last element of this statement is a command that creates an
application on a specific `@angular/cli` version `ng new [name of the project]`.

```sh
# The following creates an app with Angular 11.0.2
npx -p @angular/cli@11.0.2 ng new dummy-app
```

Procedure found @ https://frontbackend.com/angular/how-to-generate-angular-application-in-a-specific-version-using-ng-new-command.

## NPX beginner guide
Read this: https://jaireina.medium.com/npx-makes-npm-nicer-and-even-more-useful-50086375ee6c.

## Pass data to child components
1. To pass data to a component, you use use the `Input` decorator. The `@Input()` decorator indicates
that the property value passes in from the component's parent.
  ```ts
  import { Component, OnInit } from '@angular/core'
  import { Input } from '@angular/core'

  export class ChildComp implements OnInit {
    @Input() prop: SomeClass;

    constructor() {
    }

    ngOnInit() {
    }
  }
  ```

2. Then, in the parent component template, you pass the property to the child component using property binding.
  ```html
  <p>Inside parent template</p>
  <app-child-comp [prop]="someVar"></app-child-comp>
  ```

## Pass data to parent component
1. In the child component, import `Output` and `EventEmitter` from `@angular/core`.
  ```ts
  import { Output, EventEmitter } from '@angular/core'
  ```

2. In the child component class, define a property named `notify` with an `@Output()` decorator and an instance
of `EventEmitter`. Configuring the component with an `@Output()` allows it to emit an event when the value
of the `notify` property changes.
  ```ts
  @Output() notify = new EventEmitter()
  ```

3. Here the event is emitted when a button is clicked (inside the child component template).
  ```html
  <button (click)="notify.emit()">Fire event</button>
  ```

4. Next, we define the behavior that happens in the parent component when the user clicks the button. In the parent component class, we define an `onNotify()` method.
  ```ts
  export class ParentComponent {
    // ...
    onNotify(data) {
        // Do something about that...
    }
  }
  ```

5. Update the parent omponent to receive data from its child. In the parent template, bind the component to the `onNotify()` method of the parent.
  ```html
  <div>Some stuff</div>
  <app-child-comp (notify)="onNotify(data)"></app-product-alerts>
  ```
