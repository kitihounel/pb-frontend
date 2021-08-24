# pb-frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.14.

## Settings for SemiColons Omission

1. In `tslint.json`, set semicolon to `never`.

```json
"rules": {
  "semicolon": {
    "options": [
      "never"
    ]
  }
}
```

2. In `angular.json`, set `lintFix` to `true` in each `schematics`.

```json
"schematics": {
  "@schematics/angular:application": {
    "strict": true,
    "lintFix": true
  },
  "@schematics/angular:class": {
    "lintFix": true
  },
  "@schematics/angular:component": {
    "lintFix": true
  },
  "@schematics/angular:directive": {
    "lintFix": true
  }
  ...
}
```

## Modal Dialogs Used

The project uses custom modal dialogs. We did not want to use Material dialog, so we read a lot and tested a lot of stuff to get an acceptable result.

Thanks to the authors of the following articles and gists. Our modal dialogs are based on their works.
- [Angular Pro Tip: How to dynamically create components in <body>](https://medium.com/hackernoon/angular-pro-tip-how-to-dynamically-create-components-in-body-ba200cc289e6), by Carlos Roso.
- [Service to Dynamically Append Angular Components to The Body](https://gist.github.com/reed-lawrence/1f6b7c328ad3886e60dc2b0adcf75a97).
- [Angular: Trap Focus Within a Block](https://medium.com/allenhwkim/angular-trap-focus-with-in-a-block-79b7572f23c2), by Allen Kim.
- MDN articles about focus events and various StackOverflow threads.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
