# Inspair calculations and table

Interactive form to calculate project ROI and generate annual cash flow table, designed and developed for robotics system integrator [Inspair](https://inspair.ru/).
May be used as a framework-like base to build similar forms. Form includes:

- Range-inputs for initial parameters
- Calculations based on inputs (pure JS)
- Resulting table with new calculated data.

Build with Gulp.js as the build system.

## URLs

🇷🇺 [Inspair website](https://inspair.ru/calc)

🇬🇧 [GitHub pages](https://lazy-ocean.github.io/inspair-calculations-table/)

## Local setup

Run local setup using Gulp.
You'll need on your computer:

- Node.js
- Gulp
- npm

### To do

- Clone this repository: `git clone https://github.com/lazy-ocean/inspair-calculations-table/`
- Setup: `npm i`
- Start a local server: `npm run start`

Running a local server will watch all SASS, JS and HTML, compile and reload accordingly.

- Build: `npm run build`

Build will compile and minify all SASS/CSS, concat and uglify all JS, and put one minified HTML-file with inlined styles and JS to the `docs` folder.

## Getting started

All working files are in `src` working directory.

### Components

1. **Form**

Made with HTML `<input type="range">` and is generated in `form.js` with data took from `calculator/schema.js`.
To edit input parameters, simply modify data in `schema.js`:
| Item key | Item value |
| ---: | :--- |
| `label` | used in the form as HTML form label |
| `type` | preferred HTML `<input type="*">` |
| `placeholder` | optional, if you need one in form input field |
| `required`\* | mark mandatory and optional parameters |
| `min` and `max` | border-values of the input slider |
| `value` | default and showing value |
| `step` | size of each change/movement of the input slider |

\* Mind that in that version `required` is used as validation as all fields are necessary and all values are preset

Form bubbles are generated in `form.js`, too, and are specified as HTML `<output>`, each for every input. It calculates its value based on a `form.js > setBubble()`.

2. **Table**

All data is calculated in `calculate.js` and then used to build HTML table string in `table.js`.
Table is added to the page using DOM API right after the form is submitted.
Table headers are specified as a premade string, other values are ordered according to it. All values are formatted with `toLocaleString('ru')` — change to set the right language-sensitive formatting based on your language.

3. **Result text**

In this case, the calculations and table were made to find **payback period**: it shows as a result right after the form submitting. Table data is just the detailed parameters for each year.

- Detailed info on calculations find below

- HTML string is generated in `form.js onSubmit()` function: there you can modify output text.

> Mind the `utils.js formatChunkTimestamp()` function: it helps maintain plural suffix (\*one year/two year**s\***) and has advanced version for the more 'volatile' plural suffix forms (as in Russian, Polish and so on).

### Calculations

All calculations are made in `calculator/calculate.js`.

1. **`calculate()` function**
   This is where the main table calculations are made: it uses form inputs and is called in `/form.js > onSubmit()` function.  
   Modificate `intValues` according to your form inputs and all further calculations, the result used for the table generation (`table.js`) should look like an array of objects with data by rows, where keys are column headers/values:

```
[
0: {year: 1, maintenance: 120000, operational: 170100, salarySaved: 1795200, investments: 8400000, …}
1: {year: 2, maintenance: 120000, operational: 178605.00000000003, investments: 0, salarySaved: 1884960, …}
2: {year: 3, maintenance: 120000, operational: 187110, investments: 0, salarySaved: 1974720, …}
...
]
```

2. **`calculatePayback()` function**
   This is where the payback period for the **result text** is calculated. It returns a `{ years, months }` object, so modify this function to whatever data it should calculate for the result string.

### Validation

You can validate user inputs using `validate.js`. For this particular case with input sliders and preset default valid values the data doesn't need an additional validation. But if you want to omit the case of invalid data submitting or use other input types (text), modify `validate.js` accordingly. The result of validation is used in `form.js onSubmit()` function.

### Styles and design

Styles and design made in compliance with [product owner](https://inspair.ru/) main styles.

Basics (colors and font) could be modified using `_variables.scss`. For anything else see `sass/components` folder.
